// file: features/car-loan/budget/CarLoanBudgetSchedule.tsx

"use client";

import LoanSchedule from "@/features/common/LoanSchedule";
import { CarLoanBudgetResult } from "@/types/car-loan";

interface CarLoanBudgetScheduleProps {
  // Terima seluruh objek hasil kalkulasi
  loanDetails?: CarLoanBudgetResult | null;
}

export default function CarLoanBudgetSchedule({
  loanDetails,
}: CarLoanBudgetScheduleProps) {
  // Guard Clause untuk memastikan data ada sebelum render
  if (!loanDetails || !loanDetails.amortizationSchedule) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md text-center">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Tabel Angsuran
        </h2>
        <p className="text-gray-500">
          Silakan lengkapi perhitungan untuk melihat tabel angsuran.
        </p>
      </div>
    );
  }

  // Render komponen reusable LoanSchedule dan hanya teruskan data yang dibutuhkan
  return <LoanSchedule schedule={loanDetails.amortizationSchedule} />;
}
