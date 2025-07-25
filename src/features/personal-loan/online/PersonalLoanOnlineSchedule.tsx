// feature/online-loan/OnlineLoanSchedule.tsx
"use client";

// Impor komponen reusable LoanSchedule yang sudah ada
import { LoanSchedule } from "@/components/ui/loan";

// Tipe untuk satu baris dalam jadwal, harus cocok dengan yang diharapkan oleh LoanSchedule
interface ScheduleItem {
  period: number;
  payment: number;
  principal: number;
  interest: number;
  remainingBalance: number;
}

// Tipe untuk props komponen ini
interface OnlineLoanScheduleProps {
  schedule: ScheduleItem[];
}

/**
 * Komponen wrapper untuk menampilkan tabel jadwal angsuran pinjaman online.
 * Komponen ini menggunakan komponen reusable <LoanSchedule /> untuk menampilkan data.
 */
export default function OnlineLoanSchedule({
  schedule,
}: OnlineLoanScheduleProps) {
  // Guard Clause: Menampilkan pesan jika data jadwal tidak tersedia.
  // Ini mencegah error dan memberikan feedback yang jelas kepada pengguna.
  if (!schedule || schedule.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md text-center">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Tabel Jadwal Angsuran
        </h2>
        <p className="text-gray-500">
          Data angsuran tidak tersedia. Silakan lengkapi formulir dan hitung
          simulasi terlebih dahulu untuk melihat jadwal pembayaran.
        </p>
      </div>
    );
  }

  // Jika data tersedia, render komponen reusable LoanSchedule
  // dengan data yang diterima dari props.
  return <LoanSchedule schedule={schedule} />;
}
