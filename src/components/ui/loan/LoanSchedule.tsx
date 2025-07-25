// file: components/ui/loan/LoanSchedule.tsx

"use client";

import { useState, useMemo, FC } from "react";
import { formatCurrency } from "@/utils/formatters";

// --- Tipe Data Generik ---
interface ScheduleItem {
  period: number;
  payment: number;
  principal: number;
  interest: number;
  remainingBalance: number;
}

interface LoanScheduleProps {
  schedule: ScheduleItem[];
  itemsPerPage?: number; // Opsional, dengan nilai default
}

// --- Sub-komponen UI ---

// Komponen untuk Ringkasan Total
const ScheduleSummary: FC<{
  totals: { interest: number; principal: number; payment: number };
}> = ({ totals }) => (
  <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-md">
    <div>
      <p className="text-sm text-gray-600">Total Bunga:</p>
      <p className="text-lg font-semibold text-gray-900">
        {formatCurrency(totals.interest)}
      </p>
    </div>
    <div>
      <p className="text-sm text-gray-600">Total Pokok:</p>
      <p className="text-lg font-semibold text-gray-900">
        {formatCurrency(totals.principal)}
      </p>
    </div>
    <div>
      <p className="text-sm text-gray-600">Total Angsuran:</p>
      <p className="text-lg font-semibold text-gray-900">
        {formatCurrency(totals.payment)}
      </p>
    </div>
  </div>
);

// Komponen untuk Tabel Jadwal Angsuran
const ScheduleTable: FC<{ items: ScheduleItem[] }> = ({ items }) => (
  <div className="overflow-x-auto">
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          {["Bulan", "Angsuran Bunga", "Angsuran Pokok", "Total Angsuran", "Sisa Pinjaman"].map(
            (header) => (
              <th key={header} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {header}
              </th>
            )
          )}
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {items.map((item) => (
          <tr key={item.period} className={item.period % 2 === 0 ? "bg-gray-50" : ""}>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">{item.period}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatCurrency(item.interest)}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatCurrency(item.principal)}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-medium">{formatCurrency(item.payment)}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatCurrency(item.remainingBalance)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

// Komponen untuk Paginasi (dibuat lebih sederhana dan jelas)
const Pagination: FC<{
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}> = ({ currentPage, totalPages, onPageChange }) => {
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <div className="flex items-center justify-center space-x-1 mt-4">
             <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1 rounded-md bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
            >
                {"<"}
            </button>
            {pageNumbers.map(num => (
                 <button
                    key={num}
                    onClick={() => onPageChange(num)}
                    className={`px-3 py-1 rounded-md ${currentPage === num ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
                >
                    {num}
                </button>
            ))}
             <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-1 rounded-md bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
            >
                {">"}
            </button>
        </div>
    );
};


// --- Komponen Utama (Reusable) ---
export default function LoanSchedule({ schedule, itemsPerPage = 12 }: LoanScheduleProps) {
  const [currentPage, setCurrentPage] = useState(1);

  // Kalkulasi total di-memoize untuk performa
  const totals = useMemo(() => {
    return schedule.reduce(
      (acc, item) => ({
        interest: acc.interest + item.interest,
        principal: acc.principal + item.principal,
        payment: acc.payment + item.payment,
      }),
      { interest: 0, principal: 0, payment: 0 }
    );
  }, [schedule]);

  // Item yang ditampilkan per halaman juga di-memoize
  const currentItems = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return schedule.slice(startIndex, startIndex + itemsPerPage);
  }, [currentPage, schedule, itemsPerPage]);

  const totalPages = Math.ceil(schedule.length / itemsPerPage);

  // Guard clause jika tidak ada data
  if (!schedule || schedule.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md text-center">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Tabel Angsuran</h2>
        <p className="text-gray-500">Data angsuran tidak tersedia.</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Tabel Angsuran</h2>
      <ScheduleTable items={currentItems} />
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
      <ScheduleSummary totals={totals} />
    </div>
  );
}
