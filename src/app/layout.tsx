import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Best Laptop Selection System — SAW vs TOPSIS",
  description:
    "A comparative recommendation system using the SAW and TOPSIS methods for laptop selection by Informatics students. By Jagarya Vanneska, Dionisius Avendrata Putra, and Erwin Wijaya — Universitas Teknokrat Indonesia.",
  keywords: [
    "Recommendation",
    "Decision Support System",
    "SAW",
    "TOPSIS",
    "Laptop",
    "Informatics",
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
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className="min-h-screen grid-pattern" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
