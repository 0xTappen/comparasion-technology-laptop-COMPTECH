"use client";
import { useMemo } from "react";
import { RankedLaptop } from "@/lib/calculations";
import { BarChart3, TrendingUp, Shuffle, Award } from "lucide-react";

interface Props {
  results: RankedLaptop[];
}

export default function StatsCards({ results }: Props) {
  const stats = useMemo(() => {
    if (results.length === 0) return null;

    const avgDelta = results.reduce((s, r) => s + r.delta, 0) / results.length;
    const maxDelta = Math.max(...results.map((r) => r.delta));
    const zeroDelta = results.filter((r) => r.delta === 0).length;

    // Top 1 SAW
    const sawTop = [...results].sort((a, b) => a.sawRank - b.sawRank)[0];
    // Top 1 TOPSIS
    const topsisTop = [...results].sort((a, b) => a.topsisRank - b.topsisRank)[0];

    // Spearman rank correlation
    const n = results.length;
    const sumD2 = results.reduce((s, r) => s + Math.pow(r.sawRank - r.topsisRank, 2), 0);
    const spearman = 1 - (6 * sumD2) / (n * (n * n - 1));

    return { avgDelta, maxDelta, zeroDelta, sawTop, topsisTop, spearman };
  }, [results]);

  if (!stats) return null;

  const cards = [
    {
      icon: Award,
      label: "Top SAW",
      value: stats.sawTop.name,
      sub: `Score: ${stats.sawTop.sawScore.toFixed(4)}`,
      color: "bg-brutal-green",
    },
    {
      icon: Award,
      label: "Top TOPSIS",
      value: stats.topsisTop.name,
      sub: `Score: ${stats.topsisTop.topsisScore.toFixed(4)}`,
      color: "bg-brutal-pink",
    },
    {
      icon: TrendingUp,
      label: "Korelasi Spearman",
      value: stats.spearman.toFixed(4),
      sub: stats.spearman > 0.8 ? "Korelasi Kuat" : stats.spearman > 0.5 ? "Korelasi Sedang" : "Korelasi Lemah",
      color: "bg-brutal-cyan",
    },
    {
      icon: Shuffle,
      label: "Rata-rata Delta",
      value: stats.avgDelta.toFixed(2),
      sub: `Max: ${stats.maxDelta} | Sama: ${stats.zeroDelta}`,
      color: "bg-brutal-yellow",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8 mb-8">
      {cards.map((card) => (
        <div
          key={card.label}
          className={`brutal-card brutal-hover ${card.color} p-5`}
        >
          <div className="flex items-center gap-2 mb-3">
            <card.icon size={18} />
            <span className="text-xs font-mono font-bold uppercase tracking-wide">{card.label}</span>
          </div>
          <p className="text-xl font-bold leading-tight truncate">{card.value}</p>
          <p className="text-xs mt-1 opacity-70 font-mono">{card.sub}</p>
        </div>
      ))}
    </div>
  );
}
