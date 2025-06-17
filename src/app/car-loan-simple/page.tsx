"use client";

import { useState } from "react";
import CarLoanSimpleForm from "@/components/CarLoanSimpleForm";
import CarLoanSimpleResult from "@/components/CarLoanSimpleResult";
import CarLoanSimpleSchedule from "@/components/CarLoanSimpleSchedule";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { calculateSimpleLoan } from "@/utils/loanCarSimpleCalculator";

// Interface for loan details state
interface SimpleLoanDetails {
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
  firstPayment: number;
}

// Interface for amortization schedule item
interface AmortizationItem {
  period: number;
  payment: number;
  principal: number;
  interest: number;
  remainingBalance: number;
}

// Interface for form data
interface FormData {
  carPrice: number;
  downPaymentPercent: number;
  loanTerm: number;
  interestRate: number;
}

export default function CarLoanSimple(): JSX.Element {
  const [loanDetails, setLoanDetails] = useState<SimpleLoanDetails | null>(null);
  const [schedule, setSchedule] = useState<AmortizationItem[]>([]);
  const [showResults, setShowResults] = useState<boolean>(false);

  // Handle form calculation
  const handleCalculate = (formData: FormData): void => {
    const calculationResult = calculateSimpleLoan(
      formData.carPrice,
      formData.downPaymentPercent,
      formData.loanTerm,
      formData.interestRate
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
      firstPayment: calculationResult.firstPayment
    });
    
    setSchedule(calculationResult.amortizationSchedule);
    setShowResults(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <div className="container mx-auto py-8 px-4 flex-grow">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">
          Simulasi Kredit Mobil
        </h1>
        
        <div className="max-w-4xl mx-auto">
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Simulasi Kredit - berdasar harga mobil
            </h2>
            <CarLoanSimpleForm onCalculate={handleCalculate} />
          </div>
          
          {showResults && loanDetails && (
            <div className="space-y-6">
              <CarLoanSimpleResult loanDetails={loanDetails} />
              <CarLoanSimpleSchedule 
                schedule={schedule} 
                totalInterest={loanDetails.totalInterest}
                totalPrincipal={loanDetails.loanAmount}
                totalPayment={loanDetails.totalPayment}
              />
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
