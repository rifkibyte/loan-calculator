// src/utils/calculators/personal-loan/personalLoanOnlineCalculator.ts

import { AmortizationItem } from "@/types/common"; // Asumsi tipe ini ada di common.ts

/**
 * Interface untuk hasil kalkulasi pinjaman online.
 */
export interface PersonalLoanOnlineResult {
  monthlyPayment: number; // Angsuran bulanan
  totalPayment: number;   // Total pengembalian
  totalInterest: number;  // Total bunga
  schedule: AmortizationItem[]; // Jadwal angsuran
}

/**
 * Menghitung detail pinjaman online menggunakan metode bunga flat bulanan.
 *
 * @param principal Jumlah pokok pinjaman.
 * @param monthlyInterestRate Suku bunga flat per BULAN (misal: 5 untuk 5%).
 * @param loanTermYears Jangka waktu pinjaman dalam TAHUN.
 * @returns Objek yang berisi detail angsuran dan jadwal pembayaran.
 */
export function calculatePersonalLoanOnline(
  principal: number,
  monthlyInterestRate: number,
  loanTermYears: number
): PersonalLoanOnlineResult {
  // Konversi input ke satuan yang sesuai untuk kalkulasi
  const loanTermMonths = loanTermYears * 12;
  const interestRateDecimal = monthlyInterestRate / 100;

  // --- Kalkulasi Bunga Flat ---
  // 1. Total bunga selama masa pinjaman
  const totalInterest = principal * interestRateDecimal * loanTermMonths;

  // 2. Total pinjaman yang harus dikembalikan
  const totalPayment = principal + totalInterest;

  // 3. Angsuran bulanan (pokok + bunga dibagi rata)
  const monthlyPayment = totalPayment / loanTermMonths;

  // 4. Porsi pokok dan bunga dalam satu angsuran (konstan setiap bulan)
  const monthlyPrincipalPayment = principal / loanTermMonths;
  const monthlyInterestPayment = totalInterest / loanTermMonths;

  // --- Membuat Jadwal Amortisasi ---
  const schedule: AmortizationItem[] = [];
  let remainingBalance = principal;

  for (let period = 1; period <= loanTermMonths; period++) {
    remainingBalance -= monthlyPrincipalPayment;

    // Pastikan sisa saldo di akhir periode adalah 0
    const currentRemainingBalance = period === loanTermMonths ? 0 : remainingBalance;

    schedule.push({
      period,
      payment: monthlyPayment,
      principal: monthlyPrincipalPayment,
      interest: monthlyInterestPayment,
      remainingBalance: currentRemainingBalance,
    });
  }

  return {
    monthlyPayment,
    totalPayment,
    totalInterest,
    schedule,
  };
}
