// src/app/(calculators)/mortgage/budget/page.tsx
"use client";

import { useState } from "react";
import {
  MortgageBudgetForm,
  MortgageBudgetResult,
  MortgageBudgetSchedule,
} from "@/features/mortgage/budget";
import { Header, Footer } from "@/features/common";
import { calculateMortgageBudget } from "@/utils/calculators/mortgage/budgetCalculator";
import { AmortizationItem } from "@/types/common";
import { MortgageBudgetResult as BudgetDetails } from "@/types/mortgage-budget";

interface FormData {
  monthlyBudget: number;
  downPaymentPercent: number;
  loanTerm: number;
  annualInterestRate: number;
  installmentPercent: number;
  provisionPercent: number;
  adminPercent: number;
}

export default function MortgageBudgetPage() {
  const [budgetDetails, setBudgetDetails] = useState<BudgetDetails | null>(
    null
  );
  const [schedule, setSchedule] = useState<AmortizationItem[]>([]);
  const [showResults, setShowResults] = useState<boolean>(false);

  const handleCalculate = (formData: FormData): void => {
    const calculationResult = calculateMortgageBudget(
      formData.monthlyBudget,
      formData.downPaymentPercent,
      formData.loanTerm,
      formData.annualInterestRate,
      formData.installmentPercent,
      formData.provisionPercent,
      formData.adminPercent
    );

    setBudgetDetails({
      // Basic loan info
      housePrice: calculationResult.maxHousePrice,
      downPaymentPercent: formData.downPaymentPercent,
      downPaymentAmount: calculationResult.minDownPayment,
      loanAmount: calculationResult.maxLoanAmount,
      loanTerm: formData.loanTerm,
      loanTermMonths: formData.loanTerm * 12,
      annualInterestRate: formData.annualInterestRate,
      monthlyInterestRate: formData.annualInterestRate / 12,
      calculationMethod: "Anuitas",

      // Budget specific fields
      monthlyBudget: formData.monthlyBudget,
      maxHousePrice: calculationResult.maxHousePrice,
      minDownPayment: calculationResult.minDownPayment,
      maxLoanAmount: calculationResult.maxLoanAmount,
      maxMonthlyPayment: calculationResult.maxMonthlyPayment,
      minMonthlyIncome: calculationResult.minMonthlyIncome,
      provisionPercent: formData.provisionPercent,
      provisionAmount: calculationResult.provisionAmount,
      adminPercent: formData.adminPercent,
      adminAmount: calculationResult.adminAmount,
      amortizationSchedule: calculationResult.amortizationSchedule,

      // Calculated totals
      monthlyPayment: calculationResult.maxMonthlyPayment,
      totalPayment:
        calculationResult.maxMonthlyPayment * formData.loanTerm * 12,
      totalInterest:
        calculationResult.maxMonthlyPayment * formData.loanTerm * 12 -
        calculationResult.maxLoanAmount,
      firstPayment:
        calculationResult.minDownPayment +
        calculationResult.maxMonthlyPayment +
        calculationResult.provisionAmount +
        calculationResult.adminAmount,
    });

    setSchedule(calculationResult.amortizationSchedule);
    setShowResults(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <div className="container mx-auto py-8 px-4 flex-grow">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">
          Simulasi KPR - Berdasar Budget
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 bg-white p-6 rounded-lg shadow-md">
            <MortgageBudgetForm onCalculate={handleCalculate} />
          </div>

          <div className="lg:col-span-2">
            {showResults && budgetDetails && (
              <div className="space-y-6">
                <MortgageBudgetResult budgetDetails={budgetDetails} />
                <MortgageBudgetSchedule schedule={schedule} />
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
