import { useState } from "react"
import { Link } from "react-router-dom"
import { BadgeCheck, Sparkles } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { schemesData } from "../../lib/skemaData"

const categories = [
  { id: "all", label: "Semua" },
  { id: "okupasi", label: "Okupasi" },
  { id: "klaster", label: "Klaster" },
]

export default function SchemeLists() {
  const [selectedCategory, setSelectedCategory] = useState("all")

  const filteredSchemes =
    selectedCategory === "all"
      ? schemesData
      : schemesData.filter((item) => item.category === selectedCategory)

  return (
    <section className="px-6 md:px-20">
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

      {/* Modern Sliding Pill Filter Tabs */}
      <div className="mb-12 flex w-full items-center justify-center">
        <div className="flex items-center gap-2 rounded-2xl border border-neutral-200/60 bg-neutral-100 p-1.5">
          {categories.map((tab) => {
            const isActive = selectedCategory === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id)}
                className={`relative z-10 cursor-pointer px-5 py-2 text-xs font-semibold tracking-wider uppercase transition-colors duration-200 select-none ${
                  isActive
                    ? "text-slate-900"
                    : "text-neutral-500 hover:text-neutral-800"
                }`}
              >
                {/* Latar belakang pill yang bergerak mulus */}
                {isActive && (
                  <motion.div
                    layoutId="active-pill"
                    className="absolute inset-0 -z-10 rounded-xl border border-neutral-200/50 bg-white shadow-sm"
                    transition={{ type: "spring", stiffness: 400, damping: 35 }}
                  />
                )}
                {tab.label}
              </button>
            )
          })}
        </div>
      </div>

      {/* Grid Card */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3 xl:grid-cols-4">
        <AnimatePresence mode="popLayout">
          {filteredSchemes.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="h-full"
            >
              <Link
                to={`/skema/${item.slug}`}
                id={`skema-${item.slug}`}
                className="group relative flex h-105 w-full flex-col justify-between overflow-hidden rounded-3xl p-6"
              >
                {/* 1. Gambar Background */}
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* 2. ELEMEN BARU: Smooth Blur & Dark Gradient Overlay */}
                <div
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-3/5 bg-neutral-950/60 backdrop-blur-md"
                  style={{
                    // Membuat bagian atas elemen blur ini memudar secara halus (smooth fade-out)
                    maskImage:
                      "linear-gradient(to top, black 60%, transparent 100%)",
                    WebkitMaskImage:
                      "linear-gradient(to top, black 60%, transparent 100%)",
                  }}
                ></div>

                {/* 3. Badge Header */}
                <div className="relative z-10 flex items-start justify-between">
                  {item.isPopular ? (
                    <span className="inline-flex items-center gap-1.5 rounded-lg border border-blue-400/30 bg-blue-500/20 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                      <BadgeCheck className="h-4 w-4 fill-blue-500 text-white" />
                      Skema Populer
                    </span>
                  ) : item.isNew ? (
                    <span className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-400/30 bg-emerald-500/20 px-2.5 py-1 text-xs font-semibold text-emerald-200 backdrop-blur-sm">
                      <Sparkles className="h-3.5 w-3.5 text-emerald-300" />
                      Skema Baru
                    </span>
                  ) : (
                    <div></div>
                  )}
                </div>

                {/* 4. Footer Card (Konten teks bebas dari padding elemen blur karena diletakkan secara terpisah di atasnya) */}
                <div className="relative z-10 flex flex-col gap-4">
                  <div className="flex flex-col leading-tight">
                    <h2 className="text-lg font-semibold text-white drop-shadow-md">
                      {item.title}
                    </h2>
                    <span className="mt-1 text-xs text-neutral-300">
                      {item.kodeSkema}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-neutral-200">
                    <span>{item.categoryLabel}</span>
                    <span>|</span>
                    <span>{item.units}</span>
                  </div>

                  <div>
                    <span className="block w-full cursor-pointer rounded-xl bg-white px-4 py-2.5 text-center text-sm font-semibold text-neutral-900 shadow-md transition-colors hover:bg-neutral-100">
                      Lihat detail
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  )
}
