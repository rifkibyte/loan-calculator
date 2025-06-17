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
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-3 gap-4 items-center">
        <label className="text-sm font-medium text-gray-700">
          Harga Mobil OTR
        </label>
        <div className="col-span-2">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={carPrice}
              onChange={(e) => setCarPrice(e.target.value.replace(/[^\d]/g, ""))}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="250000000"
            />
            <span className="text-sm text-gray-600">rupiah</span>
          </div>
          <p className="mt-1 text-xs text-gray-500">masukkan angka, tidak boleh pakai koma atau titik</p>
          <p className="mt-1 text-sm font-medium text-gray-700">
            Rp {formatNumber(carPrice)},00
          </p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 items-center">
        <label className="text-sm font-medium text-gray-700">
          Tenor<br/>(jangka waktu)
        </label>
        <div className="col-span-2">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={loanTerm}
              onChange={(e) => setLoanTerm(e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="5"
            />
            <span className="text-sm text-gray-600">tahun</span>
          </div>
          <p className="mt-1 text-xs text-gray-500">masukkan angka, tidak boleh pakai koma atau titik</p>
          <p className="mt-1 text-sm font-medium text-gray-700">= {loanTermMonths} bulan</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 items-center">
        <label className="text-sm font-medium text-gray-700">
          Bunga Pinjaman
        </label>
        <div className="col-span-2">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="4.8"
            />
            <span className="text-sm text-gray-600">% / tahun</span>
          </div>
          <p className="mt-1 text-xs text-gray-500">masukkan angka, misal 6.5</p>
          <p className="mt-1 text-sm font-medium text-gray-700">
            = {monthlyInterestRate.toFixed(2)} % / bulan
          </p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 items-center">
        <label className="text-sm font-medium text-gray-700">
          Uang Muka<br/>(DP)
        </label>
        <div className="col-span-2">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={downPaymentPercent}
              onChange={(e) => setDownPaymentPercent(e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="30"
            />
            <span className="text-sm text-gray-600">%</span>
          </div>
          <p className="mt-1 text-xs text-gray-500">(persen dari harga OTR)</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 items-center">
        <label className="text-sm font-medium text-gray-700">
          Perhitungan Bunga
        </label>
        <div className="col-span-2">
          <div className="px-3 py-2 bg-gray-100 rounded-md text-gray-700">
            Flat
          </div>
        </div>
      </div>

      <div className="pt-4">
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Hitung Simulasi
        </button>
      </div>
    </form>
  );
}
