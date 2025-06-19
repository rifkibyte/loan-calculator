// Tambahkan interface untuk amortization schedule
export interface AmortizationItem {
  period: number;
  payment: number;
  principal: number;
  interest: number;
  remainingBalance: number;
}

// Perluas interface CalculationResult
export interface CalculationResult {
  carPrice: number;
  downPaymentAmount: number;
  loanAmount: number;
  monthlyPrincipal: number;
  monthlyInterest: number;
  firstPayment: number;
  amortizationSchedule: AmortizationItem[]; // Tambahkan ini
}

export function calculateLoanFromBudget(
  budget: number,
  downPaymentPercent: number,
  loanTermYears: number,
  annualInterestRate: number
): CalculationResult {
  const loanTermMonths: number = loanTermYears * 12;
  const monthlyInterestRate: number = annualInterestRate / 12 / 100;
  
  // Hitung jumlah pinjaman
  const monthlyPrincipalFactor: number = 1 / loanTermMonths;
  const monthlyInterestFactor: number = monthlyInterestRate;
  const totalMonthlyFactor: number = monthlyPrincipalFactor + monthlyInterestFactor;
  
  const loanAmount: number = budget / totalMonthlyFactor;
  
  // Hitung harga mobil dan DP
  const carPrice: number = loanAmount / (1 - downPaymentPercent / 100);
  const downPaymentAmount: number = carPrice * (downPaymentPercent / 100);
  
  // Hitung komponen bulanan
  const monthlyPrincipal: number = loanAmount / loanTermMonths;
  const monthlyInterest: number = loanAmount * monthlyInterestRate;
  
  // Generate amortization schedule
  const amortizationSchedule: AmortizationItem[] = [];
  let remainingBalance: number = loanAmount;

  for (let period = 1; period <= loanTermMonths; period++) {
    remainingBalance -= monthlyPrincipal;
    
    // Pastikan saldo terakhir menjadi 0
    const adjustedRemainingBalance = period === loanTermMonths ? 0 : remainingBalance;

    amortizationSchedule.push({
      period,
      payment: budget,
      principal: monthlyPrincipal,
      interest: monthlyInterest,
      remainingBalance: adjustedRemainingBalance
    });
  }

  // Hitung pembayaran pertama
  const firstPayment: number = downPaymentAmount + budget;
  
  return {
    carPrice,
    downPaymentAmount,
    loanAmount,
    monthlyPrincipal,
    monthlyInterest,
    firstPayment,
    amortizationSchedule // Sertakan jadwal amortisasi
  };
}
