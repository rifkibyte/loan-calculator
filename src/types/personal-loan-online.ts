// src/types/personal-loan-online.ts

// Impor tipe dasar AmortizationItem dari file common atau definisikan di sini jika belum ada.
// Berdasarkan struktur Anda, kemungkinan besar ada di `types/common.ts`.
import { AmortizationItem } from "./common";

/**
 * Mendefinisikan struktur data lengkap untuk hasil kalkulator pinjaman online.
 * Ini menggabungkan input pengguna dengan hasil kalkulasi.
 */
export interface PersonalLoanOnlineDetails {
  // Input dari Form
  loanAmount: number;
  interestRate: number; // Ini adalah suku bunga per BULAN
  loanTerm: number;     // Tenor dalam TAHUN

  // Hasil dari Kalkulator
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
  schedule: AmortizationItem[];
}

/**
 * Alias tipe untuk digunakan di komponen halaman (`page.tsx`) agar lebih generik.
 */
export type LoanDetails = PersonalLoanOnlineDetails;

