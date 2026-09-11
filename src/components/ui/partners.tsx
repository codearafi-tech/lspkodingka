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

export default function Partners() {
  return (
    <section className="w-full mt-10">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 border-t border-l border-border">
        {partners.map((partner, index) => (
          <div
            key={index}
            className="flex items-center justify-center p-6 border-r border-b border-border bg-white transition-colors hover:bg-neutral-50"
          >
            <img
              src={partner.logo}
              alt={partner.name}
              className="h-12 w-auto max-w-full object-contain"
            />
          </div>
        ))}
      </div>
    </section>
  )
}