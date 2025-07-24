// File: /types/multi-purpose-loan.ts
import { AmortizationItem, CommonLoanResult } from './common';

// Tidak ada perubahan di sini, hanya sebagai referensi
export interface MultiPurposeLoanResult extends CommonLoanResult {
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
  provisionAmount: number;
  adminFee: number;
  firstPayment: number;
  applicantType: 'employee' | 'professional' | 'entrepreneur';
  fixedRatePeriod: number;
  variableRate: number;
}

export interface MultiPurposeLoanFormData {
  loanAmount: number;
  loanTerm: number;
  interestRate: number;
  variableRate: number;
  fixedRatePeriod: number;
  applicantType: 'employee' | 'professional' | 'entrepreneur';
  provisionPercent: number;
  adminFee: number;
}
