import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useParams, Link } from "react-router-dom"
import { schemesData } from "../../lib/skemaData"
import { ArrowLeft, Check } from "lucide-react"
import CTA from "@/components/ui/CTA"

export default function DetailSkema() {
  const { slug } = useParams()
  const [activeTab, setActiveTab] = useState<"unit" | "hak" | "penggunaan">(
    "unit"
  )

  // 1. Cari item data terlebih dahulu berdasarkan ID dari URL
  const scheme = schemesData.find((item) => item.slug === slug)

  // 2. Deklarasikan tabs SETELAH variabel scheme ditemukan
  const tabs = [
    {
      id: "unit",
      label: `Unit Kompetensi (${scheme?.unitKompetensi?.length || 0})`,
    },
    { id: "hak", label: "Hak & Kewajiban Pemohon" },
    { id: "penggunaan", label: "Penggunaan Sertifikat" },
  ] as const

  if (!scheme) {
    return (
      <section className="flex min-h-[60vh] flex-col items-center justify-center text-center">
        <h2 className="text-2xl font-bold text-neutral-800">
          Skema Tidak Ditemukan
        </h2>
        <p className="mt-2 text-neutral-500">
          Data skema sertifikasi yang Anda minta tidak tersedia.
        </p>
        <Link
          to="/"
          className="mt-4 text-sm font-semibold text-blue-600 hover:underline"
        >
          ← Kembali ke Daftar Skema
        </Link>
      </section>
    )
  }

  return (
    <section className="flex min-h-screen flex-col gap-12">
      {/* 2. Banner / Header */}
     <header className="relative w-full overflow-hidden bg-brand px-6 pt-28 pb-12 text-white md:px-20">
  {/* ===== ELEMENT BACKGROUND DEKORATIF ===== */}
  {/* 1. Subtle Radial Glow (Efek cahaya lembut) */}
  <div className="pointer-events-none absolute -top-24 -left-20 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
  <div className="pointer-events-none absolute top-1/2 -right-20 h-80 w-80 -translate-y-1/2 rounded-full bg-white/5 blur-2xl" />

  {/* 2. Grid Pattern (Motif kotak-kotak halus) */}
  <div 
    className="pointer-events-none absolute inset-0 opacity-10"
    style={{
      backgroundImage: `radial-gradient(circle, #ffffff 1px, transparent 1px)`,
      backgroundSize: '24px 24px'
    }}
  />

  {/* 3. Decorative Abstract Waves/Circles (Lingkaran pemanis di pojok) */}
  <div className="pointer-events-none absolute -bottom-10 right-1/3 h-64 w-64 rounded-full border border-white/10" />
  <div className="pointer-events-none absolute -bottom-20 right-1/3 h-96 w-96 rounded-full border border-white/5" />
  {/* ========================================= */}

  <div className="relative z-10 mx-auto max-w-6xl">
    <Link
      to={`/#skema-${scheme.slug}`}
      className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-white/80 transition-colors hover:text-white md:mb-6"
    >
      <ArrowLeft className="h-4 w-4" /> Kembali
    </Link>

    <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
      <div>
        <div className="mb-3 flex items-center gap-2">
          <span className="rounded-lg bg-white/15 px-2.5 py-1 text-xs font-medium tracking-wide text-white backdrop-blur-sm">
            {scheme.categoryLabel}
          </span>
          <span className="text-xs text-white/40">•</span>
          <span className="text-xs font-medium text-white/80">
            {scheme.units}
          </span>
        </div>

        <h1 className="text-3xl font-medium text-white md:text-4xl">
          {scheme.title}
        </h1>

        <p className="mt-2 text-sm text-white/70">
          Kode Skema:{" "}
          <span className="font-mono font-semibold text-white">
            {scheme.kodeSkema}
          </span>
        </p>
      </div>

      {/* Box Harga & Info Ringkas */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-lg md:min-w-64">
        <span className="text-xs font-medium text-neutral-500">
          Biaya Investasi
        </span>
        <div className="my-1 text-2xl font-semibold text-brand">
          {scheme.price}
        </div>

        <div className="my-3 border-t border-slate-100" />

        <div className="flex flex-col gap-2.5 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-neutral-500">Status:</span>
            <span className="inline-flex items-center gap-1.5 font-semibold text-emerald-600">
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
              Tersedia
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-neutral-500">Metode:</span>
            <span className="font-semibold text-neutral-700">
              Luring / Daring
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</header>

      {/* 3. Main Content */}
      <main className="grid w-full grid-cols-1 gap-6 px-6 md:px-12 lg:grid-cols-3 lg:px-20">
        {/* Detail Utama (2 Kolom) */}
        <div className="flex flex-col gap-8 lg:col-span-2">
          {/* Card Deskripsi */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <h2 className="pb-3 text-lg font-semibold text-neutral-900">
              Deskripsi Skema
            </h2>
            <p className="text-sm leading-relaxed text-neutral-600">
              {scheme.deskripsi}
            </p>
          </div>

          <div className="block rounded-2xl border border-blue-100 bg-blue-50/50 p-6 md:hidden">
            <h2 className="mb-4 border-b border-blue-100 pb-3 text-base font-semibold">
              Persyaratan Dasar
            </h2>
            <ul className="flex flex-col gap-3">
              {scheme.persyaratan?.map((syarat, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2.5 text-sm leading-relaxed text-neutral-600"
                >
                  <span className="text-neutral-400">•</span>
                  <span>{syarat}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Card Tabbed Content */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            {/* Header Tab */}
            <div className="relative mb-6 flex scrollbar-none items-center gap-6 overflow-x-auto border-b border-slate-200 [ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
              {tabs.map((tab) => {
                const isActive = activeTab === tab.id
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`relative pb-3 text-sm font-semibold whitespace-nowrap transition-colors ${
                      isActive
                        ? "text-black"
                        : "text-neutral-400 hover:text-neutral-600"
                    }`}
                  >
                    {tab.label}

                    {isActive && (
                      <motion.div
                        layoutId="activeTabUnderline"
                        className="absolute right-0 bottom-0 left-0 h-0.5 bg-slate-900"
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 30,
                        }}
                      />
                    )}
                  </button>
                )
              })}
            </div>

            {/* Dynamic Tab Area */}
            <div className="relative min-h-55">
              <AnimatePresence mode="wait">
                {activeTab === "unit" && (
                  <motion.div
                    key="unit"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    className="flex flex-col gap-3"
                  >
                    {scheme.unitKompetensi?.map((unit, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-4 rounded-xl border border-slate-100 bg-slate-50 p-4"
                      >
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-slate-200 text-xs font-bold text-neutral-700">
                          {index + 1}
                        </span>
                        <div className="flex flex-col gap-0.5">
                          <span className="font-mono text-xs font-semibold text-neutral-400">
                            {unit.kode}
                          </span>
                          <p className="text-sm leading-snug font-semibold text-neutral-800">
                            {unit.judul}
                          </p>
                        </div>
                      </div>
                    ))}
                  </motion.div>
                )}

                {activeTab === "hak" && (
                  <motion.div
                    key="hak"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    className="grid grid-cols-1 gap-6 text-sm leading-relaxed md:grid-cols-2"
                  >
                    <div>
                      <h3 className="mb-3 text-sm font-semibold text-neutral-900">
                        Hak Pemohon
                      </h3>
                      <ul className="flex flex-col gap-2.5 text-neutral-600">
                        <li className="flex items-start gap-2">
                          <span className="text-neutral-400">•</span>
                          <span>
                            Mendapatkan informasi mengenai proses asesmen secara
                            jelas.
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-neutral-400">•</span>
                          <span>
                            Menerima sertifikat kompetensi jika dinyatakan
                            Kompeten (K).
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-neutral-400">•</span>
                          <span>
                            Mengajukan banding jika ada ketidaksesuaian hasil
                            asesmen.
                          </span>
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="mb-3 text-sm font-semibold text-neutral-900">
                        Kewajiban Pemohon
                      </h3>
                      <ul className="flex flex-col gap-2.5 text-neutral-600">
                        <li className="flex items-start gap-2">
                          <span className="text-neutral-400">•</span>
                          <span>
                            Memenuhi seluruh persyaratan dokumen sebelum
                            asesmen.
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-neutral-400">•</span>
                          <span>
                            Menaati tata tertib pelaksanaan uji kompetensi.
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-neutral-400">•</span>
                          <span>
                            Menjaga kerahasiaan materi dan perangkat ujian.
                          </span>
                        </li>
                      </ul>
                    </div>
                  </motion.div>
                )}

                {activeTab === "penggunaan" && (
                  <motion.div
                    key="penggunaan"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    className="flex flex-col gap-3 text-sm leading-relaxed text-neutral-600"
                  >
                    <p className="text-sm font-semibold text-neutral-800">
                      Ketentuan Pemegang Sertifikat:
                    </p>
                    <ul className="flex flex-col gap-2.5">
                      <li className="flex items-start gap-2">
                        <span className="text-neutral-400">•</span>
                        <span>
                          Sertifikat hanya digunakan sesuai dengan ruang lingkup
                          keahlian yang tercantum.
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-neutral-400">•</span>
                        <span>
                          Pemegang sertifikat tidak diperkenankan
                          menyalahgunakan logo atau dokumen lisensi resmi untuk
                          tindakan yang merugikan pihak lain.
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-neutral-400">•</span>
                        <span>
                          LSP berhak mencabut status sertifikasi jika ditemukan
                          pelanggaran kode etik profesi atau pemalsuan data.
                        </span>
                      </li>
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Sidebar Persyaratan & Benefit (1 Kolom) */}
        <div className="lg:col-span-1">
          <div className="sticky top-28 flex flex-col gap-6">
            {/* Card 1: Persyaratan Dasar */}
            <div className="hidden rounded-2xl border border-blue-100 bg-blue-50/50 p-6 md:block">
              <h2 className="mb-4 border-b border-blue-100 pb-3 text-base font-semibold">
                Persyaratan Dasar
              </h2>
              <ul className="flex flex-col gap-3">
                {scheme.persyaratan?.map((syarat, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2.5 text-sm leading-relaxed text-neutral-600"
                  >
                    <span className="text-neutral-400">•</span>
                    <span>{syarat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Card 2: Benefit Sertifikasi */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <h2 className="mb-4 border-b border-slate-100 pb-3 font-semibold">
                Benefit Sertifikasi
              </h2>
              <div className="flex flex-col gap-3 text-xs">
                <div className="flex items-center gap-3">
                  <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white">
                    <Check className="h-3 w-3 stroke-3" />
                  </span>
                  <span className="text-sm tracking-tight">
                    Pengakuan Resmi BNSP
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white">
                    <Check className="h-3 w-3 stroke-3" />
                  </span>
                  <span className="text-sm tracking-tight">
                    Meningkatkan Nilai Tawar
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white">
                    <Check className="h-3 w-3 stroke-3" />
                  </span>
                  <span className="text-sm tracking-tight">
                    Standar Kompetensi Industri
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white">
                    <Check className="h-3 w-3 stroke-3" />
                  </span>
                  <span className="text-sm tracking-tight">
                    Masa Berlaku Sertifikat 3 Tahun
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <CTA />
    </section>
  )
}
