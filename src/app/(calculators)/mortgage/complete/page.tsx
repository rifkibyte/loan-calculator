"use client";

import { useState } from "react";
import {
  MortgageCompleteForm,
  MortgageCompleteResult,
  MortgageCompleteSchedule,
} from "@/components/mortgage/complete";
import { Header, Footer } from "@/components/common";
import { calculateMortgage } from "@/utils/calculators/mortgage/mortgageCalculator";
import { AmortizationItem } from "@/types/common";
import { MortgageResult as MortgageDetails } from "@/types/mortgage";

// Interface for form data
interface FormData {
  housePrice: number;
  loanTerm: number;
  annualInterestRate: number;
  downPaymentPercent: number;
  provisionPercent: number;
  appraisalFee: number;
  adminFee: number;
  notaryFee: number;
  insuranceFee: number;
  njoptkp: number;
}

export default function MortgagePage() {
  const [mortgageDetails, setMortgageDetails] =
    useState<MortgageDetails | null>(null);
  const [schedule, setSchedule] = useState<AmortizationItem[]>([]);
  const [showResults, setShowResults] = useState<boolean>(false);

  // Handle form calculation
  const handleCalculate = (formData: FormData): void => {
    try {
      const calculationResult = calculateMortgage(
        formData.housePrice,
        formData.loanTerm,
        formData.annualInterestRate,
        formData.downPaymentPercent,
        formData.provisionPercent,
        formData.appraisalFee,
        formData.adminFee,
        formData.notaryFee,
        formData.insuranceFee,
        formData.njoptkp
      );

      const mortgageDetailsData: MortgageDetails = {
        housePrice: formData.housePrice,
        downPaymentPercent: formData.downPaymentPercent,
        downPaymentAmount: calculationResult.downPaymentAmount,
        loanTerm: formData.loanTerm,
        loanTermMonths: formData.loanTerm * 12,
        annualInterestRate: formData.annualInterestRate,
        monthlyInterestRate: formData.annualInterestRate / 12,
        loanAmount: calculationResult.loanAmount,
        monthlyPayment: calculationResult.monthlyPayment,
        totalPayment: calculationResult.totalPayment,
        totalInterest: calculationResult.totalInterest,
        provisionPercent: formData.provisionPercent,
        provisionAmount: calculationResult.provisionAmount,
        appraisalFee: formData.appraisalFee,
        adminFee: formData.adminFee,
        notaryFee: formData.notaryFee,
        insuranceFee: formData.insuranceFee,
        njoptkp: formData.njoptkp,
        bphtbTax: calculationResult.bphtbTax,
        totalCosts: calculationResult.totalCosts,
        firstPayment: calculationResult.firstPayment,
        calculationMethod: "Anuitas",
        amortizationSchedule: calculationResult.amortizationSchedule,
      };

      setMortgageDetails(mortgageDetailsData);
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
          Simulasi Kredit Rumah
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Kalkulator kredit rumah dengan perhitungan yang lengkap.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 bg-white p-6 rounded-lg shadow-md">
            <MortgageCompleteForm onCalculate={handleCalculate} />
          </div>

          <div className="lg:col-span-2">
            {showResults && mortgageDetails && (
              <div className="space-y-6">
                <MortgageCompleteResult mortgageDetails={mortgageDetails} />
                <MortgageCompleteSchedule schedule={schedule} />
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
