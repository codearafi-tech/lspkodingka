import { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import { Menu, X, User, ChevronDown } from "lucide-react"
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
  NavigationMenuContent,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

const schemesList = [
  { title: "Asisten Web Developer", href: "/skema/asisten-web-developer" },
  { title: "AI Digital Marketing", href: "/skema/ai-digital-marketing" },
  { title: "Teknisi Operator Komputer", href: "/skema/teknisi-operator-komputer" },
  { title: "Network Desainer", href: "/skema/network-desainer" },
  { title: "Data Scientist", href: "/skema/data-scientist" },
  { title: "Data Analis", href: "/skema/data-analis" },
  { title: "Desainer Grafis Muda", href: "/skema/desainer-grafis-muda" },
  { title: "Public Speaking", href: "/skema/public-speaking" },
  { title: "AI Content Creator", href: "/skema/ai-content-creator" },
  { title: "Video Editor", href: "/skema/video-editor" },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMobileSkemaOpen, setIsMobileSkemaOpen] = useState(false)
  const [token, setToken] = useState<string | null>(null)
  const [dashboardUrl, setDashboardUrl] = useState<string>("/login")
  const [isScrolled, setIsScrolled] = useState(false)
  const location = useLocation()
  const lightPages = ["/tentang-kami", "/artikel"]

  // Tentukan halaman yang memakai tema navbar terang
  const isLightHeaderPage =
    location.pathname !== "/" &&
    lightPages.some((path) => location.pathname.startsWith(path))

  const isLightMode = isScrolled || isLightHeaderPage

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const storedToken = localStorage.getItem("token")
    setToken(storedToken)

    if (storedToken) {
      const userRole = localStorage.getItem("role")?.toLowerCase()
      if (userRole === "lembaga") setDashboardUrl("/admin/dashboard")
      else if (userRole === "asesor") setDashboardUrl("/asesor/dashboard")
      else setDashboardUrl("/asesi/dashboard")
    }
  }, [location])

  useEffect(() => {
    setIsOpen(false)
    setIsMobileSkemaOpen(false)
  }, [location.pathname])

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset"
  }, [isOpen])

  return (
    <>
      <nav
        className={`fixed top-0 left-0 z-50 w-full px-6 py-4 transition-all duration-300 md:px-12 lg:px-20 ${
          isOpen ? "hidden md:block" : "block"
        } ${
          isLightMode
            ? "bg-white text-neutral-900 shadow-xs"
            : "border-transparent bg-transparent text-white"
        }`}
      >
        <div className="flex items-center justify-between gap-8 md:gap-12">
          {/* Logo */}
          <div className="flex shrink-0 items-center">
            <Link to="/" className="relative z-50">
              <img
                src="/images/Kodingka-Logo.png"
                alt="LSP Koding"
                className={`h-auto w-40 transition-all duration-300 ${
                  !isLightMode && "brightness-0 invert"
                }`}
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden flex-1 items-center justify-center md:flex">
            <NavigationMenu>
              <NavigationMenuList className="flex items-center justify-center gap-6 lg:gap-10">
                <NavigationMenuItem>
                  <NavigationMenuLink
                    className={`${navigationMenuTriggerStyle()} bg-transparent px-0 text-base transition-colors hover:bg-transparent focus:bg-transparent data-active:bg-transparent ${
                      isLightMode
                        ? location.pathname === "/"
                          ? "font-medium text-black"
                          : "text-neutral-600 hover:text-black"
                        : location.pathname === "/"
                          ? "font-medium text-white"
                          : "text-white/80 hover:text-white"
                    }`}
                    href="/"
                  >
                    Beranda
                  </NavigationMenuLink>
                </NavigationMenuItem>

                {/* Dropdown Menu Skema */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger
                    className={`bg-transparent px-0 text-base transition-colors hover:bg-transparent focus:bg-transparent data-[state=open]:bg-transparent data-active:bg-transparent ${
                      isLightMode
                        ? location.pathname.startsWith("/skema")
                          ? "font-medium text-black"
                          : "text-neutral-600 hover:text-black"
                        : location.pathname.startsWith("/skema")
                          ? "font-medium text-white"
                          : "text-white/80 hover:text-white"
                    }`}
                  >
                    Skema
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid w-100 gap-2 p-4 md:w-125 md:grid-cols-2">
                      {schemesList.map((scheme) => (
                        <Link
                          key={scheme.href}
                          to={scheme.href}
                          className="rounded-md p-2 text-sm text-neutral-700 transition-colors hover:bg-neutral-100 hover:text-neutral-900"
                        >
                          {scheme.title}
                        </Link>
                      ))}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink
                    className={`${navigationMenuTriggerStyle()} bg-transparent px-0 text-base transition-colors hover:bg-transparent focus:bg-transparent data-active:bg-transparent ${
                      isLightMode
                        ? location.pathname === "/cek-sertifikat"
                          ? "font-medium text-black"
                          : "text-neutral-600 hover:text-black"
                        : location.pathname === "/cek-sertifikat"
                          ? "font-medium text-white"
                          : "text-white/80 hover:text-white"
                    }`}
                    href="/cek-sertifikat"
                  >
                    Cek Sertifikat
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink
                    className={`${navigationMenuTriggerStyle()} bg-transparent px-0 text-base transition-colors hover:bg-transparent focus:bg-transparent data-active:bg-transparent ${
                      isLightMode
                        ? location.pathname === "/tentang-kami"
                          ? "font-medium text-black"
                          : "text-neutral-600 hover:text-black"
                        : location.pathname === "/tentang-kami"
                          ? "font-medium text-white"
                          : "text-white/80 hover:text-white"
                    }`}
                    href="/tentang-kami"
                  >
                    Tentang Kami
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink
                    className={`${navigationMenuTriggerStyle()} bg-transparent px-0 text-base transition-colors hover:bg-transparent focus:bg-transparent data-active:bg-transparent ${
                      isLightMode
                        ? location.pathname === "/artikel"
                          ? "font-medium text-black"
                          : "text-neutral-600 hover:text-black"
                        : location.pathname === "/artikel"
                          ? "font-medium text-white"
                          : "text-white/80 hover:text-white"
                    }`}
                    href="/artikel"
                  >
                    Artikel
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Button Desktop */}
          <div className="hidden shrink-0 items-center justify-end gap-3 md:flex">
            {token ? (
              <Link
                to={dashboardUrl}
                className={`flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition-colors ${
                  isLightMode
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
                  isLightMode
                    ? "border bg-transparent text-neutral-900 hover:bg-primary hover:text-white"
                    : "border bg-transparent text-white hover:bg-white hover:text-neutral-900"
                }`}
              >
                Masuk
              </Link>
            )}
          </div>

          {/* Mobile Trigger */}
          <div className="flex items-center gap-2 md:hidden">
            {token ? (
              <Link
                to={dashboardUrl}
                className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium ${
                  isLightMode
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
                  isLightMode
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
                isLightMode
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
        className={`fixed top-0 left-0 z-50 flex h-full w-[80%] max-w-xs flex-col justify-between overflow-y-auto bg-white p-6 shadow-2xl transition-transform duration-300 ease-in-out md:hidden ${
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

          <div className="flex flex-col space-y-3">
            <Link
              to="/"
              className={`py-2 font-medium transition-colors ${
                location.pathname === "/"
                  ? "font-semibold text-black"
                  : "text-neutral-700"
              }`}
            >
              Beranda
            </Link>

            {/* Accordion / Collapsible Skema di Mobile */}
            <div>
              <button
                onClick={() => setIsMobileSkemaOpen(!isMobileSkemaOpen)}
                className="flex w-full items-center justify-between py-2 font-medium text-neutral-700"
              >
                <span>Skema</span>
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-200 ${
                    isMobileSkemaOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isMobileSkemaOpen && (
                <div className="ml-3 flex flex-col space-y-2 border-l-2 border-neutral-200 pt-1 pl-3">
                  {schemesList.map((scheme) => (
                    <Link
                      key={scheme.href}
                      to={scheme.href}
                      className="py-1 text-sm text-neutral-600 hover:text-black"
                    >
                      {scheme.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              to="/cek-sertifikat"
              className={`py-2 font-medium transition-colors ${
                location.pathname === "/cek-sertifikat"
                  ? "font-semibold text-black"
                  : "text-neutral-700"
              }`}
            >
              Cek Sertifikat
            </Link>

            <Link
              to="/tentang-kami"
              className={`py-2 font-medium transition-colors ${
                location.pathname === "/tentang-kami"
                  ? "font-semibold text-black"
                  : "text-neutral-700"
              }`}
            >
              Tentang Kami
            </Link>

            <Link
              to="/artikel"
              className={`py-2 font-medium transition-colors ${
                location.pathname === "/artikel"
                  ? "font-semibold text-black"
                  : "text-neutral-700"
              }`}
            >
              Artikel
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
