"use client";

import { useState } from "react";
import { jsPDF } from "jspdf";

interface PersonalLoanResultProps {
  loanDetails: {
    netIncome: number;
    debtRatioPercent: number;
    debtRatioAmount: number;
    otherLoanPayment: number;
    interestRate: number; // Bunga per bulan
    annualInterestRate: number; // Bunga per tahun
    maxKtaPayment: number; // Maksimal angsuran KTA
    loanAmount: number;
    monthlyPayment: number;
    monthlyPrincipal: number;
    monthlyInterest: number;
    totalPayment: number;
    totalInterest: number;
    calculationMethod: string;
  };
}

export default function PersonalLoanResult({
  loanDetails,
}: PersonalLoanResultProps): JSX.Element {
  console.log("loanDetails", JSON.stringify(loanDetails));

  const [activeTab, setActiveTab] = useState<string>("info");

  // Helper function to safely format currency and handle NaN values
  const safeFormatCurrency = (value: number): string => {
    if (
      isNaN(value) ||
      !isFinite(value) ||
      value === null ||
      value === undefined
    ) {
      return "Rp 0";
    }
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  // Helper function to safely format percentage
  const safeFormatPercent = (value: number): string => {
    if (
      isNaN(value) ||
      !isFinite(value) ||
      value === null ||
      value === undefined
    ) {
      return "0";
    }
    return value.toFixed(2);
  };

  const handleExportPDF = (): void => {
    const doc = new jsPDF();

    // Add title
    doc.setFontSize(18);
    doc.text("Simulasi KTA - Limit Kredit", 105, 15, { align: "center" });

    // Add loan details
    doc.setFontSize(12);
    doc.text("Informasi Pinjaman", 14, 30);

    const loanInfo = [
      [
        "Penghasilan Bersih per Bulan",
        safeFormatCurrency(loanDetails.netIncome),
      ],
      ["Rasio Kredit", `${safeFormatPercent(loanDetails.debtRatioPercent)}%`],
      [
        "Maksimal Angsuran per Bulan",
        safeFormatCurrency(loanDetails.debtRatioAmount),
      ],
      [
        "Angsuran Pinjaman Lain per Bulan",
        safeFormatCurrency(loanDetails.otherLoanPayment),
      ],
      [
        "Bunga KTA per Bulan",
        `${safeFormatPercent(loanDetails.interestRate)}%`,
      ],
      [
        "Bunga KTA per Tahun",
        `${safeFormatPercent(loanDetails.annualInterestRate)}%`,
      ],
      [
        "Maksimal Angsuran KTA per Bulan",
        safeFormatCurrency(loanDetails.maxKtaPayment),
      ],
      ["Plafon Pinjaman", safeFormatCurrency(loanDetails.loanAmount)],
      ["Total Pembayaran", safeFormatCurrency(loanDetails.totalPayment)],
    ];

    (doc as any).autoTable({
      startY: 35,
      head: [["Keterangan", "Nilai"]],
      body: loanInfo,
      theme: "grid",
      headStyles: { fillColor: [66, 133, 244] },
    });

    doc.save("simulasi-kta.pdf");
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="flex border-b">
        <button
          className={`flex-1 py-3 px-4 text-center font-medium ${
            activeTab === "info"
              ? "bg-blue-50 text-blue-600 border-b-2 border-blue-600"
              : "text-gray-600"
          }`}
          onClick={() => setActiveTab("info")}
        >
          Informasi Pinjaman
        </button>
        <button
          className={`flex-1 py-3 px-4 text-center font-medium ${
            activeTab === "payment"
              ? "bg-blue-50 text-blue-600 border-b-2 border-blue-600"
              : "text-gray-600"
          }`}
          onClick={() => setActiveTab("payment")}
        >
          Pembayaran
        </button>
      </div>

      <div className="p-6">
        {activeTab === "info" && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Informasi Pinjaman Anda
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">
                  Penghasilan Bersih (per bulan):
                </p>
                <p className="text-lg font-bold text-gray-900">
                  {safeFormatCurrency(loanDetails.netIncome)}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-600">Rasio Kredit:</p>
                <p className="text-lg font-bold text-gray-900">
                  {safeFormatPercent(loanDetails.debtRatioPercent)}%
                  <span className="text-sm font-normal text-gray-500 ml-1">
                    dari penghasilan bersih
                  </span>
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-600">Angsuran Pinjaman Lain:</p>
                <p className="text-lg font-bold text-gray-900">
                  {safeFormatCurrency(loanDetails.otherLoanPayment)}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-600">Bunga KTA:</p>
                <p className="text-lg font-bold text-gray-900">
                  {safeFormatPercent(loanDetails.interestRate)}% / bulan
                  <span className="text-sm font-normal text-gray-500 ml-1">
                    ({safeFormatPercent(loanDetails.annualInterestRate)}% /
                    tahun)
                  </span>
                </p>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-3">
                Maksimal Angsuran KTA per Bulan
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-900">
                    Maksimal Angsuran per Bulan (dari penghasilan):
                  </span>
                  <span className="font-medium text-gray-900">
                    {safeFormatCurrency(loanDetails.debtRatioAmount)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-900">
                    Angsuran Pinjaman Lain per Bulan:
                  </span>
                  <span className="font-medium text-gray-900">
                    - {safeFormatCurrency(loanDetails.otherLoanPayment)}
                  </span>
                </div>
                <div className="border-t border-blue-200 my-2 pt-2 flex justify-between">
                  <span className="font-medium text-gray-900">
                    Maksimal Angsuran KTA per Bulan:
                  </span>
                  <span className="font-bold text-blue-700">
                    {safeFormatCurrency(loanDetails.maxKtaPayment)}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-3">
                Estimasi Plafon Pinjaman
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-900">Metode Perhitungan:</span>
                  <span className="font-medium text-gray-900">
                    {loanDetails.calculationMethod}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-900">
                    Estimasi Plafon Pinjaman:
                  </span>
                  <span className="font-bold text-green-700">
                    {safeFormatCurrency(loanDetails.loanAmount)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "payment" && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Informasi Pembayaran
            </h2>

            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-3">
                Angsuran per Bulan
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-900">
                    Angsuran Pokok per Bulan:
                  </span>
                  <span className="font-medium text-gray-900">
                    {safeFormatCurrency(loanDetails.monthlyPrincipal)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-900">
                    Angsuran Bunga per Bulan:
                  </span>
                  <span className="font-medium text-gray-900">
                    {safeFormatCurrency(loanDetails.monthlyInterest)}
                  </span>
                </div>
                <div className="border-t border-green-200 my-2 pt-2">
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-900">
                      Total Angsuran per Bulan:
                    </span>
                    <span className="font-bold text-green-700">
                      {safeFormatCurrency(loanDetails.monthlyPayment)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-indigo-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-3">
                Total Pembayaran
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-900">Total Pokok:</span>
                  <span className="font-medium text-gray-900">
                    {safeFormatCurrency(loanDetails.loanAmount)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-900">Total Bunga:</span>
                  <span className="font-medium text-gray-900">
                    {safeFormatCurrency(loanDetails.totalInterest)}
                  </span>
                </div>
                <div className="border-t border-indigo-200 my-2 pt-2">
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-900">
                      Total Pembayaran:
                    </span>
                    <span className="font-bold text-indigo-700">
                      {safeFormatCurrency(loanDetails.totalPayment)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-3">
                Catatan Penting
              </h3>
              <div className="text-sm text-gray-600 space-y-2">
                <p>
                  • Angsuran per bulan ini adalah jumlah maksimal yang dapat
                  Anda alokasikan untuk pinjaman KTA
                </p>
                <p>
                  • Perhitungan sudah memperhitungkan penghasilan bersih, rasio
                  kredit, dan angsuran pinjaman lain
                </p>
                <p>
                  • Plafon pinjaman merupakan estimasi berdasarkan kemampuan
                  bayar maksimal
                </p>
                <p>
                  • Bunga dihitung menggunakan metode{" "}
                  {loanDetails.calculationMethod}
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="mt-6">
          <button
            onClick={handleExportPDF}
            className="flex items-center justify-center w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
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
