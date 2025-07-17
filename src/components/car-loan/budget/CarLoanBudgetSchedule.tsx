"use client";

import { useState, useMemo, FC, ReactNode } from "react";
import { formatCurrencyDisplay } from "@/utils/formatters";

interface ScheduleItem {
  period: number;
  payment: number;
  principal: number;
  interest: number;
  remainingBalance: number;
}

interface LoanScheduleProps {
  schedule: ScheduleItem[];
  itemsPerPage?: number; // Jadikan opsional dengan nilai default
}

// 1. Komponen untuk Ringkasan Total
const ScheduleSummary: FC<{
  totals: { interest: number; principal: number; payment: number };
}> = ({ totals }) => (
  <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-md">
    <div>
      <p className="text-sm text-gray-600">Total Bunga:</p>
      <p className="text-lg font-semibold text-gray-900">
        {formatCurrencyDisplay(totals.interest)}
      </p>
    </div>
    <div>
      <p className="text-sm text-gray-600">Total Pokok:</p>
      <p className="text-lg font-semibold text-gray-900">
        {formatCurrencyDisplay(totals.principal)}
      </p>
    </div>
    <div>
      <p className="text-sm text-gray-600">Total Angsuran:</p>
      <p className="text-lg font-semibold text-gray-900">
        {formatCurrencyDisplay(totals.payment)}
      </p>
    </div>
  </div>
);

// 2. Komponen untuk Tabel Jadwal Angsuran
const ScheduleTable: FC<{ items: ScheduleItem[] }> = ({ items }) => (
  <div className="overflow-x-auto">
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          {[
            "Bulan",
            "Angsuran Bunga",
            "Angsuran Pokok",
            "Total Angsuran",
            "Sisa Pinjaman",
          ].map((header) => (
            <th
              key={header}
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {items.map((item) => (
          <tr
            key={item.period}
            className={item.period % 2 === 0 ? "bg-gray-50" : ""}
          >
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
              {item.period}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {formatCurrencyDisplay(item.interest)}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {formatCurrencyDisplay(item.principal)}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-medium">
              {formatCurrencyDisplay(item.payment)}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {formatCurrencyDisplay(item.remainingBalance)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

// 3. Komponen untuk Pagination (Logika kompleks diisolasi di sini)
const Pagination: FC<{
  currentPage: number;
  totalPages: number;
  totalResults: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}> = ({
  currentPage,
  totalPages,
  totalResults,
  itemsPerPage,
  onPageChange,
}) => {
  const startIndex = (currentPage - 1) * itemsPerPage;

  // Helper untuk membuat rentang nomor halaman yang akan ditampilkan
  const getPaginationRange = (): (number | string)[] => {
    const delta = 2; // Jumlah halaman di sekitar halaman saat ini
    const range = [];
    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }
    if (currentPage - delta > 2) range.unshift("...");
    if (currentPage + delta < totalPages - 1) range.push("...");
    range.unshift(1);
    if (totalPages > 1) range.push(totalPages);
    return range;
  };

  const pageNumbers = getPaginationRange();

  return (
    <div className="flex items-center justify-between border-t border-gray-200 px-4 py-3 sm:px-6 mt-4">
      {/* Tampilan Mobile */}
      <div className="flex flex-1 justify-between sm:hidden">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:text-gray-300"
        >
          Previous
        </button>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:text-gray-300"
        >
          Next
        </button>
      </div>

      {/* Tampilan Desktop */}
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Menampilkan <span className="font-medium">{startIndex + 1}</span>{" "}
            sampai{" "}
            <span className="font-medium">
              {Math.min(startIndex + itemsPerPage, totalResults)}
            </span>{" "}
            dari <span className="font-medium">{totalResults}</span> hasil
          </p>
        </div>
        <div>
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            {pageNumbers.map((page, index) =>
              typeof page === "string" ? (
                <span
                  key={`ellipsis-${index}`}
                  className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700"
                >
                  ...
                </span>
              ) : (
                <button
                  key={page}
                  onClick={() => onPageChange(page)}
                  className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
                    currentPage === page
                      ? "z-10 bg-blue-600 text-white"
                      : "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  }`}
                >
                  {page}
                </button>
              )
            )}
          </nav>
        </div>
      </div>
    </div>
  );
};

// --- Komponen Utama ---
export default function LoanSchedule({
  schedule,
  itemsPerPage = 12,
}: LoanScheduleProps) {
  const [currentPage, setCurrentPage] = useState(1);

  // Memoize kalkulasi total agar tidak dihitung ulang pada setiap render
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

  // Memoize item yang ditampilkan per halaman
  const currentItems = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return schedule.slice(startIndex, startIndex + itemsPerPage);
  }, [currentPage, schedule, itemsPerPage]);

  const totalPages = Math.ceil(schedule.length / itemsPerPage);

  // Jika tidak ada data, tampilkan pesan
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

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Tabel Angsuran
      </h2>

      <ScheduleTable items={currentItems} />

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalResults={schedule.length}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
        />
      )}

      <ScheduleSummary totals={totals} />
    </div>
  );
}
