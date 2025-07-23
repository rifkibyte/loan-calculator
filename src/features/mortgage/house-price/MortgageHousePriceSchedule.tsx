// file: app/kalkulator/kpr/harga-rumah/schedule/page.tsx (Setelah di-refactor)

"use client";

// Impor komponen reusable LoanSchedule
import { LoanSchedule } from "@/components/ui/loan";
import { AmortizationItem } from "@/types/common";

interface MortgageScheduleProps {
  schedule: AmortizationItem[];
}

export default function MortgageHousePriceSchedule({
  schedule,
}: MortgageScheduleProps) {
  // Guard Clause: Pastikan data jadwal angsuran tersedia dan tidak kosong.
  if (!schedule || schedule.length === 0) {
    // Jika tidak ada data, tampilkan pesan yang informatif.
    // Ini mencegah error dan memberikan feedback yang jelas kepada pengguna.
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

  // Jika data valid, render komponen reusable LoanSchedule.
  // Komponen ini akan mengurus semua logika tampilan, paginasi, dan ringkasan.
  return <LoanSchedule schedule={schedule} />;
}
