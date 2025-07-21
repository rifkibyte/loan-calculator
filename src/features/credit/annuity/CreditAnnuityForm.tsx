"use client";

import { useState } from "react";
// Mengimpor fungsi-fungsi utilitas
import {
  formatCurrency,
  parseCurrency,
  formatDecimal,
} from "@/utils/formatters";

// Interface for form data
interface FormData {
  loanAmount: number;
  loanTermMonths: number;
  annualInterestRate: number;
}

// Interface for form validation errors
interface FormErrors {
  [key: string]: string;
}

// Interface for component props
interface CreditAnnuityFormProps {
  onCalculate: (formData: FormData) => void;
}

export default function CreditAnnuityForm({
  onCalculate,
}: CreditAnnuityFormProps) {
  // Form state variables
  const [loanAmount, setLoanAmount] = useState<string>("500000000");
  const [loanTermMonths, setLoanTermMonths] = useState<string>("120");
  const [annualInterestRate, setAnnualInterestRate] = useState<string>("14.6");
  const [errors, setErrors] = useState<FormErrors>({});

  // Derived values for display
  const loanTermYears: number = Number(loanTermMonths) / 12;
  const monthlyInterestRate: number = Number(annualInterestRate) / 12;

  /**
   * Handles changes in the loan amount input using the parseCurrency utility.
   * @param e - The input change event
   */
  const handleLoanAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Menggunakan parseCurrency untuk membersihkan input dan mengubahnya menjadi angka
    const numericValue = parseCurrency(e.target.value);
    // Menyimpan nilai mentah sebagai string di dalam state
    setLoanAmount(String(numericValue));
  };

  /**
   * Validate form inputs
   * @returns boolean indicating if form is valid
   */
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!loanAmount || isNaN(Number(loanAmount)) || Number(loanAmount) <= 0) {
      newErrors.loanAmount = "Jumlah pinjaman harus berupa angka positif";
    }

    if (
      !loanTermMonths ||
      isNaN(Number(loanTermMonths)) ||
      Number(loanTermMonths) <= 0 ||
      !Number.isInteger(Number(loanTermMonths))
    ) {
      newErrors.loanTermMonths =
        "Lama pinjaman harus berupa bilangan bulat positif";
    }

    if (
      !annualInterestRate ||
      isNaN(Number(annualInterestRate)) ||
      Number(annualInterestRate) < 0
    ) {
      newErrors.annualInterestRate =
        "Bunga pinjaman harus berupa angka positif atau nol";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Handle form submission
   * @param e - Form event
   */
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (validateForm()) {
      onCalculate({
        loanAmount: Number(loanAmount),
        loanTermMonths: Number(loanTermMonths),
        annualInterestRate: Number(annualInterestRate),
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Loan Amount Input */}
      <div>
        <label className="block text-sm font-medium text-gray-900 mb-1">
          Jumlah Pinjaman:
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <span className="text-gray-500 sm:text-sm">Rp</span>
          </div>
          <input
            type="text"
            // Menggunakan formatCurrency dari utils untuk menampilkan nilai
            value={formatCurrency(loanAmount)}
            onChange={handleLoanAmountChange}
            className="w-full pl-12 pr-3 py-2 text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="500.000.000"
            inputMode="numeric"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <span className="text-gray-500 sm:text-sm">,00</span>
          </div>
        </div>
        <p className="mt-1 text-xs text-gray-600">
          Pemisah ribuan (titik) akan ditambahkan secara otomatis.
        </p>
        {errors.loanAmount && (
          <p className="mt-1 text-sm text-red-600">{errors.loanAmount}</p>
        )}
      </div>

      {/* Loan Term Input */}
      <div>
        <label className="block text-sm font-medium text-gray-900 mb-1">
          Tenor (jangka waktu):
        </label>
        <div className="relative">
          <input
            type="text"
            value={loanTermMonths}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setLoanTermMonths(e.target.value.replace(/[^\d]/g, ""))
            }
            className="w-full pr-14 pl-3 py-2 text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="120"
            inputMode="numeric"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <span className="text-gray-500 sm:text-sm">bulan</span>
          </div>
        </div>
        {/* Menggunakan formatDecimal untuk konsistensi */}
        <p className="mt-1 text-xs text-gray-900">
          = {formatDecimal(loanTermYears, 2)} tahun
        </p>
        {errors.loanTermMonths && (
          <p className="mt-1 text-sm text-red-600">{errors.loanTermMonths}</p>
        )}
      </div>

      {/* Interest Rate Input */}
      <div>
        <label className="block text-sm font-medium text-gray-900 mb-1">
          Suku Bunga Pinjaman:
        </label>
        <div className="relative">
          <input
            type="text"
            value={annualInterestRate}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setAnnualInterestRate(e.target.value)
            }
            className="w-full pr-20 pl-3 py-2 text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="14.6"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <span className="text-gray-500 sm:text-sm">% / tahun</span>
          </div>
        </div>
        {/* Menggunakan formatDecimal untuk konsistensi */}
        <p className="mt-1 text-xs text-gray-900">
          = {formatDecimal(monthlyInterestRate, 2)} % / bulan
        </p>
        {errors.annualInterestRate && (
          <p className="mt-1 text-sm text-red-600">
            {errors.annualInterestRate}
          </p>
        )}
      </div>

      {/* Calculation Method Display */}
      <div className="border-t border-gray-200 pt-4">
        <h3 className="font-medium text-gray-900 mb-3">
          Metode Perhitungan Bunga
        </h3>
        <div className="bg-gray-50 p-3 rounded-md">
          <span className="text-gray-900 font-medium">Anuitas</span>
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
