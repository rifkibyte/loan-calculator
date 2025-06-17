import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <div className="text-2xl font-bold text-blue-600">
            <Link href="/" className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>SimulasiKredit</span>
            </Link>
          </div>
        </div>
        
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link href="/" className="text-gray-700 hover:text-blue-600 font-medium">
                Beranda
              </Link>
            </li>
            <li>
              <Link href="#" className="text-gray-700 hover:text-blue-600 font-medium">
                Simulasi Mobil
              </Link>
            </li>
            <li>
              <Link href="#" className="text-gray-700 hover:text-blue-600 font-medium">
                Simulasi Motor
              </Link>
            </li>
            <li>
              <Link href="#" className="text-gray-700 hover:text-blue-600 font-medium">
                Tentang Kami
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}