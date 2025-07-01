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
  provisionAmount: number;
  adminFee: number;
  firstPayment: number;
  amortizationSchedule: AmortizationItem[];
  fixedRatePeriod: number;
  variableRate: number;
}

/**
 * Calculate multi-purpose loan details with mixed interest rates
 * @param loanAmount - Principal loan amount
 * @param loanTermYears - Loan term in years
 * @param fixedInterestRate - Fixed interest rate for first 3 years
 * @param variableInterestRate - Variable interest rate after fixed period
 * @param fixedRatePeriod - Fixed rate period in years (default 3)
 * @param provisionPercent - Provision percentage
 * @param adminFee - Administration fee amount
 * @returns Calculation result with all loan details
 */
export function calculateMultiPurposeLoan(
  loanAmount: number,
  loanTermYears: number,
  fixedInterestRate: number,
  variableInterestRate: number,
  fixedRatePeriod: number = 3,
  provisionPercent: number,
  adminFee: number
): CalculationResult {
  const loanTermMonths: number = loanTermYears * 12;
  const fixedRateMonths: number = fixedRatePeriod * 12;
  const variableRateMonths: number = loanTermMonths - fixedRateMonths;
  
  // Calculate provision amount
  const provisionAmount: number = loanAmount * (provisionPercent / 100);
  
  // Monthly interest rates
  const monthlyFixedRate: number = fixedInterestRate / 100 / 12;
  const monthlyVariableRate: number = variableInterestRate / 100 / 12;
  
  // Calculate monthly payment using annuity formula for mixed rates
  // For fixed period
  const fixedPV = loanAmount;
  let monthlyPaymentFixed: number;
  
  if (monthlyFixedRate === 0) {
    monthlyPaymentFixed = fixedPV / loanTermMonths;
  } else {
    monthlyPaymentFixed = (fixedPV * monthlyFixedRate * Math.pow(1 + monthlyFixedRate, loanTermMonths)) / 
                         (Math.pow(1 + monthlyFixedRate, loanTermMonths) - 1);
  }
  
  // Generate amortization schedule
  const amortizationSchedule: AmortizationItem[] = [];
  let remainingBalance: number = loanAmount;
  let totalInterestPaid: number = 0;
  
  for (let period: number = 1; period <= loanTermMonths; period++) {
    let currentRate: number;
    let monthlyPayment: number;
    
    // Determine current interest rate based on period
    if (period <= fixedRateMonths) {
      currentRate = monthlyFixedRate;
      monthlyPayment = monthlyPaymentFixed;
    } else {
      currentRate = monthlyVariableRate;
      // Recalculate payment for variable rate period
      const remainingMonths = loanTermMonths - period + 1;
      if (currentRate === 0) {
        monthlyPayment = remainingBalance / remainingMonths;
      } else {
        monthlyPayment = (remainingBalance * currentRate * Math.pow(1 + currentRate, remainingMonths)) / 
                        (Math.pow(1 + currentRate, remainingMonths) - 1);
      }
    }
    
    const interestPayment: number = remainingBalance * currentRate;
    const principalPayment: number = monthlyPayment - interestPayment;
    
    remainingBalance -= principalPayment;
    totalInterestPaid += interestPayment;
    
    // Ensure the last payment eliminates any rounding errors
    if (period === loanTermMonths) {
      remainingBalance = 0;
    }
    
    amortizationSchedule.push({
      period,
      payment: monthlyPayment,
      principal: principalPayment,
      interest: interestPayment,
      remainingBalance: Math.max(0, remainingBalance)
    });
  }
  
  // Calculate totals
  const totalPayment: number = amortizationSchedule.reduce((sum, item) => sum + item.payment, 0);
  const totalInterest: number = totalInterestPaid;
  
  // Average monthly payment for display
  const avgMonthlyPayment: number = totalPayment / loanTermMonths;
  const avgMonthlyPrincipal: number = loanAmount / loanTermMonths;
  const avgMonthlyInterest: number = totalInterest / loanTermMonths;
  
  // Calculate first payment (loan + provision + admin fee)
  const firstPayment: number = amortizationSchedule[0].payment + provisionAmount + adminFee;
  
  return {
    loanAmount,
    monthlyPayment: avgMonthlyPayment,
    monthlyPrincipal: avgMonthlyPrincipal,
    monthlyInterest: avgMonthlyInterest,
    totalPayment,
    totalInterest,
    provisionAmount,
    adminFee,
    firstPayment,
    amortizationSchedule,
    fixedRatePeriod,
    variableRate: variableInterestRate
  };
}

/**
 * Get maximum loan amount based on applicant type
 * @param applicantType - Type of applicant
 * @returns Maximum loan amount
 */
export function getMaxLoanAmount(applicantType: 'employee' | 'professional' | 'entrepreneur'): number {
  switch (applicantType) {
    case 'employee':
    case 'professional':
      return 10000000000; // 10 billion
    case 'entrepreneur':
      return 200000000; // 200 million
    default:
      return 200000000;
  }
}

/**
 * Get maximum loan term based on applicant type
 * @param applicantType - Type of applicant
 * @returns Maximum loan term in years
 */
export function getMaxLoanTerm(applicantType: 'employee' | 'professional' | 'entrepreneur'): number {
  switch (applicantType) {
    case 'employee':
      return 15;
    case 'professional':
      return 10;
    case 'entrepreneur':
      return 7;
    default:
      return 7;
  }
}
