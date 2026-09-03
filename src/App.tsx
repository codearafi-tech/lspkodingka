import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import "./index.css";

// Layout
import PublicLayout from "./components/layout/PublicLayout.tsx";
import AdminLayout from "./components/layout/AdminLayout.tsx"; 

// Public Pages
import Home from "./pages/public/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import VerifyEmail from "./pages/auth/VerifyEmail";

// Admin Pages
import DashboardAdmin from "./pages/admin/Dashboard"; 
import SettingsAdmin from "./pages/admin/Settings"

// Asesi Layout
import DashboardAsesi from "./pages/asesi/Dashboard";
import AsesiLayout from "./components/layout/AsesiLayout.tsx";

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
        {/* PUBLIC */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
        </Route>

        <Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
        </Route>

        {/* ADMIN (Menggunakan AdminLayout & Sidebar Shadcn) */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<DashboardAdmin />} />
          <Route path="settings" element={<SettingsAdmin />} />
        </Route>

        {/* ASESI */}
        <Route path="/asesi" element={<AsesiLayout />}>
          <Route path="/asesi/dashboard" element={<DashboardAsesi />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;