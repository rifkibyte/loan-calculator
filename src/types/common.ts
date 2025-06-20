export interface AmortizationItem {
  period: number;
  payment: number;
  principal: number;
  interest: number;
  remainingBalance: number;
}

export interface CommonLoanResult {
  loanAmount: number;
  monthlyPayment?: number;
  monthlyPrincipal: number;
  monthlyInterest: number;
  totalPayment?: number;
  totalInterest?: number;
  amortizationSchedule: AmortizationItem[];
}