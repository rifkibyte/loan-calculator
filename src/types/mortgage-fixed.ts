import { CommonLoanResult } from './common';

export interface YearlyInterestRate {
  year: number;
  rate: number;
}

export interface MortgageFixedResult extends CommonLoanResult {
  loanAmount: number;
  loanTerm: number;
  loanTermMonths: number;
  yearlyRates: YearlyInterestRate[];
  calculationMethod: string;
  totalPayment: number;
  totalInterest: number;
  monthlyPayments: {
    period: number;
    year: number;
    interestRate: number;
    monthlyInterest: number;
    monthlyPrincipal: number;
    totalPayment: number;
    remainingBalance: number;
  }[];
}

export interface MortgageFixedFormData {
  loanAmount: number;
  loanTerm: number;
  yearlyRates: YearlyInterestRate[];
  calculationMethod: string;
}
