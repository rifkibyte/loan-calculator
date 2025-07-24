// /utils/calculators/personal-loan/personalLoanCalculator.ts

// [FIX 1]: Export interface ini agar bisa diimpor di file lain.
export interface LoanLimitItem {
  term: number; // Jangka waktu dalam bulan
  maxPayment: number; // Maksimum angsuran (sama untuk semua baris)
  loanAmount: number; // Limit kredit yang dihitung
}

// [FIX 2]: Export interface ini dan sesuaikan isinya untuk logika baru.
export interface CalculationResult {
  // Input dan perhitungan awal
  netIncome: number;
  debtRatioPercent: number;
  otherLoanPayment: number;
  monthlyInterestRate: number;
  debtRatioAmount: number;
  maxKtaPayment: number;
  // Tabel hasil untuk berbagai jangka waktu
  limitTable: LoanLimitItem[];
}

/**
 * [FIX 3]: Ganti nama dan seluruh logika fungsi ini.
 * Menghitung tabel batas wajar pinjaman KTA menggunakan metode bunga FLAT.
 * Fungsi ini menghasilkan daftar potensi limit kredit untuk berbagai jangka waktu.
 *
 * @param netIncome - Penghasilan bersih per bulan
 * @param debtRatioPercent - Persentase rasio hutang (misal: 30)
 * @param otherLoanPayment - Angsuran pinjaman lain per bulan
 * @param monthlyInterestRate - Suku bunga per bulan (misal: 1.25)
 * @returns Objek hasil kalkulasi yang berisi input dan tabel limit.
 */
export function calculateKtaFlatLimit(
  netIncome: number,
  debtRatioPercent: number,
  otherLoanPayment: number,
  monthlyInterestRate: number
): CalculationResult {
  // --- 1. Validasi Input ---
  if (!netIncome || netIncome <= 0) throw new Error("Penghasilan bersih harus positif");
  if (!debtRatioPercent || debtRatioPercent <= 0) throw new Error("Rasio kredit harus positif");
  if (monthlyInterestRate === undefined || monthlyInterestRate <= 0) throw new Error("Suku bunga harus positif");

  // --- 2. Hitung Kemampuan Bayar Maksimal ---
  const debtRatioAmount = netIncome * (debtRatioPercent / 100);
  const maxKtaPayment = Math.max(0, debtRatioAmount - (otherLoanPayment || 0));

  // --- 3. Siapkan Jangka Waktu dan Hitung Limit untuk Setiap Tenor ---
  const i = monthlyInterestRate / 100; // Suku bunga desimal
  const loanTerms = [6, 12, 18, 24, 30, 36, 42, 48, 54, 60];
  let limitTable: LoanLimitItem[] = [];

  if (maxKtaPayment > 0) {
    limitTable = loanTerms.map(term => {
      // Rumus untuk mencari Pokok Pinjaman (Limit Kredit) dari angsuran FLAT
      // Angsuran = (Pokok + (Pokok * Bunga * Tenor)) / Tenor
      // Pokok = (Angsuran * Tenor) / (1 + (Bunga * Tenor))
      const loanAmount = (maxKtaPayment * term) / (1 + (i * term));
      return {
        term: term,
        maxPayment: maxKtaPayment,
        loanAmount: loanAmount,
      };
    });
  }

  // --- 4. Kembalikan Hasil Lengkap ---
  return {
    netIncome,
    debtRatioPercent,
    otherLoanPayment,
    monthlyInterestRate,
    debtRatioAmount,
    maxKtaPayment,
    limitTable,
  };
}
