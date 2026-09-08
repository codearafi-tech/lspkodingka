import { useState, useEffect } from "react"
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
  SidebarTrigger,
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
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  LayoutGrid,
  Users,
  FileText,
  LogOut,
  ChevronsUpDown,
  Settings,
  ClipboardPen,
  ChevronRight,
  HelpCircle,
} from "lucide-react"
import { useLocation, useNavigate } from "react-router-dom"
import axios from "axios"

const mainNavItems = [
  {
    title: "Dashboard",
    url: "/admin/dashboard",
    icon: LayoutGrid,
  },
  {
    title: "Manajemen",
    icon: Users,
    subItems: [
      { title: "Asesi", url: "/admin/manajemen/asesi" },
      { title: "Asesor", url: "/admin/manajemen/asesor" },
      { title: "Skema", url: "/admin/manajemen/skema" },
      { title: "TUK", url: "/admin/manajemen/tuk" },
    ],
  },
  {
    title: "Asesmen",
    url: "/admin/asesmen",
    icon: ClipboardPen,
  },
  {
    title: "Laporan",
    url: "/admin/laporan",
    icon: FileText,
  },
]

const otherNavItems = [
  {
    title: "Pengaturan",
    url: "/admin/settings",
    icon: Settings,
  },
  {
    title: "Pusat Bantuan",
    url: "/admin/bantuan",
    icon: HelpCircle,
  },
]

interface UserProfile {
  picName: string
  email: string
}

export function AdminSidebar() {
  const location = useLocation()
  const navigate = useNavigate()

  const [user, setUser] = useState<UserProfile>({
    picName: "",
    email: "",
  })

  const API_URL = import.meta.env.VITE_API_URL

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token")
      if (!token) return

      try {
        const response = await axios.get(`${API_URL}/user/me`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        const profile = response.data.data || response.data

        setUser({
          picName: profile.picName || "",
          email: profile.email || "",
        })
      } catch (err) {
        console.error("Gagal mengambil data profil sidebar:", err)
      }
    }

    fetchUserData()
  }, [API_URL])

  // Format Penampilan Nama PIC / Fallback
  const displayName =
    user.picName && user.picName.trim() !== ""
      ? user.picName
      : user.email
        ? user.email.split("@")[0]
        : "Admin"

  // Mengambil 1 huruf pertama dari nama
  const initialLetter = displayName ? displayName.charAt(0).toUpperCase() : "A"

  // --- Logika Logout / Keluar ---
  const handleLogout = async () => {
    const token = localStorage.getItem("token")

    if (token) {
      try {
        await axios.post(
          `${API_URL}/auth/logout`,
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
      } catch (err) {
        console.error(
          "Logout di server gagal atau endpoint tidak tersedia:",
          err
        )
      }
    }

    localStorage.removeItem("token")
    localStorage.removeItem("user")

    navigate("/login", { replace: true })
  }

  const renderMenuItem = (item: any) => {
    const hasSubItems = Boolean(item.subItems && item.subItems.length > 0)
    const isSubActive =
      hasSubItems &&
      item.subItems?.some((sub: any) => location.pathname === sub.url)
    const isActive = item.url
      ? location.pathname === item.url
      : Boolean(isSubActive)

    if (hasSubItems) {
      return (
        <SidebarMenuItem key={item.title}>
          <details className="group/collapsible" open={isSubActive}>
            <summary className="flex w-full cursor-pointer list-none items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm transition-colors text-neutral-600 hover:bg-slate-100 hover:text-blue-600 [&::-webkit-details-marker]:hidden">
              <item.icon className="h-4 w-4 shrink-0" />
              <span className="flex-1 truncate">{item.title}</span>
              <ChevronRight className="ml-auto size-4 shrink-0 transition-transform duration-200 group-open/collapsible:rotate-90" />
            </summary>
            <SidebarMenuSub>
              {item.subItems?.map((sub: any) => {
                const isSubItemActive = location.pathname === sub.url
                return (
                  <SidebarMenuSubItem key={sub.title}>
                    <SidebarMenuSubButton
                      isActive={isSubItemActive}
                      onClick={() => navigate(sub.url)}
                      className="cursor-pointer text-neutral-600 hover:bg-slate-100 hover:text-blue-600"
                    >
                      <span>{sub.title}</span>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                )
              })}
            </SidebarMenuSub>
          </details>
        </SidebarMenuItem>
      )
    }

    return (
      <SidebarMenuItem key={item.title}>
        <SidebarMenuButton
          isActive={isActive}
          tooltip={item.title}
          onClick={() => navigate(item.url!)}
          className="cursor-pointer"
        >
          <item.icon className="h-4 w-4 shrink-0" />
          <span className="truncate">{item.title}</span>
        </SidebarMenuButton>
      </SidebarMenuItem>
    )
  }

  return (
    <Sidebar collapsible="icon">
      {/* Header Statis Aplikasi */}
      <SidebarHeader className="my-auto flex h-16 border-b justify-center px-4 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:p-2">
        <div className="flex items-center justify-between overflow-hidden">
          <div className="flex w-28 items-center ">
            <img src="/images/Kredo-Logo.png" alt="Kredo Logo" />
          </div>
          <div>
            <SidebarTrigger />
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu Utama</SidebarGroupLabel>
          <SidebarMenu>{mainNavItems.map(renderMenuItem)}</SidebarMenu>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Konfigurasi</SidebarGroupLabel>
          <SidebarMenu>{otherNavItems.map(renderMenuItem)}</SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer Profil Dinamis */}
      <SidebarFooter className="flex items-center justify-center border-t p-2 group-data-[collapsible=icon]:p-1.5">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex w-full cursor-pointer items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm font-medium transition-colors group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:p-2 hover:bg-slate-100 hover:text-slate-900 data-[state=open]:bg-slate-100 data-[state=open]:text-slate-900">
                <Avatar className="h-8 w-8 shrink-0 rounded-lg">
                  <AvatarFallback className="rounded-lg bg-primary font-bold text-primary-foreground">
                    {initialLetter}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden">
                  <span className="truncate font-semibold capitalize">
                    {displayName}
                  </span>
                  <span className="truncate text-xs text-muted-foreground">
                    {user.email}
                  </span>
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
                        <AvatarFallback className="rounded-lg bg-primary font-bold text-primary-foreground">
                          {initialLetter}
                        </AvatarFallback>
                      </Avatar>
                      <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="truncate font-semibold capitalize">
                          {displayName}
                        </span>
                        <span className="truncate text-xs text-muted-foreground">
                          {user.email}
                        </span>
                      </div>
                    </div>
                  </DropdownMenuLabel>
                </DropdownMenuGroup>

                <DropdownMenuSeparator />

                <DropdownMenuGroup>
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="cursor-pointer text-destructive focus:text-destructive"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
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
