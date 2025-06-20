import { AmortizationItem, CommonLoanResult } from './common';

export interface PersonalLoanResult extends CommonLoanResult {
  debtRatioAmount: number;
  maxKtaPayment: number;
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
}