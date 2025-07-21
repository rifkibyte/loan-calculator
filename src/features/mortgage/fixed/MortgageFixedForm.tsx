"use client";

import  { useState } from "react";
import { formatCurrency } from "@/utils/formatters";

interface FormData {
  loanAmount: number;
  loanTerm: number;
  yearlyRates: { year: number; rate: number }[];
  calculationMethod: string;
}

interface FormErrors {
  [key: string]: string;
}

interface MortgageFixedFormProps {
  onCalculate: (formData: FormData) => void;
}

export default function MortgageFixedForm({
  onCalculate,
}: MortgageFixedFormProps) {
  const [loanAmount, setLoanAmount] = useState<string>("500000000");
  const [loanTerm, setLoanTerm] = useState<string>("10");
  const [yearlyRates, setYearlyRates] = useState<
    { year: number; rate: number }[]
  >([
    { year: 1, rate: 5 },
    { year: 2, rate: 5 },
    { year: 3, rate: 5 },
    { year: 4, rate: 10 },
    { year: 5, rate: 9 },
    { year: 6, rate: 10 },
    { year: 7, rate: 12 },
    { year: 8, rate: 13 },
    { year: 9, rate: 9 },
    { year: 10, rate: 8 },
  ]);
  const [errors, setErrors] = useState<FormErrors>({});

  const formatInputCurrency = (value: string): string => {
    return value.replace(/[^\d]/g, "");
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!loanAmount || isNaN(Number(loanAmount)) || Number(loanAmount) <= 0) {
      newErrors.loanAmount = "Jumlah pinjaman harus berupa angka positif";
    }

    if (!loanTerm || isNaN(Number(loanTerm)) || Number(loanTerm) <= 0) {
      newErrors.loanTerm = "Lama pinjaman harus berupa angka positif";
    }

    // Validate yearly rates
    yearlyRates.forEach((rate, index) => {
      if (isNaN(rate.rate) || rate.rate < 0) {
        newErrors[
          `rate_${index}`
        ] = `Bunga tahun ke-${rate.year} harus berupa angka positif`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (validateForm()) {
      onCalculate({
        loanAmount: Number(loanAmount),
        loanTerm: Number(loanTerm),
        yearlyRates: yearlyRates,
        calculationMethod: "Anuitas - Floating",
      });
    }
  };

  const handleLoanTermChange = (value: string) => {
    const termValue = Number(value);
    setLoanTerm(value);

    // Update yearly rates array based on loan term
    const newRates = [];
    for (let i = 1; i <= termValue; i++) {
      const existingRate = yearlyRates.find((r) => r.year === i);
      newRates.push({
        year: i,
        rate: existingRate ? existingRate.rate : 5,
      });
    }
    setYearlyRates(newRates);
  };

  const handleRateChange = (year: number, rate: string) => {
    setYearlyRates((prev) =>
      prev.map((r) => (r.year === year ? { ...r, rate: Number(rate) || 0 } : r))
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Loan Amount */}
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
            value={loanAmount}
            onChange={(e) => setLoanAmount(formatInputCurrency(e.target.value))}
            className="w-full pl-12 pr-3 py-2 text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="500000000"
          />
        </div>
        <p className="mt-1 text-xs text-gray-500">
          masukkan angka, tidak boleh pakai koma atau titik
        </p>
        <p className="mt-1 text-sm font-medium text-gray-900">
          {formatCurrency(Number(loanAmount) || 0)}
        </p>
        {errors.loanAmount && (
          <p className="mt-1 text-sm text-red-600">{errors.loanAmount}</p>
        )}
      </div>

      {/* Loan Term */}
      <div>
        <label className="block text-sm font-medium text-gray-900 mb-1">
          Lama Pinjaman:
        </label>
        <div className="flex items-center space-x-2">
          <button
            type="button"
            onClick={() =>
              handleLoanTermChange(String(Math.max(1, Number(loanTerm) - 1)))
            }
            className="px-3 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            -
          </button>
          <div className="relative flex-1">
            <input
              type="text"
              value={loanTerm}
              onChange={(e) => handleLoanTermChange(e.target.value)}
              className="w-full pr-14 pl-3 py-2 text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-center"
              placeholder="10"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <span className="text-gray-500 sm:text-sm">tahun</span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => handleLoanTermChange(String(Number(loanTerm) + 1))}
            className="px-3 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            +
          </button>
        </div>
        {errors.loanTerm && (
          <p className="mt-1 text-sm text-red-600">{errors.loanTerm}</p>
        )}
      </div>

      {/* Yearly Interest Rates */}
      <div>
        <label className="block text-sm font-medium text-gray-900 mb-3">
          Bunga per Tahun:
        </label>
        <div className="space-y-3 max-h-64 overflow-y-auto">
          {yearlyRates.map((rate) => (
            <div key={rate.year} className="flex items-center space-x-3">
              <label className="text-sm text-gray-700 w-24">
                Bunga tahun ke-{rate.year}:
              </label>
              <div className="relative flex-1">
                <input
                  type="text"
                  value={rate.rate}
                  onChange={(e) => handleRateChange(rate.year, e.target.value)}
                  className="w-full pr-8 pl-3 py-2 text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="5"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">%</span>
                </div>
              </div>
              {errors[`rate_${rate.year - 1}`] && (
                <p className="text-sm text-red-600">
                  {errors[`rate_${rate.year - 1}`]}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Calculation Method */}
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-gray-900">
          Perhitungan Bunga:
        </label>
        <p className="text-sm font-medium text-gray-900">Anuitas - Floating</p>
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
