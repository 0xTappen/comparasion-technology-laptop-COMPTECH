import { BookOpen, CheckCircle2, ArrowRight, Lightbulb } from "lucide-react";

export default function KesimpulanSection() {
  return (
    <section id="kesimpulan" className="py-16 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-2">
          <BookOpen size={28} />
          <span className="text-xs font-mono uppercase tracking-widest bg-black text-white px-3 py-1">
            Section 04
          </span>
        </div>
        <h2 className="text-3xl md:text-5xl font-bold mb-8">Kesimpulan</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* SAW Conclusion */}
          <div className="brutal-card bg-brutal-green p-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="bg-black text-brutal-green px-3 py-1 text-sm font-mono font-bold">SAW</span>
              <h3 className="font-bold text-lg">Simple Additive Weighting</h3>
            </div>
            <ul className="space-y-3">
              {[
                "Cenderung mengutamakan alternatif dengan raw power tertinggi pada kriteria berbobot besar",
                "Normalisasi linear membuat perbedaan skor proporsional langsung terhadap nilai mentah",
                "Bobot CPU (25%) dan RAM (25%) sangat dominan dalam menentukan peringkat",
                "Cocok untuk pengambil keputusan yang memprioritaskan performa maksimal",
                "Metode lebih sederhana dan mudah diinterpretasi secara langsung",
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
                "Mengutamakan keseimbangan (balance) antar semua kriteria secara simultan",
                "Mempertimbangkan jarak terhadap solusi ideal positif DAN negatif",
                "Normalisasi vektor Euclidean meredam dominasi satu kriteria tunggal",
                "Laptop dengan spesifikasi merata cenderung mendapat peringkat lebih tinggi",
                "Cocok untuk keputusan yang membutuhkan pertimbangan trade-off menyeluruh",
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
              <h3 className="font-bold text-xl mb-3">Temuan Utama</h3>
              <p className="text-sm leading-relaxed mb-4">
                Komparasi kedua metode menunjukkan bahwa meskipun terdapat korelasi positif antara hasil
                peringkat SAW dan TOPSIS, terdapat perbedaan signifikan pada posisi relatif beberapa
                alternatif. <strong>SAW cenderung menempatkan laptop dengan spesifikasi &quot;puncak&quot;
                pada satu kriteria dominan</strong> (misal: CPU flagship) di peringkat atas, sementara{" "}
                <strong>TOPSIS lebih mengapresiasi laptop dengan distribusi spesifikasi yang merata</strong>{" "}
                dan seimbang di semua kriteria — terutama karena perhitungan jarak dari solusi ideal terburuk
                (negatif) memberikan penalti pada ketidakseimbangan.
              </p>
              <div className="flex items-center gap-2 bg-white border-3 border-black p-3 text-sm font-bold">
                <ArrowRight size={16} />
                <span>
                  Rekomendasi: Gunakan TOPSIS untuk keputusan yang membutuhkan balance,
                  dan SAW ketika performa mentah adalah prioritas utama.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
