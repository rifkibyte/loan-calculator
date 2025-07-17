"use client";

import { useState } from "react";
// Mengimpor formatters yang relevan
import {
  formatCurrencyDisplay,
  formatDecimal,
  formatPercent,
} from "@/utils/formatters";

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

export default function CreditAnnuityResult({
  loanDetails,
}: CreditAnnuityResultProps) {
  const [activeTab, setActiveTab] = useState("info");

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Navigasi Tab */}
      <div className="flex border-b">
        <button
          className={`flex-1 py-3 px-4 text-center font-medium transition-colors duration-200 ${
            activeTab === "info"
              ? "bg-blue-50 text-blue-600 border-b-2 border-blue-600"
              : "text-gray-600 hover:bg-gray-50"
          }`}
          onClick={() => setActiveTab("info")}
        >
          Informasi Pinjaman
        </button>
        <button
          className={`flex-1 py-3 px-4 text-center font-medium transition-colors duration-200 ${
            activeTab === "payment"
              ? "bg-blue-50 text-blue-600 border-b-2 border-blue-600"
              : "text-gray-600 hover:bg-gray-50"
          }`}
          onClick={() => setActiveTab("payment")}
        >
          Rincian Pembayaran
        </button>
      </div>

      {/* Konten Tab */}
      <div className="p-6">
        {/* Tab 1: Informasi Pinjaman */}
        {activeTab === "info" && (
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Ringkasan Pinjaman Anda
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-600">Jumlah Pinjaman:</p>
                <p className="text-lg font-bold text-gray-900">
                  {formatCurrencyDisplay(loanDetails.loanAmount)}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-600">Lama Pinjaman:</p>
                <p className="text-lg font-bold text-gray-900">
                  {loanDetails.loanTermMonths} bulan
                  <span className="text-sm font-normal text-gray-500 ml-1">
                    ({formatDecimal(loanDetails.loanTermYears, 1)} tahun)
                  </span>
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-600">Suku Bunga:</p>
                <p className="text-lg font-bold text-gray-900">
                  {formatDecimal(loanDetails.annualInterestRate, 2)}% / tahun
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-600">Metode Bunga:</p>
                <p className="text-lg font-bold text-gray-900">Anuitas</p>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-3">
                Detail Suku Bunga
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-900">Bunga per Tahun:</span>
                  <span className="font-medium text-blue-700">
                    {formatPercent(loanDetails.annualInterestRate)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-900">Bunga per Bulan:</span>
                  <span className="font-medium text-blue-700">
                    {formatDecimal(loanDetails.monthlyInterestRate, 3)}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Rincian Pembayaran */}
        {activeTab === "payment" && (
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Rincian Pembayaran Anda
            </h2>

            <div className="bg-green-50 p-6 rounded-lg text-center">
              <h3 className="text-base font-medium text-green-800 mb-2">
                Angsuran per Bulan
              </h3>
              <p className="text-3xl font-bold text-green-700">
                {formatCurrencyDisplay(loanDetails.monthlyPayment)}
              </p>
            </div>

            <div className="bg-indigo-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-3">
                Ringkasan Total Pembayaran
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-900">Total Pokok Pinjaman:</span>
                  <span className="font-medium text-gray-900">
                    {formatCurrencyDisplay(loanDetails.loanAmount)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-900">Total Bunga:</span>
                  <span className="font-medium text-gray-900">
                    {formatCurrencyDisplay(loanDetails.totalInterest)}
                  </span>
                </div>
                <div className="border-t border-indigo-200 my-2 pt-3">
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-900">
                      Total Keseluruhan Pembayaran:
                    </span>
                    <span className="font-bold text-indigo-700 text-lg">
                      {formatCurrencyDisplay(loanDetails.totalPayment)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
