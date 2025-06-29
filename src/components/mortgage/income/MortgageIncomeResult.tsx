"use client";

import React, { useState } from "react";
import { formatCurrency } from "@/utils/formatters";
import { jsPDF } from "jspdf";
import type { MortgageIncomeResultProps } from "@/types/mortgage-income";

export default function MortgageIncomeResult({
  loanDetails,
}: MortgageIncomeResultProps): React.JSX.Element {
  const [activeTab, setActiveTab] = useState<string>("ringkasan");

  const safeFormatCurrency = (value: number) => {
    if (isNaN(value) || !isFinite(value)) {
      return "Rp 0";
    }
    return formatCurrency(value);
  };

  const safeFormatPercent = (value: number) => {
    if (isNaN(value) || !isFinite(value)) {
      return "0";
    }
    return value.toString();
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Perhitungan Angsuran KPR", 105, 15, { align: "center" });
    doc.text("Perhitungan cicilan KPR berdasar penghasilan bersih", 105, 25, {
      align: "center",
    });

    doc.setFontSize(12);
    doc.text("Data Anda", 14, 40);

    const personalData = [
      [
        "Penghasilan Bersih (per bulan)",
        safeFormatCurrency(loanDetails.netIncome),
      ],
      [
        "Tenor",
        `${loanDetails.loanTerm} tahun (${loanDetails.loanTerm * 12} bulan)`,
      ],
      [
        "Bunga Pinjaman",
        `${safeFormatPercent(
          loanDetails.interestRate
        )}% / tahun (${loanDetails.monthlyInterestRate.toFixed(2)}% / bulan)`,
      ],
      ["Perhitungan Bunga", loanDetails.calculationMethod],
    ];

    (doc as any).autoTable({
      startY: 45,
      head: [["Keterangan", "Nilai"]],
      body: personalData,
      theme: "grid",
      headStyles: { fillColor: [66, 133, 244] },
    });

    const kprData = [
      ["Max. Harga Rumah", safeFormatCurrency(loanDetails.maxHousePrice)],
      ["Min. Uang Muka", safeFormatCurrency(loanDetails.minDownPayment)],
      ["Max. Plafon Pinjaman", safeFormatCurrency(loanDetails.maxLoanAmount)],
      [
        "Max. Angsuran per Periode",
        safeFormatCurrency(loanDetails.maxInstallmentAmount),
      ],
      ["Total Periode", `${loanDetails.loanTerm * 12} bulan`],
    ];

    (doc as any).autoTable({
      startY: (doc as any).lastAutoTable.finalY + 10,
      head: [["KPR Anda", "Nilai"]],
      body: kprData,
      theme: "grid",
      headStyles: { fillColor: [34, 197, 94] },
    });

    doc.save("perhitungan-angsuran-kpr.pdf");
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Tab Navigation - Only 2 tabs */}
      <div className="flex border-b">
        <button
          className={`flex-1 py-3 px-4 text-center font-medium ${
            activeTab === "ringkasan"
              ? "bg-blue-50 text-blue-600 border-b-2 border-blue-600"
              : "text-gray-600 hover:text-gray-800"
          }`}
          onClick={() => setActiveTab("ringkasan")}
        >
          Ringkasan KPR
        </button>
        <button
          className={`flex-1 py-3 px-4 text-center font-medium ${
            activeTab === "biaya"
              ? "bg-blue-50 text-blue-600 border-b-2 border-blue-600"
              : "text-gray-600 hover:text-gray-800"
          }`}
          onClick={() => setActiveTab("biaya")}
        >
          Biaya Lain*
        </button>
      </div>

      <div className="p-6">
        {/* Tab 1: Ringkasan KPR */}
        {activeTab === "ringkasan" && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Data Anda
            </h2>

            {/* Data Anda Section */}
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-600">
                      Penghasilan Bersih (per bulan):
                    </p>
                    <p className="text-lg font-bold text-gray-900">
                      {safeFormatCurrency(loanDetails.netIncome)}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-600">Tenor:</p>
                    <p className="text-lg font-bold text-gray-900">
                      {loanDetails.loanTerm} tahun
                      <span className="text-sm font-normal text-gray-500 ml-1">
                        ({loanDetails.loanTerm * 12} bulan)
                      </span>
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-600">Bunga Pinjaman:</p>
                    <p className="text-lg font-bold text-gray-900">
                      {safeFormatPercent(loanDetails.interestRate)}% / tahun
                      <span className="text-sm font-normal text-gray-500 ml-1">
                        ({loanDetails.monthlyInterestRate.toFixed(2)}% / bulan)
                      </span>
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-600">Perhitungan Bunga:</p>
                    <p className="text-lg font-bold text-gray-900 capitalize">
                      {loanDetails.calculationMethod}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* KPR Anda Section */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                KPR Anda
              </h3>
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-green-200">
                    <span className="text-gray-700">Max. Harga Rumah:</span>
                    <span className="text-xl font-bold text-blue-600">
                      {safeFormatCurrency(loanDetails.maxHousePrice)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center py-2 border-b border-green-200">
                    <span className="text-gray-700">Min. Uang Muka:</span>
                    <span className="text-lg font-medium text-gray-900">
                      {safeFormatCurrency(loanDetails.minDownPayment)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center py-2 border-b border-green-200">
                    <span className="text-gray-700">Max. Plafon Pinjaman:</span>
                    <span className="text-lg font-medium text-gray-900">
                      {safeFormatCurrency(loanDetails.maxLoanAmount)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center py-2 border-b border-green-200">
                    <span className="text-gray-700">
                      Max. Angsuran per Periode:
                    </span>
                    <span className="text-xl font-bold text-green-600">
                      {safeFormatCurrency(loanDetails.maxInstallmentAmount)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-700">Total Periode:</span>
                    <span className="text-lg font-medium text-gray-900">
                      {loanDetails.loanTerm * 12} bulan
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Biaya Lain */}
        {activeTab === "biaya" && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Biaya Lain*
            </h2>

            {/* Biaya Bank Section */}
            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-3">Biaya Bank:</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-purple-200">
                  <span className="text-gray-700">
                    Biaya Provisi
                    <br />
                    <span className="text-sm text-gray-500">(1% plafon)</span>
                  </span>
                  <span className="font-bold text-gray-900">
                    {safeFormatCurrency(loanDetails.provisionFee)}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-700">
                    Biaya Administrasi
                    <br />
                    <span className="text-sm text-gray-500">(0.1% plafon)</span>
                  </span>
                  <span className="font-bold text-gray-900">
                    {safeFormatCurrency(loanDetails.adminFee)}
                  </span>
                </div>
              </div>
            </div>

            {/* Total Pembayaran Section */}
            <div className="bg-indigo-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-3">
                Total Pembayaran:
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-indigo-200">
                  <span className="text-gray-700">Total Pokok Pinjaman:</span>
                  <span className="font-bold text-gray-900">
                    {safeFormatCurrency(loanDetails.maxLoanAmount)}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-indigo-200">
                  <span className="text-gray-700">Total Bunga:</span>
                  <span className="font-bold text-gray-900">
                    {safeFormatCurrency(loanDetails.totalInterest)}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 bg-indigo-100 px-3 rounded">
                  <span className="font-semibold text-gray-900">
                    Total Pembayaran Keseluruhan:
                  </span>
                  <span className="text-xl font-bold text-indigo-700">
                    {safeFormatCurrency(loanDetails.totalPayment)}
                  </span>
                </div>
              </div>
            </div>

            {/* Disclaimer */}
            <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400">
              <p className="text-sm text-yellow-800">
                <strong>*Catatan:</strong> Biaya-biaya di atas dapat berbeda
                tergantung kebijakan masing-masing bank. Silakan konfirmasi
                dengan pihak bank untuk informasi yang lebih akurat.
              </p>
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
