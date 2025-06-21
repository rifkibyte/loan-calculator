"use client";

import { useState } from "react";
import { PersonalLoanForm, PersonalLoanResult, PersonalLoanSchedule } from "@/components/personal-loan/budget";
import { Header, Footer } from "@/components/common";
import { calculateKtaLoan } from "@/utils/calculators/personal-loan/personalLoanCalculator";
import { AmortizationItem } from "@/types/common";
import { PersonalLoanResult as LoanDetails } from "@/types/personal-loan";

// Interface for form data
interface FormData {
  netIncome: number;
  creditRatio: number;
  otherInstallments: number;
  monthlyInterestRate: number;
}

export default function PersonalLoanPage(): JSX.Element {
  const [loanDetails, setLoanDetails] = useState<LoanDetails | null>(null);
  const [schedule, setSchedule] = useState<AmortizationItem[]>([]);
  const [showResults, setShowResults] = useState<boolean>(false);

  // Handle form calculation
  const handleCalculate = (formData: FormData): void => {
    try {
      // Map form data ke parameter yang diharapkan calculator
      const calculationResult = calculateKtaLoan(
        formData.netIncome,           // netIncome
        formData.creditRatio,         // debtRatioPercent
        formData.otherInstallments,   // otherLoanPayment
        formData.monthlyInterestRate, // monthlyInterestRate
        "FLAT"                        // calculationMethod
      );
      
      const loanDetailsData: LoanDetails = {
        netIncome: formData.netIncome,
        debtRatioPercent: formData.creditRatio,
        debtRatioAmount: calculationResult.debtRatioAmount,
        otherLoanPayment: formData.otherInstallments,
        interestRate: formData.monthlyInterestRate,
        annualInterestRate: formData.monthlyInterestRate * 12,
        maxKtaPayment: calculationResult.maxKtaPayment,
        loanAmount: calculationResult.loanAmount,
        monthlyPayment: calculationResult.monthlyPayment,
        monthlyPrincipal: calculationResult.monthlyPrincipal,
        monthlyInterest: calculationResult.monthlyInterest,
        totalPayment: calculationResult.totalPayment,
        totalInterest: calculationResult.totalInterest,
        calculationMethod: "FLAT",
        amortizationSchedule: calculationResult.amortizationSchedule
      };
      
      setLoanDetails(loanDetailsData);
      setSchedule(calculationResult.amortizationSchedule);
      setShowResults(true);
    } catch (error) {
      console.error("Error in calculation:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <div className="container mx-auto py-8 px-4 flex-grow">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">
          Simulasi Kredit Tanpa Agunan (KTA)
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 bg-white p-6 rounded-lg shadow-md">
            <PersonalLoanForm onCalculate={handleCalculate} />
          </div>
          
          <div className="lg:col-span-2">
            {showResults && loanDetails && (
              <div className="space-y-6">
                <PersonalLoanResult loanDetails={loanDetails} />
                <PersonalLoanSchedule schedule={schedule} />
              </div>
            )}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}