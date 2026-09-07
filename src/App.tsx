import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import "./index.css";

// Auth Guard
import ProtectedRoute from "./pages/auth/ProtectedRoute";

// Layouts
import PublicLayout from "./components/layout/PublicLayout.tsx";
import AdminLayout from "./components/layout/AdminLayout.tsx"; 
import AsesiLayout from "./components/layout/AsesiLayout.tsx";

// Public Pages
import Home from "./pages/public/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import VerifyEmail from "./pages/auth/VerifyEmail";

// Admin Pages
import DashboardAdmin from "./pages/admin/Dashboard"; 
import SettingsAdmin from "./pages/admin/Settings";

// Asesi Pages
import DashboardAsesi from "./pages/asesi/Dashboard";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, [pathname]);

  return null;
}

export function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />

      <Routes>
        {/* PUBLIC ROUTES */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-email" element={<VerifyEmail />} />

        {/* PROTECTED ADMIN ROUTES */}
        <Route element={<ProtectedRoute allowedRoles={["lembaga", "admin"]} />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<DashboardAdmin />} />
            <Route path="settings" element={<SettingsAdmin />} />
          </Route>
        </Route>

        {/* PROTECTED ASESI ROUTES */}
        <Route element={<ProtectedRoute allowedRoles={["asesi"]} />}>
          <Route path="/asesi" element={<AsesiLayout />}>
            <Route path="dashboard" element={<DashboardAsesi />} />
          </Route>
        </Route>

        {/* FALLBACK ROUTE (Diarahkan ke login jika URL tidak cocok) */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;