"use client";

import { useState } from "react";
// import { formatCurrency } from "@/utils/formatters";

interface LoanFormProps {
  onCalculate: (formData: {
    carPrice: number;
    downPaymentPercent: number;
    loanTerm: number;
    interestRate: number;
    insurancePercent: number;
    provisionPercent: number;
    policyFee: number;
    adminFee: number;
  }) => void;
}

export default function LoanForm({ onCalculate }: LoanFormProps) {
  const [carPrice, setCarPrice] = useState<string>("250000000");
  const [downPaymentPercent, setDownPaymentPercent] = useState<string>("30");
  const [loanTerm, setLoanTerm] = useState<string>("5");
  const [interestRate, setInterestRate] = useState<string>("4.8");
  const [insurancePercent, setInsurancePercent] = useState<string>("5");
  const [provisionPercent, setProvisionPercent] = useState<string>("0.5");
  const [policyFee, setPolicyFee] = useState<string>("40000");
  const [adminFee, setAdminFee] = useState<string>("700000");
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Derived values for display
  const loanTermMonths = Number(loanTerm) * 12;
  const monthlyInterestRate = Number(interestRate) / 12;

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!carPrice || isNaN(Number(carPrice)) || Number(carPrice) <= 0) {
      newErrors.carPrice = "Harga mobil harus berupa angka positif";
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
      !insurancePercent ||
      isNaN(Number(insurancePercent)) ||
      Number(insurancePercent) < 0
    ) {
      newErrors.insurancePercent =
        "Persentase asuransi harus berupa angka positif atau nol";
    }

    if (
      !provisionPercent ||
      isNaN(Number(provisionPercent)) ||
      Number(provisionPercent) < 0
    ) {
      newErrors.provisionPercent =
        "Persentase provisi harus berupa angka positif atau nol";
    }

    if (!policyFee || isNaN(Number(policyFee)) || Number(policyFee) < 0) {
      newErrors.policyFee =
        "Biaya polis asuransi harus berupa angka positif atau nol";
    }

    if (!adminFee || isNaN(Number(adminFee)) || Number(adminFee) < 0) {
      newErrors.adminFee =
        "Biaya administrasi harus berupa angka positif atau nol";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Di CarSimpleLoanForm, pastikan handleSubmit mengirim data dengan struktur yang benar:
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      onCalculate({
        carPrice: FormData.carPrice,
        downPaymentPercent: FormData.downPaymentPercent,
        loanTermYears: FormData.loanTermYears, // Pastikan nama field konsisten
        annualInterestRate: FormData.annualInterestRate, // Pastikan nama field konsisten
      });
    }
  };

  const formatInputCurrency = (value: string) => {
    // Remove non-numeric characters
    return value.replace(/[^\d]/g, "");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
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
          <p className="mt-1 text-sm text-red-600">
            {errors.downPaymentPercent}
          </p>
        )}
      </div>

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

      <div className="border-t border-gray-200 pt-4">
        <h3 className="font-medium text-gray-900 mb-3">Biaya Lain</h3>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1">
              Asuransi:
            </label>
            <div className="relative">
              <input
                type="text"
                value={insurancePercent}
                onChange={(e) => setInsurancePercent(e.target.value)}
                className="w-full pr-8 pl-3 py-2 text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="5"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <span className="text-gray-500 sm:text-sm">%</span>
              </div>
            </div>
            <p className="mt-1 text-xs text-gray-900">
              (persen dari harga OTR)
            </p>
            {errors.insurancePercent && (
              <p className="mt-1 text-sm text-red-600">
                {errors.insurancePercent}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1">
              Provisi:
            </label>
            <div className="relative">
              <input
                type="text"
                value={provisionPercent}
                onChange={(e) => setProvisionPercent(e.target.value)}
                className="w-full pr-8 pl-3 py-2 text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="0.5"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <span className="text-gray-500 sm:text-sm">%</span>
              </div>
            </div>
            <p className="mt-1 text-xs text-gray-900">(persen dari plafon)</p>
            {errors.provisionPercent && (
              <p className="mt-1 text-sm text-red-600">
                {errors.provisionPercent}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1">
              Biaya Polis Asuransi:
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <span className="text-gray-500 sm:text-sm">Rp</span>
              </div>
              <input
                type="text"
                value={policyFee}
                onChange={(e) =>
                  setPolicyFee(formatInputCurrency(e.target.value))
                }
                className="w-full pl-12 pr-3 py-2 text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="40000"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <span className="text-gray-500 sm:text-sm">,00</span>
              </div>
            </div>
            {errors.policyFee && (
              <p className="mt-1 text-sm text-red-600">{errors.policyFee}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1">
              Biaya Administrasi:
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <span className="text-gray-500 sm:text-sm">Rp</span>
              </div>
              <input
                type="text"
                value={adminFee}
                onChange={(e) =>
                  setAdminFee(formatInputCurrency(e.target.value))
                }
                className="w-full pl-12 pr-3 py-2 text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="700000"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <span className="text-gray-500 sm:text-sm">,00</span>
              </div>
            </div>
            {errors.adminFee && (
              <p className="mt-1 text-sm text-red-600">{errors.adminFee}</p>
            )}
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 font-medium"
      >
        Hitung Simulasi
      </button>
    </form>
  );
}
