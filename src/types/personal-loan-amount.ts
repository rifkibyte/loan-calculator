export interface LoanAmountTableItem {
  maxLoanAmount: number;
  loanTerm: number;
  maxInstallment: number;
  minSalary: number;
}

export interface AmortizationItem {
  period: number;
  payment: number;
  principal: number;
  interest: number;
  remainingBalance: number;
}

export interface PersonalLoanAmountResult {
  loanAmount: number;
  creditRatio: number;
  monthlyInterestRate: number;
  annualInterestRate: number;
  calculationMethod: string;
  loanTable: LoanAmountTableItem[];
}
