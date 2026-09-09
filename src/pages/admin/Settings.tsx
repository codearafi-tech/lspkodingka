import { useState, useEffect, useRef } from "react"
import apiClient from "@/lib/axios"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Upload, Save, Loader2 } from "lucide-react"
import { toast } from "@/components/ui/toast"
import { Separator } from "@/components/ui/separator"
import axios from "axios"

interface RegionItem {
  code: string
  name: string
}

export default function Settings() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    institutionName: "",
    lspType: "p1",
    lspCode: "",
    phoneNumber: "",
    picName: "",
    provinsi: "",
    kota: "",
    kecamatan: "",
    kelurahan: "",
    alamatLengkap: "",
    logo: null as File | null,
    tandaTangan: null as File | null,
  })

  const [logoUrl, setLogoUrl] = useState<string>("")
  const [signatureUrl, setSignatureUrl] = useState<string>("")

  const [provinces, setProvinces] = useState<RegionItem[]>([])
  const [regencies, setRegencies] = useState<RegionItem[]>([])
  const [districts, setDistricts] = useState<RegionItem[]>([])
  const [villages, setVillages] = useState<RegionItem[]>([])

  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  // Ref untuk melacak URL Blob lokal yang perlu di-revoke
  const logoBlobRef = useRef<string | null>(null)
  const signatureBlobRef = useRef<string | null>(null)

  // Cleanup Object URL preview saat unmount
  useEffect(() => {
    return () => {
      if (logoBlobRef.current) URL.revokeObjectURL(logoBlobRef.current)
      if (signatureBlobRef.current)
        URL.revokeObjectURL(signatureBlobRef.current)
    }
  }, [])

  // 1. Ambil Presigned GET URL dari endpoint GET /user/me/uploads/{field}
  const fetchMediaUrl = async (field: "logo" | "chairSignature") => {
    try {
      const res = await apiClient.get(`/user/me/uploads/${field}`, {
        validateStatus: (status) =>
          (status >= 200 && status < 300) || status === 404,
      })

      if (res.status === 404) return ""

      return (
        res.data?.url ||
        res.data?.uploadUrl ||
        (typeof res.data === "string" ? res.data : "")
      )
    } catch (err) {
      console.error(`Gagal mengambil media URL untuk ${field}:`, err)
      return ""
    }
  }

  const uploadFileToPresignedUrl = async (
    field: "logo" | "chairSignature",
    file: File
  ) => {
    const initRes = await apiClient.post(`/user/me/uploads/${field}`, {
      contentType: file.type,
      sizeBytes: file.size,
    })

    const putUrl =
      initRes.data?.uploadUrl ||
      initRes.data?.url ||
      (typeof initRes.data === "string" ? initRes.data : "")

    // ⬇️ Tangkap key dari response step 1
    const key = initRes.data?.key

    if (!putUrl) {
      throw new Error(`Gagal mendapatkan Upload URL untuk ${field}.`)
    }
    if (!key) {
      throw new Error(`Gagal mendapatkan upload key untuk ${field}.`)
    }

    const cleanAxios = axios.create()
    const putRes = await cleanAxios.put(putUrl, file, {
      headers: {
        "Content-Type": file.type,
      },
    })

    // ⬇️ Step 3 yang hilang: tanpa ini, key tidak pernah ditempel ke profil
    // SeaweedFS/S3 bisa mengembalikan 200/201/204 untuk PUT object.
    if (putRes.status < 200 || putRes.status >= 300) {
      throw new Error(`Upload ke storage gagal (HTTP ${putRes.status}).`)
    }

    await apiClient.post(`/user/me/uploads/${field}/complete`, { key })
  }

  const getRegionName = (list: RegionItem[], code: string) => {
    return list.find((item) => item.code === code)?.name || undefined
  }

  useEffect(() => {
    const fetchInitialData = async () => {
      setIsLoading(true)

      try {
        const [provRes, profileRes, initialLogoUrl, initialSigUrl] =
          await Promise.all([
            apiClient.get("/region/provinces"),
            apiClient.get("/user/me"),
            fetchMediaUrl("logo"),
            fetchMediaUrl("chairSignature"),
          ])

        const provList: RegionItem[] = provRes.data?.data || provRes.data || []
        setProvinces(provList)

        const profile = profileRes.data?.data || profileRes.data || {}

        setFormData((prev) => ({
          ...prev,
          email: profile.email || "",
          institutionName: profile.institutionName || "",
          lspType: profile.lspType || "p1",
          lspCode: profile.lspCode || "",
          phoneNumber: profile.phoneNumber || "",
          picName: profile.picName || "",
          provinsi: profile.province || "",
          kota: profile.cityOrRegency || "",
          kecamatan: profile.district || "",
          kelurahan: profile.village || "",
          alamatLengkap: profile.addressDetail || "",
        }))

        if (initialLogoUrl) setLogoUrl(initialLogoUrl)
        if (initialSigUrl) setSignatureUrl(initialSigUrl)

        // Load hirarki wilayah bertahap berdasarkan data profil awal
        const regionPromises: Promise<void>[] = []

        if (profile.province) {
          regionPromises.push(
            apiClient
              .get(`/region/regencies?provinceCode=${profile.province}`)
              .then((res) => setRegencies(res.data?.data || res.data || []))
          )
        }
        if (profile.cityOrRegency) {
          regionPromises.push(
            apiClient
              .get(`/region/districts?regencyCode=${profile.cityOrRegency}`)
              .then((res) => setDistricts(res.data?.data || res.data || []))
          )
        }
        if (profile.district) {
          regionPromises.push(
            apiClient
              .get(`/region/villages?districtCode=${profile.district}`)
              .then((res) => setVillages(res.data?.data || res.data || []))
          )
        }

        await Promise.all(regionPromises)
      } catch (err) {
        console.error("Gagal memuat profil:", err)
        toast.add({
          type: "error",
          description: "Gagal memuat data pengaturan.",
          priority: "high",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchInitialData()
  }, [])

  const handleProvinceChange = async (provinceCode: string) => {
    setFormData((prev) => ({
      ...prev,
      provinsi: provinceCode,
      kota: "",
      kecamatan: "",
      kelurahan: "",
    }))
    setRegencies([])
    setDistricts([])
    setVillages([])

    try {
      const res = await apiClient.get(
        `/region/regencies?provinceCode=${provinceCode}`
      )
      setRegencies(res.data?.data || res.data || [])
    } catch (err) {
      console.error("Gagal memuat data kota:", err)
    }
  }

  const handleRegencyChange = async (regencyCode: string) => {
    setFormData((prev) => ({
      ...prev,
      kota: regencyCode,
      kecamatan: "",
      kelurahan: "",
    }))
    setDistricts([])
    setVillages([])

    try {
      const res = await apiClient.get(
        `/region/districts?regencyCode=${regencyCode}`
      )
      setDistricts(res.data?.data || res.data || [])
    } catch (err) {
      console.error("Gagal memuat data kecamatan:", err)
    }
  }

  const handleDistrictChange = async (districtCode: string) => {
    setFormData((prev) => ({
      ...prev,
      kecamatan: districtCode,
      kelurahan: "",
    }))
    setVillages([])

    try {
      const res = await apiClient.get(
        `/region/villages?districtCode=${districtCode}`
      )
      setVillages(res.data?.data || res.data || [])
    } catch (err) {
      console.error("Gagal memuat data kelurahan:", err)
    }
  }

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleLogoFileChange = (file: File | null) => {
    handleChange("logo", file)
    if (file) {
      if (logoBlobRef.current) URL.revokeObjectURL(logoBlobRef.current)
      const newUrl = URL.createObjectURL(file)
      logoBlobRef.current = newUrl
      setLogoUrl(newUrl)
    }
  }

  const handleSignatureFileChange = (file: File | null) => {
    handleChange("tandaTangan", file)
    if (file) {
      if (signatureBlobRef.current)
        URL.revokeObjectURL(signatureBlobRef.current)
      const newUrl = URL.createObjectURL(file)
      signatureBlobRef.current = newUrl
      setSignatureUrl(newUrl)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const requiredFields = [
      { key: "institutionName", label: "Nama LSP" },
      { key: "lspType", label: "Jenis LSP" },
      { key: "lspCode", label: "Kode LSP / Lisensi" },
      { key: "phoneNumber", label: "Nomor Telepon" },
      { key: "picName", label: "Nama PIC" },
      { key: "provinsi", label: "Provinsi" },
      { key: "kota", label: "Kota/Kabupaten" },
      { key: "kecamatan", label: "Kecamatan" },
      { key: "kelurahan", label: "Kelurahan/Desa" },
      { key: "alamatLengkap", label: "Alamat Lengkap" },
    ]

    const emptyFields = requiredFields.filter(
      (field) => !formData[field.key as keyof typeof formData]
    )

    if (emptyFields.length > 0) {
      const missingNames = emptyFields.map((f) => f.label).join(", ")
      toast.add({
        type: "error",
        description: `Field berikut wajib diisi: ${missingNames}`,
        priority: "high",
      })
      return
    }

    setIsSubmitting(true)

    try {
      // 1. Upload file fisik langsung ke S3
      if (formData.logo) {
        await uploadFileToPresignedUrl("logo", formData.logo)
      }

      if (formData.tandaTangan) {
        await uploadFileToPresignedUrl("chairSignature", formData.tandaTangan)
      }

      // 2. Update data profil
      const textData = {
        ...(formData.password.trim()
          ? { password: formData.password.trim() }
          : {}),
        institutionName: formData.institutionName,
        lspType: formData.lspType,
        lspCode: formData.lspCode,
        phoneNumber: formData.phoneNumber,
        picName: formData.picName,
        province: formData.provinsi,
        cityOrRegency: formData.kota,
        district: formData.kecamatan,
        village: formData.kelurahan,
        addressDetail: formData.alamatLengkap,
      }

      await apiClient.patch("/user/me", textData)

      // 3. Refresh URL gambar resmi dari server setelah upload berhasil
      const [newLogoUrl, newSignatureUrl] = await Promise.all([
        fetchMediaUrl("logo"),
        fetchMediaUrl("chairSignature"),
      ])

      if (logoBlobRef.current) {
        URL.revokeObjectURL(logoBlobRef.current)
        logoBlobRef.current = null
      }
      if (signatureBlobRef.current) {
        URL.revokeObjectURL(signatureBlobRef.current)
        signatureBlobRef.current = null
      }

      if (newLogoUrl) setLogoUrl(newLogoUrl)
      if (newSignatureUrl) setSignatureUrl(newSignatureUrl)

      // Reset state file lokal dan password
      setFormData((prev) => ({
        ...prev,
        password: "",
        logo: null,
        tandaTangan: null,
      }))

      toast.add({
        type: "success",
        description: "Pengaturan berhasil diperbarui.",
      })
    } catch (error) {
      console.error(error)
      toast.add({
        type: "error",
        description: "Terjadi kesalahan saat menyimpan data.",
        priority: "high",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex min-h-100 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  return (
    <div>
      <div className="pb-6">
        <h1 className="text-xl font-semibold tracking-tight text-black">
          Pengaturan Lembaga
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">Kelola akun Anda.</p>
      </div>
      <form
        onSubmit={handleSubmit}
        className="space-y-8 rounded-xl border border-neutral-200 bg-white p-6"
      >
        <div className="space-y-10">
          {/* Informasi Akun */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="space-y-1">
              <h2 className="text-base font-medium text-black">
                Informasi Akun
              </h2>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Kredensial login admin.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-4 md:col-span-2 md:grid-cols-2">
              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="text-sm font-medium text-black"
                >
                  Email <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="email"
                  disabled
                  value={formData.email}
                  className="w-full bg-background"
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="password"
                  className="text-sm font-medium text-black"
                >
                  Password Baru{" "}
                  <span className="font-normal text-muted-foreground">
                    (Opsional)
                  </span>
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  placeholder="Isi untuk mengganti"
                  onChange={(e) => handleChange("password", e.target.value)}
                  className="w-full bg-background"
                />
              </div>
            </div>
          </div>

          <Separator />

          {/* Legalitas Lembaga */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="space-y-1">
              <h2 className="text-base font-medium text-black">Legalitas</h2>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Identitas lisensi BNSP.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-4 md:col-span-2 md:grid-cols-2">
              <div className="space-y-2">
                <Label
                  htmlFor="institutionName"
                  className="text-sm font-medium text-black"
                >
                  Nama LSP <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="institutionName"
                  value={formData.institutionName}
                  onChange={(e) =>
                    handleChange("institutionName", e.target.value)
                  }
                  className="w-full bg-background"
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="lspType"
                  className="text-sm font-medium text-black"
                >
                  Jenis LSP <span className="text-destructive">*</span>
                </Label>
                <Select
                  value={formData.lspType}
                  onValueChange={(val) => {
                    if (val) handleChange("lspType", val)
                  }}
                >
                  <SelectTrigger id="lspType" className="w-full bg-background">
                    <SelectValue placeholder="Pilih Jenis" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="p1">P1 - Pihak Pertama</SelectItem>
                    <SelectItem value="p2">P2 - Pihak Kedua</SelectItem>
                    <SelectItem value="p3">P3 - Pihak Ketiga</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label
                  htmlFor="lspCode"
                  className="text-sm font-medium text-black"
                >
                  Kode LSP / No. Lisensi{" "}
                  <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="lspCode"
                  value={formData.lspCode}
                  onChange={(e) => handleChange("lspCode", e.target.value)}
                  className="w-full bg-background"
                />
              </div>
            </div>
          </div>

          <Separator />

          {/* Kontak & Lokasi */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="space-y-1">
              <h2 className="text-base font-medium text-black">
                Kontak & Lokasi
              </h2>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Kontak PIC dan alamat operasional.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-4 md:col-span-2 md:grid-cols-2">
              <div className="space-y-2">
                <Label
                  htmlFor="picName"
                  className="text-sm font-medium text-black"
                >
                  Nama PIC <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="picName"
                  value={formData.picName}
                  onChange={(e) => handleChange("picName", e.target.value)}
                  className="w-full bg-background"
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="phoneNumber"
                  className="text-sm font-medium text-black"
                >
                  Nomor Telepon <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={(e) => handleChange("phoneNumber", e.target.value)}
                  className="w-full bg-background"
                />
              </div>

              {/* Provinsi */}
              <div className="space-y-2">
                <Label
                  htmlFor="provinsi"
                  className="text-sm font-medium text-black"
                >
                  Provinsi <span className="text-destructive">*</span>
                </Label>
                <Select
                  value={formData.provinsi}
                  onValueChange={(val) => {
                    if (val) handleProvinceChange(val)
                  }}
                >
                  <SelectTrigger id="provinsi" className="w-full bg-background">
                    <SelectValue placeholder="Pilih Provinsi">
                      {getRegionName(provinces, formData.provinsi)}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {provinces.map((prov) => (
                      <SelectItem key={prov.code} value={prov.code}>
                        {prov.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Kota/Kabupaten */}
              <div className="space-y-2">
                <Label
                  htmlFor="kota"
                  className="text-sm font-medium text-black"
                >
                  Kota/Kabupaten <span className="text-destructive">*</span>
                </Label>
                <Select
                  value={formData.kota}
                  onValueChange={(val) => {
                    if (val) handleRegencyChange(val)
                  }}
                  disabled={!formData.provinsi}
                >
                  <SelectTrigger id="kota" className="w-full bg-background">
                    <SelectValue placeholder="Pilih Kota/Kabupaten">
                      {getRegionName(regencies, formData.kota)}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {regencies.map((reg) => (
                      <SelectItem key={reg.code} value={reg.code}>
                        {reg.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Kecamatan */}
              <div className="space-y-2">
                <Label
                  htmlFor="kecamatan"
                  className="text-sm font-medium text-black"
                >
                  Kecamatan <span className="text-destructive">*</span>
                </Label>
                <Select
                  value={formData.kecamatan}
                  onValueChange={(val) => {
                    if (val) handleDistrictChange(val)
                  }}
                  disabled={!formData.kota}
                >
                  <SelectTrigger
                    id="kecamatan"
                    className="w-full bg-background"
                  >
                    <SelectValue placeholder="Pilih Kecamatan">
                      {getRegionName(districts, formData.kecamatan)}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {districts.map((dist) => (
                      <SelectItem key={dist.code} value={dist.code}>
                        {dist.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Kelurahan/Desa */}
              <div className="space-y-2">
                <Label
                  htmlFor="kelurahan"
                  className="text-sm font-medium text-black"
                >
                  Kelurahan/Desa <span className="text-destructive">*</span>
                </Label>
                <Select
                  value={formData.kelurahan}
                  onValueChange={(val) => {
                    if (val) handleChange("kelurahan", val)
                  }}
                  disabled={!formData.kecamatan}
                >
                  <SelectTrigger
                    id="kelurahan"
                    className="w-full bg-background"
                  >
                    <SelectValue placeholder="Pilih Kelurahan/Desa">
                      {getRegionName(villages, formData.kelurahan)}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {villages.map((vil) => (
                      <SelectItem key={vil.code} value={vil.code}>
                        {vil.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label
                  htmlFor="alamatLengkap"
                  className="text-sm font-medium text-black"
                >
                  Alamat Lengkap <span className="text-destructive">*</span>
                </Label>
                <Textarea
                  id="alamatLengkap"
                  rows={3}
                  placeholder="Gedung, jalan, nomor..."
                  value={formData.alamatLengkap}
                  onChange={(e) =>
                    handleChange("alamatLengkap", e.target.value)
                  }
                  className="w-full resize-none bg-background"
                />
              </div>
            </div>
          </div>

          <Separator />

          {/* Aset Visual */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="space-y-1">
              <h2 className="text-base font-medium text-black">Aset Visual</h2>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Logo dan tanda tangan sertifikat.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-6 md:col-span-2 md:grid-cols-2">
              {/* Logo Upload */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-black">
                  Logo Lembaga
                </Label>
                <div className="relative flex min-h-40 flex-col items-center justify-center rounded-xl border-2 border-dashed border-border/80 bg-muted/20 p-4 text-center transition-all hover:border-primary/50 hover:bg-muted/40">
                  {logoUrl ? (
                    <div className="group relative flex h-32 w-full items-center justify-center rounded-lg border bg-background p-2">
                      <img
                        src={logoUrl}
                        alt="Logo Preview"
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>
                  ) : (
                    <div className="my-4 flex flex-col items-center">
                      <p className="text-xs text-muted-foreground">
                        Pilih file logo
                      </p>
                    </div>
                  )}

                  <Label
                    htmlFor="logo"
                    className="mt-2 inline-flex h-8 cursor-pointer items-center justify-center rounded-md bg-secondary px-3 text-xs font-medium text-secondary-foreground transition-colors hover:bg-secondary/80"
                  >
                    <Upload className="mr-2 h-3.5 w-3.5" />
                    {logoUrl ? "Ganti Logo" : "Upload Gambar"}
                  </Label>
                  <p className="mt-1 text-[10px] text-muted-foreground">
                    PNG / JPG (Maks. 2MB)
                  </p>

                  <Input
                    id="logo"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0] || null
                      handleLogoFileChange(file)
                    }}
                  />
                </div>
              </div>

              {/* Tanda Tangan Upload */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-black">
                  Tanda Tangan Ketua
                </Label>
                <div className="relative flex min-h-40 flex-col items-center justify-center rounded-xl border-2 border-dashed border-border/80 bg-muted/20 p-4 text-center transition-all hover:border-primary/50 hover:bg-muted/40">
                  {signatureUrl ? (
                    <div className="group relative flex h-32 w-full items-center justify-center rounded-lg border bg-background p-2">
                      <img
                        src={signatureUrl}
                        alt="Signature Preview"
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>
                  ) : (
                    <div className="my-4 flex flex-col items-center">
                      <p className="text-xs text-muted-foreground">
                        Pilih file tanda tangan
                      </p>
                    </div>
                  )}

                  <Label
                    htmlFor="tandaTangan"
                    className="mt-2 inline-flex h-8 cursor-pointer items-center justify-center rounded-md bg-secondary px-3 text-xs font-medium text-secondary-foreground transition-colors hover:bg-secondary/80"
                  >
                    <Upload className="mr-2 h-3.5 w-3.5" />
                    {signatureUrl ? "Ganti Tanda Tangan" : "Upload Gambar"}
                  </Label>
                  <p className="mt-1 text-[10px] text-muted-foreground">
                    PNG Transparan (Maks. 1MB)
                  </p>

                  <Input
                    id="tandaTangan"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0] || null
                      handleSignatureFileChange(file)
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end border-t pt-6">
          <Button
            type="submit"
            disabled={isSubmitting}
            size="lg"
            className="gap-2 shadow-none"
          >
            {isSubmitting ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Save className="h-4 w-4" />
            )}
            {isSubmitting ? "Menyimpan..." : "Simpan"}
          </Button>
        </div>
      </form>
    </div>
  )
}
