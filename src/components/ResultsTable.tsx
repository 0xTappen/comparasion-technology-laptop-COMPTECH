"use client";
import { useState, useMemo } from "react";
import { RankedLaptop } from "@/lib/calculations";
import { Trophy, ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";

interface Props {
  results: RankedLaptop[];
}

type SortField = "sawRank" | "topsisRank" | "delta" | "sawScore" | "topsisScore";

const MEDAL_COLORS = ["bg-brutal-yellow", "bg-gray-300", "bg-brutal-orange"];

export default function ResultsTable({ results }: Props) {
  const [showCount, setShowCount] = useState(10);
  const [sortField, setSortField] = useState<SortField>("sawRank");
  const [sortAsc, setSortAsc] = useState(true);

  const sorted = useMemo(() => {
    const arr = [...results];
    arr.sort((a, b) => {
      const va = a[sortField];
      const vb = b[sortField];
      return sortAsc ? va - vb : vb - va;
    });
    return arr.slice(0, showCount);
  }, [results, sortField, sortAsc, showCount]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(field === "sawRank" || field === "topsisRank");
    }
  };

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return <ArrowUpDown size={12} className="opacity-30" />;
    return sortAsc ? <ArrowUp size={12} /> : <ArrowDown size={12} />;
  };

  const formatPrice = (p: number) =>
    new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(p);

  return (
    <section id="hasil" className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-2">
          <Trophy size={28} />
          <span className="text-xs font-mono uppercase tracking-widest bg-black text-white px-3 py-1">
            Section 03
          </span>
        </div>
        <h2 className="text-3xl md:text-5xl font-bold mb-4">Hasil Komparasi</h2>
        <p className="text-lg mb-6 max-w-2xl text-gray-700">
          Peringkat laptop berdasarkan metode SAW dan TOPSIS. Delta menunjukkan pergeseran
          posisi antara kedua metode.
        </p>

        {/* Show count controls */}
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <span className="text-sm font-bold">Tampilkan:</span>
          {[10, 25, 50, 100].map((n) => (
            <button
              key={n}
              onClick={() => setShowCount(n)}
              className={`brutal-hover border-3 border-black px-3 py-1.5 text-sm font-bold shadow-[4px_4px_0px_rgba(0,0,0,1)] cursor-pointer ${
                showCount === n ? "bg-brutal-yellow" : "bg-white"
              }`}
            >
              Top {n}
            </button>
          ))}
        </div>

        {/* Results Table */}
        <div className="brutal-card bg-white overflow-hidden">
          <div className="overflow-x-auto">
            <table className="brutal-table w-full text-sm">
              <thead>
                <tr className="bg-black text-white">
                  <th className="text-center whitespace-nowrap w-12">#</th>
                  <th className="text-left whitespace-nowrap">Laptop</th>
                  <th className="text-left whitespace-nowrap hidden md:table-cell">Kategori</th>
                  <th className="text-right whitespace-nowrap hidden lg:table-cell">Harga</th>
                  <th
                    onClick={() => handleSort("sawScore")}
                    className="text-center whitespace-nowrap cursor-pointer hover:bg-brutal-green/30 select-none"
                  >
                    <div className="flex items-center justify-center gap-1">
                      SAW Score <SortIcon field="sawScore" />
                    </div>
                  </th>
                  <th
                    onClick={() => handleSort("sawRank")}
                    className="text-center whitespace-nowrap cursor-pointer hover:bg-brutal-green/30 select-none"
                  >
                    <div className="flex items-center justify-center gap-1">
                      Rank SAW <SortIcon field="sawRank" />
                    </div>
                  </th>
                  <th
                    onClick={() => handleSort("topsisScore")}
                    className="text-center whitespace-nowrap cursor-pointer hover:bg-brutal-pink/30 select-none"
                  >
                    <div className="flex items-center justify-center gap-1">
                      TOPSIS Score <SortIcon field="topsisScore" />
                    </div>
                  </th>
                  <th
                    onClick={() => handleSort("topsisRank")}
                    className="text-center whitespace-nowrap cursor-pointer hover:bg-brutal-pink/30 select-none"
                  >
                    <div className="flex items-center justify-center gap-1">
                      Rank TOPSIS <SortIcon field="topsisRank" />
                    </div>
                  </th>
                  <th
                    onClick={() => handleSort("delta")}
                    className="text-center whitespace-nowrap cursor-pointer hover:bg-brutal-yellow/30 select-none"
                  >
                    <div className="flex items-center justify-center gap-1">
                      Δ Delta <SortIcon field="delta" />
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {sorted.map((r, i) => {
                  const medal = sortField === "sawRank" && sortAsc && i < 3;
                  return (
                    <tr
                      key={r.id}
                      className={`hover:bg-brutal-yellow/20 transition-colors ${
                        medal ? MEDAL_COLORS[i] + "/30" : ""
                      }`}
                    >
                      <td className="text-center">
                        {medal ? (
                          <span className={`${MEDAL_COLORS[i]} border-2 border-black w-7 h-7 inline-flex items-center justify-center font-bold text-xs`}>
                            {i + 1}
                          </span>
                        ) : (
                          <span className="font-mono text-xs">{i + 1}</span>
                        )}
                      </td>
                      <td>
                        <div className="font-bold text-sm whitespace-nowrap">{r.name}</div>
                        <div className="text-xs text-gray-500 md:hidden">{r.category}</div>
                      </td>
                      <td className="hidden md:table-cell">
                        <span className={`${
                          r.category === "High-End" ? "bg-brutal-pink" :
                          r.category === "Mid-End" ? "bg-brutal-yellow" : "bg-brutal-cyan"
                        } border-2 border-black px-2 py-0.5 text-xs font-bold whitespace-nowrap`}>
                          {r.category}
                        </span>
                      </td>
                      <td className="text-right font-mono text-xs whitespace-nowrap hidden lg:table-cell">
                        {formatPrice(r.price)}
                      </td>
                      <td className="text-center">
                        <span className="bg-brutal-green/30 border border-black px-2 py-0.5 font-mono text-xs font-bold">
                          {r.sawScore.toFixed(4)}
                        </span>
                      </td>
                      <td className="text-center font-bold font-mono">{r.sawRank}</td>
                      <td className="text-center">
                        <span className="bg-brutal-pink/30 border border-black px-2 py-0.5 font-mono text-xs font-bold">
                          {r.topsisScore.toFixed(4)}
                        </span>
                      </td>
                      <td className="text-center font-bold font-mono">{r.topsisRank}</td>
                      <td className="text-center">
                        <span
                          className={`font-bold font-mono text-sm px-2 py-0.5 border-2 border-black inline-block min-w-[2rem] ${
                            r.delta === 0
                              ? "bg-brutal-green"
                              : r.delta <= 3
                              ? "bg-brutal-yellow"
                              : r.delta <= 10
                              ? "bg-brutal-orange"
                              : "bg-brutal-red text-white"
                          }`}
                        >
                          {r.delta}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-3 mt-4">
          <span className="text-xs font-bold">Delta Legend:</span>
          <span className="text-xs flex items-center gap-1"><span className="w-3 h-3 bg-brutal-green border border-black inline-block" /> 0 (Sama)</span>
          <span className="text-xs flex items-center gap-1"><span className="w-3 h-3 bg-brutal-yellow border border-black inline-block" /> 1-3 (Kecil)</span>
          <span className="text-xs flex items-center gap-1"><span className="w-3 h-3 bg-brutal-orange border border-black inline-block" /> 4-10 (Sedang)</span>
          <span className="text-xs flex items-center gap-1"><span className="w-3 h-3 bg-brutal-red border border-black inline-block" /> &gt;10 (Besar)</span>
        </div>
      </div>
    </section>
  );
}
