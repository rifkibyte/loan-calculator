"use client";

import { useState } from "react";
import { formatCurrency } from "@/utils/formatters";
import { jsPDF } from "jspdf";

interface SimpleLoanResultProps {
  loanDetails: {
    carPrice: number;
    downPaymentPercent: number;
    downPaymentAmount: number;
    loanTerm: number;
    interestRate: number;
    monthlyInterestRate: number;
    loanAmount: number;
    monthlyPayment: number;
    monthlyPrincipal: number;
    monthlyInterest: number;
    totalPayment: number;
    totalInterest: number;
    firstPayment: number;
  };
}

export default function CarLoanSimpleResult({ loanDetails }: SimpleLoanResultProps) {
  const [activeTab, setActiveTab] = useState("info");

  // Helper functions to safely format values
  const safeFormatCurrency = (value: number) => {
    if (isNaN(value) || !isFinite(value)) return "Rp 0";
    return formatCurrency(value);
  };

  const safeFormatPercent = (value: number) => {
    if (isNaN(value) || !isFinite(value)) return "0";
    return value.toString();
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();
    
    doc.setFontSize(18);
    doc.text("Simulasi Kredit Mobil", 105, 15, { align: "center" });
    
    doc.setFontSize(12);
    doc.text("Informasi Pinjaman", 14, 30);
    
    const loanInfo = [
      ["Harga Mobil OTR", safeFormatCurrency(loanDetails.carPrice)],
      ["Uang Muka (DP)", `${safeFormatCurrency(loanDetails.downPaymentAmount)} (${safeFormatPercent(loanDetails.downPaymentPercent)}%)`],
      ["Tenor", `${loanDetails.loanTerm} tahun (${loanDetails.loanTerm * 12} bulan)`],
      ["Bunga (Flat)", `${safeFormatPercent(loanDetails.interestRate)}% / tahun (${loanDetails.monthlyInterestRate.toFixed(2)}% / bulan)`],
      ["Plafon Pinjaman", safeFormatCurrency(loanDetails.loanAmount)],
      ["Angsuran per Bulan", safeFormatCurrency(loanDetails.monthlyPayment)],
      ["Total Pembayaran", safeFormatCurrency(loanDetails.totalPayment)]
    ];
    
    (doc as any).autoTable({
      startY: 35,
      head: [["Keterangan", "Nilai"]],
      body: loanInfo,
      theme: "grid",
      headStyles: { fillColor: [66, 133, 244] }
    });
    
    doc.save("simulasi-kredit-mobil.pdf");
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Tab Navigation */}
      <div className="flex border-b">
        <button
          className={`flex-1 py-3 px-4 text-center font-medium ${
            activeTab === "info" 
              ? "bg-blue-50 text-blue-600 border-b-2 border-blue-600" 
              : "text-gray-600 hover:text-gray-900"
          }`}
          onClick={() => setActiveTab("info")}
        >
          Informasi Pinjaman
        </button>
        <button
          className={`flex-1 py-3 px-4 text-center font-medium ${
            activeTab === "payment" 
              ? "bg-blue-50 text-blue-600 border-b-2 border-blue-600" 
              : "text-gray-600 hover:text-gray-900"
          }`}
          onClick={() => setActiveTab("payment")}
        >
          Pembayaran
        </button>
      </div>
      
      {/* Tab Content */}
      <div className="p-6">
        {activeTab === "info" && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Informasi Pinjaman Anda</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Harga Mobil OTR:</p>
                <p className="text-lg font-bold text-gray-900">{safeFormatCurrency(loanDetails.carPrice)}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-600">Uang Muka (DP):</p>
                <p className="text-lg font-bold text-gray-900">
                  {safeFormatCurrency(loanDetails.downPaymentAmount)}
                  <span className="text-sm font-normal text-gray-500 ml-1">
                    ({safeFormatPercent(loanDetails.downPaymentPercent)}%)
                  </span>
                </p>
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
                <p className="text-sm text-gray-600">Bunga (Flat):</p>
                <p className="text-lg font-bold text-gray-900">
                  {safeFormatPercent(loanDetails.interestRate)}% / tahun
                  <span className="text-sm font-normal text-gray-500 ml-1">
                    ({loanDetails.monthlyInterestRate.toFixed(2)}% / bulan)
                  </span>
                </p>
              </div>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-3">Plafon Pinjaman Anda</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-900">Harga Mobil OTR:</span>
                  <span className="font-medium text-gray-900">{safeFormatCurrency(loanDetails.carPrice)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-900">Uang Muka (DP):</span>
                  <span className="font-medium text-gray-900">- {safeFormatCurrency(loanDetails.downPaymentAmount)}</span>
                </div>
                <div className="border-t border-blue-200 my-2 pt-2 flex justify-between">
                  <span className="font-medium text-gray-900">Plafon Pinjaman Anda:</span>
                  <span className="font-bold text-blue-700">{safeFormatCurrency(loanDetails.loanAmount)}</span>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === "payment" && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Informasi Pembayaran</h2>
            
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-3">Angsuran per Bulan</h3>
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
            </div>
            
            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-3">Pembayaran Pertama Kali</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-900">Uang Muka (DP):</span>
                  <span className="font-medium text-gray-900">{safeFormatCurrency(loanDetails.downPaymentAmount)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-900">Angsuran Pertama:</span>
                  <span className="font-medium text-gray-900">{safeFormatCurrency(loanDetails.monthlyPayment)}</span>
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
          </div>
        )}
        
        {/* Export PDF Button */}
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
