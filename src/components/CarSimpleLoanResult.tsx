// File: components/CarSimpleLoanResult.tsx
"use client";

import { useState } from "react";
import { CarSimpleLoanResult } from "@/utils/carSimpleLoanCalculator";

interface CarSimpleLoanResultProps {
  loanDetails: CarSimpleLoanResult;
}

export default function CarSimpleLoanResult({ loanDetails }: CarSimpleLoanResultProps) {
  const [activeTab, setActiveTab] = useState("info");
  const [showAllSchedule, setShowAllSchedule] = useState(false);

  const formatCurrency = (amount: number): string => {
    if (isNaN(amount) || !isFinite(amount)) {
      return "Rp 0";
    }
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatNumber = (num: number): string => {
    if (isNaN(num) || !isFinite(num)) {
      return "0";
    }
    return num.toString();
  };

  // Pastikan amortizationSchedule ada dan merupakan array
  const schedule = loanDetails?.amortizationSchedule || [];
  const displayedSchedule = showAllSchedule 
    ? schedule 
    : schedule.slice(0, 13); // Show first 12 months + initial row

  // Guard clause untuk memastikan data lengkap
  if (!loanDetails) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <p className="text-gray-500">Data tidak tersedia</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Tab Navigation */}
      <div className="flex border-b">
        <button
          className={`flex-1 py-3 px-4 text-center font-medium transition-colors ${
            activeTab === "info" 
              ? "bg-blue-50 text-blue-600 border-b-2 border-blue-600" 
              : "text-gray-600 hover:text-gray-800"
          }`}
          onClick={() => setActiveTab("info")}
        >
          Informasi Pinjaman
        </button>
        <button
          className={`flex-1 py-3 px-4 text-center font-medium transition-colors ${
            activeTab === "schedule" 
              ? "bg-blue-50 text-blue-600 border-b-2 border-blue-600" 
              : "text-gray-600 hover:text-gray-800"
          }`}
          onClick={() => setActiveTab("schedule")}
        >
          Tabel Angsuran
        </button>
      </div>

      <div className="p-6">
        {activeTab === "info" && (
          <div className="space-y-6">
            {/* Informasi Pinjaman Anda */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Informasi Pinjaman Anda</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex justify-between py-2">
                  <span className="text-gray-700">Harga Mobil OTR</span>
                  <span className="text-gray-700">:</span>
                  <span className="font-medium text-gray-900">{formatCurrency(loanDetails.carPrice || 0)}</span>
                </div>
                
                <div className="flex justify-between py-2">
                  <span className="text-gray-700">Uang Muka (DP)</span>
                  <span className="text-gray-700">:</span>
                  <div className="text-right">
                    <div className="font-medium text-gray-900">{formatCurrency(loanDetails.downPaymentAmount || 0)}</div>
                    <div className="text-sm text-gray-500">({formatNumber(loanDetails.downPaymentPercent || 0)} %)</div>
                  </div>
                </div>
                
                <div className="flex justify-between py-2">
                  <span className="text-gray-700">Tenor</span>
                  <span className="text-gray-700">:</span>
                  <div className="text-right">
                    <div className="font-medium text-gray-900">{loanDetails.loanTermYears || 0} tahun</div>
                    <div className="text-sm text-gray-500">({loanDetails.loanTermMonths || 0} bulan)</div>
                  </div>
                </div>
                
                <div className="flex justify-between py-2">
                  <span className="text-gray-700">Bunga (Flat)</span>
                  <span className="text-gray-700">:</span>
                  <div className="text-right">
                    <div className="font-medium text-gray-900">{formatNumber(loanDetails.annualInterestRate || 0)} % / tahun</div>
                    <div className="text-sm text-gray-500">({((loanDetails.monthlyInterestRate || 0)).toFixed(2)} % / bulan)</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Plafon Pinjaman Anda */}
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-3">Plafon Pinjaman Anda</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-700">Harga Mobil OTR</span>
                  <span className="text-gray-700">:</span>
                  <span className="font-medium text-gray-900">{formatCurrency(loanDetails.carPrice || 0)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Uang Muka (DP)</span>
                  <span className="text-gray-700">:</span>
                  <span className="font-medium text-gray-900">{formatCurrency(loanDetails.downPaymentAmount || 0)}</span>
                </div>
                <div className="border-t border-gray-300 my-2"></div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-900">Plafon Pinjaman Anda</span>
                  <span className="text-gray-700">:</span>
                  <span className="font-bold text-blue-700">{formatCurrency(loanDetails.loanAmount || 0)}</span>
                </div>
              </div>
            </div>

            {/* Angsuran per Bulan */}
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-3">Angsuran per Bulan</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-700">Angsuran Pokok per Bulan</span>
                  <span className="text-gray-700">:</span>
                  <span className="font-medium text-gray-900">{formatCurrency(loanDetails.monthlyPrincipal || 0)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Angsuran Bunga per Bulan</span>
                  <span className="text-gray-700">:</span>
                  <span className="font-medium text-gray-900">{formatCurrency(loanDetails.monthlyInterest || 0)}</span>
                </div>
                <div className="border-t border-gray-300 my-2"></div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-900">Total Angsuran per Bulan</span>
                  <span className="text-gray-700">:</span>
                  <span className="font-bold text-green-700">{formatCurrency(loanDetails.monthlyPayment || 0)}</span>
                </div>
              </div>
            </div>

            {/* Pembayaran Pertama Kali */}
            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-3">Pembayaran Pertama Kali</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-700">Uang Muka (DP)</span>
                  <span className="text-gray-700">:</span>
                  <span className="font-medium text-gray-900">{formatCurrency(loanDetails.downPaymentAmount || 0)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Angsuran Pertama</span>
                  <span className="text-gray-700">:</span>
                  <span className="font-medium text-gray-900">{formatCurrency(loanDetails.monthlyPayment || 0)}</span>
                </div>
                <div className="border-t border-gray-300 my-2"></div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-900">Total Pembayaran Pertama</span>
                  <span className="text-gray-700">:</span>
                  <span className="font-bold text-purple-700">{formatCurrency((loanDetails.downPaymentAmount || 0) + (loanDetails.monthlyPayment || 0))}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "schedule" && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900">Tabel Angsuran</h2>
            
            {schedule.length > 0 ? (
              <>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="border border-gray-300 px-3 py-2 text-left font-medium text-gray-700">Bulan</th>
                        <th className="border border-gray-300 px-3 py-2 text-right font-medium text-gray-700">Angsuran Bunga</th>
                        <th className="border border-gray-300 px-3 py-2 text-right font-medium text-gray-700">Angsuran Pokok</th>
                        <th className="border border-gray-300 px-3 py-2 text-right font-medium text-gray-700">Total Angsuran</th>
                        <th className="border border-gray-300 px-3 py-2 text-right font-medium text-gray-700">Sisa Pinjaman</th>
                      </tr>
                    </thead>
                    <tbody>
                      {displayedSchedule.map((payment, index) => (
                        <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                          <td className="border border-gray-300 px-3 py-2 font-medium">{payment.month}</td>
                          <td className="border border-gray-300 px-3 py-2 text-right">{formatCurrency(payment.interest || 0)}</td>
                          <td className="border border-gray-300 px-3 py-2 text-right">{formatCurrency(payment.principal || 0)}</td>
                          <td className="border border-gray-300 px-3 py-2 text-right font-medium">{formatCurrency(payment.payment || 0)}</td>
                          <td className="border border-gray-300 px-3 py-2 text-right font-medium">{formatCurrency(payment.balance || 0)}</td>
                        </tr>
                      ))}
                      
                      {/* Total Row */}
                      <tr className="bg-gray-100 font-bold">
                        <td className="border border-gray-300 px-3 py-2">Total</td>
                        <td className="border border-gray-300 px-3 py-2 text-right">{formatCurrency(loanDetails.totalInterest || 0)}</td>
                        <td className="border border-gray-300 px-3 py-2 text-right">{formatCurrency(loanDetails.loanAmount || 0)}</td>
                        <td className="border border-gray-300 px-3 py-2 text-right">{formatCurrency(loanDetails.totalPayment || 0)}</td>
                        <td className="border border-gray-300 px-3 py-2 text-right">-</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {schedule.length > 13 && (
                  <div className="text-center">
                    <button
                      onClick={() => setShowAllSchedule(!showAllSchedule)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    >
                      {showAllSchedule ? 'Tampilkan Lebih Sedikit' : `Tampilkan Semua (${schedule.length - 1} bulan)`}
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">Tabel angsuran tidak tersedia</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
