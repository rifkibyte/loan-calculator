// utils/calculators/islamic-mortgage/islamicMortgageCalculator.ts (Update)

interface CalculationResult {
  loanAmount: number;
  monthlyPayment: number;
  monthlyPrincipal: number;
  monthlyMargin: number;
  totalPayment: number;
  totalMargin: number;
  minimumIncomeRatios: {
    ratio25: number;
    ratio30: number;
    ratio33: number;
    ratio35: number;
    ratio40: number;
  };
  provisionAmount: number;
  adminAmount: number;
  amortizationSchedule: AmortizationItem[];
}

export function calculateIslamicMortgage(
  housePrice: number,
  downPaymentPercent: number,
  loanTermYears: number,
  annualMarginRate: number,
  calculationMethod: "anuitas" | "flat" = "anuitas"
): CalculationResult {
  // Calculate basic loan parameters
  const downPaymentAmount: number = housePrice * (downPaymentPercent / 100);
  const loanAmount: number = housePrice - downPaymentAmount;
  const loanTermMonths: number = loanTermYears * 12;
  const monthlyMarginRate: number = annualMarginRate / 12 / 100;

  // Calculate bank fees
  const provisionAmount: number = loanAmount * 0.01; // 1% of loan amount
  const adminAmount: number = loanAmount * 0.001; // 0.1% of loan amount

  let monthlyPayment: number;
  let totalPayment: number;
  let totalMargin: number;
  let monthlyPrincipal: number;
  let monthlyMargin: number;
  const amortizationSchedule: AmortizationItem[] = [];

  if (calculationMethod === "anuitas") {
    // Anuitas method - fixed monthly payment
    monthlyPayment =
      (loanAmount *
        (monthlyMarginRate * Math.pow(1 + monthlyMarginRate, loanTermMonths))) /
      (Math.pow(1 + monthlyMarginRate, loanTermMonths) - 1);

    totalPayment = monthlyPayment * loanTermMonths;
    totalMargin = totalPayment - loanAmount;

    // For display purposes (average)
    monthlyPrincipal = loanAmount / loanTermMonths;
    monthlyMargin = totalMargin / loanTermMonths;

    // Generate amortization schedule for anuitas
    let remainingBalance: number = loanAmount;

    for (let period: number = 1; period <= loanTermMonths; period++) {
      const marginPayment: number = remainingBalance * monthlyMarginRate;
      const principalPayment: number = monthlyPayment - marginPayment;
      remainingBalance -= principalPayment;

      const adjustedRemainingBalance: number =
        period === loanTermMonths ? 0 : Math.max(0, remainingBalance);

      amortizationSchedule.push({
        period,
        payment: monthlyPayment,
        principal: principalPayment,
        interest: marginPayment,
        remainingBalance: adjustedRemainingBalance,
      });
    }
  } else {
    // Flat method - fixed principal and margin
    monthlyPrincipal = loanAmount / loanTermMonths;
    monthlyMargin = (loanAmount * (annualMarginRate / 100)) / 12;
    monthlyPayment = monthlyPrincipal + monthlyMargin;

    totalPayment = monthlyPayment * loanTermMonths;
    totalMargin = monthlyMargin * loanTermMonths;

    // Generate amortization schedule for flat
    let remainingBalance: number = loanAmount;

    for (let period: number = 1; period <= loanTermMonths; period++) {
      remainingBalance -= monthlyPrincipal;

      const adjustedRemainingBalance: number =
        period === loanTermMonths ? 0 : remainingBalance;

      amortizationSchedule.push({
        period,
        payment: monthlyPayment,
        principal: monthlyPrincipal,
        interest: monthlyMargin,
        remainingBalance: adjustedRemainingBalance,
      });
    }
  }

  // Calculate minimum income ratios
  const minimumIncomeRatios = {
    ratio25: monthlyPayment / 0.25,
    ratio30: monthlyPayment / 0.3,
    ratio33: monthlyPayment / (1 / 3),
    ratio35: monthlyPayment / 0.35,
    ratio40: monthlyPayment / 0.4,
  };

  return {
    loanAmount,
    monthlyPayment,
    monthlyPrincipal,
    monthlyMargin,
    totalPayment,
    totalMargin,
    minimumIncomeRatios,
    provisionAmount,
    adminAmount,
    amortizationSchedule,
  };
}
