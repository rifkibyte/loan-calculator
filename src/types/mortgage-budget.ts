// src/types/mortgage-budget.ts (lengkap)
import { CommonLoanResult, AmortizationItem } from "./common";

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
