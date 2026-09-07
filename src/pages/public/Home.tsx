import { useState } from "react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import {
  ChevronDown,
  ArrowRight,
  Award,
  Zap,
  BookOpen,
  Users,
} from "lucide-react"
import { Link } from "react-router-dom"
import { Badge } from "@/components/ui/badge"
import {
  CustomTabs,
  CustomTabsList,
  CustomTabsTrigger,
} from "@/components/ui/CustomTab"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel"
import { Separator } from "@/components/ui/separator"

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
]

const faqData = [
  {
    question: "Apa saja persyaratan utama untuk mendaftar sertifikasi?",
    answer:
      "Persyaratan umum meliputi ijazah minimal SLTA sederajat, portofolio kerja/pendidikan yang relevan, serta bukti kompetensi yang sesuai dengan skema yang dipilih.",
  },
  {
    question: "Berapa lama masa berlaku sertifikat kompetensi?",
    answer:
      "Sertifikat kompetensi umumnya berlaku selama 3 tahun sejak tanggal diterbitkan, sesuai dengan ketentuan BNSP.",
  },
  {
    question: "Bagaimana jika hasil asesmen dinyatakan belum kompeten?",
    answer:
      "Anda akan mendapatkan kesempatan untuk melakukan banding sesuai arahan asesor.",
  },
]

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
]

const stepsData = [
  { step: "01", title: "Pendaftaran" },
  { step: "02", title: "Verifikasi Dokumen" },
  { step: "03", title: "Pembekalan & Pra-Asesmen" },
  { step: "04", title: "Asesmen" },
  { step: "05", title: "Keputusan Sertifikasi" },
  { step: "06", title: "Penerbitan Sertifikat" },
]

export default function Home() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [activeTab, setActiveTab] = useState("overview")

  const filteredSchemes = schemesData.filter((scheme) => {
    if (activeTab === "overview") return true
    if (activeTab === "analytics") return scheme.category === "okupasi"
    if (activeTab === "reports") return scheme.category === "klaster"
    return true
  })

  return (
    <div className="flex flex-col gap-14 lg:gap-24">
      {/* Hero */}
      <section className="flex flex-col justify-between px-6 pt-6 md:px-28">
        <div className="relative z-20 my-auto flex h-full flex-col">
          <h1 className="text-4xl leading-tight font-medium tracking-tight md:text-6xl lg:max-w-3xl">
            Validasi keahlianmu bersama kami
          </h1>
          <div className="mt-6 flex flex-col items-start justify-between gap-6 md:mt-8 md:flex-row-reverse md:items-center md:gap-0">
            <p className="max-w-xs text-sm text-neutral-600 sm:text-base">
              Lembaga sertifikasi profesional resmi untuk bidang AI dan teknologi.
            </p>
            <div className="flex w-full flex-row gap-3 md:w-auto">
              <Button
                size="lg"
                className="flex-1 rounded-full bg-sky-700 px-4 py-6 hover:bg-sky-700/80"
                onClick={() => {
                  const element = document.getElementById("skema")
                  element?.scrollIntoView({ behavior: "smooth" })
                }}
              >
                Eksplor program
              </Button>
              <Button
                size="lg"
                variant="secondary"
                className="flex-1 rounded-full px-4 py-6"
              >
                <a
                  href="https://wa.me/6285316261399?text=Halo%20LSP%20KODINGKA,%20saya%20masih%20ragu%20dan%20ingin%20konsultasi%20tentang%20skema%20sertifikasi."
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Konsultasi gratis
                </a>
              </Button>
            </div>
          </div>
        </div>

        <div className="my-8 lg:mt-14">
          <Separator />
        </div>

        {/* Partner Section */}
        <div className="relative z-20 -mx-6 w-[calc(100%+48px)] overflow-hidden md:-mx-28 md:w-[calc(100%+224px)]">
          <p className="mb-6 px-6 text-sm tracking-normal text-neutral-600 uppercase md:px-28">
            Dipercaya Berbagai Institusi
          </p>

          <div className="relative flex w-full overflow-hidden py-4">
            <motion.div
              className="flex shrink-0 items-center gap-16"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ repeat: Infinity, duration: 35, ease: "linear" }}
            >
              {[...partners, ...partners].map((partner, index) => (
                <div
                  key={index}
                  className="flex shrink-0 items-center justify-center"
                >
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="max-h-12 max-w-32 object-contain opacity-80 transition-opacity hover:opacity-100"
                  />
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="px-6 md:px-28">
        <div className="mb-8 md:mb-12">
          <p className="max-w-xs text-2xl font-medium tracking-tight md:text-4xl lg:max-w-xl lg:leading-tight">
            Kami mendampingi Anda untuk meraih pengakuan resmi
          </p>
        </div>
        <div>
          <img
            src="images/Hero-banner.webp"
            alt="lsp kodingka"
            className="h-125 w-full rounded-3xl object-cover object-top"
          />
        </div>
        <div className="mt-6 max-w-2xl space-y-2">
          <h6 className="font-medium tracking-tight lg:text-lg">
            Mengenal tentang kami
          </h6>
          <p className="max-w-xl leading-relaxed text-neutral-600 lg:text-lg">
            Kodingka berkomitmen untuk mencetak talenta digital Indonesia yang
            kompeten dan siap bersaing di era industri modern.
          </p>
          <div className="mt-4">
            <Link
              to="/tentang-kami"
              className="flex items-center gap-2 font-medium hover:gap-2.5 lg:text-lg"
            >
              Selengkapnya
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="px-6 md:px-28">
        <div className="mb-12 max-w-xl">
          <h2 className="text-3xl leading-tight font-medium tracking-tight text-neutral-900 md:text-4xl">
            Mengapa kami menjadi pilihan tepat bagi Anda
          </h2>
        </div>

        <div className="grid grid-cols-1 -space-y-px lg:grid-cols-4 lg:space-y-0 lg:-space-x-px">
          <div className="relative z-10 rounded-t-2xl border p-6 lg:rounded-t-none lg:rounded-l-2xl">
            <div className="mt-20 mb-4 inline-flex rounded-lg bg-linear-to-br from-sky-100 to-sky-200 p-3 text-sky-700">
              <Award className="h-4 w-4" />
            </div>
            <h3 className="text-lg font-medium tracking-tight">
              Sertifikat Resmi
            </h3>
            <p className="mt-4 text-neutral-600">
              Diakui secara nasional untuk menunjang jenjang karier.
            </p>
          </div>

          <div className="relative z-10 border p-6">
            <div className="mt-20 mb-4 inline-flex rounded-lg bg-linear-to-br from-amber-100 to-amber-200 p-3 text-amber-700">
              <Zap className="h-4 w-4" />
            </div>
            <h3 className="text-lg font-medium tracking-tight">
              Proses Cepat & Transparan
            </h3>
            <p className="mt-4 text-neutral-600">
              Pendaftaran hingga ujian berbasis digital yang terintegrasi.
            </p>
          </div>

          <div className="relative z-10 border p-6">
            <div className="mt-20 mb-4 inline-flex rounded-lg bg-linear-to-br from-emerald-100 to-emerald-200 p-3 text-emerald-700">
              <BookOpen className="h-4 w-4" />
            </div>
            <h3 className="text-lg font-medium tracking-tight">
              Kurikulum Industri
            </h3>
            <p className="mt-4 text-neutral-600">
              Materi uji disesuaikan langsung dengan kebutuhan masa kini.
            </p>
          </div>

          <div className="relative z-10 rounded-b-2xl border p-6 lg:rounded-l-none lg:rounded-r-2xl">
            <div className="mt-20 mb-4 inline-flex rounded-lg bg-linear-to-br from-rose-100 to-rose-200 p-3 text-rose-700">
              <Users className="h-4 w-4" />
            </div>
            <h3 className="text-lg font-medium tracking-tight">
              Mitra Terpercaya
            </h3>
            <p className="mt-4 text-neutral-600">
              Melayani kebutuhan sertifikasi profesional secara fleksibel.
            </p>
          </div>
        </div>
      </section>

      {/* Schemes */}
      <section className="px-6 md:px-28" id="skema">
        <div className="max-w-xl">
          <h2 className="mt-3 text-3xl leading-tight font-medium tracking-tight md:text-4xl">
            Eksplorasi berbagai pilihan skema yang tersedia
          </h2>
          <CustomTabs
            defaultValue="overview"
            onValueChange={setActiveTab}
            className="mt-6"
          >
            <CustomTabsList className="flex gap-6">
              <CustomTabsTrigger
                value="overview"
                activeTab={activeTab}
                onClick={() => setActiveTab("overview")}
                className="text-lg"
              >
                Semua
              </CustomTabsTrigger>
              <CustomTabsTrigger
                value="analytics"
                activeTab={activeTab}
                onClick={() => setActiveTab("analytics")}
                className="text-lg"
              >
                Okupasi
              </CustomTabsTrigger>
              <CustomTabsTrigger
                value="reports"
                activeTab={activeTab}
                onClick={() => setActiveTab("reports")}
                className="text-lg"
              >
                Klaster
              </CustomTabsTrigger>
            </CustomTabsList>
          </CustomTabs>
        </div>

        <Separator className="mb-6" />

        <div className="mt-8">
          <Carousel
            opts={{
              align: "start",
              loop: false,
            }}
            className="relative w-full"
          >
            <CarouselContent className="-ml-4 pr-6 pb-4 md:pr-0">
              {filteredSchemes.map((scheme) => (
                <CarouselItem
                  key={scheme.id}
                  className="flex basis-full sm:basis-1/2 lg:basis-1/4"
                >
                  <div className="mx-auto flex h-full w-full transform-gpu flex-col overflow-hidden rounded-3xl border border-neutral-200 bg-white transition-shadow hover:shadow-sm">
                    <div className="relative aspect-video w-full shrink-0 overflow-hidden bg-neutral-100">
                      <img
                        src={scheme.image}
                        alt={`Sertifikasi ${scheme.title}`}
                        className="h-full w-full transform-gpu object-cover"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <div className="mt-4 flex flex-1 flex-col px-6 pb-6">
                      <div>
                        {scheme.isPopular && (
                          <Badge variant="secondary" className="rounded-sm">
                            Populer
                          </Badge>
                        )}
                        <h4 className="mt-2 text-lg font-medium tracking-tight text-neutral-900">
                          {scheme.title}
                        </h4>
                        <div className="mt-1.5 flex items-center gap-2 text-sm text-neutral-500">
                          <span>{scheme.categoryLabel}</span>
                          <span>•</span>
                          <span>{scheme.units}</span>
                        </div>
                      </div>

                      <div className="mt-auto pt-6">
                        <div className="flex items-center justify-between pt-4">
                          <div className="text-base font-semibold tracking-tight text-neutral-900">
                            {scheme.price}
                          </div>
                          <Button
                            variant="default"
                            className="rounded-full px-6"
                          >
                            Detail
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute top-1 -left-4 z-20 flex h-10 w-10 -translate-y-1/2 bg-white shadow-md" />
            <CarouselNext className="absolute top-1 -right-4 z-20 flex h-10 w-10 -translate-y-1/2 bg-white shadow-md" />
          </Carousel>
        </div>
      </section>

      {/* Workflow */}
      <section className="px-6 md:px-28">
        <div className="mb-8 max-w-xl md:mb-12">
          <h2 className="text-3xl leading-tight font-medium tracking-tight text-neutral-900 md:text-4xl">
            Pahami bagaimana alur proses sertifikasi dilaksanakan
          </h2>
        </div>

        <div className="group relative mx-auto flex min-h-112.5 w-full items-center justify-center overflow-hidden rounded-3xl p-8">
          <img
            src="/images/background-gradient.webp"
            alt=""
            className="pointer-events-none absolute inset-0 h-full w-full scale-110 object-cover blur-2xl filter transition-transform duration-700 ease-out group-hover:scale-125"
          />

          <div className="relative z-10 w-full max-w-md space-y-2">
            {stepsData.map((item, index) => {
              const isFirst = index === 0
              const isLast = index === stepsData.length - 1

              return (
                <div key={index} className="flex items-center justify-center">
                  <div
                    className={`flex w-72 items-center gap-3 bg-white px-5 py-4 shadow-sm backdrop-blur-sm transition-all ${
                      isFirst ? "rounded-t-2xl" : isLast ? "rounded-b-2xl" : ""
                    }`}
                  >
                    <div className="text-sm font-semibold">{item.step}</div>
                    <div className="h-4 w-px bg-neutral-300" />
                    <h3 className="text-sm font-medium text-neutral-900">
                      {item.title}
                    </h3>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
        <div className="mt-6 md:max-w-2xl">
          <p className="text-lg tracking-tight text-neutral-600">
            Tahapan dirancang secara sistematis untuk memastikan kompetensi
            peserta teruji secara objektif hingga penerbitan sertifikat.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 md:px-28">
        <div className="flex flex-col md:flex-row">
          <div className="flex-2">
            <h2 className="text-3xl leading-tight font-medium tracking-tight md:text-4xl">
              Pertanyaan seputar sertifikasi
            </h2>
            <p className="mt-3 mb-10 max-w-sm text-gray-600 lg:text-lg">
              Berikut informasi penting yang perlu Anda ketahui sebelum memulai
              proses sertifikasi.
            </p>
          </div>

          <div className="flex flex-2 flex-col gap-4">
            {faqData.map((item, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-xl border border-slate-200 bg-white"
              >
                <button
                  onClick={() =>
                    setOpenIndex(openIndex === index ? null : index)
                  }
                  className="flex w-full items-center justify-between p-6 text-left font-medium text-slate-800"
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
                      className="px-6 pb-6 text-base leading-relaxed text-slate-600"
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
      <section className="bg-neutral-50">
        <div className="px-6 py-20 md:px-28">
          <div>
            <h2 className="mb-6 max-w-lg text-3xl leading-tight font-medium tracking-tight md:text-4xl">
              Sampaikan pertanyaan Anda, kami siap berdiskusi.
            </h2>
            <div className="flex w-fit flex-col">
              <a
                href="https://wa.me/6285316261399?text=Halo%20LSP%20KODINGKA,%20saya%20masih%20ragu%20dan%20ingin%20konsultasi%20tentang%20skema%20sertifikasi."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-full bg-sky-700 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-sky-700/80 md:text-base"
              >
                <span>Konsultasi sekarang</span>
              </a>
            </div>
          </div>
        </div>
        <div className="h-1 w-full bg-linear-to-r from-blue-700 via-sky-500 to-cyan-400" />
      </section>
    </div>
  )
}