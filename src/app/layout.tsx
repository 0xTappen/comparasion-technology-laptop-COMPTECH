import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sistem Pemilihan Laptop Terbaik — SAW vs TOPSIS",
  description:
    "Sistem Rekomendasi Komparasi Metode SAW dan TOPSIS untuk Pemilihan Laptop Mahasiswa Informatika. Oleh Jagarya Vanneska, Dionisius Avendrata Putra, dan Erwin Wijaya — Universitas Teknokrat Indonesia.",
  keywords: [
    "Rekomendasi",
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
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="scroll-smooth" suppressHydrationWarning>
      <body className="min-h-screen grid-pattern" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
