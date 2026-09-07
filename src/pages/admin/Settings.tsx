import { useState, useEffect } from "react"
import axios from "axios"
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
import { Separator } from "@/components/ui/separator"
import { Upload, Save, Loader2 } from "lucide-react"
import { toast } from "@/components/ui/toast"

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

  const API_URL = import.meta.env.VITE_API_URL

  useEffect(() => {
    const fetchInitialData = async () => {
      setIsLoading(true)
      const token = localStorage.getItem("token")
      const authHeader = { Authorization: `Bearer ${token}` }

      try {
        // 1. Fetch Provinces & Profile secara paralel
        const [provRes, profileRes] = await Promise.all([
          axios.get(`${API_URL}/region/provinces`),
          axios.get(`${API_URL}/user/me`, { headers: authHeader }),
        ])

        setProvinces(provRes.data.data || provRes.data)
        const profile = profileRes.data.data || profileRes.data

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

        // 2. Fetch Presigned Preview URLs
        if (profile.logoKey) {
          axios
            .get(`${API_URL}/user/me/uploads/logo`, { headers: authHeader })
            .then((res) =>
              setLogoUrl(res.data.url || res.data.uploadUrl || res.data)
            )
            .catch((err) => console.error("Gagal mengambil URL logo:", err))
        }

        if (profile.chairSignatureKey || profile.signatureKey) {
          axios
            .get(`${API_URL}/user/me/uploads/chairSignature`, {
              headers: authHeader,
            })
            .then((res) =>
              setSignatureUrl(res.data.url || res.data.uploadUrl || res.data)
            )
            .catch((err) =>
              console.error("Gagal mengambil URL tanda tangan:", err)
            )
        }

        // 3. Sequential Cascade Loading untuk Wilayah Terpilih
        if (profile.province) {
          const regRes = await axios.get(
            `${API_URL}/region/regencies?provinceCode=${profile.province}`
          )
          setRegencies(regRes.data.data || regRes.data)
        }
        if (profile.cityOrRegency) {
          const distRes = await axios.get(
            `${API_URL}/region/districts?regencyCode=${profile.cityOrRegency}`
          )
          setDistricts(distRes.data.data || distRes.data)
        }
        if (profile.district) {
          const vilRes = await axios.get(
            `${API_URL}/region/villages?districtCode=${profile.district}`
          )
          setVillages(vilRes.data.data || vilRes.data)
        }
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
  }, [API_URL])

  // Cleanup Object URL untuk mencegah memory leak
  useEffect(() => {
    return () => {
      if (logoUrl.startsWith("blob:")) URL.revokeObjectURL(logoUrl)
      if (signatureUrl.startsWith("blob:")) URL.revokeObjectURL(signatureUrl)
    }
  }, [logoUrl, signatureUrl])

  const uploadFileToPresignedUrl = async (
    field: "logo" | "chairSignature",
    file: File
  ) => {
    const token = localStorage.getItem("token")
    const authHeader = { Authorization: `Bearer ${token}` }

    const presignedRes = await axios.post(
      `${API_URL}/user/me/uploads/${field}`,
      {
        contentType: file.type,
        sizeBytes: file.size,
      },
      { headers: authHeader }
    )

    const uploadUrl =
      presignedRes.data.url || presignedRes.data.uploadUrl || presignedRes.data

    // Direct upload ke S3 / Storage (Tanpa Authorization header aplikasi)
    await axios.put(uploadUrl, file, {
      headers: {
        "Content-Type": file.type,
      },
    })
  }

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
      const res = await axios.get(
        `${API_URL}/region/regencies?provinceCode=${provinceCode}`
      )
      setRegencies(res.data.data || res.data)
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
      const res = await axios.get(
        `${API_URL}/region/districts?regencyCode=${regencyCode}`
      )
      setDistricts(res.data.data || res.data)
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
      const res = await axios.get(
        `${API_URL}/region/villages?districtCode=${districtCode}`
      )
      setVillages(res.data.data || res.data)
    } catch (err) {
      console.error("Gagal memuat data kelurahan:", err)
    }
  }

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const requiredFields = [
      { key: "email", label: "Email" },
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
      const textData = {
        email: formData.email,
        ...(formData.password && { password: formData.password }),
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

      await axios.patch(`${API_URL}/user/me`, textData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })

      if (formData.logo) {
        await uploadFileToPresignedUrl("logo", formData.logo)
      }

      if (formData.tandaTangan) {
        await uploadFileToPresignedUrl("chairSignature", formData.tandaTangan)
      }

      toast.add({
        type: "success",
        description: "Pengaturan lembaga berhasil diperbarui.",
      })
    } catch (error) {
      console.error(error)
      toast.add({
        type: "error",
        description: "Terjadi kesalahan saat menyimpan perubahan.",
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
    <form onSubmit={handleSubmit} className="space-y-8 px-10 pb-6">
      <div>
        <h1 className="text-lg font-semibold tracking-tight">
          Pengaturan Lembaga
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Kelola informasi akun, legalitas, alamat, dan operasional LSP Anda di
          sini.
        </p>
      </div>

      {/* 1. Informasi Akun */}
      <div className="space-y-4">
        <div>
          <h3 className="text-base leading-none font-semibold">
            Informasi Akun
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Kredensial login untuk akses administrator LSP.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="email">
              Email <span className="text-red-500">*</span>
            </Label>
            <Input
              id="email"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password Baru (Opsional)</Label>
            <Input
              id="password"
              type="password"
              placeholder="Kosongkan jika tidak ingin mengubah"
              onChange={(e) => handleChange("password", e.target.value)}
            />
          </div>
        </div>
      </div>

      <Separator />

      {/* 2. Legalitas Lembaga */}
      <div className="space-y-4">
        <div>
          <h3 className="text-base leading-none font-semibold">
            Legalitas Lembaga
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Identitas resmi dan lisensi lembaga sertifikasi profesi.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="space-y-2">
            <Label htmlFor="institutionName">
              Nama LSP <span className="text-red-500">*</span>
            </Label>
            <Input
              id="institutionName"
              value={formData.institutionName}
              onChange={(e) => handleChange("institutionName", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lspType">
              Jenis LSP <span className="text-red-500">*</span>
            </Label>
            <Select
              value={formData.lspType}
              onValueChange={(val) => {
                if (val) handleChange("lspType", val)
              }}
            >
              <SelectTrigger id="lspType" className="w-full">
                <SelectValue placeholder="Pilih Jenis LSP" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="p1">P1 - Pihak Pertama</SelectItem>
                <SelectItem value="p2">P2 - Pihak Kedua</SelectItem>
                <SelectItem value="p3">P3 - Pihak Ketiga</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="lspCode">
              Kode LSP / Lisensi <span className="text-red-500">*</span>
            </Label>
            <Input
              id="lspCode"
              value={formData.lspCode}
              onChange={(e) => handleChange("lspCode", e.target.value)}
            />
          </div>
        </div>
      </div>

      <Separator />

      {/* 3. Kontak & Alamat */}
      <div className="space-y-4">
        <div>
          <h3 className="text-base leading-none font-semibold">
            Kontak & Alamat
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Informasi narahubung serta lokasi operasional lembaga.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="picName">
              Nama PIC <span className="text-red-500">*</span>
            </Label>
            <Input
              id="picName"
              value={formData.picName}
              onChange={(e) => handleChange("picName", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phoneNumber">
              Nomor Telepon <span className="text-red-500">*</span>
            </Label>
            <Input
              id="phoneNumber"
              value={formData.phoneNumber}
              onChange={(e) => handleChange("phoneNumber", e.target.value)}
            />
          </div>

          {/* Provinsi */}
          <div className="space-y-2">
            <Label htmlFor="provinsi">
              Provinsi <span className="text-red-500">*</span>
            </Label>
            <Select
              value={formData.provinsi}
              onValueChange={(val) => {
                if (val) handleProvinceChange(val)
              }}
            >
              <SelectTrigger id="provinsi" className="w-full">
                <SelectValue placeholder="Pilih Provinsi" />
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
            <Label htmlFor="kota">
              Kota/Kabupaten <span className="text-red-500">*</span>
            </Label>
            <Select
              value={formData.kota}
              onValueChange={(val) => {
                if (val) handleRegencyChange(val)
              }}
              disabled={!formData.provinsi}
            >
              <SelectTrigger id="kota" className="w-full">
                <SelectValue placeholder="Pilih Kota/Kabupaten" />
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
            <Label htmlFor="kecamatan">
              Kecamatan <span className="text-red-500">*</span>
            </Label>
            <Select
              value={formData.kecamatan}
              onValueChange={(val) => {
                if (val) handleDistrictChange(val)
              }}
              disabled={!formData.kota}
            >
              <SelectTrigger id="kecamatan" className="w-full">
                <SelectValue placeholder="Pilih Kecamatan" />
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
            <Label htmlFor="kelurahan">
              Kelurahan/Desa <span className="text-red-500">*</span>
            </Label>
            <Select
              value={formData.kelurahan}
              onValueChange={(val) => {
                if (val) handleChange("kelurahan", val)
              }}
              disabled={!formData.kecamatan}
            >
              <SelectTrigger id="kelurahan" className="w-full">
                <SelectValue placeholder="Pilih Kelurahan/Desa" />
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
            <Label htmlFor="alamatLengkap">
              Alamat Lengkap <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="alamatLengkap"
              placeholder="Nama jalan, gedung, nomor kantor..."
              value={formData.alamatLengkap}
              onChange={(e) => handleChange("alamatLengkap", e.target.value)}
            />
          </div>
        </div>
      </div>

      <Separator />

      {/* 4. Ruang Lingkup & Operasional */}
      <div className="space-y-4">
        <div>
          <h3 className="text-base leading-none font-semibold">
            Ruang Lingkup & Operasional
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Unggah aset visual lembaga seperti logo resmi dan tanda tangan
            ketua.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {/* Logo */}
          <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-input bg-background p-4 text-center">
            {logoUrl ? (
              <img
                src={logoUrl}
                alt="Logo Preview"
                className="mb-2 h-20 w-auto rounded border object-contain"
              />
            ) : (
              <Upload className="mb-2 h-6 w-6 text-muted-foreground" />
            )}
            <Label
              htmlFor="logo"
              className="cursor-pointer text-sm font-medium"
            >
              Logo Lembaga
            </Label>
            <span className="mb-3 text-xs text-muted-foreground">
              PNG (Maks. 2MB)
            </span>
            <Input
              id="logo"
              type="file"
              accept="image/*"
              className="h-9 max-w-xs cursor-pointer text-xs"
              onChange={(e) => {
                const file = e.target.files?.[0] || null
                handleChange("logo", file)
                if (file) setLogoUrl(URL.createObjectURL(file))
              }}
            />
          </div>

          {/* Tanda Tangan */}
          <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-input bg-background p-4 text-center">
            {signatureUrl ? (
              <img
                src={signatureUrl}
                alt="Signature Preview"
                className="mb-2 h-20 w-auto rounded border object-contain"
              />
            ) : (
              <Upload className="mb-2 h-6 w-6 text-muted-foreground" />
            )}
            <Label
              htmlFor="tandaTangan"
              className="cursor-pointer text-sm font-medium"
            >
              Tanda Tangan (Ketua LSP)
            </Label>
            <span className="mb-3 text-xs text-muted-foreground">
              PNG Transparan (Maks. 1MB)
            </span>
            <Input
              id="tandaTangan"
              type="file"
              accept="image/*"
              className="h-9 max-w-xs cursor-pointer text-xs"
              onChange={(e) => {
                const file = e.target.files?.[0] || null
                handleChange("tandaTangan", file)
                if (file) setSignatureUrl(URL.createObjectURL(file))
              }}
            />
          </div>
        </div>
      </div>

      {/* Tombol Simpan */}
      <div className="flex justify-end gap-4 border-t pt-4">
        <Button type="submit" disabled={isSubmitting} className="gap-2">
          {isSubmitting ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Save className="h-4 w-4" />
          )}
          {isSubmitting ? "Menyimpan..." : "Simpan"}
        </Button>
      </div>
    </form>
  )
}
