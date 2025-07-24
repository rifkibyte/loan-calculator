"use client";

import { jsPDF } from "jspdf";
import "jspdf-autotable";
import {
  ResultCard,
  ResultTabs,
  ResultSection,
  ResultRow,
} from "@/components/ui/result";
import { formatCurrencyDisplay, formatPercent } from "@/utils/formatters";
import type { LoanAmountTableItem } from "@/types/personal-loan-amount"; // Asumsi path tipe data

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
  // Fungsi untuk mencetak halaman
  const handlePrint = (): void => {
    window.print();
  };

  // Fungsi untuk ekspor PDF, disesuaikan dengan data dan formatters baru
  const handleExportPDF = (): void => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Simulasi Kelayakan Pinjaman Personal", 105, 15, {
      align: "center",
    });

    // Menggunakan autoTable untuk data ringkasan
    (doc as any).autoTable({
      startY: 25,
      head: [["Keterangan", "Nilai"]],
      body: [
        ["Besar Pinjaman", formatCurrencyDisplay(resultData.loanAmount)],
        [
          "Rasio Angsuran (dari gaji bersih)",
          formatPercent(resultData.creditRatio),
        ],
        [
          "Bunga per Bulan",
          formatPercent(resultData.monthlyInterestRate, {
            minimumFractionDigits: 2,
          }),
        ],
        [
          "Bunga per Tahun",
          formatPercent(resultData.annualInterestRate, {
            minimumFractionDigits: 2,
          }),
        ],
        ["Metode Perhitungan Bunga", resultData.calculationMethod],
      ],
      theme: "grid",
      headStyles: { fillColor: [66, 133, 244] },
    });

    doc.text(
      "Tabel Batas Wajar Pinjaman",
      14,
      (doc as any).lastAutoTable.finalY + 15
    );

    // Data untuk tabel kelayakan
    const tableData = resultData.loanTable.map((item) => [
      formatCurrencyDisplay(item.maxLoanAmount),
      `${item.loanTerm} bulan`,
      formatCurrencyDisplay(item.maxInstallment),
      formatCurrencyDisplay(item.minSalary),
    ]);

    (doc as any).autoTable({
      startY: (doc as any).lastAutoTable.finalY + 20,
      head: [["Max. Pinjaman", "Jangka Waktu", "Max. Angsuran", "Min. Gaji"]],
      body: tableData,
      theme: "grid",
      headStyles: { fillColor: [66, 133, 244] },
    });

    doc.save("simulasi-kelayakan-pinjaman.pdf");
  };

  // --- Konten untuk Tab 1: Ringkasan Data ---
  const summaryTabContent = (
    <div className="space-y-6">
      <ResultSection title="Data Anda" variant="blue">
        <ResultRow
          label="Besar Pinjaman"
          value={formatCurrencyDisplay(resultData.loanAmount)}
        />
        <ResultRow
          label="Baki Kredit"
          value={formatPercent(resultData.creditRatio)}
          info="Max. angsuran per bulan dari gaji bersih"
        />
        <ResultRow
          label="Bunga KTA"
          value={
            <div className="text-right">
              {formatPercent(resultData.monthlyInterestRate, {
                minimumFractionDigits: 2,
              })}{" "}
              / bulan
              <span className="block text-sm font-normal text-gray-500">
                (
                {formatPercent(resultData.annualInterestRate, {
                  minimumFractionDigits: 2,
                })}{" "}
                / tahun)
              </span>
            </div>
          }
        />
        <ResultRow
          label="Perhitungan Bunga"
          value={resultData.calculationMethod}
        />
      </ResultSection>
    </div>
  );

  // --- Konten untuk Tab 2: Tabel Kelayakan ---
  const tableTabContent = (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">
        Tabel Batas Wajar Pinjaman
      </h2>
      <div className="overflow-x-auto border rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {[
                "Max. Pinjaman",
                "Jangka Waktu",
                "Max. Angsuran",
                "Min. Gaji",
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
            {resultData.loanTable.map((item, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {formatCurrencyDisplay(item.maxLoanAmount)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.loanTerm} bulan
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatCurrencyDisplay(item.maxInstallment)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatCurrencyDisplay(item.minSalary)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ResultSection title="Keterangan" variant="gray">
        <p className="text-sm">
          <strong>Max pinjaman:</strong> Besar plafon kredit yang diajukan.
        </p>
        <p className="text-sm">
          <strong>Jangka waktu:</strong> Lama pinjaman dalam bulan.
        </p>
        <p className="text-sm">
          <strong>Max. Angsuran:</strong> Angsuran maksimum per bulan.
        </p>
        <p className="text-sm">
          <strong>Min. Gaji:</strong> Minimum penghasilan bersih yang
          disyaratkan.
        </p>
      </ResultSection>
    </div>
  );

  // --- Merakit semua komponen UI ---
  return (
    <ResultCard>
      <ResultTabs
        tabs={[
          { id: "summary", label: "Data Anda", content: summaryTabContent },
          {
            id: "table",
            label: "Tabel Batas Wajar Pinjaman",
            content: tableTabContent,
          },
        ]}
      />
      {/* Tombol Aksi Kustom */}
      <div className="mt-6 px-6 pb-6 flex flex-col sm:flex-row gap-4">
        <button
          onClick={handlePrint}
          className="flex items-center justify-center flex-1 bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 transition-colors"
        >
          {/* Print Icon */}
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
          className="flex items-center justify-center flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
        >
          {/* Export Icon */}
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
    </ResultCard>
  );
}
