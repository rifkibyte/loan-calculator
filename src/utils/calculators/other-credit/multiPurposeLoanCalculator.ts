// src/utils/calculators/other-credit/multiPurposeLoanCalculator.ts

// Interface untuk item jadwal amortisasi
interface AmortizationItem {
  period: number;
  payment: number;
  principal: number;
  interest: number;
  remainingBalance: number;
}

// Interface untuk hasil kalkulasi
interface CalculationResult {
  loanAmount: number;
  monthlyPayment: number;
  monthlyPrincipal: number;
  monthlyInterest: number;
  totalPayment: number;
  totalInterest: number;
  provisionAmount: number;
  adminFee: number;
  firstPayment: number;
  amortizationSchedule: AmortizationItem[];
  fixedRatePeriod: number;
  variableRate: number;
}

/**
 * Menghitung detail kredit multi guna dengan suku bunga campuran.
 * (Fungsi ini tidak berubah karena tidak pernah menggunakan applicantType)
 */
export function calculateMultiPurposeLoan(
  loanAmount: number,
  loanTermYears: number,
  fixedInterestRate: number,
  variableInterestRate: number,
  fixedRatePeriod: number = 3,
  provisionPercent: number,
  adminFee: number
): CalculationResult {
  const loanTermMonths: number = loanTermYears * 12;
  const fixedRateMonths: number = fixedRatePeriod * 12;
  
  const provisionAmount: number = loanAmount * (provisionPercent / 100);
  
  const monthlyFixedRate: number = fixedInterestRate / 100 / 12;
  const monthlyVariableRate: number = variableInterestRate / 100 / 12;
  
  let monthlyPaymentFixed: number;
  if (monthlyFixedRate === 0) {
    monthlyPaymentFixed = loanAmount / loanTermMonths;
  } else {
    monthlyPaymentFixed = (loanAmount * monthlyFixedRate * Math.pow(1 + monthlyFixedRate, loanTermMonths)) / 
                         (Math.pow(1 + monthlyFixedRate, loanTermMonths) - 1);
  }
  
  const amortizationSchedule: AmortizationItem[] = [];
  let remainingBalance: number = loanAmount;
  let totalInterestPaid: number = 0;
  
  for (let period: number = 1; period <= loanTermMonths; period++) {
    let currentRate: number;
    let monthlyPayment: number;
    
    if (period <= fixedRateMonths) {
      currentRate = monthlyFixedRate;
      monthlyPayment = monthlyPaymentFixed;
    } else {
      currentRate = monthlyVariableRate;
      const remainingMonths = loanTermMonths - period + 1;
      if (currentRate === 0) {
        monthlyPayment = remainingBalance / remainingMonths;
      } else {
        monthlyPayment = (remainingBalance * currentRate * Math.pow(1 + currentRate, remainingMonths)) / 
                        (Math.pow(1 + currentRate, remainingMonths) - 1);
      }
    }
    
    const interestPayment: number = remainingBalance * currentRate;
    const principalPayment: number = monthlyPayment - interestPayment;
    
    remainingBalance -= principalPayment;
    totalInterestPaid += interestPayment;
    
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
  
  const totalPayment: number = amortizationSchedule.reduce((sum, item) => sum + item.payment, 0);
  const totalInterest: number = totalInterestPaid;
  
  const avgMonthlyPayment: number = totalPayment / loanTermMonths;
  const avgMonthlyPrincipal: number = loanAmount / loanTermMonths;
  const avgMonthlyInterest: number = totalInterest / loanTermMonths;
  
  const firstPayment: number = amortizationSchedule[0].payment + provisionAmount + adminFee;
  
  return {
    loanAmount,
    monthlyPayment: avgMonthlyPayment,
    monthlyPrincipal: avgMonthlyPrincipal,
    monthlyInterest: avgMonthlyInterest,
    totalPayment,
    totalInterest,
    provisionAmount,
    adminFee,
    firstPayment,
    amortizationSchedule,
    fixedRatePeriod,
    variableRate: variableInterestRate
  };
}

// --- DIHAPUS ---
// Fungsi getMaxLoanAmount dan getMaxLoanTerm dihapus karena tidak lagi digunakan.
// export function getMaxLoanAmount(...) { ... }
// export function getMaxLoanTerm(...) { ... }
