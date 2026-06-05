import { CRITERIA } from "@/lib/calculations";
import { Scale, TrendingUp, TrendingDown } from "lucide-react";

const CRITERIA_COLORS = [
  "bg-brutal-orange",
  "bg-brutal-cyan",
  "bg-brutal-green",
  "bg-brutal-purple",
  "bg-brutal-pink",
];

const CRITERIA_DETAILS = [
  "Efisiensi anggaran mahasiswa — semakin rendah semakin baik.",
  "Kemampuan multitasking, kompilasi kode, dan virtualisasi.",
  "Kapasitas untuk menjalankan IDE berat, Docker, dan VM secara simultan.",
  "Kecepatan baca/tulis dan kapasitas penyimpanan proyek.",
  "Akselerasi rendering, machine learning, dan grafis komputasi.",
];

export default function KriteriaSection() {
  return (
    <section id="kriteria" className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-2">
          <Scale size={28} />
          <span className="text-xs font-mono uppercase tracking-widest bg-black text-white px-3 py-1">
            Section 01
          </span>
        </div>
        <h2 className="text-3xl md:text-5xl font-bold mb-4">
          Kriteria &amp; Bobot
        </h2>
        <p className="text-lg mb-10 max-w-2xl text-gray-700">
          Lima kriteria evaluasi yang digunakan dalam proses perhitungan SAW dan TOPSIS,
          dengan total bobot 100%.
        </p>

        {/* Criteria Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {CRITERIA.map((c, i) => (
            <div
              key={c.code}
              className={`brutal-card brutal-hover ${CRITERIA_COLORS[i]} p-5 flex flex-col gap-3`}
            >
              {/* Code badge */}
              <div className="flex items-center justify-between">
                <span className="bg-black text-white text-xs font-mono px-2 py-1 font-bold">
                  {c.code}
                </span>
                {c.type === "cost" ? (
                  <span className="flex items-center gap-1 text-xs font-bold bg-white border-2 border-black px-2 py-0.5">
                    <TrendingDown size={12} /> COST
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-xs font-bold bg-white border-2 border-black px-2 py-0.5">
                    <TrendingUp size={12} /> BENEFIT
                  </span>
                )}
              </div>

              {/* Name */}
              <h3 className="font-bold text-sm leading-tight">{c.name}</h3>

              {/* Weight bar */}
              <div className="mt-auto">
                <div className="flex items-end justify-between mb-1">
                  <span className="text-3xl font-bold font-mono">{c.weight * 100}%</span>
                </div>
                <div className="w-full h-3 bg-white border-2 border-black">
                  <div
                    className="h-full bg-black transition-all duration-500"
                    style={{ width: `${c.weight * 100}%` }}
                  />
                </div>
              </div>

              {/* Description */}
              <p className="text-xs leading-relaxed opacity-80">{CRITERIA_DETAILS[i]}</p>
            </div>
          ))}
        </div>

        {/* Formula Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
          <div className="brutal-card bg-brutal-green p-6">
            <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
              <span className="bg-black text-brutal-green px-2 py-0.5 text-sm font-mono">SAW</span>
              Simple Additive Weighting
            </h3>
            <div className="bg-white border-2 border-black p-3 font-mono text-sm">
              <p className="mb-1">Benefit: r<sub>ij</sub> = x<sub>ij</sub> / max(x<sub>j</sub>)</p>
              <p className="mb-1">Cost: r<sub>ij</sub> = min(x<sub>j</sub>) / x<sub>ij</sub></p>
              <p className="font-bold mt-2">V<sub>i</sub> = Σ w<sub>j</sub> · r<sub>ij</sub></p>
            </div>
          </div>
          <div className="brutal-card bg-brutal-pink p-6">
            <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
              <span className="bg-black text-brutal-pink px-2 py-0.5 text-sm font-mono">TOPSIS</span>
              Technique for Order Preference
            </h3>
            <div className="bg-white border-2 border-black p-3 font-mono text-sm">
              <p className="mb-1">r<sub>ij</sub> = x<sub>ij</sub> / √(Σ x<sub>ij</sub>²)</p>
              <p className="mb-1">D⁺ = √(Σ(v<sub>ij</sub> - A⁺<sub>j</sub>)²)</p>
              <p className="font-bold mt-2">C<sub>i</sub> = D⁻ / (D⁺ + D⁻)</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
