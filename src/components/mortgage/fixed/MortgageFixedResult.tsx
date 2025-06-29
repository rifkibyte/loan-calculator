"use client";

import React, { useState } from "react";
import { formatCurrency } from "@/utils/formatters";
import { jsPDF } from "jspdf";
import type { MortgageFixedResult } from "@/types/mortgage-fixed";

interface MortgageFixedResultProps {
  loanDetails: MortgageFixedResult;
}

export default function MortgageFixedResult({
  loanDetails,
}: MortgageFixedResultProps): React.JSX.Element {
  const [activeTab, setActiveTab] = useState<string>("data");

  const safeFormatCurrency = (value: number) => {
    if (isNaN(value) || !isFinite(value)) {
      return "Rp 0";
    }
    return formatCurrency(value);
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Simulasi KPR Bunga Fixed", 105, 15, { align: "center" });

    doc.setFontSize(12);
    doc.text("Data Anda", 14, 30);

    const dataInfo = [
      ["Jumlah Pinjaman", safeFormatCurrency(loanDetails.loanAmount)],
      [
        "Lama Pinjaman",
        `${loanDetails.loanTerm} tahun (${loanDetails.loanTermMonths} bulan)`,
      ],
      ["Perhitungan Bunga", loanDetails.calculationMethod],
      ["Total Pembayaran", safeFormatCurrency(loanDetails.totalPayment)],
      ["Total Bunga", safeFormatCurrency(loanDetails.totalInterest)],
    ];

    (doc as any).autoTable({
      startY: 35,
      body: dataInfo,
      theme: "grid",
      styles: { fontSize: 10 },
    });

    doc.save("simulasi-kpr-bunga-fixed.pdf");
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Tab Navigation */}
      <div className="flex border-b">
        <button
          className={`flex-1 py-3 px-4 text-center font-medium ${
            activeTab === "data"
              ? "bg-blue-50 text-blue-600 border-b-2 border-blue-600"
              : "text-gray-600 hover:text-gray-800"
          }`}
          onClick={() => setActiveTab("data")}
        >
          Data Anda
        </button>
        <button
          className={`flex-1 py-3 px-4 text-center font-medium ${
            activeTab === "summary"
              ? "bg-blue-50 text-blue-600 border-b-2 border-blue-600"
              : "text-gray-600 hover:text-gray-800"
          }`}
          onClick={() => setActiveTab("summary")}
        >
          Ringkasan
        </button>
      </div>

      <div className="p-6">
        {/* Tab 1: Data Anda */}
        {activeTab === "data" && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Data Anda
            </h2>

            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-700">Jumlah Pinjaman:</span>
                  <span className="font-bold text-gray-900">
                    {safeFormatCurrency(loanDetails.loanAmount)}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-700">Lama Pinjaman:</span>
                  <span className="font-bold text-gray-900">
                    {loanDetails.loanTerm} tahun ({loanDetails.loanTermMonths}{" "}
                    bulan)
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-3">
                Bunga per Tahun:
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {loanDetails.yearlyRates.map((rate) => (
                  <div key={rate.year} className="flex justify-between">
                    <span className="text-gray-700">
                      Bunga tahun ke-{rate.year}:
                    </span>
                    <span className="font-medium text-gray-900">
                      {rate.rate}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Ringkasan */}
        {activeTab === "summary" && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Ringkasan Pembayaran
            </h2>

            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-3">
                Total Pembayaran:
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-green-200">
                  <span className="text-gray-700">Jumlah Pinjaman:</span>
                  <span className="font-bold text-gray-900">
                    {safeFormatCurrency(loanDetails.loanAmount)}
                  </span>
                </div>

                <div className="flex justify-between items-center py-2 border-b border-green-200">
                  <span className="text-gray-700">Total Bunga:</span>
                  <span className="font-bold text-gray-900">
                    {safeFormatCurrency(loanDetails.totalInterest)}
                  </span>
                </div>

                <div className="flex justify-between items-center py-2 bg-green-100 px-3 rounded">
                  <span className="font-semibold text-gray-900">
                    Total Pembayaran Keseluruhan:
                  </span>
                  <span className="text-xl font-bold text-green-700">
                    {safeFormatCurrency(loanDetails.totalPayment)}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-3">
                Informasi Tambahan:
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-700">Perhitungan Bunga:</span>
                  <span className="font-medium text-gray-900">
                    {loanDetails.calculationMethod}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-700">Total Periode:</span>
                  <span className="font-medium text-gray-900">
                    {loanDetails.loanTermMonths} bulan
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Export Button */}
        <div className="mt-6">
          <button
            onClick={handleExportPDF}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 font-medium"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2 inline"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            Export PDF
          </button>
        </div>
      </div>
    </div>
  );
}
