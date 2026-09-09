import { SidebarProvider } from "@/components/ui/sidebar"
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
    if (
      pathname.includes("/admin/settings") ||
      pathname.includes("/admin/pengaturan")
    )
      return "Pengaturan"
    if (pathname.includes("/admin/bantuan")) return "Pusat Bantuan"
    return "Admin Portal"
  }

  const currentTitle = getPageTitle(location.pathname)

  return (
    <SidebarProvider>
      <AdminSidebar />
      <main className="flex min-h-screen flex-1 flex-col">
        <header className="flex h-16 items-center border-b px-4 sticky top-0 bg-white">
          <span className="ml-4 text-sm font-medium">{currentTitle}</span>
        </header>

        <div className="flex-1 p-8 bg-slate-50">
          <Outlet />
        </div>
        <Toaster />
      </main>
    </SidebarProvider>
  )
}
