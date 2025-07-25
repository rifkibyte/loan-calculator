Tolong refactor code saya gunakan Result seperti refernsi, pada kode saya masih ada yang salah karena tidak menggunakan tab, saya juga tulis  component component nya
// /features/personal-loan/budget/PersonalLoanResult.tsx

import { formatCurrencyDisplay, formatPercent } from "@/utils/formatters"; // Asumsi path formatter Anda
import { CalculationResult } from "@/utils/calculators/personal-loan/personalLoanIncomeCalculator"; // Import tipe baru

interface PersonalLoanResultProps {
  result: CalculationResult;
}

// Komponen kecil untuk baris data
const DataRow = ({ label, value, subValue }: { label: string; value: string | number; subValue?: string }) => (
  <div className="flex justify-between items-start py-2 border-b border-gray-200">
    <span className="text-sm text-gray-600">{label}</span>
    <div className="text-right">
      <span className="text-sm font-semibold text-gray-800">{value}</span>
      {subValue && <span className="block text-xs text-gray-500">{subValue}</span>}
    </div>
  </div>
);

export default function PersonalLoanResult({ result }: PersonalLoanResultProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Kolom Kiri: Data Anda */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3 border-b pb-2">Data Anda</h3>
          <div className="space-y-2">
            <DataRow
              label="Penghasilan Bersih (per bulan)"
              value={formatCurrencyDisplay(result.netIncome)}
            />
            <DataRow
              label="Baki Kredit (max. angsuran)"
              value={formatCurrencyDisplay(result.debtRatioAmount)}
              subValue={`(${formatPercent(result.debtRatioPercent)})`}
            />
            <DataRow
              label="Total Angsuran Pinjaman Lain"
              value={formatCurrencyDisplay(result.otherLoanPayment)}
            />
            <DataRow
              label="Bunga KTA"
              value={`${formatPercent(result.monthlyInterestRate, { minimumFractionDigits: 2 })} / bulan`}
              subValue={`(${(result.monthlyInterestRate * 12).toFixed(2)} % / tahun)`}
            />
             <DataRow
              label="Perhitungan Bunga"
              value="FLAT"
            />
          </div>
        </div>

        {/* Kolom Kanan: Angsuran per Bulan */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3 border-b pb-2">Angsuran per Bulan</h3>
          <div className="space-y-2">
             <div className="flex justify-between py-2">
                <span className="text-sm text-gray-600">Baki Kredit:</span>
                <span className="text-sm font-semibold text-gray-800">{formatCurrencyDisplay(result.debtRatioAmount)}</span>
            </div>
             <div className="flex justify-between py-2 border-b-2 border-gray-300">
                <span className="text-sm text-gray-600">Angsuran Lain per Bulan:</span>
                <span className="text-sm font-semibold text-gray-800">{formatCurrencyDisplay(result.otherLoanPayment)}</span>
            </div>
            <div className="flex justify-between py-2 mt-2">
                <span className="text-sm font-bold text-blue-600">Max. Angsuran KTA per Bulan:</span>
                <span className="text-sm font-bold text-blue-600">{formatCurrencyDisplay(result.maxKtaPayment)}</span>
            </div>
          </div>
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
