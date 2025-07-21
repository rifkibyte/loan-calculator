import { CommonLoanResult } from "./common";

// types/car-loan.ts (Updated)

import { CommonLoanResult } from "./common";

export interface CarLoanBudgetResult extends CommonLoanResult {
  carPrice: number;
  downPaymentAmount: number;
  downPaymentPercent: number;
  loanTerm: number;
  interestRate: number;
  monthlyInterestRate: number;
  monthlyPayment: number;
  monthlyPrincipal: number;
  monthlyInterest: number;
  totalPayment: number;      // Tambahkan ini
  totalInterest: number;     // Tambahkan ini
  firstPayment: number;
}

// Car Loan Complete Types
export interface CarLoanCompleteResult extends CommonLoanResult {
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
  insuranceAmount: number;
  provisionAmount: number;
  policyFee: number;
  adminFee: number;
  firstPayment: number;
}

// Car Loan Simple Types
export interface CarLoanSimpleResult extends CommonLoanResult {
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
  firstPayment: number;
}
