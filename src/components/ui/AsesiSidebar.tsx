import {
    Sidebar,
    SidebarHeader,
    SidebarContent,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    SidebarFooter,
    SidebarRail,
    SidebarMenuSub,
    SidebarMenuSubItem,
    SidebarMenuSubButton,
} from "@/components/ui/sidebar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    LayoutDashboard,
    FilePlus,
    FileText,
    LogOut,
    ShieldCheck,
    ChevronsUpDown,
    Settings,
    ClipboardPen,
    ChevronRight,
    HelpCircle,
} from "lucide-react"
import { Link, useLocation } from "react-router-dom"

const mainNavItems = [
    {
        title: "Dashboard",
        url: "/asesi/dashboard",
        icon: LayoutDashboard
    },
    {
        title: "Pengajuan Skema",
        icon: FilePlus,

    },
    {
        title: "Asesmen",
        url: "/asesi/asesmen",
        icon: ClipboardPen
    },
    {
        title: "Laporan",
        url: "/asesi/laporan",
        icon: FileText
    },
]

const otherNavItems = [
    {
        title: "Pengaturan",
        url: "/asesi/pengaturan",
        icon: Settings
    },
    {
        title: "Pusat Bantuan",
        url: "/asesi/bantuan",
        icon: HelpCircle
    },
]

const user = {
    name: "", // Kosong karena belum diisi di pengaturan
    email: "asesi@lsp.com",
    avatarUrl: "", // Kosong jika belum upload foto profil
}

const displayName = user.name && user.name.trim() !== ""
    ? user.name
    : user.email.split("@")[0];

const initialLetter = user.email ? user.email.charAt(0).toUpperCase() : "U";

export function AsesiSidebar() {
    const location = useLocation()

    // Fungsi helper untuk merender item menu (agar bisa dipakai berulang di grup berbeda)
    const renderMenuItem = (item: any) => {
        const hasSubItems = Boolean(item.subItems && item.subItems.length > 0);
        const isSubActive = hasSubItems && item.subItems?.some((sub: any) => location.pathname === sub.url);
        const isActive = item.url ? location.pathname === item.url : Boolean(isSubActive);

        if (hasSubItems) {
            return (
                <SidebarMenuItem key={item.title}>
                    <details className="group/collapsible" open={isSubActive}>
                        <summary className="flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm hover:bg-slate-100 hover:text-sidebar-accent-foreground transition-colors cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                            <item.icon className="h-4 w-4 shrink-0" />
                            <span className="truncate flex-1">{item.title}</span>
                            <ChevronRight className="ml-auto size-4 shrink-0 transition-transform duration-200 group-open/collapsible:rotate-90" />
                        </summary>
                        <SidebarMenuSub>
                            {item.subItems?.map((sub: any) => {
                                const isSubItemActive = location.pathname === sub.url;
                                return (
                                    <SidebarMenuSubItem key={sub.title}>
                                        <SidebarMenuSubButton isActive={isSubItemActive}>
                                            <Link to={sub.url} className="w-full flex items-center">
                                                <span>{sub.title}</span>
                                            </Link>
                                        </SidebarMenuSubButton>
                                    </SidebarMenuSubItem>
                                );
                            })}
                        </SidebarMenuSub>
                    </details>
                </SidebarMenuItem>
            );
        }

        return (
            <SidebarMenuItem key={item.title}>
                <SidebarMenuButton isActive={isActive} tooltip={item.title}>
                    <Link to={item.url!} className="flex items-center gap-2 w-full overflow-hidden">
                        <item.icon className="h-4 w-4 shrink-0" />
                        <span className="truncate">{item.title}</span>
                    </Link>
                </SidebarMenuButton>
            </SidebarMenuItem>
        );
    };

    return (
        <Sidebar collapsible="icon">
            <SidebarHeader className="border-b h-16 px-4 flex my-auto justify-center group-data-[collapsible=icon]:p-2 group-data-[collapsible=icon]:justify-center">
                <div className="flex items-center gap-2 overflow-hidden">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg">
                        <img src="/images/Logo-transparent.svg" alt="lsp kodingka" />
                    </div>
                    <div className="flex flex-col gap-0.5 group-data-[collapsible=icon]:hidden">
                        <span className="font-semibold text-sm truncate">LSP KODINGKA</span>
                        <span className="text-xs text-muted-foreground truncate">Asesi Portal</span>
                    </div>
                </div>
            </SidebarHeader>

            <SidebarContent>
                {/* Grup 1: Menu Utama */}
                <SidebarGroup>
                    <SidebarGroupLabel>Menu Utama</SidebarGroupLabel>
                    <SidebarMenu>
                        {mainNavItems.map(renderMenuItem)}
                    </SidebarMenu>
                </SidebarGroup>

                {/* Grup 2: Lainnya */}
                <SidebarGroup>
                    <SidebarGroupLabel>Konfigurasi</SidebarGroupLabel>
                    <SidebarMenu>
                        {otherNavItems.map(renderMenuItem)}
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>

            {/* Footer Profile with Clean Dropdown (Logout Only) */}
            <SidebarFooter className="border-t p-2 group-data-[collapsible=icon]:p-1.5 flex items-center justify-center">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger className="w-full flex items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm font-medium hover:bg-slate-100 hover:text-slate-900 transition-colors cursor-pointer data-[state=open]:bg-slate-100 data-[state=open]:text-slate-900 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:p-2">
                                <Avatar className="h-8 w-8 rounded-lg shrink-0">
                                    <AvatarImage src={user.avatarUrl} alt={displayName} />
                                    <AvatarFallback className="rounded-lg bg-primary text-primary-foreground font-bold">
                                        {initialLetter}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden">
                                    <span className="truncate font-semibold capitalize">{displayName}</span>
                                    <span className="truncate text-xs text-muted-foreground">{user.email}</span>
                                </div>
                                <ChevronsUpDown className="ml-auto size-4 shrink-0 group-data-[collapsible=icon]:hidden" />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                side="top"
                                align="end"
                                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                            >
                                <DropdownMenuGroup>
                                    <DropdownMenuLabel className="p-0 font-normal">
                                        <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                                            <Avatar className="h-8 w-8 rounded-lg">
                                                <AvatarImage src={user.avatarUrl} alt={displayName} />
                                                <AvatarFallback className="rounded-lg bg-primary text-primary-foreground font-bold">
                                                    {initialLetter}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className="grid flex-1 text-left text-sm leading-tight">
                                                <span className="truncate font-semibold capitalize">{displayName}</span>
                                                <span className="truncate text-xs text-muted-foreground">{user.email}</span>
                                            </div>
                                        </div>
                                    </DropdownMenuLabel>
                                </DropdownMenuGroup>

                                <DropdownMenuSeparator />

                                <DropdownMenuGroup>
                                    <DropdownMenuItem className="text-destructive focus:text-destructive">
                                        <LogOut className="h-4 w-4 mr-2" />
                                        <span>Keluar</span>
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>

            <SidebarRail />
        </Sidebar>
    )
}