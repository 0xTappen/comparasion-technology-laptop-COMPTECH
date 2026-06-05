"use client";
import { useState, useEffect } from "react";
import { LaptopData } from "@/lib/calculations";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";

interface Props {
  data: LaptopData[];
}

const ROWS_PER_PAGE = 15;

const CATEGORY_COLORS: Record<string, string> = {
  "Low-End": "bg-brutal-cyan",
  "Mid-End": "bg-brutal-yellow",
  "High-End": "bg-brutal-pink",
};

export default function DatasetTable({ data }: Props) {
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");

  // Auto-reset page when the parent data (from filters) changes
  useEffect(() => {
    setPage(0);
  }, [data]);

  const filtered = data.filter(
    (l) =>
      l.name.toLowerCase().includes(search.toLowerCase()) ||
      l.cpu.toLowerCase().includes(search.toLowerCase()) ||
      l.gpu.toLowerCase().includes(search.toLowerCase()) ||
      l.category.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / ROWS_PER_PAGE);
  const pageData = filtered.slice(page * ROWS_PER_PAGE, (page + 1) * ROWS_PER_PAGE);

  const formatPrice = (p: number) =>
    new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(p);

  return (
    <div className="brutal-card bg-white p-4 md:p-6 mt-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
        <h3 className="font-bold text-xl">
          Raw Dataset{" "}
          <span className="text-sm font-mono bg-black text-white px-2 py-0.5 ml-2">
            {filtered.length} rows
          </span>
        </h3>
        <div className="relative w-full sm:w-64">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 opacity-50" />
          <input
            type="text"
            placeholder="Cari laptop..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(0);
            }}
            className="brutal-input w-full pl-9 pr-3 py-2 text-sm bg-white"
          />
        </div>
      </div>

      <div className="overflow-x-auto -mx-4 md:-mx-6 px-4 md:px-6">
        <table className="brutal-table w-full text-sm">
          <thead>
            <tr className="bg-black text-white">
              <th className="text-left whitespace-nowrap">#</th>
              <th className="text-left whitespace-nowrap">Nama Laptop</th>
              <th className="text-left whitespace-nowrap">Kategori</th>
              <th className="text-left whitespace-nowrap">CPU</th>
              <th className="text-center whitespace-nowrap">RAM</th>
              <th className="text-center whitespace-nowrap">Storage</th>
              <th className="text-left whitespace-nowrap">GPU</th>
              <th className="text-right whitespace-nowrap">Harga</th>
            </tr>
          </thead>
          <tbody>
            {pageData.map((l) => (
              <tr key={l.id} className="hover:bg-brutal-yellow/30 transition-colors">
                <td className="font-mono text-xs">{l.id}</td>
                <td className="font-bold whitespace-nowrap">{l.name}</td>
                <td>
                  <span className={`${CATEGORY_COLORS[l.category] || "bg-gray-200"} border-2 border-black px-2 py-0.5 text-xs font-bold whitespace-nowrap`}>
                    {l.category}
                  </span>
                </td>
                <td className="text-xs whitespace-nowrap">{l.cpu}</td>
                <td className="text-center font-mono">{l.ram} GB</td>
                <td className="text-center font-mono">{l.storage} GB</td>
                <td className="text-xs whitespace-nowrap">{l.gpu}</td>
                <td className="text-right font-mono text-xs whitespace-nowrap">{formatPrice(l.price)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-4 pt-4 border-t-2 border-black">
          <button
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={page === 0}
            className="brutal-hover border-3 border-black bg-white px-3 py-2 font-bold text-sm shadow-[4px_4px_0px_rgba(0,0,0,1)] disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
          >
            <ChevronLeft size={16} />
          </button>
          <span className="font-mono text-sm font-bold">
            {page + 1} / {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
            disabled={page === totalPages - 1}
            className="brutal-hover border-3 border-black bg-white px-3 py-2 font-bold text-sm shadow-[4px_4px_0px_rgba(0,0,0,1)] disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
}
