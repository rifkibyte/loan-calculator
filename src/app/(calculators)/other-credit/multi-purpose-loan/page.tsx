// File: /app/(calculators)/other-credit/multi-purpose-loan/page.tsx

"use client";

// Impor yang relevan untuk fitur Kredit Multi Guna
import {
  MultiPurposeLoanForm,
  MultiPurposeLoanResult as MultiPurposeLoanResultComponent, // Ganti nama impor komponen agar tidak konflik
  MultiPurposeLoanSchedule,
} from "@/features/other-credit/multi-purpose-loan";

// Impor tipe data
import {
  MultiPurposeLoanFormData,
  MultiPurposeLoanResult,
} from "@/types/multi-purpose-loan";

// Impor kalkulator
import { calculateMultiPurposeLoan } from "@/utils/calculators/other-credit/multiPurposeLoanCalculator";

// Impor komponen layout dan UI reusable
import { Header, Footer } from "@/components/layout/";
import { LoanCalculatorController } from "@/components/ui/loan";
import { AmortizationItem } from "@/types/common"; // Pastikan AmortizationItem diimpor

/**
 * FIX 1: Definisikan tipe 'LoanDetails' sebagai gabungan dari data form
 * dan hasil kalkulasi. Ini memastikan tipe state kita lengkap dan akurat.
 */
type LoanDetails = MultiPurposeLoanFormData & MultiPurposeLoanResult;

export default function MultiPurposeLoanPage() {
  /**
   * Fungsi murni untuk melakukan kalkulasi dan transformasi data.
   * Menerima data dari form dan mengembalikan objek state yang lengkap.
   */
  const performMultiPurposeLoanCalculation = (
    formData: MultiPurposeLoanFormData
  ): LoanDetails => {
    // Memanggil fungsi kalkulator inti
    const calculationResult = calculateMultiPurposeLoan(
      formData.loanAmount,
      formData.loanTerm,
      formData.interestRate,
      formData.variableRate,
      formData.fixedRatePeriod,
      formData.provisionPercent,
      formData.adminFee
    );

    // Menggabungkan hasil kalkulasi dengan data dari form untuk membentuk objek state akhir
    // Tipe kembaliannya sekarang cocok dengan 'LoanDetails' yang baru
    return {
      ...formData,
      ...calculationResult,
    };
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="container mx-auto py-10 px-4 flex-grow">
        <LoanCalculatorController
          pageTitle="Kalkulator Kredit Multi Guna Bank Mandiri"
          pageDescription="Simulasi kredit multi guna dengan suku bunga kompetitif mulai dari 6.00% fix 3 tahun pertama. Dapatkan perhitungan angsuran yang akurat untuk perencanaan keuangan Anda."
          FormComponent={MultiPurposeLoanForm}
          performCalculation={performMultiPurposeLoanCalculation}
        >
          {(loanDetails) => (
            <>
              {/* Komponen ini sekarang menerima prop 'loanDetails' dengan tipe yang benar */}
              <MultiPurposeLoanResultComponent loanDetails={loanDetails} />

              {/*
               * FIX 2: Sesuaikan props yang dikirim ke MultiPurposeLoanSchedule
               * agar cocok dengan definisinya (schedule dan fixedRatePeriod).
               */}
              <MultiPurposeLoanSchedule
                schedule={loanDetails.amortizationSchedule}
                fixedRatePeriod={loanDetails.fixedRatePeriod}
              />
            </>
          )}
        </LoanCalculatorController>
      </main>
      <Footer />
    </div>
  );
}
