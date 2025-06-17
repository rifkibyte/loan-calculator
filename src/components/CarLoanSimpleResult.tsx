"use client";

import { formatCurrency } from "@/utils/formatters";

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
  return (
    <div className="space-y-6">
      {/* Informasi Pinjaman Anda */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Informasi Pinjaman Anda</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600">Harga Mobil OTR:</p>
            <p className="text-lg font-bold text-gray-900">{formatCurrency(loanDetails.carPrice)}</p>
          </div>
          
          <div>
            <p className="text-sm text-gray-600">Uang Muka (DP):</p>
            <p className="text-lg font-bold text-gray-900">
              {formatCurrency(loanDetails.downPaymentAmount)}
              <span className="text-sm font-normal text-gray-500 ml-1">
                ({loanDetails.downPaymentPercent}%)
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
              {loanDetails.interestRate}% / tahun
              <span className="text-sm font-normal text-gray-500 ml-1">
                ({loanDetails.monthlyInterestRate.toFixed(2)}% / bulan)
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Plafon Pinjaman Anda */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="font-semibold text-gray-900 mb-3">Plafon Pinjaman Anda</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-900">Harga Mobil OTR:</span>
              <span className="font-medium text-gray-900">{formatCurrency(loanDetails.carPrice)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-900">Uang Muka (DP):</span>
              <span className="font-medium text-gray-900">- {formatCurrency(loanDetails.downPaymentAmount)}</span>
            </div>
            <div className="border-t border-blue-200 my-2 pt-2 flex justify-between">
              <span className="font-medium text-gray-900">Plafon Pinjaman Anda:</span>
              <span className="font-bold text-blue-700">{formatCurrency(loanDetails.loanAmount)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Angsuran per Bulan */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="bg-green-50 p-4 rounded-lg">
          <h3 className="font-semibold text-gray-900 mb-3">Angsuran per Bulan</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-900">Angsuran Pokok per Bulan:</span>
              <span className="font-medium text-gray-900">{formatCurrency(loanDetails.monthlyPrincipal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-900">Angsuran Bunga per Bulan:</span>
              <span className="font-medium text-gray-900">{formatCurrency(loanDetails.monthlyInterest)}</span>
            </div>
            <div className="border-t border-green-200 my-2 pt-2">
              <div className="flex justify-between">
                <span className="font-medium text-gray-900">Total Angsuran per Bulan:</span>
                <span className="font-bold text-green-700">{formatCurrency(loanDetails.monthlyPayment)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pembayaran Pertama Kali */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="bg-purple-50 p-4 rounded-lg">
          <h3 className="font-semibold text-gray-900 mb-3">Pembayaran Pertama Kali</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-900">Uang Muka (DP):</span>
              <span className="font-medium text-gray-900">{formatCurrency(loanDetails.downPaymentAmount)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-900">Angsuran Pertama:</span>
              <span className="font-medium text-gray-900">{formatCurrency(loanDetails.monthlyPayment)}</span>
            </div>
            <div className="border-t border-purple-200 my-2 pt-2">
              <div className="flex justify-between">
                <span className="font-medium text-gray-900">Total Pembayaran Pertama:</span>
                <span className="font-bold text-purple-700">{formatCurrency(loanDetails.firstPayment)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Total Pembayaran */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="bg-indigo-50 p-4 rounded-lg">
          <h3 className="font-semibold text-gray-900 mb-3">Total Pembayaran</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-900">Total Pokok:</span>
              <span className="font-medium text-gray-900">{formatCurrency(loanDetails.loanAmount)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-900">Total Bunga:</span>
              <span className="font-medium text-gray-900">{formatCurrency(loanDetails.totalInterest)}</span>
            </div>
            <div className="border-t border-indigo-200 my-2 pt-2">
              <div className="flex justify-between">
                <span className="font-medium text-gray-900">Total Pembayaran:</span>
                <span className="font-bold text-indigo-700">{formatCurrency(loanDetails.totalPayment)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
