// src/components/mortgage/budget/MortgageBudgetSchedule.tsx (Setelah Refactor)
"use client";

// 1. Impor komponen UI reusable untuk tabel angsuran
import { LoanSchedule } from "@/components/ui/loan";

// 2. Impor tipe data yang relevan
import { MortgageBudgetResult } from "@/types/mortgage-budget";

// 3. Definisikan props, terima seluruh objek hasil kalkulasi
interface MortgageBudgetScheduleProps {
  loanDetails?: MortgageBudgetResult | null;
}

export default function MortgageBudgetSchedule({
  loanDetails,
}: MortgageBudgetScheduleProps) {
  // 4. Guard Clause: Pastikan data yang dibutuhkan ada sebelum render.
  //    Ini mencegah error jika props belum siap (misal: masih loading).
  if (!loanDetails || !loanDetails.amortizationSchedule) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md text-center">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Tabel Angsuran
        </h2>
        <p className="text-gray-500">Data angsuran tidak tersedia.</p>
      </div>
    );
  }

  // 5. Jika data valid, render komponen <LoanSchedule />.
  //    Tugas komponen ini sekarang hanya meneruskan data jadwal angsuran.
  return <LoanSchedule schedule={loanDetails.amortizationSchedule} />;
}
