// types/islamic-mortgage.ts
import { AmortizationItem, CommonLoanResult } from './common';

export interface IslamicMortgageResult extends CommonLoanResult {
  housePrice: number;
  downPaymentPercent: number;
  downPaymentAmount: number;
  loanTerm: number;
  marginRate: number;
  monthlyMarginRate: number;
  calculationMethod: 'anuitas' | 'flat';
  monthlyPayment: number;
  totalPayment: number;
  totalMargin: number;
  minimumIncomeRatios: {
    ratio25: number;
    ratio30: number;
    ratio33: number;
    ratio35: number;
    ratio40: number;
  };
}


export interface IslamicMortgageResultProps {
  mortgageDetails: {
    housePrice: number;
    downPaymentPercent: number;
    downPaymentAmount: number;
    loanTerm: number;
    loanTermMonths: number;
    marginRate: number;
    monthlyMarginRate: number;
    calculationMethod: "anuitas" | "flat";
    loanAmount: number;
    monthlyPayment: number;
    totalPayment: number;
    totalMargin: number;
    minimumIncomeRatios: {
      ratio25: number;
      ratio30: number;
      ratio33: number;
      ratio35: number;
      ratio40: number;
    };
    provisionAmount: number;
    adminAmount: number;
  };
}