"use client";

import { useState } from "react";
import {
  CarLoanBudgetForm,
  CarLoanBudgetResult,
  CarLoanBudgetSchedule,
} from "@/features/car-loan/budget";
import { Header, Footer } from "@/features/common";
import {
  calculateLoanFromBudget,
  CalculationResult,
} from "@/utils/calculators/car-loan/budgetCalculator";
import { CarLoanBudgetResult as LoanDetails } from "@/types/car-loan";

interface CarLoanBudgetFormInput {
  budget: number;
  downPaymentPercent: number;
  loanTerm: number;
  interestRate: number;
}

export default function CarLoanBudgetPage() {
  const [loanDetails, setLoanDetails] = useState<LoanDetails | null>(null);

  const handleCalculate = (formData: CarLoanBudgetFormInput): void => {
    const { budget, downPaymentPercent, loanTerm, interestRate } = formData;

    const calculationResult: CalculationResult = calculateLoanFromBudget(
      budget,
      downPaymentPercent,
      loanTerm,
      interestRate
    );

    console.log("Data yang akan disimpan ke state:", {
      ...calculationResult,
      downPaymentPercent,
      loanTerm,
      interestRate,
      monthlyInterestRate: interestRate / 12 / 100,
      monthlyPayment: budget,
    });

    setLoanDetails({
      ...calculationResult,
      downPaymentPercent,
      loanTerm,
      interestRate,
      monthlyInterestRate: interestRate / 12 / 100,
      monthlyPayment: budget,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="container mx-auto py-10 px-4 flex-grow">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl lg:text-4xl font-bold text-center text-gray-800 mb-2">
            Kalkulator KKB Berdasarkan Budget
          </h1>
          <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
            Masukkan budget angsuran bulanan Anda untuk mengetahui estimasi
            harga mobil yang bisa Anda dapatkan.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 bg-white p-6 rounded-lg shadow-lg h-fit">
              <CarLoanBudgetForm onCalculate={handleCalculate} />
            </div>

            <div className="lg:col-span-2">
              {loanDetails ? (
                <div className="space-y-8">
                  <CarLoanBudgetResult loanDetails={loanDetails} />

                  <CarLoanBudgetSchedule loanDetails={loanDetails} />
                </div>
              ) : (
                <div className="flex items-center justify-center h-full bg-white p-6 rounded-lg shadow-lg">
                  <div className="text-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="mx-auto h-12 w-12 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                      />
                    </svg>
                    <h3 className="mt-2 text-lg font-medium text-gray-900">
                      Hasil Simulasi
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Hasil perhitungan Anda akan ditampilkan di sini.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
