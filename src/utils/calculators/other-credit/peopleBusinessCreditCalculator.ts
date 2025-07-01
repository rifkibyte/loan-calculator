import { AmortizationItem } from "@/types/common";

export interface PeopleBusinessCreditCalculationResult {
  monthlyPayment: number;
  monthlyPrincipal: number;
  monthlyInterest: number;
  totalPayment: number;
  totalInterest: number;
  firstPayment: number;
  amortizationSchedule: AmortizationItem[];
}

/**
 * Calculate People Business Credit (KUR) loan details
 * @param loanAmount - Principal loan amount
 * @param loanTermYears - Loan term in years
 * @param annualInterestRate - Annual interest rate in percentage
 * @param adminFee - Administration fee
 * @param insuranceFee - Insurance fee
 * @returns Calculation result object
 */
export function calculatePeopleBusinessCredit(
  loanAmount: number,
  loanTermYears: number,
  annualInterestRate: number,
  adminFee: number = 0,
  insuranceFee: number = 0
): PeopleBusinessCreditCalculationResult {
  // Convert to monthly values
  const monthlyInterestRate = annualInterestRate / 100 / 12;
  const totalMonths = loanTermYears * 12;

  // Calculate monthly payment using PMT formula
  let monthlyPayment: number;
  if (monthlyInterestRate === 0) {
    // If no interest, simple division
    monthlyPayment = loanAmount / totalMonths;
  } else {
    // PMT formula: P * [r(1+r)^n] / [(1+r)^n - 1]
    const factor = Math.pow(1 + monthlyInterestRate, totalMonths);
    monthlyPayment = loanAmount * (monthlyInterestRate * factor) / (factor - 1);
  }

  // Calculate average monthly principal and interest
  const totalPayment = monthlyPayment * totalMonths;
  const totalInterest = totalPayment - loanAmount;
  const monthlyPrincipal = loanAmount / totalMonths;
  const monthlyInterest = totalInterest / totalMonths;

  // Calculate first payment (including fees)
  const firstPayment = monthlyPayment + adminFee + insuranceFee;

  // Generate amortization schedule
  const amortizationSchedule: AmortizationItem[] = [];
  let remainingBalance = loanAmount;

  for (let month = 1; month <= totalMonths; month++) {
    const interestPayment = remainingBalance * monthlyInterestRate;
    const principalPayment = monthlyPayment - interestPayment;
    remainingBalance -= principalPayment;

    // Ensure remaining balance doesn't go negative due to floating point precision
    if (remainingBalance < 0.01) {
      remainingBalance = 0;
    }

    amortizationSchedule.push({
      period: month,
      payment: monthlyPayment,
      principal: principalPayment,
      interest: interestPayment,
      remainingBalance: remainingBalance
    });
  }

  return {
    monthlyPayment: Math.round(monthlyPayment),
    monthlyPrincipal: Math.round(monthlyPrincipal),
    monthlyInterest: Math.round(monthlyInterest),
    totalPayment: Math.round(totalPayment),
    totalInterest: Math.round(totalInterest),
    firstPayment: Math.round(firstPayment),
    amortizationSchedule
  };
}
