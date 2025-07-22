"use client";

import LoanSchedule from "@/features/common/LoanSchedule";
import { CarLoanBudgetResult } from "@/types/car-loan";

interface CarLoanBudgetScheduleProps {
  // Terima seluruh objek, yang bisa jadi null atau undefined
  loanDetails?: CarLoanBudgetResult | null;
}

export default function CarLoanBudgetSchedule({ loanDetails }: CarLoanBudgetScheduleProps) {
  
  // Guard Clause: Pastikan data ada sebelum mencoba merendernya
  if (!loanDetails || !loanDetails.amortizationSchedule) {
    // Tampilkan pesan jika data tidak ada, ini mencegah error
    return (
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Tabel Angsuran
            </h2>
            <p className="text-gray-500">Data angsuran tidak tersedia.</p>
        </div>
    );
  }

  // Jika data valid, render komponen reusable LoanSchedule
  // dan teruskan HANYA data yang dibutuhkannya (yaitu, array jadwal).
  return (
    <LoanSchedule schedule={loanDetails.amortizationSchedule} />
  );
}
