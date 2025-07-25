// src/types/multi-purpose-loan.ts

// Impor tipe umum jika diperlukan
import { AmortizationItem } from "./common";


export interface MultiPurposeLoanFormData {
  loanAmount: number;
  loanTerm: number;
  interestRate: number;
  variableRate: number;
  fixedRatePeriod: number;
  provisionPercent: number;
  adminFee: number;
}

export interface MultiPurposeLoanResult {
  monthlyPayment: number;
  monthlyPrincipal: number;
  monthlyInterest: number;
  totalPayment: number;
  totalInterest: number;
  provisionAmount: number;
  firstPayment: number;
  amortizationSchedule: AmortizationItem[];
  // Properti di bawah ini sudah ada di FormData, tapi kita pastikan ada di Result juga
  // untuk ditampilkan di komponen hasil.
  loanAmount: number;
  fixedRatePeriod: number;
  variableRate: number;
  adminFee: number;
}
