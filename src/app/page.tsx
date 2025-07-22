"use client";

import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

// Calculator card component for displaying different loan calculators
interface CalculatorCardProps {
  title: string;
  description: string;
  icon: string;
  href: string;
  features: string[];
  isPopular?: boolean;
}

function CalculatorCard({ title, description, icon, href, features, isPopular }: CalculatorCardProps) {
  return (
    <div className={`relative bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6 ${isPopular ? 'ring-2 ring-blue-500' : ''}`}>
      {isPopular && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
            Paling Populer
          </span>
        </div>
      )}
      
      <div className="text-center mb-4">
        <div className="text-4xl mb-3">{icon}</div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 text-sm">{description}</p>
      </div>
      
      <ul className="space-y-2 mb-6">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center text-sm text-gray-600">
            <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            {feature}
          </li>
        ))}
      </ul>
      
      <Link 
        href={href}
        className="block w-full bg-blue-600 text-white text-center py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200 font-medium"
      >
        Mulai Simulasi
      </Link>
    </div>
  );
}

// Hero section component
function HeroSection() {
  return (
    <div className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-16">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Kalkulator Kredit & Pinjaman Terlengkap
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-blue-100">
          Simulasi berbagai jenis kredit dengan perhitungan akurat dan detail
        </p>
        <div className="flex flex-wrap justify-center gap-4 text-sm md:text-base">
          <div className="flex items-center">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Perhitungan Akurat
          </div>
          <div className="flex items-center">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Gratis Selamanya
          </div>
          <div className="flex items-center">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Export PDF
          </div>
        </div>
      </div>
    </div>
  );
}

// Statistics section component
function StatsSection() {
  const stats = [
    { number: "10+", label: "Jenis Kalkulator" },
    { number: "50K+", label: "Pengguna Aktif" },
    { number: "1M+", label: "Simulasi Dibuat" },
    { number: "99.9%", label: "Akurasi Perhitungan" }
  ];

  return (
    <div className="bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">{stat.number}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  // Calculator data configuration
  const calculators = [
    {
      title: "Kredit Mobil Lengkap",
      description: "Simulasi kredit mobil dengan perhitungan lengkap termasuk asuransi, provisi, dan biaya lainnya",
      icon: "🚗",
      href: "/car-loan-complete",
      features: [
        "Perhitungan DP dan plafon",
        "Asuransi & provisi",
        "Biaya administrasi",
        "Jadwal amortisasi",
        "Export ke PDF"
      ],
      isPopular: true
    },
    {
      title: "Kredit Mobil Sederhana",
      description: "Simulasi kredit mobil berdasarkan harga mobil dengan perhitungan dasar",
      icon: "🚙",
      href: "/car-loan-simple",
      features: [
        "Input harga mobil",
        "Perhitungan DP",
        "Angsuran bulanan",
        "Total pembayaran"
      ]
    },
    {
      title: "Kredit Berdasarkan Budget",
      description: "Cari tahu mobil apa yang bisa dibeli dengan budget angsuran bulanan Anda",
      icon: "💰",
      href: "/car-loan-budget",
      features: [
        "Input budget bulanan",
        "Rekomendasi harga mobil",
        "Pilihan tenor",
        "Perbandingan DP"
      ]
    },
    {
      title: "KPR (Kredit Rumah)",
      description: "Simulasi Kredit Pemilikan Rumah dengan berbagai skema bunga",
      icon: "🏠",
      href: "/mortgage-calculator",
      features: [
        "Bunga tetap & mengambang",
        "Perhitungan KPR subsidi",
        "Biaya notaris & BPHTB",
        "Simulasi pelunasan"
      ]
    },
    {
      title: "KTA (Kredit Tanpa Agunan)",
      description: "Simulasi pinjaman tanpa jaminan untuk berbagai kebutuhan",
      icon: "💳",
      href: "/personal-loan",
      features: [
        "Tanpa jaminan",
        "Proses cepat",
        "Bunga kompetitif",
        "Tenor fleksibel"
      ]
    },
    {
      title: "Kredit Anuitas",
      description: "Kalkulator kredit dengan sistem pembayaran anuitas (angsuran tetap)",
      icon: "📊",
      href: "/annuity-calculator",
      features: [
        "Angsuran tetap",
        "Bunga efektif",
        "Jadwal pembayaran",
        "Analisis cash flow"
      ]
    },
    {
      title: "Kartu Kredit",
      description: "Simulasi pembayaran kartu kredit dan perhitungan bunga",
      icon: "💳",
      href: "/credit-card-calculator",
      features: [
        "Pembayaran minimum",
        "Simulasi pelunasan",
        "Perhitungan bunga",
        "Strategi bayar"
      ]
    },
    {
      title: "Kredit Motor",
      description: "Simulasi kredit sepeda motor dengan perhitungan lengkap",
      icon: "🏍️",
      href: "/motorcycle-loan",
      features: [
        "DP fleksibel",
        "Asuransi motor",
        "Tenor 1-4 tahun",
        "Biaya administrasi"
      ]
    },
    {
      title: "Kredit Multiguna",
      description: "Simulasi kredit serbaguna dengan agunan sertifikat rumah",
      icon: "🎯",
      href: "/multipurpose-loan",
      features: [
        "Agunan sertifikat",
        "Limit tinggi",
        "Bunga rendah",
        "Tenor panjang"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <HeroSection />
      
      {/* Stats Section */}
      <StatsSection />
      
      {/* Main Content */}
      <div className="container mx-auto py-16 px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Pilih Jenis Kalkulator Kredit
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Dapatkan simulasi kredit yang akurat dengan berbagai pilihan kalkulator 
            sesuai kebutuhan finansial Anda
          </p>
        </div>
        
        {/* Calculator Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {calculators.map((calculator, index) => (
            <CalculatorCard
              key={index}
              title={calculator.title}
              description={calculator.description}
              icon={calculator.icon}
              href={calculator.href}
              features={calculator.features}
              isPopular={calculator.isPopular}
            />
          ))}
        </div>
        
        {/* Additional Info Section */}
        <div className="mt-16 bg-blue-50 rounded-lg p-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Mengapa Memilih Kalkulator Kami?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
              <div className="text-center">
                <div className="text-3xl mb-3">🎯</div>
                <h4 className="font-semibold text-gray-900 mb-2">Akurat & Terpercaya</h4>
                <p className="text-gray-600 text-sm">
                  Perhitungan menggunakan formula standar perbankan dengan tingkat akurasi tinggi
                </p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-3">⚡</div>
                <h4 className="font-semibold text-gray-900 mb-2">Cepat & Mudah</h4>
                <p className="text-gray-600 text-sm">
                  Interface yang user-friendly dan hasil simulasi yang instan
                </p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-3">📱</div>
                <h4 className="font-semibold text-gray-900 mb-2">Responsive Design</h4>
                <p className="text-gray-600 text-sm">
                  Dapat diakses dari desktop, tablet, maupun smartphone
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
