import { AmortizationItem } from './common';

export interface PeopleBusinessCreditResult {
  loanAmount: number;
  loanTerm: number;
  interestRate: number;
  loanPurpose: string;
  monthlyPayment: number;
  monthlyPrincipal: number;
  monthlyInterest: number;
  totalPayment: number;
  totalInterest: number;
  adminFee: number;
  insuranceFee: number;
  firstPayment: number;
  amortizationSchedule: AmortizationItem[];
}

export interface PeopleBusinessCreditFormData {
  loanAmount: number;
  loanTerm: number;
  interestRate: number;
  loanPurpose: string;
  adminFee: number;
  insuranceFee: number;
}
