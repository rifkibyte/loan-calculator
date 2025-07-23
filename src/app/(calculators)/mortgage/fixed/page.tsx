"use client";

// Impor untuk fitur spesifik (Mortgage Fixed)
import {
  MortgageFixedForm,
  MortgageFixedResult,
  MortgageFixedSchedule,
} from "@/features/mortgage/fixed";
import { calculateMortgageFixed } from "@/utils/calculators/mortgage/fixedCalculator";
import {
  MortgageFixedResult as FixedLoanDetails,
  MortgageFixedFormData,
} from "@/types/mortgage-fixed";

// Impor untuk layout dan komponen controller reusable
import { Header, Footer } from "@/components/layout";
import { LoanCalculatorController } from "@/components/ui/loan";

export default function MortgageFixedPage() {
  // 1. Logika kalkulasi diekstrak ke dalam fungsi murni.
  // Fungsi ini akan diteruskan sebagai prop ke controller.
  const performMortgageCalculation = (
    formData: MortgageFixedFormData
  ): FixedLoanDetails => {
    const { loanAmount, loanTerm, yearlyRates, calculationMethod } = formData;
    
    // Fungsi kalkulator sudah mengembalikan objek dengan struktur yang kita butuhkan.
    const calculationResult = calculateMortgageFixed(
      loanAmount,
      loanTerm,
      yearlyRates,
      calculationMethod
    );

    return calculationResult;
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <main className="container mx-auto py-10 px-4 flex-grow">
        {/* 2. Gunakan controller reusable. Semua state dan layout utama ada di dalamnya. */}
        <LoanCalculatorController
          pageTitle="Simulasi KPR Bunga Fixed"
          pageDescription="Simulasi kredit rumah dengan bunga fix selama beberapa tahun"
          FormComponent={MortgageFixedForm}
          performCalculation={performMortgageCalculation}
        >
          {/* 3. Gunakan pola "render prop" untuk mendefinisikan bagaimana hasil ditampilkan. */}
          {(loanDetails) => (
            <>
              <MortgageFixedResult loanDetails={loanDetails} />
              {/* Berdasarkan refactor sebelumnya, MortgageFixedSchedule hanya butuh schedule */}
              <MortgageFixedSchedule schedule={loanDetails.amortizationSchedule} />
            </>
          )}
        </LoanCalculatorController>
      </main>

      <Footer />
    </div>
  );
}
