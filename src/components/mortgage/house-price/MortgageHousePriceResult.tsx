"use client";

import  { useState } from "react";
import { formatCurrencyDisplay, formatNumber } from "@/utils/formatters";
import { jsPDF } from "jspdf";
import type { MortgageHousePriceResult } from "@/types/mortgage-house-price";

interface MortgageResultProps {
  mortgageDetails: MortgageHousePriceResult;
}

export default function MortgageHousePriceResult({
  mortgageDetails,
}: MortgageResultProps) {
  const [activeTab, setActiveTab] = useState<string>("ringkasan");

  const safeFormatCurrency = (value: number) => {
    if (isNaN(value) || !isFinite(value)) {
      return "Rp 0";
    }
    return formatCurrencyDisplay(value);
  };

  const safeFormatNumber = (value: number) => {
    if (isNaN(value) || !isFinite(value)) {
      return "0";
    }
    return formatNumber(value);
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Simulasi KPR - berdasar harga rumah", 105, 15, {
      align: "center",
    });

    doc.setFontSize(12);
    doc.text("Data Anda", 14, 30);

    const dataInfo = [
      ["Harga Rumah", safeFormatCurrency(mortgageDetails.housePrice)],
      [
        "Uang Muka (DP)",
        `${safeFormatCurrency(mortgageDetails.downPaymentAmount)} (${
          mortgageDetails.downPaymentPercent
        }%)`,
      ],
      [
        "Tenor",
        `${mortgageDetails.loanTerm} tahun (${mortgageDetails.loanTermMonths} bulan)`,
      ],
      [
        "Bunga",
        `${
          mortgageDetails.annualInterestRate
        }% / tahun (${mortgageDetails.monthlyInterestRate.toFixed(
          2
        )}% / bulan)`,
      ],
      ["Perhitungan Bunga", mortgageDetails.calculationMethod],
      ["Plafon Pinjaman", safeFormatCurrency(mortgageDetails.loanAmount)],
      [
        "Angsuran per Periode",
        safeFormatCurrency(mortgageDetails.monthlyPayment),
      ],
    ];

    (doc as any).autoTable({
      startY: 35,
      body: dataInfo,
      theme: "grid",
      styles: { fontSize: 10 },
    });

    doc.save("simulasi-kpr-harga-rumah.pdf");
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
            activeTab === "detail"
              ? "bg-blue-50 text-blue-600 border-b-2 border-blue-600"
              : "text-gray-600 hover:text-gray-800"
          }`}
          onClick={() => setActiveTab("detail")}
        >
          Detail Biaya
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
                    <p className="text-sm text-gray-600">Harga Rumah:</p>
                    <p className="text-lg font-bold text-gray-900">
                      {safeFormatCurrency(mortgageDetails.housePrice)}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-600">Uang Muka (DP):</p>
                    <p className="text-lg font-bold text-gray-900">
                      {safeFormatCurrency(mortgageDetails.downPaymentAmount)}
                      <span className="text-sm font-normal text-gray-500 ml-1">
                        ({mortgageDetails.downPaymentPercent}%)
                      </span>
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-600">Tenor:</p>
                    <p className="text-lg font-bold text-gray-900">
                      {mortgageDetails.loanTerm} tahun
                      <span className="text-sm font-normal text-gray-500 ml-1">
                        ({mortgageDetails.loanTermMonths} bulan)
                      </span>
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-600">Bunga:</p>
                    <p className="text-lg font-bold text-gray-900">
                      {mortgageDetails.annualInterestRate}% / tahun
                      <span className="text-sm font-normal text-gray-500 ml-1">
                        ({mortgageDetails.monthlyInterestRate.toFixed(2)}% /
                        bulan)
                      </span>
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-600">Perhitungan Bunga:</p>
                    <p className="text-lg font-bold text-gray-900 capitalize">
                      {mortgageDetails.calculationMethod}
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
                    <span className="text-gray-700">
                      Plafon Pinjaman
                      <br />
                      <span className="text-sm text-gray-500">
                        (Harga Rumah - Uang Muka)
                      </span>
                    </span>
                    <span className="text-xl font-bold text-blue-600">
                      {safeFormatCurrency(mortgageDetails.loanAmount)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center py-2 border-b border-green-200">
                    <span className="text-gray-700">Angsuran per Periode:</span>
                    <span className="text-xl font-bold text-green-600">
                      {safeFormatCurrency(mortgageDetails.monthlyPayment)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-700">Total Periode:</span>
                    <span className="text-lg font-medium text-gray-900">
                      {mortgageDetails.loanTermMonths} bulan
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Detail Biaya */}
        {activeTab === "detail" && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Ketentuan Bank*
            </h2>

            {/* Penghasilan Minimal Section */}
            <div className="bg-yellow-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-3">
                Penghasilan Bersih Minimal (per bulan):
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-yellow-200">
                  <span className="text-gray-700">
                    (Angsuran 30% penghasilan):
                  </span>
                  <span className="font-bold text-gray-900">
                    {safeFormatCurrency(mortgageDetails.minimumIncome30)}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-yellow-200">
                  <span className="text-gray-700">
                    (Angsuran 1/3 penghasilan):
                  </span>
                  <span className="font-bold text-gray-900">
                    {safeFormatCurrency(mortgageDetails.minimumIncome33)}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-700">
                    (Angsuran 40% penghasilan):
                  </span>
                  <span className="font-bold text-gray-900">
                    {safeFormatCurrency(mortgageDetails.minimumIncome40)}
                  </span>
                </div>
              </div>
            </div>

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
                    {safeFormatCurrency(mortgageDetails.provisionAmount)}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-700">
                    Biaya Administrasi
                    <br />
                    <span className="text-sm text-gray-500">(0.1% plafon)</span>
                  </span>
                  <span className="font-bold text-gray-900">
                    {safeFormatCurrency(mortgageDetails.adminAmount)}
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
                    {safeFormatCurrency(mortgageDetails.loanAmount)}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-indigo-200">
                  <span className="text-gray-700">Total Bunga:</span>
                  <span className="font-bold text-gray-900">
                    {safeFormatCurrency(mortgageDetails.totalInterest)}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 bg-indigo-100 px-3 rounded">
                  <span className="font-semibold text-gray-900">
                    Total Pembayaran Keseluruhan:
                  </span>
                  <span className="text-xl font-bold text-indigo-700">
                    {safeFormatCurrency(mortgageDetails.totalPayment)}
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
