Ini adalah Form form saya buatkan agar bisa di import

Misal
<Input ...

<Enum ...

<Year ..

<Percent

<Button ..


~/workspace/side-hustle/loan-calculator/src on  main! ⌚ 15:51:18
$ treeclean
.
├── app
│   ├── (calculators)
│   │   ├── car-loan
│   │   │   ├── budget
│   │   │   │   └── page.tsx
│   │   │   ├── complete
│   │   │   │   └── page.tsx
│   │   │   └── simple
│   │   │       └── page.tsx
│   │   ├── credit
│   │   │   └── annuity
│   │   │       └── page.tsx
│   │   ├── mortgage
│   │   │   ├── budget
│   │   │   │   └── page.tsx
│   │   │   ├── complete
│   │   │   │   └── page.tsx
│   │   │   ├── fixed
│   │   │   │   └── page.tsx
│   │   │   ├── house-price
│   │   │   │   └── page.tsx
│   │   │   ├── income
│   │   │   │   └── page.tsx
│   │   │   └── islamic-mortgage
│   │   │       └── page.tsx
│   │   ├── other-credit
│   │   │   ├── multi-purpose-loan
│   │   │   │   └── page.tsx
│   │   │   └── people-business-credit
│   │   │       └── page.tsx
│   │   └── personal-loan
│   │       ├── amount
│   │       │   └── page.tsx
│   │       └── budget
│   │           └── page.tsx
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components
│   ├── car-loan
│   │   ├── budget
│   │   │   ├── CarLoanBudgetForm.tsx
│   │   │   ├── CarLoanBudgetResult.tsx
│   │   │   ├── CarLoanBudgetSchedule.tsx
│   │   │   └── index.ts
│   │   ├── complete
│   │   │   ├── CarLoanForm.tsx
│   │   │   ├── CarLoanResult.tsx
│   │   │   ├── CarLoanSchedule.tsx
│   │   │   └── index.ts
│   │   └── simple
│   │       ├── CarLoanSimpleForm.tsx
│   │       ├── CarLoanSimpleResult.tsx
│   │       ├── CarLoanSimpleSchedule.tsx
│   │       └── index.ts
│   ├── common
│   │   ├── Footer.tsx
│   │   ├── Header.tsx
│   │   └── index.ts
│   ├── credit
│   │   └── annuity
│   │       ├── CreditAnnuityForm.tsx
│   │       ├── CreditAnnuityResult.tsx
│   │       ├── CreditAnnuitySchedule.tsx
│   │       └── index.ts
│   ├── mortgage
│   │   ├── budget
│   │   │   ├── MortgageBudgetForm.tsx
│   │   │   ├── MortgageBudgetResult.tsx
│   │   │   ├── MortgageBudgetSchedule.tsx
│   │   │   └── index.ts
│   │   ├── complete
│   │   │   ├── MortgageCompleteForm.tsx
│   │   │   ├── MortgageCompleteResult.tsx
│   │   │   ├── MortgageCompleteSchedule.tsx
│   │   │   └── index.ts
│   │   ├── fixed
│   │   │   ├── MortgageFixedForm.tsx
│   │   │   ├── MortgageFixedResult.tsx
│   │   │   ├── MortgageFixedSchedule.tsx
│   │   │   └── index.ts
│   │   ├── house-price
│   │   │   ├── MortgageHousePriceForm.tsx
│   │   │   ├── MortgageHousePriceResult.tsx
│   │   │   ├── MortgageHousePriceSchedule.tsx
│   │   │   └── index.ts
│   │   ├── income
│   │   │   ├── MortgageIncomeForm.tsx
│   │   │   ├── MortgageIncomeResult.tsx
│   │   │   ├── MortgageIncomeSchedule.tsx
│   │   │   └── index.ts
│   │   └── islamic-mortgage
│   │       ├── IslamicMortgageForm.tsx
│   │       ├── IslamicMortgageResult.tsx
│   │       ├── IslamicMortgageSchedule.tsx
│   │       └── index.ts
│   ├── other-credit
│   │   ├── multi-purpose-loan
│   │   │   ├── MultiPurposeLoanForm.tsx
│   │   │   ├── MultiPurposeLoanResult.tsx
│   │   │   ├── MultiPurposeLoanSchedule.tsx
│   │   │   └── index.ts
│   │   └── people-business-credit
│   │       ├── PeopleBusinessCreditForm.tsx
│   │       ├── PeopleBusinessCreditResult.tsx
│   │       ├── PeopleBusinessCreditSchedule.tsx
│   │       └── index.ts
│   └── personal-loan
│       ├── amount
│       │   ├── PersonalLoanAmountForm.tsx
│       │   ├── PersonalLoanAmountResult.tsx
│       │   ├── PersonalLoanAmountSchedule.tsx
│       │   └── index.ts
│       └── budget
│           ├── PersonalLoanForm.tsx
│           ├── PersonalLoanResult.tsx
│           ├── PersonalLoanSchedule.tsx
│           └── index.ts
├── types
│   ├── car-loan.ts
│   ├── common.ts
│   ├── credit-annuity.ts
│   ├── islamic-mortgage.ts
│   ├── mortgage-budget.ts
│   ├── mortgage-fixed.ts
│   ├── mortgage-house-price.ts
│   ├── mortgage-income.ts
│   ├── mortgage.ts
│   ├── multi-purpose-loan.ts
│   ├── peoples-business-credit.ts
│   ├── personal-loan-amount.ts
│   └── personal-loan.ts
└── utils
    ├── calculators
    │   ├── car-loan
    │   │   ├── budgetCalculator.ts
    │   │   ├── completeCalculator.ts
    │   │   └── simpleCalculator.ts
    │   ├── credit
    │   │   └── annuityCalculator.ts
    │   ├── mortgage
    │   │   ├── budgetCalculator.ts
    │   │   ├── fixedCalculator.ts
    │   │   ├── housePriceCalculator.ts
    │   │   ├── incomeCalculator.ts
    │   │   ├── islamicMortgageCalculator.ts
    │   │   └── mortgageCalculator.ts
    │   ├── other-credit
    │   │   ├── multiPurposeLoanCalculator.ts
    │   │   └── peopleBusinessCreditCalculator.ts
    │   └── personal-loan
    │       ├── personalLoanAmountCalculator.ts
    │       └── personalLoanCalculator.ts
    ├── formatters.ts
    └── index.ts

51 directories, 106 files


car-complete/form
"use client";

import { useState } from "react";

// Interface for form data
interface FormData {
  carPrice: number;
  downPaymentPercent: number;
  loanTerm: number;
  interestRate: number;
  insurancePercent: number;
  provisionPercent: number;
  policyFee: number;
  adminFee: number;
}

// Interface for form validation errors
interface FormErrors {
  [key: string]: string;
}

// Interface for component props
interface LoanFormProps {
  onCalculate: (formData: FormData) => void;
}

export default function LoanForm({ onCalculate }: LoanFormProps) {
  // Form state variables
  const [carPrice, setCarPrice] = useState<string>("250000000");
  const [downPaymentPercent, setDownPaymentPercent] = useState<string>("30");
  const [loanTerm, setLoanTerm] = useState<string>("5");
  const [interestRate, setInterestRate] = useState<string>("4.8");
  const [insurancePercent, setInsurancePercent] = useState<string>("5");
  const [provisionPercent, setProvisionPercent] = useState<string>("0.5");
  const [policyFee, setPolicyFee] = useState<string>("40000");
  const [adminFee, setAdminFee] = useState<string>("700000");
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

  /**
   * Handle form submission
   * @param e - Form event
   */
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (validateForm()) {
      onCalculate({
        carPrice: Number(carPrice),
        downPaymentPercent: Number(downPaymentPercent),
        loanTerm: Number(loanTerm),
        interestRate: Number(interestRate),
        insurancePercent: Number(insurancePercent),
        provisionPercent: Number(provisionPercent),
        policyFee: Number(policyFee),
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
    // Remove non-numeric characters
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
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
              setCarPrice(formatInputCurrency(e.target.value))
            }
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
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
              setInterestRate(e.target.value)
            }
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

      {/* Additional Fees Section */}
      <div className="border-t border-gray-200 pt-4">
        <h3 className="font-medium text-gray-900 mb-3">Biaya Lain</h3>

        <div className="space-y-4">
          {/* Insurance Percentage Input */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1">
              Asuransi:
            </label>
            <div className="relative">
              <input
                type="text"
                value={insurancePercent}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                  setInsurancePercent(e.target.value)
                }
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

          {/* Policy Fee Input */}
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
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
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


carloan/budget/form
"use client";

import { useState, useMemo, FC, ChangeEvent, FormEvent } from "react";
import { formatCurrency, parseToNumericString } from "@/utils/formatters"; // Impor fungsi baru

// --- Interface & Tipe ---
interface FormData {
  budget: string;
  downPaymentPercent: string;
  loanTerm: string;
  interestRate: string;
}

interface FormErrors {
  [key: string]: string | undefined;
}

interface LoanFormProps {
  onCalculate: (data: { [K in keyof FormData]: number }) => void;
}

// --- Komponen Input Kustom untuk mengurangi repetisi ---
interface FormInputProps {
  id: keyof FormData;
  label: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  unit?: string;
  placeholder?: string;
  info?: string | React.ReactNode;
  isCurrency?: boolean;
}

const FormInput: FC<FormInputProps> = ({
  id,
  label,
  value,
  onChange,
  error,
  unit,
  placeholder,
  info,
  isCurrency,
}) => (
  <div>
    <label
      htmlFor={id}
      className="block text-sm font-medium text-gray-900 mb-1"
    >
      {label}
    </label>
    <div className="relative">
      {isCurrency && (
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <span className="text-gray-500 sm:text-sm">Rp</span>
        </div>
      )}
      <input
        type="text"
        id={id}
        name={id}
        value={isCurrency ? formatCurrency(value) : value}
        onChange={onChange}
        className={`w-full py-2 text-gray-900 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          isCurrency
            ? "pl-9 pr-3"
            : `pr-${unit ? String(unit).length * 4 : 3} pl-3`
        } ${error ? "border-red-500" : "border-gray-300"}`}
        placeholder={placeholder}
        inputMode={id === "interestRate" ? "decimal" : "numeric"}
      />
      {unit && (
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <span className="text-gray-500 sm:text-sm">{unit}</span>
        </div>
      )}
    </div>
    {info && <p className="mt-1 text-xs text-gray-600">{info}</p>}
    {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
  </div>
);

// --- Komponen Form Utama ---
export default function CarLoanBudgetForm({ onCalculate }: LoanFormProps) {
  const [formData, setFormData] = useState<FormData>({
    budget: "2500000",
    downPaymentPercent: "30",
    loanTerm: "5",
    interestRate: "4.6",
  });
  const [errors, setErrors] = useState<FormErrors>({});

  // Gunakan `useMemo` untuk kalkulasi agar tidak dihitung ulang setiap render
  const { loanTermMonths, monthlyInterestRate } = useMemo(() => {
    const term = parseFloat(formData.loanTerm) || 0;
    const rate = parseFloat(formData.interestRate.replace(",", ".")) || 0;
    return {
      loanTermMonths: term * 12,
      monthlyInterestRate: rate / 12,
    };
  }, [formData.loanTerm, formData.interestRate]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // Gunakan parser untuk membersihkan input secara real-time
    const cleanedValue = parseToNumericString(value);

    setFormData((prev) => ({ ...prev, [name]: cleanedValue }));
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    const { budget, downPaymentPercent, loanTerm, interestRate } = formData;

    if (parseFloat(budget) <= 0)
      newErrors.budget = "Budget angsuran harus angka positif.";
    if (
      parseFloat(downPaymentPercent) <= 0 ||
      parseFloat(downPaymentPercent) >= 100
    )
      newErrors.downPaymentPercent = "Uang muka harus antara 1-99%.";
    if (!Number.isInteger(parseFloat(loanTerm)) || parseFloat(loanTerm) <= 0)
      newErrors.loanTerm = "Tenor harus bilangan bulat positif.";
    if (parseFloat(interestRate.replace(",", ".")) < 0)
      newErrors.interestRate = "Suku bunga tidak boleh negatif.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (validateForm()) {
      // Konversi semua nilai string ke number sebelum dikirim
      const numericData = Object.fromEntries(
        Object.entries(formData).map(([key, value]) => [
          key,
          parseFloat(value.replace(",", ".")),
        ])
      ) as { [K in keyof FormData]: number };
      onCalculate(numericData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <FormInput
        id="budget"
        label="Budget Angsuran (per bulan)"
        value={formData.budget}
        onChange={handleInputChange}
        error={errors.budget}
        placeholder="2.500.000"
        isCurrency
      />
      <FormInput
        id="downPaymentPercent"
        label="Uang Muka (DP)"
        value={formData.downPaymentPercent}
        onChange={handleInputChange}
        error={errors.downPaymentPercent}
        unit="%"
        placeholder="30"
        info="(persen dari harga OTR)"
      />
      <FormInput
        id="loanTerm"
        label="Tenor (jangka waktu)"
        value={formData.loanTerm}
        onChange={handleInputChange}
        error={errors.loanTerm}
        unit="tahun"
        placeholder="5"
        info={`= ${loanTermMonths} bulan`}
      />
      <FormInput
        id="interestRate"
        label="Bunga Pinjaman (flat)"
        value={formData.interestRate}
        onChange={handleInputChange}
        error={errors.interestRate}
        unit="% / tahun"
        placeholder="4.6"
        info={`= ${monthlyInterestRate.toFixed(3)}% / bulan`}
      />

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 font-medium"
      >
        Hitung Simulasi
      </button>
    </form>
  );
}


carloan/simple/form
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

export default function CarLoanSimpleForm({ onCalculate }: CarLoanSimpleFormProps) {
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



