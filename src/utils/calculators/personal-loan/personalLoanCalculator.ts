// Interface for amortization schedule item
interface AmortizationItem {
  period: number;
  payment: number;
  principal: number;
  interest: number;
  remainingBalance: number;
}

// Interface for calculation result
interface CalculationResult {
  debtRatioAmount: number;
  maxKtaPayment: number;
  loanAmount: number;
  monthlyPayment: number;
  monthlyPrincipal: number;
  monthlyInterest: number;
  totalPayment: number;
  totalInterest: number;
  amortizationSchedule: AmortizationItem[];
}

/**
 * Calculate KTA loan details using flat rate method
 * @param netIncome - Monthly net income
 * @param debtRatioPercent - Debt ratio percentage
 * @param otherLoanPayment - Other loan payments per month
 * @param monthlyInterestRate - Monthly interest rate percentage
 * @param calculationMethod - Interest calculation method (FLAT)
 * @param loanTermMonths - Loan term in months (default 12)
 * @returns Calculation result with all loan details
 */
export function calculateKtaLoan(
  netIncome: number,
  debtRatioPercent: number,
  otherLoanPayment: number,
  monthlyInterestRate: number,
  calculationMethod: string = "FLAT",
  loanTermMonths: number = 12
): CalculationResult {
  // Validate inputs
  console.log("Calculator inputs:", {
    netIncome,
    debtRatioPercent,
    otherLoanPayment,
    monthlyInterestRate,
    calculationMethod
  });

  if (!netIncome || netIncome <= 0) {
    throw new Error("Net income must be positive");
  }
  
  if (!debtRatioPercent || debtRatioPercent <= 0) {
    throw new Error("Debt ratio percent must be positive");
  }
  
  if (monthlyInterestRate === undefined || monthlyInterestRate <= 0) {
    throw new Error("Monthly interest rate must be positive");
  }

  // Calculate debt ratio amount (maximum total monthly payment from income)
  const debtRatioAmount: number = netIncome * (debtRatioPercent / 100);
  
  // Calculate maximum KTA payment (after deducting other loan payments)
  const maxKtaPayment: number = Math.max(0, debtRatioAmount - (otherLoanPayment || 0));
  
  // Calculate loan amount using flat rate method
  // For flat rate: monthlyPayment = (loanAmount / term) + (loanAmount * monthlyRate)
  // Rearranging: loanAmount = monthlyPayment / (1/term + monthlyRate)
  const divisor: number = (1 / loanTermMonths) + (monthlyInterestRate / 100);
  const loanAmount: number = maxKtaPayment / divisor;
  
  // Calculate monthly payments using flat rate method
  const monthlyPrincipal: number = loanAmount / loanTermMonths;
  const monthlyInterest: number = loanAmount * (monthlyInterestRate / 100);
  const monthlyPayment: number = monthlyPrincipal + monthlyInterest;
  
  // Calculate totals
  const totalPayment: number = monthlyPayment * loanTermMonths;
  const totalInterest: number = monthlyInterest * loanTermMonths;
  
  // Generate amortization schedule for flat rate
  const amortizationSchedule: AmortizationItem[] = [];
  let remainingBalance: number = loanAmount;
  
  for (let period: number = 1; period <= loanTermMonths; period++) {
    remainingBalance -= monthlyPrincipal;
    
    // Ensure the last payment eliminates any rounding errors
    const adjustedRemainingBalance: number = period === loanTermMonths ? 0 : remainingBalance;
    
    amortizationSchedule.push({
      period,
      payment: monthlyPayment,
      principal: monthlyPrincipal,
      interest: monthlyInterest,
      remainingBalance: adjustedRemainingBalance
    });
  }
  
  console.log("Calculator result:", {
    debtRatioAmount,
    maxKtaPayment,
    loanAmount,
    monthlyPayment,
    monthlyPrincipal,
    monthlyInterest,
    totalPayment,
    totalInterest
  });
  
  return {
    debtRatioAmount,
    maxKtaPayment,
    loanAmount,
    monthlyPayment,
    monthlyPrincipal,
    monthlyInterest,
    totalPayment,
    totalInterest,
    amortizationSchedule
  };
}
