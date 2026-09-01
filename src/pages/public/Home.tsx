import { useState } from "react";
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, MessageCircleQuestion } from "lucide-react";
import { Link } from "react-router-dom";
import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge.tsx"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious
} from "@/components/ui/carousel";

import { MailBadge, BrainCircuit, ScrollText } from 'lucide-react';


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
            title: "Digital Marketing",
            category: "klaster",
            categoryLabel: "Klaster",
            units: "7 Unit Kompetensi",
            price: "Rp800.000",
            image: "images/Digital Marketing.webp",
            isPopular: true,
        },
        {
            id: 2,
            title: "Asistant Web Developer",
            category: "okupasi",
            categoryLabel: "Okupasi",
            units: "6 Unit Kompetensi",
            price: "Rp1.000.000",
            image: "images/Asistant Web Developer.webp",
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
        if (activeTab === "overview") return true; // Tab "Semua"
        if (activeTab === "analytics") return scheme.category === "okupasi"; // Tab "Okupasi"
        if (activeTab === "reports") return scheme.category === "klaster"; // Tab "Klaster"
        return true;
    });

    return (
        <>

            {/* Hero */}
            <section className="relative px-6 py-15 md:px-20 md:py-28 h-svh flex flex-col justify-end overflow-hidden">
                <img
                    src="/images/Hero-banner-potrait.webp"
                    alt="Hero Banner"
                    fetchPriority="high"
                    className="absolute inset-0 w-full h-full object-cover object-top md:hidden"
                />
                <img
                    src="/images/Hero-banner.webp"
                    alt="Hero Banner"
                    fetchPriority="high"
                    className="absolute inset-0 w-full h-full object-cover object hidden md:block"
                />

                <div className="absolute inset-0 bg-linear-to-r from-black/60 via-black/20 to-black/0 z-10"></div>

                <div className="flex flex-col justify-end h-full relative z-20">
                    <h1 className="text-5xl md:text-6xl font-medium lg:font-normal tracking-tight leading-tight text-white">Sertifikasikan Profesimu.</h1>
                    <p className="mt-2 text-neutral-50 max-w-md">Kami adalah Lembaga sertifikasi profesional resmi untuk bidang AI dan teknologi digital.</p>
                    <Button size="lg" className="mt-6 w-full md:w-fit" onClick={() => {
                        const element = document.getElementById("skema");
                        if (element) {
                            element.scrollIntoView({ behavior: "smooth" });
                        }
                    }}>
                        Jelajahi Skema
                    </Button>
                </div>
            </section>

            {/* About */}
            <section className="px-6 py-12 md:px-20 md:py-20 flex flex-col md:flex-row gap-8 md:gap-20 items-start  bg-slate-50">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-sky-900"></div>
                    <div className="font-medium text-sky-900">Tentang Kami</div>
                </div>
                <div className="max-w-2xl space-y-2">
                    <p className="text-xl md:text-2xl  leading-relaxed">
                        Berfokus secara khusus pada bidang AI dan teknologi digital.
                        Kodingka berkomitmen untuk mencetak talenta-talenta digital Indonesia yang profesional, kompeten, dan siap bersaing di era industri modern.
                    </p>
                    <Link to="/tentang-kami" className="text-sky-900 hover:underline underline md:no-underline">Selengkapnya</Link>
                </div>
            </section>

            {/* Partners */}
            <section className="px-2 py-10 md:px-14 md:py-20">
                <div className="mx-auto px-6">
                    <div className="mb-12 text-center">
                        <h2 className="antialiased tracking-tight text-xl">
                            Dipercaya Berbagai Institusi
                        </h2>
                    </div>

                    {/* Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 border-t border-l border-slate-100">
                        {partners.map((partner, index) => {
                            const isEven = index % 2 === 0;
                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    className={`border-r border-b border-slate-200 p-8 flex items-center justify-center transition-all duration-300 group ${isEven ? "bg-white" : "bg-neutral-50/70"
                                        } hover:bg-sky-50/50`}
                                >
                                    <div className="w-full h-16 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                                        <img
                                            src={partner.logo}
                                            alt={partner.name}
                                            className="max-h-14 max-w-35 object-contain opacity-90 group-hover:opacity-100 transition-opacity"
                                        />
                                    </div>
                                </motion.div>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* Reasons */}
            <section className="px-6 py-12 md:px-20 md:py-20">
                <div className="max-w-xl mb-16 mx-auto">
                    <h2 className="text-center text-3xl md:text-5xl leading-snug tracking-tight">
                        Kami Adalah Solusi Tepat untuk Anda
                    </h2>
                    <p className="text-center mt-3 text-base md:text-base text-neutral-600">
                        Akses pengujian digital yang kredibel, cepat, dan selaras dengan kebutuhan industri untuk memperkuat daya saing Anda.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto">

                    {/* Card 1 (Putih dengan efek gradasi bawah) */}
                    <div className="relative overflow-hidden border border-slate-200/80 rounded-xl p-6 h-70 bg-white flex flex-col justify-between flex-1">
                        {/* Lapisan Gradasi Halus di Bagian Bawah */}
                        <div className="absolute inset-0 bg-linear-to-tr from-sky-100/60 via-transparent to-transparent pointer-events-none" />

                        <div className="self-end text-xs font-semibold text-slate-400 z-10">01</div>
                        <div className="relative z-10">
                            <div className="w-12 h-12 mb-6 rounded-full border border-slate-200 flex items-center justify-center text-slate-900">
                                <MailBadge size={24} />
                            </div>
                            <h4 className="text-lg md:text-xl font-medium text-slate-900 tracking-tight">Sertifikat Resmi</h4>
                            <p className="text-sm mt-2 text-neutral-600 leading-relaxed">Diakui secara nasional untuk menunjang jenjang karier di berbagai sektor industri.</p>
                        </div>
                    </div>

                    {/* Card 2 (Biru Utama - Penyeimbang Tengah) */}
                    <div className="relative overflow-hidden border border-slate-200/80 rounded-xl p-6 h-70 bg-white flex flex-col justify-between flex-1">
                        <div className="absolute inset-0 bg-linear-to-tr from-sky-100/60 via-transparent to-transparent pointer-events-none" />
                        <div className="self-end text-xs font-semibold text-slate-400">02</div>
                        <div className="relative z-10">
                            <div className="w-12 h-12 mb-6 rounded-full border border-slate-200 flex items-center justify-center text-slate-900">
                                <BrainCircuit size={24}></BrainCircuit>
                            </div>
                            <h4 className="text-lg md:text-xl font-medium text-slate-900 tracking-tight">Proses Cepat & Transparan</h4>
                            <p className="text-sm mt-2 text-neutral-600 leading-relaxed">Sistem pendaftaran hingga ujian berbasis digital yang terintegrasi penuh.</p>
                        </div>
                    </div>

                    {/* Card 3 (Putih dengan efek gradasi bawah) */}
                    <div className="relative overflow-hidden border border-slate-200/80 rounded-xl p-6 h-70 bg-white flex flex-col justify-between flex-1">
                        {/* Lapisan Gradasi Halus di Bagian Bawah */}
                        <div className="absolute inset-0 bg-linear-to-tr from-sky-100/60 via-transparent to-transparent pointer-events-none" />

                        <div className="self-end text-xs font-semibold text-slate-400 z-10">03</div>
                        <div className="relative z-10">
                            <div className="w-12 h-12 mb-6 rounded-full border border-slate-200 flex items-center justify-center text-slate-900">
                                <ScrollText size={24}></ScrollText>
                            </div>
                            <h4 className="text-lg md:text-xl font-medium text-slate-900 tracking-tight">Kurikulum Industri</h4>
                            <p className="text-sm mt-2 text-neutral-600 leading-relaxed">Materi uji disesuaikan langsung dengan kebutuhan masa kini dan standar industri.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Schemes */}
            <section className="px-6 py-10 md:px-14 md:py-20 bg-linear-to-b from-slate-50 via-slate-50 to-white" id="skema">
                <div className="max-w-prose mb-12">
                    <h2 className="text-3xl md:text-5xl leading-snug tracking-tight">
                        Skema Sertifikasi
                    </h2>
                    <p className="mt-3 text-sm md:text-base text-neutral-600">
                        Pilih skema sertifikasi yang sesuai dengan kebutuhan Anda.
                    </p>
                </div>

                {/* Tab Navigation */}
                <Tabs className="-mt-4" defaultValue="overview" onValueChange={(value) => setActiveTab(value)}>
                    <TabsList variant="line">
                        <TabsTrigger value="overview">Semua</TabsTrigger>
                        <TabsTrigger value="analytics">Okupasi</TabsTrigger>
                        <TabsTrigger value="reports">Klaster</TabsTrigger>
                    </TabsList>
                </Tabs>

                {/* Shadcn Carousel Container */}
                <div className="mt-8">
                    <Carousel
                        opts={{
                            align: "start",
                            loop: false,
                        }}
                        className="w-full"
                    >
                        <CarouselContent className="px-4 pb-1">
                            {filteredSchemes.map((scheme) => (
                                <CarouselItem key={scheme.id} className="pl-4 md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                                    <Card className="relative mx-auto w-full max-w-md pt-0">
                                        <div className="relative">
                                            <img
                                                src={scheme.image}
                                                alt={`Sertifikasi ${scheme.title}`}
                                                className="relative z-20 aspect-video w-full object-cover object-right"
                                                loading="lazy"
                                            />
                                            {scheme.isPopular && (
                                                <Badge className="absolute z-30 top-4 right-4">Populer</Badge>
                                            )}
                                        </div>
                                        <CardHeader className="flex flex-col gap-4">
                                            <div className="flex justify-between items-center w-full">
                                                <div>
                                                    <CardTitle className="text-lg">{scheme.title}</CardTitle>
                                                    <CardDescription className="text-xs">
                                                        KODINGKA
                                                    </CardDescription>
                                                </div>
                                            </div>
                                            <div className="flex gap-1">
                                                <Badge variant="secondary">{scheme.categoryLabel}</Badge>
                                                <Badge variant="secondary">{scheme.units}</Badge>
                                            </div>
                                            <div className="font-semibold">{scheme.price}</div>
                                        </CardHeader>
                                        <CardFooter>
                                            <Button className="w-full">Detail Skema</Button>
                                        </CardFooter>
                                    </Card>
                                </CarouselItem>
                            ))}
                        </CarouselContent>


                        <div className="flex justify-center items-center gap-4 mt-6">
                            <CarouselPrevious className="static translate-y-0" />
                            <CarouselNext className="static translate-y-0" />
                        </div>
                    </Carousel>
                </div>
            </section>

            {/* FAQ */}
            <section className="px-6 py-10 md:px-14 md:py-20">
                <div className="max-w-prose mx-auto">
                    <h2 className="text-center  text-3xl md:text-5xl leading-snug  tracking-tight">
                        Pertanyaan Seputar Sertifikasi
                    </h2>
                    <p className="text-center mt-3 text-gray-600 mb-10">
                        Berikut informasi penting yang perlu Anda ketahui sebelum memulai proses sertifikasi.
                    </p>

                    {/* Accordion List */}
                    <div className="flex flex-col gap-4">
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
            <section className="py-10 md:py-16 px-4 md:px-16">
                <div className="bg-linear-to-br from-sky-900 via-sky-950 to-blue-950 rounded-xl p-8 md:p-16 text-center shadow-xl">
                    <h2 className="text-2xl md:text-4xl tracking-tight text-white mb-6">
                        Masih Ragu Memilih Skema yang Tepat?
                    </h2>
                    <p className="text-white/80 max-w-xl mx-auto mb-8 text-lsp-body">
                        Jangan khawatir! kami siap membantu mengarahkan dan menjawab semua pertanyaan Anda secara gratis.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href="https://wa.me/6285316261399?text=Halo%20LSP%20KODINGKA,%20saya%20masih%20ragu%20dan%20ingin%20konsultasi%20tentang%20skema%20sertifikasi."
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm md:text-base bg-white text-[#1e2e3f] px-9 py-4 rounded-lg font-medium hover:bg-slate-100 transition-colors flex items-center justify-center gap-2 shadow-sm"
                        >
                            <MessageCircleQuestion size={20} className="text-brand" />
                            <span>Konsultasi via WhatsApp</span>
                        </a>
                    </div>
                </div>
            </section>

        </>
    )
}