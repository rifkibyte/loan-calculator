"use client";

import { useState } from "react";
import {
  MortgageFixedForm,
  MortgageFixedResult,
  MortgageFixedSchedule,
} from "@/components/mortgage/fixed";
import { Header, Footer } from "@/components/common";
import { calculateMortgageFixed } from "@/utils/calculators/mortgage/fixedCalculator";
import { AmortizationItem } from "@/types/common";
import {
  MortgageFixedResult as FixedLoanDetails,
  MortgageFixedFormData,
} from "@/types/mortgage-fixed";

export default function MortgageFixedPage() {
  const [loanDetails, setLoanDetails] = useState<FixedLoanDetails | null>(null);
  const [schedule, setSchedule] = useState<AmortizationItem[]>([]);
  const [showResults, setShowResults] = useState<boolean>(false);

  // Handle form calculation
  const handleCalculate = (formData: MortgageFixedFormData): void => {
    const calculationResult = calculateMortgageFixed(
      formData.loanAmount,
      formData.loanTerm,
      formData.yearlyRates,
      formData.calculationMethod
    );

    setLoanDetails(calculationResult);
    setSchedule(calculationResult.amortizationSchedule);
    setShowResults(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <div className="container mx-auto py-8 px-4 flex-grow">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-600 mb-2">
            Simulasi KPR Bunga Fixed
          </h1>
          <p className="text-gray-600">
            Simulasi kredit rumah dengan bunga fix selama beberapa tahun
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 bg-white p-6 rounded-lg shadow-md">
            <MortgageFixedForm onCalculate={handleCalculate} />
          </div>

          <div className="lg:col-span-2">
            {showResults && loanDetails && (
              <div className="space-y-6">
                <MortgageFixedResult loanDetails={loanDetails} />
                <MortgageFixedSchedule
                  schedule={schedule}
                  yearlyRates={loanDetails.yearlyRates}
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
