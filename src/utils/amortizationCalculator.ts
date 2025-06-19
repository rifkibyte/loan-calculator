export interface AmortizationItem {
  period: number;
  payment: number;
  principal: number;
  interest: number;
  remainingBalance: number;
}

export function generateAmortizationSchedule(
  loanAmount: number,
  annualInterestRate: number,
  loanTerm: number,
  monthlyPayment: number
): AmortizationItem[] {
  const monthlyRate = annualInterestRate / 100 / 12;
  let balance = loanAmount;
  const schedule: AmortizationItem[] = [];

  for (let period = 1; period <= loanTerm; period++) {
    const interest = balance * monthlyRate;
    let principal = monthlyPayment - interest;

    if (principal > balance) {
      principal = balance;
    }

    balance -= principal;

    schedule.push({
      period,
      payment: monthlyPayment,
      principal,
      interest,
      remainingBalance: Math.max(balance, 0)
    });

    if (balance <= 0) break;
  }

  return schedule;
}
