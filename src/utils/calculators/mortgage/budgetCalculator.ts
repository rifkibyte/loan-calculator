// src/utils/calculators/mortgage/budgetCalculator.ts
import { AmortizationItem } from "@/types/common";

interface BudgetCalculationResult {
  maxHousePrice: number;
  minDownPayment: number;
  maxLoanAmount: number;
  maxMonthlyPayment: number;
  minMonthlyIncome: number;
  provisionAmount: number;
  adminAmount: number;
  amortizationSchedule: AmortizationItem[];
}

/**
 * Calculate mortgage based on monthly budget using anuitas method
 * @param monthlyBudget - Monthly budget for installment
 * @param downPaymentPercent - Down payment percentage
 * @param loanTermYears - Loan term in years
 * @param annualInterestRate - Annual interest rate percentage
 * @param installmentPercent - Installment percentage from net income
 * @param provisionPercent - Provision percentage from loan amount
 * @param adminPercent - Admin fee percentage from loan amount
 * @returns Calculation result with all mortgage details
 */
export function calculateMortgageBudget(
  monthlyBudget: number,
  downPaymentPercent: number,
  loanTermYears: number,
  annualInterestRate: number,
  installmentPercent: number,
  provisionPercent: number,
  adminPercent: number
): BudgetCalculationResult {
  // Convert parameters
  const loanTermMonths = loanTermYears * 12;
  const monthlyInterestRate = annualInterestRate / 100 / 12;
  
  // Calculate maximum loan amount using anuitas formula
  // PMT = PV * [r(1+r)^n] / [(1+r)^n - 1]
  // Rearranged: PV = PMT * [(1+r)^n - 1] / [r(1+r)^n]
  
  let maxLoanAmount: number;
  
  if (monthlyInterestRate === 0) {
    // If no interest, simple division
    maxLoanAmount = monthlyBudget * loanTermMonths;
  } else {
    const factor = Math.pow(1 + monthlyInterestRate, loanTermMonths);
    maxLoanAmount = monthlyBudget * (factor - 1) / (monthlyInterestRate * factor);
  }
  
  // Calculate maximum house price
  const maxHousePrice = maxLoanAmount / (1 - downPaymentPercent / 100);
  
  // Calculate minimum down payment
  const minDownPayment = maxHousePrice * (downPaymentPercent / 100);
  
  // Calculate minimum monthly income based on installment percentage
  const minMonthlyIncome = monthlyBudget / (installmentPercent / 100);
  
  // Calculate fees
  const provisionAmount = maxLoanAmount * (provisionPercent / 100);
  const adminAmount = maxLoanAmount * (adminPercent / 100);
  
  // Generate amortization schedule using anuitas method
  const amortizationSchedule: AmortizationItem[] = [];
  let remainingBalance = maxLoanAmount;
  
  for (let period = 1; period <= loanTermMonths; period++) {
    let interestPayment: number;
    let principalPayment: number;
    
    if (monthlyInterestRate === 0) {
      interestPayment = 0;
      principalPayment = monthlyBudget;
    } else {
      interestPayment = remainingBalance * monthlyInterestRate;
      principalPayment = monthlyBudget - interestPayment;
    }
    
    remainingBalance -= principalPayment;
    
    // Handle rounding errors in the last payment
    if (period === loanTermMonths) {
      principalPayment += remainingBalance;
      remainingBalance = 0;
    }
    
    amortizationSchedule.push({
      period,
      payment: monthlyBudget,
      principal: principalPayment,
      interest: interestPayment,
      remainingBalance: Math.max(0, remainingBalance)
    });
  }
  
  return {
    maxHousePrice,
    minDownPayment,
    maxLoanAmount,
    maxMonthlyPayment: monthlyBudget,
    minMonthlyIncome,
    provisionAmount,
    adminAmount,
    amortizationSchedule
  };
}
