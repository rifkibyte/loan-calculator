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
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Informasi Pinjaman Anda</h3>
        <div className="space-y-2">
          <div className="grid grid-cols-2 gap-4">
            <span className="text-gray-600">Harga Mobil OTR</span>
            <span className="font-medium">: {formatCurrency(loanDetails.carPrice)}</span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <span className="text-gray-600">Uang Muka (DP)</span>
            <span className="font-medium">
              : {formatCurrency(loanDetails.downPaymentAmount)}<br/>
              <span className="ml-2 text-sm">({loanDetails.downPaymentPercent} %)</span>
            </span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <span className="text-gray-600">Tenor</span>
            <span className="font-medium">
              : {loanDetails.loanTerm} tahun<br/>
              <span className="ml-2 text-sm">({loanDetails.loanTerm * 12} bulan)</span>
            </span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <span className="text-gray-600">Bunga (Flat)</span>
            <span className="font-medium">
              : {loanDetails.interestRate} % / tahun<br/>
              <span className="ml-2 text-sm">({loanDetails.monthlyInterestRate.toFixed(1)} % / bulan)</span>
            </span>
          </div>
        </div>
      </div>

      {/* Plafon Pinjaman Anda */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Plafon Pinjaman Anda</h3>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-600">Harga Mobil OTR</span>
            <span className="font-medium">: {formatCurrency(loanDetails.carPrice)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Uang Muka (DP)</span>
            <span className="font-medium">: {formatCurrency(loanDetails.downPaymentAmount)}</span>
          </div>
          <div className="flex justify-between border-t pt-2">
            <span className="text-gray-600"></span>
            <span className="font-medium">________________ (-)</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600 font-semibold">Plafon Pinjaman Anda</span>
            <span className="font-bold">: {formatCurrency(loanDetails.loanAmount)}</span>
          </div>
        </div>
      </div>

      {/* Angsuran per Bulan */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Angsuran per Bulan</h3>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-600">Angsuran Pokok per Bulan</span>
            <span className="font-medium">: {formatCurrency(loanDetails.monthlyPrincipal)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Angsuran Bunga per Bulan</span>
            <span className="font-medium">: {formatCurrency(loanDetails.monthlyInterest)}</span>
          </div>
          <div className="flex justify-between border-t pt-2">
            <span className="text-gray-600"></span>
            <span className="font-medium">________________ (+)</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600 font-semibold">Total Angsuran per Bulan</span>
            <span className="font-bold">: {formatCurrency(loanDetails.monthlyPayment)}</span>
          </div>
        </div>
      </div>

      {/* Pembayaran Pertama Kali */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Pembayaran Pertama Kali</h3>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-600">Uang Muka (DP)</span>
            <span className="font-medium">: {formatCurrency(loanDetails.downPaymentAmount)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Angsuran Pertama</span>
            <span className="font-medium">: {formatCurrency(loanDetails.monthlyPayment)}</span>
          </div>
          <div className="flex justify-between border-t pt-2">
            <span className="text-gray-600"></span>
            <span className="font-medium">________________ (+)</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600 font-semibold">Total Pembayaran Pertama</span>
            <span className="font-bold">: {formatCurrency(loanDetails.firstPayment)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
