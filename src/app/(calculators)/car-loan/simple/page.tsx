"use client";

import { useState } from "react";
import { CarLoanSimpleForm, CarLoanSimpleResult, CarLoanSimpleSchedule } from "@/components/car-loan/simple";
import { Header, Footer } from "@/components/common";
import { calculateSimpleLoan } from "@/utils/calculators/car-loan/simpleCalculator";
import { AmortizationItem } from "@/types/common";
import { CarLoanSimpleResult as SimpleLoanDetails } from "@/types/car-loan";

// Interface for form data
interface FormData {
  carPrice: number;
  downPaymentPercent: number;
  loanTerm: number;
  interestRate: number;
}

export default function CarLoanSimplePage(): JSX.Element {
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
      firstPayment: calculationResult.firstPayment,
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
          Simulasi Kredit Mobil Sederhana
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 bg-white p-6 rounded-lg shadow-md">
            <CarLoanSimpleForm onCalculate={handleCalculate} />
          </div>

          <div className="lg:col-span-2">
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
      </div>

      <Footer />
    </div>
  );
}