import { AmortizationItem } from "@/types/common";

interface CalculationResult {
  loanAmount: number;
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
  minimumIncome30: number;
  minimumIncome33: number;
  minimumIncome40: number;
  provisionAmount: number;
  adminAmount: number;
  amortizationSchedule: AmortizationItem[];
}

/**
 * Calculate mortgage details based on house price
 * @param housePrice - House price
 * @param downPaymentPercent - Down payment percentage
 * @param loanTermYears - Loan term in years
 * @param annualInterestRate - Annual interest rate percentage
 * @param calculationMethod - Calculation method (anuitas or flat)
 * @returns Calculation result with all mortgage details
 */
export function calculateMortgage(
  housePrice: number,
  downPaymentPercent: number,
  loanTermYears: number,
  annualInterestRate: number,
  calculationMethod: 'anuitas' | 'flat' = 'anuitas'
): CalculationResult {
  // Calculate basic mortgage parameters
  const downPaymentAmount: number = housePrice * (downPaymentPercent / 100);
  const loanAmount: number = housePrice - downPaymentAmount;
  const loanTermMonths: number = loanTermYears * 12;
  const monthlyInterestRate: number = annualInterestRate / 100 / 12;
  
  // Calculate bank fees
  const provisionPercent: number = 1; // 1% dari plafon
  const adminPercent: number = 0.1; // 0.1% dari plafon
  const provisionAmount: number = loanAmount * (provisionPercent / 100);
  const adminAmount: number = loanAmount * (adminPercent / 100);
  
  let monthlyPayment: number;
  let totalPayment: number;
  let totalInterest: number;
  let amortizationSchedule: AmortizationItem[] = [];
  
  if (calculationMethod === 'anuitas') {
    // Anuitas calculation
    if (monthlyInterestRate === 0) {
      monthlyPayment = loanAmount / loanTermMonths;
    } else {
      const factor = Math.pow(1 + monthlyInterestRate, loanTermMonths);
      monthlyPayment = loanAmount * (monthlyInterestRate * factor) / (factor - 1);
    }
    
    totalPayment = monthlyPayment * loanTermMonths;
    totalInterest = totalPayment - loanAmount;
    
    // Generate anuitas amortization schedule
    let remainingBalance = loanAmount;
    
    for (let period = 1; period <= loanTermMonths; period++) {
      const interestPayment = remainingBalance * monthlyInterestRate;
      const principalPayment = monthlyPayment - interestPayment;
      remainingBalance -= principalPayment;
      
      // Ensure the last payment eliminates any rounding errors
      const adjustedRemainingBalance = period === loanTermMonths ? 0 : remainingBalance;
      
      amortizationSchedule.push({
        period,
        payment: monthlyPayment,
        principal: principalPayment,
        interest: interestPayment,
        remainingBalance: Math.max(0, adjustedRemainingBalance)
      });
    }
  } else {
    // Flat rate calculation
    const monthlyPrincipal = loanAmount / loanTermMonths;
    const monthlyInterest = loanAmount * (annualInterestRate / 100) / 12;
    monthlyPayment = monthlyPrincipal + monthlyInterest;
    
    totalPayment = monthlyPayment * loanTermMonths;
    totalInterest = monthlyInterest * loanTermMonths;
    
    // Generate flat rate amortization schedule
    let remainingBalance = loanAmount;
    
    for (let period = 1; period <= loanTermMonths; period++) {
      remainingBalance -= monthlyPrincipal;
      
      const adjustedRemainingBalance = period === loanTermMonths ? 0 : remainingBalance;
      
      amortizationSchedule.push({
        period,
        payment: monthlyPayment,
        principal: monthlyPrincipal,
        interest: monthlyInterest,
        remainingBalance: Math.max(0, adjustedRemainingBalance)
      });
    }
  }
  
  // Calculate minimum income requirements
  const minimumIncome30 = monthlyPayment / 0.30; // 30% dari penghasilan
  const minimumIncome33 = monthlyPayment / (1/3); // 1/3 dari penghasilan
  const minimumIncome40 = monthlyPayment / 0.40; // 40% dari penghasilan
  
  return {
    loanAmount,
    monthlyPayment,
    totalPayment,
    totalInterest,
    minimumIncome30,
    minimumIncome33,
    minimumIncome40,
    provisionAmount,
    adminAmount,
    amortizationSchedule
  };
}
