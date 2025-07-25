"use client";

// Impor untuk fitur spesifik (Personal Loan Income)
import {
  PersonalLoanForm,
  PersonalLoanResult,
  PersonalLoanSchedule,
} from "@/features/personal-loan/income";

// Impor kalkulator dan tipe datanya, dengan alias agar konsisten
import {
  calculateKtaFlatLimit,
  CalculationResult as LoanDetails,
} from "@/utils/calculators/personal-loan/personalLoanIncomeCalculator";

// Impor untuk layout dan komponen controller reusable
import { Header, Footer } from "@/components/layout";
import { LoanCalculatorController } from "@/components/ui/loan";

// Tipe untuk data input dari form, agar lebih eksplisit
interface PersonalLoanFormInput {
  netIncome: number;
  creditRatio: number;
  otherInstallments: number;
  monthlyInterestRate: number;
}

export default function PersonalLoanIncomePage() {
  // 1. Logika kalkulasi diekstrak ke dalam fungsi murni.
  // Fungsi ini tidak memiliki side-effect dan hanya mengubah input menjadi output.
  const performIncomeCalculation = (
    formData: PersonalLoanFormInput
  ): LoanDetails => {
    const { netIncome, creditRatio, otherInstallments, monthlyInterestRate } =
      formData;

    // Cukup panggil fungsi kalkulator dan kembalikan hasilnya.
    // Controller akan menangani state dari hasil ini.
    const calculationResult = calculateKtaFlatLimit(
      netIncome,
      creditRatio,
      otherInstallments,
      monthlyInterestRate
    );

    return calculationResult;
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="container mx-auto py-10 px-4 flex-grow">
        {/* 2. Gunakan LoanCalculatorController untuk mengelola state dan layout. */}
        <LoanCalculatorController
          pageTitle="Kalkulator KTA Berdasarkan Pendapatan"
          pageDescription="Hitung estimasi limit pinjaman dan angsuran bulanan berdasarkan penghasilan bersih Anda."
          FormComponent={PersonalLoanForm}
          performCalculation={performIncomeCalculation}
        >
          {/* 3. Gunakan pola "render prop" untuk menampilkan hasil. */}
          {/* Controller akan menyediakan 'result' setelah kalkulasi berhasil. */}
          {(result) => (
            <div className="space-y-6">
              <PersonalLoanResult result={result} />
              <PersonalLoanSchedule limitTable={result.limitTable} />
            </div>
          )}
        </LoanCalculatorController>
      </main>
      <Footer />
    </div>
  );
}
