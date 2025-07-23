// src/app/credit/annuity/page.tsx
"use client";

import {
  CreditAnnuityForm,
  CreditAnnuityResult,
  CreditAnnuitySchedule,
} from "@/features/credit/annuity";
import { calculateAnnuityLoan } from "@/utils/calculators/credit/annuityCalculator";
import { CreditAnnuityResult as LoanDetails } from "@/types/credit-annuity";
import { AmortizationItem } from "@/types/common";

// Impor untuk layout dan komponen reusable
import { Header, Footer } from "@/components/layout";
import { LoanCalculatorController } from "@/components/ui/loan";

// Tipe untuk input form
interface CreditAnnuityFormInput {
  loanAmount: number;
  loanTermMonths: number;
  annualInterestRate: number;
}

// Tipe untuk hasil kalkulasi yang akan disimpan di state
interface CalculationResult extends LoanDetails {
  amortizationSchedule: AmortizationItem[];
}

export default function CreditAnnuityPage() {
  // 1. Logika kalkulasi diekstrak ke dalam fungsi murni.
  // Fungsi ini menerima data dari form dan mengembalikan struktur data yang dibutuhkan.
  const performAnnuityCalculation = (
    formData: CreditAnnuityFormInput
  ): CalculationResult => {
    const { loanAmount, loanTermMonths, annualInterestRate } = formData;
    const result = calculateAnnuityLoan(
      loanAmount,
      loanTermMonths,
      annualInterestRate
    );

    // Mengembalikan objek yang lengkap untuk state
    return {
      loanAmount: result.loanAmount,
      loanTermMonths: result.loanTermMonths,
      loanTermYears: result.loanTermYears,
      annualInterestRate: result.annualInterestRate,
      monthlyInterestRate: result.monthlyInterestRate,
      monthlyPayment: result.monthlyPayment,
      totalPayment: result.totalPayment,
      totalInterest: result.totalInterest,
      amortizationSchedule: result.amortizationSchedule,
      // Properti dummy untuk memenuhi tipe LoanDetails, karena ini dihitung per baris di jadwal
      monthlyPrincipal: 0,
      monthlyInterest: 0,
    };
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="container mx-auto py-10 px-4 flex-grow">
        {/* 2. Gunakan controller reusable. Semua state dan layout ada di dalamnya. */}
        <LoanCalculatorController
          pageTitle="Kalkulator Kredit - Bunga Anuitas"
          pageDescription="Hitung angsuran bulanan, total pembayaran, dan lihat jadwal amortisasi untuk pinjaman anuitas Anda."
          FormComponent={CreditAnnuityForm}
          performCalculation={performAnnuityCalculation}
        >
          {/* 3. Gunakan pola "render prop" untuk mendefinisikan bagaimana hasil ditampilkan */}
          {(loanDetails) => (
            <>
              <CreditAnnuityResult loanDetails={loanDetails} />
              <CreditAnnuitySchedule schedule={loanDetails.amortizationSchedule} />
            </>
          )}
        </LoanCalculatorController>
      </main>
      <Footer />
    </div>
  );
}
