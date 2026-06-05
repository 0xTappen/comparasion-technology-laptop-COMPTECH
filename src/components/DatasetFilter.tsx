"use client";
import { Filter } from "lucide-react";

export interface FilterOptions {
  maxPrice: number;
  minRam: number;
  minStorage: number;
  category: string;
}

interface Props {
  filters: FilterOptions;
  setFilters: (f: FilterOptions) => void;
  categories: string[];
}

export default function DatasetFilter({ filters, setFilters, categories }: Props) {
  return (
    <div className="brutal-card bg-brutal-orange p-4 md:p-6 mt-6">
      <div className="flex items-center gap-3 mb-4">
        <Filter size={24} />
        <h3 className="font-bold text-xl">Filter Data</h3>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {/* Harga */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-bold">Maksimal Harga</label>
          <select 
            value={filters.maxPrice}
            onChange={(e) => setFilters({...filters, maxPrice: Number(e.target.value)})}
            className="brutal-input bg-white w-full font-mono text-sm p-2 cursor-pointer"
          >
            <option value={0}>Semua Harga</option>
            <option value={5000000}>&lt; Rp 5.000.000</option>
            <option value={10000000}>&lt; Rp 10.000.000</option>
            <option value={15000000}>&lt; Rp 15.000.000</option>
            <option value={20000000}>&lt; Rp 20.000.000</option>
            <option value={30000000}>&lt; Rp 30.000.000</option>
          </select>
        </div>

        {/* RAM */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-bold">Minimal RAM</label>
          <select 
            value={filters.minRam}
            onChange={(e) => setFilters({...filters, minRam: Number(e.target.value)})}
            className="brutal-input bg-white w-full font-mono text-sm p-2 cursor-pointer"
          >
            <option value={0}>Semua RAM</option>
            <option value={4}>&gt;= 4 GB</option>
            <option value={8}>&gt;= 8 GB</option>
            <option value={16}>&gt;= 16 GB</option>
            <option value={32}>&gt;= 32 GB</option>
          </select>
        </div>

        {/* Storage */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-bold">Minimal Storage</label>
          <select 
            value={filters.minStorage}
            onChange={(e) => setFilters({...filters, minStorage: Number(e.target.value)})}
            className="brutal-input bg-white w-full font-mono text-sm p-2 cursor-pointer"
          >
            <option value={0}>Semua Storage</option>
            <option value={256}>&gt;= 256 GB</option>
            <option value={512}>&gt;= 512 GB</option>
            <option value={1000}>&gt;= 1 TB</option>
          </select>
        </div>

        {/* Category */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-bold">Kategori</label>
          <select 
            value={filters.category}
            onChange={(e) => setFilters({...filters, category: e.target.value})}
            className="brutal-input bg-white w-full font-mono text-sm p-2 cursor-pointer"
          >
            <option value="All">Semua Kategori</option>
            {categories.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
