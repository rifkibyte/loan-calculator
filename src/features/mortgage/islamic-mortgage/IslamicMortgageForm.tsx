// components/islamic-mortgage/IslamicMortgageForm.tsx
"use client";

import  { useState } from "react";

interface FormData {
  housePrice: number;
  downPaymentPercent: number;
  loanTerm: number;
  marginRate: number;
  calculationMethod: "anuitas" | "flat";
}

interface FormErrors {
  [key: string]: string;
}

interface IslamicMortgageFormProps {
  onCalculate: (formData: FormData) => void;
}

export default function IslamicMortgageForm({
  onCalculate,
}: IslamicMortgageFormProps) {
  const [housePrice, setHousePrice] = useState<string>("500000000");
  const [downPaymentPercent, setDownPaymentPercent] = useState<string>("30");
  const [loanTerm, setLoanTerm] = useState<string>("10");
  const [marginRate, setMarginRate] = useState<string>("8.3");
  const [calculationMethod, setCalculationMethod] = useState<
    "anuitas" | "flat"
  >("anuitas");
  const [errors, setErrors] = useState<FormErrors>({});

  // Derived values for display
  const loanTermMonths: number = Number(loanTerm) * 12;
  const monthlyMarginRate: number = Number(marginRate) / 12;

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!housePrice || isNaN(Number(housePrice)) || Number(housePrice) <= 0) {
      newErrors.housePrice = "Harga rumah harus berupa angka positif";
    }

    if (
      !downPaymentPercent ||
      isNaN(Number(downPaymentPercent)) ||
      Number(downPaymentPercent) <= 0 ||
      Number(downPaymentPercent) >= 100
    ) {
      newErrors.downPaymentPercent =
        "Persentase uang muka harus antara 0 dan 100";
    }

    if (
      !loanTerm ||
      isNaN(Number(loanTerm)) ||
      Number(loanTerm) <= 0 ||
      !Number.isInteger(Number(loanTerm))
    ) {
      newErrors.loanTerm = "Tenor harus berupa bilangan bulat positif";
    }

    if (!marginRate || isNaN(Number(marginRate)) || Number(marginRate) < 0) {
      newErrors.marginRate = "Margin bank harus berupa angka positif atau nol";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (validateForm()) {
      onCalculate({
        housePrice: Number(housePrice),
        downPaymentPercent: Number(downPaymentPercent),
        loanTerm: Number(loanTerm),
        marginRate: Number(marginRate),
        calculationMethod,
      });
    }
  };

  const formatInputCurrency = (value: string): string => {
    return value.replace(/[^\d]/g, "");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">
          Simulasi KPR Syariah
        </h2>
      </div>

      {/* House Price Input */}
      <div>
        <label className="block text-sm font-medium text-gray-900 mb-1">
          Harga Rumah:
        </label>
        <div className="relative">
          <input
            type="text"
            value={housePrice}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setHousePrice(formatInputCurrency(e.target.value))
            }
            className="w-full pl-3 pr-16 py-2 text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="500000000"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <span className="text-gray-500 sm:text-sm">rupiah</span>
          </div>
        </div>
        <p className="mt-1 text-xs text-gray-600">
          masukkan angka, tidak boleh pakai koma atau titik
        </p>
        <p className="mt-1 text-sm font-medium text-gray-900">
          Rp {Number(housePrice || 0).toLocaleString("id-ID")},00
        </p>
        {errors.housePrice && (
          <p className="mt-1 text-sm text-red-600">{errors.housePrice}</p>
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
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setLoanTerm(e.target.value)
            }
            className="w-full pl-3 pr-14 py-2 text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="10"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <span className="text-gray-500 sm:text-sm">tahun</span>
          </div>
        </div>
        <p className="mt-1 text-xs text-gray-600">
          masukkan angka, tidak boleh pakai koma atau titik
        </p>
        <p className="mt-1 text-sm text-gray-900">= {loanTermMonths} bulan</p>
        {errors.loanTerm && (
          <p className="mt-1 text-sm text-red-600">{errors.loanTerm}</p>
        )}
      </div>

      {/* Margin Rate Input */}
      <div>
        <label className="block text-sm font-medium text-gray-900 mb-1">
          Margin Bank:
        </label>
        <div className="relative">
          <input
            type="text"
            value={marginRate}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setMarginRate(e.target.value)
            }
            className="w-full pl-3 pr-20 py-2 text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="8.3"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <span className="text-gray-500 sm:text-sm">% / tahun</span>
          </div>
        </div>
        <p className="mt-1 text-xs text-gray-600">masukkan angka, misal 6.5</p>
        <p className="mt-1 text-sm text-gray-900">
          = {monthlyMarginRate.toFixed(2)} % / bulan
        </p>
        {errors.marginRate && (
          <p className="mt-1 text-sm text-red-600">{errors.marginRate}</p>
        )}
      </div>

      {/* Down Payment Percentage Input */}
      <div>
        <label className="block text-sm font-medium text-gray-900 mb-1">
          Uang Muka (DP):
        </label>
        <div className="relative">
          <input
            type="text"
            value={downPaymentPercent}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setDownPaymentPercent(e.target.value)
            }
            className="w-full pl-3 pr-8 py-2 text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="30"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <span className="text-gray-500 sm:text-sm">%</span>
          </div>
        </div>
        <p className="mt-1 text-xs text-gray-600">(persen dari harga rumah)</p>
        {errors.downPaymentPercent && (
          <p className="mt-1 text-sm text-red-600">
            {errors.downPaymentPercent}
          </p>
        )}
      </div>

      {/* Calculation Method - Using Select */}
      <div>
        <label className="block text-sm font-medium text-gray-900 mb-1">
          Perhitungan Margin:
        </label>
        <select
          value={calculationMethod}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setCalculationMethod(e.target.value as "anuitas" | "flat")
          }
          className="w-full pl-3 pr-3 py-2 text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="anuitas">Anuitas</option>
          <option value="flat">Flat</option>
        </select>
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
