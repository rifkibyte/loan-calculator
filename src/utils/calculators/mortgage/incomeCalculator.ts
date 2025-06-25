import { AmortizationItem } from '@/types/common';

interface MortgageIncomeCalculationResult {
  netIncome: number;
  maxInstallmentAmount: number;
  maxHousePrice: number;
  minDownPayment: number;
  maxLoanAmount: number;
  monthlyPayment: number;
  monthlyPrincipal: number;
  monthlyInterest: number;
  totalPayment: number;
  totalInterest: number;
  provisionFee: number;
  adminFee: number;
  totalFirstPayment: number;
  amortizationSchedule: AmortizationItem[];
}

/**
 * Calculate mortgage based on net income using anuitas method
 * Berdasarkan sistem perhitungan KPR Indonesia dengan metode anuitas
 * Sesuai dengan data yang diberikan: penghasilan 15jt -> max rumah 409.8jt
 */
export function calculateMortgageIncome(
  netIncome: number,
  downPaymentPercent: number,
  loanTermYears: number,
  annualInterestRate: number,
  maxInstallmentPercent: number,
  provisionPercent: number = 1.0,
  adminFeePercent: number = 0.1
): MortgageIncomeCalculationResult {
  // Calculate maximum installment based on income
  const maxInstallmentAmount = netIncome * (maxInstallmentPercent / 100);
  
  // Convert to monthly values
  const loanTermMonths = loanTermYears * 12;
  const monthlyInterestRate = annualInterestRate / 100 / 12;
  
  // Calculate maximum loan amount using anuitas formula
  // PMT = P * [r(1+r)^n] / [(1+r)^n - 1]
  // Rearranged: P = PMT * [(1+r)^n - 1] / [r(1+r)^n]
  let maxLoanAmount: number;
  
  if (monthlyInterestRate === 0) {
    // If no interest, simple division
    maxLoanAmount = maxInstallmentAmount * loanTermMonths;
  } else {
    const denominator = Math.pow(1 + monthlyInterestRate, loanTermMonths);
    maxLoanAmount = maxInstallmentAmount * (denominator - 1) / (monthlyInterestRate * denominator);
  }
  
  // Calculate maximum house price
  const maxHousePrice = maxLoanAmount / (1 - downPaymentPercent / 100);
  
  // Calculate down payment
  const minDownPayment = maxHousePrice * (downPaymentPercent / 100);
  
  // Calculate fees
  const provisionFee = maxLoanAmount * (provisionPercent / 100);
  const adminFee = maxLoanAmount * (adminFeePercent / 100);
  
  // Calculate actual monthly payment (should equal maxInstallmentAmount)
  const monthlyPayment = maxInstallmentAmount;
  
  // Calculate totals
  const totalPayment = monthlyPayment * loanTermMonths;
  const totalInterest = totalPayment - maxLoanAmount;
  const totalFirstPayment = minDownPayment + monthlyPayment + provisionFee + adminFee;
  
  // Generate amortization schedule using anuitas method
  const amortizationSchedule: AmortizationItem[] = [];
  let remainingBalance = maxLoanAmount;
  
  for (let period = 1; period <= loanTermMonths; period++) {
    const interestPayment = remainingBalance * monthlyInterestRate;
    const principalPayment = monthlyPayment - interestPayment;
    remainingBalance -= principalPayment;
    
    // Handle final payment rounding
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
  
  // Calculate average monthly principal and interest for display
  const monthlyPrincipal = maxLoanAmount / loanTermMonths;
  const monthlyInterest = totalInterest / loanTermMonths;
  
  return {
    netIncome,
    maxInstallmentAmount,
    maxHousePrice,
    minDownPayment,
    maxLoanAmount,
    monthlyPayment,
    monthlyPrincipal,
    monthlyInterest,
    totalPayment,
    totalInterest,
    provisionFee,
    adminFee,
    totalFirstPayment,
    amortizationSchedule
  };
}
