import { AmortizationItem, CommonLoanResult } from './common';

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
