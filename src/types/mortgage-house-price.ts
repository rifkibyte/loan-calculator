import { CommonLoanResult, AmortizationItem } from "./common";

export interface MortgageHousePriceResult extends CommonLoanResult {
  housePrice: number;
  downPaymentPercent: number;
  downPaymentAmount: number;
  loanTerm: number;
  loanTermMonths: number;
  annualInterestRate: number;
  monthlyInterestRate: number;
  loanAmount: number;
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
  calculationMethod: string;
  minimumIncome30: number;
  minimumIncome33: number;
  minimumIncome40: number;
  provisionPercent: number;
  provisionAmount: number;
  adminPercent: number;
  adminAmount: number;
  amortizationSchedule: AmortizationItem[];
}

export interface MortgageHousePriceFormData {
  housePrice: number;
  loanTerm: number;
  annualInterestRate: number;
  downPaymentPercent: number;
  calculationMethod: 'anuitas' | 'flat';
}
