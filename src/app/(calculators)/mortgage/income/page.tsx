"use client";

// Impor untuk fitur spesifik (Mortgage Income)
import {
  MortgageIncomeForm,
  MortgageIncomeResult,
  MortgageIncomeSchedule,
} from "@/features/mortgage/income";
import { calculateMortgageIncome } from "@/utils/calculators/mortgage/incomeCalculator";
import { MortgageIncomeResult as LoanDetails } from "@/types/mortgage-income";

// Impor untuk layout dan komponen reusable
import { Header, Footer } from "@/components/layout";
import { LoanCalculatorController } from "@/components/ui/loan"; // Asumsi path controller

// Definisikan tipe data untuk form agar lebih jelas
interface MortgageIncomeFormData {
  netIncome: number;
  downPaymentPercent: number;
  loanTerm: number;
  interestRate: number;
  maxInstallmentPercent: number;
}

export default function MortgageIncomePage() {
  /**
   * Fungsi murni untuk melakukan kalkulasi dan transformasi data.
   * Mengambil data dari form dan mengembalikan objek state yang lengkap.
   */
  const performIncomeCalculation = (
    formData: MortgageIncomeFormData
  ): LoanDetails => {
    const {
      netIncome,
      downPaymentPercent,
      loanTerm,
      interestRate,
      maxInstallmentPercent,
    } = formData;

    const calculationResult = calculateMortgageIncome(
      netIncome,
      downPaymentPercent,
      loanTerm,
      interestRate,
      maxInstallmentPercent
    );

    // FIX: Gabungkan hasil dengan benar untuk memenuhi tipe LoanDetails
    return {
      ...formData,
      ...calculationResult,
      downPaymentAmount: calculationResult.minDownPayment,
      monthlyInterestRate: interestRate / 12,
      loanAmount: calculationResult.maxLoanAmount, // Alias untuk konsistensi
      calculationMethod: "anuitas", // Sesuai implementasi sebelumnya
    };
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="container mx-auto py-10 px-4 flex-grow">
        <LoanCalculatorController
          pageTitle="Perhitungan Angsuran KPR"
          pageDescription="Perhitungan cicilan KPR berdasar penghasilan bersih."
          FormComponent={MortgageIncomeForm}
          performCalculation={performIncomeCalculation}
        >
          {/* Gunakan pola "render prop" untuk mendefinisikan bagaimana hasil ditampilkan */}
          {(loanDetails) => (
            <div className="space-y-6">
              <MortgageIncomeResult loanDetails={loanDetails} />
              <MortgageIncomeSchedule
                schedule={loanDetails.amortizationSchedule}
              />
            </div>
          )}
        </LoanCalculatorController>
      </main>
      <Footer />
    </div>
  );
}
