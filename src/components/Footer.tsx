export default function Footer() {
  return (
    <footer className="border-t-4 border-black bg-black text-white py-8 px-4 mt-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="bg-brutal-yellow text-black px-2 py-1 text-sm font-mono font-bold">SPK</span>
              <span className="font-bold">COMPTECH</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Sistem Pendukung Keputusan Komparasi Laptop untuk Mahasiswa Teknik Informatika
              menggunakan metode SAW dan TOPSIS.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-sm mb-3 text-brutal-yellow">Tim</h4>
            <ul className="space-y-1 text-sm text-gray-400">
              <li>Jagarya Vanneska</li>
              <li>Dionisius Avendrata Putra</li>
              <li>Erwin Wijaya</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-sm mb-3 text-brutal-yellow">Institusi</h4>
            <p className="text-sm text-gray-400">Universitas Teknokrat Indonesia</p>
            <p className="text-sm text-gray-400 mt-1">Teknik Informatika</p>
          </div>
        </div>
        <div className="border-t border-gray-700 pt-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} SPK COMPTECH — Academic Research Project
          </p>
          <div className="flex items-center gap-3 text-xs text-gray-500">
            <span>Built with Next.js + Tailwind CSS</span>
            <span className="bg-brutal-green text-black px-2 py-0.5 font-bold text-[10px]">
              NEO-BRUTALISM
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
