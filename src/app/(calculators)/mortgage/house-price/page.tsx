"use client";

// Impor untuk fitur spesifik (Mortgage House Price)
import {
  MortgageHousePriceForm,
  MortgageHousePriceResult,
  MortgageHousePriceSchedule,
} from "@/features/mortgage/house-price";
import { calculateMortgage } from "@/utils/calculators/mortgage/housePriceCalculator";
import {
  MortgageHousePriceResult as MortgageDetails,
  MortgageHousePriceFormData,
} from "@/types/mortgage-house-price";

// Impor untuk layout dan komponen reusable
import { Header, Footer } from "@/components/layout";
import { LoanCalculatorController } from "@/components/ui/loan"; // Asumsi path controller

export default function MortgageHousePricePage() {
  /**
   * Fungsi murni untuk melakukan kalkulasi dan transformasi data.
   * Mengambil data dari form dan mengembalikan objek state yang lengkap.
   */
  const performMortgageCalculation = (
    formData: MortgageHousePriceFormData
  ): MortgageDetails => {
    const {
      housePrice,
      downPaymentPercent,
      loanTerm,
      annualInterestRate,
      calculationMethod,
    } = formData;

    const calculationResult = calculateMortgage(
      housePrice,
      downPaymentPercent,
      loanTerm,
      annualInterestRate,
      calculationMethod
    );

    // Ambil rincian angsuran bulan pertama dari jadwal amortisasi
    const firstMonthAmortization = calculationResult.amortizationSchedule[0];

    // Menggabungkan hasil kalkulasi dengan data dari form untuk membentuk objek state akhir
    // Ini juga memperbaiki error TypeScript dengan menyertakan semua properti yang dibutuhkan
    return {
      // Data dari form
      housePrice,
      downPaymentPercent,
      loanTerm,
      annualInterestRate,
      calculationMethod,

      // Data dari kalkulator
      ...calculationResult,

      // Data turunan atau tambahan
      downPaymentAmount: housePrice * (downPaymentPercent / 100),
      loanTermMonths: loanTerm * 12,
      monthlyInterestRate: annualInterestRate / 12,
      
      // FIX: Menambahkan properti yang hilang dari jadwal amortisasi
      monthlyPrincipal: firstMonthAmortization.principal,
      monthlyInterest: firstMonthAmortization.interest,

      // Biaya tambahan (contoh, bisa juga dari kalkulator)
      provisionPercent: 1,
      adminPercent: 0.1,
    };
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="container mx-auto py-10 px-4 flex-grow">
        <LoanCalculatorController
          pageTitle="Simulasi KPR - Berdasar Harga Rumah"
          pageDescription="Hitung estimasi cicilan KPR bulanan Anda berdasarkan harga properti, DP, dan tenor."
          FormComponent={MortgageHousePriceForm}
          performCalculation={performMortgageCalculation}
        >
          {/* Gunakan render prop untuk menampilkan komponen hasil */}
          {(loanDetails) => (
            <>
              <MortgageHousePriceResult mortgageDetails={loanDetails} />
              <MortgageHousePriceSchedule
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
