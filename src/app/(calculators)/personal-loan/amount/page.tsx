"use client";

import { useState } from "react";
import { PersonalLoanAmountForm, PersonalLoanAmountResult, PersonalLoanAmountSchedule } from "@/components/personal-loan/amount";
import { Header, Footer } from "@/components/common";
import { calculateLoanAmountTable, calculateLoanAmountSchedule } from "@/utils/calculators/personal-loan/personalLoanAmountCalculator";
import { LoanAmountTableItem, AmortizationItem } from "@/types/personal-loan-amount";

// Interface for form data
interface FormData {
  loanAmount: number;
  creditRatio: number;
  monthlyInterestRate: number;
  calculationMethod: string;
  selectedTerm?: number; // Optional: for schedule calculation
}

// Interface for result data
interface ResultData {
  loanAmount: number;
  creditRatio: number;
  monthlyInterestRate: number;
  annualInterestRate: number;
  calculationMethod: string;
  loanTable: LoanAmountTableItem[];
}

export default function PersonalLoanAmountPage(): JSX.Element {
  const [resultData, setResultData] = useState<ResultData | null>(null);
  const [schedule, setSchedule] = useState<AmortizationItem[]>([]);
  const [selectedTerm, setSelectedTerm] = useState<number>(12);
  const [showResults, setShowResults] = useState<boolean>(false);

  // Handle form calculation
  const handleCalculate = (formData: FormData): void => {
    try {
      // Calculate loan amount table
      const loanTable = calculateLoanAmountTable(
        formData.loanAmount,
        formData.creditRatio,
        formData.monthlyInterestRate,
        formData.calculationMethod
      );
      
      // Calculate schedule for default term (12 months)
      const scheduleData = calculateLoanAmountSchedule(
        formData.loanAmount,
        formData.monthlyInterestRate,
        selectedTerm,
        formData.calculationMethod
      );
      
      const result: ResultData = {
        loanAmount: formData.loanAmount,
        creditRatio: formData.creditRatio,
        monthlyInterestRate: formData.monthlyInterestRate,
        annualInterestRate: formData.monthlyInterestRate * 12,
        calculationMethod: formData.calculationMethod,
        loanTable
      };
      
      setResultData(result);
      setSchedule(scheduleData);
      setShowResults(true);
    } catch (error) {
      console.error("Error in calculation:", error);
    }
  };

  // Handle term change for schedule
  const handleTermChange = (newTerm: number): void => {
    if (resultData) {
      try {
        const newSchedule = calculateLoanAmountSchedule(
          resultData.loanAmount,
          resultData.monthlyInterestRate,
          newTerm,
          resultData.calculationMethod
        );
        setSchedule(newSchedule);
        setSelectedTerm(newTerm);
      } catch (error) {
        console.error("Error recalculating schedule:", error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <div className="container mx-auto py-8 px-4 flex-grow">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">
          Simulasi KTA
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 bg-white p-6 rounded-lg shadow-md">
            <PersonalLoanAmountForm onCalculate={handleCalculate} />
          </div>
          
          <div className="lg:col-span-2">
            {showResults && resultData && (
              <div className="space-y-6">
                <PersonalLoanAmountResult resultData={resultData} />
                <PersonalLoanAmountSchedule 
                  schedule={schedule}
                  loanAmount={resultData.loanAmount}
                  monthlyInterestRate={resultData.monthlyInterestRate}
                  calculationMethod={resultData.calculationMethod}
                  selectedTerm={selectedTerm}
                  onTermChange={handleTermChange}
                />
              </div>
            )}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
