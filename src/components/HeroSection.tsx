import { Zap, ArrowDown } from "lucide-react";

export default function HeroSection() {
  return (
    <section id="hero" className="pt-24 pb-16 px-4 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 right-8 w-24 h-24 bg-brutal-pink border-4 border-black rotate-12 opacity-60 hidden lg:block" />
      <div className="absolute bottom-10 left-12 w-16 h-16 bg-brutal-cyan border-4 border-black -rotate-6 opacity-60 hidden lg:block" />
      <div className="absolute top-40 left-[20%] w-8 h-8 bg-brutal-green border-3 border-black rotate-45 opacity-50 hidden lg:block" />

      <div className="max-w-5xl mx-auto text-center relative z-10">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-brutal-cyan border-3 border-black px-4 py-2 text-sm font-bold shadow-[4px_4px_0px_rgba(0,0,0,1)] mb-6">
          <Zap size={16} className="fill-current" />
          SISTEM PENDUKUNG KEPUTUSAN
        </div>

        {/* Main Title */}
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold leading-[0.95] tracking-tight mb-6">
          SPK Pemilihan
          <br />
          <span className="bg-brutal-yellow px-3 py-1 inline-block border-4 border-black shadow-[6px_6px_0px_rgba(0,0,0,1)] mt-2 -rotate-1">
            Laptop Informatika
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl max-w-3xl mx-auto leading-relaxed mb-8 font-medium">
          Komparasi metode <span className="bg-brutal-green px-1.5 border-2 border-black font-bold">SAW</span> dan{" "}
          <span className="bg-brutal-pink px-1.5 border-2 border-black font-bold text-white">TOPSIS</span>{" "}
          dalam evaluasi sistematis variabel teknis laptop untuk menunjang performa coding, IDE, virtualisasi,
          dan data science bagi mahasiswa Informatika.
        </p>

        {/* Authors */}
        <div className="brutal-card p-4 md:p-6 inline-block bg-white max-w-2xl">
          <p className="text-xs font-mono uppercase tracking-widest text-gray-500 mb-3">Tim</p>
          <div className="flex flex-wrap justify-center gap-3">
            {["Jagarya Vanneska", "Dionisius Avendrata Putra", "Erwin Wijaya"].map((name) => (
              <span
                key={name}
                className="bg-brutal-yellow border-2 border-black px-3 py-1.5 text-sm font-bold shadow-[3px_3px_0px_rgba(0,0,0,1)]"
              >
                {name}
              </span>
            ))}
          </div>
          <p className="text-xs font-mono mt-3 text-gray-600">
            Universitas Teknokrat Indonesia
          </p>
        </div>

        {/* Scroll indicator */}
        <div className="mt-12">
          <a href="#kriteria" className="inline-flex flex-col items-center gap-1 text-sm font-bold opacity-60 hover:opacity-100 transition-opacity">
            <span>Mulai Eksplorasi</span>
            <ArrowDown size={20} className="animate-bounce" />
          </a>
        </div>
      </div>
    </section>
  );
}
