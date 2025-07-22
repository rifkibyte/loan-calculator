"use client";

// 1. Impor komponen spesifik untuk fitur ini
import {
  CarLoanForm,
  CarLoanResult,
  CarLoanSchedule,
} from "@/features/car-loan/complete";

// 2. Impor komponen layout dan controller reusable
import { Header, Footer } from "@/components/layout";
import { LoanCalculatorController } from "@/components/ui/loan"; // Pastikan path ini benar

// 3. Impor fungsi kalkulator murni
import { calculateLoan } from "@/utils/calculators/car-loan/completeCalculator";

// --- Definisi Tipe Data Langsung di File (sesuai permintaan) ---
interface AmortizationItem {
  period: number;
  payment: number;
  principal: number;
  interest: number;
  remainingBalance: number;
}

// Interface untuk data yang dikirim dari form
interface FormData {
  carPrice: number;
  downPaymentPercent: number;
  loanTerm: number;
  interestRate: number;
  insurancePercent: number;
  provisionPercent: number;
  policyFee: number;
  adminFee: number;
}

// Interface lengkap untuk detail hasil kalkulasi pinjaman
interface LoanDetails {
  carPrice: number;
  downPaymentPercent: number;
  downPaymentAmount: number;
  loanTerm: number;
  interestRate: number;
  monthlyInterestRate: number;
  loanAmount: number;
  monthlyPayment: number;
  monthlyPrincipal: number;
  monthlyInterest: number;
  totalPayment: number;
  totalInterest: number;
  insurancePercent: number;
  insuranceAmount: number;
  provisionPercent: number;
  provisionAmount: number;
  policyFee: number;
  adminFee: number;
  firstPayment: number;
  amortizationSchedule: AmortizationItem[];
}

// --- Komponen Halaman ---

export default function CarLoanCompletePage() {
  // 4. Logika kalkulasi dan transformasi data diekstrak ke fungsi murni.
  // Fungsi ini akan diteruskan sebagai prop ke controller.
  const performCompleteCalculation = (formData: FormData): LoanDetails => {
    // Panggil fungsi kalkulator inti
    const calculationResult = calculateLoan(
      formData.carPrice,
      formData.downPaymentPercent,
      formData.loanTerm,
      formData.interestRate,
      formData.insurancePercent,
      formData.provisionPercent,
      formData.policyFee,
      formData.adminFee
    );

    // Gabungkan data dari form dan hasil kalkulasi untuk membentuk objek state yang lengkap
    return {
      // Data dari form
      carPrice: formData.carPrice,
      downPaymentPercent: formData.downPaymentPercent,
      loanTerm: formData.loanTerm,
      interestRate: formData.interestRate,
      insurancePercent: formData.insurancePercent,
      provisionPercent: formData.provisionPercent,
      policyFee: formData.policyFee,
      adminFee: formData.adminFee,

      // Data dari hasil kalkulasi
      downPaymentAmount:
        formData.carPrice * (formData.downPaymentPercent / 100),
      monthlyInterestRate: formData.interestRate / 12, // Pastikan ini sesuai dengan kalkulasi Anda
      loanAmount: calculationResult.loanAmount,
      monthlyPayment: calculationResult.monthlyPayment,
      monthlyPrincipal: calculationResult.monthlyPrincipal,
      monthlyInterest: calculationResult.monthlyInterest,
      totalPayment: calculationResult.totalPayment,
      totalInterest: calculationResult.totalInterest,
      insuranceAmount: calculationResult.insuranceAmount,
      provisionAmount: calculationResult.provisionAmount,
      firstPayment: calculationResult.firstPayment,
      amortizationSchedule: calculationResult.amortizationSchedule,
    };
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="container mx-auto py-10 px-4 flex-grow">
        {/* 5. Gunakan controller reusable. Semua state, layout, dan logika ada di dalamnya. */}
        <LoanCalculatorController<FormData, LoanDetails>
          pageTitle="Simulasi Kredit Mobil Lengkap"
          pageDescription="Hitung estimasi cicilan bulanan dan total biaya kredit mobil Anda dengan detail biaya tambahan seperti asuransi dan provisi."
          FormComponent={CarLoanForm}
          performCalculation={performCompleteCalculation}
        >
          {/* 6. Gunakan pola "render prop" untuk mendefinisikan bagaimana hasil ditampilkan */}
          {(loanDetails) => (
            <>
              <CarLoanResult loanDetails={loanDetails} />
              <CarLoanSchedule loanDetails={loanDetails} />
            </>
          )}
        </LoanCalculatorController>
      </main>
      <Footer />
    </div>
  );
}
