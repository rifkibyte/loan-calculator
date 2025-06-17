"use client";

import { useState } from "react";

// Interface for form data
interface FormData {
  carPrice: number;
  downPaymentPercent: number;
  loanTerm: number;
  interestRate: number;
}

// Interface for component props
interface CarLoanSimpleFormProps {
  onCalculate: (formData: FormData) => void;
}

export default function CarLoanSimpleForm({ onCalculate }: CarLoanSimpleFormProps): JSX.Element {
  // Form state variables
  const [carPrice, setCarPrice] = useState<string>("250000000");
  const [downPaymentPercent, setDownPaymentPercent] = useState<string>("30");
  const [loanTerm, setLoanTerm] = useState<string>("5");
  const [interestRate, setInterestRate] = useState<string>("4.8");

  // Derived values for display
  const loanTermMonths: number = Number(loanTerm) * 12;
  const monthlyInterestRate: number = Number(interestRate) / 12;

  /**
   * Handle form submission
   * @param e - Form event
   */
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    onCalculate({
      carPrice: Number(carPrice),
      downPaymentPercent: Number(downPaymentPercent),
      loanTerm: Number(loanTerm),
      interestRate: Number(interestRate)
    });
  };

  /**
   * Format number with thousand separators
   */
  const formatNumber = (num: string): string => {
    const number = Number(num.replace(/[^\d]/g, ""));
    return new Intl.NumberFormat('id-ID').format(number);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Car Price Input */}
      <div>
        <label className="block text-sm font-medium text-gray-900 mb-1">
          Harga Mobil OTR:
        </label>
        <div className="relative">
          <input
            type="text"
            value={carPrice}
            onChange={(e) => setCarPrice(e.target.value.replace(/[^\d]/g, ""))}
            className="w-full pr-12 pl-3 py-2 text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="250000000"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <span className="text-gray-500 sm:text-sm">rupiah</span>
          </div>
        </div>
        <p className="mt-1 text-xs text-gray-500">masukkan angka, tidak boleh pakai koma atau titik</p>
        <p className="mt-1 text-sm font-medium text-gray-900">
          Rp {formatNumber(carPrice)},00
        </p>
      </div>

      {/* Loan Term Input */}
      <div>
        <label className="block text-sm font-medium text-gray-900 mb-1">
          Tenor<br/>(jangka waktu):
        </label>
        <div className="relative">
          <input
            type="text"
            value={loanTerm}
            onChange={(e) => setLoanTerm(e.target.value)}
            className="w-full pr-12 pl-3 py-2 text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="5"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <span className="text-gray-500 sm:text-sm">tahun</span>
          </div>
        </div>
        <p className="mt-1 text-xs text-gray-500">masukkan angka, tidak boleh pakai koma atau titik</p>
        <p className="mt-1 text-sm font-medium text-gray-900">= {loanTermMonths} bulan</p>
      </div>

      {/* Interest Rate Input */}
      <div>
        <label className="block text-sm font-medium text-gray-900 mb-1">
          Bunga Pinjaman:
        </label>
        <div className="relative">
          <input
            type="text"
            value={interestRate}
            onChange={(e) => setInterestRate(e.target.value)}
            className="w-full pr-14 pl-3 py-2 text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="4.8"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <span className="text-gray-500 sm:text-sm">% / tahun</span>
          </div>
        </div>
        <p className="mt-1 text-xs text-gray-500">masukkan angka, misal 6.5</p>
        <p className="mt-1 text-sm font-medium text-gray-900">
          = {monthlyInterestRate.toFixed(2)} % / bulan
        </p>
      </div>

      {/* Down Payment Percentage Input */}
      <div>
        <label className="block text-sm font-medium text-gray-900 mb-1">
          Uang Muka<br/>(DP):
        </label>
        <div className="relative">
          <input
            type="text"
            value={downPaymentPercent}
            onChange={(e) => setDownPaymentPercent(e.target.value)}
            className="w-full pr-8 pl-3 py-2 text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="30"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <span className="text-gray-500 sm:text-sm">%</span>
          </div>
        </div>
        <p className="mt-1 text-xs text-gray-500">(persen dari harga OTR)</p>
      </div>

      {/* Calculation Method */}
      <div>
        <label className="block text-sm font-medium text-gray-900 mb-1">
          Perhitungan Bunga:
        </label>
        <div className="px-3 py-2 bg-gray-100 rounded-md text-gray-900">
          Flat
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 font-medium"
      >
        Hitung Simulasi
      </button>
    </form>
  );
}
