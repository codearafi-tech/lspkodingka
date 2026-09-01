import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AdminSidebar } from "@/components/ui/AdminSidebar"
import { Outlet, useLocation } from "react-router-dom"
import { Toaster } from "@/components/ui/toast"

export default function AdminLayout() {
    const location = useLocation()
    const getPageTitle = (pathname: string) => {
        if (pathname.includes("/admin/dashboard")) return "Dashboard"
        if (pathname.includes("/admin/manajemen/asesi")) return "Manajemen Asesi"
        if (pathname.includes("/admin/manajemen/asesor")) return "Manajemen Asesor"
        if (pathname.includes("/admin/manajemen/skema")) return "Manajemen Skema"
        if (pathname.includes("/admin/manajemen/tuk")) return "Manajemen TUK"
        if (pathname.includes("/admin/asesmen")) return "Asesmen"
        if (pathname.includes("/admin/laporan")) return "Laporan"
        if (pathname.includes("/admin/settings") || pathname.includes("/admin/pengaturan")) return "Pengaturan"
        if (pathname.includes("/admin/bantuan")) return "Pusat Bantuan"
        return "Admin Portal"
    }

    const currentTitle = getPageTitle(location.pathname)

    return (
        <SidebarProvider>
            <AdminSidebar />
            <main className="flex-1 flex flex-col min-h-screen">
                <header className="flex items-center h-16 px-4 border-b bg-background">
                    <SidebarTrigger />
                    <span className="ml-4 font-semibold text-lg">{currentTitle}</span>
                </header>

                <div className="p-6 flex-1 bg-muted/20">
                    <Outlet />
                </div>
                <Toaster />
            </main>
        </SidebarProvider>
    )
}