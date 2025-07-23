"use client";

import { LoanSchedule } from "@/components/ui/loan";
import { AmortizationItem } from "@/types/common";

interface MortgageFixedScheduleProps {
  schedule?: AmortizationItem[] | null;
}

export default function MortgageFixedSchedule({
  schedule,
}: MortgageFixedScheduleProps) {
  // Guard Clause untuk memastikan data jadwal tersedia
  if (!schedule || schedule.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md text-center">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Tabel Angsuran
        </h2>
        <p className="text-gray-500">Data angsuran tidak tersedia.</p>
      </div>
    );
  }

  // Gunakan komponen reusable <LoanSchedule />
  return <LoanSchedule schedule={schedule} />;
}
