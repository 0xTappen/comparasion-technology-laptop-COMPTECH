"use client";

import { useState, useMemo } from "react";
import { LaptopData, combineResults, RankedLaptop } from "@/lib/calculations";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import KriteriaSection from "@/components/KriteriaSection";
import FileUploader from "@/components/FileUploader";
import DatasetFilter, { FilterOptions } from "@/components/DatasetFilter";
import DatasetTable from "@/components/DatasetTable";
import StatsCards from "@/components/StatsCards";
import ResultsTable from "@/components/ResultsTable";
import RankChart from "@/components/RankChart";
import KesimpulanSection from "@/components/KesimpulanSection";
import Footer from "@/components/Footer";
import { FlaskConical } from "lucide-react";

export default function Home() {
  const [laptopData, setLaptopData] = useState<LaptopData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    maxPrice: 0,
    minRam: 0,
    minStorage: 0,
    category: "All",
  });

  const uniqueCategories = useMemo(() => {
    const cats = new Set(laptopData.map(l => l.category));
    return Array.from(cats).sort();
  }, [laptopData]);

  const filteredLaptopData = useMemo(() => {
    return laptopData.filter((l) => {
      if (filters.maxPrice > 0 && l.price > filters.maxPrice) return false;
      if (filters.minRam > 0 && l.ram < filters.minRam) return false;
      if (filters.minStorage > 0 && l.storage < filters.minStorage) return false;
      if (filters.category !== "All" && l.category !== filters.category) return false;
      return true;
    });
  }, [laptopData, filters]);

  const results: RankedLaptop[] = useMemo(() => {
    if (filteredLaptopData.length === 0) return [];
    return combineResults(filteredLaptopData);
  }, [filteredLaptopData]);

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <HeroSection />

        {/* Marquee Divider */}
        <div className="bg-black text-white border-y-4 border-black overflow-hidden py-2">
          <div className="animate-marquee whitespace-nowrap flex gap-8 text-sm font-mono font-bold">
            {Array.from({ length: 4 }).map((_, i) => (
              <span key={i} className="flex gap-8">
                <span className="text-brutal-yellow">★ SAW METHOD</span>
                <span>•</span>
                <span className="text-brutal-pink">★ TOPSIS METHOD</span>
                <span>•</span>
                <span className="text-brutal-cyan">★ 1000 LAPTOP DATASET</span>
                <span>•</span>
                <span className="text-brutal-green">★ MULTI-CRITERIA DECISION</span>
                <span>•</span>
              </span>
            ))}
          </div>
        </div>

        <KriteriaSection />

        {/* Dataset Section */}
        <section id="dataset" className="py-16 px-4 bg-brutal-white">
          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <div className="flex items-center gap-3 mb-2">
              <FlaskConical size={28} />
              <span className="text-xs font-mono uppercase tracking-widest bg-black text-white px-3 py-1">
                Section 02
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Dataset &amp; Kalkulasi
            </h2>
            <p className="text-lg mb-8 max-w-2xl text-gray-700">
              Upload file Excel atau gunakan dataset default untuk menjalankan
              perhitungan SAW dan TOPSIS secara dinamis pada seluruh data.
            </p>

            <FileUploader
              onDataLoaded={setLaptopData}
              dataCount={laptopData.length}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
            />

            {laptopData.length > 0 && (
              <>
                <DatasetFilter 
                  filters={filters} 
                  setFilters={setFilters} 
                  categories={uniqueCategories} 
                />
                <DatasetTable data={filteredLaptopData} />
              </>
            )}
          </div>
        </section>

        {/* Results Section */}
        {results.length > 0 && (
          <div className="max-w-7xl mx-auto px-4">
            <StatsCards results={results} />
            <RankChart results={results} />
          </div>
        )}

        {results.length > 0 && <ResultsTable results={results} />}

        <KesimpulanSection />
      </main>
      <Footer />
    </>
  );
}
