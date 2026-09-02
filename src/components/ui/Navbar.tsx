import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, User } from "lucide-react";
import {
    NavigationMenu,
    NavigationMenuList,
    NavigationMenuItem,
    NavigationMenuLink,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [token, setToken] = useState<string | null>(null);
    const [dashboardUrl, setDashboardUrl] = useState<string>("/login");
    const location = useLocation();

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        setToken(storedToken);

        if (storedToken) {
            const userRole = localStorage.getItem("role")?.toLowerCase();

            if (userRole === "lembaga") {
                setDashboardUrl("/admin/dashboard");
            } else if (userRole === "asesor") {
                setDashboardUrl("/asesor/dashboard");
            } else {
                setDashboardUrl("/asesi/dashboard");
            }
        }
    }, [location]);

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

    const navLinks = [
        { name: "Beranda", href: "/" },
        { name: "Tentang Kami", href: "/tentang" },
        { name: "Cek Sertifikat", href: "/cek-sertifikat" },
        { name: "Artikel", href: "/artikel" },
    ];

    return (
        <>
            <nav
                className={`fixed top-0 left-0 z-50 w-full px-6 py-4 transition-all duration-300 bg-white border-b border-border ${
                    isOpen ? "hidden md:block" : "block"
                }`}
            >
                <div className="flex items-center justify-between max-w-7xl mx-auto">
                    
                    {/* Bagian Kiri: Logo + Menu Navigasi */}
                    <div className="flex items-center gap-6">
                        <Link to="/" className="relative z-50">
                            <img
                                src="/images/Logo-transparent.svg"
                                alt="LSP Koding"
                                className="w-8 h-auto transition-all duration-300"
                            />
                        </Link>

                        <div className="hidden md:block">
                            <NavigationMenu>
                                <NavigationMenuList className="flex items-center gap-2">
                                    {navLinks.map((link) => (
                                        <NavigationMenuItem key={link.href}>
                                            <NavigationMenuLink
                                                className={`${navigationMenuTriggerStyle()} text-neutral-700 hover:text-black hover:bg-neutral-100`}
                                                href={link.href}
                                            >
                                                {link.name}
                                            </NavigationMenuLink>
                                        </NavigationMenuItem>
                                    ))}
                                </NavigationMenuList>
                            </NavigationMenu>
                        </div>
                    </div>

                    {/* Bagian Kanan: Button Masuk / Dashboard (Desktop) */}
                    <div className="hidden md:block">
                        {token ? (
                            <Link
                                to={dashboardUrl}
                                className={`${navigationMenuTriggerStyle()} px-4 py-2 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 flex items-center gap-2`}
                            >
                                <User className="w-4 h-4" />
                                <span>Dashboard</span>
                            </Link>
                        ) : (
                            <Link
                                to="/login"
                                className={`${navigationMenuTriggerStyle()} px-4 py-2 rounded-full bg-secondary hover:bg-primary hover:text-white`}
                            >
                                Masuk
                            </Link>
                        )}
                    </div>

                    {/* Tombol Masuk & Hamburger Menu (Mobile - Berdampingan) */}
                    <div className="flex items-center gap-2 md:hidden">
                        {token ? (
                            <Link
                                to={dashboardUrl}
                                className="px-4 py-2 text-sm rounded-full bg-primary text-primary-foreground flex items-center gap-1.5 font-medium"
                            >
                                <User className="w-3.5 h-3.5" />
                                <span>Dashboard</span>
                            </Link>
                        ) : (
                            <Link
                                to="/login"
                                className="px-4 py-2 text-sm rounded-full bg-secondary text-neutral-900 font-medium"
                            >
                                Masuk
                            </Link>
                        )}
                        <button
                            onClick={() => setIsOpen(true)}
                            className="relative z-50 p-2 rounded-lg transition-colors text-neutral-700 hover:bg-neutral-100"
                            aria-label="Open Menu"
                        >
                            <Menu className="w-6 h-6" />
                        </button>
                    </div>
                </div>
            </nav>

            <div
                onClick={() => setIsOpen(false)}
                className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
                    isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                }`}
            />

            <div
                className={`fixed top-0 left-0 z-50 h-full w-[75%] max-w-xs bg-white shadow-2xl p-6 flex flex-col justify-between transition-transform duration-300 ease-in-out md:hidden ${
                    isOpen ? "translate-x-0" : "-translate-x-full"
                }`}
            >
                <div>
                    <div className="flex items-center justify-between mb-8 pt-2">
                        <img src="/images/Logo-transparent.svg" alt="LSP Koding" className="w-10 h-auto" />
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
                                className="text-neutral-700 hover:text-blue-600 font-medium transition-colors py-2"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}