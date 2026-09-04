import { FaInstagram, FaLinkedin, FaWhatsapp, FaYoutube } from "react-icons/fa6";
import { MapPin, Mail } from "lucide-react";

export default function Footer() {
    return (
        <footer className="px-6 py-12 md:px-28 border-t border-neutral-200 bg-white">
            {/* Grid Utama */}
            <img src="/images/Logo-transparent.svg" alt="Logo LSP" className="w-10 h-auto" />
            <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-neutral-200 mt-6">
                
                {/* Kolom 1: Logo & Slogan (Mengambil 5 Kolom) */}
                <div className="md:col-span-5 space-y-6">
                    <h4 className="text-2xl md:text-3xl tracking-tight font-medium text-neutral-900 leading-snug">
                        Validasi keahlianmu <br /> bersama kami
                    </h4>
                    <p className="text-sm text-neutral-600 max-w-sm">
                        Lembaga Sertifikasi Profesi terpercaya untuk memastikan kompetensi kerja yang berstandar industri.
                    </p>
                </div>

                {/* Kolom 2: Kontak & Alamat (Mengambil 4 Kolom) */}
                <div className="md:col-span-4 space-y-4">
                    <div className="font-medium text-neutral-900 text-base mb-2">
                        Kontak & Alamat
                    </div>
                    <div className="flex items-start gap-3 text-sm text-neutral-600">
                        <div className="bg-neutral-100 p-2.5 rounded-full shrink-0 text-neutral-800 mt-0.5">
                            <MapPin size={16} />
                        </div>
                        <p className="leading-relaxed">6GVJ+HPV, Harjamukti, Kec. Harjamukti, Kota Cirebon, Jawa Barat 45143</p>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-neutral-600">
                        <div className="bg-neutral-100 p-2.5 rounded-full shrink-0 text-neutral-800">
                            <Mail size={16} />
                        </div>
                        <span className="text-neutral-800 font-medium">ptkodingka@gmail.com</span>
                    </div>
                </div>

                {/* Kolom 3: Sosial Media (Mengambil 3 Kolom) */}
                <div className="md:col-span-3 space-y-4">
                    <div className="font-medium text-neutral-900 text-base mb-2">
                        Ikuti Kami
                    </div>
                    <p className="text-sm text-neutral-600">
                        Dapatkan informasi dan pembaruan terbaru seputar skema sertifikasi.
                    </p>
                    <div className="flex items-center gap-3 pt-2">
                        {[
                            { icon: FaInstagram, href: "https://instagram.com" },
                            { icon: FaLinkedin, href: "https://linkedin.com" },
                            { icon: FaWhatsapp, href: "https://wa.me/xxx" },
                            { icon: FaYoutube, href: "https://youtube.com" },
                        ].map((item, index) => {
                            const IconComponent = item.icon;
                            return (
                                <a 
                                    key={index}
                                    href={item.href} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="bg-neutral-100 hover:bg-neutral-200 text-neutral-700 hover:text-neutral-900 p-3 rounded-full transition-colors flex items-center justify-center"
                                >
                                    <IconComponent className="w-4 h-4" />
                                </a>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Bagian Bawah: Copyright & Policy */}
            <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-neutral-600">
                <div className="flex items-center gap-2">
                    <span>©lspkodingka.id</span>
                    <span className="w-1 h-1 bg-neutral-400 rounded-full" />
                    <span>Dibuat oleh nawastra</span>
                </div>
                <div className="flex gap-6">
                    <a href="#" className="hover:text-neutral-900 transition-colors">Kebijakan Privasi</a>
                    <a href="#" className="hover:text-neutral-900 transition-colors">Syarat & Ketentuan</a>
                </div>
            </div>
        </footer>
    );
}