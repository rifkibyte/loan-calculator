"use client";

import { useState } from "react";
import {
  MortgageHousePriceForm,
  MortgageHousePriceResult,
  MortgageHousePriceSchedule,
} from "@/components/mortgage/house-price";
import { Header, Footer } from "@/components/common";
import { calculateMortgage } from "@/utils/calculators/mortgage/housePriceCalculator";
import { AmortizationItem } from "@/types/common";
import {
  MortgageHousePriceResult as MortgageDetails,
  MortgageHousePriceFormData,
} from "@/types/mortgage-house-price";

export default function MortgageHousePricePage() {
  const [mortgageDetails, setMortgageDetails] =
    useState<MortgageDetails | null>(null);
  const [schedule, setSchedule] = useState<AmortizationItem[]>([]);
  const [showResults, setShowResults] = useState<boolean>(false);

  const handleCalculate = (formData: MortgageHousePriceFormData): void => {
    const calculationResult = calculateMortgage(
      formData.housePrice,
      formData.downPaymentPercent,
      formData.loanTerm,
      formData.annualInterestRate,
      formData.calculationMethod
    );

    const downPaymentAmount =
      formData.housePrice * (formData.downPaymentPercent / 100);
    const monthlyInterestRate = formData.annualInterestRate / 12;

    setMortgageDetails({
      housePrice: formData.housePrice,
      downPaymentPercent: formData.downPaymentPercent,
      downPaymentAmount: downPaymentAmount,
      loanTerm: formData.loanTerm,
      loanTermMonths: formData.loanTerm * 12,
      annualInterestRate: formData.annualInterestRate,
      monthlyInterestRate: monthlyInterestRate,
      loanAmount: calculationResult.loanAmount,
      monthlyPayment: calculationResult.monthlyPayment,
      totalPayment: calculationResult.totalPayment,
      totalInterest: calculationResult.totalInterest,
      calculationMethod: formData.calculationMethod,
      minimumIncome30: calculationResult.minimumIncome30,
      minimumIncome33: calculationResult.minimumIncome33,
      minimumIncome40: calculationResult.minimumIncome40,
      provisionPercent: 1,
      provisionAmount: calculationResult.provisionAmount,
      adminPercent: 0.1,
      adminAmount: calculationResult.adminAmount,
      amortizationSchedule: calculationResult.amortizationSchedule,
    });

    setSchedule(calculationResult.amortizationSchedule);
    setShowResults(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <div className="container mx-auto py-8 px-4 flex-grow">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">
          Simulasi KPR - Berdasar Harga Rumah
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 bg-white p-6 rounded-lg shadow-md">
            <MortgageHousePriceForm onCalculate={handleCalculate} />
          </div>

          <div className="lg:col-span-2">
            {showResults && mortgageDetails && (
              <div className="space-y-6">
                <MortgageHousePriceResult mortgageDetails={mortgageDetails} />
                <MortgageHousePriceSchedule schedule={schedule} />
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
