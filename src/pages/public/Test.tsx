import { schemesData } from "../../lib/skemaData";
import { BadgeCheck, Sparkles } from "lucide-react"

export default function Test() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center p-6">
      {/* Menggunakan grid dengan flex-wrap atau auto-fill jika ingin card otomatis turun ke bawah saat jumlahnya banyak */}
      <div className="grid w-full max-w-7xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {schemesData.map((item) => (
          <div
            key={item.id}
            className="group relative flex h-105 flex-col justify-between overflow-hidden rounded-3xl p-6 shadow-xl border border-neutral-700/50"
          >
            {/* 1. Gambar sebagai Background Utama */}
            <img
              src={item.image}
              alt={item.title}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />

            {/* 2. Gradient Overlay (Gelap dari bawah ke atas) */}
            <div className="absolute inset-0 bg-linear-to-t from-neutral-950 via-neutral-950/60 to-transparent"></div>

            {/* 3. Bagian Header Card (Badge Berdasarkan isPopular atau isNew) */}
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

            {/* 4. Bagian Footer Card (Title, Kode Skema, Kategori, & Tombol Putih) */}
            <div className="relative z-10 flex flex-col gap-4">
              <div className="flex flex-col leading-tight">
                <h2 className="text-lg font-semibold text-white drop-shadow-md">
                  {item.title}
                </h2>
                <span className="text-xs text-neutral-300 mt-1">{item.kodeSkema}</span>
              </div>

              <div className="flex items-center gap-2 text-sm text-neutral-200">
                <span>{item.categoryLabel}</span>
                <span>|</span>
                <span>{item.units}</span>
              </div>

              <div>
                <button className="w-full cursor-pointer rounded-xl bg-white px-4 py-2.5 text-center text-sm font-semibold text-neutral-900 transition-colors hover:bg-neutral-100 shadow-md">
                  Lihat detail
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}