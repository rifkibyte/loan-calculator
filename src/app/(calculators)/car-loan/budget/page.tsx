"use client";

import { useState } from "react";
import {
  CarLoanBudgetForm,
  CarLoanBudgetResult,
  CarLoanBudgetSchedule,
} from "@/components/car-loan/budget";
import { Header, Footer } from "@/components/common";
import { calculateLoanFromBudget } from "@/utils/calculators/car-loan/budgetCalculator";
import { AmortizationItem } from "@/types/common";
import { CarLoanBudgetResult as LoanDetails } from "@/types/car-loan";

export default function CarLoanBudgetPage() {
  const [loanDetails, setLoanDetails] = useState<LoanDetails | null>(null);
  const [schedule, setSchedule] = useState<AmortizationItem[]>([]);
  const [showResults, setShowResults] = useState<boolean>(false);

  const handleCalculate = (formData: {
    budget: number;
    downPaymentPercent: number;
    loanTerm: number;
    interestRate: number;
  }): void => {
    const calculationResult = calculateLoanFromBudget(
      formData.budget,
      formData.downPaymentPercent,
      formData.loanTerm,
      formData.interestRate
    );

    setLoanDetails({
      carPrice: calculationResult.carPrice,
      downPaymentPercent: formData.downPaymentPercent,
      downPaymentAmount: calculationResult.downPaymentAmount,
      loanTerm: formData.loanTerm,
      interestRate: formData.interestRate,
      monthlyInterestRate: formData.interestRate / 12,
      loanAmount: calculationResult.loanAmount,
      monthlyPayment: formData.budget,
      monthlyPrincipal: calculationResult.monthlyPrincipal,
      monthlyInterest: calculationResult.monthlyInterest,
      firstPayment: calculationResult.firstPayment,
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
          Simulasi KKB Berdasarkan Budget
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 bg-white p-6 rounded-lg shadow-md">
            <CarLoanBudgetForm onCalculate={handleCalculate} />
          </div>

          <div className="lg:col-span-2">
            {showResults && loanDetails && (
              <div className="space-y-6">
                <CarLoanBudgetResult loanDetails={loanDetails} />
                <CarLoanBudgetSchedule schedule={schedule} />
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
