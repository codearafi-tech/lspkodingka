import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AsesiSidebar } from "@/components/ui/AsesiSidebar"
import { Outlet } from "react-router-dom"

export default function AsesiLayout() {
    return (
        <SidebarProvider>
            <AsesiSidebar />
            <main className="flex-1 flex flex-col min-h-screen">
                <header className="flex items-center h-16 px-2 border-b bg-background">
                    <SidebarTrigger />
                    <span className="ml-4 font-semibold">Dashboard</span>
                </header>

                <div className="p-6 flex-1 bg-muted/20">
                    <Outlet />
                </div>
            </main>
        </SidebarProvider>
    )
}