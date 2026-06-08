import { BookOpen, CheckCircle2, ArrowRight, Lightbulb } from "lucide-react";

export default function KesimpulanSection() {
  return (
    <section id="conclusion" className="py-16 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-2">
          <BookOpen size={28} />
          <span className="text-xs font-mono uppercase tracking-widest bg-black text-white px-3 py-1">
            Section 04
          </span>
        </div>
        <h2 className="text-3xl md:text-5xl font-bold mb-8">Conclusion</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* SAW Conclusion */}
          <div className="brutal-card bg-brutal-green p-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="bg-black text-brutal-green px-3 py-1 text-sm font-mono font-bold">SAW</span>
              <h3 className="font-bold text-lg">Simple Additive Weighting</h3>
            </div>
            <ul className="space-y-3">
              {[
                "Tends to favor alternatives with the highest raw power in heavily weighted criteria",
                "Linear normalization keeps score differences directly proportional to raw values",
                "CPU weight (25%) and RAM weight (25%) are highly dominant in determining rank",
                "Well suited for decision makers who prioritize maximum performance",
                "The method is simpler and easier to interpret directly",
              ].map((text, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <CheckCircle2 size={16} className="shrink-0 mt-0.5" />
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* TOPSIS Conclusion */}
          <div className="brutal-card bg-black p-6 text-white">
            <div className="flex items-center gap-2 mb-4">
              <span className="bg-brutal-pink text-black px-3 py-1 text-sm font-mono font-bold">TOPSIS</span>
              <h3 className="font-bold text-lg">TOPSIS Method</h3>
            </div>
            <ul className="space-y-3">
              {[
                "Prioritizes balance across all criteria simultaneously",
                "Considers distance to both the positive and negative ideal solutions",
                "Euclidean vector normalization reduces the dominance of a single criterion",
                "Laptops with evenly distributed specifications tend to rank higher",
                "A strong fit for decisions that require a broader trade-off analysis",
              ].map((text, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <CheckCircle2 size={16} className="shrink-0 mt-0.5" />
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Key Insight */}
        <div className="brutal-card bg-brutal-yellow p-6 md:p-8 mt-6">
          <div className="flex items-start gap-3">
            <Lightbulb size={28} className="shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-xl mb-3">Key Finding</h3>
              <p className="text-sm leading-relaxed mb-4">
                The comparison shows that even though SAW and TOPSIS rankings are positively correlated,
                some alternatives still shift meaningfully in relative position. <strong>SAW tends to place
                laptops with standout specifications in one dominant criterion</strong> (for example, a flagship
                CPU) near the top, while <strong>TOPSIS gives more credit to laptops with balanced specifications</strong>{" "}
                across all criteria because the distance from the negative ideal solution penalizes imbalance.
              </p>
              <div className="flex items-center gap-2 bg-white border-3 border-black p-3 text-sm font-bold">
                <ArrowRight size={16} />
                <span>
                  Recommendation: use TOPSIS when you need balanced decision-making,
                  and SAW when raw performance is the main priority.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
