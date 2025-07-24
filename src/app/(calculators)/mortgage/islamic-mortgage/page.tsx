"use client";

// Impor untuk fitur spesifik (Islamic Mortgage)
import {
  IslamicMortgageForm,
  IslamicMortgageResult,
  IslamicMortgageSchedule,
} from "@/features/mortgage/islamic-mortgage";
import { calculateIslamicMortgage } from "@/utils/calculators/mortgage/islamicMortgageCalculator";

// FIX 1: Impor tipe Props yang sudah ada, bukan tipe baru.
// Ini akan menjadi "sumber kebenaran" untuk bentuk data yang kita butuhkan.
import { IslamicMortgageResultProps } from "@/types/islamic-mortgage";

// Impor untuk layout dan komponen reusable
import { Header, Footer } from "@/components/layout";
import { LoanCalculatorController } from "@/components/ui/loan";

// Definisikan tipe alias untuk objek detail pinjaman agar mudah dibaca.
// Kita ambil tipenya langsung dari properti 'mortgageDetails' yang diharapkan komponen.
type LoanDetails = IslamicMortgageResultProps["mortgageDetails"];

// Definisikan tipe data untuk form agar lebih jelas
interface IslamicMortgageFormData {
  housePrice: number;
  downPaymentPercent: number;
  loanTerm: number;
  marginRate: number;
  calculationMethod: 'anuitas' | 'flat';
}

export default function IslamicMortgagePage() {
  /**
   * Fungsi murni untuk melakukan kalkulasi dan transformasi data.
   * Mengembalikan objek yang bentuknya SESUAI PERSIS dengan tipe LoanDetails.
   */
  const performIslamicMortgageCalculation = (
    formData: IslamicMortgageFormData
  ): LoanDetails => {
    const { housePrice, downPaymentPercent, loanTerm, marginRate, calculationMethod } = formData;

    const calculationResult = calculateIslamicMortgage(
      housePrice,
      downPaymentPercent,
      loanTerm,
      marginRate,
      calculationMethod
    );

    // Buat objek hasil yang lengkap dan sesuai dengan tipe 'LoanDetails'
    return {
      // Data langsung dari form
      ...formData,
      
      // Semua hasil dari fungsi kalkulator
      ...calculationResult,

      // Data turunan atau yang perlu ditambahkan agar tipe cocok
      downPaymentAmount: housePrice * (downPaymentPercent / 100),
      loanTermMonths: loanTerm * 12,
      monthlyMarginRate: marginRate / 12,

      // Tambahkan properti yang hilang dengan nilai default agar tipe valid.
      // Kemungkinan properti ini akan Anda gunakan di masa depan.
      provisionAmount: 0,
      adminAmount: 0,
    };
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="container mx-auto py-10 px-4 flex-grow">
        <LoanCalculatorController
          pageTitle="Simulasi KPR Syariah"
          pageDescription="Hitung estimasi cicilan bulanan untuk pembiayaan rumah dengan prinsip syariah."
          FormComponent={IslamicMortgageForm}
          performCalculation={performIslamicMortgageCalculation}
        >
          {(loanDetails) => (
            <div className="space-y-6">
              {/* FIX 2: Gunakan prop 'mortgageDetails' yang benar sesuai harapan komponen */}
              <IslamicMortgageResult mortgageDetails={loanDetails} />
              
              <IslamicMortgageSchedule schedule={loanDetails.amortizationSchedule} />
            </div>
          )}
        </LoanCalculatorController>
      </main>
      <Footer />
    </div>
  );
}
