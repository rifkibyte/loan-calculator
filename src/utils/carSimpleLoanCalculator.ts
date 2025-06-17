// File: utils/carSimpleLoanCalculator.ts
export interface CarSimpleLoanFormData {
  carPrice: number;
  downPaymentPercent: number;
  loanTermYears: number;
  annualInterestRate: number; 
}

export interface AmortizationScheduleItem {
  month: number;
  payment: number;
  principal: number;
  interest: number;
  balance: number;
}

export interface CarSimpleLoanResult {
  carPrice: number;
  downPaymentPercent: number;
  downPaymentAmount: number;
  loanTermYears: number;
  loanTermMonths: number;
  annualInterestRate: number;
  monthlyInterestRate: number;
  loanAmount: number;
  monthlyPayment: number;
  monthlyPrincipal: number;
  monthlyInterest: number;
  totalPayment: number;
  totalInterest: number;
  amortizationSchedule: AmortizationScheduleItem[];
}

export function calculateCarSimpleLoan(
  carPrice: number,
  downPaymentPercent: number,
  loanTermYears: number,
  annualInterestRate: number
): CarSimpleLoanResult {
  // Validasi input untuk mencegah NaN
  const validCarPrice = isNaN(carPrice) || carPrice <= 0 ? 0 : carPrice;
  const validDownPaymentPercent = isNaN(downPaymentPercent) || downPaymentPercent < 0 ? 0 : downPaymentPercent;
  const validLoanTermYears = isNaN(loanTermYears) || loanTermYears <= 0 ? 1 : loanTermYears;
  const validAnnualInterestRate = isNaN(annualInterestRate) || annualInterestRate < 0 ? 0 : annualInterestRate;

  const downPaymentAmount = validCarPrice * (validDownPaymentPercent / 100);
  const loanAmount = validCarPrice - downPaymentAmount;
  const loanTermMonths = validLoanTermYears * 12;
  const monthlyInterestRate = validAnnualInterestRate / 12;
  
  // Flat interest calculation
  const totalInterest = loanAmount * (validAnnualInterestRate / 100) * validLoanTermYears;
  const totalPayment = loanAmount + totalInterest;
  const monthlyPayment = loanTermMonths > 0 ? totalPayment / loanTermMonths : 0;
  const monthlyPrincipal = loanTermMonths > 0 ? loanAmount / loanTermMonths : 0;
  const monthlyInterest = loanTermMonths > 0 ? totalInterest / loanTermMonths : 0;
  
  // Generate amortization schedule
  const amortizationSchedule: AmortizationScheduleItem[] = [];
  let remainingBalance = loanAmount;
  
  // Add initial row (month 0)
  amortizationSchedule.push({
    month: 0,
    payment: 0,
    principal: 0,
    interest: 0,
    balance: loanAmount
  });
  
  for (let month = 1; month <= loanTermMonths; month++) {
    const principalPayment = monthlyPrincipal;
    const interestPayment = monthlyInterest;
    remainingBalance -= principalPayment;
    
    amortizationSchedule.push({
      month: month,
      payment: monthlyPayment,
      principal: principalPayment,
      interest: interestPayment,
      balance: Math.max(0, remainingBalance)
    });
  }
  
  return {
    carPrice: validCarPrice,
    downPaymentPercent: validDownPaymentPercent,
    downPaymentAmount,
    loanTermYears: validLoanTermYears,
    loanTermMonths,
    annualInterestRate: validAnnualInterestRate,
    monthlyInterestRate,
    loanAmount,
    monthlyPayment,
    monthlyPrincipal,
    monthlyInterest,
    totalPayment,
    totalInterest,
    amortizationSchedule
  };
}
