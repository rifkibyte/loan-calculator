// src/components/mortgage/budget/MortgageBudgetResult.tsx
"use client";

import { useState } from "react";
import { jsPDF } from "jspdf";
import type { MortgageBudgetResult as BudgetDetails } from "@/types/mortgage-budget";

interface MortgageBudgetResultProps {
  budgetDetails: BudgetDetails;
}

export default function MortgageBudgetResult({
  budgetDetails,
}: MortgageBudgetResultProps) {
  const [activeTab, setActiveTab] = useState<string>("data");

  const formatCurrency = (value: number): string => {
    if (isNaN(value) || !isFinite(value)) {
      return "Rp 0,00";
    }
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const formatPercent = (value: number): string => {
    if (isNaN(value) || !isFinite(value)) {
      return "0";
    }
    return value.toFixed(1);
  };

  const handlePrint = (): void => {
    window.print();
  };

  const handleExportPDF = (): void => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Simulasi KPR - Berdasar Budget", 105, 15, { align: "center" });

    doc.setFontSize(12);
    doc.text("Data Anda", 14, 30);

    const dataInfo = [
      [
        "Budget Angsuran (per bulan)",
        formatCurrency(budgetDetails.monthlyBudget),
      ],
      [
        "Tenor",
        `${budgetDetails.loanTerm} tahun (${budgetDetails.loanTermMonths} bulan)`,
      ],
      [
        "Bunga Pinjaman",
        `${formatPercent(
          budgetDetails.annualInterestRate
        )}% / tahun (${formatPercent(
          budgetDetails.monthlyInterestRate
        )}% / bulan)`,
      ],
      ["Perhitungan Bunga", "Anuitas"],
    ];

    (doc as any).autoTable({
      startY: 35,
      body: dataInfo,
      theme: "grid",
      styles: { fontSize: 10 },
    });

    doc.save("simulasi-kpr-budget.pdf");
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Tab Navigation - Only 2 tabs */}
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
            activeTab === "results"
              ? "bg-blue-50 text-blue-600 border-b-2 border-blue-600"
              : "text-gray-600 hover:text-gray-800"
          }`}
          onClick={() => setActiveTab("results")}
        >
          Hasil KPR
        </button>
      </div>

      <div className="p-6">
        {/* Tab 1: Data Anda */}
        {activeTab === "data" && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Data Anda
            </h2>

            <div className="bg-gray-50 p-4 rounded-lg space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">
                  Budget Angsuran (per bulan):
                </span>
                <span className="font-medium text-gray-900">
                  {formatCurrency(budgetDetails.monthlyBudget)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tenor:</span>
                <span className="font-medium text-gray-900">
                  {budgetDetails.loanTerm} tahun ({budgetDetails.loanTermMonths}{" "}
                  bulan)
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Bunga Pinjaman:</span>
                <span className="font-medium text-gray-900">
                  {formatPercent(budgetDetails.annualInterestRate)}% / tahun
                  <br />
                  <span className="text-sm text-gray-500">
                    ({formatPercent(budgetDetails.monthlyInterestRate)}% /
                    bulan)
                  </span>
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Perhitungan Bunga:</span>
                <span className="font-medium text-gray-900">Anuitas</span>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Hasil KPR (Combined KPR Anda + Syarat Bank) */}
        {activeTab === "results" && (
          <div className="space-y-6">
            {/* KPR Anda Section */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                KPR Anda
              </h2>

              <div className="bg-blue-50 p-4 rounded-lg space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Max. Harga Rumah:</span>
                  <span className="font-bold text-blue-700">
                    {formatCurrency(budgetDetails.maxHousePrice)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Min. Uang Muka:</span>
                  <span className="font-medium text-gray-900">
                    {formatCurrency(budgetDetails.minDownPayment)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Max. Plafon Pinjaman:</span>
                  <span className="font-medium text-gray-900">
                    {formatCurrency(budgetDetails.maxLoanAmount)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">
                    Max. Angsuran per Periode:
                  </span>
                  <span className="font-medium text-gray-900">
                    {formatCurrency(budgetDetails.maxMonthlyPayment)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Periode:</span>
                  <span className="font-medium text-gray-900">
                    {budgetDetails.loanTermMonths} bulan
                  </span>
                </div>
              </div>
            </div>

            {/* Syarat Bank Section */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Syarat Bank*
              </h3>

              <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">
                    Min. Penghasilan Bersih (per bulan):
                  </span>
                  <span className="font-medium text-gray-900">
                    {formatCurrency(budgetDetails.minMonthlyIncome)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">
                    Biaya Provisi (
                    {formatPercent(budgetDetails.provisionPercent)}% plafon):
                  </span>
                  <span className="font-medium text-gray-900">
                    {formatCurrency(budgetDetails.provisionAmount)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">
                    Biaya Administrasi (
                    {formatPercent(budgetDetails.adminPercent)}% plafon):
                  </span>
                  <span className="font-medium text-gray-900">
                    {formatCurrency(budgetDetails.adminAmount)}
                  </span>
                </div>
              </div>

              <div className="bg-yellow-50 p-4 rounded-lg mt-4">
                <p className="text-sm text-gray-600">
                  * Syarat dan ketentuan dapat berbeda untuk setiap bank.
                  Silakan konsultasikan dengan bank pilihan Anda untuk informasi
                  yang lebih akurat.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="mt-6 flex space-x-4">
          <button
            onClick={handlePrint}
            className="flex-1 bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            Print
          </button>
          <button
            onClick={handleExportPDF}
            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Export PDF
          </button>
        </div>
      </div>
    </div>
  );
}
