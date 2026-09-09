import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import axios from "axios"
import { Turnstile } from "@marsidev/react-turnstile"
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldContent,
  FieldTitle,
  FieldDescription,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  InputGroup,
  InputGroupInput,
  InputGroupAddon,
} from "@/components/ui/input-group"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import { Eye, EyeOff, Mail, ArrowLeft, Check } from "lucide-react"

type Role = "asesi" | "lembaga"

export default function Register() {
  const navigate = useNavigate()
  const [role, setRole] = useState<Role>("asesi")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  // Khusus Lembaga
  const [namaLsp, setNamaLsp] = useState("")
  const [jenisLsp, setJenisLsp] = useState("")
  const [kodeLsp, setKodeLsp] = useState("")
  const [noTelp, setNoTelp] = useState("")
  const [pic, setPic] = useState("")

  const [turnstileToken, setTurnstileToken] = useState("")
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)

  // Stepper HANYA dipakai untuk role lembaga
  const [step, setStep] = useState<1 | 2>(1)

  const apiUrl = import.meta.env.VITE_API_URL
  const turnstileSiteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY

  const handlePhoneNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, "")
    if (val.length <= 14) setNoTelp(val)
  }

  // Saat ganti role, reset step supaya nggak nyangkut di step 2
  const handleRoleChange = (val: Role) => {
    setRole(val)
    setStep(1)
    setErrorMessage("")
  }

  const validateAkun = () => {
    if (!email || !password || !confirmPassword) {
      setErrorMessage("Mohon lengkapi semua data akun.")
      return false
    }
    if (password.length < 8) {
      setErrorMessage("Password minimal 8 karakter.")
      return false
    }
    if (password !== confirmPassword) {
      setErrorMessage("Password dan Konfirmasi Password tidak cocok.")
      return false
    }
    return true
  }

  const validateLembagaInfo = () => {
    if (!namaLsp || !jenisLsp || !kodeLsp || !noTelp || !pic) {
      setErrorMessage("Mohon lengkapi semua informasi lembaga.")
      return false
    }
    return true
  }

  const goNext = () => {
    setErrorMessage("")
    if (!validateAkun()) return
    setStep(2)
  }

  const goBack = () => {
    setErrorMessage("")
    setStep(1)
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage("")

    // Untuk asesi, semua field ada di 1 halaman → validasi akun juga di sini
    if (role === "asesi" && !validateAkun()) return
    if (role === "lembaga" && !validateLembagaInfo()) return

    if (!turnstileToken) {
      setErrorMessage(
        "Silakan selesaikan verifikasi Cloudflare terlebih dahulu."
      )
      return
    }

    setLoading(true)
    try {
      let endpoint = ""
      let payload: Record<string, any> = {}

      if (role === "lembaga") {
        endpoint = `${apiUrl}/auth/register/lembaga`
        payload = {
          email,
          password,
          institutionName: namaLsp,
          lspType: jenisLsp,
          lspCode: kodeLsp,
          phoneNumber: noTelp,
          picName: pic,
          cfToken: turnstileToken,
        }
      } else {
        endpoint = `${apiUrl}/auth/register`
        payload = { email, password, cfToken: turnstileToken }
      }

      const response = await axios.post(endpoint, payload)
      console.log("Register berhasil:", response.data)
      setIsSubmitted(true)
    } catch (err: any) {
      console.error("Error register:", err.response?.data || err.message)
      setErrorMessage(
        err.response?.data?.message || "Terjadi kesalahan saat mendaftar."
      )
    } finally {
      setLoading(false)
    }
  }

  const jenis_Lsp_List = [
    { label: "P1", value: "p1" },
    { label: "P2", value: "p2" },
    { label: "P3", value: "p3" },
  ]

  if (isSubmitted) {
    return (
      <div className="flex min-h-svh w-full items-center justify-center bg-linear-to-br from-sky-50 via-background to-indigo-50/40 p-4">
        <div className="flex w-full max-w-md flex-col gap-6 rounded-3xl border bg-white p-8 text-center shadow-xs">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-50 text-blue-600">
            <Mail className="h-6 w-6" />
          </div>
          <div>
            <h4 className="text-xl font-semibold tracking-tight text-neutral-900">
              Cek Email Anda
            </h4>
            <p className="mt-2 text-sm leading-relaxed text-gray-500">
              Kami telah mengirimkan tautan verifikasi ke{" "}
              <span className="font-medium text-neutral-700">{email}</span>.
              Silakan periksa inbox atau folder spam Anda.
            </p>
          </div>
          <Button
            onClick={() => navigate("/login")}
            className="mt-2 h-10 w-full"
          >
            Kembali ke Halaman Masuk
          </Button>
        </div>
      </div>
    )
  }

  // Konten field akun, dipakai baik di single-page (asesi) maupun step 1 (lembaga)
  const akunFields = (
    <div className="space-y-4">
        <h2 className="text-sm font-medium text-neutral-500">Data Akun</h2>
      <Field>
        <FieldLabel>Email {role === "lembaga" ? "Lembaga" : ""}</FieldLabel>
        <Input
          type="email"
          placeholder="email@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </Field>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field>
          <FieldLabel>Password</FieldLabel>
          <InputGroup>
            <InputGroupInput
              type={showPassword ? "text" : "password"}
              placeholder="Minimal 8 karakter"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <InputGroupAddon align="inline-end">
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="mr-1 cursor-pointer text-muted-foreground hover:text-foreground focus:outline-none"
                tabIndex={-1}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </InputGroupAddon>
          </InputGroup>
        </Field>

        <Field>
          <FieldLabel>Konfirmasi Password</FieldLabel>
          <InputGroup>
            <InputGroupInput
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Ulangi password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <InputGroupAddon align="inline-end">
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="mr-1 cursor-pointer text-muted-foreground hover:text-foreground focus:outline-none"
                tabIndex={-1}
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </InputGroupAddon>
          </InputGroup>
        </Field>
      </div>
    </div>
  )

  const rolePicker = (
    <Field>
      <FieldLabel className="text-sm mt-2 font-medium text-neutral-500">
        Daftar Sebagai
      </FieldLabel>
      <RadioGroup
        value={role}
        onValueChange={(val: any) => handleRoleChange(val)}
        className="grid grid-cols-1 gap-3 sm:grid-cols-2 mt-2"
      >
        <FieldLabel
          htmlFor="role-asesi"
          className={`cursor-pointer transition-all duration-200 ${
            role === "asesi"
              ? "border-sky-700 bg-sky-50/40 shadow-xs"
              : "border-neutral-200 bg-background hover:border-neutral-300"
          }`}
        >
          <Field
            orientation="horizontal"
            className="w-full items-center justify-between"
          >
            <FieldContent>
              <FieldTitle>Asesi</FieldTitle>
              <FieldDescription>Peserta sertifikasi</FieldDescription>
            </FieldContent>
            <RadioGroupItem value="asesi" id="role-asesi" />
          </Field>
        </FieldLabel>

        <FieldLabel
          htmlFor="role-lembaga"
          className={`cursor-pointer transition-all duration-200 ${
            role === "lembaga"
              ? "border-sky-700 bg-sky-50/40 shadow-xs"
              : "border-neutral-200 bg-background hover:border-neutral-300"
          }`}
        >
          <Field orientation="horizontal">
            <FieldContent>
              <FieldTitle>Lembaga</FieldTitle>
              <FieldDescription>LSP pengelola.</FieldDescription>
            </FieldContent>
            <RadioGroupItem value="lembaga" id="role-lembaga" />
          </Field>
        </FieldLabel>
      </RadioGroup>
    </Field>
  )

  const turnstileWidget = (
    <div className="flex justify-center">
      <Turnstile
        siteKey={turnstileSiteKey}
        onSuccess={(token) => setTurnstileToken(token)}
        onError={() => setTurnstileToken("")}
        onExpire={() => setTurnstileToken("")}
      />
    </div>
  )

  const stepLabels = ["Data Akun", "Info Lembaga"]

  return (
    <main className="flex min-h-svh w-full items-center justify-center bg-linear-to-br from-sky-50 via-background to-indigo-50/40 p-4 md:p-8">
      <div className="flex w-full max-w-xl flex-col gap-6 rounded-4xl border bg-white p-6 shadow-xs md:p-10">
        <img
          src="/images/Kredo-Logo-Only.png"
          alt="Kredo Logo"
          className="h-8 w-auto object-contain"
        />
        <div>
          <h4 className="text-center text-2xl font-medium tracking-tight">
            Registrasi Akun
          </h4>
          <p className="mt-1 text-center text-sm text-gray-500">
            Lengkapi informasi untuk mendaftar sebagai{" "}
            {role === "asesi" ? "Asesi" : "Lembaga"}.
          </p>
        </div>

        {/* Progress Indicator — HANYA muncul untuk role lembaga */}
        {role === "lembaga" && (
          <div className="flex items-center justify-center gap-2">
            {stepLabels.map((label, idx) => {
              const stepNum = idx + 1
              const isActive = stepNum === step
              const isDone = stepNum < step
              return (
                <div key={label} className="flex items-center gap-2">
                  <div className="flex flex-col items-center gap-1">
                    <div
                      className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-medium transition-colors ${
                        isDone
                          ? "bg-sky-700 text-white"
                          : isActive
                            ? "border-2 border-sky-700 text-sky-700"
                            : "border border-neutral-200 text-neutral-400"
                      }`}
                    >
                      {isDone ? <Check className="h-3.5 w-3.5" /> : stepNum}
                    </div>
                    <span
                      className={`text-[11px] ${
                        isActive
                          ? "font-medium text-neutral-700"
                          : "text-neutral-400"
                      }`}
                    >
                      {label}
                    </span>
                  </div>
                  {idx < stepLabels.length - 1 && (
                    <div
                      className={`mb-4 h-px w-8 ${isDone ? "bg-sky-700" : "bg-neutral-200"}`}
                    />
                  )}
                </div>
              )
            })}
          </div>
        )}

        <form onSubmit={handleRegister}>
          <FieldGroup>
            {errorMessage && (
              <div className="mb-4 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-600">
                {errorMessage}
              </div>
            )}

            {/* ===================== ROLE: ASESI — single page, tanpa stepper ===================== */}
            {role === "asesi" && (
              <>
                {rolePicker}
                {akunFields}

                <div className="my-4">{turnstileWidget}</div>

                <Button
                  type="submit"
                  className="h-10 w-full"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <Spinner className="h-4 w-4" />
                      Memproses...
                    </span>
                  ) : (
                    "Daftar"
                  )}
                </Button>
              </>
            )}

            {/* ===================== ROLE: LEMBAGA — pakai stepper 2 langkah ===================== */}
            {role === "lembaga" && step === 1 && (
              <>
                {rolePicker}
                {akunFields}

                <Button
                  type="button"
                  onClick={goNext}
                  className="mt-6 h-10 w-full"
                >
                  Lanjut
                </Button>
              </>
            )}

            {role === "lembaga" && step === 2 && (
              <>
                <div className="space-y-4">
                  <h5 className="text-sm font-medium text-neutral-500">
                    Informasi Lembaga
                  </h5>

                  <Field>
                    <FieldLabel>Nama LSP</FieldLabel>
                    <Input
                      type="text"
                      placeholder="Nama Lembaga Sertifikasi Profesi"
                      value={namaLsp}
                      onChange={(e) => setNamaLsp(e.target.value)}
                      required
                    />
                  </Field>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <Field>
                      <FieldLabel>Jenis LSP</FieldLabel>
                      <Select
                        value={jenisLsp}
                        onValueChange={(val) => setJenisLsp(val ?? "")}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih Jenis LSP" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {jenis_Lsp_List.map((item) => (
                              <SelectItem key={item.value} value={item.value}>
                                {item.label}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </Field>

                    <Field>
                      <FieldLabel>Kode LSP</FieldLabel>
                      <Input
                        type="text"
                        placeholder="Kode LSP"
                        value={kodeLsp}
                        onChange={(e) => setKodeLsp(e.target.value)}
                        required
                      />
                    </Field>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <Field>
                      <FieldLabel>Nomor Telepon</FieldLabel>
                      <Input
                        type="tel"
                        placeholder="08xxxxxxxxxx"
                        value={noTelp}
                        onChange={handlePhoneNumber}
                        required
                      />
                    </Field>

                    <Field>
                      <FieldLabel>PIC (Person in Charge)</FieldLabel>
                      <Input
                        type="text"
                        placeholder="Nama Penanggung Jawab"
                        value={pic}
                        onChange={(e) => setPic(e.target.value)}
                        required
                      />
                    </Field>
                  </div>
                </div>

                <div className="border-neutral-200 pt-4">
                  {turnstileWidget}
                </div>

                <div className="mt-6 flex gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={goBack}
                    className="h-10 flex-1"
                  >
                    <ArrowLeft className="mr-1 h-4 w-4" />
                    Kembali
                  </Button>
                  <Button
                    type="submit"
                    className="h-10 flex-1"
                    disabled={loading}
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <Spinner className="h-4 w-4" />
                        Memproses...
                      </span>
                    ) : (
                      "Daftar"
                    )}
                  </Button>
                </div>
              </>
            )}

            <div className="mt-6 text-center text-sm text-neutral-500">
              Sudah punya akun?{" "}
              <Link
                to="/login"
                className="font-medium text-sky-700 hover:underline"
              >
                Masuk
              </Link>
            </div>

            <div className="px-4 text-center text-xs text-neutral-400">
              Dengan mendaftar, kamu menyetujui{" "}
              <Link to="/terms" className="underline hover:text-neutral-600">
                Syarat & Ketentuan
              </Link>{" "}
              serta{" "}
              <Link to="/privacy" className="underline hover:text-neutral-600">
                Kebijakan Privasi
              </Link>
              .
            </div>
          </FieldGroup>
        </form>
      </div>
    </main>
  )
}
