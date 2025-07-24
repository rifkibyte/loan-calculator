// File: /types/peoples-business-credit.ts

import { AmortizationItem } from './common';

// Tipe HANYA untuk data yang berasal dari form (Input)
export interface PeopleBusinessCreditFormData {
  loanAmount: number;
  loanTerm: number;
  interestRate: number;
  loanPurpose: string;
  adminFee: number;
  insuranceFee: number;
}

// Tipe HANYA untuk data hasil kalkulasi (Output)
export interface PeopleBusinessCreditResult {
  monthlyPayment: number;
  monthlyPrincipal: number;
  monthlyInterest: number;
  totalPayment: number;
  totalInterest: number;
  firstPayment: number;
  amortizationSchedule: AmortizationItem[];
}
