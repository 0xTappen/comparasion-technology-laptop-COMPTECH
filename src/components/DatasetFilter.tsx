"use client";
import { useState, useRef, useEffect } from "react";
import { Filter, ChevronDown } from "lucide-react";

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

interface CustomSelectProps {
  label: string;
  value: string | number;
  options: { label: string; value: string | number }[];
  onChange: (value: string | number) => void;
}

function CustomSelect({ label, value, options, onChange }: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption = options.find((o) => o.value === value) || options[0];

  return (
    <div className="flex flex-col gap-1 relative" ref={containerRef}>
      <label className="text-sm font-bold">{label}</label>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="brutal-input bg-white w-full font-mono text-sm p-3 cursor-pointer flex justify-between items-center text-left"
      >
        <span className="truncate">{selectedOption.label}</span>
        <ChevronDown size={16} className={`transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border-4 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] z-50 max-h-60 overflow-y-auto">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              className={`w-full text-left px-4 py-3 font-mono text-sm border-b-2 border-black last:border-b-0 hover:bg-brutal-yellow transition-colors ${
                value === option.value ? "bg-brutal-yellow font-bold" : ""
              }`}
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function DatasetFilter({ filters, setFilters, categories }: Props) {
  return (
    <div className="brutal-card bg-brutal-orange p-4 md:p-6 mt-6">
      <div className="flex items-center gap-3 mb-6">
        <Filter size={24} />
        <h3 className="font-bold text-xl">Filter Data</h3>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        <CustomSelect
          label="Maksimal Harga"
          value={filters.maxPrice}
          onChange={(val) => setFilters({ ...filters, maxPrice: Number(val) })}
          options={[
            { label: "Semua Harga", value: 0 },
            { label: "< Rp 5.000.000", value: 5000000 },
            { label: "< Rp 10.000.000", value: 10000000 },
            { label: "< Rp 15.000.000", value: 15000000 },
            { label: "< Rp 20.000.000", value: 20000000 },
            { label: "< Rp 30.000.000", value: 30000000 },
          ]}
        />

        <CustomSelect
          label="Minimal RAM"
          value={filters.minRam}
          onChange={(val) => setFilters({ ...filters, minRam: Number(val) })}
          options={[
            { label: "Semua RAM", value: 0 },
            { label: ">= 4 GB", value: 4 },
            { label: ">= 8 GB", value: 8 },
            { label: ">= 16 GB", value: 16 },
            { label: ">= 32 GB", value: 32 },
          ]}
        />

        <CustomSelect
          label="Minimal Storage"
          value={filters.minStorage}
          onChange={(val) => setFilters({ ...filters, minStorage: Number(val) })}
          options={[
            { label: "Semua Storage", value: 0 },
            { label: ">= 256 GB", value: 256 },
            { label: ">= 512 GB", value: 512 },
            { label: ">= 1 TB", value: 1000 },
          ]}
        />

        <CustomSelect
          label="Kategori"
          value={filters.category}
          onChange={(val) => setFilters({ ...filters, category: String(val) })}
          options={[
            { label: "Semua Kategori", value: "All" },
            ...categories.map((c) => ({ label: c, value: c })),
          ]}
        />
      </div>
    </div>
  );
}
