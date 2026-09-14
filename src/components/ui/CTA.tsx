import { ChevronRight } from "lucide-react"

export default function CTA() {
  return (
    <section className="relative overflow-hidden bg-[url('/images/Scenery.webp')] bg-cover bg-position-[center_top_30%] px-6 py-16 md:px-20 md:py-32">
      <div className="absolute inset-0 bg-slate-900/40" />

      <div className="relative z-10 flex flex-col">
        <span className="text-sm font-medium tracking-widest text-neutral-300 uppercase">
          KEMITRAAN & PERTANYAAN
        </span>

        <p className="mt-3 max-w-2xl text-xl leading-tight text-white md:text-3xl">
          Punya pertanyaan atau ingin bekerja sama? Konsultasikan langsung
          dengan tim kami di bawah ini.
        </p>

        <div className="mt-8 flex w-full">
          <a
            href="https://wa.me/6285316261399?text=Halo%20LSP%20KODINGKA,%20saya%20masih%20ragu%20dan%20ingin%20konsultasi%20tentang%20skema%20sertifikasi."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2.5 rounded-xl bg-white px-2.5 py-2 text-sm font-medium transition-all duration-300 hover:bg-neutral-100 md:text-base"
          >
            <span className="flex items-center gap-2">
              Konsultasi sekarang
              <ChevronRight className="h-4 w-4" />
            </span>
          </a>
        </div>
      </div>
    </section>
  )
}
