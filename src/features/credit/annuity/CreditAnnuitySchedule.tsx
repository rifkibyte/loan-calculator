"use client";

import { LoanSchedule } from "@/components/ui/loan";

// Tipe untuk satu baris data dalam jadwal
interface ScheduleItem {
  period: number;
  payment: number;
  principal: number;
  interest: number;
  remainingBalance: number;
}

// Tipe untuk props komponen pembungkus
interface CreditAnnuityScheduleProps {
  schedule: ScheduleItem[];
}

export default function CreditAnnuitySchedule({
  schedule,
}: CreditAnnuityScheduleProps) {
  // Guard Clause: Pastikan data ada sebelum mencoba merender komponen.
  // Ini mencegah error jika `schedule` kosong atau belum ada.
  if (!schedule || schedule.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md text-center">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Tabel Angsuran
        </h2>
        <p className="text-gray-500">
          Jadwal angsuran akan ditampilkan di sini setelah perhitungan selesai.
        </p>
      </div>
    );
  }

  // Jika data valid, render komponen reusable `LoanSchedule`.
  // Teruskan HANYA data yang dibutuhkannya dan override judulnya
  // agar lebih spesifik sesuai konteks halaman ini.
  return <LoanSchedule schedule={schedule} />;
}
