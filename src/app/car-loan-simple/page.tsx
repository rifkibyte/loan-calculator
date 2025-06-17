"use client";

import { useState } from "react";
import CarSimpleLoanForm from "@/components/CarSimpleLoanForm";
import CarSimpleLoanResult from "@/components/CarSimpleLoanResult";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { calculateCarSimpleLoan, CarSimpleLoanResult, CarSimpleLoanFormData } from "@/utils/carSimpleLoanCalculator";

export default function CarLoanSimple() {
  const [loanDetails, setLoanDetails] = useState<CarSimpleLoanResult | null>(null);
  const [showResults, setShowResults] = useState(false);

  const handleCalculate = (formData: CarSimpleLoanFormData) => {
    const calculationResult = calculateCarSimpleLoan(
      formData.carPrice,
      formData.downPaymentPercent,
      formData.loanTermYears, // Pastikan ini sesuai dengan interface
      formData.annualInterestRate // Pastikan ini sesuai dengan interface
    );
    
    setLoanDetails(calculationResult);
    setShowResults(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <div className="container mx-auto py-8 px-4 flex-grow">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-2">
          Simulasi Kredit Mobil Sederhana
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Berdasarkan harga mobil dengan perhitungan bunga flat
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 bg-white p-6 rounded-lg shadow-md">
            <CarSimpleLoanForm onCalculate={handleCalculate} />
          </div>
          
          <div className="lg:col-span-2">
            {showResults && loanDetails && (
              <CarSimpleLoanResult loanDetails={loanDetails} />
            )}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
