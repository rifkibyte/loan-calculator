// src/components/mortgage/budget/MortgageBudgetForm.tsx
"use client";

import React, { useState } from "react";

interface FormData {
  monthlyBudget: number;
  downPaymentPercent: number;
  loanTerm: number;
  annualInterestRate: number;
  installmentPercent: number;
  provisionPercent: number;
  adminPercent: number;
}

interface FormErrors {
  [key: string]: string;
}

interface MortgageBudgetFormProps {
  onCalculate: (formData: FormData) => void;
}

export default function MortgageBudgetForm({
  onCalculate,
}: MortgageBudgetFormProps): React.JSX.Element {
  const [monthlyBudget, setMonthlyBudget] = useState<string>("5000000");
  const [downPaymentPercent, setDownPaymentPercent] = useState<string>("20");
  const [loanTerm, setLoanTerm] = useState<string>("15");
  const [annualInterestRate, setAnnualInterestRate] = useState<string>("14.6");
  const [installmentPercent, setInstallmentPercent] = useState<string>("30");
  const [provisionPercent, setProvisionPercent] = useState<string>("1");
  const [adminPercent, setAdminPercent] = useState<string>("0.1");
  const [errors, setErrors] = useState<FormErrors>({});

  // Derived values for display
  const loanTermMonths = Number(loanTerm) * 12;
  const monthlyInterestRate = Number(annualInterestRate) / 12;

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (
      !monthlyBudget ||
      isNaN(Number(monthlyBudget)) ||
      Number(monthlyBudget) <= 0
    ) {
      newErrors.monthlyBudget = "Budget angsuran harus berupa angka positif";
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
      !annualInterestRate ||
      isNaN(Number(annualInterestRate)) ||
      Number(annualInterestRate) < 0
    ) {
      newErrors.annualInterestRate =
        "Suku bunga harus berupa angka positif atau nol";
    }

    if (
      !installmentPercent ||
      isNaN(Number(installmentPercent)) ||
      Number(installmentPercent) <= 0 ||
      Number(installmentPercent) > 100
    ) {
      newErrors.installmentPercent =
        "Persentase angsuran harus antara 0 dan 100";
    }

    if (
      !provisionPercent ||
      isNaN(Number(provisionPercent)) ||
      Number(provisionPercent) < 0
    ) {
      newErrors.provisionPercent =
        "Persentase provisi harus berupa angka positif atau nol";
    }

    if (
      !adminPercent ||
      isNaN(Number(adminPercent)) ||
      Number(adminPercent) < 0
    ) {
      newErrors.adminPercent =
        "Persentase administrasi harus berupa angka positif atau nol";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (validateForm()) {
      onCalculate({
        monthlyBudget: Number(monthlyBudget),
        downPaymentPercent: Number(downPaymentPercent),
        loanTerm: Number(loanTerm),
        annualInterestRate: Number(annualInterestRate),
        installmentPercent: Number(installmentPercent),
        provisionPercent: Number(provisionPercent),
        adminPercent: Number(adminPercent),
      });
    }
  };

  const formatInputCurrency = (value: string): string => {
    return value.replace(/[^\d]/g, "");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        Simulasi KPR - berdasar budget
      </h2>

      {/* Monthly Budget Input */}
      <div>
        <label className="block text-sm font-medium text-gray-900 mb-1">
          Budget Angsuran (per bulan):
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <span className="text-gray-500 sm:text-sm">Rp</span>
          </div>
          <input
            type="text"
            value={monthlyBudget}
            onChange={(e) =>
              setMonthlyBudget(formatInputCurrency(e.target.value))
            }
            className="w-full pl-12 pr-3 py-2 text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="5000000"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <span className="text-gray-500 sm:text-sm">,00</span>
          </div>
        </div>
        <p className="mt-1 text-xs text-gray-600">
          masukkan angka, tidak boleh pakai koma atau titik
        </p>
        {errors.monthlyBudget && (
          <p className="mt-1 text-sm text-red-600">{errors.monthlyBudget}</p>
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
            onChange={(e) => setDownPaymentPercent(e.target.value)}
            className="w-full pr-8 pl-3 py-2 text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="20"
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

      {/* Loan Term */}
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
            placeholder="15"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <span className="text-gray-500 sm:text-sm">tahun</span>
          </div>
        </div>
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
            value={annualInterestRate}
            onChange={(e) => setAnnualInterestRate(e.target.value)}
            className="w-full pr-16 pl-3 py-2 text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="14.6"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <span className="text-gray-500 sm:text-sm">% / tahun</span>
          </div>
        </div>
        <p className="mt-1 text-xs text-gray-600">
          = {monthlyInterestRate.toFixed(2)}% / bulan
        </p>
        {errors.annualInterestRate && (
          <p className="mt-1 text-sm text-red-600">
            {errors.annualInterestRate}
          </p>
        )}
      </div>

      {/* Installment Percentage */}
      <div>
        <label className="block text-sm font-medium text-gray-900 mb-1">
          Besar Angsuran (per bulan):
        </label>
        <div className="relative">
          <input
            type="text"
            value={installmentPercent}
            onChange={(e) => setInstallmentPercent(e.target.value)}
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
        {errors.installmentPercent && (
          <p className="mt-1 text-sm text-red-600">
            {errors.installmentPercent}
          </p>
        )}
      </div>

      {/* Calculation Method */}
      <div>
        <label className="block text-sm font-medium text-gray-900 mb-1">
          Perhitungan Bunga:
        </label>
        <div className="bg-gray-50 p-2 rounded-md">
          <span className="text-gray-700">Anuitas</span>
        </div>
      </div>

      {/* Additional Fees */}
      <div className="border-t border-gray-200 pt-4">
        <h3 className="font-medium text-gray-900 mb-3">Biaya Bank</h3>

        <div className="space-y-4">
          {/* Provision Percentage */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1">
              Biaya Provisi:
            </label>
            <div className="relative">
              <input
                type="text"
                value={provisionPercent}
                onChange={(e) => setProvisionPercent(e.target.value)}
                className="w-full pr-8 pl-3 py-2 text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="1"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <span className="text-gray-500 sm:text-sm">%</span>
              </div>
            </div>
            <p className="mt-1 text-xs text-gray-600">(persen dari plafon)</p>
            {errors.provisionPercent && (
              <p className="mt-1 text-sm text-red-600">
                {errors.provisionPercent}
              </p>
            )}
          </div>

          {/* Admin Percentage */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1">
              Biaya Administrasi:
            </label>
            <div className="relative">
              <input
                type="text"
                value={adminPercent}
                onChange={(e) => setAdminPercent(e.target.value)}
                className="w-full pr-8 pl-3 py-2 text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="0.1"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <span className="text-gray-500 sm:text-sm">%</span>
              </div>
            </div>
            <p className="mt-1 text-xs text-gray-600">(persen dari plafon)</p>
            {errors.adminPercent && (
              <p className="mt-1 text-sm text-red-600">{errors.adminPercent}</p>
            )}
          </div>
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
