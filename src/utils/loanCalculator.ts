interface AmortizationItem {
  period: number;
  payment: number;
  principal: number;
  interest: number;
  remainingBalance: number;
}

export function calculateLoan(
  carPrice: number,
  downPaymentPercent: number,
  loanTermYears: number,
  annualInterestRate: number,
  insurancePercent: number,
  provisionPercent: number,
  policyFee: number,
  adminFee: number
) {
  // Calculate basic loan parameters
  const downPaymentAmount = carPrice * (downPaymentPercent / 100);
  const loanAmount = carPrice - downPaymentAmount;
  const loanTermMonths = loanTermYears * 12;
  
  // Calculate insurance and provision amounts
  const insuranceAmount = carPrice * (insurancePercent / 100);
  const provisionAmount = loanAmount * (provisionPercent / 100);
  
  // Calculate monthly payments using flat rate method
  const monthlyPrincipal = loanAmount / loanTermMonths;
  const monthlyInterest = loanAmount * (annualInterestRate / 100) / 12;
  const monthlyPayment = monthlyPrincipal + monthlyInterest;
  
  // Calculate totals
  const totalPayment = monthlyPayment * loanTermMonths;
  const totalInterest = monthlyInterest * loanTermMonths;
  
  // Calculate first payment (all upfront costs)
  const firstPayment = downPaymentAmount + monthlyPayment + insuranceAmount + provisionAmount + policyFee + adminFee;
  
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
  
  return {
    loanAmount,
    monthlyPayment,
    monthlyPrincipal,
    monthlyInterest,
    totalPayment,
    totalInterest,
    insuranceAmount,
    provisionAmount,
    policyFee,        // ← Ditambahkan
    adminFee,         // ← Ditambahkan
    firstPayment,
    amortizationSchedule
  };
}
