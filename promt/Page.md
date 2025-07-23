Refactor code ini ikuti referensi
HouesPriceCalculator
import { AmortizationItem } from "@/types/common";

interface CalculationResult {
  loanAmount: number;
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
  minimumIncome30: number;
  minimumIncome33: number;
  minimumIncome40: number;
  provisionAmount: number;
  adminAmount: number;
  amortizationSchedule: AmortizationItem[];
}

/**
 * Calculate mortgage details based on house price
 * @param housePrice - House price
 * @param downPaymentPercent - Down payment percentage
 * @param loanTermYears - Loan term in years
 * @param annualInterestRate - Annual interest rate percentage
 * @param calculationMethod - Calculation method (anuitas or flat)
 * @returns Calculation result with all mortgage details
 */
export function calculateMortgage(
  housePrice: number,
  downPaymentPercent: number,
  loanTermYears: number,
  annualInterestRate: number,
  calculationMethod: 'anuitas' | 'flat' = 'anuitas'
): CalculationResult {
  // Calculate basic mortgage parameters
  const downPaymentAmount: number = housePrice * (downPaymentPercent / 100);
  const loanAmount: number = housePrice - downPaymentAmount;
  const loanTermMonths: number = loanTermYears * 12;
  const monthlyInterestRate: number = annualInterestRate / 100 / 12;
  
  // Calculate bank fees
  const provisionPercent: number = 1; // 1% dari plafon
  const adminPercent: number = 0.1; // 0.1% dari plafon
  const provisionAmount: number = loanAmount * (provisionPercent / 100);
  const adminAmount: number = loanAmount * (adminPercent / 100);
  
  let monthlyPayment: number;
  let totalPayment: number;
  let totalInterest: number;
  let amortizationSchedule: AmortizationItem[] = [];
  
  if (calculationMethod === 'anuitas') {
    // Anuitas calculation
    if (monthlyInterestRate === 0) {
      monthlyPayment = loanAmount / loanTermMonths;
    } else {
      const factor = Math.pow(1 + monthlyInterestRate, loanTermMonths);
      monthlyPayment = loanAmount * (monthlyInterestRate * factor) / (factor - 1);
    }
    
    totalPayment = monthlyPayment * loanTermMonths;
    totalInterest = totalPayment - loanAmount;
    
    // Generate anuitas amortization schedule
    let remainingBalance = loanAmount;
    
    for (let period = 1; period <= loanTermMonths; period++) {
      const interestPayment = remainingBalance * monthlyInterestRate;
      const principalPayment = monthlyPayment - interestPayment;
      remainingBalance -= principalPayment;
      
      // Ensure the last payment eliminates any rounding errors
      const adjustedRemainingBalance = period === loanTermMonths ? 0 : remainingBalance;
      
      amortizationSchedule.push({
        period,
        payment: monthlyPayment,
        principal: principalPayment,
        interest: interestPayment,
        remainingBalance: Math.max(0, adjustedRemainingBalance)
      });
    }
  } else {
    // Flat rate calculation
    const monthlyPrincipal = loanAmount / loanTermMonths;
    const monthlyInterest = loanAmount * (annualInterestRate / 100) / 12;
    monthlyPayment = monthlyPrincipal + monthlyInterest;
    
    totalPayment = monthlyPayment * loanTermMonths;
    totalInterest = monthlyInterest * loanTermMonths;
    
    // Generate flat rate amortization schedule
    let remainingBalance = loanAmount;
    
    for (let period = 1; period <= loanTermMonths; period++) {
      remainingBalance -= monthlyPrincipal;
      
      const adjustedRemainingBalance = period === loanTermMonths ? 0 : remainingBalance;
      
      amortizationSchedule.push({
        period,
        payment: monthlyPayment,
        principal: monthlyPrincipal,
        interest: monthlyInterest,
        remainingBalance: Math.max(0, adjustedRemainingBalance)
      });
    }
  }
  
  // Calculate minimum income requirements
  const minimumIncome30 = monthlyPayment / 0.30; // 30% dari penghasilan
  const minimumIncome33 = monthlyPayment / (1/3); // 1/3 dari penghasilan
  const minimumIncome40 = monthlyPayment / 0.40; // 40% dari penghasilan
  
  return {
    loanAmount,
    monthlyPayment,
    totalPayment,
    totalInterest,
    minimumIncome30,
    minimumIncome33,
    minimumIncome40,
    provisionAmount,
    adminAmount,
    amortizationSchedule
  };
}


"use client";

import { useState } from "react";
import {
  MortgageHousePriceForm,
  MortgageHousePriceResult,
  MortgageHousePriceSchedule,
} from "@/features/mortgage/house-price";
import { Header, Footer } from "@/components/layout/";

import { calculateMortgage } from "@/utils/calculators/mortgage/housePriceCalculator";
import { AmortizationItem } from "@/types/common";
import {
  MortgageHousePriceResult as MortgageDetails,
  MortgageHousePriceFormData,
} from "@/types/mortgage-house-price";

export default function MortgageHousePricePage() {
  const [mortgageDetails, setMortgageDetails] =
    useState<MortgageDetails | null>(null);
  const [schedule, setSchedule] = useState<AmortizationItem[]>([]);
  const [showResults, setShowResults] = useState<boolean>(false);

  const handleCalculate = (formData: MortgageHousePriceFormData): void => {
    const calculationResult = calculateMortgage(
      formData.housePrice,
      formData.downPaymentPercent,
      formData.loanTerm,
      formData.annualInterestRate,
      formData.calculationMethod
    );

    const downPaymentAmount =
      formData.housePrice * (formData.downPaymentPercent / 100);
    const monthlyInterestRate = formData.annualInterestRate / 12;

    setMortgageDetails({
      housePrice: formData.housePrice,
      downPaymentPercent: formData.downPaymentPercent,
      downPaymentAmount: downPaymentAmount,
      loanTerm: formData.loanTerm,
      loanTermMonths: formData.loanTerm * 12,
      annualInterestRate: formData.annualInterestRate,
      monthlyInterestRate: monthlyInterestRate,
      loanAmount: calculationResult.loanAmount,
      monthlyPayment: calculationResult.monthlyPayment,
      totalPayment: calculationResult.totalPayment,
      totalInterest: calculationResult.totalInterest,
      calculationMethod: formData.calculationMethod,
      minimumIncome30: calculationResult.minimumIncome30,
      minimumIncome33: calculationResult.minimumIncome33,
      minimumIncome40: calculationResult.minimumIncome40,
      provisionPercent: 1,
      provisionAmount: calculationResult.provisionAmount,
      adminPercent: 0.1,
      adminAmount: calculationResult.adminAmount,
      amortizationSchedule: calculationResult.amortizationSchedule,
    });

    setSchedule(calculationResult.amortizationSchedule);
    setShowResults(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <div className="container mx-auto py-8 px-4 flex-grow">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">
          Simulasi KPR - Berdasar Harga Rumah
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 bg-white p-6 rounded-lg shadow-md">
            <MortgageHousePriceForm onCalculate={handleCalculate} />
          </div>

          <div className="lg:col-span-2">
            {showResults && mortgageDetails && (
              <div className="space-y-6">
                <MortgageHousePriceResult mortgageDetails={mortgageDetails} />
                <MortgageHousePriceSchedule schedule={schedule} />
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}


Referensi
"use client";

// Impor untuk fitur spesifik (Budget)
import {
  CarLoanBudgetForm,
  CarLoanBudgetResult,
  CarLoanBudgetSchedule,
} from "@/features/car-loan/budget";
import { calculateLoanFromBudget } from "@/utils/calculators/car-loan/budgetCalculator";
import { CarLoanBudgetResult as LoanDetails } from "@/types/car-loan";

// Impor untuk layout dan komponen reusable baru kita
import { Header, Footer } from "@/components/layout";
import { LoanCalculatorController } from "@/components/ui/loan";
interface CarLoanBudgetFormInput {
  budget: number;
  downPaymentPercent: number;
  loanTerm: number;
  interestRate: number;
}

export default function CarLoanBudgetPage() {
  // 1. Logika kalkulasi dan transformasi data diekstrak ke fungsi murni.
  // Fungsi ini akan kita teruskan sebagai prop ke controller.
  const performBudgetCalculation = (
    formData: CarLoanBudgetFormInput
  ): LoanDetails => {
    const { budget, downPaymentPercent, loanTerm, interestRate } = formData;
    const calculationResult = calculateLoanFromBudget(
      budget,
      downPaymentPercent,
      loanTerm,
      interestRate
    );

    // Menggabungkan hasil kalkulasi dengan data dari form untuk membentuk objek state akhir
    return {
      ...calculationResult,
      downPaymentPercent,
      loanTerm,
      interestRate,
      monthlyInterestRate: interestRate / 12 / 100,
      monthlyPayment: budget,
    };
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="container mx-auto py-10 px-4 flex-grow">
        {/* 2. Gunakan controller reusable. Semua state dan layout ada di dalamnya. */}
        <LoanCalculatorController
          pageTitle="Kalkulator KKB Berdasarkan Budget"
          pageDescription="Masukkan budget angsuran bulanan Anda untuk mengetahui estimasi harga mobil yang bisa Anda dapatkan."
          FormComponent={CarLoanBudgetForm}
          performCalculation={performBudgetCalculation}
        >
          {/* 3. Gunakan pola "render prop" untuk mendefinisikan bagaimana hasil ditampilkan */}
          {(loanDetails) => (
            <>
              <CarLoanBudgetResult loanDetails={loanDetails} />
              <CarLoanBudgetSchedule loanDetails={loanDetails} />
            </>
          )}
        </LoanCalculatorController>
      </main>
      <Footer />
    </div>
  );
}
