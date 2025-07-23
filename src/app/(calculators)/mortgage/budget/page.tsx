// src/app/(calculators)/mortgage/budget/page.tsx (Dengan Perbaikan)
"use client";

// 1. Impor fitur spesifik untuk Kalkulator KPR Budget
import {
  MortgageBudgetForm,
  MortgageBudgetResult,
  MortgageBudgetSchedule,
} from "@/features/mortgage/budget";
import { calculateMortgageBudget } from "@/utils/calculators/mortgage/budgetCalculator";
import type { MortgageBudgetResult as BudgetDetails } from "@/types/mortgage-budget";

// 2. Impor komponen layout dan controller reusable
import { Header, Footer } from "@/components/layout";
import { LoanCalculatorController } from "@/components/ui/loan";

// 3. Definisikan tipe data untuk input form agar lebih jelas
interface MortgageBudgetFormInput {
  monthlyBudget: number;
  downPaymentPercent: number;
  loanTerm: number;
  annualInterestRate: number;
  installmentPercent: number;
  provisionPercent: number;
  adminPercent: number;
}

export default function MortgageBudgetPage() {
  const performMortgageBudgetCalculation = (
    formData: MortgageBudgetFormInput
  ): BudgetDetails => {
    const {
      monthlyBudget,
      downPaymentPercent,
      loanTerm,
      annualInterestRate,
      installmentPercent,
      provisionPercent,
      adminPercent,
    } = formData;

    const calcResult = calculateMortgageBudget(
      monthlyBudget,
      downPaymentPercent,
      loanTerm,
      annualInterestRate,
      installmentPercent,
      provisionPercent,
      adminPercent
    );

    const totalPayment = calcResult.maxMonthlyPayment * loanTerm * 12;
    const totalInterest = totalPayment - calcResult.maxLoanAmount;
    const firstPayment =
      calcResult.minDownPayment +
      calcResult.maxMonthlyPayment +
      calcResult.provisionAmount +
      calcResult.adminAmount;

    // Gabungkan semua data menjadi satu objek BudgetDetails yang lengkap
    return {
      ...calcResult,

      // --- PERBAIKAN DIMULAI DI SINI ---
      // Petakan properti dari hasil kalkulasi ke nama yang diharapkan oleh tipe BudgetDetails.
      loanAmount: calcResult.maxLoanAmount,
      monthlyPayment: calcResult.maxMonthlyPayment,
      // Tambahkan properti yang hilang dan bersifat statis.
      calculationMethod: "Anuitas",
      // --- PERBAIKAN SELESAI ---

      // Data dari form
      monthlyBudget,
      downPaymentPercent,
      loanTerm,
      annualInterestRate,
      installmentPercent,
      provisionPercent,
      adminPercent,

      // Data turunan lainnya
      loanTermMonths: loanTerm * 12,
      monthlyInterestRate: annualInterestRate / 12,
      totalPayment,
      totalInterest,
      firstPayment,
    };
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="container mx-auto py-10 px-4 flex-grow">
        <LoanCalculatorController
          pageTitle="Simulasi KPR - Berdasar Budget"
          pageDescription="Hitung estimasi harga rumah yang bisa Anda beli berdasarkan budget angsuran bulanan Anda."
          FormComponent={MortgageBudgetForm}
          performCalculation={performMortgageBudgetCalculation}
        >
          {(budgetDetails) => (
            <>
              <MortgageBudgetResult budgetDetails={budgetDetails} />
              <MortgageBudgetSchedule loanDetails={budgetDetails} />
            </>
          )}
        </LoanCalculatorController>
      </main>
      <Footer />
    </div>
  );
}
