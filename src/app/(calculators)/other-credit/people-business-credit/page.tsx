"use client";

import { useState } from "react";
import { PeopleBusinessCreditForm, PeopleBusinessCreditResult, PeopleBusinessCreditSchedule } from "@/components/other-credit/people-business-credit";
import { Header, Footer } from "@/components/common";
import { calculatePeopleBusinessCredit } from "@/utils/calculators/other-credit/peopleBusinessCreditCalculator";
import { AmortizationItem } from "@/types/common";
import { PeopleBusinessCreditResult as LoanDetails } from "@/types/peoples-business-credit";

// Interface for form data
interface FormData {
  loanAmount: number;
  loanTerm: number;
  interestRate: number;
  loanPurpose: string;
  adminFee: number;
  insuranceFee: number;
}

export default function PeopleBusinessCreditPage() {
  const [loanDetails, setLoanDetails] = useState<LoanDetails | null>(null);
  const [schedule, setSchedule] = useState<AmortizationItem[]>([]);
  const [showResults, setShowResults] = useState<boolean>(false);

  // Handle form calculation
  const handleCalculate = (formData: FormData): void => {
    const calculationResult = calculatePeopleBusinessCredit(
      formData.loanAmount,
      formData.loanTerm,
      formData.interestRate,
      formData.adminFee,
      formData.insuranceFee
    );
    
    setLoanDetails({
      loanAmount: formData.loanAmount,
      loanTerm: formData.loanTerm,
      interestRate: formData.interestRate,
      loanPurpose: formData.loanPurpose,
      monthlyPayment: calculationResult.monthlyPayment,
      monthlyPrincipal: calculationResult.monthlyPrincipal,
      monthlyInterest: calculationResult.monthlyInterest,
      totalPayment: calculationResult.totalPayment,
      totalInterest: calculationResult.totalInterest,
      adminFee: formData.adminFee,
      insuranceFee: formData.insuranceFee,
      firstPayment: calculationResult.firstPayment,
      amortizationSchedule: calculationResult.amortizationSchedule // Tambahkan ini
    });
    
    setSchedule(calculationResult.amortizationSchedule);
    setShowResults(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <div className="container mx-auto py-8 px-4 flex-grow">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">
          Simulasi Kredit Usaha Rakyat (KUR)
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 bg-white p-6 rounded-lg shadow-md">
            <PeopleBusinessCreditForm onCalculate={handleCalculate} />
          </div>
          
          <div className="lg:col-span-2">
            {showResults && loanDetails && (
              <div className="space-y-6">
                <PeopleBusinessCreditResult loanDetails={loanDetails} />
                <PeopleBusinessCreditSchedule schedule={schedule} />
              </div>
            )}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
