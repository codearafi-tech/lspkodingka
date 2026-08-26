import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, User, LogOut } from "lucide-react";
import {
    NavigationMenu,
    NavigationMenuList,
    NavigationMenuItem,
    NavigationMenuLink,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"; // Pastikan komponen dropdown UI Anda sudah ada, atau sesuaikan

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [token, setToken] = useState<string | null>(null);
    const location = useLocation();
    const navigate = useNavigate();

    const isHome = location.pathname === "/";

    // Cek token setiap kali lokasi/halaman berubah atau komponen dimuat
    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        setToken(storedToken);
    }, [location]);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 20) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        setIsOpen(false);
    }, [location.pathname]);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
    }, [isOpen]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        setToken(null);
        navigate("/login");
    };

    const transparentMode = isHome && !isScrolled;

    const navLinks = [
        { name: "Beranda", href: "/" },
        { name: "Tentang Kami", href: "/tentang" },
        { name: "Cek Sertifikat", href: "/cek-sertifikat" },
    ];

    return (
        <>
            {/* Navbar Utama */}
            <nav
                className={`fixed top-0 left-0 z-50 w-full px-6 md:px-16 py-3 transition-all duration-300 ${
                    isOpen ? "hidden md:block" : "block"
                } ${
                    transparentMode
                        ? "bg-transparent shadow-none"
                        : "bg-sky-950"
                }`}
            >
                <div className="flex items-center justify-between max-w-7xl mx-auto">
                    {/* Logo Dinamis */}
                    <Link to="/" className="relative z-50">
                        <img
                            src="/images/Logo.png"
                            alt="LSP Koding"
                            className={`w-24 h-auto transition-all duration-300 brightness-0 invert`}
                        />
                    </Link>

                    {/* Menu Navigasi Desktop */}
                    <div className="hidden md:block">
                        <NavigationMenu>
                            <NavigationMenuList className="flex items-center">
                                {navLinks.map((link) => (
                                    <NavigationMenuItem key={link.href}>
                                        <NavigationMenuLink
                                            className={`${navigationMenuTriggerStyle()} ${
                                                transparentMode
                                                    ? "text-white bg-transparent hover:bg-white/20 hover:text-white"
                                                    : "text-white hover:bg-white/20"
                                            }`}
                                            href={link.href}
                                        >
                                            {link.name}
                                        </NavigationMenuLink>
                                    </NavigationMenuItem>
                                ))}

                                <NavigationMenuItem>
                                    {token ? (
                                        /* Jika Sudah Login (Ada Token) -> Tampilkan Menu Profil / Dashboard */
                                        <div className="ml-2 flex items-center gap-2">
                                            <NavigationMenuLink
                                                className={`${navigationMenuTriggerStyle()} rounded-sm bg-secondary text-secondary-foreground hover:bg-secondary/80 flex items-center gap-2`}
                                                href="/asesi/dashboard"
                                            >
                                                <User className="w-4 h-4" />
                                                <span>Dashboard</span>
                                            </NavigationMenuLink>
                                            <button
                                                onClick={handleLogout}
                                                title="Keluar"
                                                className="p-2 text-white hover:bg-white/20 rounded-md transition-colors cursor-pointer"
                                            >
                                                <LogOut className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ) : (
                                        /* Jika Belum Login -> Tampilkan Tombol Masuk */
                                        <NavigationMenuLink
                                            className={`${navigationMenuTriggerStyle()} rounded-sm bg-secondary text-secondary-foreground hover:bg-[color-mix(in_oklch,var(--secondary),var(--foreground)_5%)] ml-2`}
                                            href="/login"
                                        >
                                            Masuk
                                        </NavigationMenuLink>
                                    )}
                                </NavigationMenuItem>
                            </NavigationMenuList>
                        </NavigationMenu>
                    </div>

                    {/* Tombol Hamburger Mobile */}
                    <button
                        onClick={() => setIsOpen(true)}
                        className={`md:hidden relative z-50 p-2 rounded-lg transition-colors text-white hover:bg-white/20`}
                        aria-label="Open Menu"
                    >
                        <Menu className="w-6 h-6" />
                    </button>
                </div>
            </nav>

            {/* Backdrop Blur */}
            <div
                onClick={() => setIsOpen(false)}
                className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
                    isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                }`}
            />

            {/* Sidebar Drawer Mobile */}
            <div
                className={`fixed top-0 right-0 z-50 h-full w-[75%] max-w-xs bg-white shadow-2xl p-6 flex flex-col justify-between transition-transform duration-300 ease-in-out md:hidden ${
                    isOpen ? "translate-x-0" : "translate-x-full"
                }`}
            >
                <div>
                    <div className="flex items-center justify-between mb-8 pt-2">
                        <img src="/images/Logo.png" alt="LSP Koding" className="w-24 h-auto" />
                        <button
                            onClick={() => setIsOpen(false)}
                            className="p-2 text-neutral-600 hover:text-neutral-900 rounded-lg hover:bg-neutral-100 transition-colors"
                            aria-label="Close Menu"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="flex flex-col space-y-4">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                to={link.href}
                                className="text-neutral-700 hover:text-blue-600 font-medium transition-colors py-1 border-b border-slate-100"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>
                </div>

                <div className="pb-6 flex gap-2">
                    {token ? (
                        <>
                            <Link
                                to="/asesi/dashboard"
                                className="w-full flex items-center justify-center gap-2 py-3 bg-primary text-primary-foreground hover:bg-primary/90 rounded-md font-medium"
                            >
                                <User className="w-4 h-4" />
                                <span>Dashboard Asesi</span>
                            </Link>
                        </>
                    ) : (
                        <Link
                            to="/login"
                            className="w-full flex items-center justify-center py-3 bg-primary text-primary-foreground hover:bg-primary/90 rounded-md font-medium"
                        >
                            Masuk
                        </Link>
                    )}
                </div>
            </div>
        </>
    );
}