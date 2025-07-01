"use client";

import  { useState } from "react";
import { jsPDF } from "jspdf";
import { LoanAmountTableItem } from "@/types/personal-loan-amount";

interface ResultData {
  loanAmount: number;
  creditRatio: number;
  monthlyInterestRate: number;
  annualInterestRate: number;
  calculationMethod: string;
  loanTable: LoanAmountTableItem[];
}

interface PersonalLoanAmountResultProps {
  resultData: ResultData;
}

export default function PersonalLoanAmountResult({
  resultData,
}: PersonalLoanAmountResultProps) {
  const [activeTab, setActiveTab] = useState<string>("summary");

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
    return value.toFixed(2);
  };

  const handlePrint = (): void => {
    window.print();
  };

  const handleExportPDF = (): void => {
    const doc = new jsPDF();

    // Add title
    doc.setFontSize(18);
    doc.text("Simulasi KTA", 105, 15, { align: "center" });

    // Add loan details
    doc.setFontSize(12);
    doc.text("Data Anda", 14, 30);

    const loanInfo = [
      ["Besar Pinjaman", formatCurrency(resultData.loanAmount)],
      [
        "Baki Kredit (max. angsuran per bulan dari gaji bersih)",
        `${formatPercent(resultData.creditRatio)} %`,
      ],
      [
        "Bunga KTA",
        `${formatPercent(
          resultData.monthlyInterestRate
        )} % / bulan (${formatPercent(
          resultData.annualInterestRate
        )} % / tahun)`,
      ],
      ["Perhitungan Bunga", resultData.calculationMethod],
    ];

    (doc as any).autoTable({
      startY: 35,
      body: loanInfo,
      theme: "grid",
      styles: { fontSize: 10 },
    });

    // Add table
    doc.text(
      "Tabel Batas Wajar Pinjaman",
      14,
      (doc as any).lastAutoTable.finalY + 15
    );

    const tableData = resultData.loanTable.map((item) => [
      formatCurrency(item.maxLoanAmount),
      `${item.loanTerm} bulan`,
      formatCurrency(item.maxInstallment),
      formatCurrency(item.minSalary),
    ]);

    (doc as any).autoTable({
      startY: (doc as any).lastAutoTable.finalY + 20,
      head: [["Max. Pinjaman", "Jangka Waktu", "Max. Angsuran", "Min. Gaji"]],
      body: tableData,
      theme: "grid",
      headStyles: { fillColor: [66, 133, 244] },
      styles: { fontSize: 8 },
    });

    doc.save("simulasi-kta.pdf");
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="flex border-b">
        <button
          className={`flex-1 py-3 px-4 text-center font-medium ${
            activeTab === "summary"
              ? "bg-blue-50 text-blue-600 border-b-2 border-blue-600"
              : "text-gray-600"
          }`}
          onClick={() => setActiveTab("summary")}
        >
          Data Anda
        </button>
        <button
          className={`flex-1 py-3 px-4 text-center font-medium ${
            activeTab === "table"
              ? "bg-blue-50 text-blue-600 border-b-2 border-blue-600"
              : "text-gray-600"
          }`}
          onClick={() => setActiveTab("table")}
        >
          Tabel Batas Wajar Pinjaman
        </button>
      </div>

      <div className="p-6">
        {activeTab === "summary" && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Data Anda
            </h2>

            <div className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <span className="font-medium text-gray-900">
                  Besar Pinjaman:
                </span>
                <span className="text-gray-900">
                  {formatCurrency(resultData.loanAmount)}
                </span>
              </div>

              <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <span className="font-medium text-gray-900">
                  Baki Kredit
                  <br />
                  <span className="text-sm font-normal text-gray-600">
                    (max. angsuran per bulan dari gaji bersih):
                  </span>
                </span>
                <span className="text-gray-900">
                  {formatPercent(resultData.creditRatio)} %
                </span>
              </div>

              <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <span className="font-medium text-gray-900">Bunga KTA:</span>
                <span className="text-gray-900">
                  {formatPercent(resultData.monthlyInterestRate)} % / bulan
                  <br />
                  <span className="text-sm text-gray-600">
                    ({formatPercent(resultData.annualInterestRate)} % / tahun)
                  </span>
                </span>
              </div>

              <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <span className="font-medium text-gray-900">
                  Perhitungan Bunga:
                </span>
                <span className="text-gray-900">
                  {resultData.calculationMethod}
                </span>
              </div>
            </div>
          </div>
        )}

        {activeTab === "table" && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Tabel Batas Wajar Pinjaman
            </h2>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Max. Pinjaman
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Jangka Waktu
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Max. Angsuran
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Min. Gaji
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {resultData.loanTable.map((item, index) => (
                    <tr
                      key={index}
                      className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatCurrency(item.maxLoanAmount)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {item.loanTerm} bulan
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatCurrency(item.maxInstallment)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatCurrency(item.minSalary)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">Keterangan:</h3>
              <div className="text-sm text-gray-600 space-y-1">
                <p>
                  <strong>Max pinjaman:</strong> Besar plafon kredit yang
                  diajukan
                </p>
                <p>
                  <strong>Jangka waktu:</strong> Lama pinjaman
                </p>
                <p>
                  <strong>Max. Angsuran:</strong> Maximum angsuran per bulan
                </p>
                <p>
                  <strong>Min. Gaji:</strong> Minimum penghasilan bersih yang
                  disyaratkan oleh bank.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="mt-6 flex gap-4">
          <button
            onClick={handlePrint}
            className="flex items-center justify-center flex-1 bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
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
                d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
              />
            </svg>
            Print
          </button>

          <button
            onClick={handleExportPDF}
            className="flex items-center justify-center flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
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

        <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
          <p className="text-sm text-yellow-800">
            <strong>Perhatian:</strong> Ini adalah simulasi belaka, belum tentu
            benar. Gunakan dengan bijak.
          </p>
        </div>
      </div>
    </div>
  );
}
