"use client";

import {
  MortgageCompleteForm,
  MortgageCompleteResult,
  MortgageCompleteSchedule,
} from "@/features/mortgage/complete";
import { calculateMortgage } from "@/utils/calculators/mortgage/mortgageCalculator";
import { MortgageResult as MortgageDetails } from "@/types/mortgage";

// Impor untuk layout dan komponen reusable
import { Header, Footer } from "@/components/layout/";
import { LoanCalculatorController } from "@/components/ui/loan";

// Interface untuk data dari form, tetap sama
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
  // 1. Logika kalkulasi dan transformasi data diekstrak ke fungsi murni.
  const performMortgageCalculation = (
    formData: FormData
  ): MortgageDetails => {
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

    // Menggabungkan hasil kalkulasi dengan data dari form untuk membentuk objek state akhir
    const mortgageDetailsData: MortgageDetails = {
      ...calculationResult,
      housePrice: formData.housePrice,
      downPaymentPercent: formData.downPaymentPercent,
      loanTerm: formData.loanTerm,
      loanTermMonths: formData.loanTerm * 12,
      annualInterestRate: formData.annualInterestRate,
      monthlyInterestRate: formData.annualInterestRate / 12,
      provisionPercent: formData.provisionPercent,
      appraisalFee: formData.appraisalFee,
      adminFee: formData.adminFee,
      notaryFee: formData.notaryFee,
      insuranceFee: formData.insuranceFee,
      njoptkp: formData.njoptkp,
      calculationMethod: "Anuitas",
    };

    return mortgageDetailsData;
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="container mx-auto py-10 px-4 flex-grow">
        <LoanCalculatorController
          pageTitle="Simulasi Kredit Rumah"
          pageDescription="Kalkulator kredit rumah dengan perhitungan yang lengkap."
          FormComponent={MortgageCompleteForm}
          performCalculation={performMortgageCalculation}
        >
          {(mortgageDetails) => (
            <>
              <MortgageCompleteResult mortgageDetails={mortgageDetails} />
              {/* PERBAIKAN DI SINI */}
              <MortgageCompleteSchedule mortgageDetails={mortgageDetails} />
            </>
          )}
        </LoanCalculatorController>
      </main>
      <Footer />
    </div>
  );
}
