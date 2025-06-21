"use client";

import { useState, useMemo } from "react";
import { AmortizationItem } from "@/types/personal-loan-amount";

interface PersonalLoanAmountScheduleProps {
  schedule: AmortizationItem[];
  loanAmount: number;
  monthlyInterestRate: number;
  calculationMethod: string;
  selectedTerm: number;
  onTermChange: (term: number) => void;
}

export default function PersonalLoanAmountSchedule({ 
  schedule, 
  loanAmount, 
  monthlyInterestRate, 
  calculationMethod,
  selectedTerm,
  onTermChange 
}: PersonalLoanAmountScheduleProps): JSX.Element {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Available loan terms
  const availableTerms = [6, 12, 18, 24, 30, 36, 42, 48, 54, 60];

  const totalPages = Math.ceil(schedule.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = schedule.slice(startIndex, startIndex + itemsPerPage);

  // Calculate totals
  const { totalInterest, totalPrincipal, totalPayment } = useMemo(() => {
    return schedule.reduce((acc, item) => ({
      totalInterest: acc.totalInterest + item.interest,
      totalPrincipal: acc.totalPrincipal + item.principal,
      totalPayment: acc.totalPayment + item.payment,
    }), {
      totalInterest: 0,
      totalPrincipal: 0,
      totalPayment: 0
    });
  }, [schedule]);

  const formatCurrency = (value: number): string => {
    if (isNaN(value) || !isFinite(value)) {
      return "Rp 0";
    }
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  const handleTermChange = (term: number) => {
    onTermChange(term);
    setCurrentPage(1); // Reset to first page when term changes
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 sm:mb-0">
          Tabel Angsuran KTA
        </h2>
        
        {/* Term Selector */}
        <div className="flex items-center space-x-3">
          <label className="text-sm font-medium text-gray-700">
            Jangka Waktu:
          </label>
          <select
            value={selectedTerm}
            onChange={(e) => handleTermChange(Number(e.target.value))}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {availableTerms.map((term) => (
              <option key={term} value={term}>
                {term} bulan
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Loan Summary */}
      <div className="mb-6 p-4 bg-blue-50 rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
          <div>
            <span className="text-gray-600">Pinjaman:</span>
            <p className="font-semibold text-gray-900">{formatCurrency(loanAmount)}</p>
          </div>
          <div>
            <span className="text-gray-600">Jangka Waktu:</span>
            <p className="font-semibold text-gray-900">{selectedTerm} bulan</p>
          </div>
          <div>
            <span className="text-gray-600">Bunga:</span>
            <p className="font-semibold text-gray-900">{monthlyInterestRate}% / bulan</p>
          </div>
          <div>
            <span className="text-gray-600">Metode:</span>
            <p className="font-semibold text-gray-900">{calculationMethod}</p>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Bulan
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Angsuran Bunga
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Angsuran Pokok
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Total Angsuran
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Sisa Pinjaman
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentItems.map((item) => (
              <tr
                key={item.period}
                className={item.period % 2 === 0 ? "bg-gray-50" : ""}
              >
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

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between border-t border-gray-200 px-4 py-3 sm:px-6 mt-4">
          <div className="flex flex-1 justify-between sm:hidden">
            <button
              onClick={() => goToPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className={`relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium ${
                currentPage === 1
                  ? "text-gray-300"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              Previous
            </button>
            <button
              onClick={() => goToPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className={`relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium ${
                currentPage === totalPages
                  ? "text-gray-300"
                  : "text-gray-700 hover:bg-gray-50"
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
                of <span className="font-medium">{schedule.length}</span>{" "}
                results
              </p>
            </div>
            <div>
              <nav
                className="isolate inline-flex -space-x-px rounded-md shadow-sm"
                aria-label="Pagination"
              >
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
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                      clipRule="evenodd"
                    />
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
                  onClick={() =>
                    goToPage(Math.min(totalPages, currentPage + 1))
                  }
                  disabled={currentPage === totalPages}
                  className={`relative inline-flex items-center rounded-r-md px-2 py-2 ${
                    currentPage === totalPages
                      ? "text-gray-300"
                      : "text-gray-400 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                  }`}
                >
                  <span className="sr-only">Next</span>
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                      clipRule="evenodd"
                    />
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
          <p className="text-lg font-semibold text-gray-900">
            {formatCurrency(totalInterest)}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Total Pokok:</p>
          <p className="text-lg font-semibold text-gray-900">
            {formatCurrency(totalPrincipal)}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Total Angsuran:</p>
          <p className="text-lg font-semibold text-gray-900">
            {formatCurrency(totalPayment)}
          </p>
        </div>
      </div>

      {/* Additional Info */}
      <div className="mt-4 p-4 bg-yellow-50 rounded-lg">
        <h3 className="font-semibold text-gray-900 mb-2">Catatan:</h3>
        <div className="text-sm text-gray-600 space-y-1">
          <p>• Perhitungan menggunakan metode bunga {calculationMethod}</p>
          <p>• Angsuran pokok dan bunga tetap setiap bulan (untuk metode FLAT)</p>
          <p>• Sisa pinjaman berkurang setiap bulan sesuai dengan angsuran pokok</p>
          <p>• Tabel ini adalah simulasi dan dapat berbeda dengan kondisi sebenarnya</p>
        </div>
      </div>
    </div>
  );
}
