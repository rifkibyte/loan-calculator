Tolong refactor code saya gunakan Result seperti refernsi, di referensi ini untuk car loan, kode saya beda konteks
"use client";

import  { useState } from "react";
import { jsPDF } from "jspdf";
import type { MortgageResult as MortgageDetails } from "@/types/mortgage";

interface MortgageResultProps {
  mortgageDetails: MortgageDetails;
}

export default function MortgageCompleteResult({
  mortgageDetails,
}: MortgageResultProps) {
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
    return value.toFixed(1);
  };

  const handlePrint = (): void => {
    window.print();
  };

  const handleExportPDF = (): void => {
    const doc = new jsPDF();

    // Add title
    doc.setFontSize(18);
    doc.text("Simulasi Kredit Rumah", 105, 15, { align: "center" });

    // Add summary
    doc.setFontSize(12);
    doc.text("Ringkasan KPR", 14, 30);

    const summaryInfo = [
      ["Harga Rumah", formatCurrency(mortgageDetails.housePrice)],
      [
        "Uang Muka (DP)",
        `${formatCurrency(mortgageDetails.downPaymentAmount)} (${formatPercent(
          mortgageDetails.downPaymentPercent
        )}%)`,
      ],
      ["Plafon Pinjaman", formatCurrency(mortgageDetails.loanAmount)],
      [
        "Tenor",
        `${mortgageDetails.loanTerm} tahun (${mortgageDetails.loanTermMonths} bulan)`,
      ],
      [
        "Bunga",
        `${formatPercent(mortgageDetails.annualInterestRate)}% / tahun`,
      ],
      ["Angsuran per Bulan", formatCurrency(mortgageDetails.monthlyPayment)],
      ["Total Biaya & Pajak", formatCurrency(mortgageDetails.totalCosts)],
      [
        "Total Pembayaran Pertama",
        formatCurrency(mortgageDetails.firstPayment),
      ],
    ];

    (doc as any).autoTable({
      startY: 35,
      body: summaryInfo,
      theme: "grid",
      styles: { fontSize: 10 },
    });

    doc.save("simulasi-kpr.pdf");
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Tab Navigation */}
      <div className="flex border-b">
        <button
          className={`flex-1 py-3 px-4 text-center font-medium ${
            activeTab === "summary"
              ? "bg-blue-50 text-blue-600 border-b-2 border-blue-600"
              : "text-gray-600 hover:text-gray-800"
          }`}
          onClick={() => setActiveTab("summary")}
        >
          Ringkasan KPR
        </button>
        <button
          className={`flex-1 py-3 px-4 text-center font-medium ${
            activeTab === "details"
              ? "bg-blue-50 text-blue-600 border-b-2 border-blue-600"
              : "text-gray-600 hover:text-gray-800"
          }`}
          onClick={() => setActiveTab("details")}
        >
          Detail Biaya
        </button>
      </div>

      <div className="p-6">
        {/* Tab 1: Ringkasan KPR */}
        {activeTab === "summary" && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Ringkasan KPR Anda
            </h2>

            {/* Data Properti */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-3">
                Data Properti
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Harga Rumah:</span>
                  <span className="font-medium text-gray-900">
                    {formatCurrency(mortgageDetails.housePrice)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Uang Muka (DP):</span>
                  <span className="font-medium text-gray-900">
                    {formatCurrency(mortgageDetails.downPaymentAmount)}
                    <br />
                    <span className="text-sm text-gray-500">
                      ({formatPercent(mortgageDetails.downPaymentPercent)}%)
                    </span>
                  </span>
                </div>
                <div className="flex justify-between border-t pt-2">
                  <span className="text-gray-600 font-medium">
                    Plafon Pinjaman:
                  </span>
                  <span className="font-semibold text-gray-900">
                    {formatCurrency(mortgageDetails.loanAmount)}
                  </span>
                </div>
              </div>
            </div>

            {/* Data KPR - Moved below Data Properti */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-3">Data KPR</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Tenor:</span>
                  <span className="font-medium text-gray-900">
                    {mortgageDetails.loanTerm} tahun
                    <br />
                    <span className="text-sm text-gray-500">
                      ({mortgageDetails.loanTermMonths} bulan)
                    </span>
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Bunga:</span>
                  <span className="font-medium text-gray-900">
                    {formatPercent(mortgageDetails.annualInterestRate)}% / tahun
                    <br />
                    <span className="text-sm text-gray-500">
                      ({formatPercent(mortgageDetails.monthlyInterestRate)}% /
                      bulan)
                    </span>
                  </span>
                </div>
                <div className="flex justify-between border-t pt-2">
                  <span className="text-gray-600 font-medium">
                    Angsuran per Bulan:
                  </span>
                  <span className="font-semibold text-gray-900">
                    {formatCurrency(mortgageDetails.monthlyPayment)}
                  </span>
                </div>
              </div>
            </div>

            {/* Pembayaran Pertama */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-3">
                Pembayaran Pertama Kali
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Uang Muka:</span>
                  <span className="font-medium text-gray-900">
                    {formatCurrency(mortgageDetails.downPaymentAmount)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Biaya & Pajak:</span>
                  <span className="font-medium text-gray-900">
                    {formatCurrency(mortgageDetails.totalCosts)}
                  </span>
                </div>
                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between">
                    <span className="font-semibold text-gray-900">
                      Total Pembayaran Pertama:
                    </span>
                    <span className="font-bold text-gray-900 text-lg">
                      {formatCurrency(mortgageDetails.firstPayment)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Informasi Tambahan */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">
                Informasi Penting:
              </h3>
              <div className="text-sm text-gray-600 space-y-1">
                <p>
                  • Perhitungan menggunakan metode bunga{" "}
                  {mortgageDetails.calculationMethod}
                </p>
                <p>• Angsuran bulanan sudah termasuk bunga dan pokok</p>
                <p>
                  • Total pembayaran selama {mortgageDetails.loanTerm} tahun:{" "}
                  <span className="font-medium text-gray-900">
                    {formatCurrency(mortgageDetails.totalPayment)}
                  </span>
                </p>
                <p>
                  • Total bunga yang dibayar:{" "}
                  <span className="font-medium text-gray-900">
                    {formatCurrency(mortgageDetails.totalInterest)}
                  </span>
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Detail Biaya */}
        {activeTab === "details" && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Detail Biaya & Pajak
            </h2>

            {/* Biaya Bank */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-3">Biaya Bank</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="text-gray-600">
                    Biaya Provisi
                    <br />
                    <span className="text-sm">
                      ({formatPercent(mortgageDetails.provisionPercent)}% dari
                      plafon)
                    </span>
                  </span>
                  <span className="font-medium text-gray-900">
                    {formatCurrency(mortgageDetails.provisionAmount)}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="text-gray-600">Biaya Appraisal</span>
                  <span className="font-medium text-gray-900">
                    {formatCurrency(mortgageDetails.appraisalFee)}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600">Biaya Administrasi</span>
                  <span className="font-medium text-gray-900">
                    {formatCurrency(mortgageDetails.adminFee)}
                  </span>
                </div>
              </div>
            </div>

            {/* Biaya Lain */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-3">
                Biaya Lainnya
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="text-gray-600">Biaya Notaris</span>
                  <span className="font-medium text-gray-900">
                    {formatCurrency(mortgageDetails.notaryFee)}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600">Biaya Asuransi</span>
                  <span className="font-medium text-gray-900">
                    {formatCurrency(mortgageDetails.insuranceFee)}
                  </span>
                </div>
              </div>
            </div>

            {/* Pajak */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-3">Pajak</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600">
                    Pajak Pembeli / BPHTB
                    <br />
                    <span className="text-sm">
                      5% × ({formatCurrency(mortgageDetails.housePrice)} -{" "}
                      {formatCurrency(mortgageDetails.njoptkp)})
                    </span>
                  </span>
                  <span className="font-medium text-gray-900">
                    {formatCurrency(mortgageDetails.bphtbTax)}
                  </span>
                </div>
              </div>
            </div>

            {/* Total */}
            <div className="bg-gray-800 text-white p-4 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="font-bold text-lg">Total Biaya & Pajak:</span>
                <span className="font-bold text-xl">
                  {formatCurrency(mortgageDetails.totalCosts)}
                </span>
              </div>
            </div>

            {/* Breakdown Detail */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">
                Catatan NJOPTKP/NPTKP:
              </h3>
              <div className="text-sm text-gray-600 space-y-1">
                <p>
                  • NJOPTKP/NPTKP yang digunakan:{" "}
                  <span className="font-medium text-gray-900">
                    {formatCurrency(mortgageDetails.njoptkp)}
                  </span>
                </p>
                <p>
                  • Nilai ini berbeda-beda tiap daerah dan dapat berubah
                  sewaktu-waktu
                </p>
                <p>
                  • Contoh: DKI Jakarta Rp 60 juta, Bekasi & Tangerang Rp 30
                  juta, Depok Rp 20 juta
                </p>
                <p>
                  • Pastikan menggunakan nilai NJOPTKP terbaru sesuai lokasi
                  properti
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





Referensi

// file: app/kalkulator/kredit-mobil-budget/result/page.tsx (Setelah di-refactor)

"use client";

import { jsPDF } from "jspdf";
import "jspdf-autotable";
import {
  LoanResultShell,
  LoanInfoGrid,
  PaymentBreakdown,
} from "@/components/ui/result"; // Impor komponen baru
// Impor komponen baru yang bisa disusun
import { formatCurrencyDisplay, formatPercent } from "@/utils/formatters";
import { CarLoanBudgetResult as LoanDetailsType } from "@/types/car-loan";

interface CarLoanBudgetResultProps {
  loanDetails: LoanDetailsType;
}

export default function CarLoanBudgetResult({
  loanDetails,
}: CarLoanBudgetResultProps) {
  const handleExportPDF = () => {
    // Fungsi export PDF tidak perlu diubah
    const doc = new jsPDF();
    doc.text("Simulasi Kredit Mobil (Berdasarkan Budget)", 14, 20);
    (doc as any).autoTable({
      startY: 30,
      head: [["Keterangan", "Nilai"]],
      body: [
        ["Harga Mobil OTR", formatCurrencyDisplay(loanDetails.carPrice)],
        [
          "Uang Muka (DP)",
          `${formatCurrencyDisplay(
            loanDetails.downPaymentAmount
          )} (${formatPercent(loanDetails.downPaymentPercent)})`,
        ],
        ["Tenor Pinjaman", `${loanDetails.loanTerm} tahun`],
        ["Plafon Pinjaman", formatCurrencyDisplay(loanDetails.loanAmount)],
        [
          "Angsuran per Bulan",
          formatCurrencyDisplay(loanDetails.monthlyPayment),
        ],
        ["Total Pembayaran", formatCurrencyDisplay(loanDetails.totalPayment)],
        ["Pembayaran Pertama", formatCurrencyDisplay(loanDetails.firstPayment)],
      ],
      theme: "grid",
      headStyles: { fillColor: [66, 133, 244] },
    });
    doc.save("simulasi-kredit-mobil-budget.pdf");
  };

  // --- Bagian 1: Menyusun Konten untuk Tab "Informasi Pinjaman" ---
  const infoTabContent = (
    <div className="space-y-6">
      <LoanInfoGrid
        title="Hasil Perhitungan Budget Anda"
        items={[
          {
            label: "Harga Mobil OTR",
            value: formatCurrencyDisplay(loanDetails.carPrice),
          },
          {
            label: "Uang Muka (DP)",
            value: (
              <>
                {formatCurrencyDisplay(loanDetails.downPaymentAmount)}
                <span className="text-sm font-normal text-gray-500 ml-1">
                  ({formatPercent(loanDetails.downPaymentPercent)})
                </span>
              </>
            ),
          },
          {
            label: "Tenor Pinjaman",
            value: `${loanDetails.loanTerm} tahun`,
          },
        ]}
      />
      <PaymentBreakdown
        title="Plafon Pinjaman Anda"
        variant="blue"
        rows={[
          { label: "Harga Mobil OTR:", value: loanDetails.carPrice },
          { label: "Uang Muka (DP):", value: loanDetails.downPaymentAmount },
          {
            label: "Plafon Pinjaman:",
            value: loanDetails.loanAmount,
            isTotal: true,
          },
        ]}
      />
    </div>
  );

  // --- Bagian 2: Menyusun Konten untuk Tab "Rincian Pembayaran" ---
  const paymentTabContent = (
    <div className="space-y-6">
      <PaymentBreakdown
        title="Angsuran per Bulan"
        variant="green"
        rows={[
          {
            label: "Total Angsuran per Bulan:",
            value: loanDetails.monthlyPayment,
            isTotal: true,
          },
        ]}
      />
      <PaymentBreakdown
        title="Pembayaran Pertama Kali"
        variant="purple"
        rows={[
          { label: "Uang Muka (DP):", value: loanDetails.downPaymentAmount },
          { label: "Angsuran Pertama:", value: loanDetails.monthlyPayment },
          {
            label: "Total Pembayaran Pertama:",
            value: loanDetails.firstPayment,
            isTotal: true,
          },
        ]}
      />
      <PaymentBreakdown
        title="Total Pembayaran Keseluruhan"
        variant="indigo"
        rows={[
          { label: "Total Pokok Pinjaman:", value: loanDetails.loanAmount },
          {
            label: "Total Bunga:",
            value: loanDetails.totalPayment - loanDetails.loanAmount,
          },
          {
            label: "Total Keseluruhan:",
            value: loanDetails.totalPayment,
            isTotal: true,
          },
        ]}
      />
    </div>
  );

  // --- Bagian 3: Merakit semuanya ke dalam "Cangkang" ---
  return (
    <LoanResultShell
      onExport={handleExportPDF}
      infoTabContent={infoTabContent}
      paymentTabContent={paymentTabContent}
    />
  );
}
----

// file: utils/formatters.ts

/**
 * Parses a locale-specific numeric string (ID-ID) into a number.
 * Handles thousand separators (.) and decimal separators (,).
 * @param value The string to parse.
 * @returns A valid number or NaN if parsing is not possible.
 */
export function parseLocaleNumber(value: string): number {
  const cleanValue = String(value).replace(/\./g, "").replace(",", ".");
  return parseFloat(cleanValue);
}

/**
 * Helper internal untuk memvalidasi nilai dan memberikan nilai fallback.
 * @param value Nilai yang bisa berupa angka atau string.
 * @param fallback Nilai default jika parsing gagal (default: 0).
 * @returns Angka yang valid atau nilai fallback.
 */
export function getValidNumber(value: number | string, fallback = 0): number {
  const num = typeof value === "string" ? parseLocaleNumber(value) : value;
  return isNaN(num) || !isFinite(num) ? fallback : num;
}

// --- FUNGSI-FUNGSI YANG DIEKSPOR ---

/**
 * Memformat angka atau string angka menjadi string dengan pemisah ribuan.
 * Contoh: 1000000 -> "1.000.000"
 */
export function formatCurrency(amount: number | string): string {
  const numAmount = getValidNumber(amount);
  // Selalu format tanpa desimal untuk input
  return new Intl.NumberFormat("id-ID").format(numAmount);
}

/**
 * Memformat angka menjadi string mata uang lengkap dengan simbol "Rp" dan tanpa desimal.
 * Contoh: 1000000 -> "Rp 1.000.000"
 */
export function formatCurrencyDisplay(amount: number | string): string {
  const numAmount = getValidNumber(amount);
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(numAmount);
}

// --- FUNGSI BARU DITAMBAHKAN ---
/**
 * Memformat angka menjadi string desimal dengan jumlah digit di belakang koma yang ditentukan.
 * Menggunakan locale Indonesia (koma sebagai pemisah desimal).
 * Contoh: (123.456, 2) -> "123,46"
 * @param value Angka yang akan diformat.
 * @param decimalPlaces Jumlah digit di belakang koma (default: 2).
 */
export function formatDecimal(
  value: number | string,
  decimalPlaces = 2
): string {
  const numValue = getValidNumber(value);
  return new Intl.NumberFormat("id-ID", {
    minimumFractionDigits: decimalPlaces,
    maximumFractionDigits: decimalPlaces,
  }).format(numValue);
}

/**
 * Memformat angka menjadi persentase.
 * Contoh: 4.6 -> "4,6%"
 */
export function formatPercent(
  value: number | string,
  options?: { minimumFractionDigits?: number; maximumFractionDigits?: number }
): string {
  const numValue = getValidNumber(value, 0);

  const minDigits = options?.minimumFractionDigits ?? 1;
  const maxDigits = options?.maximumFractionDigits ?? Math.max(minDigits, 2);

  return new Intl.NumberFormat("id-ID", {
    style: "percent",
    minimumFractionDigits: minDigits,
    maximumFractionDigits: maxDigits,
  }).format(numValue / 100);
}

/**
 * Memformat tanggal ke format lokal Indonesia ("17 Juli 2025").
 */
export function formatDate(date: Date): string {
  if (!(date instanceof Date) || isNaN(date.getTime())) {
    return "Tanggal tidak valid";
  }
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

/**
 * Mengubah string input (termasuk yang diformat) kembali menjadi string angka mentah.
 * Contoh: "Rp 1.000.000" -> "1000000"
 * @param value - String yang akan di-parse.
 * @returns String yang hanya berisi angka.
 */
export function parseToNumericString(value: string): string {
  // Hanya simpan angka dari string
  return String(value).replace(/[^\d]/g, "");
}

----
~/workspace/side-hustle/loan-calculator/src/components/ui/result on  main! ⌚ 10:24:17
$ cat ExportButton.tsx     PaymentBreakdown.tsx ResultRow.tsx        index.ts LoanInfoGrid.tsx     ResultCard.tsx       ResultSection.tsx LoanResultShell.tsx  ResultGrid.tsx       ResultTabs.tsx
import { FC } from "react";

interface ExportButtonProps {
  onClick: () => void;
}

export const ExportButton: FC<ExportButtonProps> = ({ onClick }) => (
  <div className="mt-6 px-6 pb-6">
    <button
      onClick={onClick}
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
);
// file: components/ui/loan/PaymentBreakdown.tsx

import { FC } from "react";
import { ResultSection, ResultRow } from "@/components/ui/result";
import { formatCurrencyDisplay } from "@/utils/formatters";

// Tipe data untuk setiap baris dalam rincian
export interface BreakdownRow {
  label: string;
  value: number;
  isTotal?: boolean;
}

interface PaymentBreakdownProps {
  title: string;
  rows: BreakdownRow[];
  variant?: "green" | "purple" | "indigo" | "blue" | "gray";
}

export const PaymentBreakdown: FC<PaymentBreakdownProps> = ({
  title,
  rows,
  variant = "gray",
}) => {
  if (rows.length === 0) {
    return null;
  }

  return (
    <ResultSection title={title} variant={variant}>
      {rows.map((row) => (
        <ResultRow
          key={row.label}
          label={row.label}
          value={formatCurrencyDisplay(row.value)}
          isTotal={row.isTotal}
        />
      ))}
    </ResultSection>
  );
};
import { FC, ReactNode } from "react";

interface ResultRowProps {
  label: ReactNode;
  value: ReactNode;
  isTotal?: boolean;
  info?: string;
}

export const ResultRow: FC<ResultRowProps> = ({ label, value, isTotal = false, info }) => {
  const totalClasses = isTotal ? "font-bold" : "font-medium";
  const labelClasses = isTotal ? "font-medium" : "";

  return (
    <div>
        <div className={`flex justify-between items-center ${isTotal ? "border-t pt-2 mt-2" : ""}`}>
            <span className={labelClasses}>{label}</span>
            <span className={totalClasses}>{value}</span>
        </div>
        {info && <p className="text-xs text-gray-500 text-left mt-0.5">{info}</p>}
    </div>
  );
};
export * from "./ResultCard";
export * from "./ResultTabs";
export * from "./ResultSection";
export * from "./ResultRow";
export * from "./ResultGrid";
export * from "./ExportButton";
export * from "./LoanInfoGrid";
export * from "./LoanResultShell";
export * from "./PaymentBreakdown";
// file: components/ui/loan/LoanInfoGrid.tsx

import { FC, ReactNode } from "react";
import { ResultGrid } from "@/components/ui/result";

export interface InfoGridItem {
  label: string;
  value: ReactNode; // value bisa berupa string atau JSX
}

interface LoanInfoGridProps {
  title: string;
  items: InfoGridItem[];
}

export const LoanInfoGrid: FC<LoanInfoGridProps> = ({ title, items }) => {
  if (items.length === 0) {
    return null;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
      <ResultGrid items={items} />
    </div>
  );
};
import { FC, ReactNode } from "react";

interface ResultCardProps {
  children: ReactNode;
}

export const ResultCard: FC<ResultCardProps> = ({ children }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {children}
    </div>
  );
};
import { FC, ReactNode } from "react";

const variants = {
  blue: "bg-blue-50 border-blue-200 text-blue-800",
  green: "bg-green-50 border-green-200 text-green-800",
  purple: "bg-purple-50 border-purple-200 text-purple-800",
  indigo: "bg-indigo-50 border-indigo-200 text-indigo-800",
  gray: "bg-gray-50 border-gray-200 text-gray-800",
};

interface ResultSectionProps {
  title: string;
  children: ReactNode;
  variant?: keyof typeof variants;
}

export const ResultSection: FC<ResultSectionProps> = ({
  title,
  children,
  variant = "gray",
}) => {
  return (
    <div className={`p-4 rounded-lg border ${variants[variant]}`}>
      <h3 className="font-semibold text-gray-900 mb-3">{title}</h3>
      <div className="space-y-2">{children}</div>
    </div>
  );
};
// file: components/ui/loan/LoanResultShell.tsx

"use client";

import { FC, ReactNode } from "react";
import {
  ResultCard,
  ResultTabs,
  ExportButton,
} from "@/components/ui/result";

interface LoanResultShellProps {
  onExport: () => void;
  infoTabContent: ReactNode;
  paymentTabContent: ReactNode;
}

export const LoanResultShell: FC<LoanResultShellProps> = ({
  onExport,
  infoTabContent,
  paymentTabContent,
}) => {
  const tabs = [
    { id: "info", label: "Informasi Pinjaman", content: infoTabContent },
    { id: "payment", label: "Rincian Pembayaran", content: paymentTabContent },
  ];

  return (
    <ResultCard>
      <ResultTabs tabs={tabs} />
      <ExportButton onClick={onExport} />
    </ResultCard>
  );
};
import { FC, ReactNode } from "react";

interface GridItem {
    label: string;
    value: ReactNode;
}

interface ResultGridProps {
  items: GridItem[];
}

export const ResultGrid: FC<ResultGridProps> = ({ items }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {items.map((item, index) => (
        <div key={index}>
          <p className="text-sm text-gray-600">{item.label}:</p>
          <p className="text-lg font-bold text-gray-900">{item.value}</p>
        </div>
      ))}
    </div>
  );
};
import { FC, useState, ReactNode } from "react";

interface Tab {
  id: string;
  label: string;
  content: ReactNode;
}

interface ResultTabsProps {
  tabs: Tab[];
}

export const ResultTabs: FC<ResultTabsProps> = ({ tabs }) => {
  const [activeTabId, setActiveTabId] = useState(tabs[0]?.id);

  return (
    <div>
      <div className="flex border-b">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`flex-1 py-3 px-4 text-center font-medium transition-colors ${
              activeTabId === tab.id
                ? "bg-blue-50 text-blue-600 border-b-2 border-blue-600"
                : "text-gray-600 hover:bg-gray-50"
            }`}
            onClick={() => setActiveTabId(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="p-6">
        {tabs.map((tab) => (
          <div key={tab.id} className={activeTabId === tab.id ? "block" : "hidden"}>
            {tab.content}
          </div>
        ))}
      </div>
    </div>
  );
};

~/workspace/side-hustle/loan-calculator/src/components/ui/result on  main! ⌚ 10:24:38
$ clear

~/workspace/side-hustle/loan-calculator/src/components/ui/result on  main! ⌚ 10:24:47
$ cat ExportButton.tsx     PaymentBreakdown.tsx ResultRow.tsx        index.ts LoanInfoGrid.tsx     ResultCard.tsx       ResultSection.tsx LoanResultShell.tsx  ResultGrid.tsx       ResultTabs.tsx
import { FC } from "react";

interface ExportButtonProps {
  onClick: () => void;
}

export const ExportButton: FC<ExportButtonProps> = ({ onClick }) => (
  <div className="mt-6 px-6 pb-6">
    <button
      onClick={onClick}
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
);
// file: components/ui/loan/PaymentBreakdown.tsx

import { FC } from "react";
import { ResultSection, ResultRow } from "@/components/ui/result";
import { formatCurrencyDisplay } from "@/utils/formatters";

// Tipe data untuk setiap baris dalam rincian
export interface BreakdownRow {
  label: string;
  value: number;
  isTotal?: boolean;
}

interface PaymentBreakdownProps {
  title: string;
  rows: BreakdownRow[];
  variant?: "green" | "purple" | "indigo" | "blue" | "gray";
}

export const PaymentBreakdown: FC<PaymentBreakdownProps> = ({
  title,
  rows,
  variant = "gray",
}) => {
  if (rows.length === 0) {
    return null;
  }

  return (
    <ResultSection title={title} variant={variant}>
      {rows.map((row) => (
        <ResultRow
          key={row.label}
          label={row.label}
          value={formatCurrencyDisplay(row.value)}
          isTotal={row.isTotal}
        />
      ))}
    </ResultSection>
  );
};
import { FC, ReactNode } from "react";

interface ResultRowProps {
  label: ReactNode;
  value: ReactNode;
  isTotal?: boolean;
  info?: string;
}

export const ResultRow: FC<ResultRowProps> = ({ label, value, isTotal = false, info }) => {
  const totalClasses = isTotal ? "font-bold" : "font-medium";
  const labelClasses = isTotal ? "font-medium" : "";

  return (
    <div>
        <div className={`flex justify-between items-center ${isTotal ? "border-t pt-2 mt-2" : ""}`}>
            <span className={labelClasses}>{label}</span>
            <span className={totalClasses}>{value}</span>
        </div>
        {info && <p className="text-xs text-gray-500 text-left mt-0.5">{info}</p>}
    </div>
  );
};
export * from "./ResultCard";
export * from "./ResultTabs";
export * from "./ResultSection";
export * from "./ResultRow";
export * from "./ResultGrid";
export * from "./ExportButton";
export * from "./LoanInfoGrid";
export * from "./LoanResultShell";
export * from "./PaymentBreakdown";
// file: components/ui/loan/LoanInfoGrid.tsx

import { FC, ReactNode } from "react";
import { ResultGrid } from "@/components/ui/result";

export interface InfoGridItem {
  label: string;
  value: ReactNode; // value bisa berupa string atau JSX
}

interface LoanInfoGridProps {
  title: string;
  items: InfoGridItem[];
}

export const LoanInfoGrid: FC<LoanInfoGridProps> = ({ title, items }) => {
  if (items.length === 0) {
    return null;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
      <ResultGrid items={items} />
    </div>
  );
};
import { FC, ReactNode } from "react";

interface ResultCardProps {
  children: ReactNode;
}

export const ResultCard: FC<ResultCardProps> = ({ children }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {children}
    </div>
  );
};
import { FC, ReactNode } from "react";

const variants = {
  blue: "bg-blue-50 border-blue-200 text-blue-800",
  green: "bg-green-50 border-green-200 text-green-800",
  purple: "bg-purple-50 border-purple-200 text-purple-800",
  indigo: "bg-indigo-50 border-indigo-200 text-indigo-800",
  gray: "bg-gray-50 border-gray-200 text-gray-800",
};

interface ResultSectionProps {
  title: string;
  children: ReactNode;
  variant?: keyof typeof variants;
}

export const ResultSection: FC<ResultSectionProps> = ({
  title,
  children,
  variant = "gray",
}) => {
  return (
    <div className={`p-4 rounded-lg border ${variants[variant]}`}>
      <h3 className="font-semibold text-gray-900 mb-3">{title}</h3>
      <div className="space-y-2">{children}</div>
    </div>
  );
};
// file: components/ui/loan/LoanResultShell.tsx

"use client";

import { FC, ReactNode } from "react";
import {
  ResultCard,
  ResultTabs,
  ExportButton,
} from "@/components/ui/result";

interface LoanResultShellProps {
  onExport: () => void;
  infoTabContent: ReactNode;
  paymentTabContent: ReactNode;
}

export const LoanResultShell: FC<LoanResultShellProps> = ({
  onExport,
  infoTabContent,
  paymentTabContent,
}) => {
  const tabs = [
    { id: "info", label: "Informasi Pinjaman", content: infoTabContent },
    { id: "payment", label: "Rincian Pembayaran", content: paymentTabContent },
  ];

  return (
    <ResultCard>
      <ResultTabs tabs={tabs} />
      <ExportButton onClick={onExport} />
    </ResultCard>
  );
};
import { FC, ReactNode } from "react";

interface GridItem {
    label: string;
    value: ReactNode;
}

interface ResultGridProps {
  items: GridItem[];
}

export const ResultGrid: FC<ResultGridProps> = ({ items }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {items.map((item, index) => (
        <div key={index}>
          <p className="text-sm text-gray-600">{item.label}:</p>
          <p className="text-lg font-bold text-gray-900">{item.value}</p>
        </div>
      ))}
    </div>
  );
};
import { FC, useState, ReactNode } from "react";

interface Tab {
  id: string;
  label: string;
  content: ReactNode;
}

interface ResultTabsProps {
  tabs: Tab[];
}

export const ResultTabs: FC<ResultTabsProps> = ({ tabs }) => {
  const [activeTabId, setActiveTabId] = useState(tabs[0]?.id);

  return (
    <div>
      <div className="flex border-b">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`flex-1 py-3 px-4 text-center font-medium transition-colors ${
              activeTabId === tab.id
                ? "bg-blue-50 text-blue-600 border-b-2 border-blue-600"
                : "text-gray-600 hover:bg-gray-50"
            }`}
            onClick={() => setActiveTabId(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="p-6">
        {tabs.map((tab) => (
          <div key={tab.id} className={activeTabId === tab.id ? "block" : "hidden"}>
            {tab.content}
          </div>
        ))}
      </div>
    </div>
  );
};
