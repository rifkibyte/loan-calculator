import { AmortizationItem } from "@/types/common";

// Interface for calculation result
interface MortgageCalculationResult {
  downPaymentAmount: number;
  loanAmount: number;
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
  provisionAmount: number;
  bphtbTax: number;
  totalCosts: number;
  firstPayment: number;
  amortizationSchedule: AmortizationItem[];
}

/**
 * Calculate mortgage details using annuity method
 * @param housePrice - House price
 * @param loanTermYears - Loan term in years
 * @param annualInterestRate - Annual interest rate percentage
 * @param downPaymentPercent - Down payment percentage
 * @param provisionPercent - Provision percentage
 * @param appraisalFee - Appraisal fee amount
 * @param adminFee - Administration fee amount
 * @param notaryFee - Notary fee amount
 * @param insuranceFee - Insurance fee amount
 * @param njoptkp - NJOPTKP/NPTKP amount
 * @returns Calculation result with all mortgage details
 */
export function calculateMortgage(
  housePrice: number,
  loanTermYears: number,
  annualInterestRate: number,
  downPaymentPercent: number,
  provisionPercent: number,
  appraisalFee: number,
  adminFee: number,
  notaryFee: number,
  insuranceFee: number,
  njoptkp: number
): MortgageCalculationResult {
  // Calculate basic loan parameters
  const downPaymentAmount: number = housePrice * (downPaymentPercent / 100);
  const loanAmount: number = housePrice - downPaymentAmount;
  const loanTermMonths: number = loanTermYears * 12;
  const monthlyInterestRate: number = annualInterestRate / 100 / 12;

  // Calculate provision amount
  const provisionAmount: number = loanAmount * (provisionPercent / 100);

  // Calculate BPHTB tax (5% of (house price - NJOPTKP))
  const taxableAmount: number = Math.max(0, housePrice - njoptkp);
  const bphtbTax: number = taxableAmount * 0.05;

  // Calculate total costs
  const totalCosts: number = provisionAmount + appraisalFee + adminFee + notaryFee + insuranceFee + bphtbTax;

  // Calculate monthly payment using annuity formula
  let monthlyPayment: number;
  if (monthlyInterestRate === 0) {
    monthlyPayment = loanAmount / loanTermMonths;
  } else {
    monthlyPayment = loanAmount * (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, loanTermMonths)) / 
                    (Math.pow(1 + monthlyInterestRate, loanTermMonths) - 1);
  }

  // Calculate totals
  const totalPayment: number = monthlyPayment * loanTermMonths;
  const totalInterest: number = totalPayment - loanAmount;

  // Calculate first payment (down payment + total costs)
  const firstPayment: number = downPaymentAmount + totalCosts;

  // Generate amortization schedule using annuity method
  const amortizationSchedule: AmortizationItem[] = [];
  let remainingBalance: number = loanAmount;

  for (let period = 1; period <= loanTermMonths; period++) {
    // Calculate interest for this period
    const interestPayment: number = remainingBalance * monthlyInterestRate;
    
    // Calculate principal payment for this period
    const principalPayment: number = monthlyPayment - interestPayment;
    
    // Update remaining balance
    remainingBalance = Math.max(0, remainingBalance - principalPayment);

    // Add to schedule
    amortizationSchedule.push({
      period: period,
      payment: monthlyPayment,
      principal: principalPayment,
      interest: interestPayment,
      remainingBalance: remainingBalance
    });
  }

  return {
    downPaymentAmount,
    loanAmount,
    monthlyPayment,
    totalPayment,
    totalInterest,
    provisionAmount,
    bphtbTax,
    totalCosts,
    firstPayment,
    amortizationSchedule
  };
}
