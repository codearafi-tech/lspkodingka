import { useState, useEffect } from "react"

const stepsData = [
  {
    step: "01",
    title: "Pendaftaran",
    description:
      "Pengisian formulir pendaftaran (APL-01) dan pemilihan skema sertifikasi yang sesuai dengan kompetensi Anda.",
  },
  {
    step: "02",
    title: "Verifikasi Dokumen",
    description:
      "Pemeriksaan kelengkapan berkas portofolio dan persyaratan administrasi oleh tim verifikator.",
  },
  {
    step: "03",
    title: "Pra-Asesmen",
    description:
      "Sesi konseling awal (APL-02) untuk penentuan kesiapan dan pemahaman alur uji kompetensi.",
  },
  {
    step: "04",
    title: "Asesmen",
    description:
      "Pelaksanaan uji kompetensi (teori, praktik, dan wawancara) langsung bersama Asesor bersertifikat BNSP.",
  },
  {
    step: "05",
    title: "Keputusan Sertifikasi",
    description:
      "Rapat pleno komite teknis untuk menetapkan hasil perolehan predikat Kompeten (K) atau Belum Kompeten (BK).",
  },
  {
    step: "06",
    title: "Penerbitan Sertifikat",
    description:
      "Pencetakan dan penyerahan Sertifikat Kompetensi resmi BNSP kepada peserta yang dinyatakan kompeten.",
  },
]

export default function CertificationProcess() {
  const [activeStep, setActiveStep] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  // Deteksi ukuran layar untuk menyesuaikan layout secara dinamis
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const centerX = 600
  const centerY = 500
  
  // RADIUS: Tetap disesuaikan dengan skala titik pusat SVG
  const radius = isMobile ? 320 : 280

  const getPosition = (index: number, total: number) => {
    const angle = (index / total) * 2 * Math.PI - Math.PI / 2
    const x = centerX + radius * Math.cos(angle)
    const y = centerY + radius * Math.sin(angle)
    return { x, y }
  }

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-brand px-4 py-12 text-white md:px-20 md:py-24">
      {/* Title Header */}
      <div className="flex flex-col items-center justify-center gap-4 text-center md:gap-6">
        <div className="text-sm uppercase tracking-widest text-white/80">
          PROSES
        </div>
        <h2 className="max-w-md text-3xl leading-tight tracking-tight md:text-5xl">
          Alur pelaksanaan sertifikasi
        </h2>
        <p className="max-w-sm text-sm text-white/80 md:text-base">
          Proses sertifikasi dilakukan melalui beberapa tahapan yang terstruktur dan transparan.
        </p>
      </div>

      {/* Main Graphic Container - Diperbesar di Mobile */}
      <div className="relative mx-auto my-2 flex h-120 w-full max-w-4xl items-center justify-center sm:h-137.5 md:h-162.5">
        <svg
          className="h-full w-full select-none"
          // viewBox dipotong sangat pas (150 50 900 900) agar lingkaran terdistribusi penuh mengisi layar mobile
          viewBox={isMobile ? "150 50 900 900" : "0 0 1200 1000"}
        >
          {/* Main Circle Line */}
          <circle
            cx={centerX}
            cy={centerY}
            r={radius}
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="2.5"
          />

          {stepsData.map((item, index) => {
            const { x, y } = getPosition(index, stepsData.length)
            const isActive = activeStep === index

            let textAnchor: "start" | "middle" | "end" = "start"
            let dominantBaseline: "auto" | "middle" | "hanging" = "middle"
            let textOffsetX = 0
            let textOffsetY = 0

            if (isMobile) {
              textAnchor = "middle"
              textOffsetX = 0

              if (index === 0 || index === 1 || index === 5) {
                dominantBaseline = "auto"
                textOffsetY = -30
              } else {
                dominantBaseline = "hanging"
                textOffsetY = 30
              }
            } else {
              // LOGIKA DESKTOP:
              if (index === 0) {
                textAnchor = "middle"
                dominantBaseline = "auto"
                textOffsetX = 0
                textOffsetY = -30
              } else if (index === 3) {
                textAnchor = "middle"
                dominantBaseline = "hanging"
                textOffsetX = 0
                textOffsetY = 30
              } else if (x < centerX) {
                textAnchor = "end"
                textOffsetX = -25
                textOffsetY = 0
              } else {
                textAnchor = "start"
                textOffsetX = 25
                textOffsetY = 0
              }
            }

            return (
              <g
                key={item.step}
                onClick={() => setActiveStep(index)}
                className="group cursor-pointer"
              >
                {/* Glow Effect */}
                {isActive && (
                  <circle
                    cx={x}
                    cy={y}
                    r={isMobile ? "30" : "22"}
                    fill="white"
                    opacity="0.25"
                    className="animate-pulse"
                  />
                )}

                {/* Node Circle */}
                <circle
                  cx={x}
                  cy={y}
                  r={isActive ? (isMobile ? "14" : "11") : (isMobile ? "10" : "8")}
                  fill={isActive ? "#ffffff" : "#022752"}
                  stroke="#ffffff"
                  strokeWidth="3"
                  className="transition-all duration-300"
                />

                {/* Text Label */}
                <text
                  x={x + textOffsetX}
                  y={y + textOffsetY}
                  textAnchor={textAnchor}
                  dominantBaseline={dominantBaseline}
                  fill={isActive ? "#ffffff" : "#FFFFFF90"}
                  fontSize={isMobile ? "30" : "24"}
                  fontWeight={isActive ? "semibold" : "500"}
                  className="transition-colors duration-300 group-hover:fill-white"
                >
                  <tspan opacity="0.6">{item.step}. </tspan>
                  {item.title}
                </text>
              </g>
            )
          })}

          {/* Core Text Center */}
          <text
            x={centerX}
            y={centerY}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="#FFFFFF"
            fontSize={isMobile ? "22" : "16"}
            letterSpacing="4"
            fontWeight="semibold"
          >
            PROSES SERTIFIKASI
          </text>
        </svg>
      </div>

      {/* Bottom Floating Detail Card */}
      <div className="mx-auto max-w-sm rounded-xl border border-slate-100 bg-slate-50 p-6 backdrop-blur-md md:absolute md:right-12 md:bottom-10 lg:right-20">
        <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-neutral-700">
          LANGKAH {stepsData[activeStep].step} DARI 06
        </div>
        <h3 className="mb-2 text-lg font-medium tracking-tight text-black">
          {stepsData[activeStep].title}
        </h3>
        <p className="text-sm leading-relaxed text-neutral-700">
          {stepsData[activeStep].description}
        </p>
      </div>
    </section>
  )
}