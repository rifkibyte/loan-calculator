"use client";

import { useState } from "react";
import { CreditAnnuityForm, CreditAnnuityResult, CreditAnnuitySchedule } from "@/components/credit/annuity";
import { Header, Footer } from "@/components/common";
import { calculateAnnuityLoan } from "@/utils/calculators/credit/annuityCalculator";
import { AmortizationItem } from "@/types/common";
import { CreditAnnuityResult as LoanDetails } from "@/types/credit-annuity";

// Interface for form data
interface FormData {
  loanAmount: number;
  loanTermMonths: number;
  annualInterestRate: number;
}

export default function CreditAnnuityPage() {
  const [loanDetails, setLoanDetails] = useState<LoanDetails | null>(null);
  const [schedule, setSchedule] = useState<AmortizationItem[]>([]);
  const [showResults, setShowResults] = useState<boolean>(false);

  // Handle form calculation
  const handleCalculate = (formData: FormData): void => {
    const calculationResult = calculateAnnuityLoan(
      formData.loanAmount,
      formData.loanTermMonths,
      formData.annualInterestRate
    );
    
    setLoanDetails({
      loanAmount: calculationResult.loanAmount,
      loanTermMonths: calculationResult.loanTermMonths,
      loanTermYears: calculationResult.loanTermYears,
      annualInterestRate: calculationResult.annualInterestRate,
      monthlyInterestRate: calculationResult.monthlyInterestRate,
      monthlyPayment: calculationResult.monthlyPayment,
      monthlyPrincipal: 0, // Will be calculated dynamically in schedule
      monthlyInterest: 0, // Will be calculated dynamically in schedule
      totalPayment: calculationResult.totalPayment,
      totalInterest: calculationResult.totalInterest,
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
          Kalkulator Kredit - Bunga Anuitas
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 bg-white p-6 rounded-lg shadow-md">
            <CreditAnnuityForm onCalculate={handleCalculate} />
          </div>
          
          <div className="lg:col-span-2">
            {showResults && loanDetails && (
              <div className="space-y-6">
                <CreditAnnuityResult loanDetails={loanDetails} />
                <CreditAnnuitySchedule schedule={schedule} />
              </div>
            )}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
