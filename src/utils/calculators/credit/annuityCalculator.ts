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
  loanTermMonths: number;
  loanTermYears: number;
  annualInterestRate: number;
  monthlyInterestRate: number;
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
  amortizationSchedule: AmortizationItem[];
}

/**
 * Calculate annuity loan details
 * @param loanAmount - Principal loan amount
 * @param loanTermMonths - Loan term in months
 * @param annualInterestRate - Annual interest rate percentage
 * @returns Calculation result with all loan details
 */
export function calculateAnnuityLoan(
  loanAmount: number,
  loanTermMonths: number,
  annualInterestRate: number
): CalculationResult {
  // Calculate basic parameters
  const monthlyInterestRate: number = annualInterestRate / 100 / 12;
  const loanTermYears: number = loanTermMonths / 12;
  
  // Calculate monthly payment using annuity formula
  // PMT = P * [r(1+r)^n] / [(1+r)^n - 1]
  let monthlyPayment: number;
  
  if (monthlyInterestRate === 0) {
    // If no interest, simple division
    monthlyPayment = loanAmount / loanTermMonths;
  } else {
    const numerator = loanAmount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, loanTermMonths);
    const denominator = Math.pow(1 + monthlyInterestRate, loanTermMonths) - 1;
    monthlyPayment = numerator / denominator;
  }
  
  // Calculate totals
  const totalPayment: number = monthlyPayment * loanTermMonths;
  const totalInterest: number = totalPayment - loanAmount;
  
  // Generate amortization schedule
  const amortizationSchedule: AmortizationItem[] = [];
  let remainingBalance: number = loanAmount;
  
  // Add initial row (period 0)
  amortizationSchedule.push({
    period: 0,
    payment: 0,
    principal: 0,
    interest: 0,
    remainingBalance: loanAmount
  });
  
  for (let period: number = 1; period <= loanTermMonths; period++) {
    // Calculate interest for current period
    const interestPayment: number = remainingBalance * monthlyInterestRate;
    
    // Calculate principal payment
    let principalPayment: number = monthlyPayment - interestPayment;
    
    // Adjust for final payment to handle rounding
    if (period === loanTermMonths) {
      principalPayment = remainingBalance;
      monthlyPayment = principalPayment + interestPayment;
    }
    
    // Update remaining balance
    remainingBalance -= principalPayment;
    
    // Ensure remaining balance doesn't go negative due to rounding
    if (remainingBalance < 0.01) {
      remainingBalance = 0;
    }
    
    amortizationSchedule.push({
      period,
      payment: monthlyPayment,
      principal: principalPayment,
      interest: interestPayment,
      remainingBalance
    });
  }
  
  return {
    loanAmount,
    loanTermMonths,
    loanTermYears,
    annualInterestRate,
    monthlyInterestRate,
    monthlyPayment,
    totalPayment,
    totalInterest,
    amortizationSchedule
  };
}
