import * as XLSX from "xlsx";
import { LaptopData } from "./calculations";

export function parseExcelData(data: ArrayBuffer): LaptopData[] {
  const workbook = XLSX.read(data, { type: "array" });

  // Find the data sheet
  const sheetName =
    workbook.SheetNames.find((n) => n.includes("Data Laptop")) ||
    workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];

  // Convert to JSON with headers
  const jsonData = XLSX.utils.sheet_to_json<Record<string, unknown>>(sheet);

  return jsonData
    .map((row) => {
      const id = Number(row["ID"]) || 0;
      const name = String(row["Nama Laptop"] || "Unknown");
      const category = String(row["Kategori"] || "Unknown");
      const cpu = String(row["Processor (CPU)"] || "Unknown");
      const ram = Number(row["RAM (GB)"]) || 8;
      const storage = Number(row["Storage (GB)"]) || 512;
      const gpu = String(row["GPU"] || "Unknown");
      const price = Number(row["Estimasi Harga (Rp)"]) || 0;
      const categoryWeight = Number(row["Bobot Kategori"]) || 1;

      if (id === 0 || price === 0) return null;

      return {
        id,
        name,
        category,
        cpu,
        ram,
        storage,
        gpu,
        price,
        categoryWeight,
      } satisfies LaptopData;
    })
    .filter((item): item is LaptopData => item !== null);
}
