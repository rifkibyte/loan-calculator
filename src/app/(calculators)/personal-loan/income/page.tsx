// Ganti seluruh isi file Page.tsx Anda dengan ini

"use client";

import { useState } from "react";
import { Header, Footer } from "@/components/layout/";
import { PersonalLoanForm, PersonalLoanResult, PersonalLoanSchedule } from "@/features/personal-loan/income";

// Import kalkulator dan tipe data yang baru
import {
  calculateKtaFlatLimit,
  CalculationResult,
} from "@/utils/calculators/personal-loan/personalLoanIncomeCalculator"; // Pastikan path ini benar

// Interface untuk data dari form (tetap sama)
interface FormData {
  netIncome: number;
  creditRatio: number;
  otherInstallments: number;
  monthlyInterestRate: number;
}

export default function PersonalLoanPage() {
  // State untuk menampung hasil kalkulasi dari kalkulator baru
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [showResults, setShowResults] = useState<boolean>(false);

  // Fungsi kalkulasi yang sudah diperbarui
  const handleCalculate = (formData: FormData): void => {
    try {
      // Menggunakan fungsi kalkulator limit pinjaman (FLAT) yang baru
      const calculationResult = calculateKtaFlatLimit(
        formData.netIncome,
        formData.creditRatio,
        formData.otherInstallments,
        formData.monthlyInterestRate
      );
      
      setResult(calculationResult);
      setShowResults(true);
    } catch (error) {
      console.error("Error in calculation:", error);
      // Reset hasil jika terjadi error
      setShowResults(false);
      setResult(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <div className="container mx-auto py-8 px-4 flex-grow">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">
          Simulasi Kredit Tanpa Agunan (KTA) - Limit Kredit
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* BAGIAN 1: FORM INPUT (Ini yang sebelumnya mungkin hilang) */}
          <div className="lg:col-span-1 bg-white p-6 rounded-lg shadow-md">
            <PersonalLoanForm onCalculate={handleCalculate} />
          </div>
          
          {/* BAGIAN 2: HASIL DAN TABEL (Akan muncul setelah dihitung) */}
          <div className="lg:col-span-2">
            {/* 
              Kondisi ini sangat penting:
              Hanya tampilkan hasil JIKA showResults=true DAN result memiliki data (tidak null)
            */}
            {showResults && result && (
              <div className="space-y-6">
                <PersonalLoanResult result={result} />
                <PersonalLoanSchedule limitTable={result.limitTable} />
              </div>
            )}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
