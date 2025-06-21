// Interface for loan amount table item
export interface LoanAmountTableItem {
  maxLoanAmount: number;
  loanTerm: number;
  maxInstallment: number;
  minSalary: number;
}

// Interface for amortization schedule item
export interface AmortizationItem {
  period: number;
  payment: number;
  principal: number;
  interest: number;
  remainingBalance: number;
}

/**
 * Calculate loan amount table for different loan terms
 * @param loanAmount - Loan amount
 * @param creditRatio - Credit ratio percentage
 * @param monthlyInterestRate - Monthly interest rate percentage
 * @param calculationMethod - Interest calculation method (FLAT)
 * @returns Array of loan amount table items
 */
export function calculateLoanAmountTable(
  loanAmount: number,
  creditRatio: number,
  monthlyInterestRate: number,
  calculationMethod: string = "FLAT"
): LoanAmountTableItem[] {
  // Validate inputs
  if (!loanAmount || loanAmount <= 0) {
    throw new Error("Loan amount must be positive");
  }
  
  if (!creditRatio || creditRatio <= 0) {
    throw new Error("Credit ratio must be positive");
  }
  
  if (monthlyInterestRate === undefined || monthlyInterestRate <= 0) {
    throw new Error("Monthly interest rate must be positive");
  }

  // Loan terms to calculate (in months)
  const loanTerms = [6, 12, 18, 24, 30, 36, 42, 48, 54, 60];
  
  const table: LoanAmountTableItem[] = [];
  
  for (const term of loanTerms) {
    // Calculate monthly installment using flat rate method
    const monthlyPrincipal = loanAmount / term;
    const monthlyInterest = loanAmount * (monthlyInterestRate / 100);
    const maxInstallment = monthlyPrincipal + monthlyInterest;
    
    // Calculate minimum salary based on credit ratio
    // maxInstallment = minSalary * (creditRatio / 100)
    // Therefore: minSalary = maxInstallment / (creditRatio / 100)
    const minSalary = maxInstallment / (creditRatio / 100);
    
    table.push({
      maxLoanAmount: loanAmount,
      loanTerm: term,
      maxInstallment,
      minSalary
    });
  }
  
  return table;
}

/**
 * Calculate amortization schedule for a specific loan term
 * @param loanAmount - Loan amount
 * @param monthlyInterestRate - Monthly interest rate percentage
 * @param loanTermMonths - Loan term in months
 * @param calculationMethod - Interest calculation method (FLAT)
 * @returns Array of amortization items
 */
export function calculateLoanAmountSchedule(
  loanAmount: number,
  monthlyInterestRate: number,
  loanTermMonths: number,
  calculationMethod: string = "FLAT"
): AmortizationItem[] {
  // Validate inputs
  if (!loanAmount || loanAmount <= 0) {
    throw new Error("Loan amount must be positive");
  }
  
  if (monthlyInterestRate === undefined || monthlyInterestRate <= 0) {
    throw new Error("Monthly interest rate must be positive");
  }
  
  if (!loanTermMonths || loanTermMonths <= 0) {
    throw new Error("Loan term must be positive");
  }

  // Calculate monthly payments using flat rate method
  const monthlyPrincipal = loanAmount / loanTermMonths;
  const monthlyInterest = loanAmount * (monthlyInterestRate / 100);
  const monthlyPayment = monthlyPrincipal + monthlyInterest;
  
  // Generate amortization schedule for flat rate
  const amortizationSchedule: AmortizationItem[] = [];
  let remainingBalance = loanAmount;
  
  for (let period = 1; period <= loanTermMonths; period++) {
    remainingBalance -= monthlyPrincipal;
    
    // Ensure the last payment eliminates any rounding errors
    const adjustedRemainingBalance = period === loanTermMonths ? 0 : remainingBalance;
    
    amortizationSchedule.push({
      period,
      payment: monthlyPayment,
      principal: monthlyPrincipal,
      interest: monthlyInterest,
      remainingBalance: adjustedRemainingBalance
    });
  }
  
  return amortizationSchedule;
}
