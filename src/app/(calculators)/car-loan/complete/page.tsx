"use client";

import { useState } from "react";
import {
  CarLoanForm,
  CarLoanResult,
  CarLoanSchedule, // Menggunakan CarLoanSchedule seperti permintaan Anda
} from "@/features/car-loan/complete";
import { Header, Footer } from "@/components/layout";
import { calculateLoan } from "@/utils/calculators/car-loan/completeCalculator";

// --- Definisi Tipe Data Langsung di File ---

// Interface untuk setiap baris dalam tabel amortisasi
interface AmortizationItem {
  period: number;
  payment: number;
  principal: number;
  interest: number;
  remainingBalance: number;
}

// Interface untuk data yang dikirim dari form
interface FormData {
  carPrice: number;
  downPaymentPercent: number;
  loanTerm: number;
  interestRate: number;
  insurancePercent: number;
  provisionPercent: number;
  policyFee: number;
  adminFee: number;
}

// Interface lengkap untuk detail hasil kalkulasi pinjaman
// Ini menggantikan import dari "@/types/car-loan"
interface LoanDetails {
  carPrice: number;
  downPaymentPercent: number;
  downPaymentAmount: number;
  loanTerm: number;
  interestRate: number;
  monthlyInterestRate: number;
  loanAmount: number;
  monthlyPayment: number;
  monthlyPrincipal: number;
  monthlyInterest: number;
  totalPayment: number;
  totalInterest: number;
  insurancePercent: number;
  insuranceAmount: number;
  provisionPercent: number;
  provisionAmount: number;
  policyFee: number;
  adminFee: number;
  firstPayment: number;
  amortizationSchedule: AmortizationItem[];
}

// --- Komponen Halaman ---

export default function CarLoanCompletePage() {
  const [loanDetails, setLoanDetails] = useState<LoanDetails | null>(null);
  const [showResults, setShowResults] = useState<boolean>(false);

  // Fungsi untuk menangani kalkulasi dari form
  const handleCalculate = (formData: FormData): void => {
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

    // Set state dengan data yang lengkap untuk ditampilkan
    setLoanDetails({
      // Data dari form
      carPrice: formData.carPrice,
      downPaymentPercent: formData.downPaymentPercent,
      loanTerm: formData.loanTerm,
      interestRate: formData.interestRate,
      insurancePercent: formData.insurancePercent,
      provisionPercent: formData.provisionPercent,
      policyFee: formData.policyFee,
      adminFee: formData.adminFee,
      
      // Data dari hasil kalkulasi
      downPaymentAmount: formData.carPrice * (formData.downPaymentPercent / 100),
      monthlyInterestRate: formData.interestRate / 12,
      loanAmount: calculationResult.loanAmount,
      monthlyPayment: calculationResult.monthlyPayment,
      monthlyPrincipal: calculationResult.monthlyPrincipal,
      monthlyInterest: calculationResult.monthlyInterest,
      totalPayment: calculationResult.totalPayment,
      totalInterest: calculationResult.totalInterest,
      insuranceAmount: calculationResult.insuranceAmount,
      provisionAmount: calculationResult.provisionAmount,
      firstPayment: calculationResult.firstPayment,
      amortizationSchedule: calculationResult.amortizationSchedule,
    });

    setShowResults(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <main className="container mx-auto py-8 px-4 flex-grow">
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
                {/* Memanggil komponen tabel dengan prop yang benar */}
                <CarLoanSchedule loanDetails={loanDetails} />
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
