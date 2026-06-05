"use client";
import { useState } from "react";
import { Menu, X, Laptop, FlaskConical, Table2, BarChart3, FileText } from "lucide-react";

const NAV_ITEMS = [
  { label: "Beranda", href: "#hero", icon: Laptop },
  { label: "Kriteria", href: "#kriteria", icon: Table2 },
  { label: "Dataset", href: "#dataset", icon: FlaskConical },
  { label: "Hasil", href: "#hasil", icon: BarChart3 },
  { label: "Kesimpulan", href: "#kesimpulan", icon: FileText },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-brutal-yellow border-b-4 border-black">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
        <a href="#hero" className="font-bold text-xl tracking-tight flex items-center gap-2">
          <span className="bg-black text-brutal-yellow px-2 py-1 text-sm font-mono">SPK</span>
          <span className="hidden sm:inline">COMPTECH</span>
        </a>
        <div className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="brutal-hover flex items-center gap-1.5 px-3 py-2 text-sm font-bold border-2 border-transparent hover:border-black hover:bg-white transition-colors"
            >
              <item.icon size={16} />
              {item.label}
            </a>
          ))}
        </div>
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden brutal-hover border-3 border-black bg-white p-2 shadow-[4px_4px_0px_rgba(0,0,0,1)]"
          aria-label="Toggle menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t-4 border-black bg-white">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 px-6 py-4 font-bold border-b-2 border-black hover:bg-brutal-yellow transition-colors"
            >
              <item.icon size={18} />
              {item.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
