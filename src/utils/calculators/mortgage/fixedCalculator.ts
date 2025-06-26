import { YearlyInterestRate, MortgageFixedResult } from '@/types/mortgage-fixed';
import { AmortizationItem } from '@/types/common';

export function calculateMortgageFixed(
  loanAmount: number,
  loanTermYears: number,
  yearlyRates: YearlyInterestRate[],
  calculationMethod: string = 'Anuitas - Floating'
): MortgageFixedResult {
  const loanTermMonths = loanTermYears * 12;
  const amortizationSchedule: AmortizationItem[] = [];
  const monthlyPayments: MortgageFixedResult['monthlyPayments'] = [];
  
  let remainingBalance = loanAmount;
  let totalInterest = 0;
  let totalPayment = 0;
  
  // Process each month
  for (let month = 1; month <= loanTermMonths; month++) {
    if (remainingBalance <= 0) break;
    
    // Determine which year this month belongs to
    const currentYear = Math.ceil(month / 12);
    const yearRate = yearlyRates.find(r => r.year === currentYear)?.rate || 0;
    const monthlyRate = yearRate / 100 / 12;
    
    // Calculate remaining months from current month
    const remainingMonths = loanTermMonths - month + 1;
    
    // Calculate monthly payment for remaining balance and remaining months
    let monthlyPayment = 0;
    if (monthlyRate > 0) {
      // Anuitas formula for remaining balance
      monthlyPayment = remainingBalance * (monthlyRate * Math.pow(1 + monthlyRate, remainingMonths)) / 
                     (Math.pow(1 + monthlyRate, remainingMonths) - 1);
    } else {
      // If interest rate is 0, just divide remaining balance by remaining months
      monthlyPayment = remainingBalance / remainingMonths;
    }
    
    // Calculate interest and principal for this month
    const monthlyInterest = remainingBalance * monthlyRate;
    let monthlyPrincipal = monthlyPayment - monthlyInterest;
    
    // Handle last payment to avoid negative balance
    if (monthlyPrincipal > remainingBalance) {
      monthlyPrincipal = remainingBalance;
      monthlyPayment = monthlyPrincipal + monthlyInterest;
    }
    
    // Update remaining balance
    remainingBalance -= monthlyPrincipal;
    totalInterest += monthlyInterest;
    totalPayment += monthlyPayment;
    
    // Add to amortization schedule
    amortizationSchedule.push({
      period: month,
      payment: monthlyPayment,
      principal: monthlyPrincipal,
      interest: monthlyInterest,
      remainingBalance: Math.max(0, remainingBalance)
    });
    
    // Add to monthly payments detail
    monthlyPayments.push({
      period: month,
      year: currentYear,
      interestRate: yearRate,
      monthlyInterest: monthlyInterest,
      monthlyPrincipal: monthlyPrincipal,
      totalPayment: monthlyPayment,
      remainingBalance: Math.max(0, remainingBalance)
    });
  }
  
  return {
    loanAmount,
    loanTerm: loanTermYears,
    loanTermMonths,
    yearlyRates,
    calculationMethod,
    monthlyPrincipal: 0, // This varies by month in fixed rate
    monthlyInterest: 0,  // This varies by month in fixed rate
    totalPayment,
    totalInterest,
    amortizationSchedule,
    monthlyPayments
  };
}
