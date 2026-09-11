import { useEffect } from "react"
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom"
import "./index.css"

// Protection & Layouts
import ErrorBoundary from "./components/ErrorBoundary.tsx"
import ProtectedRoute from "./pages/auth/ProtectedRoute.tsx"
import PublicLayout from "./components/layout/PublicLayout.tsx"
import AdminLayout from "./components/layout/AdminLayout.tsx" 
import AsesiLayout from "./components/layout/AsesiLayout.tsx"

// Public Pages
import Home from "./pages/public/Home"
import Login from "./pages/auth/Login"
import Register from "./pages/auth/Register"
import VerifyEmail from "./pages/auth/VerifyEmail"
import Test from "./pages/public/test"

// Admin Pages
import DashboardAdmin from "./pages/admin/Dashboard" 
import SettingsAdmin from "./pages/admin/Settings"

// Asesi Pages
import DashboardAsesi from "./pages/asesi/Dashboard"
import SettingsAsesi from "./pages/asesi/Settings"

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    })
  }, [pathname])

  return null
}

export function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />

      <ErrorBoundary>
      <Routes>
        {/* PUBLIC ROUTES */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/test" element={<Test />} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-email" element={<VerifyEmail />} />

        {/* PROTECTED ADMIN ROUTES */}
        <Route element={<ProtectedRoute allowedRoles={["admin", "lembaga"]} />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<DashboardAdmin />} />
            <Route path="settings" element={<SettingsAdmin />} />
          </Route>
        </Route>

        {/* PROTECTED ASESI ROUTES */}
        <Route element={<ProtectedRoute allowedRoles={["asesi"]} />}>
          <Route path="/asesi" element={<AsesiLayout />}>
            <Route path="dashboard" element={<DashboardAsesi />} />
            <Route path="settings" element={<SettingsAsesi />} />
          </Route>
        </Route>

        {/* FALLBACK ROUTE */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
      </ErrorBoundary>
    </BrowserRouter>
  )
}

export default App