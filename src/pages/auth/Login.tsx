import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { AxiosError } from "axios"
import apiClient from "@/lib/axios" // Menggunakan instance apiClient terpusat

import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  InputGroup,
  InputGroupInput,
  InputGroupAddon,
} from "@/components/ui/input-group"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import { Eye, EyeOff } from "lucide-react"

export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setErrorMessage("")

    try {
      const response = await apiClient.post("/auth/login", {
        email,
        password,
      })

      // 1. Ekstrak data utama (menangani pembungkus data.data atau data langsung)
      const responseBody = response.data?.data || response.data

      // 2. Cari Access Token secara presisi
      const accessToken =
        responseBody?.accessToken ||
        responseBody?.access_token ||
        responseBody?.token ||
        response.data?.token

      // 3. Cari Refresh Token (jika backend mengirim lewat JSON response)
      const refreshToken =
        responseBody?.refreshToken ||
        responseBody?.refresh_token ||
        response.data?.refreshToken

      // 4. Cari User Role
      const userRole =
        responseBody?.role || responseBody?.user?.role || response.data?.role

      // 5. Validasi & Simpan ke LocalStorage
      if (accessToken) {
        localStorage.setItem("token", accessToken)
      } else {
        console.error(
          "Access token tidak ditemukan dalam response API:",
          response.data
        )
      }

      if (refreshToken) {
        localStorage.setItem("refreshToken", refreshToken)
      }

      if (userRole) {
        localStorage.setItem("role", userRole)
      }

      // 6. Redirect berdasarkan Role
      const normalizedRole = userRole?.toLowerCase()
      if (normalizedRole === "lembaga" || normalizedRole === "admin") {
        navigate("/admin/dashboard", { replace: true })
      } else if (normalizedRole === "asesor") {
        navigate("/asesor/dashboard", { replace: true })
      } else {
        navigate("/asesi/dashboard", { replace: true })
      }
    } catch (error: unknown) {
      const err = error as AxiosError<{ message?: string }>
      const errorMsg =
        err.response?.data?.message || "Email atau password salah."
      setErrorMessage(errorMsg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="flex min-h-svh flex-col items-center justify-center bg-linear-to-br from-sky-50 via-background to-indigo-50/40 p-6">
      <div className="flex w-full max-w-md flex-col gap-6 p-6 md:p-10 rounded-4xl border bg-white">
        <img
          src="/images/Kredo-Logo-Only.png"
          alt="Kredo LOGO"
          className="mx-auto h-8 w-auto object-contain"
        />

        <div>
          <h4 className="text-center text-2xl font-medium tracking-tight">
            Selamat Datang
          </h4>
          <p className="mt-1 text-center text-sm text-gray-500">
            Masuk menggunakan akun Anda.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <FieldGroup>
            {errorMessage && (
              <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-600">
                {errorMessage}
              </div>
            )}

            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                type="email"
                placeholder="email@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Field>

            <Field>
              <div className="flex items-center justify-between">
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <a
                  href="#lupa-password"
                  className="text-xs text-sky-700 hover:underline"
                >
                  Lupa password?
                </a>
              </div>
              <InputGroup>
                <InputGroupInput
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Masukkan Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <InputGroupAddon align="inline-end">
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="mx-1 cursor-pointer text-muted-foreground hover:text-foreground focus:outline-none"
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

            <Button
              type="submit"
              className="mt-2 h-10 w-full cursor-pointer"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <Spinner className="h-4 w-4" />
                  Memproses...
                </span>
              ) : (
                "Masuk"
              )}
            </Button>

            <div className="pt-2 text-center text-sm text-neutral-500">
              Belum punya akun?{" "}
              <Link
                to="/register"
                className="font-medium text-sky-700 hover:underline"
              >
                Registrasi
              </Link>
            </div>

            <div className="px-4 text-center text-xs text-neutral-400">
              Dengan melanjutkan, kamu menyetujui{" "}
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
    </section>
  )
}
