import { useEffect } from "react"
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom"

interface ProtectedRouteProps {
  allowedRoles?: string[]
}

// Helper untuk mengecek apakah JWT Token sudah expired
function isTokenExpired(token: string): boolean {
  try {
    const payloadBase64 = token.split(".")[1]
    if (!payloadBase64) return true

    const decodedJson = JSON.parse(atob(payloadBase64))
    if (!decodedJson.exp) return false

    // Bandingkan waktu sekarang dengan waktu expired token (dalam detik)
    const currentTime = Date.now() / 1000
    return decodedJson.exp < currentTime
  } catch (error) {
    return true // Anggap expired jika token invalid/error saat decode
  }
}

export default function ProtectedRoute({ allowedRoles }: ProtectedRouteProps) {
  const navigate = useNavigate()
  const location = useLocation()

  const token = localStorage.getItem("token")
  const rawRole = localStorage.getItem("role")
  const userRole = rawRole?.toString().trim().toLowerCase()

  useEffect(() => {
    const checkAuth = () => {
      const currentToken = localStorage.getItem("token")

      // Cek berkala: jika token hilang ATAU sudah kadaluarsa -> logout
      if (!currentToken || isTokenExpired(currentToken)) {
        localStorage.clear()
        navigate("/login", { replace: true, state: { from: location } })
      }
    }

    // 1. Jalankan timer pengecekan tiap 10 detik
    const interval = setInterval(checkAuth, 10000)

    // 2. Jalankan pengecekan otomatis saat tab browser kembali dibuka/fokus
    window.addEventListener("focus", checkAuth)

    return () => {
      clearInterval(interval)
      window.removeEventListener("focus", checkAuth)
    }
  }, [navigate, location])

  // 1. Cek saat awal komponen di-render: Jika tidak ada token ATAU token expired
  if (!token || isTokenExpired(token)) {
    localStorage.clear()
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  // 2. Cek Role (Otorisasi Akses)
  if (allowedRoles && !allowedRoles.includes(userRole || "")) {
    if (userRole === "lembaga" || userRole === "admin") {
      return <Navigate to="/admin/dashboard" replace />
    } else if (userRole === "asesor") {
      return <Navigate to="/asesor/dashboard" replace />
    } else {
      return <Navigate to="/asesi/dashboard" replace />
    }
  }

  // 3. Render komponen anak
  return <Outlet />
}