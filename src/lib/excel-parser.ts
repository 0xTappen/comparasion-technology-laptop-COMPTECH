import * as XLSX from "xlsx";
import { LaptopData } from "./calculations";

export function parseExcelData(data: ArrayBuffer): LaptopData[] {
  const workbook = XLSX.read(data, { type: "array" });

  // Find the data sheet by looking for common names, or just take the sheet with the most rows if uncertain
  let sheetName = workbook.SheetNames.find(
    (n) => n.toLowerCase().includes("data") || n.toLowerCase().includes("laptop")
  );
  
  if (!sheetName) {
    // Fallback: use the first sheet
    sheetName = workbook.SheetNames[0];
  }
  const sheet = workbook.Sheets[sheetName];

  // Convert to array first to find the actual header row (ignoring title rows)
  const rawRows = XLSX.utils.sheet_to_json<unknown[]>(sheet, { header: 1 });
  
  let headerRowIndex = 0;
  for (let i = 0; i < rawRows.length; i++) {
    const rowStr = String(rawRows[i]).toLowerCase();
    if (
      (rowStr.includes("nama") || rowStr.includes("laptop") || rowStr.includes("model")) &&
      (rowStr.includes("harga") || rowStr.includes("price") || rowStr.includes("estimasi"))
    ) {
      headerRowIndex = i;
      break;
    }
  }

  // Convert to JSON with headers starting from the detected header row
  const jsonData = XLSX.utils.sheet_to_json<Record<string, unknown>>(sheet, { range: headerRowIndex });

  return jsonData
    .map((row, index) => {
      // Helper to find a value by partial key match (case insensitive)
      const findVal = (keywords: string[]) => {
        const key = Object.keys(row).find((k) =>
          keywords.some((kw) => k.toLowerCase().includes(kw.toLowerCase()))
        );
        return key ? row[key] : undefined;
      };

      const idVal = findVal(["id", "no "]);
      const id = idVal ? Number(idVal) : index + 1;
      
      const name = String(findVal(["nama", "laptop", "model", "merk"]) || "Unknown Laptop");
      const category = String(findVal(["kategori", "category", "tipe"]) || "General");
      const cpu = String(findVal(["processor", "cpu"]) || "Unknown CPU");
      const ram = Number(findVal(["ram", "memory"])) || 8;
      const storage = Number(findVal(["storage", "ssd", "hdd", "rom"])) || 512;
      const gpu = String(findVal(["gpu", "vga", "grafis", "graphic"]) || "Unknown GPU");
      
      // Remove any non-numeric characters for price just in case it's formatted like "Rp 15.000.000"
      const rawPrice = findVal(["harga", "price", "estimasi"]);
      const priceStr = String(rawPrice).replace(/[^0-9]/g, "");
      const price = Number(priceStr) || 0;
      
      const categoryWeight = Number(findVal(["bobot"])) || 1;

      if (price === 0) return null; // Price is strictly required for MCDM

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
