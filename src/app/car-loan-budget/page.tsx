"use client";

import { useState } from "react";
import CarLoanBudgetForm from "@/components/CarLoanBudgetForm";
import CarLoanBudgetResult from "@/components/CarLoanBudgetResult";
import CarLoanSchedule from "@/components/CarLoanSchedule"; // Import schedule component
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { calculateLoanFromBudget } from "@/utils/loanCarBudgetCalculator";
import { generateAmortizationSchedule } from "@/utils/amortizationCalculator"; // Import schedule generator

interface LoanDetails {
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
  firstPayment: number;
}

// Add amortization interface
interface AmortizationItem {
  period: number;
  payment: number;
  principal: number;
  interest: number;
  remainingBalance: number;
}

export default function CarLoanBudgetPage(): JSX.Element {
  const [loanDetails, setLoanDetails] = useState<LoanDetails | null>(null);
  const [schedule, setSchedule] = useState<AmortizationItem[]>([]); // State for schedule
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
    
    // Generate amortization schedule
    const amortizationSchedule = generateAmortizationSchedule(
      calculationResult.loanAmount,
      formData.interestRate,
      formData.loanTerm,
      formData.budget
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
      firstPayment: calculationResult.firstPayment
    });
    
    setSchedule(amortizationSchedule);
    setShowResults(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <div className="container mx-auto py-8 px-4 flex-grow">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">
          Simulasi KKB Berdasarkan Budget
        </h1>
        
        <div className="max-w-4xl mx-auto"> {/* Increased max width */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <CarLoanBudgetForm onCalculate={handleCalculate} />
          </div>
          
          <div className="mt-6 space-y-6">
            {showResults && loanDetails && (
              <>
                <CarLoanBudgetResult loanDetails={loanDetails} />
                
                {/* Add loan schedule table */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    Tabel Angsuran
                  </h2>
                  <CarLoanSchedule schedule={schedule} />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
