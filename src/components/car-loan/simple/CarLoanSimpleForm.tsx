"use client";

import { useState } from "react";

interface FormData {
  carPrice: number;
  downPaymentPercent: number;
  loanTerm: number;
  interestRate: number;
}

interface FormErrors {
  [key: string]: string;
}

interface CarLoanSimpleFormProps {
  onCalculate: (formData: FormData) => void;
}

export default function CarLoanSimpleForm({ onCalculate }: CarLoanSimpleFormProps): JSX.Element {
  // Form state with default values
  const [carPrice, setCarPrice] = useState<string>("250000000");
  const [downPaymentPercent, setDownPaymentPercent] = useState<string>("30");
  const [loanTerm, setLoanTerm] = useState<string>("5");
  const [interestRate, setInterestRate] = useState<string>("4.8");
  const [errors, setErrors] = useState<FormErrors>({});

  // Derived values
  const loanTermMonths: number = Number(loanTerm) * 12;
  const monthlyInterestRate: number = Number(interestRate) / 12;

  // Validation function
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!carPrice || isNaN(Number(carPrice)) || Number(carPrice) <= 0) {
      newErrors.carPrice = "Harga mobil harus berupa angka positif";
    }

    if (
      !downPaymentPercent ||
      isNaN(Number(downPaymentPercent)) ||
      Number(downPaymentPercent) <= 0 ||
      Number(downPaymentPercent) >= 100
    ) {
      newErrors.downPaymentPercent = "Persentase uang muka harus antara 0 dan 100";
    }

    if (
      !loanTerm ||
      isNaN(Number(loanTerm)) ||
      Number(loanTerm) <= 0 ||
      !Number.isInteger(Number(loanTerm))
    ) {
      newErrors.loanTerm = "Tenor harus berupa bilangan bulat positif";
    }

    if (
      !interestRate ||
      isNaN(Number(interestRate)) ||
      Number(interestRate) < 0
    ) {
      newErrors.interestRate = "Suku bunga harus berupa angka positif atau nol";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (validateForm()) {
      onCalculate({
        carPrice: Number(carPrice),
        downPaymentPercent: Number(downPaymentPercent),
        loanTerm: Number(loanTerm),
        interestRate: Number(interestRate)
      });
    }
  };

  // Format currency input
  const formatInputCurrency = (value: string): string => {
    return value.replace(/[^\d]/g, "");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Car Price Input */}
      <div>
        <label className="block text-sm font-medium text-gray-900 mb-1">
          Harga Mobil OTR:
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <span className="text-gray-500 sm:text-sm">Rp</span>
          </div>
          <input
            type="text"
            value={carPrice}
            onChange={(e) => setCarPrice(formatInputCurrency(e.target.value))}
            className="w-full pl-12 pr-3 py-2 text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="250000000"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <span className="text-gray-500 sm:text-sm">,00</span>
          </div>
        </div>
        {errors.carPrice && (
          <p className="mt-1 text-sm text-red-600">{errors.carPrice}</p>
        )}
      </div>

      {/* Down Payment Input */}
      <div>
        <label className="block text-sm font-medium text-gray-900 mb-1">
          Uang Muka (DP):
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
        <p className="mt-1 text-xs text-gray-900">(persen dari harga OTR)</p>
        {errors.downPaymentPercent && (
          <p className="mt-1 text-sm text-red-600">{errors.downPaymentPercent}</p>
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
            value={loanTerm}
            onChange={(e) => setLoanTerm(e.target.value)}
            className="w-full pr-14 pl-3 py-2 text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="5"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <span className="text-gray-500 sm:text-sm">tahun</span>
          </div>
        </div>
        <p className="mt-1 text-xs text-gray-900">= {loanTermMonths} bulan</p>
        {errors.loanTerm && (
          <p className="mt-1 text-sm text-red-600">{errors.loanTerm}</p>
        )}
      </div>

      {/* Interest Rate Input */}
      <div>
        <label className="block text-sm font-medium text-gray-900 mb-1">
          Bunga Pinjaman (Flat):
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
        <p className="mt-1 text-xs text-gray-900">
          = {monthlyInterestRate.toFixed(2)}% / bulan
        </p>
        {errors.interestRate && (
          <p className="mt-1 text-sm text-red-600">{errors.interestRate}</p>
        )}
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
