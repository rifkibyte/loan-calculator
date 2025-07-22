Refactor code ini supaya bisa menggunakan <LoanSchedule />, supaya seperti di refernsi

"use client";

import { useState } from "react";
import { formatCurrency } from "@/utils/formatters";

interface ScheduleItem {
period: number;
payment: number;
principal: number;
interest: number;
remainingBalance: number;
}

interface CarLoanSimpleScheduleProps {
schedule: ScheduleItem[];
totalInterest: number;
totalPrincipal: number;
totalPayment: number;
}

export default function CarLoanSimpleSchedule({
schedule,
totalInterest,
totalPrincipal,
totalPayment
}: CarLoanSimpleScheduleProps) {
const [currentPage, setCurrentPage] = useState(1);
const itemsPerPage = 12;

const totalPages = Math.ceil(schedule.length / itemsPerPage);
const startIndex = (currentPage - 1) \* itemsPerPage;
const currentItems = schedule.slice(startIndex, startIndex + itemsPerPage);

const goToPage = (page: number) => {
setCurrentPage(page);
};

return (
<div className="bg-white p-6 rounded-lg shadow-md">
<h3 className="text-lg font-semibold text-gray-800 mb-4">Tabel Angsuran</h3>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Bulan
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Angsuran Bunga
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Angsuran Pokok
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total Angsuran
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Sisa Pinjaman
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentItems.map((item) => (
              <tr key={item.period} className={item.period % 2 === 0 ? "bg-gray-50" : ""}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                  {item.period}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatCurrency(item.interest)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatCurrency(item.principal)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-medium">
                  {formatCurrency(item.payment)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatCurrency(item.remainingBalance)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between border-t border-gray-200 px-4 py-3 sm:px-6 mt-4">
          <div className="flex flex-1 justify-between sm:hidden">
            <button
              onClick={() => goToPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className={`relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium ${
                currentPage === 1 ? "text-gray-300" : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              Previous
            </button>
            <button
              onClick={() => goToPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className={`relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium ${
                currentPage === totalPages ? "text-gray-300" : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              Next
            </button>
          </div>
          <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">{startIndex + 1}</span> to{" "}
                <span className="font-medium">
                  {Math.min(startIndex + itemsPerPage, schedule.length)}
                </span>{" "}
                of <span className="font-medium">{schedule.length}</span> results
              </p>
            </div>
            <div>
              <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                <button
                  onClick={() => goToPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className={`relative inline-flex items-center rounded-l-md px-2 py-2 ${
                    currentPage === 1
                      ? "text-gray-300"
                      : "text-gray-400 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                  }`}
                >
                  <span className="sr-only">Previous</span>
                  <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
                  </svg>
                </button>

                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }

                  return (
                    <button
                      key={pageNum}
                      onClick={() => goToPage(pageNum)}
                      className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
                        currentPage === pageNum
                          ? "z-10 bg-blue-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                          : "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}

                <button
                  onClick={() => goToPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className={`relative inline-flex items-center rounded-r-md px-2 py-2 ${
                    currentPage === totalPages
                      ? "text-gray-300"
                      : "text-gray-400 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                  }`}
                >
                  <span className="sr-only">Next</span>
                  <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                  </svg>
                </button>
              </nav>
            </div>
          </div>
        </div>
      )}

      {/* Summary Section */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-md">
        <div>
          <p className="text-sm text-gray-600">Total Bunga:</p>
          <p className="text-lg font-semibold text-gray-900">{formatCurrency(totalInterest)}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Total Pokok:</p>
          <p className="text-lg font-semibold text-gray-900">{formatCurrency(totalPrincipal)}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Total Angsuran:</p>
          <p className="text-lg font-semibold text-gray-900">{formatCurrency(totalPayment)}</p>
        </div>
      </div>
    </div>

);
}

Refernsi:
"use client";
import { LoanSchedule } from "@/components/ui/loan";
import { CarLoanBudgetResult } from "@/types/car-loan";

interface CarLoanBudgetScheduleProps {
// Terima seluruh objek, yang bisa jadi null atau undefined
loanDetails?: CarLoanBudgetResult | null;
}

export default function CarLoanBudgetSchedule({
loanDetails,
}: CarLoanBudgetScheduleProps) {
// Guard Clause: Pastikan data ada sebelum mencoba merendernya
if (!loanDetails || !loanDetails.amortizationSchedule) {
// Tampilkan pesan jika data tidak ada, ini mencegah error
return (
<div className="bg-white p-6 rounded-lg shadow-md text-center">
<h2 className="text-xl font-semibold text-gray-800 mb-4">
Tabel Angsuran
</h2>
<p className="text-gray-500">Data angsuran tidak tersedia.</p>
</div>
);
}

// Jika data valid, render komponen reusable LoanSchedule
// dan teruskan HANYA data yang dibutuhkannya (yaitu, array jadwal).
return <LoanSchedule schedule={loanDetails.amortizationSchedule} />;
}

common/LoanSchedule.tsx
// features/common/LoanSchedule.tsx (New Reusable Component)
"use client";

import { useState, useMemo, FC } from "react";
import { formatCurrency } from "@/utils/formatters"; // Menggunakan formatCurrency yang lebih umum

// 1. Tipe Data (Interface)
// Tipe ini bersifat generik dan bisa digunakan oleh semua jenis pinjaman.
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

// 2. Sub-komponen untuk UI yang Terisolasi

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

// Komponen untuk Pagination
const Pagination: FC<{
currentPage: number;
totalPages: number;
onPageChange: (page: number) => void;
}> = ({ currentPage, totalPages, onPageChange }) => {
// Logika untuk membuat tombol halaman, dll. bisa disederhanakan atau dibuat kompleks
// Di sini kita ambil versi yang lebih sederhana dan fungsional
const pageNumbers = Array.from({ length: totalPages }, (\_, i) => i + 1);

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

// file: features/common/LoanSchedule.tsx

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
const pageNumbers = Array.from({ length: totalPages }, (\_, i) => i + 1);

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
const startIndex = (currentPage - 1) \* itemsPerPage;
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
