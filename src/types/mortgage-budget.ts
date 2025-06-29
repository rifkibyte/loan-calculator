// src/types/common.ts (diperbaiki)
import { AmortizationItem } from "./common";
export interface CommonLoanResult {
  loanAmount: number;
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
  loanTerm: number; // ✅ Tambahkan
  loanTermMonths: number; // ✅ Tambahkan
  annualInterestRate: number; // ✅ Tambahkan
  monthlyInterestRate: number; // ✅ Ganti dari monthlyInterest
  calculationMethod: string;
}

export interface MortgageBudgetFormData {
  monthlyBudget: number;
  downPaymentPercent: number;
  loanTerm: number;
  annualInterestRate: number;
  installmentPercent: number;
  provisionPercent: number;
  adminPercent: number;
}

export interface MortgageBudgetResult extends CommonLoanResult {
  monthlyBudget: number;
  maxHousePrice: number;
  minDownPayment: number;
  maxLoanAmount: number;
  maxMonthlyPayment: number;
  minMonthlyIncome: number;
  provisionPercent: number;
  provisionAmount: number;
  adminPercent: number;
  adminAmount: number;
  amortizationSchedule: AmortizationItem[];
}
