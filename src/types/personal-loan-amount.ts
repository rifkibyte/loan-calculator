// File: /types/personal-loan-amount.ts (Direvisi)

// Tipe untuk jadwal amortisasi (sudah baik)
export interface AmortizationItem {
  period: number;
  payment: number;
  principal: number;
  interest: number;
  remainingBalance: number;
}

// Tipe untuk satu baris dalam tabel hasil (sudah baik)
export interface LoanAmountTableItem {
  maxLoanAmount: number;
  loanTerm: number;
  maxInstallment: number;
  minSalary: number;
}

// Tipe BARU: Hanya untuk data yang berasal dari form (Input)
export interface PersonalLoanAmountFormData {
  loanAmount: number;
  creditRatio: number;
  monthlyInterestRate: number;
  calculationMethod: string;
  // Kita tambahkan initialLoanTerm untuk kalkulasi jadwal pertama kali
  initialLoanTerm: number; 
}

// Tipe BARU: Hanya untuk data hasil kalkulasi utama (Output)
export interface PersonalLoanAmountResult {
  annualInterestRate: number;
  loanTable: LoanAmountTableItem[];
  // Jadwal awal juga kita masukkan sebagai hasil kalkulasi
  initialSchedule: AmortizationItem[];
}
