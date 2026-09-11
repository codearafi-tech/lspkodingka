import { useState } from "react"
import { Link } from "react-router-dom"
import { ArrowUpRight, BookOpen, Layers } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const schemesData = [
  {
    id: 1,
    title: "Asistant Web Developer",
    category: "okupasi",
    categoryLabel: "Okupasi",
    units: "6 Unit",
    price: "Rp1.000.000",
    image: "images/Asistant Web Developer.webp",
    isPopular: true,
  },
  {
    id: 2,
    title: "Digital Marketing",
    category: "klaster",
    categoryLabel: "Klaster",
    units: "7 Unit",
    price: "Rp800.000",
    image: "images/Digital Marketing.webp",
    isPopular: true,
  },
  {
    id: 3,
    title: "Teknisi Operator Komputer",
    category: "okupasi",
    categoryLabel: "Okupasi",
    units: "8 Unit",
    price: "Rp800.000",
    image: "images/Teknisi Operator Komputer.webp",
    isPopular: true,
  },
  {
    id: 4,
    title: "Network Desainer",
    category: "okupasi",
    categoryLabel: "Okupasi",
    units: "11 Unit",
    price: "Rp1.500.000",
    image: "images/Network Desainer.webp",
    isPopular: false,
  },
  {
    id: 5,
    title: "Data Scientist",
    category: "okupasi",
    categoryLabel: "Okupasi",
    units: "11 Unit",
    price: "Rp1.500.000",
    image: "images/Data Scientist.webp",
    isPopular: false,
  },
  {
    id: 6,
    title: "Data Analyst",
    category: "okupasi",
    categoryLabel: "Okupasi",
    units: "8 Unit",
    price: "Rp1.000.000",
    image: "images/Data Analyst.webp",
    isPopular: false,
  },
  {
    id: 7,
    title: "Desainer Grafis Muda",
    category: "okupasi",
    categoryLabel: "Okupasi",
    units: "8 Unit",
    price: "Rp900.000",
    image: "images/Desainer Grafis.webp",
    isPopular: false,
  },
  {
    id: 8,
    title: "Public Speaking",
    category: "klaster",
    categoryLabel: "Klaster",
    units: "8 Unit",
    price: "Rp500.000",
    image: "images/Public Speaking.webp",
    isPopular: false,
  },
  {
    id: 9,
    title: "Content Creator",
    category: "klaster",
    categoryLabel: "Klaster",
    units: "9 Unit",
    price: "Rp800.000",
    image: "images/Content Creator.webp",
    isPopular: false,
  },
  {
    id: 10,
    title: "Video Editor",
    category: "okupasi",
    categoryLabel: "Okupasi",
    units: "11 Unit",
    price: "Rp950.000",
    image: "images/Video Editor.webp",
    isPopular: false,
  },
]

const categories = [
  { id: "all", label: "SEMUA" },
  { id: "okupasi", label: "OKUPASI" },
  { id: "klaster", label: "KLASTER" },
]

export default function SchemeLists() {
  const [selectedCategory, setSelectedCategory] = useState("all")

  // Filter logika data
  const filteredSchemes =
    selectedCategory === "all"
      ? schemesData
      : schemesData.filter((item) => item.category === selectedCategory)

  return (
    <section className="px-6 py-12 md:px-20">
      {/* Header Section */}
      <div className="mb-8 flex flex-col items-center justify-between gap-4">
        <div>
          <div className="text-center text-sm font-medium tracking-widest text-muted-foreground uppercase">
            Sertifikasi Profesi
          </div>
          <h2 className="mt-2 max-w-lg text-center text-3xl leading-tight font-medium tracking-tight md:text-5xl">
            Daftar skema sertifikasi
          </h2>
        </div>
        <p className="max-w-sm text-center text-muted-foreground">
          Pilih skema kompetensi yang sesuai dengan keahlian dan jenjang karir
          Anda.
        </p>
      </div>

      {/* Modern Bracket Filter Tabs */}
      <div className="mb-12 flex w-full items-center justify-center gap-6 text-sm font-medium">
        {categories.map((tab) => {
          const isActive = selectedCategory === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => setSelectedCategory(tab.id)}
              className="relative px-2 py-1 tracking-widest uppercase transition-colors duration-200 select-none focus:outline-hidden"
            >
              {/* Teks Label Filter */}
              <span
                className={`transition-colors duration-200 ${
                  isActive
                    ? "font-semibold text-slate-900"
                    : "text-slate-400 hover:text-slate-600"
                }`}
              >
                {tab.label}
              </span>

              {/* Animasi Kurung Siku Brackets [ ] Menggunakan Framer Motion */}
              {isActive && (
                <>
                  <motion.span
                    layoutId="left-bracket"
                    className="absolute top-1/2 -left-2 -translate-y-1/2 font-mono text-base font-semibold text-slate-900"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  >
                    [
                  </motion.span>
                  <motion.span
                    layoutId="right-bracket"
                    className="absolute top-1/2 -right-2 -translate-y-1/2 font-mono text-base font-semibold text-slate-900"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  >
                    ]
                  </motion.span>
                </>
              )}
            </button>
          )
        })}
      </div>

      {/* Grid Card Modern Light dengan Animasi Switch Transisi */}
      <motion.div
        layout
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3 xl:grid-cols-4"
      >
        <AnimatePresence mode="popLayout">
          {filteredSchemes.map((scheme) => (
            <motion.div
              key={scheme.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.25 }}
            >
              <Link
                to={`/scheme/${scheme.id}`}
                className="group relative flex aspect-auto flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/80 bg-slate-50 p-5 text-slate-900 shadow-xs transition-all duration-300 hover:-translate-y-1.5 hover:border-slate-300 hover:bg-white hover:shadow-xl sm:p-6 md:aspect-3/4"
              >
                {/* Header Card */}
                <div className="flex items-start justify-between">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="inline-flex items-center rounded-lg bg-slate-200/60 px-2.5 py-1 text-xs font-semibold text-slate-700">
                      {scheme.categoryLabel}
                    </span>
                    {scheme.isPopular && (
                      <span className="inline-flex items-center gap-1 rounded-lg border border-blue-200 bg-blue-50 px-2 py-1 text-[10px] font-semibold text-blue-700">
                        Popular
                      </span>
                    )}
                  </div>
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-200/50 text-slate-600 transition-all group-hover:bg-brand group-hover:text-white">
                    <ArrowUpRight className="h-4 w-4" />
                  </div>
                </div>

                {/* Content Middle */}
                <div className="my-auto py-3 md:py-4">
                  <p className="text-xs font-medium tracking-wider text-slate-400 uppercase">
                    SKM-2026-00{scheme.id}
                  </p>
                  <h3 className="mt-1.5 text-xl leading-snug font-semibold tracking-tight text-slate-900 transition-colors group-hover:text-slate-700 md:mt-2 md:text-2xl">
                    {scheme.title}
                  </h3>
                </div>

                {/* Content Bottom */}
                <div className="border-t border-slate-200/60 pt-3 md:pt-4">
                  <div className="flex items-center gap-4 text-xs font-medium text-slate-500">
                    <div className="flex items-center gap-1.5">
                      <BookOpen className="h-3.5 w-3.5 text-slate-400" />
                      <span>{scheme.units}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Layers className="h-3.5 w-3.5 text-slate-400" />
                      <span>{scheme.categoryLabel}</span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  )
}
