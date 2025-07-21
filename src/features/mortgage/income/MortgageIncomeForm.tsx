"use client";

import  { useState } from "react";

interface FormData {
  netIncome: number;
  downPaymentPercent: number;
  loanTerm: number;
  interestRate: number;
  maxInstallmentPercent: number;
}

interface FormErrors {
  [key: string]: string;
}

interface MortgageIncomeFormProps {
  onCalculate: (formData: FormData) => void;
}

export default function MortgageIncomeForm({
  onCalculate,
}: MortgageIncomeFormProps) {
  const [netIncome, setNetIncome] = useState<string>("15000000");
  const [downPaymentPercent, setDownPaymentPercent] = useState<string>("20");
  const [loanTerm, setLoanTerm] = useState<string>("15");
  const [interestRate, setInterestRate] = useState<string>("14.6");
  const [maxInstallmentPercent, setMaxInstallmentPercent] =
    useState<string>("30");
  const [errors, setErrors] = useState<FormErrors>({});

  // Derived values for display
  const loanTermMonths: number = Number(loanTerm) * 12;
  const monthlyInterestRate: number = Number(interestRate) / 12;

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!netIncome || isNaN(Number(netIncome)) || Number(netIncome) <= 0) {
      newErrors.netIncome = "Penghasilan bersih harus berupa angka positif";
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

    if (
      !interestRate ||
      isNaN(Number(interestRate)) ||
      Number(interestRate) < 0
    ) {
      newErrors.interestRate = "Suku bunga harus berupa angka positif atau nol";
    }

    if (
      !maxInstallmentPercent ||
      isNaN(Number(maxInstallmentPercent)) ||
      Number(maxInstallmentPercent) <= 0 ||
      Number(maxInstallmentPercent) > 100
    ) {
      newErrors.maxInstallmentPercent =
        "Persentase angsuran harus antara 0 dan 100";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (validateForm()) {
      onCalculate({
        netIncome: Number(netIncome),
        downPaymentPercent: Number(downPaymentPercent),
        loanTerm: Number(loanTerm),
        interestRate: Number(interestRate),
        maxInstallmentPercent: Number(maxInstallmentPercent),
      });
    }
  };

  const formatInputCurrency = (value: string): string => {
    return value.replace(/[^\d]/g, "");
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">
        Simulasi KPR - berdasar penghasilan
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Net Income Input */}
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-1">
            Penghasilan Bersih (per bulan):
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <span className="text-gray-500 sm:text-sm">Rp</span>
            </div>
            <input
              type="text"
              value={netIncome}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setNetIncome(formatInputCurrency(e.target.value))
              }
              className="w-full pl-12 pr-3 py-2 text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="15000000"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <span className="text-gray-500 sm:text-sm">,00</span>
            </div>
          </div>
          <p className="mt-1 text-xs text-gray-600">
            masukkan angka, tidak boleh pakai koma atau titik
          </p>
          <p className="mt-1 text-sm font-medium text-gray-900">
            Rp {Number(netIncome || 0).toLocaleString("id-ID")},00
          </p>
          {errors.netIncome && (
            <p className="mt-1 text-sm text-red-600">{errors.netIncome}</p>
          )}
        </div>

        {/* Down Payment Percentage */}
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
              className="w-full pr-8 pl-3 py-2 text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="20"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <span className="text-gray-500 sm:text-sm">%</span>
            </div>
          </div>
          <p className="mt-1 text-xs text-gray-600">
            (persen dari harga rumah)
          </p>
          {errors.downPaymentPercent && (
            <p className="mt-1 text-sm text-red-600">
              {errors.downPaymentPercent}
            </p>
          )}
        </div>

        {/* Loan Term */}
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
              className="w-full pr-14 pl-3 py-2 text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="15"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <span className="text-gray-500 sm:text-sm">tahun</span>
            </div>
          </div>
          <p className="mt-1 text-xs text-gray-600">
            masukkan angka, tidak boleh pakai koma atau titik
          </p>
          <p className="mt-1 text-xs text-gray-600">= {loanTermMonths} bulan</p>
          {errors.loanTerm && (
            <p className="mt-1 text-sm text-red-600">{errors.loanTerm}</p>
          )}
        </div>

        {/* Interest Rate */}
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-1">
            Bunga Pinjaman:
          </label>
          <div className="relative">
            <input
              type="text"
              value={interestRate}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setInterestRate(e.target.value)
              }
              className="w-full pr-14 pl-3 py-2 text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="14.6"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <span className="text-gray-500 sm:text-sm">% / tahun</span>
            </div>
          </div>
          <p className="mt-1 text-xs text-gray-600">
            masukkan angka, misal 6.5
          </p>
          <p className="mt-1 text-xs text-gray-600">
            = {monthlyInterestRate.toFixed(2)} % / bulan
          </p>
          {errors.interestRate && (
            <p className="mt-1 text-sm text-red-600">{errors.interestRate}</p>
          )}
        </div>

        {/* Maximum Installment Percentage */}
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-1">
            Besar Angsuran (per bulan):
          </label>
          <div className="relative">
            <input
              type="text"
              value={maxInstallmentPercent}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setMaxInstallmentPercent(e.target.value)
              }
              className="w-full pr-8 pl-3 py-2 text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="30"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <span className="text-gray-500 sm:text-sm">%</span>
            </div>
          </div>
          <p className="mt-1 text-xs text-gray-600">
            (persen dari penghasilan bersih)
          </p>
          {errors.maxInstallmentPercent && (
            <p className="mt-1 text-sm text-red-600">
              {errors.maxInstallmentPercent}
            </p>
          )}
        </div>

        {/* Calculation Method Info */}
        {/* Calculation Method Info */}
        <div className="flex items-center justify-between gap-4">
          <label className="text-sm font-medium text-gray-900">
            Perhitungan Bunga:
          </label>
          <p className="text-sm font-medium text-gray-900">Anuitas</p>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 font-medium"
        >
          Hitung
        </button>
      </form>
    </div>
  );
}
