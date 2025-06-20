// Interface for amortization schedule item
interface AmortizationItem {
  period: number;
  payment: number;
  principal: number;
  interest: number;
  remainingBalance: number;
}

// Interface for calculation result
interface SimpleCalculationResult {
  loanAmount: number;
  monthlyPayment: number;
  monthlyPrincipal: number;
  monthlyInterest: number;
  totalPayment: number;
  totalInterest: number;
  firstPayment: number;
  amortizationSchedule: AmortizationItem[];
}

/**
 * Calculate simple loan details using flat rate method
 * @param carPrice - On The Road price of the car
 * @param downPaymentPercent - Down payment percentage
 * @param loanTermYears - Loan term in years
 * @param annualInterestRate - Annual interest rate percentage
 * @returns Calculation result with all loan details
 */
export function calculateSimpleLoan(
  carPrice: number,
  downPaymentPercent: number,
  loanTermYears: number,
  annualInterestRate: number
): SimpleCalculationResult {
  // Calculate basic loan parameters
  const downPaymentAmount: number = carPrice * (downPaymentPercent / 100);
  const loanAmount: number = carPrice - downPaymentAmount;
  const loanTermMonths: number = loanTermYears * 12;
  
  // Calculate monthly payments using flat rate method
  const monthlyPrincipal: number = loanAmount / loanTermMonths;
  const monthlyInterest: number = loanAmount * (annualInterestRate / 100) / 12;
  const monthlyPayment: number = monthlyPrincipal + monthlyInterest;
  
  // Calculate totals
  const totalPayment: number = monthlyPayment * loanTermMonths;
  const totalInterest: number = monthlyInterest * loanTermMonths;
  
  // Calculate first payment (DP + first monthly payment)
  const firstPayment: number = downPaymentAmount + monthlyPayment;
  
  // Generate amortization schedule for flat rate
  const amortizationSchedule: AmortizationItem[] = [];
  let remainingBalance: number = loanAmount;
  
  for (let period: number = 1; period <= loanTermMonths; period++) {
    remainingBalance -= monthlyPrincipal;
    
    // Ensure the last payment eliminates any rounding errors
    const adjustedRemainingBalance: number = period === loanTermMonths ? 0 : Math.round(remainingBalance * 100) / 100;
    
    amortizationSchedule.push({
      period,
      payment: monthlyPayment,
      principal: monthlyPrincipal,
      interest: monthlyInterest,
      remainingBalance: adjustedRemainingBalance
    });
  }
  
  return {
    loanAmount,
    monthlyPayment,
    monthlyPrincipal,
    monthlyInterest,
    totalPayment,
    totalInterest,
    firstPayment,
    amortizationSchedule
  };
}
