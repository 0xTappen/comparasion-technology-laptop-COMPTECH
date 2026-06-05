// CPU performance benchmark scores (relative scale 1-100)
const CPU_SCORES: Record<string, number> = {
  "Intel Core i3-N305": 22,
  "AMD Ryzen 3 7320U": 24,
  "AMD Ryzen 5 7520U": 32,
  "Intel Core i3-1215U": 26,
  "Intel Core i5-1035G1": 30,
  "AMD Ryzen 5 7530U": 38,
  "AMD Ryzen 3 7330U": 25,
  "Intel Core i5-1135G7": 35,
  "Intel Core i5-1335U": 40,
  "Intel Core i5-12450H": 50,
  "Intel Core i5-1340P": 45,
  "Intel Core i5-13420H": 52,
  "AMD Ryzen 5 5600H": 48,
  "AMD Ryzen 5 7640H": 55,
  "AMD Ryzen 5 7640HS": 54,
  "AMD Ryzen 5 7535HS": 46,
  "AMD Ryzen 7 7730U": 50,
  "Intel Core i7-1355U": 47,
  "Apple M1 (8-Core)": 52,
  "Intel Core Ultra 5 125H": 60,
  "Intel Core Ultra 7 155H": 70,
  "Intel Core Ultra 7 165H": 72,
  "Intel Core Ultra 9 185H": 85,
  "Intel Core i7-14700HX": 80,
  "Intel Core i9-14900HX": 95,
  "AMD Ryzen 7 8845HS": 75,
  "AMD Ryzen 9 7940HS": 82,
  "AMD Ryzen 9 8945HS": 88,
  "AMD Ryzen 9 AI HX 370": 92,
  "AMD Ryzen AI 9 HX 375": 90,
  "Apple M3 Pro": 78,
};

// GPU performance benchmark scores (relative scale 1-100)
const GPU_SCORES: Record<string, number> = {
  "Intel UHD Graphics": 8,
  "AMD Radeon 610M": 10,
  "AMD Radeon Graphics": 12,
  "Intel Iris Xe": 18,
  "Integrated Graphics": 6,
  "Intel Arc Graphics": 25,
  "7-Core GPU": 30,
  "14-Core GPU": 42,
  "AMD Radeon 760M": 22,
  "AMD Radeon 780M": 28,
  "AMD Radeon 890M": 35,
  "NVIDIA RTX 2050": 40,
  "NVIDIA RTX 3050": 50,
  "NVIDIA RTX 4050": 62,
  "NVIDIA RTX 4060": 75,
  "NVIDIA RTX 4070": 85,
  "NVIDIA RTX 4080": 95,
};

export interface LaptopData {
  id: number;
  name: string;
  category: string;
  cpu: string;
  ram: number;
  storage: number;
  gpu: string;
  price: number;
  categoryWeight: number;
}

export interface CriteriaWeight {
  name: string;
  code: string;
  weight: number;
  type: "cost" | "benefit";
}

export const CRITERIA: CriteriaWeight[] = [
  { name: "Harga Perangkat", code: "C1", weight: 0.20, type: "cost" },
  { name: "Performa Prosesor / CPU", code: "C2", weight: 0.25, type: "benefit" },
  { name: "Kapasitas Memori / RAM", code: "C3", weight: 0.25, type: "benefit" },
  { name: "Arsitektur & Kapasitas Storage / SSD", code: "C4", weight: 0.15, type: "benefit" },
  { name: "Kartu Grafis Dedicated / GPU", code: "C5", weight: 0.15, type: "benefit" },
];

// Convert a laptop row to numeric criteria values
function toNumericValues(laptop: LaptopData): number[] {
  const parsedCpu = parseFloat(laptop.cpu);
  const cpuScore = !isNaN(parsedCpu) ? parsedCpu : (CPU_SCORES[laptop.cpu] ?? 20);
  
  const parsedGpu = parseFloat(laptop.gpu);
  const gpuScore = !isNaN(parsedGpu) ? parsedGpu : (GPU_SCORES[laptop.gpu] ?? 10);
  
  return [laptop.price, cpuScore, laptop.ram, laptop.storage, gpuScore];
}

export interface RankedLaptop extends LaptopData {
  sawScore: number;
  sawRank: number;
  topsisScore: number;
  topsisRank: number;
  delta: number;
  sawNormalized: number[];
  topsisNormalized: number[];
}

// ============================================================
// SAW (Simple Additive Weighting)
// ============================================================
export function calculateSAW(laptops: LaptopData[]): RankedLaptop[] {
  const matrix = laptops.map(toNumericValues);
  const numCriteria = CRITERIA.length;

  // Find min and max for each criterion
  const mins = Array(numCriteria).fill(Infinity);
  const maxs = Array(numCriteria).fill(-Infinity);
  for (const row of matrix) {
    for (let j = 0; j < numCriteria; j++) {
      if (row[j] < mins[j]) mins[j] = row[j];
      if (row[j] > maxs[j]) maxs[j] = row[j];
    }
  }

  // Normalize
  const normalized = matrix.map((row) =>
    row.map((val, j) => {
      if (CRITERIA[j].type === "cost") {
        return maxs[j] === 0 ? 0 : mins[j] / val;
      } else {
        return maxs[j] === 0 ? 0 : val / maxs[j];
      }
    })
  );

  // Calculate weighted scores
  const scores = normalized.map((row) =>
    row.reduce((sum, val, j) => sum + val * CRITERIA[j].weight, 0)
  );

  // Create ranked result
  const result: RankedLaptop[] = laptops.map((laptop, i) => ({
    ...laptop,
    sawScore: scores[i],
    sawRank: 0,
    topsisScore: 0,
    topsisRank: 0,
    delta: 0,
    sawNormalized: normalized[i],
    topsisNormalized: [],
  }));

  // Sort by score descending and assign ranks
  result.sort((a, b) => b.sawScore - a.sawScore);
  result.forEach((item, i) => (item.sawRank = i + 1));

  return result;
}

// ============================================================
// TOPSIS (Technique for Order Preference by Similarity to Ideal Solution)
// ============================================================
export function calculateTOPSIS(laptops: LaptopData[]): RankedLaptop[] {
  const matrix = laptops.map(toNumericValues);
  const numCriteria = CRITERIA.length;
  const n = matrix.length;

  // Step 1: Normalize using vector normalization (Euclidean norm)
  const colSumsOfSquares = Array(numCriteria).fill(0);
  for (const row of matrix) {
    for (let j = 0; j < numCriteria; j++) {
      colSumsOfSquares[j] += row[j] * row[j];
    }
  }
  const colNorms = colSumsOfSquares.map(Math.sqrt);

  const normalized = matrix.map((row) =>
    row.map((val, j) => (colNorms[j] === 0 ? 0 : val / colNorms[j]))
  );

  // Step 2: Weighted normalized decision matrix
  const weighted = normalized.map((row) =>
    row.map((val, j) => val * CRITERIA[j].weight)
  );

  // Step 3: Determine positive ideal (A+) and negative ideal (A-) solutions
  const idealPositive = Array(numCriteria).fill(0);
  const idealNegative = Array(numCriteria).fill(0);

  for (let j = 0; j < numCriteria; j++) {
    const colValues = weighted.map((row) => row[j]);
    if (CRITERIA[j].type === "benefit") {
      idealPositive[j] = Math.max(...colValues);
      idealNegative[j] = Math.min(...colValues);
    } else {
      idealPositive[j] = Math.min(...colValues);
      idealNegative[j] = Math.max(...colValues);
    }
  }

  // Step 4: Calculate Euclidean distance from ideal positive and negative
  const distPositive = weighted.map((row) =>
    Math.sqrt(
      row.reduce((sum, val, j) => sum + Math.pow(val - idealPositive[j], 2), 0)
    )
  );
  const distNegative = weighted.map((row) =>
    Math.sqrt(
      row.reduce((sum, val, j) => sum + Math.pow(val - idealNegative[j], 2), 0)
    )
  );

  // Step 5: Calculate relative closeness to ideal solution
  const scores = distPositive.map((dp, i) => {
    const dn = distNegative[i];
    return dp + dn === 0 ? 0 : dn / (dp + dn);
  });

  // Create ranked result
  const result: RankedLaptop[] = laptops.map((laptop, i) => ({
    ...laptop,
    sawScore: 0,
    sawRank: 0,
    topsisScore: scores[i],
    topsisRank: 0,
    delta: 0,
    sawNormalized: [],
    topsisNormalized: normalized[i],
  }));

  // Sort by score descending and assign ranks
  result.sort((a, b) => b.topsisScore - a.topsisScore);
  result.forEach((item, i) => (item.topsisRank = i + 1));

  return result;
}

// Combine SAW and TOPSIS results
export function combineResults(laptops: LaptopData[]): RankedLaptop[] {
  const sawResults = calculateSAW(laptops);
  const topsisResults = calculateTOPSIS(laptops);

  // Build maps for lookup
  const sawMap = new Map(sawResults.map((r) => [r.id, r]));
  const topsisMap = new Map(topsisResults.map((r) => [r.id, r]));

  return laptops.map((laptop) => {
    const saw = sawMap.get(laptop.id)!;
    const topsis = topsisMap.get(laptop.id)!;
    return {
      ...laptop,
      sawScore: saw.sawScore,
      sawRank: saw.sawRank,
      topsisScore: topsis.topsisScore,
      topsisRank: topsis.topsisRank,
      delta: Math.abs(saw.sawRank - topsis.topsisRank),
      sawNormalized: saw.sawNormalized,
      topsisNormalized: topsis.topsisNormalized,
    };
  });
}
