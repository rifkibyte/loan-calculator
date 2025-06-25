"use client";

import { useState } from "react";
import { MortgageIncomeForm, MortgageIncomeResult, MortgageIncomeSchedule } from "@/components/mortgage/income";
import { Header, Footer } from "@/components/common";
import { calculateMortgageIncome } from "@/utils/calculators/mortgage/incomeCalculator";
import { AmortizationItem } from "@/types/common";
import { MortgageIncomeResult as LoanDetails } from "@/types/mortgage-income";

// Interface for form data
interface FormData {
  netIncome: number;
  downPaymentPercent: number;
  loanTerm: number;
  interestRate: number;
  maxInstallmentPercent: number;
}

export default function MortgageIncomePage(): JSX.Element {
  const [loanDetails, setLoanDetails] = useState<LoanDetails | null>(null);
  const [schedule, setSchedule] = useState<AmortizationItem[]>([]);
  const [showResults, setShowResults] = useState<boolean>(false);

  // Handle form calculation
  const handleCalculate = (formData: FormData): void => {
    const calculationResult = calculateMortgageIncome(
      formData.netIncome,
      formData.downPaymentPercent,
      formData.loanTerm,
      formData.interestRate,
      formData.maxInstallmentPercent
    );
    
    setLoanDetails({
      netIncome: formData.netIncome,
      downPaymentPercent: formData.downPaymentPercent,
      downPaymentAmount: calculationResult.minDownPayment,
      loanTerm: formData.loanTerm,
      interestRate: formData.interestRate,
      monthlyInterestRate: formData.interestRate / 12,
      maxInstallmentPercent: formData.maxInstallmentPercent,
      maxInstallmentAmount: calculationResult.maxInstallmentAmount,
      maxHousePrice: calculationResult.maxHousePrice,
      minDownPayment: calculationResult.minDownPayment,
      maxLoanAmount: calculationResult.maxLoanAmount,
      loanAmount: calculationResult.maxLoanAmount,
      monthlyPayment: calculationResult.monthlyPayment,
      monthlyPrincipal: calculationResult.monthlyPrincipal,
      monthlyInterest: calculationResult.monthlyInterest,
      totalPayment: calculationResult.totalPayment,
      totalInterest: calculationResult.totalInterest,
      provisionFee: calculationResult.provisionFee,
      adminFee: calculationResult.adminFee,
      totalFirstPayment: calculationResult.totalFirstPayment,
      calculationMethod: 'anuitas',
      amortizationSchedule: calculationResult.amortizationSchedule
    });
    
    setSchedule(calculationResult.amortizationSchedule);
    setShowResults(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <div className="container mx-auto py-8 px-4 flex-grow">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-2">
          Perhitungan Angsuran KPR
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Perhitungan cicilan KPR berdasar penghasilan bersih
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <MortgageIncomeForm onCalculate={handleCalculate} />
          </div>
          
          <div className="lg:col-span-2">
            {showResults && loanDetails && (
              <div className="space-y-6">
                <MortgageIncomeResult loanDetails={loanDetails} />
                <MortgageIncomeSchedule schedule={schedule} />
              </div>
            )}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
