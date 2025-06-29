import { CommonLoanResult } from "./common";

export interface MortgageIncomeResult extends CommonLoanResult {
  netIncome: number;
  downPaymentPercent: number;
  downPaymentAmount: number;
  loanTerm: number;
  interestRate: number;
  monthlyInterestRate: number;
  maxInstallmentPercent: number;
  maxInstallmentAmount: number;
  maxHousePrice: number;
  minDownPayment: number;
  maxLoanAmount: number;
  provisionFee: number;
  adminFee: number;
  totalFirstPayment: number;
  calculationMethod: "anuitas";
}

export interface MortgageIncomeResultProps {
  loanDetails: {
    netIncome: number;
    downPaymentPercent: number;
    downPaymentAmount: number;
    loanTerm: number;
    interestRate: number;
    monthlyInterestRate: number;
    maxInstallmentPercent: number;
    maxInstallmentAmount: number;
    maxHousePrice: number;
    minDownPayment: number;
    maxLoanAmount: number;
    monthlyPayment: number;
    monthlyPrincipal: number;
    monthlyInterest: number;
    totalPayment: number;
    totalInterest: number;
    provisionFee: number;
    adminFee: number;
    totalFirstPayment: number;
    calculationMethod: string;
  };
}
