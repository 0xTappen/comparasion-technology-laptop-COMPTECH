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
  "Student budget efficiency. Lower cost is better.",
  "Capability for multitasking, code compilation, and virtualization.",
  "Capacity to run heavy IDEs, Docker, and virtual machines at the same time.",
  "Read/write speed and storage capacity for project files.",
  "Acceleration for rendering, machine learning, and computational graphics.",
];

export default function KriteriaSection() {
  return (
    <section id="criteria" className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-2">
          <Scale size={28} />
          <span className="text-xs font-mono uppercase tracking-widest bg-black text-white px-3 py-1">
            Section 01
          </span>
        </div>
        <h2 className="text-3xl md:text-5xl font-bold mb-4">
          Criteria &amp; Weights
        </h2>
        <p className="text-lg mb-10 max-w-2xl text-gray-700">
          Five evaluation criteria used in the SAW and TOPSIS calculation process,
          with a total combined weight of 100%.
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


      </div>
    </section>
  );
}
