
promt
Buatkan perhitungan kalkulator Kredit usaha rakyat, taruh di folder other-kredit

perhitungannya begini , initial nya Suku Bunga : 6%, tapi bisa input dinamis

Referensi

types/common.ts
export interface AmortizationItem {
  period: number;
  payment: number;
  principal: number;
  interest: number;
  remainingBalance: number;
}

export interface CommonLoanResult {
  loanAmount: number;
  monthlyPayment?: number;
  monthlyPrincipal: number;
  monthlyInterest: number;
  totalPayment?: number;
  totalInterest?: number;
  amortizationSchedule: AmortizationItem[];
}

types/car-loan.ts
import { AmortizationItem, CommonLoanResult } from './common';

// Car Loan Budget Types
export interface CarLoanBudgetResult extends CommonLoanResult {
  carPrice: number;
  downPaymentAmount: number;
  firstPayment: number;
}

// Car Loan Complete Types
export interface CarLoanCompleteResult extends CommonLoanResult {
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
  insuranceAmount: number;
  provisionAmount: number;
  policyFee: number;
  adminFee: number;
  firstPayment: number;
}

// Car Loan Simple Types
export interface CarLoanSimpleResult extends CommonLoanResult {
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
  firstPayment: number;
}

├── src
│   ├── app
│   │   ├── (calculators)
│   │   │   ├── car-loan
│   │   │   │   ├── budget
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── complete
│   │   │   │   │   └── page.tsx
│   │   │   │   └── simple
│   │   │   │       └── page.tsx
│   │   │   ├── mortgage
│   │   │   │   ├── budget
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── complete
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── fixed
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── house-price
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── income
│   │   │   │   │   └── page.tsx
│   │   │   │   └── islamic-mortgage
│   │   │   │       └── page.tsx
│   │   │   ├── other-kredit
│   │   │   │   └── multi-purpose-loan
│   │   │   │       └── page.tsx
│   │   │   └── personal-loan
│   │   │       ├── amount
│   │   │       │   └── page.tsx
│   │   │       └── budget
│   │   │           └── page.tsx
│   │   ├── favicon.ico
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components
│   │   ├── car-loan
│   │   │   ├── budget
│   │   │   │   ├── CarLoanBudgetForm.tsx
│   │   │   │   ├── CarLoanBudgetResult.tsx
│   │   │   │   ├── CarLoanBudgetSchedule.tsx
│   │   │   │   └── index.ts
│   │   │   ├── complete
│   │   │   │   ├── CarLoanForm.tsx
│   │   │   │   ├── CarLoanResult.tsx
│   │   │   │   ├── CarLoanSchedule.tsx
│   │   │   │   └── index.ts
│   │   │   └── simple
│   │   │       ├── CarLoanSimpleForm.tsx
│   │   │       ├── CarLoanSimpleResult.tsx
│   │   │       ├── CarLoanSimpleSchedule.tsx
│   │   │       └── index.ts
│   │   ├── common
│   │   │   ├── Footer.tsx
│   │   │   ├── Header.tsx
│   │   │   └── index.ts
│   │   ├── mortgage
│   │   │   ├── budget
│   │   │   │   ├── MortgageBudgetForm.tsx
│   │   │   │   ├── MortgageBudgetResult.tsx
│   │   │   │   ├── MortgageBudgetSchedule.tsx
│   │   │   │   └── index.ts
│   │   │   ├── complete
│   │   │   │   ├── MortgageCompleteForm.tsx
│   │   │   │   ├── MortgageCompleteResult.tsx
│   │   │   │   ├── MortgageCompleteSchedule.tsx
│   │   │   │   └── index.ts
│   │   │   ├── fixed
│   │   │   │   ├── MortgageFixedForm.tsx
│   │   │   │   ├── MortgageFixedResult.tsx
│   │   │   │   ├── MortgageFixedSchedule.tsx
│   │   │   │   └── index.ts
│   │   │   ├── house-price
│   │   │   │   ├── MortgageHousePriceForm.tsx
│   │   │   │   ├── MortgageHousePriceResult.tsx
│   │   │   │   ├── MortgageHousePriceSchedule.tsx
│   │   │   │   └── index.ts
│   │   │   ├── income
│   │   │   │   ├── MortgageIncomeForm.tsx
│   │   │   │   ├── MortgageIncomeResult.tsx
│   │   │   │   ├── MortgageIncomeSchedule.tsx
│   │   │   │   └── index.ts
│   │   │   └── islamic-mortgage
│   │   │       ├── IslamicMortgageForm.tsx
│   │   │       ├── IslamicMortgageResult.tsx
│   │   │       ├── IslamicMortgageSchedule.tsx
│   │   │       └── index.ts
│   │   ├── other-kredit
│   │   │   └── multi-purpose-loan
│   │   │       ├── MultiPurposeLoanForm.tsx
│   │   │       ├── MultiPurposeLoanResult.tsx
│   │   │       ├── MultiPurposeLoanSchedule.tsx
│   │   │       └── index.ts
│   │   └── personal-loan
│   │       ├── amount
│   │       │   ├── PersonalLoanAmountForm.tsx
│   │       │   ├── PersonalLoanAmountResult.tsx
│   │       │   ├── PersonalLoanAmountSchedule.tsx
│   │       │   └── index.ts
│   │       └── budget
│   │           ├── PersonalLoanForm.tsx
│   │           ├── PersonalLoanResult.tsx
│   │           ├── PersonalLoanSchedule.tsx
│   │           └── index.ts
│   ├── types
│   │   ├── car-loan.ts
│   │   ├── common.ts
│   │   ├── islamic-mortgage.ts
│   │   ├── mortgage-budget.ts
│   │   ├── mortgage-fixed.ts
│   │   ├── mortgage-house-price.ts
│   │   ├── mortgage-income.ts
│   │   ├── mortgage.ts
│   │   ├── multi-purpose-loan.ts
│   │   ├── personal-loan-amount.ts
│   │   └── personal-loan.ts
│   └── utils
│       ├── calculators
│       │   ├── car-loan
│       │   │   ├── budgetCalculator.ts
│       │   │   ├── completeCalculator.ts
│       │   │   └── simpleCalculator.ts
│       │   ├── mortgage
│       │   │   ├── budgetCalculator.ts
│       │   │   ├── fixedCalculator.ts
│       │   │   ├── housePriceCalculator.ts
│       │   │   ├── incomeCalculator.ts
│       │   │   ├── islamicMortgageCalculator.ts
│       │   │   └── mortgageCalculator.ts
│       │   ├── other-kredit
│       │   │   └── multiPurposeLoanCalculator.ts
│       │   └── personal-loan
│       │       ├── personalLoanAmountCalculator.ts
│       │       └── personalLoanCalculator.ts
│       ├── formatters.ts
│       └── index.ts
└── tsconfig.json



page.tsx
"use client";

import { useState } from "react";
import { CarLoanForm, CarLoanResult, CarLoanSchedule } from "@/components/car-loan/complete";
import { Header, Footer } from "@/components/common";
import { calculateLoan } from "@/utils/calculators/car-loan/completeCalculator";
import { AmortizationItem } from "@/types/common";
import { CarLoanCompleteResult as LoanDetails } from "@/types/car-loan";

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

export default function CarLoanCompletePage(): JSX.Element {
  const [loanDetails, setLoanDetails] = useState<LoanDetails | null>(null);
  const [schedule, setSchedule] = useState<AmortizationItem[]>([]);
  const [showResults, setShowResults] = useState<boolean>(false);

  // Handle form calculation
  const handleCalculate = (formData: FormData): void => {
    const calculationResult = calculateLoan(
      formData.carPrice,
      formData.downPaymentPercent,
      formData.loanTerm,
      formData.interestRate,
      formData.insurancePercent,
      formData.provisionPercent,
      formData.policyFee,
      formData.adminFee
    );
    
    setLoanDetails({
      carPrice: formData.carPrice,
      downPaymentPercent: formData.downPaymentPercent,
      downPaymentAmount: formData.carPrice * (formData.downPaymentPercent / 100),
      loanTerm: formData.loanTerm,
      interestRate: formData.interestRate,
      monthlyInterestRate: formData.interestRate / 12,
      loanAmount: calculationResult.loanAmount,
      monthlyPayment: calculationResult.monthlyPayment,
      monthlyPrincipal: calculationResult.monthlyPrincipal,
      monthlyInterest: calculationResult.monthlyInterest,
      totalPayment: calculationResult.totalPayment,
      totalInterest: calculationResult.totalInterest,
      insurancePercent: formData.insurancePercent,
      insuranceAmount: calculationResult.insuranceAmount,
      provisionPercent: formData.provisionPercent,
      provisionAmount: calculationResult.provisionAmount,
      policyFee: formData.policyFee,
      adminFee: formData.adminFee,
      firstPayment: calculationResult.firstPayment,
      amortizationSchedule: calculationResult.amortizationSchedule
    });
    
    setSchedule(calculationResult.amortizationSchedule);
    setShowResults(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <div className="container mx-auto py-8 px-4 flex-grow">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">
          Simulasi Kredit Mobil Lengkap
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 bg-white p-6 rounded-lg shadow-md">
            <CarLoanForm onCalculate={handleCalculate} />
          </div>
          
          <div className="lg:col-span-2">
            {showResults && loanDetails && (
              <div className="space-y-6">
                <CarLoanResult loanDetails={loanDetails} />
                <CarLoanSchedule schedule={schedule} />
              </div>
            )}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}



Form
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

export default function LoanForm({ onCalculate }: LoanFormProps): JSX.Element {
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


Result
"use client";

import { useState } from "react";
import { formatCurrency } from "@/utils/formatters";
import { jsPDF } from "jspdf";

interface LoanResultProps {
  loanDetails: {
    carPrice: number;
    downPaymentPercent: number;
    downPaymentAmount: number;
    loanTerm: number;
    interestRate: number;
    monthlyInterestRate: number;
    loanAmount: number;
    monthlyPayment: number;
    monthlyPrincipal: number;
    monthlyInterest: number;
    totalPayment: number;
    totalInterest: number;
    insurancePercent: number;
    insuranceAmount: number;
    provisionPercent: number;
    provisionAmount: number;
    policyFee: number;
    adminFee: number;
    firstPayment: number;
  };
}

export default function LoanResult({ loanDetails }: LoanResultProps) {
  const [activeTab, setActiveTab] = useState("info");

  // Helper function to safely format currency and handle NaN values
  const safeFormatCurrency = (value: number) => {
    if (isNaN(value) || !isFinite(value)) {
      return "Rp 0";
    }
    return formatCurrency(value);
  };

  // Helper function to safely format percentage
  const safeFormatPercent = (value: number) => {
    if (isNaN(value) || !isFinite(value)) {
      return "0";
    }
    return value.toString();
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();
    
    // Add title
    doc.setFontSize(18);
    doc.text("Simulasi Kredit Mobil", 105, 15, { align: "center" });
    
    // Add loan details
    doc.setFontSize(12);
    doc.text("Informasi Pinjaman", 14, 30);
    
    const loanInfo = [
      ["Harga Mobil OTR", safeFormatCurrency(loanDetails.carPrice)],
      ["Uang Muka (DP)", `${safeFormatCurrency(loanDetails.downPaymentAmount)} (${safeFormatPercent(loanDetails.downPaymentPercent)}%)`],
      ["Tenor", `${loanDetails.loanTerm} tahun (${loanDetails.loanTerm * 12} bulan)`],
      ["Bunga (Flat)", `${safeFormatPercent(loanDetails.interestRate)}% / tahun (${(loanDetails.interestRate / 12).toFixed(2)}% / bulan)`],
      ["Plafon Pinjaman", safeFormatCurrency(loanDetails.loanAmount)],
      ["Angsuran per Bulan", safeFormatCurrency(loanDetails.monthlyPayment)],
      ["Total Pembayaran", safeFormatCurrency(loanDetails.totalPayment)]
    ];
    
    (doc as any).autoTable({
      startY: 35,
      head: [["Keterangan", "Nilai"]],
      body: loanInfo,
      theme: "grid",
      headStyles: { fillColor: [66, 133, 244] }
    });
    
    doc.save("simulasi-kredit-mobil.pdf");
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="flex border-b">
        <button
          className={`flex-1 py-3 px-4 text-center font-medium ${
            activeTab === "info" ? "bg-blue-50 text-blue-600 border-b-2 border-blue-600" : "text-gray-600"
          }`}
          onClick={() => setActiveTab("info")}
        >
          Informasi Pinjaman
        </button>
        <button
          className={`flex-1 py-3 px-4 text-center font-medium ${
            activeTab === "payment" ? "bg-blue-50 text-blue-600 border-b-2 border-blue-600" : "text-gray-600"
          }`}
          onClick={() => setActiveTab("payment")}
        >
          Pembayaran
        </button>
      </div>
        
      <div className="p-6">
        {activeTab === "info" && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Informasi Pinjaman Anda</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Harga Mobil OTR:</p>
                <p className="text-lg font-bold text-gray-900">{safeFormatCurrency(loanDetails.carPrice)}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-600">Uang Muka (DP):</p>
                <p className="text-lg font-bold text-gray-900">
                  {safeFormatCurrency(loanDetails.downPaymentAmount)}
                  <span className="text-sm font-normal text-gray-500 ml-1">
                    ({safeFormatPercent(loanDetails.downPaymentPercent)}%)
                  </span>
                </p>
              </div>
              
              <div>
                <p className="text-sm text-gray-600">Tenor:</p>
                <p className="text-lg font-bold text-gray-900">
                  {loanDetails.loanTerm} tahun
                  <span className="text-sm font-normal text-gray-500 ml-1">
                    ({loanDetails.loanTerm * 12} bulan)
                  </span>
                </p>
              </div>
              
              <div>
                <p className="text-sm text-gray-600">Bunga (Flat):</p>
                <p className="text-lg font-bold text-gray-900">
                  {safeFormatPercent(loanDetails.interestRate)}% / tahun
                  <span className="text-sm font-normal text-gray-500 ml-1">
                    ({(loanDetails.interestRate / 12).toFixed(2)}% / bulan)
                  </span>
                </p>
              </div>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-3">Plafon Pinjaman Anda</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-900">Harga Mobil OTR:</span>
                  <span className="font-medium text-gray-900">{safeFormatCurrency(loanDetails.carPrice)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-900">Uang Muka (DP):</span>
                  <span className="font-medium text-gray-900">- {safeFormatCurrency(loanDetails.downPaymentAmount)}</span>
                </div>
                <div className="border-t border-blue-200 my-2 pt-2 flex justify-between">
                  <span className="font-medium text-gray-900">Plafon Pinjaman Anda:</span>
                  <span className="font-bold text-blue-700">{safeFormatCurrency(loanDetails.loanAmount)}</span>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-3">Biaya Lain</h3>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between">
                    <span className="text-gray-900">Asuransi:</span>
                    <span className="font-medium text-gray-900">{safeFormatCurrency(loanDetails.insuranceAmount)}</span>
                  </div>
                  <p className="text-xs text-gray-500">({safeFormatPercent(loanDetails.insurancePercent)}% dari harga OTR)</p>
                </div>
                
                <div>
                  <div className="flex justify-between">
                    <span className="text-gray-900">Provisi:</span>
                    <span className="font-medium text-gray-900">{safeFormatCurrency(loanDetails.provisionAmount)}</span>
                  </div>
                  <p className="text-xs text-gray-500">({safeFormatPercent(loanDetails.provisionPercent)}% dari plafon)</p>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-900">Polis Asuransi:</span>
                  <span className="font-medium text-gray-900">{safeFormatCurrency(loanDetails.policyFee)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-900">Administrasi:</span>
                  <span className="font-medium text-gray-900">{safeFormatCurrency(loanDetails.adminFee)}</span>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === "payment" && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Informasi Pembayaran</h2>
            
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-3">Angsuran per Bulan</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-900">Angsuran Pokok per Bulan:</span>
                  <span className="font-medium text-gray-900">{safeFormatCurrency(loanDetails.monthlyPrincipal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-900">Angsuran Bunga per Bulan:</span>
                  <span className="font-medium text-gray-900">{safeFormatCurrency(loanDetails.monthlyInterest)}</span>
                </div>
                <div className="border-t border-green-200 my-2 pt-2">
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-900">Total Angsuran per Bulan:</span>
                    <span className="font-bold text-green-700">{safeFormatCurrency(loanDetails.monthlyPayment)}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-3">Pembayaran Pertama Kali</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-900">Uang Muka (DP):</span>
                  <span className="font-medium text-gray-900">{safeFormatCurrency(loanDetails.downPaymentAmount)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-900">Angsuran Pertama:</span>
                  <span className="font-medium text-gray-900">{safeFormatCurrency(loanDetails.monthlyPayment)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-900">Asuransi:</span>
                  <span className="font-medium text-gray-900">{safeFormatCurrency(loanDetails.insuranceAmount)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-900">Provisi:</span>
                  <span className="font-medium text-gray-900">{safeFormatCurrency(loanDetails.provisionAmount)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-900">Polis Asuransi:</span>
                  <span className="font-medium text-gray-900">{safeFormatCurrency(loanDetails.policyFee)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-900">Administrasi:</span>
                  <span className="font-medium text-gray-900">{safeFormatCurrency(loanDetails.adminFee)}</span>
                </div>
                <div className="border-t border-purple-200 my-2 pt-2">
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-900">Total Pembayaran Pertama:</span>
                    <span className="font-bold text-purple-700">{safeFormatCurrency(loanDetails.firstPayment)}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-indigo-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-3">Total Pembayaran</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-900">Total Pokok:</span>
                  <span className="font-medium text-gray-900">{safeFormatCurrency(loanDetails.loanAmount)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-900">Total Bunga:</span>
                  <span className="font-medium text-gray-900">{safeFormatCurrency(loanDetails.totalInterest)}</span>
                </div>
                <div className="border-t border-indigo-200 my-2 pt-2">
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-900">Total Pembayaran:</span>
                    <span className="font-bold text-indigo-700">{safeFormatCurrency(loanDetails.totalPayment)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div className="mt-6">
          <button
            onClick={handleExportPDF}
            className="flex items-center justify-center w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Export PDF
          </button>
        </div>
      </div>
    </div>
  );
}



Schedule

"use client";

import { useState, useMemo } from "react";
import { formatCurrency } from "@/utils/formatters";

interface ScheduleItem {
  period: number;
  payment: number;
  principal: number;
  interest: number;
  remainingBalance: number;
}

interface LoanScheduleProps {
  schedule: ScheduleItem[];
}

export default function LoanSchedule({ schedule }: LoanScheduleProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const totalPages = Math.ceil(schedule.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = schedule.slice(startIndex, startIndex + itemsPerPage);

    // Hitung total akumulasi
  const { totalInterest, totalPrincipal, totalPayment } = useMemo(() => {
    return schedule.reduce((acc, item) => ({
      totalInterest: acc.totalInterest + item.interest,
      totalPrincipal: acc.totalPrincipal + item.principal,
      totalPayment: acc.totalPayment + item.payment,
    }), {
      totalInterest: 0,
      totalPrincipal: 0,
      totalPayment: 0
    });
  }, [schedule]);

  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Tabel Angsuran
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Bulan
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Angsuran Bunga
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Angsuran Pokok
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Total Angsuran
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Sisa Pinjaman
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentItems.map((item) => (
              <tr
                key={item.period}
                className={item.period % 2 === 0 ? "bg-gray-50" : ""}
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                  {item.period}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatCurrency(item.interest)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatCurrency(item.principal)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-medium">
                  {formatCurrency(item.payment)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatCurrency(item.remainingBalance)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between border-t border-gray-200 px-4 py-3 sm:px-6 mt-4">
          <div className="flex flex-1 justify-between sm:hidden">
            <button
              onClick={() => goToPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className={`relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium ${
                currentPage === 1
                  ? "text-gray-300"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              Previous
            </button>
            <button
              onClick={() => goToPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className={`relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium ${
                currentPage === totalPages
                  ? "text-gray-300"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              Next
            </button>
          </div>
          <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">{startIndex + 1}</span> to{" "}
                <span className="font-medium">
                  {Math.min(startIndex + itemsPerPage, schedule.length)}
                </span>{" "}
                of <span className="font-medium">{schedule.length}</span>{" "}
                results
              </p>
            </div>
            <div>
              <nav
                className="isolate inline-flex -space-x-px rounded-md shadow-sm"
                aria-label="Pagination"
              >
                <button
                  onClick={() => goToPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className={`relative inline-flex items-center rounded-l-md px-2 py-2 ${
                    currentPage === 1
                      ? "text-gray-300"
                      : "text-gray-400 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                  }`}
                >
                  <span className="sr-only">Previous</span>
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>

                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }

                  return (
                    <button
                      key={pageNum}
                      onClick={() => goToPage(pageNum)}
                      className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
                        currentPage === pageNum
                          ? "z-10 bg-blue-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                          : "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}

                <button
                  onClick={() =>
                    goToPage(Math.min(totalPages, currentPage + 1))
                  }
                  disabled={currentPage === totalPages}
                  className={`relative inline-flex items-center rounded-r-md px-2 py-2 ${
                    currentPage === totalPages
                      ? "text-gray-300"
                      : "text-gray-400 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                  }`}
                >
                  <span className="sr-only">Next</span>
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </nav>
            </div>
          </div>
        </div>
      )}

      {/* Summary Section */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-md">
        <div>
          <p className="text-sm text-gray-600">Total Bunga:</p>
          <p className="text-lg font-semibold text-gray-900">
            {formatCurrency(totalInterest)}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Total Pokok:</p>
          <p className="text-lg font-semibold text-gray-900">
            {formatCurrency(totalPrincipal)}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Total Angsuran:</p>
          <p className="text-lg font-semibold text-gray-900">
            {formatCurrency(totalPayment)}
          </p>
        </div>
      </div>
    </div>
  );
}


import make easier
export { default as CarLoanForm } from './CarLoanForm';
export { default as CarLoanResult } from './CarLoanResult';
export { default as CarLoanSchedule } from './CarLoanSchedule';


car-LoanDetails.ts
export interface CarLoanCompleteResult extends CommonLoanResult {
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
  insuranceAmount: number;
  provisionAmount: number;
  policyFee: number;
  adminFee: number;
  firstPayment: number;
}


calculator
// Interface for amortization schedule item
interface AmortizationItem {
  period: number;
  payment: number;
  principal: number;
  interest: number;
  remainingBalance: number;
}

// Interface for calculation result
interface CalculationResult {
  loanAmount: number;
  monthlyPayment: number;
  monthlyPrincipal: number;
  monthlyInterest: number;
  totalPayment: number;
  totalInterest: number;
  insuranceAmount: number;
  provisionAmount: number;
  policyFee: number;
  adminFee: number;
  firstPayment: number;
  amortizationSchedule: AmortizationItem[];
}

/**
 * Calculate loan details using flat rate method
 * @param carPrice - On The Road price of the car
 * @param downPaymentPercent - Down payment percentage
 * @param loanTermYears - Loan term in years
 * @param annualInterestRate - Annual interest rate percentage
 * @param insurancePercent - Insurance percentage
 * @param provisionPercent - Provision percentage
 * @param policyFee - Policy fee amount
 * @param adminFee - Administration fee amount
 * @returns Calculation result with all loan details
 */
export function calculateLoan(
  carPrice: number,
  downPaymentPercent: number,
  loanTermYears: number,
  annualInterestRate: number,
  insurancePercent: number,
  provisionPercent: number,
  policyFee: number,
  adminFee: number
): CalculationResult {
  // Calculate basic loan parameters
  const downPaymentAmount: number = carPrice * (downPaymentPercent / 100);
  const loanAmount: number = carPrice - downPaymentAmount;
  const loanTermMonths: number = loanTermYears * 12;
  
  // Calculate insurance and provision amounts
  const insuranceAmount: number = carPrice * (insurancePercent / 100);
  const provisionAmount: number = loanAmount * (provisionPercent / 100);
  
  // Calculate monthly payments using flat rate method
  const monthlyPrincipal: number = loanAmount / loanTermMonths;
  const monthlyInterest: number = loanAmount * (annualInterestRate / 100) / 12;
  const monthlyPayment: number = monthlyPrincipal + monthlyInterest;
  
  // Calculate totals
  const totalPayment: number = monthlyPayment * loanTermMonths;
  const totalInterest: number = monthlyInterest * loanTermMonths;
  
  // Calculate first payment (all upfront costs)
  const firstPayment: number = downPaymentAmount + monthlyPayment + insuranceAmount + provisionAmount + policyFee + adminFee;
  
  // Generate amortization schedule for flat rate
  const amortizationSchedule: AmortizationItem[] = [];
  let remainingBalance: number = loanAmount;
  
  for (let period: number = 1; period <= loanTermMonths; period++) {
    remainingBalance -= monthlyPrincipal;
    
    // Ensure the last payment eliminates any rounding errors
    const adjustedRemainingBalance: number = period === loanTermMonths ? 0 : remainingBalance;
    
    amortizationSchedule.push({
      period,
      payment: monthlyPayment,
      principal: monthlyPrincipal,
      interest: monthlyInterest,
      remainingBalance: adjustedRemainingBalance
    });
  }
  
  return {
    loanAmount,
    monthlyPayment,
    monthlyPrincipal,
    monthlyInterest,
    totalPayment,
    totalInterest,
    insuranceAmount,
    provisionAmount,
    policyFee,
    adminFee,
    firstPayment,
    amortizationSchedule
  };
}
