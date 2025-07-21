// Tambahkan interface untuk amortization schedule
export interface AmortizationItem {
  period: number;
  payment: number;
  principal: number;
  interest: number;
  remainingBalance: number;
}

// Perluas interface CalculationResult agar sesuai dengan LoanResultData
export interface CalculationResult {
  carPrice: number;
  downPaymentAmount: number;
  loanAmount: number;
  monthlyPrincipal: number;
  monthlyInterest: number;
  monthlyPayment: number; // Tambahkan ini
  totalPayment: number;   // Tambahkan ini
  totalInterest: number;  // Tambahkan ini
  firstPayment: number;
  amortizationSchedule: AmortizationItem[];
}

export function calculateLoanFromBudget(
  budget: number,
  downPaymentPercent: number,
  loanTermYears: number,
  annualInterestRate: number
): CalculationResult {
  const loanTermMonths: number = loanTermYears * 12;
  const monthlyInterestRate: number = annualInterestRate / 12 / 100;
  
  // Angsuran bulanan adalah budget yang ditetapkan pengguna
  const monthlyPayment: number = budget;

  // Hitung jumlah pinjaman berdasarkan bunga flat
  // Rumus dibalik: loanAmount = (monthlyPayment - (loanAmount * monthlyInterestRate)) * loanTermMonths
  // Sederhananya: loanAmount = monthlyPayment / ( (1/loanTermMonths) + monthlyInterestRate )
  const loanAmount: number = monthlyPayment / ((1 / loanTermMonths) + monthlyInterestRate);
  
  // Hitung harga mobil dan DP
  const carPrice: number = loanAmount / (1 - downPaymentPercent / 100);
  const downPaymentAmount: number = carPrice * (downPaymentPercent / 100);
  
  // Hitung komponen bulanan
  const monthlyPrincipal: number = loanAmount / loanTermMonths;
  const monthlyInterest: number = loanAmount * monthlyInterestRate;

  // Hitung total pembayaran dan total bunga
  const totalPayment: number = monthlyPayment * loanTermMonths;
  const totalInterest: number = totalPayment - loanAmount;
  
  // Generate amortization schedule
  const amortizationSchedule: AmortizationItem[] = [];
  let remainingBalance: number = loanAmount;

  for (let period = 1; period <= loanTermMonths; period++) {
    remainingBalance -= monthlyPrincipal;
    const adjustedRemainingBalance = period === loanTermMonths ? 0 : remainingBalance;

    amortizationSchedule.push({
      period,
      payment: monthlyPayment,
      principal: monthlyPrincipal,
      interest: monthlyInterest,
      remainingBalance: adjustedRemainingBalance
    });
  }

  // Hitung pembayaran pertama
  const firstPayment: number = downPaymentAmount + monthlyPayment;
  
  return {
    carPrice,
    downPaymentAmount,
    loanAmount,
    monthlyPrincipal,
    monthlyInterest,
    monthlyPayment,
    totalPayment,
    totalInterest,
    firstPayment,
    amortizationSchedule
  };
}
