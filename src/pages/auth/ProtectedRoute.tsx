import { Navigate, Outlet } from "react-router-dom";

interface ProtectedRouteProps {
    allowedRoles?: string[]; // Role yang diizinkan mengakses route ini
}

export default function ProtectedRoute({ allowedRoles }: ProtectedRouteProps) {
    const token = localStorage.getItem("token");
    const rawRole = localStorage.getItem("role");
    
    // Normalize role agar tidak masalah dengan huruf kapital/spasi
    const userRole = rawRole?.toString().trim().toLowerCase();

    // 1. Cek apakah pengguna sudah login (punya token)
    if (!token) {
        // Redirect ke login jika belum login sama sekali
        return <Navigate to="/login" replace />;
    }

    // 2. Cek apakah role pengguna diizinkan masuk ke halaman ini
    if (allowedRoles && !allowedRoles.includes(userRole || "")) {
        // Jika role tidak sesuai, arahkan ke dashboard sesuai role yang dia miliki
        if (userRole === "lembaga" || userRole === "admin") {
            return <Navigate to="/admin/dashboard" replace />;
        } else if (userRole === "asesor") {
            return <Navigate to="/asesor/dashboard" replace />;
        } else {
            return <Navigate to="/asesi/dashboard" replace />;
        }
    }

    // 3. Jika lolos pengecekan, tampilkan komponen anak (halaman tujuan)
    return <Outlet />;
}