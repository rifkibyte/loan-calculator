Refactor code ini ikuti referensi, perbaiki juga typesnya

typesnya
export interface LoanAmountTableItem {
  maxLoanAmount: number;
  loanTerm: number;
  maxInstallment: number;
  minSalary: number;
}

export interface AmortizationItem {
  period: number;
  payment: number;
  principal: number;
  interest: number;
  remainingBalance: number;
}

export interface PersonalLoanAmountResult {
  loanAmount: number;
  creditRatio: number;
  monthlyInterestRate: number;
  annualInterestRate: number;
  calculationMethod: string;
  loanTable: LoanAmountTableItem[];
}


"use client";

import { useState } from "react";
import { PersonalLoanAmountForm, PersonalLoanAmountResult, PersonalLoanAmountSchedule } from "@/features/personal-loan/amount";
import { Header, Footer } from "@/components/layout/";

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

export default function PersonalLoanAmountPage() {
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

Referensi
"use client";

// Impor untuk fitur spesifik (Budget)
import {
  CarLoanBudgetForm,
  CarLoanBudgetResult,
  CarLoanBudgetSchedule,
} from "@/features/car-loan/budget";
import { calculateLoanFromBudget } from "@/utils/calculators/car-loan/budgetCalculator";
import { CarLoanBudgetResult as LoanDetails } from "@/types/car-loan";

// Impor untuk layout dan komponen reusable baru kita
import { Header, Footer } from "@/components/layout";
import { LoanCalculatorController } from "@/components/ui/loan";
interface CarLoanBudgetFormInput {
  budget: number;
  downPaymentPercent: number;
  loanTerm: number;
  interestRate: number;
}

export default function CarLoanBudgetPage() {
  // 1. Logika kalkulasi dan transformasi data diekstrak ke fungsi murni.
  // Fungsi ini akan kita teruskan sebagai prop ke controller.
  const performBudgetCalculation = (
    formData: CarLoanBudgetFormInput
  ): LoanDetails => {
    const { budget, downPaymentPercent, loanTerm, interestRate } = formData;
    const calculationResult = calculateLoanFromBudget(
      budget,
      downPaymentPercent,
      loanTerm,
      interestRate
    );

    // Menggabungkan hasil kalkulasi dengan data dari form untuk membentuk objek state akhir
    return {
      ...calculationResult,
      downPaymentPercent,
      loanTerm,
      interestRate,
      monthlyInterestRate: interestRate / 12 / 100,
      monthlyPayment: budget,
    };
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="container mx-auto py-10 px-4 flex-grow">
        {/* 2. Gunakan controller reusable. Semua state dan layout ada di dalamnya. */}
        <LoanCalculatorController
          pageTitle="Kalkulator KKB Berdasarkan Budget"
          pageDescription="Masukkan budget angsuran bulanan Anda untuk mengetahui estimasi harga mobil yang bisa Anda dapatkan."
          FormComponent={CarLoanBudgetForm}
          performCalculation={performBudgetCalculation}
        >
          {/* 3. Gunakan pola "render prop" untuk mendefinisikan bagaimana hasil ditampilkan */}
          {(loanDetails) => (
            <>
              <CarLoanBudgetResult loanDetails={loanDetails} />
              <CarLoanBudgetSchedule loanDetails={loanDetails} />
            </>
          )}
        </LoanCalculatorController>
      </main>
      <Footer />
    </div>
  );
}
