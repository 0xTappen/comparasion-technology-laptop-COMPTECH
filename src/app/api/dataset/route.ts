import { NextResponse } from "next/server";
import { readFile } from "fs/promises";
import path from "path";

export async function GET() {
  try {
    const filePath = path.join(
      process.cwd(),
      "dataset",
      "Dataset_100_Laptop_SPK_Informatika.xlsx"
    );
    const buffer = await readFile(filePath);

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition":
          'attachment; filename="Dataset_100_Laptop_SPK_Informatika.xlsx"',
      },
    });
  } catch (error) {
    console.error("Error reading dataset file:", error);
    return NextResponse.json(
      { error: "Failed to load dataset" },
      { status: 500 }
    );
  }
}
