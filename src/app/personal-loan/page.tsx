"use client";

import { useState } from "react";
import PersonalLoanForm from "@/components/PersonalLoanForm";
import PersonalLoanResult from "@/components/PersonalLoanResult";
import PersonalLoanSchedule from "@/components/PersonalLoanSchedule";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { calculateKtaLoan } from "@/utils/personalLoanCalculator";

// Interface for loan details
interface LoanDetails {
  netIncome: number;
  debtRatioPercent: number;
  debtRatioAmount: number;
  otherLoanPayment: number;
  interestRate: number;
  annualInterestRate: number;
  maxKtaPayment: number;
  loanAmount: number;
  monthlyPayment: number;
  monthlyPrincipal: number;
  monthlyInterest: number;
  totalPayment: number;
  totalInterest: number;
  calculationMethod: string;
}

// Interface for amortization schedule item
interface AmortizationItem {
  period: number;
  payment: number;
  principal: number;
  interest: number;
  remainingBalance: number;
}

// Interface for form data - sesuaikan dengan form yang ada
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
      console.log("Form data received:", formData);
      
      // Map form data ke parameter yang diharapkan calculator
      const calculationResult = calculateKtaLoan(
        formData.netIncome,           // netIncome
        formData.creditRatio,         // debtRatioPercent
        formData.otherInstallments,   // otherLoanPayment
        formData.monthlyInterestRate, // monthlyInterestRate
        "FLAT"                        // calculationMethod
      );
      
      console.log("Calculation result:", calculationResult);
      
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
        calculationMethod: "FLAT"
      };
      
      console.log("Setting loan details:", loanDetailsData);
      
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
