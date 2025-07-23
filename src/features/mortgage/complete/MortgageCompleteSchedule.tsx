// features/mortgage/complete/MortgageCompleteSchedule.tsx (Setelah Refactor)
"use client";

import { LoanSchedule } from "@/components/ui/loan"; // Impor komponen reusable
import { MortgageResult } from "@/types/mortgage";

interface MortgageScheduleProps {
  // Terima seluruh objek hasil, bisa null atau undefined untuk keamanan
  mortgageDetails?: MortgageResult | null;
}

export default function MortgageCompleteSchedule({ mortgageDetails }: MortgageScheduleProps) {
  // Guard Clause: Pastikan data ada sebelum mencoba merendernya.
  // Ini mencegah error jika data belum selesai dihitung.
  if (!mortgageDetails || !mortgageDetails.amortizationSchedule) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md text-center">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Tabel Angsuran</h2>
        <p className="text-gray-500">Silakan lengkapi form untuk melihat tabel angsuran.</p>
      </div>
    );
  }

  // Jika data valid, cukup render komponen <LoanSchedule>
  // dan teruskan HANYA data yang dibutuhkannya (yaitu, array jadwal).
  return <LoanSchedule schedule={mortgageDetails.amortizationSchedule} />;
}
