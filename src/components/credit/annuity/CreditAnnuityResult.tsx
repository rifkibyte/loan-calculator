"use client";

import { formatCurrency } from "@/utils/formatters";

interface CreditAnnuityResultProps {
  loanDetails: {
    loanAmount: number;
    loanTermMonths: number;
    loanTermYears: number;
    annualInterestRate: number;
    monthlyInterestRate: number;
    monthlyPayment: number;
    totalPayment: number;
    totalInterest: number;
  };
}

export default function CreditAnnuityResult({ loanDetails }: CreditAnnuityResultProps) {
  // Helper function to safely format currency
  const safeFormatCurrency = (value: number) => {
    if (isNaN(value) || !isFinite(value)) {
      return "Rp 0";
    }
    return formatCurrency(value);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Data Anda</h2>
      
      <div className="space-y-4 mb-8">
        <div className="flex justify-between py-2 border-b border-gray-200">
          <span className="text-gray-700">Jumlah Pinjaman:</span>
          <span className="font-medium text-gray-900">{safeFormatCurrency(loanDetails.loanAmount)}</span>
        </div>
        
        <div className="flex justify-between py-2 border-b border-gray-200">
          <span className="text-gray-700">Lama Pinjaman:</span>
          <span className="font-medium text-gray-900">
            {loanDetails.loanTermMonths} bulan
            <br />
            <span className="text-sm text-gray-500">({loanDetails.loanTermYears.toFixed(2)} tahun)</span>
          </span>
        </div>
        
        <div className="flex justify-between py-2 border-b border-gray-200">
          <span className="text-gray-700">Bunga per Tahun:</span>
          <span className="font-medium text-gray-900">
            {loanDetails.annualInterestRate}% / tahun
            <br />
            <span className="text-sm text-gray-500">({loanDetails.monthlyInterestRate.toFixed(2)}% / bulan)</span>
          </span>
        </div>
        
        <div className="flex justify-between py-2 border-b border-gray-200">
          <span className="text-gray-700">Perhitungan Bunga:</span>
          <span className="font-medium text-gray-900">Anuitas</span>
        </div>
      </div>

      <h3 className="text-lg font-semibold text-gray-900 mb-4">Angsuran Anda</h3>
      
      <div className="bg-green-50 p-4 rounded-lg mb-6">
        <div className="flex justify-between items-center">
          <span className="text-gray-700 font-medium">Angsuran per Bulan:</span>
          <span className="text-xl font-bold text-green-700">{safeFormatCurrency(loanDetails.monthlyPayment)}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-1">Total Pembayaran</p>
            <p className="text-lg font-bold text-blue-700">{safeFormatCurrency(loanDetails.totalPayment)}</p>
          </div>
        </div>
        
        <div className="bg-orange-50 p-4 rounded-lg">
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-1">Total Bunga</p>
            <p className="text-lg font-bold text-orange-700">{safeFormatCurrency(loanDetails.totalInterest)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
