"use client";

// 1. Impor komponen spesifik untuk fitur ini
import {
  CarLoanSimpleForm,
  CarLoanSimpleResult,
  CarLoanSimpleSchedule,
} from "@/features/car-loan/simple";

// 2. Impor komponen layout dan controller reusable
import { Header, Footer } from "@/components/layout";
import { LoanCalculatorController } from "@/components/ui/loan"; // Pastikan path ini benar

// 3. Impor fungsi kalkulator murni
import { calculateSimpleLoan } from "@/utils/calculators/car-loan/simpleCalculator";

// --- Definisi Tipe Data Langsung di File (sesuai permintaan) ---

// Interface untuk data yang dikirim dari form
interface FormData {
  carPrice: number;
  downPaymentPercent: number;
  loanTerm: number;
  interestRate: number;
}

// Interface untuk setiap baris dalam tabel amortisasi
interface AmortizationItem {
  period: number;
  payment: number;
  principal: number;
  interest: number;
  remainingBalance: number;
}

// Interface lengkap untuk detail hasil kalkulasi pinjaman.
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
  firstPayment: number;
  amortizationSchedule: AmortizationItem[];
}

// --- Komponen Halaman ---

export default function CarLoanSimplePage() {
  const performSimpleCalculation = (formData: FormData): LoanDetails => {
    const calculationResult = calculateSimpleLoan(
      formData.carPrice,
      formData.downPaymentPercent,
      formData.loanTerm,
      formData.interestRate
    );

    return {
      carPrice: formData.carPrice,
      downPaymentPercent: formData.downPaymentPercent,
      loanTerm: formData.loanTerm,
      interestRate: formData.interestRate,
      downPaymentAmount: formData.carPrice * (formData.downPaymentPercent / 100),
      monthlyInterestRate: formData.interestRate / 12,
      ...calculationResult,
    };
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="container mx-auto py-10 px-4 flex-grow">
        <LoanCalculatorController<FormData, LoanDetails>
          pageTitle="Simulasi Kredit Mobil Sederhana"
          pageDescription="Hitung estimasi cicilan bulanan untuk kredit mobil Anda dengan cepat dan mudah."
          FormComponent={CarLoanSimpleForm}
          performCalculation={performSimpleCalculation}
        >
          {(loanDetails) => (
            <>
              <CarLoanSimpleResult loanDetails={loanDetails} />
              
              {/* --- PERBAIKAN DI SINI --- */}
              {/* Berikan hanya prop 'schedule' sesuai dengan definisi CarLoanSimpleScheduleProps */}
              <CarLoanSimpleSchedule
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
