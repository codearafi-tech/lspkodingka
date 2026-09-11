import { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import { Menu, X, User } from "lucide-react"
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [token, setToken] = useState<string | null>(null)
  const [dashboardUrl, setDashboardUrl] = useState<string>("/login")
  const [isScrolled, setIsScrolled] = useState(false)
  const location = useLocation()

  // Cek scroll posisi untuk merubah appearance navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const storedToken = localStorage.getItem("token")
    setToken(storedToken)

    if (storedToken) {
      const userRole = localStorage.getItem("role")?.toLowerCase()

      if (userRole === "lembaga") {
        setDashboardUrl("/admin/dashboard")
      } else if (userRole === "asesor") {
        setDashboardUrl("/asesor/dashboard")
      } else {
        setDashboardUrl("/asesi/dashboard")
      }
    }
  }, [location])

  useEffect(() => {
    setIsOpen(false)
  }, [location.pathname])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  const navLinks = [
    { name: "Beranda", href: "/" },
    { name: "Skema", href: "/skema" },
    { name: "Cek Sertifikat", href: "/cek-sertifikat" },
    { name: "Tentang Kami", href: "/tentang" },
    { name: "Artikel", href: "/artikel" },
  ]

  return (
    <>
      <nav
        className={`fixed top-0 left-0 z-50 w-full px-6 md:px-12 lg:px-20 py-4 transition-all duration-300 ${
          isOpen ? "hidden md:block" : "block"
        } ${
          isScrolled
            ? "bg-white text-neutral-900 shadow-xs"
            : "border-transparent bg-transparent text-white"
        }`}
      >
        <div className="flex items-center justify-between gap-8 md:gap-12">
          {/* 1. KIRI: Logo */}
          <div className="flex items-center shrink-0">
            <Link to="/" className="relative z-50">
              <img
                src="/images/Kodingka-Logo.png"
                alt="LSP Koding"
                className={`h-auto w-40 transition-all duration-300 ${
                  !isScrolled && "brightness-0 invert"
                }`}
              />
            </Link>
          </div>

          {/* 2. TENGAH: Menu Navigasi */}
          <div className="hidden items-center justify-center flex-1 md:flex">
            <NavigationMenu>
              <NavigationMenuList className="flex items-center justify-center gap-6 lg:gap-14">
                {navLinks.map((link) => {
                  const isActive = location.pathname === link.href
                  return (
                    <NavigationMenuItem key={link.href}>
                      <NavigationMenuLink
                        className={`${navigationMenuTriggerStyle()} bg-transparent px-0 text-base transition-colors hover:bg-transparent ${
                          isScrolled
                            ? isActive
                              ? "font-medium text-black"
                              : "text-neutral-600 hover:text-black"
                            : isActive
                            ? "font-medium text-white"
                            : "text-white/80 hover:text-white"
                        }`}
                        href={link.href}
                      >
                        {link.name}
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  )
                })}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* 3. KANAN: Button Desktop */}
          <div className="hidden items-center justify-end gap-3 shrink-0 md:flex">
            {token ? (
              <Link
                to={dashboardUrl}
                className={`flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition-colors ${
                  isScrolled
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : "bg-white text-neutral-900 hover:bg-primary/90"
                }`}
              >
                <User className="h-4 w-4" />
                <span>Dashboard</span>
              </Link>
            ) : (
              <Link
                to="/login"
                className={`rounded-xl px-5 py-2 text-sm font-medium transition-colors ${
                  isScrolled
                    ? "bg-transparent border text-neutral-900 hover:bg-primary hover:text-white"
                    : "bg-transparent border text-white hover:bg-white hover:text-neutral-900"
                }`}
              >
                Masuk
              </Link>
            )}
          </div>

          {/* Mobile Trigger & Login Button */}
          <div className="flex items-center gap-2 md:hidden">
            {token ? (
              <Link
                to={dashboardUrl}
                className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium ${
                  isScrolled
                    ? "bg-primary text-primary-foreground"
                    : "bg-white text-neutral-900"
                }`}
              >
                <User className="h-3.5 w-3.5" />
                <span>Dashboard</span>
              </Link>
            ) : (
              <Link
                to="/login"
                className={`rounded-full px-4 py-2 text-sm font-medium ${
                  isScrolled
                    ? "bg-secondary text-neutral-900"
                    : "bg-white text-neutral-900"
                }`}
              >
                Masuk
              </Link>
            )}
            <button
              onClick={() => setIsOpen(true)}
              className={`relative z-50 rounded-lg p-2 transition-colors ${
                isScrolled
                  ? "text-neutral-700 hover:bg-neutral-100"
                  : "text-white hover:bg-white/10"
              }`}
              aria-label="Open Menu"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </nav>

      {/* Overlay Mobile */}
      <div
        onClick={() => setIsOpen(false)}
        className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          isOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      />

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 left-0 z-50 flex h-full w-[75%] max-w-xs flex-col justify-between bg-white p-6 shadow-2xl transition-transform duration-300 ease-in-out md:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div>
          <div className="mb-8 flex items-center justify-between pt-2">
            <img
              src="/images/Kodingka-Logo.png"
              alt="LSP Koding"
              className="h-auto w-32"
            />
            <button
              onClick={() => setIsOpen(false)}
              className="rounded-lg p-2 text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-neutral-900"
              aria-label="Close Menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="flex flex-col space-y-4">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.href
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`py-2 font-medium transition-colors ${
                    isActive
                      ? "font-semibold text-black"
                      : "text-neutral-700 hover:text-blue-600"
                  }`}
                >
                  {link.name}
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}