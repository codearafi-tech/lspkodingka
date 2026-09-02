import { useState } from "react";
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge.tsx"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious
} from "@/components/ui/carousel";
import { Separator } from "@/components/ui/separator";

const partners = [
    { name: "Mitra 1", logo: "/images/Mitra-1.webp" },
    { name: "Mitra 2", logo: "/images/Mitra-2.webp" },
    { name: "Mitra 3", logo: "/images/Mitra-3.webp" },
    { name: "Mitra 4", logo: "/images/Mitra-4.webp" },
    { name: "Mitra 5", logo: "/images/Mitra-5.webp" },
    { name: "Mitra 6", logo: "/images/Mitra-6.webp" },
    { name: "Mitra 7", logo: "/images/Mitra-7.webp" },
    { name: "Mitra 8", logo: "/images/Mitra-8.webp" },
    { name: "Mitra 9", logo: "/images/Mitra-9.webp" },
    { name: "Mitra 10", logo: "/images/Mitra-10.webp" },
    { name: "Mitra 11", logo: "/images/Mitra-11.webp" },
    { name: "Mitra 12", logo: "/images/Mitra-12.webp" },
    { name: "Mitra 13", logo: "/images/Mitra-13.webp" },
    { name: "Mitra 14", logo: "/images/Mitra-14.webp" },
    { name: "Mitra 15", logo: "/images/Mitra-15.webp" },
];

const faqData = [
    {
        question: "Apa saja persyaratan utama untuk mendaftar sertifikasi?",
        answer: "Persyaratan umum meliputi ijazah minimal SLTA sederajat, portofolio kerja/pendidikan yang relevan, serta bukti kompetensi yang sesuai dengan skema yang dipilih."
    },
    {
        question: "Berapa lama masa berlaku sertifikat kompetensi?",
        answer: "Sertifikat kompetensi umumnya berlaku selama 3 tahun sejak tanggal diterbitkan, sesuai dengan ketentuan BNSP."
    },
    {
        question: "Bagaimana jika hasil asesmen dinyatakan belum kompeten?",
        answer: "Anda akan mendapatkan kesempatan untuk melakukan banding sesuai arahan asesor."
    }
];


export default function Home() {

    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const [activeTab, setActiveTab] = useState("overview");

    const schemesData = [
        {
            id: 1,
            title: "Asistant Web Developer",
            category: "okupasi",
            categoryLabel: "Okupasi",
            units: "6 Unit Kompetensi",
            price: "Rp1.000.000",
            image: "images/Asistant Web Developer.webp",
            isPopular: true,
        },
        {
            id: 2,
            title: "Digital Marketing",
            category: "klaster",
            categoryLabel: "Klaster",
            units: "7 Unit Kompetensi",
            price: "Rp800.000",
            image: "images/Digital Marketing.webp",
            isPopular: true,
        },
        {
            id: 3,
            title: "Teknisi Operator Komputer",
            category: "okupasi",
            categoryLabel: "Okupasi",
            units: "8 Unit Kompetensi",
            price: "Rp800.000",
            image: "images/Teknisi Operator Komputer.webp",
            isPopular: true,
        },
        {
            id: 4,
            title: "Network Desainer",
            category: "okupasi",
            categoryLabel: "Okupasi",
            units: "11 Unit Kompetensi",
            price: "Rp1.500.000",
            image: "images/Network Desainer.webp",
            isPopular: false,
        },
        {
            id: 5,
            title: "Data Scientist",
            category: "okupasi",
            categoryLabel: "Okupasi",
            units: "11 Unit Kompetensi",
            price: "Rp1.500.000",
            image: "images/Data Scientist.webp",
            isPopular: false,
        },
        {
            id: 6,
            title: "Data Analyst",
            category: "okupasi",
            categoryLabel: "Okupasi",
            units: "8 Unit Kompetensi",
            price: "Rp1.000.000",
            image: "images/Data Analyst.webp",
            isPopular: false,
        },
        {
            id: 7,
            title: "Desainer Grafis Muda",
            category: "okupasi",
            categoryLabel: "Okupasi",
            units: "8 Unit Kompetensi",
            price: "Rp900.000",
            image: "images/Desainer Grafis.webp",
            isPopular: false,
        },
        {
            id: 8,
            title: "Public Speaking",
            category: "klaster",
            categoryLabel: "Klaster",
            units: "8 Unit Kompetensi",
            price: "Rp500.000",
            image: "images/Public Speaking.webp",
            isPopular: false,
        },
        {
            id: 9,
            title: "Content Creator",
            category: "klaster",
            categoryLabel: "Klaster",
            units: "9 Unit Kompetensi",
            price: "Rp800.000",
            image: "images/Content Creator.webp",
            isPopular: false,
        },
        {
            id: 10,
            title: "Video Editor",
            category: "okupasi",
            categoryLabel: "Okupasi",
            units: "11 Unit Kompetensi",
            price: "Rp950.000",
            image: "images/Video Editor.webp",
            isPopular: false,
        },
    ];

    const filteredSchemes = schemesData.filter((scheme) => {
        if (activeTab === "overview") return true;
        if (activeTab === "analytics") return scheme.category === "okupasi";
        if (activeTab === "reports") return scheme.category === "klaster";
        return true;
    });

    return (
        <>
            {/* Hero */}
            <section className="px-6 py-6 md:px-20 md:py-20 lg:min-h-svh flex flex-col justify-between">
                <div className="flex flex-col justify-end h-full relative z-20 pt-20 md:pt-20">
                    <h1 className="text-5xl sm:text-4xl md:text-6xl lg:max-w-3xl font-medium tracking-tight leading-tight">
                        Validasi keahlianmu bersama kami
                    </h1>
                    <div className="flex flex-col md:flex-row-reverse justify-between items-start md:items-center gap-6 md:gap-0 mt-6 md:mt-8">
                        <p className="max-w-xs text-sm sm:text-base text-neutral-600">
                            Lembaga sertifikasi profesional resmi untuk bidang AI dan teknologi.
                        </p>
                        <div className="flex flex-row w-full md:w-auto gap-3">
                            <Button
                                size="lg"
                                className="flex-1 rounded-full px-4 py-6 cursor-pointer bg-sky-700 hover:bg-sky-700/80"
                                onClick={() => {
                                    const element = document.getElementById("skema");
                                    if (element) {
                                        element.scrollIntoView({ behavior: "smooth" });
                                    }
                                }}
                            >
                                Eksplor program
                            </Button>
                            <Button
                                size="lg"
                                variant="secondary"
                                className="flex-1 rounded-full px-4 py-6"
                            >
                                <a href="#konsultasi">Konsultasi gratis</a>
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="mb-6 mt-8 md:mt-14">
                    <Separator />
                </div>

                {/* Partner Section Full-Width (Keluar dari padding section utama) */}
                <div className="relative z-20 w-full overflow-hidden -mx-6] md:-mx-20 md:w-[calc(100%+160px)]">
                    <p className="text-xs uppercase tracking-wider text-neutral-600 font-mono mb-6 md:px-20">Dipercaya Berbagai Institusi</p>

                    <div className="relative w-full flex overflow-hidden py-4">
                        <motion.div
                            className="flex gap-16 items-center shrink-0"
                            animate={{ x: ["0%", "-50%"] }}
                            transition={{ repeat: Infinity, duration: 35, ease: "linear" }}
                        >
                            {[...partners, ...partners].map((partner, index) => (
                                <div key={index} className="flex items-center justify-center shrink-0">
                                    <img
                                        src={partner.logo}
                                        alt={partner.name}
                                        className="max-h-12 max-w-32 object-contain opacity-85 hover:opacity-100 transition-opacity"
                                    />
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* About */}
            <section className="px-6 py-8 md:px-20 md:py-10">
                <div className="mb-12">
                    <p className="leading-tight text-2xl md:text-4xl font-medium max-w-2xl tracking-tight">Menjadi jembatan bagi kamu untuk meraih pengakuan resmi</p>
                </div>
                <div>
                    <img src="images/Hero-banner.webp" alt="lsp kodingka" className="h-125 rounded-3xl w-full object-cover object-top" />
                </div>
                <div className="max-w-2xl space-y-2 mt-6">
                    <h6 className="font-medium lg:text-lg tracking-tight">Mengenal tentang kami</h6>
                    <p className="leading-relaxed text-neutral-600 max-w-xl lg:text-lg">
                        Kodingka berkomitmen untuk mencetak talenta digital Indonesia yang kompeten dan siap bersaing di era industri modern.
                    </p>
                    <div className="mt-4">
                        <Link to="/tentang-kami" className="font-medium lg:text-lg flex items-center gap-2 hover:gap-2.5">
                            Selengkapnya
                            <ArrowRight size={16}></ArrowRight>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Schemes */}
            <section className="px-6 py-8 md:px-20 md:py-10 " id="skema">
                <div className="max-w-lg mb-12">
                    <h2 className="mt-3 text-2xl md:text-4xl font-medium tracking-tight leading-tight">
                        Pilih skema sertifikasi sesuai dengan kebutuhan Anda
                    </h2>
                </div>

                <Tabs className="-mt-4" defaultValue="overview" onValueChange={(value) => setActiveTab(value)}>
                    <TabsList variant="line" className="flex gap-2">
                        <TabsTrigger className="text-base" value="overview">Semua</TabsTrigger>
                        <TabsTrigger className="text-base" value="analytics">Okupasi</TabsTrigger>
                        <TabsTrigger className="text-base" value="reports">Klaster</TabsTrigger>
                    </TabsList>
                </Tabs>

                <div className="mt-8">
                    <Carousel
                        opts={{
                            align: "start",
                            loop: false,
                        }}
                        className="w-full"
                    >
                        <CarouselContent className="px-4 pb-4">
                            {filteredSchemes.map((scheme) => (
                                <CarouselItem key={scheme.id} className="pl-4 md:basis-1/2 lg:basis-1/4">
                                    {/* Desain Card Baru */}
                                    <div className="border border-neutral-200 rounded-3xl w-full overflow-hidden bg-white mx-auto">
                                        <div className="relative w-full">
                                            {scheme.isPopular && (
                                                <Badge className="absolute right-4 top-4 z-10">Populer</Badge>
                                            )}
                                            <img
                                                src={scheme.image}
                                                alt={`Sertifikasi ${scheme.title}`}
                                                className="w-full aspect-video object-cover"
                                                loading="lazy"
                                            />
                                        </div>
                                        <div className="mt-6 px-6 pb-6">
                                            <h4 className="font-semibold text-lg text-neutral-900 line-clamp-1">
                                                {scheme.title}
                                            </h4>
                                            <div className="flex items-center gap-2 mt-2 text-neutral-600">
                                                <span className="text-sm">{scheme.categoryLabel}</span>
                                                <Separator orientation="vertical" className="h-4" />
                                                <span className="text-sm">{scheme.units}</span>
                                            </div>
                                            <div className="mt-4 pt-4 border-t border-neutral-100 flex items-center justify-between">
                                                <span className="text-xs text-neutral-600 font-medium">Investasi</span>
                                                <div className="font-semibold text-neutral-900 text-base">
                                                    {scheme.price}
                                                </div>
                                            </div>
                                            <Button size="icon" variant="secondary" className="rounded-full w-full px-4 mt-4">
                                                Detail
                                            </Button>
                                        </div>
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>

                        <div className="flex justify-center items-center gap-4 mt-6">
                            <CarouselPrevious className="static translate-y-0 rounded-full border-neutral-200 hover:bg-neutral-100" />
                            <CarouselNext className="static translate-y-0 rounded-full border-neutral-200 hover:bg-neutral-100" />
                        </div>
                    </Carousel>
                </div>
            </section>

            <section className="px-6 py-12 md:px-20 md:py-16 bg-white">
                <div className="max-w-xl mb-12">
                    <h2 className="text-2xl md:text-4xl font-medium tracking-tight leading-tight text-neutral-900">
                        Pahami bagaimana alur proses sertifikasi dilaksanakan
                    </h2>
                </div>

                <div className="w-full mx-auto relative overflow-hidden rounded-3xl min-h-112.5 flex items-center justify-center p-8">
                    {/* Background Image dengan Blur Penuh */}
                    <img
                        src="/images/background-gradient.jpg"
                        alt=""
                        className="absolute inset-0 w-full h-full object-cover filter blur-2xl scale-110 pointer-events-none"
                    />

                    {/* Konten List di Tengah */}
                    <div className="relative z-10 w-full max-w-md space-y-2">
                        {[
                            {
                                step: "01",
                                title: "Pendaftaran",
                                desc: "Mengisi formulir dan memilih skema sertifikasi yang sesuai dengan kompetensi Anda."
                            },
                            {
                                step: "02",
                                title: "Verifikasi Dokumen",
                                desc: "Pemeriksaan kelayakan berkas persyaratan administratif dan portofolio oleh tim asesor."
                            },
                            {
                                step: "03",
                                title: "Pembekalan & Asesmen",
                                desc: "Sesi persiapan kompetensi serta pengisian formulir asesmen mandiri (APL-02)."
                            },
                            {
                                step: "04",
                                title: "Keputusan Sertifikasi",
                                desc: "Sidang pleno oleh komite teknis untuk menetapkan hasil rekomendasi kompeten."
                            },
                            {
                                step: "05",
                                title: "Penerbitan Sertifikat",
                                desc: "Pencetakan dan penyerahan sertifikat resmi berstandar nasional bagi yang lulus."
                            },
                        ].map((item, index) => {
                            const isFirst = index === 0;
                            const isLast = index === 4;

                            return (
                                <div
                                    key={index}
                                    className="flex items-center justify-center"
                                >
                                    {/* Konten Teks dengan Radius Dinamis */}
                                    <div className={`
                                        flex items-center gap-3 py-4 px-5 bg-white backdrop-blur-sm w-72 shadow-sm transition-all
                                        ${isFirst ? 'rounded-t-2xl' : ''}
                                        ${isLast ? 'rounded-b-2xl' : ''}
                                        ${!isFirst && !isLast ? 'rounded-md' : ''}
                                    `}>
                                        <div className="font-semibold text-sm">{item.step}</div>
                                        <div className="w-px h-4 bg-neutral-300"></div>
                                        <h3 className="font-medium text-sm text-neutral-900">
                                            {item.title}
                                        </h3>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className="max-w-4xl mt-6">
                    <p className="lg:text-2xl tracking-tight">Seluruh tahapan dirancang secara transparan dan terstandarisasi untuk memastikan kompetensi peserta teruji secara objektif hingga penerbitan sertifikat resmi.</p>
                </div>
            </section>

            {/* FAQ */}
            <section className="px-6 py-8 md:px-20 md:py-10">
                <div className="flex flex-col md:flex-row">
                    <div className="flex-2">
                        <h2 className="text-2xl md:text-4xl font-medium tracking-tight leading-tight">
                            Pertanyaan seputar sertifikasi
                        </h2>
                        <p className="mt-3 text-gray-600 mb-10 max-w-sm lg:text-lg">
                            Berikut informasi penting yang perlu Anda ketahui sebelum memulai proses sertifikasi.
                        </p>
                    </div>

                    <div className="flex-2 flex flex-col gap-4">
                        {faqData.map((item, index) => (
                            <div key={index} className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                                <button
                                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                    className="w-full flex justify-between items-center p-6 text-left font-medium text-slate-800"
                                >
                                    {item.question}
                                    <motion.div
                                        animate={{ rotate: openIndex === index ? 180 : 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <ChevronDown size={20} className="text-brand" />
                                    </motion.div>
                                </button>

                                <AnimatePresence>
                                    {openIndex === index && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="px-6 pb-6 text-base text-slate-600 leading-relaxed"
                                        >
                                            {item.answer}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="px-6 py-8 md:px-20 md:py-20 bg-neutral-50 mt-12">
                <div>
                    <h2 className="leading-tight text-2xl md:text-4xl font-medium max-w-lg tracking-tight mb-6">
                        Sampaikan pertanyaan Anda, kami siap berdiskusi.
                    </h2>
                    <div className="flex flex-col w-fit">
                        <a
                            href="https://wa.me/6285316261399?text=Halo%20LSP%20KODINGKA,%20saya%20masih%20ragu%20dan%20ingin%20konsultasi%20tentang%20skema%20sertifikasi."
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm md:text-base px-6 py-3 font-medium bg-sky-700 hover:bg-sky-700/80 text-white rounded-full transition-colors flex items-center justify-center gap-2"
                        >
                            <span>Konsultasi sekarang</span>
                        </a>
                    </div>
                </div>
            </section>
            <div className="w-full h-1 bg-linear-to-r from-blue-700 via-sky-500 to-cyan-400"></div>
        </>
    )
}