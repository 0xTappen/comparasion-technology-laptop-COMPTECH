"use client";
import { useMemo } from "react";
import { RankedLaptop } from "@/lib/calculations";

interface Props {
  results: RankedLaptop[];
}

export default function RankChart({ results }: Props) {
  const topN = useMemo(() => {
    const sorted = [...results].sort((a, b) => a.sawRank - b.sawRank);
    return sorted.slice(0, 15);
  }, [results]);

  if (topN.length === 0) return null;

  const maxScore = Math.max(
    ...topN.map((r) => Math.max(r.sawScore, r.topsisScore))
  );

  return (
    <div className="brutal-card bg-white p-4 md:p-6 mt-6">
      <h3 className="font-bold text-xl mb-6">
        Score Visualization — Top 15
      </h3>
      <div className="space-y-3">
        {topN.map((r) => {
          const sawWidth = (r.sawScore / maxScore) * 100;
          const topsisWidth = (r.topsisScore / maxScore) * 100;
          return (
            <div key={r.id} className="group">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-mono font-bold w-6 text-right shrink-0">
                  {r.sawRank}
                </span>
                <span className="text-xs font-bold truncate flex-1">{r.name}</span>
                <span className="text-[10px] font-mono opacity-50 shrink-0 hidden sm:inline">
                  Δ{r.delta}
                </span>
              </div>
              <div className="flex flex-col gap-1 ml-8">
                {/* SAW bar */}
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono w-10 text-right shrink-0">SAW</span>
                  <div className="flex-1 h-5 bg-gray-100 border-2 border-black relative overflow-hidden">
                    <div
                      className="h-full bg-brutal-green transition-all duration-700 ease-out"
                      style={{ width: `${sawWidth}%` }}
                    />
                    <span className="absolute right-1 top-1/2 -translate-y-1/2 text-[9px] font-mono font-bold">
                      {r.sawScore.toFixed(3)}
                    </span>
                  </div>
                </div>
                {/* TOPSIS bar */}
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono w-10 text-right shrink-0">TOP</span>
                  <div className="flex-1 h-5 bg-gray-100 border-2 border-black relative overflow-hidden">
                    <div
                      className="h-full bg-brutal-pink transition-all duration-700 ease-out"
                      style={{ width: `${topsisWidth}%` }}
                    />
                    <span className="absolute right-1 top-1/2 -translate-y-1/2 text-[9px] font-mono font-bold">
                      {r.topsisScore.toFixed(3)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {/* Legend */}
      <div className="flex gap-4 mt-4 pt-3 border-t-2 border-black">
        <span className="flex items-center gap-1.5 text-xs font-bold">
          <span className="w-4 h-3 bg-brutal-green border-2 border-black inline-block" /> SAW Score
        </span>
        <span className="flex items-center gap-1.5 text-xs font-bold">
          <span className="w-4 h-3 bg-brutal-pink border-2 border-black inline-block" /> TOPSIS Score
        </span>
      </div>
    </div>
  );
}
