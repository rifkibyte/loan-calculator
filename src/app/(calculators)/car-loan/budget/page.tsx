"use client";

// Impor untuk fitur spesifik (Budget)
import {
  CarLoanBudgetForm,
  CarLoanBudgetResult,
  CarLoanBudgetSchedule,
} from "@/features/car-loan/budget";
import { calculateLoanFromBudget } from "@/utils/calculators/car-loan/budgetCalculator";
import { CarLoanBudgetResult as LoanDetails } from "@/types/car-loan";

// Impor untuk layout dan komponen reusable baru kita
import { Header, Footer } from "@/components/layout";
import { LoanCalculatorController } from "@/components/ui/loan";
interface CarLoanBudgetFormInput {
  budget: number;
  downPaymentPercent: number;
  loanTerm: number;
  interestRate: number;
}

export default function CarLoanBudgetPage() {
  // 1. Logika kalkulasi dan transformasi data diekstrak ke fungsi murni.
  // Fungsi ini akan kita teruskan sebagai prop ke controller.
  const performBudgetCalculation = (
    formData: CarLoanBudgetFormInput
  ): LoanDetails => {
    const { budget, downPaymentPercent, loanTerm, interestRate } = formData;
    const calculationResult = calculateLoanFromBudget(
      budget,
      downPaymentPercent,
      loanTerm,
      interestRate
    );

    // Menggabungkan hasil kalkulasi dengan data dari form untuk membentuk objek state akhir
    return {
      ...calculationResult,
      downPaymentPercent,
      loanTerm,
      interestRate,
      monthlyInterestRate: interestRate / 12 / 100,
      monthlyPayment: budget,
    };
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="container mx-auto py-10 px-4 flex-grow">
        {/* 2. Gunakan controller reusable. Semua state dan layout ada di dalamnya. */}
        <LoanCalculatorController
          pageTitle="Kalkulator KKB Berdasarkan Budget"
          pageDescription="Masukkan budget angsuran bulanan Anda untuk mengetahui estimasi harga mobil yang bisa Anda dapatkan."
          FormComponent={CarLoanBudgetForm}
          performCalculation={performBudgetCalculation}
        >
          {/* 3. Gunakan pola "render prop" untuk mendefinisikan bagaimana hasil ditampilkan */}
          {(loanDetails) => (
            <>
              <CarLoanBudgetResult loanDetails={loanDetails} />
              <CarLoanBudgetSchedule loanDetails={loanDetails} />
            </>
          )}
        </LoanCalculatorController>
      </main>
      <Footer />
    </div>
  );
}
