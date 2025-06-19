interface CalculationResult {
  carPrice: number;
  downPaymentAmount: number;
  loanAmount: number;
  monthlyPrincipal: number;
  monthlyInterest: number;
  firstPayment: number;
}

export function calculateLoanFromBudget(
  budget: number,
  downPaymentPercent: number,
  loanTermYears: number,
  annualInterestRate: number
): CalculationResult {
  const loanTermMonths: number = loanTermYears * 12;
  const monthlyInterestRate: number = annualInterestRate / 12 / 100;
  
  // Calculate loan amount
  const monthlyPrincipalFactor: number = 1 / loanTermMonths;
  const monthlyInterestFactor: number = monthlyInterestRate;
  const totalMonthlyFactor: number = monthlyPrincipalFactor + monthlyInterestFactor;
  
  const loanAmount: number = budget / totalMonthlyFactor;
  
  // Calculate car price and down payment
  const carPrice: number = loanAmount / (1 - downPaymentPercent / 100);
  const downPaymentAmount: number = carPrice * (downPaymentPercent / 100);
  
  // Calculate monthly components
  const monthlyPrincipal: number = loanAmount / loanTermMonths;
  const monthlyInterest: number = loanAmount * monthlyInterestRate;
  
  // Calculate first payment
  const firstPayment: number = downPaymentAmount + budget;
  
  return {
    carPrice,
    downPaymentAmount,
    loanAmount,
    monthlyPrincipal,
    monthlyInterest,
    firstPayment
  };
}
