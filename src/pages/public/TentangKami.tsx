import { TrendingUp, ShieldCheck, Users, Lightbulb } from "lucide-react"
import CTA from "@/components/ui/CTA"

const misiList = [
  "Menyelenggarakan sertifikasi kompetensi di bidang koding, kecerdasan artifisial, dan teknologi digital secara profesional, objektif, transparan, dan akuntabel sesuai ketentuan Badan Nasional Sertifikasi Profesi (BNSP).",
  "Mengembangkan skema sertifikasi kompetensi yang relevan dengan kebutuhan dunia usaha, dunia industri, dunia kerja, serta perkembangan teknologi digital dan kecerdasan artifisial.",
  "Menjamin mutu pelaksanaan sertifikasi melalui penerapan sistem manajemen mutu, peningkatan kompetensi asesor, serta pengembangan perangkat asesmen yang valid, reliabel, dan berkelanjutan.",
  "Membangun kemitraan strategis dengan pemerintah, dunia usaha dan dunia industri, perguruan tinggi, lembaga pelatihan kerja, serta organisasi profesi untuk memperkuat ekosistem sertifikasi kompetensi nasional.",
  "Mendukung peningkatan daya saing tenaga kerja Indonesia melalui pengakuan kompetensi yang kredibel, sehingga mampu bersaing di tingkat nasional maupun internasional.",
  "Mendorong budaya pembelajaran sepanjang hayat (lifelong learning), inovasi, etika profesi, dan pemanfaatan kecerdasan artifisial secara bertanggung jawab dalam berbagai sektor pekerjaan.",
  "Berkontribusi dalam percepatan transformasi digital Indonesia melalui penyediaan layanan sertifikasi kompetensi yang berkualitas, adaptif, dan berorientasi pada kebutuhan masa depan.",
]

// Data Tujuan Asprokaindonesia
const tujuanAsosiasi = [
  {
    icon: TrendingUp,
    title: "Meningkatkan Kompetensi",
    description:
      "Meningkatkan kompetensi dan kapasitas anggota dalam pengembangan Artificial Intelligence (AI).",
  },
  {
    icon: ShieldCheck,
    title: "Menjaga Etika & Integritas",
    description:
      "Menjaga nilai-nilai etika, integritas, dan kualitas dalam pengembangan solusi Artificial Intelligence (AI).",
  },
  {
    icon: Users,
    title: "Memfasilitasi Kolaborasi",
    description:
      "Memfasilitasi kolaborasi antar praktisi, akademisi, dan industri kecerdasan artifisial.",
  },
  {
    icon: Lightbulb,
    title: "Mendorong Pemanfaatan AI",
    description:
      "Mendorong pemanfaatan Artificial Intelligence (AI) yang bertanggung jawab dan berkelanjutan bagi bangsa.",
  },
]

export default function TentangKami() {
  return (
    <div className="flex w-full flex-col gap-16 md:gap-20">
      {/* Hero Section */}
      <section className="flex flex-col justify-between gap-12 px-6 pt-30 md:flex-row md:items-center md:px-20">
        {/* Sisi Kiri: Teks & Deskripsi */}
        <div className="flex flex-col gap-6 md:w-1/2">
          <div className="text-sm tracking-widest text-muted-foreground uppercase">
            Tentang Kodingka
          </div>
          <h1 className="text-3xl leading-tight font-medium tracking-tight text-neutral-900 md:text-4xl lg:text-5xl">
            LSP Pihak Ketiga yang didirikan oleh Asosiasi Profesi Pengembang
            Kecerdasan Artifisial Indonesia.
          </h1>
          <p className="text-base leading-relaxed text-neutral-600">
            Didirikan sebagai bentuk komitmen untuk mendukung pengembangan
            sumber daya manusia Indonesia yang kompeten di bidang pemrograman,
            kecerdasan artifisial, dan teknologi digital.
          </p>
        </div>

        {/* Sisi Kanan: Gambar */}
        <div className="md:w-1/2">
          <img
            src="./images/tentang-LSP.png"
            alt="tentang-LSP"
            className="h-95 w-full rounded-2xl object-cover object-top shadow-sm lg:h-112.5"
          />
        </div>
      </section>

      {/* Visi & Misi Section */}
      <section className="flex flex-col gap-16 bg-brand px-6 py-12 text-white md:px-20 md:py-24">
        {/* Visi */}
        <div className="flex flex-col gap-4 md:flex-row md:gap-10">
          <div className="w-full text-xl font-medium text-neutral-400 md:w-1/4">
            Visi Kami
          </div>
          <p className="w-full text-2xl leading-relaxed md:w-3/4">
            Menjadi lembaga sertifikasi yang profesional, independen,
            terpercaya, dan berdaya saing global dalam sertifikasi kompetensi
            bidang koding dan kecerdasan artifisial, guna menghasilkan sumber
            daya manusia Indonesia yang kompeten, inovatif, serta adaptif
            terhadap perkembangan teknologi.
          </p>
        </div>

        <hr className="border-white/10" />

        {/* Misi */}
        <div className="flex flex-col gap-8 md:flex-row md:gap-10">
          <div className="w-full text-xl font-medium text-neutral-400 md:w-1/4">
            Misi Kami
          </div>

          <div className="grid w-full grid-cols-1 gap-8 md:w-3/4 md:grid-cols-2">
            {misiList.map((misi, index) => (
              <div
                key={index}
                className="flex gap-5 border-t border-white/15 pt-5"
              >
                <span className="text-xl font-semibold text-white/40">
                  0{index + 1}
                </span>
                <p className="text-base leading-relaxed text-neutral-200">
                  {misi}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tempatkan Section ini di bawah Visi & Misi */}
      <section className="flex flex-col gap-12 px-6 md:px-20">
        {/* Section Header */}
        <div className="max-w-3xl">
          <span className="text-xl font-medium">Tujuan Asosiasi</span>
        </div>

        {/* Grid 4 Kartu Tujuan */}
        <div className="flex w-full snap-x snap-mandatory scrollbar-none gap-4 overflow-x-auto md:grid md:grid-cols-4 md:gap-6">
          {tujuanAsosiasi.map((item, index) => {
            const IconComponent = item.icon
            return (
              <div
                key={index}
                className="group relative flex h-80 max-w-70 min-w-[70%] shrink-0 snap-center flex-col justify-between overflow-hidden rounded-2xl bg-neutral-50 p-6 transition-all duration-300 md:h-80 md:max-w-none md:min-w-0 md:p-8 md:hover:bg-brand md:hover:shadow-xl"
              >
                {/* Ikon Bagian Atas */}
                <div className="flex items-start">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand text-white transition-colors duration-300 md:h-14 md:w-14 md:group-hover:bg-white/10 md:group-hover:text-white">
                    <IconComponent className="h-6 w-6 md:h-7 md:w-7" />
                  </div>
                </div>

                {/* Bagian Bawah: Judul & Deskripsi */}
                <div className="mt-8 flex flex-col justify-end md:mt-0">
                  <h3 className="text-lg leading-snug font-semibold tracking-tight text-neutral-900 transition-colors duration-300 md:text-xl md:group-hover:text-white">
                    {item.title}
                  </h3>

                  {/* Deskripsi: Tampil penuh di Mobile, Animasi Hover di Desktop */}
                  <div className="mt-2 block md:mt-0 md:grid md:grid-rows-[0fr] md:opacity-0 md:transition-all md:duration-300 md:ease-in-out md:group-hover:mt-3 md:group-hover:grid-rows-[1fr] md:group-hover:opacity-100">
                    <p className="text-sm leading-relaxed text-neutral-600 md:overflow-hidden md:text-sm md:text-neutral-300">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      <div>
        {/* Prakata Pemimpin Section */}
        <section>
          {/* Mobile: flex-col-reverse (Foto atas, Teks bawah). Desktop: grid-cols-12 */}
          <div className="flex flex-col-reverse overflow-hidden bg-neutral-50 lg:grid lg:grid-cols-12">
            {/* Sisi Kiri / Bawah di Mobile: Kutipan & Profil */}
            <div className="flex flex-col justify-between p-8 md:p-14 lg:col-span-7">
              <div className="flex flex-col gap-6">
                <blockquote className="text-3xl leading-tight font-medium tracking-tight text-neutral-900 md:text-4xl lg:text-5xl">
                  Kami berkomitmen untuk menghasilkan nilai yang berkelanjutan
                  bagi masyarakat dan generasi masa depan
                </blockquote>

                <p className="max-w-xl text-sm leading-relaxed text-neutral-500 md:text-base">
                  Sebagai lembaga sertifikasi profesi, peran kami melampaui
                  standardisasi kompetensi. Keberhasilan kami diukur dari
                  lahirnya talenta AI yang berdaya saing global dan
                  berintegritas tinggi.
                </p>
              </div>

              <div className="mt-8 flex flex-col gap-1 border-l-2 border-neutral-300 pl-4">
                <h4 className="text-lg font-bold text-brand">Romadani</h4>
                <p className="text-sm text-neutral-500">
                  Direktur LSP KODINGKA
                </p>
              </div>
            </div>

            {/* Sisi Kanan / Atas di Mobile: Foto Pemimpin */}
            <div className="relative flex min-h-100 items-end justify-center overflow-hidden bg-linear-to-br from-brand to-sky-900 lg:col-span-5 lg:min-h-125">
              {/* Motifs/Dot Pattern Background Effect */}
              <div
                className="pointer-events-none absolute inset-0 opacity-15"
                style={{
                  backgroundImage: `radial-gradient(circle, #ffffff 1.5px, transparent 1.5px)`,
                  backgroundSize: "24px 24px",
                }}
              />

              {/* Gambar Pemimpin */}
              <img
                src="./images/Direktur LSP.png"
                alt="Romadani - Direktur LSP KODINGKA"
                className="relative z-10 h-full max-h-100 w-auto origin-bottom scale-115 transform object-cover object-top transition-transform duration-300 md:scale-125 lg:max-h-112.5"
              />
            </div>
          </div>
        </section>

        <CTA />
      </div>
    </div>
  )
}
