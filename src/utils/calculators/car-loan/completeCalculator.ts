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
  loanAmount: number;
  monthlyPayment: number;
  monthlyPrincipal: number;
  monthlyInterest: number;
  totalPayment: number;
  totalInterest: number;
  insuranceAmount: number;
  provisionAmount: number;
  policyFee: number;
  adminFee: number;
  firstPayment: number;
  amortizationSchedule: AmortizationItem[];
}

/**
 * Calculate loan details using flat rate method
 * @param carPrice - On The Road price of the car
 * @param downPaymentPercent - Down payment percentage
 * @param loanTermYears - Loan term in years
 * @param annualInterestRate - Annual interest rate percentage
 * @param insurancePercent - Insurance percentage
 * @param provisionPercent - Provision percentage
 * @param policyFee - Policy fee amount
 * @param adminFee - Administration fee amount
 * @returns Calculation result with all loan details
 */
export function calculateLoan(
  carPrice: number,
  downPaymentPercent: number,
  loanTermYears: number,
  annualInterestRate: number,
  insurancePercent: number,
  provisionPercent: number,
  policyFee: number,
  adminFee: number
): CalculationResult {
  // Calculate basic loan parameters
  const downPaymentAmount: number = carPrice * (downPaymentPercent / 100);
  const loanAmount: number = carPrice - downPaymentAmount;
  const loanTermMonths: number = loanTermYears * 12;
  
  // Calculate insurance and provision amounts
  const insuranceAmount: number = carPrice * (insurancePercent / 100);
  const provisionAmount: number = loanAmount * (provisionPercent / 100);
  
  // Calculate monthly payments using flat rate method
  const monthlyPrincipal: number = loanAmount / loanTermMonths;
  const monthlyInterest: number = loanAmount * (annualInterestRate / 100) / 12;
  const monthlyPayment: number = monthlyPrincipal + monthlyInterest;
  
  // Calculate totals
  const totalPayment: number = monthlyPayment * loanTermMonths;
  const totalInterest: number = monthlyInterest * loanTermMonths;
  
  // Calculate first payment (all upfront costs)
  const firstPayment: number = downPaymentAmount + monthlyPayment + insuranceAmount + provisionAmount + policyFee + adminFee;
  
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
  
  return {
    loanAmount,
    monthlyPayment,
    monthlyPrincipal,
    monthlyInterest,
    totalPayment,
    totalInterest,
    insuranceAmount,
    provisionAmount,
    policyFee,
    adminFee,
    firstPayment,
    amortizationSchedule
  };
}
