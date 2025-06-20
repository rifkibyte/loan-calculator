import { AmortizationItem, CommonLoanResult } from './common';

// Car Loan Budget Types
export interface CarLoanBudgetResult extends CommonLoanResult {
  carPrice: number;
  downPaymentAmount: number;
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