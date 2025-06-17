"use client";

import { useState } from "react";
import CarLoanForm from "@/components/CarLoanForm";
import CarLoanResult from "@/components/CarLoanResult";
import CarLoanSchedule from "@/components/CarLoanSchedule";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { calculateLoan } from "@/utils/loanCarCalculator";

export default function Home() {
  const [loanDetails, setLoanDetails] = useState(null);
  const [schedule, setSchedule] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const handleCalculate = (formData) => {
    const calculationResult = calculateLoan(
      formData.carPrice,
      formData.downPaymentPercent,
      formData.loanTerm,
      formData.interestRate,
      formData.insurancePercent,
      formData.provisionPercent,
      formData.policyFee,
      formData.adminFee
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
      insurancePercent: formData.insurancePercent,
      insuranceAmount: calculationResult.insuranceAmount,
      provisionPercent: formData.provisionPercent,
      provisionAmount: calculationResult.provisionAmount,
      policyFee: formData.policyFee,
      adminFee: formData.adminFee,
      firstPayment: calculationResult.firstPayment
    });
    
    setSchedule(calculationResult.amortizationSchedule);
    setShowResults(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <div className="container mx-auto py-8 px-4 flex-grow">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">
          Simulasi Kredit Mobil Lengkap
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 bg-white p-6 rounded-lg shadow-md">
            <CarLoanForm onCalculate={handleCalculate} />
          </div>
          
          <div className="lg:col-span-2">
            {showResults && loanDetails && (
              <div className="space-y-6">
                <CarLoanResult loanDetails={loanDetails} />
                <CarLoanSchedule schedule={schedule} />
              </div>
            )}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
