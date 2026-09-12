import { ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import Partners from "@/components/ui/partners"
import CertificationProcess from "@/components/ui/CertificationProcess"
import SchemeLists from "@/components/ui/SchemeLists"

export default function Test() {
  // Fungsi penanganan scroll halus ke element target
  const scrollToSchemes = () => {
    const element = document.getElementById("schemes")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    // parent container
    <div className="flex w-full flex-col gap-16 md:gap-20">
      {/* Hero Section */}
      <section className="relative flex min-h-svh flex-col justify-end gap-8 bg-[url('/images/Hero-banner.webp')] bg-cover bg-center px-6 py-10 text-white md:justify-center md:px-20 md:py-0">
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 flex flex-col gap-6 md:gap-8">
          <div className="text-sm font-medium tracking-widest text-neutral-300 uppercase">
            LEMBAGA SERTIFIKASI PROFESI
          </div>
          <h1 className="max-w-xl text-4xl tracking-tight md:text-6xl">
            Validasi keahlian Anda melalui kami
          </h1>
          <p className="max-w-xl text-sm md:text-base">
            Kami adalah lembaga sertifikasi profesional yang berkomitmen untuk
            pengembangan sumber daya manusia di bidang teknologi digital.
          </p>
          <div className="mt-4 w-fit">
            {/* Menggunakan onClick langsung pada Button */}
            <Button
              variant="secondary"
              size="lg"
              onClick={scrollToSchemes}
              className="flex cursor-pointer items-center gap-2"
            >
              Eksplor skema
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="px-6 md:px-20">
        <div className="text-sm tracking-widest text-muted-foreground">
          DIPERCAYA OLEH BERBAGAI INSTITUSI
        </div>
        <Partners />
      </section>

      {/* Reasons */}
      <section className="px-6 md:px-20">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <h2 className="max-w-lg text-3xl leading-tight font-medium tracking-tight md:text-5xl">
            Kami menjadi pilihan tepat bagi Anda
          </h2>
          <p className="max-w-sm text-muted-foreground">
            Kami memberikan layanan sertifikasi profesi yang berkualitas dan
            didukung oleh tim ahli di bidangnya.
          </p>
        </div>

        <div className="mt-8 overflow-hidden rounded-2xl border">
          <img
            src="./images/Banner.webp"
            alt="banner"
            className="h-auto w-full object-cover"
          />
        </div>

        {/* Grid Layout Fix */}
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-[1fr_auto_1fr_auto_1fr] md:items-center">
          {/* Item 1 */}
          <div className="space-y-2">
            <h3 className="text-xl font-medium tracking-tight">
              Sertifikat resmi
            </h3>
            <p className="text-sm text-muted-foreground">
              Diakui secara nasional untuk menunjang jenjang karier profesional
              Anda.
            </p>
          </div>

          {/* Separator 1 */}
          <Separator
            orientation="horizontal"
            className="my-2 block md:hidden"
          />
          <Separator orientation="vertical" className="hidden h-20 md:block" />

          {/* Item 2 */}
          <div className="space-y-2">
            <h3 className="text-xl font-medium tracking-tight">
              Proses Cepat & Transparan
            </h3>
            <p className="text-sm text-muted-foreground">
              Proses pendaftaran hingga ujian berbasis digital yang
              terintegrasi.
            </p>
          </div>

          {/* Separator 2 */}
          <Separator
            orientation="horizontal"
            className="my-2 block md:hidden"
          />
          <Separator orientation="vertical" className="hidden h-20 md:block" />

          {/* Item 3 */}
          <div className="space-y-2">
            <h3 className="text-xl font-medium tracking-tight">
              Kurikulum Industri
            </h3>
            <p className="text-sm text-muted-foreground">
              Materi uji disesuaikan langsung dengan kebutuhan masa kini.
            </p>
          </div>
        </div>
      </section>

      {/* Certification Process */}
      <CertificationProcess />

      {/* Scheme List dengan Target ID */}
      <div id="schemes" className="scroll-mt-10">
        <SchemeLists />
      </div>

      {/* Contact */}
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
    </div>
  )
}
