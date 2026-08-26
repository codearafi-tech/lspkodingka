import { Mail, MapPin } from "lucide-react";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-linear-to-br from-sky-900 via-sky-950 to-blue-950 text-white mt-10 py-12 px-6 md:px-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                {/* Kolom 1: Logo & Deskripsi */}
                <div className="flex flex-col gap-4">
                    <div className="text-2xl font-medium">LSP KODINGKA</div>
                    <p className="text-white/70 text-sm leading-relaxed max-w-xs">
                        Lembaga Sertifikasi Profesi yang berkomitmen memvalidasi kompetensi
                        tenaga kerja Indonesia di bidang teknologi digital.
                    </p>
                </div>

                {/* Kolom 2: Kontak */}
                <div className="flex flex-col gap-4">
                    <h3 className="font-medium text-lg">Kontak Kami</h3>
                    <div className="flex items-start gap-3 text-sm text-white/70">
                        <MapPin size={18} className="shrink-0 text-brand-light" />
                        <p>6GVJ+HPV, Harjamukti, Kec. Harjamukti, Kota Cirebon, Jawa Barat 45143</p>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-white/70">
                        <Mail size={18} className="shrink-0 text-brand-light" />
                        <p>ptkodingka@gmail.com</p>
                    </div>
                </div>

                {/* Kolom 3: Sosial Media */}
                <div className="flex flex-col gap-4">
                    <h3 className="font-medium text-lg">Ikuti Kami</h3>
                    <div className="flex gap-4">
                        <a
                            href="#"
                            className="p-2"
                        >
                            <img
                                src="/images/instagram.png"
                                alt="Instagram"
                                className="w-6 h-6"
                            />
                        </a>
                        <a
                            href="#"
                            className="p-2"
                        >
                            <img
                                src="/images/facebook.png"
                                alt="LinkedIn"
                                className="w-6 h-6"
                            />
                        </a>
                    </div>
                </div>
            </div>

            {/* Garis Pembatas & Copyright */}
            <div className="border-t border-white/10 mt-12 pt-8 text-center text-sm text-white/50">
                <p>© {currentYear} LSP KODINGKA. All rights reserved.</p>
            </div>
        </footer>
    );
}
