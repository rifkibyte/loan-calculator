// components/islamic-mortgage/IslamicMortgageSchedule.tsx
"use client";

// Impor komponen reusable LoanSchedule yang baru dibuat
import { LoanSchedule } from "@/components/ui/loan";

interface ScheduleItem {
  period: number;
  payment: number;
  principal: number;
  interest: number;
  remainingBalance: number;
}

interface IslamicMortgageScheduleProps {
  schedule: ScheduleItem[];
}

export default function IslamicMortgageSchedule({
  schedule,
}: IslamicMortgageScheduleProps) {
  // Guard Clause: Menangani kasus jika data jadwal tidak tersedia.
  // Ini mencegah error dan memberikan feedback yang jelas kepada pengguna.
  if (!schedule || schedule.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md text-center">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Tabel Angsuran
        </h2>
        <p className="text-gray-500">
          Data angsuran tidak tersedia. Silakan lengkapi dan hitung simulasi
          terlebih dahulu.
        </p>
      </div>
    );
  }

  // Render komponen reusable LoanSchedule dengan data yang diterima.
  // Semua logika kompleks (tabel, paginasi, ringkasan) sudah ditangani di dalamnya.
  return <LoanSchedule schedule={schedule} />;
}
