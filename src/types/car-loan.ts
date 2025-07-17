import { CommonLoanResult } from "./common";

export interface CarLoanBudgetResult extends CommonLoanResult {
  carPrice: number;
  downPaymentAmount: number;
  firstPayment: number;
  monthlyPrincipal: number;
  monthlyInterest: number;
  downPaymentPercent: number;
  loanTerm: number;
  interestRate: number;
  monthlyInterestRate: number;
  monthlyPayment: number;
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
