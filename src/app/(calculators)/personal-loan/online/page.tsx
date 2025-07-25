// app/personal-loan/online/page.tsx
"use client";

// Impor komponen spesifik untuk Pinjaman Online
import {
  PersonalLoanOnlineForm, // Pastikan nama file form Anda adalah ini
  PersonalLoanOnlineResult,
  PersonalLoanOnlineSchedule,
} from "@/features/personal-loan/online";

// Impor fungsi kalkulator yang baru dibuat
import { calculatePersonalLoanOnline } from "@/utils/calculators/personal-loan/personalLoanOnlineCalculator";

// Impor tipe data yang relevan
import { LoanDetails } from "@/types/personal-loan-online";

// Impor komponen UI dan Controller
import { Header, Footer } from "@/components/layout";
import { LoanCalculatorController } from "@/components/ui/loan";

// Tipe untuk data input dari form
interface FormInput {
  loanAmount: number;
  interestRate: number; // Sesuai form, ini adalah bunga bulanan
  loanTerm: number;     // Sesuai form, ini adalah tenor dalam tahun
}

export default function PersonalLoanOnlinePage() {
  /**
   * Fungsi untuk melakukan kalkulasi pinjaman.
   */
  const performLoanCalculation = (formData: FormInput): LoanDetails => {
    const { loanAmount, interestRate, loanTerm } = formData;

    // Memanggil fungsi kalkulator bunga flat bulanan
    const calculationResult = calculatePersonalLoanOnline(
      loanAmount,
      interestRate, // Langsung diteruskan sebagai bunga bulanan
      loanTerm
    );

    // Menggabungkan input dari form dengan hasil kalkulasi
    return {
      loanAmount,
      interestRate,
      loanTerm,
      ...calculationResult,
    };
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="container mx-auto py-10 px-4 flex-grow">
        <LoanCalculatorController
          pageTitle="Kalkulator Pinjaman Online"
          pageDescription="Hitung estimasi angsuran bulanan untuk pinjaman online (pinjol) dengan bunga flat bulanan."
          FormComponent={PersonalLoanOnlineForm} // Gunakan form yang sesuai
          performCalculation={performLoanCalculation}
        >
          {(loanDetails) => (
            <>
              <PersonalLoanOnlineResult loanDetails={loanDetails} />
              <PersonalLoanOnlineSchedule schedule={loanDetails.schedule} />
            </>
          )}
        </LoanCalculatorController>
      </main>
      <Footer />
    </div>
  );
}
