// app/(calculators)/islamic-mortgage/page.tsx
"use client";

import { useState } from "react";
import { IslamicMortgageForm, IslamicMortgageResult, IslamicMortgageSchedule } from "@/components/mortgage/islamic-mortgage";
import { Header, Footer } from "@/components/common";
import { calculateIslamicMortgage } from "@/utils/calculators/mortgage/islamicMortgageCalculator";
import { AmortizationItem } from "@/types/common";
import { IslamicMortgageResult as MortgageDetails } from "@/types/islamic-mortgage";

// Interface for form data
interface FormData {
  housePrice: number;
  downPaymentPercent: number;
  loanTerm: number;
  marginRate: number;
  calculationMethod: 'anuitas' | 'flat';
}

export default function IslamicMortgagePage() {
  const [mortgageDetails, setMortgageDetails] = useState<MortgageDetails | null>(null);
  const [schedule, setSchedule] = useState<AmortizationItem[]>([]);
  const [showResults, setShowResults] = useState<boolean>(false);

  // Handle form calculation
  const handleCalculate = (formData: FormData): void => {
    const calculationResult = calculateIslamicMortgage(
      formData.housePrice,
      formData.downPaymentPercent,
      formData.loanTerm,
      formData.marginRate,
      formData.calculationMethod
    );
    
    setMortgageDetails({
      housePrice: formData.housePrice,
      downPaymentPercent: formData.downPaymentPercent,
      downPaymentAmount: formData.housePrice * (formData.downPaymentPercent / 100),
      loanTerm: formData.loanTerm,
      marginRate: formData.marginRate,
      monthlyMarginRate: formData.marginRate / 12,
      calculationMethod: formData.calculationMethod,
      loanAmount: calculationResult.loanAmount,
      monthlyPayment: calculationResult.monthlyPayment,
      monthlyPrincipal: calculationResult.monthlyPrincipal,
      monthlyInterest: calculationResult.monthlyMargin,
      totalPayment: calculationResult.totalPayment,
      totalInterest: calculationResult.totalMargin,
      minimumIncomeRatios: calculationResult.minimumIncomeRatios,
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
          Simulasi KPR Syariah
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 bg-white p-6 rounded-lg shadow-md">
            <IslamicMortgageForm onCalculate={handleCalculate} />
          </div>
          
          <div className="lg:col-span-2">
            {showResults && mortgageDetails && (
              <div className="space-y-6">
                <IslamicMortgageResult mortgageDetails={mortgageDetails} />
                <IslamicMortgageSchedule schedule={schedule} />
              </div>
            )}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
