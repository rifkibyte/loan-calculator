"use client";

import { useState } from "react";
import { getMaxLoanAmount, getMaxLoanTerm } from "@/utils/calculators/other-credit/multiPurposeLoanCalculator";

// Interface for form data
interface FormData {
  loanAmount: number;
  loanTerm: number;
  interestRate: number;
  variableRate: number;
  fixedRatePeriod: number;
  applicantType: 'employee' | 'professional' | 'entrepreneur';
  provisionPercent: number;
  adminFee: number;
}

// Interface for form validation errors
interface FormErrors {
  [key: string]: string;
}

// Interface for component props
interface MultiPurposeLoanFormProps {
  onCalculate: (formData: FormData) => void;
}

export default function MultiPurposeLoanForm({ onCalculate }: MultiPurposeLoanFormProps) {
  // Form state variables
  const [loanAmount, setLoanAmount] = useState<string>("100000000");
  const [loanTerm, setLoanTerm] = useState<string>("7");
  const [interestRate, setInterestRate] = useState<string>("6.00");
  const [variableRate, setVariableRate] = useState<string>("8.00");
  const [fixedRatePeriod, setFixedRatePeriod] = useState<string>("3");
  const [applicantType, setApplicantType] = useState<'employee' | 'professional' | 'entrepreneur'>('employee');
  const [provisionPercent, setProvisionPercent] = useState<string>("1.0");
  const [adminFee, setAdminFee] = useState<string>("500000");
  const [errors, setErrors] = useState<FormErrors>({});

  // Get limits based on applicant type
  const maxLoanAmount = getMaxLoanAmount(applicantType);
  const maxLoanTerm = getMaxLoanTerm(applicantType);

  /**
   * Validate form inputs
   * @returns boolean indicating if form is valid
   */
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!loanAmount || isNaN(Number(loanAmount)) || Number(loanAmount) <= 0) {
      newErrors.loanAmount = "Jumlah pinjaman harus berupa angka positif";
    } else if (Number(loanAmount) > maxLoanAmount) {
      newErrors.loanAmount = `Jumlah pinjaman maksimal ${maxLoanAmount.toLocaleString('id-ID')} untuk ${applicantType}`;
    }

    if (
      !loanTerm ||
      isNaN(Number(loanTerm)) ||
      Number(loanTerm) <= 0 ||
      !Number.isInteger(Number(loanTerm))
    ) {
      newErrors.loanTerm = "Tenor harus berupa bilangan bulat positif";
    } else if (Number(loanTerm) < 7) {
      newErrors.loanTerm = "Tenor minimum 7 tahun";
    } else if (Number(loanTerm) > maxLoanTerm) {
      newErrors.loanTerm = `Tenor maksimal ${maxLoanTerm} tahun untuk ${applicantType}`;
    }

    if (
      !interestRate ||
      isNaN(Number(interestRate)) ||
      Number(interestRate) < 0
    ) {
      newErrors.interestRate = "Suku bunga tetap harus berupa angka positif";
    }

    if (
      !variableRate ||
      isNaN(Number(variableRate)) ||
      Number(variableRate) < 0
    ) {
      newErrors.variableRate = "Suku bunga mengambang harus berupa angka positif";
    }

    if (
      !fixedRatePeriod ||
      isNaN(Number(fixedRatePeriod)) ||
      Number(fixedRatePeriod) <= 0
    ) {
      newErrors.fixedRatePeriod = "Periode bunga tetap harus berupa angka positif";
    }

    if (
      !provisionPercent ||
      isNaN(Number(provisionPercent)) ||
      Number(provisionPercent) < 0
    ) {
      newErrors.provisionPercent = "Persentase provisi harus berupa angka positif atau nol";
    }

    if (!adminFee || isNaN(Number(adminFee)) || Number(adminFee) < 0) {
      newErrors.adminFee = "Biaya administrasi harus berupa angka positif atau nol";
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
        variableRate: Number(variableRate),
        fixedRatePeriod: Number(fixedRatePeriod),
        applicantType,
        provisionPercent: Number(provisionPercent),
        adminFee: Number(adminFee)
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

  const getApplicantTypeLabel = (type: string): string => {
    switch (type) {
      case 'employee': return 'Pegawai';
      case 'professional': return 'Profesional';
      case 'entrepreneur': return 'Wiraswasta';
      default: return type;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-blue-50 p-4 rounded-lg mb-6">
        <h3 className="font-semibold text-blue-800 mb-2">Kredit Multi Guna Bank Mandiri</h3>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Suku bunga kompetitif mulai 6.00% fix 3 tahun pertama</li>
          <li>• Tenor minimum 7 tahun</li>
          <li>• Limit hingga Rp 10 milyar (Pegawai/Profesional)</li>
          <li>• Limit hingga Rp 200 juta (Wiraswasta)</li>
        </ul>
      </div>

      {/* Applicant Type Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-900 mb-2">
          Jenis Pemohon:
        </label>
        <div className="grid grid-cols-1 gap-2">
          {(['employee', 'professional', 'entrepreneur'] as const).map((type) => (
            <label key={type} className="flex items-center">
              <input
                type="radio"
                name="applicantType"
                value={type}
                checked={applicantType === type}
                onChange={(e) => setApplicantType(e.target.value as typeof type)}
                className="mr-2"
              />
              <span className="text-sm text-gray-900">
                {getApplicantTypeLabel(type)} 
                <span className="text-gray-500 ml-1">
                  (Max: Rp {getMaxLoanAmount(type).toLocaleString('id-ID')}, 
                  Tenor: {getMaxLoanTerm(type)} tahun)
                </span>
              </span>
            </label>
          ))}
        </div>
      </div>

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
            placeholder="100000000"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <span className="text-gray-500 sm:text-sm">,00</span>
          </div>
        </div>
        <p className="mt-1 text-xs text-gray-600">
          Maksimal: Rp {maxLoanAmount.toLocaleString('id-ID')}
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
            value={loanTerm}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
              setLoanTerm(e.target.value)
            }
            className="w-full pr-14 pl-3 py-2 text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="7"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <span className="text-gray-500 sm:text-sm">tahun</span>
          </div>
        </div>
        <p className="mt-1 text-xs text-gray-600">
          Minimum: 7 tahun, Maksimal: {maxLoanTerm} tahun
        </p>
        {errors.loanTerm && (
          <p className="mt-1 text-sm text-red-600">{errors.loanTerm}</p>
        )}
      </div>

      {/* Interest Rate Section */}
      <div className="border-t border-gray-200 pt-4">
        <h3 className="font-medium text-gray-900 mb-3">Suku Bunga</h3>

        <div className="space-y-4">
          {/* Fixed Rate Period */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1">
              Periode Bunga Tetap:
            </label>
            <div className="relative">
              <input
                type="text"
                value={fixedRatePeriod}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                  setFixedRatePeriod(e.target.value)
                }
                className="w-full pr-14 pl-3 py-2 text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="3"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <span className="text-gray-500 sm:text-sm">tahun</span>
              </div>
            </div>
            {errors.fixedRatePeriod && (
              <p className="mt-1 text-sm text-red-600">{errors.fixedRatePeriod}</p>
            )}
          </div>

          {/* Fixed Interest Rate Input */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1">
              Bunga Tetap ({fixedRatePeriod} tahun pertama):
            </label>
            <div className="relative">
              <input
                type="text"
                value={interestRate}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                  setInterestRate(e.target.value)
                }
                className="w-full pr-14 pl-3 py-2 text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="6.00"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <span className="text-gray-500 sm:text-sm">% / tahun</span>
              </div>
            </div>
            {errors.interestRate && (
              <p className="mt-1 text-sm text-red-600">{errors.interestRate}</p>
            )}
          </div>

          {/* Variable Interest Rate Input */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1">
              Bunga Mengambang (setelah tahun ke-{fixedRatePeriod}):
            </label>
            <div className="relative">
              <input
                type="text"
                value={variableRate}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                  setVariableRate(e.target.value)
                }
                className="w-full pr-14 pl-3 py-2 text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="8.00"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <span className="text-gray-500 sm:text-sm">% / tahun</span>
              </div>
            </div>
            <p className="mt-1 text-xs text-gray-600">
              *Suku bunga dapat berubah, hubungi Call Center untuk info lebih lanjut
            </p>
            {errors.variableRate && (
              <p className="mt-1 text-sm text-red-600">{errors.variableRate}</p>
            )}
          </div>
        </div>
      </div>

      {/* Additional Fees Section */}
      <div className="border-t border-gray-200 pt-4">
        <h3 className="font-medium text-gray-900 mb-3">Biaya Lain</h3>

        <div className="space-y-4">
          {/* Provision Percentage Input */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1">
              Provisi:
            </label>
            <div className="relative">
              <input
                type="text"
                value={provisionPercent}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                  setProvisionPercent(e.target.value)
                }
                className="w-full pr-8 pl-3 py-2 text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="1.0"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <span className="text-gray-500 sm:text-sm">%</span>
              </div>
            </div>
            <p className="mt-1 text-xs text-gray-600">(persen dari plafon)</p>
            {errors.provisionPercent && (
              <p className="mt-1 text-sm text-red-600">{errors.provisionPercent}</p>
            )}
          </div>

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
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 font-medium"
      >
        Hitung Simulasi Kredit Multi Guna
      </button>
    </form>
  );
}
