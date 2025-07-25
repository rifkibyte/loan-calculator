"use client";

// Impor untuk fitur spesifik (Personal Loan Amount)
import {
  PersonalLoanAmountForm,
  PersonalLoanAmountResult,
  PersonalLoanAmountSchedule,
} from "@/features/personal-loan/amount";

// Impor kalkulator dan tipe data yang relevan
import { calculateLoanAmountTable } from "@/utils/calculators/personal-loan/personalLoanAmountCalculator";
import { LoanAmountTableItem } from "@/types/personal-loan-amount";

// Impor untuk layout dan komponen controller reusable
import { Header, Footer } from "@/components/layout";
import { LoanCalculatorController } from "@/components/ui/loan";

// Tipe untuk data input dari form
interface PersonalLoanAmountFormInput {
  loanAmount: number;
  creditRatio: number;
  monthlyInterestRate: number;
  calculationMethod: string;
}

// Tipe untuk hasil kalkulasi yang komprehensif
// Ini akan menjadi "sumber kebenaran tunggal" untuk semua komponen hasil
export interface LoanAmountCalculationResult {
  loanAmount: number;
  creditRatio: number;
  monthlyInterestRate: number;
  annualInterestRate: number;
  calculationMethod: string;
  loanTable: LoanAmountTableItem[];
}

export default function PersonalLoanAmountPage() {
  // 1. Logika kalkulasi diekstrak ke dalam fungsi murni.
  // Fungsi ini menerima data form dan mengembalikan objek hasil yang terstruktur.
  const performAmountCalculation = (
    formData: PersonalLoanAmountFormInput
  ): LoanAmountCalculationResult => {
    const { loanAmount, creditRatio, monthlyInterestRate, calculationMethod } =
      formData;

    // Hanya kalkulasi utama (tabel limit) yang dilakukan di sini.
    // Kalkulasi jadwal angsuran akan ditangani oleh komponennya sendiri.
    const loanTable = calculateLoanAmountTable(
      loanAmount,
      creditRatio,
      monthlyInterestRate,
      calculationMethod
    );

    // Kembalikan satu objek hasil yang berisi semua data yang diperlukan
    // oleh komponen-komponen di bawahnya.
    return {
      loanAmount,
      creditRatio,
      monthlyInterestRate,
      annualInterestRate: monthlyInterestRate * 12,
      calculationMethod,
      loanTable,
    };
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="container mx-auto py-10 px-4 flex-grow">
        {/* 2. Gunakan LoanCalculatorController untuk mengelola state dan layout. */}
        <LoanCalculatorController
          pageTitle="Kalkulator KTA Berdasarkan Jumlah Pinjaman"
          pageDescription="Hitung estimasi angsuran bulanan untuk berbagai pilihan tenor berdasarkan jumlah pinjaman yang Anda inginkan."
          FormComponent={PersonalLoanAmountForm}
          performCalculation={performAmountCalculation}
        >
          {/* 3. Gunakan pola "render prop" untuk menampilkan hasil. */}
          {/* Controller akan menyediakan 'result' setelah kalkulasi berhasil. */}
          {(result) => (
            <div className="space-y-6">
              <PersonalLoanAmountResult resultData={result} />
            </div>
          )}
        </LoanCalculatorController>
      </main>
      <Footer />
    </div>
  );
}
