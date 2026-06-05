import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SPK Pemilihan Laptop Informatika — SAW vs TOPSIS",
  description:
    "Sistem Pendukung Keputusan Komparasi Metode SAW dan TOPSIS untuk Pemilihan Laptop Mahasiswa Teknik Informatika. Oleh Jagarya Vanneska, Dionisius Avendrata Putra, dan Erwin Wijaya — Universitas Teknokrat Indonesia.",
  keywords: [
    "SPK",
    "Decision Support System",
    "SAW",
    "TOPSIS",
    "Laptop",
    "Informatika",
    "MCDM",
  ],
  authors: [
    { name: "Jagarya Vanneska" },
    { name: "Dionisius Avendrata Putra" },
    { name: "Erwin Wijaya" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="scroll-smooth">
      <body className="min-h-screen grid-pattern">{children}</body>
    </html>
  );
}
