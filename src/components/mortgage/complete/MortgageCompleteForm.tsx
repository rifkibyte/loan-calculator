"use client";

import React, { useState } from "react";
import { formatCurrency, formatCurrencyDisplay } from "@/utils/formatters";

// Interface for form data
interface FormData {
  housePrice: number;
  loanTerm: number;
  annualInterestRate: number;
  downPaymentPercent: number;
  provisionPercent: number;
  appraisalFee: number;
  adminFee: number;
  notaryFee: number;
  insuranceFee: number;
  njoptkp: number;
}

// Interface for form validation errors
interface FormErrors {
  [key: string]: string;
}

// Interface for component props
interface MortgageFormProps {
  onCalculate: (formData: FormData) => void;
}

export default function MortgageCompleteForm({
  onCalculate,
}: MortgageFormProps): React.JSX.Element {
  // Form state variables
  const [housePrice, setHousePrice] = useState<string>("500000000");
  const [loanTerm, setLoanTerm] = useState<string>("10");
  const [annualInterestRate, setAnnualInterestRate] = useState<string>("14.6");
  const [downPaymentPercent, setDownPaymentPercent] = useState<string>("20");
  const [provisionPercent, setProvisionPercent] = useState<string>("1.5");
  const [appraisalFee, setAppraisalFee] = useState<string>("500000");
  const [adminFee, setAdminFee] = useState<string>("450000");
  const [notaryFee, setNotaryFee] = useState<string>("12000000");
  const [insuranceFee, setInsuranceFee] = useState<string>("7500000");
  const [njoptkp, setNjoptkp] = useState<string>("60000000");
  const [errors, setErrors] = useState<FormErrors>({});

  // Derived values for display
  const loanTermMonths: number = Number(loanTerm) * 12;
  const monthlyInterestRate: number = Number(annualInterestRate) / 12;

  /**
   * Validate form inputs
   * @returns boolean indicating if form is valid
   */
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!housePrice || isNaN(Number(housePrice)) || Number(housePrice) <= 0) {
      newErrors.housePrice = "Harga rumah harus berupa angka positif";
    }

    if (!loanTerm || isNaN(Number(loanTerm)) || Number(loanTerm) <= 0) {
      newErrors.loanTerm = "Tenor harus berupa angka positif";
    }

    if (
      !annualInterestRate ||
      isNaN(Number(annualInterestRate)) ||
      Number(annualInterestRate) < 0
    ) {
      newErrors.annualInterestRate =
        "Bunga pinjaman harus berupa angka positif atau nol";
    }

    if (
      !downPaymentPercent ||
      isNaN(Number(downPaymentPercent)) ||
      Number(downPaymentPercent) <= 0 ||
      Number(downPaymentPercent) >= 100
    ) {
      newErrors.downPaymentPercent = "Uang muka harus antara 0 dan 100 persen";
    }

    if (
      !provisionPercent ||
      isNaN(Number(provisionPercent)) ||
      Number(provisionPercent) < 0
    ) {
      newErrors.provisionPercent =
        "Biaya provisi harus berupa angka positif atau nol";
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
        housePrice: Number(housePrice),
        loanTerm: Number(loanTerm),
        annualInterestRate: Number(annualInterestRate),
        downPaymentPercent: Number(downPaymentPercent),
        provisionPercent: Number(provisionPercent),
        appraisalFee: Number(appraisalFee),
        adminFee: Number(adminFee),
        notaryFee: Number(notaryFee),
        insuranceFee: Number(insuranceFee),
        njoptkp: Number(njoptkp),
      });
    }
  };

  /**
   * Format input to remove non-numeric characters
   * @param value - Input value
   * @returns Formatted numeric string
   */
  const formatInputCurrency = (value: string): string => {
    return value.replace(/[^\d]/g, "");
  };

  /**
   * Handle currency input change
   */
  const handleCurrencyChange = (
    value: string,
    setter: (value: string) => void
  ): void => {
    const cleanValue = formatInputCurrency(value);
    setter(cleanValue);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        Simulasi KPR Lengkap
      </h2>

      {/* House Price Input */}
      <div>
        <label className="block text-sm font-medium text-gray-900 mb-1">
          Harga Rumah:
        </label>
        <div className="relative">
          <input
            type="text"
            value={formatCurrency(housePrice)}
            onChange={(e) =>
              handleCurrencyChange(e.target.value, setHousePrice)
            }
            className="w-full pl-3 pr-16 py-2 text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="500,000,000"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <span className="text-gray-500 sm:text-sm">rupiah</span>
          </div>
        </div>
        <p className="mt-1 text-xs text-gray-600">
          masukkan angka, tidak boleh pakai koma atau titik
        </p>
        <p className="mt-1 text-sm font-medium text-gray-900">
          {formatCurrencyDisplay(housePrice)}
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
            onChange={(e) => setLoanTerm(e.target.value.replace(/[^\d]/g, ""))}
            className="w-full pr-14 pl-3 py-2 text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="10"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <span className="text-gray-500 sm:text-sm">tahun</span>
          </div>
        </div>
        <p className="mt-1 text-xs text-gray-600">
          masukkan angka, tidak boleh pakai koma atau titik
        </p>
        <p className="mt-1 text-sm font-medium text-gray-900">
          = {loanTermMonths} bulan
        </p>
        {errors.loanTerm && (
          <p className="mt-1 text-sm text-red-600">{errors.loanTerm}</p>
        )}
      </div>

      {/* Interest Rate Input */}
      <div>
        <label className="block text-sm font-medium text-gray-900 mb-1">
          Bunga Pinjaman:
        </label>
        <div className="relative">
          <input
            type="text"
            value={annualInterestRate}
            onChange={(e) =>
              setAnnualInterestRate(e.target.value.replace(/[^\d.]/g, ""))
            }
            className="w-full pr-20 pl-3 py-2 text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="14.6"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <span className="text-gray-500 sm:text-sm">% / tahun</span>
          </div>
        </div>
        <p className="mt-1 text-xs text-gray-600">masukkan angka, misal 6.5</p>
        <p className="mt-1 text-sm font-medium text-gray-900">
          = {monthlyInterestRate.toFixed(2)} % / bulan
        </p>
        {errors.annualInterestRate && (
          <p className="mt-1 text-sm text-red-600">
            {errors.annualInterestRate}
          </p>
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
            onChange={(e) =>
              setDownPaymentPercent(e.target.value.replace(/[^\d.]/g, ""))
            }
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

      {/* Bank Fees Section */}
      <div className="border-t border-gray-200 pt-4">
        <h3 className="font-medium text-gray-900 mb-3">Biaya Bank</h3>

        <div className="space-y-4">
          {/* Provision Fee */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1">
              Biaya Provisi:
            </label>
            <div className="relative">
              <input
                type="text"
                value={provisionPercent}
                onChange={(e) =>
                  setProvisionPercent(e.target.value.replace(/[^\d.]/g, ""))
                }
                className="w-full pr-8 pl-3 py-2 text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="1.5"
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

          {/* Appraisal Fee */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1">
              Biaya Appraisal:
            </label>
            <div className="relative">
              <input
                type="text"
                value={formatCurrency(appraisalFee)}
                onChange={(e) =>
                  handleCurrencyChange(e.target.value, setAppraisalFee)
                }
                className="w-full pl-3 pr-16 py-2 text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="500,000"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <span className="text-gray-500 sm:text-sm">rupiah</span>
              </div>
            </div>
            <p className="mt-1 text-xs text-gray-600">
              masukkan angka, tidak boleh pakai koma atau titik
            </p>
            <p className="mt-1 text-sm font-medium text-gray-900">
              {formatCurrencyDisplay(appraisalFee)}
            </p>
          </div>

          {/* Admin Fee */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1">
              Biaya Administrasi:
            </label>
            <div className="relative">
              <input
                type="text"
                value={formatCurrency(adminFee)}
                onChange={(e) =>
                  handleCurrencyChange(e.target.value, setAdminFee)
                }
                className="w-full pl-3 pr-16 py-2 text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="450,000"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <span className="text-gray-500 sm:text-sm">rupiah</span>
              </div>
            </div>
            <p className="mt-1 text-xs text-gray-600">
              masukkan angka, tidak boleh pakai koma atau titik
            </p>
            <p className="mt-1 text-sm font-medium text-gray-900">
              {formatCurrencyDisplay(adminFee)}
            </p>
          </div>
        </div>
      </div>

      {/* Other Fees Section */}
      <div className="border-t border-gray-200 pt-4">
        <h3 className="font-medium text-gray-900 mb-3">Biaya Lain</h3>

        <div className="space-y-4">
          {/* Notary Fee */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1">
              Biaya Notaris:
            </label>
            <div className="relative">
              <input
                type="text"
                value={formatCurrency(notaryFee)}
                onChange={(e) =>
                  handleCurrencyChange(e.target.value, setNotaryFee)
                }
                className="w-full pl-3 pr-16 py-2 text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="12,000,000"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <span className="text-gray-500 sm:text-sm">rupiah</span>
              </div>
            </div>
            <p className="mt-1 text-xs text-gray-600">
              masukkan angka, tidak boleh pakai koma atau titik
            </p>
            <p className="mt-1 text-sm font-medium text-gray-900">
              {formatCurrencyDisplay(notaryFee)}
            </p>
          </div>

          {/* Insurance Fee */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1">
              Biaya Asuransi:
            </label>
            <div className="relative">
              <input
                type="text"
                value={formatCurrency(insuranceFee)}
                onChange={(e) =>
                  handleCurrencyChange(e.target.value, setInsuranceFee)
                }
                className="w-full pl-3 pr-16 py-2 text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="7,500,000"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <span className="text-gray-500 sm:text-sm">rupiah</span>
              </div>
            </div>
            <p className="mt-1 text-xs text-gray-600">
              masukkan angka, tidak boleh pakai koma atau titik
            </p>
            <p className="mt-1 text-sm font-medium text-gray-900">
              {formatCurrencyDisplay(insuranceFee)}
            </p>
          </div>
        </div>
      </div>

      {/* Tax Section */}
      <div className="border-t border-gray-200 pt-4">
        <h3 className="font-medium text-gray-900 mb-3">Pajak</h3>

        <div>
          <label className="block text-sm font-medium text-gray-900 mb-1">
            NJOPTKP/NPTKP*:
          </label>
          <div className="relative">
            <input
              type="text"
              value={formatCurrency(njoptkp)}
              onChange={(e) => handleCurrencyChange(e.target.value, setNjoptkp)}
              className="w-full pl-3 pr-16 py-2 text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="60,000,000"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <span className="text-gray-500 sm:text-sm">rupiah</span>
            </div>
          </div>
          <p className="mt-1 text-xs text-gray-600">
            masukkan angka, tidak boleh pakai koma atau titik
          </p>
          <p className="mt-1 text-sm font-medium text-gray-900">
            {formatCurrencyDisplay(njoptkp)}
          </p>
          <p className="mt-1 text-xs text-gray-600">
            *Nilai yang tidak kena pajak; tiap daerah berbeda dan berubah
            sejalan waktu; contoh untuk DKI Rp 60juta, Bekasi & Tangerang Rp
            30juta, Depok Rp 20juta
          </p>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 font-medium"
      >
        Hitung
      </button>
    </form>
  );
}
