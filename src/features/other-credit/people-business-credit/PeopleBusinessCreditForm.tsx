"use client";

import { useState } from "react";

// Interface for form data
interface FormData {
  loanAmount: number;
  loanTerm: number;
  interestRate: number;
  loanPurpose: string;
  adminFee: number;
  insuranceFee: number;
}

// Interface for form validation errors
interface FormErrors {
  [key: string]: string;
}

// Interface for component props
interface PeopleBusinessCreditFormProps {
  onCalculate: (formData: FormData) => void;
}

export default function PeopleBusinessCreditForm({ onCalculate }: PeopleBusinessCreditFormProps) {
  // Form state variables
  const [loanAmount, setLoanAmount] = useState<string>("50000000");
  const [loanTerm, setLoanTerm] = useState<string>("3");
  const [interestRate, setInterestRate] = useState<string>("15");
  const [loanPurpose, setLoanPurpose] = useState<string>("working-capital");
  const [adminFee, setAdminFee] = useState<string>("500000");
  const [insuranceFee, setInsuranceFee] = useState<string>("300000");
  const [errors, setErrors] = useState<FormErrors>({});

  // Derived values for display
  const loanTermMonths: number = Number(loanTerm) * 12;
  const monthlyInterestRate: number = Number(interestRate) / 12;

  /**
   * Validate form inputs
   * @returns boolean indicating if form is valid
   */
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!loanAmount || isNaN(Number(loanAmount)) || Number(loanAmount) <= 0) {
      newErrors.loanAmount = "Jumlah pinjaman harus berupa angka positif";
    }

    if (Number(loanAmount) > 500000000) {
      newErrors.loanAmount = "Jumlah pinjaman KUR maksimal Rp 500.000.000";
    }

    if (
      !loanTerm ||
      isNaN(Number(loanTerm)) ||
      Number(loanTerm) <= 0 ||
      !Number.isInteger(Number(loanTerm))
    ) {
      newErrors.loanTerm = "Tenor harus berupa bilangan bulat positif";
    }

    if (Number(loanTerm) > 5) {
      newErrors.loanTerm = "Tenor KUR maksimal 5 tahun";
    }

    if (
      !interestRate ||
      isNaN(Number(interestRate)) ||
      Number(interestRate) < 0
    ) {
      newErrors.interestRate = "Suku bunga harus berupa angka positif atau nol";
    }

    if (!loanPurpose) {
      newErrors.loanPurpose = "Tujuan pinjaman harus dipilih";
    }

    if (!adminFee || isNaN(Number(adminFee)) || Number(adminFee) < 0) {
      newErrors.adminFee = "Biaya administrasi harus berupa angka positif atau nol";
    }

    if (!insuranceFee || isNaN(Number(insuranceFee)) || Number(insuranceFee) < 0) {
      newErrors.insuranceFee = "Biaya asuransi harus berupa angka positif atau nol";
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
        loanTerm: Number(loanTerm),
        interestRate: Number(interestRate),
        loanPurpose,
        adminFee: Number(adminFee),
        insuranceFee: Number(insuranceFee)
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
            value={loanAmount}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
              setLoanAmount(formatInputCurrency(e.target.value))
            }
            className="w-full pl-12 pr-3 py-2 text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="50000000"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <span className="text-gray-500 sm:text-sm">,00</span>
          </div>
        </div>
        <p className="mt-1 text-xs text-gray-600">Maksimal Rp 500.000.000</p>
        {errors.loanAmount && (
          <p className="mt-1 text-sm text-red-600">{errors.loanAmount}</p>
        )}
      </div>

      {/* Loan Purpose Select */}
      <div>
        <label className="block text-sm font-medium text-gray-900 mb-1">
          Tujuan Pinjaman:
        </label>
        <select
          value={loanPurpose}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => 
            setLoanPurpose(e.target.value)
          }
          className="w-full px-3 py-2 text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Pilih Tujuan Pinjaman</option>
          <option value="working-capital">Modal Kerja</option>
          <option value="investment">Investasi</option>
          <option value="consumptive">Konsumtif</option>
        </select>
        {errors.loanPurpose && (
          <p className="mt-1 text-sm text-red-600">{errors.loanPurpose}</p>
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
            className="w-full pr-14 pl-3 py-2 text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="3"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <span className="text-gray-500 sm:text-sm">tahun</span>
          </div>
        </div>
        <p className="mt-1 text-xs text-gray-900">= {loanTermMonths} bulan (Maksimal 5 tahun)</p>
        {errors.loanTerm && (
          <p className="mt-1 text-sm text-red-600">{errors.loanTerm}</p>
        )}
      </div>

      {/* Interest Rate Input */}
      <div>
        <label className="block text-sm font-medium text-gray-900 mb-1">
          Suku Bunga KUR:
        </label>
        <div className="relative">
          <input
            type="text"
            value={interestRate}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
              setInterestRate(e.target.value)
            }
            className="w-full pr-14 pl-3 py-2 text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="15"
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

      {/* Additional Fees Section */}
      <div className="border-t border-gray-200 pt-4">
        <h3 className="font-medium text-gray-900 mb-3">Biaya Lain</h3>

        <div className="space-y-4">
          {/* Admin Fee Input */}
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
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setAdminFee(formatInputCurrency(e.target.value))
                }
                className="w-full pl-12 pr-3 py-2 text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="500000"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <span className="text-gray-500 sm:text-sm">,00</span>
              </div>
            </div>
            {errors.adminFee && (
              <p className="mt-1 text-sm text-red-600">{errors.adminFee}</p>
            )}
          </div>

          {/* Insurance Fee Input */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1">
              Biaya Asuransi:
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <span className="text-gray-500 sm:text-sm">Rp</span>
              </div>
              <input
                type="text"
                value={insuranceFee}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setInsuranceFee(formatInputCurrency(e.target.value))
                }
                className="w-full pl-12 pr-3 py-2 text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="300000"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <span className="text-gray-500 sm:text-sm">,00</span>
              </div>
            </div>
            {errors.insuranceFee && (
              <p className="mt-1 text-sm text-red-600">{errors.insuranceFee}</p>
            )}
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 font-medium"
      >
        Hitung Simulasi KUR
      </button>
    </form>
  );
}
