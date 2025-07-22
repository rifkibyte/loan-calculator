"use client";

// 1. Impor komponen LoanSchedule yang reusable
import { LoanSchedule } from "@/components/ui/loan";

// 2. Tipe data untuk satu baris jadwal, pastikan konsisten
interface ScheduleItem {
  period: number;
  payment: number;
  principal: number;
  interest: number;
  remainingBalance: number;
}

// 3. Ubah props: komponen ini sekarang hanya perlu menerima array 'schedule'.
// Total bunga, pokok, dll., akan dihitung oleh LoanSchedule secara internal.
interface CarLoanSimpleScheduleProps {
  schedule: ScheduleItem[];
}

export default function CarLoanSimpleSchedule({
  schedule,
}: CarLoanSimpleScheduleProps) {
  // 4. Guard Clause: Praktik terbaik untuk menangani kasus di mana data tidak ada.
  // Ini mencegah error dan memberikan feedback yang jelas kepada pengguna.
  if (!schedule || schedule.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md text-center">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Tabel Angsuran
        </h3>
        <p className="text-gray-500">
          Jadwal angsuran tidak dapat dibuat atau tidak tersedia.
        </p>
      </div>
    );
  }

  // 5. Render komponen LoanSchedule yang reusable dan serahkan semua pekerjaan kepadanya.
  // Komponen ini tidak lagi perlu tahu tentang paginasi, total, atau cara render tabel.
  return <LoanSchedule schedule={schedule} />;
}
