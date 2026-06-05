"use client";
import { useCallback, useRef } from "react";
import { Upload, FileSpreadsheet, Database } from "lucide-react";
import { LaptopData } from "@/lib/calculations";
import { parseExcelData } from "@/lib/excel-parser";

interface Props {
  onDataLoaded: (data: LaptopData[]) => void;
  dataCount: number;
  isLoading: boolean;
  setIsLoading: (v: boolean) => void;
}

export default function FileUploader({ onDataLoaded, dataCount, isLoading, setIsLoading }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processFile = useCallback(
    async (buffer: ArrayBuffer) => {
      setIsLoading(true);
      try {
        const data = parseExcelData(buffer);
        onDataLoaded(data);
      } catch (err) {
        console.error("Error parsing Excel:", err);
        alert("Gagal memproses file Excel. Pastikan format file sesuai.");
      } finally {
        setIsLoading(false);
      }
    },
    [onDataLoaded, setIsLoading]
  );

  const handleFileUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        const buffer = ev.target?.result as ArrayBuffer;
        processFile(buffer);
      };
      reader.readAsArrayBuffer(file);
    },
    [processFile]
  );

  const handleLoadDefault = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/dataset");
      if (!res.ok) throw new Error("File not found in /api/dataset");
      const buffer = await res.arrayBuffer();
      processFile(buffer);
    } catch (err) {
      console.error("Error loading default:", err);
      alert("File default tidak ditemukan di folder /dataset.");
      setIsLoading(false);
    }
  }, [processFile, setIsLoading]);

  return (
    <div className="brutal-card bg-white p-6 md:p-8">
      <div className="flex items-center gap-3 mb-6">
        <FileSpreadsheet size={24} />
        <h3 className="font-bold text-xl">Input Dataset</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Upload */}
        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={isLoading}
          className="brutal-hover border-4 border-black bg-brutal-cyan p-6 shadow-[8px_8px_0px_rgba(0,0,0,1)] flex flex-col items-center gap-3 text-center disabled:opacity-50 cursor-pointer"
        >
          <Upload size={32} />
          <span className="font-bold text-lg">Unggah Dokumen Dataset</span>
          <span className="text-sm opacity-70">Pilih berkas format .xlsx dari perangkat Anda</span>
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept=".xlsx,.xls"
          onChange={handleFileUpload}
          className="hidden"
        />

        {/* Load Default */}
        <button
          onClick={handleLoadDefault}
          disabled={isLoading}
          className="brutal-hover border-4 border-black bg-brutal-yellow p-6 shadow-[8px_8px_0px_rgba(0,0,0,1)] flex flex-col items-center gap-3 text-center disabled:opacity-50 cursor-pointer"
        >
          <Database size={32} />
          <span className="font-bold text-lg">Gunakan Dataset Bawaan</span>
          <span className="text-sm opacity-70">Memuat 1.000 data alternatif laptop</span>
        </button>
      </div>

      {/* Status */}
      {isLoading && (
        <div className="mt-4 bg-brutal-yellow border-3 border-black p-3 flex items-center gap-2 font-bold text-sm animate-pulse">
          <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
          Memproses data...
        </div>
      )}
      {dataCount > 0 && !isLoading && (
        <div className="mt-4 bg-brutal-green border-3 border-black p-3 flex items-center gap-2 font-bold text-sm shadow-[4px_4px_0px_rgba(0,0,0,1)]">
          <span className="bg-black text-brutal-green px-2 py-0.5 font-mono text-xs">{dataCount}</span>
          laptop berhasil dimuat dan diproses!
        </div>
      )}
    </div>
  );
}
