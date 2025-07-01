"use client";

import { useState } from "react";
import { formatCurrency } from "@/utils/formatters";
import { jsPDF } from "jspdf";

interface LoanResultProps {
  loanDetails: {
    loanAmount: number;
    loanTerm: number;
    interestRate: number;
    variableRate: number;
    fixedRatePeriod: number;
    applicantType: 'employee' | 'professional' | 'entrepreneur';
    monthlyPayment: number;
    monthlyPrincipal: number;
    monthlyInterest: number;
    totalPayment: number;
    totalInterest: number;
    provisionPercent: number;
    provisionAmount: number;
    adminFee: number;
    firstPayment: number;
  };
}

export default function MultiPurposeLoanResult({ loanDetails }: LoanResultProps) {
  const [activeTab, setActiveTab] = useState("info");

  // Helper function to safely format currency and handle NaN values
  const safeFormatCurrency = (value: number) => {
    if (isNaN(value) || !isFinite(value)) {
      return "Rp 0";
    }
    return formatCurrency(value);
  };

  // Helper function to safely format percentage
  const safeFormatPercent = (value: number) => {
    if (isNaN(value) || !isFinite(value)) {
      return "0";
    }
    return value.toString();
  };

  const getApplicantTypeLabel = (type: string): string => {
    switch (type) {
      case 'employee': return 'Pegawai';
      case 'professional': return 'Profesional';
      case 'entrepreneur': return 'Wiraswasta';
      default: return type;
    }
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();
    
    // Add title
    doc.setFontSize(18);
    doc.text("Simulasi Kredit Multi Guna Bank Mandiri", 105, 15, { align: "center" });
    
    // Add loan details
    doc.setFontSize(12);
    doc.text("Informasi Pinjaman", 14, 30);
    
    const loanInfo = [
      ["Jenis Pemohon", getApplicantTypeLabel(loanDetails.applicantType)],
      ["Jumlah Pinjaman", safeFormatCurrency(loanDetails.loanAmount)],
      ["Tenor", `${loanDetails.loanTerm} tahun (${loanDetails.loanTerm * 12} bulan)`],
      ["Bunga Tetap", `${safeFormatPercent(loanDetails.interestRate)}% (${loanDetails.fixedRatePeriod} tahun pertama)`],
      ["Bunga Mengambang", `${safeFormatPercent(loanDetails.variableRate)}% (setelah tahun ke-${loanDetails.fixedRatePeriod})`],
      ["Angsuran per Bulan (rata-rata)", safeFormatCurrency(loanDetails.monthlyPayment)],
      ["Total Pembayaran", safeFormatCurrency(loanDetails.totalPayment)]
    ];
    
    (doc as any).autoTable({
      startY: 35,
      head: [["Keterangan", "Nilai"]],
      body: loanInfo,
      theme: "grid",
      headStyles: { fillColor: [66, 133, 244] }
    });
    
    doc.save("simulasi-kredit-multi-guna-mandiri.pdf");
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Tab Navigation - Only 2 tabs */}
      <div className="flex border-b">
        <button
          className={`flex-1 py-3 px-4 text-center font-medium ${
            activeTab === "info" ? "bg-blue-50 text-blue-600 border-b-2 border-blue-600" : "text-gray-600"
          }`}
          onClick={() => setActiveTab("info")}
        >
          Informasi Pinjaman
        </button>
        <button
          className={`flex-1 py-3 px-4 text-center font-medium ${
            activeTab === "payment" ? "bg-blue-50 text-blue-600 border-b-2 border-blue-600" : "text-gray-600"
          }`}
          onClick={() => setActiveTab("payment")}
        >
          Rincian Pembayaran & Suku Bunga
        </button>
      </div>
        
      <div className="p-6">
        {activeTab === "info" && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Informasi Kredit Multi Guna Anda</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Jenis Pemohon:</p>
                <p className="text-lg font-bold text-gray-900">{getApplicantTypeLabel(loanDetails.applicantType)}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-600">Jumlah Pinjaman:</p>
                <p className="text-lg font-bold text-gray-900">{safeFormatCurrency(loanDetails.loanAmount)}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-600">Tenor:</p>
                <p className="text-lg font-bold text-gray-900">
                  {loanDetails.loanTerm} tahun
                  <span className="text-sm font-normal text-gray-500 ml-1">
                    ({loanDetails.loanTerm * 12} bulan)
                  </span>
                </p>
              </div>
              
              <div>
                <p className="text-sm text-gray-600">Angsuran per Bulan (rata-rata):</p>
                <p className="text-lg font-bold text-blue-600">{safeFormatCurrency(loanDetails.monthlyPayment)}</p>
              </div>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-3">Rincian Pinjaman</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-900">Plafon Pinjaman:</span>
                  <span className="font-medium text-gray-900">{safeFormatCurrency(loanDetails.loanAmount)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-900">Angsuran Pokok per Bulan (rata-rata):</span>
                  <span className="font-medium text-gray-900">{safeFormatCurrency(loanDetails.monthlyPrincipal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-900">Angsuran Bunga per Bulan (rata-rata):</span>
                  <span className="font-medium text-gray-900">{safeFormatCurrency(loanDetails.monthlyInterest)}</span>
                </div>
                <div className="border-t border-blue-200 my-2 pt-2 flex justify-between">
                  <span className="font-medium text-gray-900">Total Angsuran per Bulan (rata-rata):</span>
                  <span className="font-bold text-blue-700">{safeFormatCurrency(loanDetails.monthlyPayment)}</span>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-3">Biaya Lain</h3>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between">
                    <span className="text-gray-900">Provisi:</span>
                    <span className="font-medium text-gray-900">{safeFormatCurrency(loanDetails.provisionAmount)}</span>
                  </div>
                  <p className="text-xs text-gray-500">({safeFormatPercent(loanDetails.provisionPercent)}% dari plafon)</p>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-900">Administrasi:</span>
                  <span className="font-medium text-gray-900">{safeFormatCurrency(loanDetails.adminFee)}</span>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === "payment" && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Rincian Pembayaran & Suku Bunga</h2>
            
            {/* Payment Information */}
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-3">Angsuran per Bulan (Rata-rata)</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-900">Angsuran Pokok per Bulan:</span>
                  <span className="font-medium text-gray-900">{safeFormatCurrency(loanDetails.monthlyPrincipal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-900">Angsuran Bunga per Bulan:</span>
                  <span className="font-medium text-gray-900">{safeFormatCurrency(loanDetails.monthlyInterest)}</span>
                </div>
                <div className="border-t border-green-200 my-2 pt-2">
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-900">Total Angsuran per Bulan:</span>
                    <span className="font-bold text-green-700">{safeFormatCurrency(loanDetails.monthlyPayment)}</span>
                  </div>
                </div>
              </div>
              <p className="text-xs text-gray-600 mt-2">
                *Angsuran akan berbeda setiap periode karena perubahan suku bunga
              </p>
            </div>
            
            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-3">Pembayaran Pertama Kali</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-900">Angsuran Pertama:</span>
                  <span className="font-medium text-gray-900">{safeFormatCurrency(loanDetails.monthlyPayment)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-900">Provisi:</span>
                  <span className="font-medium text-gray-900">{safeFormatCurrency(loanDetails.provisionAmount)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-900">Administrasi:</span>
                  <span className="font-medium text-gray-900">{safeFormatCurrency(loanDetails.adminFee)}</span>
                </div>
                <div className="border-t border-purple-200 my-2 pt-2">
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-900">Total Pembayaran Pertama:</span>
                    <span className="font-bold text-purple-700">{safeFormatCurrency(loanDetails.firstPayment)}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-indigo-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-3">Total Pembayaran</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-900">Total Pokok:</span>
                  <span className="font-medium text-gray-900">{safeFormatCurrency(loanDetails.loanAmount)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-900">Total Bunga:</span>
                  <span className="font-medium text-gray-900">{safeFormatCurrency(loanDetails.totalInterest)}</span>
                </div>
                <div className="border-t border-indigo-200 my-2 pt-2">
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-900">Total Pembayaran:</span>
                    <span className="font-bold text-indigo-700">{safeFormatCurrency(loanDetails.totalPayment)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Interest Rate Information */}
            <div className="bg-yellow-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-3">Periode Bunga Tetap</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-900">Periode:</span>
                  <span className="font-medium text-gray-900">{loanDetails.fixedRatePeriod} tahun pertama</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-900">Suku Bunga:</span>
                  <span className="font-bold text-yellow-700">{safeFormatPercent(loanDetails.interestRate)}% per tahun</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-900">Suku Bunga per Bulan:</span>
                  <span className="font-medium text-gray-900">{(loanDetails.interestRate / 12).toFixed(2)}% per bulan</span>
                </div>
              </div>
            </div>
            
            <div className="bg-orange-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-3">Periode Bunga Mengambang</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-900">Periode:</span>
                  <span className="font-medium text-gray-900">Setelah tahun ke-{loanDetails.fixedRatePeriod}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-900">Suku Bunga:</span>
                  <span className="font-bold text-orange-700">{safeFormatPercent(loanDetails.variableRate)}% per tahun</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-900">Suku Bunga per Bulan:</span>
                  <span className="font-medium text-gray-900">{(loanDetails.variableRate / 12).toFixed(2)}% per bulan</span>
                </div>
              </div>
              <p className="text-xs text-orange-600 mt-2">
                *Suku bunga dapat berubah sewaktu-waktu sesuai kebijakan bank
              </p>
            </div>

            <div className="bg-red-50 p-4 rounded-lg">
              <h3 className="font-semibold text-red-800 mb-2">⚠️ Penting untuk Diketahui</h3>
              <ul className="text-sm text-red-700 space-y-1">
                <li>• Suku bunga dapat berubah sewaktu-waktu</li>
                <li>• Angsuran bulanan akan berubah setelah periode bunga tetap berakhir</li>
                <li>• Hubungi Call Center Bank Mandiri untuk informasi terkini</li>
                <li>• Simulasi ini hanya untuk referensi, bukan penawaran resmi</li>
              </ul>
            </div>
          </div>
        )}
        
        <div className="mt-6">
          <button
            onClick={handleExportPDF}
            className="flex items-center justify-center w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Export PDF
          </button>
        </div>
      </div>
    </div>
  );
}
