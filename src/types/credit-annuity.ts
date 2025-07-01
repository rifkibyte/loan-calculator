import { AmortizationItem, CommonLoanResult } from './common';

export interface CreditAnnuityResult extends CommonLoanResult {
  loanAmount: number;
  loanTermMonths: number;
  loanTermYears: number;
  annualInterestRate: number;
  monthlyInterestRate: number;
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
  amortizationSchedule: AmortizationItem[];
}

export interface CreditAnnuityFormData {
  loanAmount: number;
  loanTermMonths: number;
  annualInterestRate: number;
}
