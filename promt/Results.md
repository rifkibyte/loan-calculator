Tolong refactor code saya gunakan Result seperti refernsi, di referensi ini untuk car loan, kode saya beda konteks
Tolong perharikan juga bagian formatternya jangan sampai salah

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
}: PersonalLoanResultProps) {
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
