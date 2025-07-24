// File: /app/(calculators)/other-credit/people-business-credit/page.tsx

"use client";

// Impor untuk fitur spesifik (Kredit Usaha Rakyat)
import {
  PeopleBusinessCreditForm,
  PeopleBusinessCreditResult as PeopleBusinessCreditResultComponent,
  PeopleBusinessCreditSchedule,
} from "@/features/other-credit/people-business-credit";

// Impor tipe data yang relevan (menggunakan definisi yang sudah dirapikan)
import {
  PeopleBusinessCreditFormData,
  PeopleBusinessCreditResult,
} from "@/types/peoples-business-credit";

// Impor kalkulator
import { calculatePeopleBusinessCredit } from "@/utils/calculators/other-credit/peopleBusinessCreditCalculator";

// Impor komponen layout dan controller reusable
import { Header, Footer } from "@/components/layout/";
import { LoanCalculatorController } from "@/components/ui/loan";

// Tipe gabungan untuk state yang lengkap, menggabungkan input dan output.
type LoanDetails = PeopleBusinessCreditFormData & PeopleBusinessCreditResult;

export default function PeopleBusinessCreditPage() {
  /**
   * Fungsi murni untuk melakukan kalkulasi dan transformasi data.
   */
  const performPeopleBusinessCreditCalculation = (
    formData: PeopleBusinessCreditFormData
  ): LoanDetails => {
    // Memanggil fungsi kalkulator inti
    const calculationResult = calculatePeopleBusinessCredit(
      formData.loanAmount,
      formData.loanTerm,
      formData.interestRate,
      formData.adminFee,
      formData.insuranceFee
    );

    // Menggabungkan data input (formData) dengan hasil kalkulasi (calculationResult)
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
          pageTitle="Simulasi Kredit Usaha Rakyat (KUR)"
          pageDescription="Gunakan kalkulator ini untuk mendapatkan estimasi cicilan bulanan dan total biaya untuk pinjaman Kredit Usaha Rakyat Anda."
          FormComponent={PeopleBusinessCreditForm}
          performCalculation={performPeopleBusinessCreditCalculation}
        >
          {(loanDetails) => (
            <>
              <PeopleBusinessCreditResultComponent loanDetails={loanDetails} />

              {/*
               * FIX: Kirim prop 'schedule' yang diharapkan oleh komponen,
               * bukan seluruh objek 'loanDetails'.
               * Data jadwal diambil dari 'loanDetails.amortizationSchedule'.
               */}
              <PeopleBusinessCreditSchedule
                schedule={loanDetails.amortizationSchedule}
              />
            </>
          )}
        </LoanCalculatorController>
      </main>
      <Footer />
    </div>
  );
}
