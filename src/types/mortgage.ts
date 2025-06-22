import { AmortizationItem } from "./common";

export interface MortgageResult {
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
  provisionPercent: number;
  provisionAmount: number;
  appraisalFee: number;
  adminFee: number;
  notaryFee: number;
  insuranceFee: number;
  njoptkp: number;
  bphtbTax: number;
  totalCosts: number;
  firstPayment: number;
  calculationMethod: string;
  amortizationSchedule: AmortizationItem[];
}
