Tolong refactor code saya gunakan Result seperti refernsi, di referensi ini untuk car loan, kode saya beda konteks
code saya:
"use client";

import { FC, useMemo, ReactNode } from "react";
import {
  ResultCard,
  ResultTabs,
  ResultSection,
  ResultRow,
  ResultGrid,
  ExportButton,
} from "@/components/ui/result";
import { formatCurrency, formatPercent } from "@/utils/formatters";

// --- Tipe Data ---
interface LoanResultData {
  mainAssetPrice?: number;
  downPaymentPercent?: number;
  downPaymentAmount?: number;
  loanTerm?: number;
  interestRate?: number;
  loanAmount: number;
  monthlyPrincipal: number;
  monthlyInterest: number;
  monthlyPayment: number;
  totalInterest: number;
  totalPayment: number;
  firstPayment: number;
  insurancePercent?: number;
  insuranceAmount?: number;
  provisionPercent?: number;
  provisionAmount?: number;
  policyFee?: number;
  adminFee?: number;
}

// --- Tipe Konfigurasi ---
interface LoanResultConfig {
  onExport: () => void;
  showOtherFees?: boolean;
  showTotalPaymentSimple?: boolean;
  labels?: {
    mainAssetLabel?: string;
    downPaymentLabel?: string;
    loanPrincipalLabel?: string;
  };
  showPrincipalCalculation?: boolean;
  showDownPayment?: boolean;
}

interface LoanResultDisplayProps {
  data: LoanResultData;
  config: LoanResultConfig;
}

// --- Komponen Utama ---
export const LoanResultDisplay: FC<LoanResultDisplayProps> = ({
  data,
  config,
}) => {
  const {
    onExport,
    showOtherFees = false,
    showTotalPaymentSimple = false,
    labels = {
      mainAssetLabel: "Harga Aset",
      downPaymentLabel: "Uang Muka",
      loanPrincipalLabel: "Pokok Pinjaman",
    },
    showPrincipalCalculation = false,
    showDownPayment = false,
  } = config;

  const infoGridItems = useMemo(() => {
    const items: { label: string; value: ReactNode }[] = [];

    if (data.mainAssetPrice) {
      items.push({
        label: labels.mainAssetLabel!,
        value: formatCurrency(data.mainAssetPrice),
      });
    }

    if (showDownPayment && data.downPaymentAmount) {
      items.push({
        label: labels.downPaymentLabel!,
        value: (
          <>
            {formatCurrency(data.downPaymentAmount)}
            <span className="text-sm font-normal text-gray-500 ml-1">
              ({formatPercent(data.downPaymentPercent ?? 0)})
            </span>
          </>
        ),
      });
    }

    items.push(
      {
        label: "Tenor",
        value: (
          <>
            {data.loanTerm} tahun
            <span className="text-sm font-normal text-gray-500 ml-1">
              ({(data.loanTerm ?? 0) * 12} bulan)
            </span>
          </>
        ),
      },
      {
        label: "Bunga (Flat)",
        value: (
          <>
            {/* --- PERBAIKAN 1 --- */}
            {formatPercent(data.interestRate ?? 0, { minimumFractionDigits: 1 })} / tahun
            <span className="text-sm font-normal text-gray-500 ml-1">
              {/* --- PERBAIKAN 2 --- */}
              ({formatPercent((data.interestRate ?? 0) / 12, { minimumFractionDigits: 3 })} / bulan)
            </span>
          </>
        ),
      }
    );

    return items;
  }, [data, labels, showDownPayment]);

  const infoTabContent = (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">
        Informasi Pinjaman Anda
      </h2>
      <ResultGrid items={infoGridItems} />

      {showPrincipalCalculation && (
        // --- PERBAIKAN 3 ---
        <ResultSection title={labels.loanPrincipalLabel!} variant="blue">
          <ResultRow
            label={`${labels.mainAssetLabel!}:`}
            value={formatCurrency(data.mainAssetPrice ?? 0)}
          />
          <ResultRow
            label={`${labels.downPaymentLabel!}:`}
            value={`- ${formatCurrency(data.downPaymentAmount ?? 0)}`}
          />
          <ResultRow
            label={`${labels.loanPrincipalLabel!}:`}
            value={formatCurrency(data.loanAmount)}
            isTotal
          />
        </ResultSection>
      )}

      {showOtherFees && (
        <ResultSection title="Biaya Lainnya (dibayar di muka)" variant="gray">
          <ResultRow
            label="Asuransi:"
            value={formatCurrency(data.insuranceAmount ?? 0)}
            info={data.mainAssetPrice ? `${formatPercent(
              data.insurancePercent ?? 0
            )}% dari ${labels.mainAssetLabel!}` : undefined}
          />
          <ResultRow
            label="Provisi:"
            value={formatCurrency(data.provisionAmount ?? 0)}
            info={`${formatPercent(
              data.provisionPercent ?? 0,
              // --- PERBAIKAN 4 ---
              { minimumFractionDigits: 1 }
            )}% dari plafon pinjaman`}
          />
          <ResultRow
            label="Biaya Polis Asuransi:"
            value={formatCurrency(data.policyFee ?? 0)}
          />
          <ResultRow
            label="Biaya Administrasi:"
            value={formatCurrency(data.adminFee ?? 0)}
          />
        </ResultSection>
      )}
    </div>
  );

  const paymentTabContent = (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">
        Informasi Pembayaran
      </h2>

      <ResultSection title="Angsuran per Bulan" variant="green">
        <ResultRow
          label="Angsuran Pokok:"
          value={formatCurrency(data.monthlyPrincipal)}
        />
        <ResultRow
          label="Angsuran Bunga:"
          value={formatCurrency(data.monthlyInterest)}
        />
        <ResultRow
          label="Total Angsuran per Bulan:"
          value={formatCurrency(data.monthlyPayment)}
          isTotal
        />
      </ResultSection>

      <ResultSection title="Pembayaran Pertama Kali" variant="purple">
        {showDownPayment && (
          <ResultRow
            label={`${labels.downPaymentLabel!}:`}
            value={formatCurrency(data.downPaymentAmount ?? 0)}
          />
        )}
        <ResultRow
          label="Angsuran Pertama:"
          value={formatCurrency(data.monthlyPayment)}
        />
        {showOtherFees && (
          <>
            <ResultRow label="Asuransi:" value={formatCurrency(data.insuranceAmount ?? 0)} />
            <ResultRow label="Provisi:" value={formatCurrency(data.provisionAmount ?? 0)} />
            <ResultRow label="Biaya Polis:" value={formatCurrency(data.policyFee ?? 0)} />
            <ResultRow label="Administrasi:" value={formatCurrency(data.adminFee ?? 0)} />
          </>
        )}
        <ResultRow
          label="Total Pembayaran Pertama:"
          value={formatCurrency(data.firstPayment)}
          isTotal
        />
      </ResultSection>

      {showTotalPaymentSimple && (
        <ResultSection title="Total Pembayaran" variant="indigo">
          <ResultRow label="Total Pokok Pinjaman:" value={formatCurrency(data.loanAmount)} />
          <ResultRow label="Total Bunga:" value={formatCurrency(data.totalInterest)} />
          <ResultRow label="Total Keseluruhan:" value={formatCurrency(data.totalPayment)} isTotal />
        </ResultSection>
      )}
    </div>
  );

  const tabs = [
    { id: "info", label: "Informasi Pinjaman", content: infoTabContent },
    { id: "payment", label: "Pembayaran", content: paymentTabContent },
  ];

  return (
    <ResultCard>
      <ResultTabs tabs={tabs} />
      <ExportButton onClick={onExport} />
    </ResultCard>
  );
};



formatters.ts
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

/**
 * Memformat angka menjadi persentase.
 * Contoh: 4.6 -> "4,6%"
 */
export function formatPercent(
  value: number | string,
  options?: { minimumFractionDigits?: number; maximumFractionDigits?: number }
): string {
  const numValue = getValidNumber(value, 0);

  // --- PERBAIKAN LOGIKA ---
  // Tentukan digit min/max untuk mencegah error.
  const minDigits = options?.minimumFractionDigits ?? 1;
  // Pastikan maxDigits tidak pernah lebih kecil dari minDigits.
  // Jika maxDigits tidak diset, gunakan nilai yang lebih besar antara minDigits atau default (2).
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
LoanResultDisplay.tsx
"use client";

import { FC, useMemo, ReactNode } from "react";
import {
  ResultCard,
  ResultTabs,
  ResultSection,
  ResultRow,
  ResultGrid,
  ExportButton,
} from "@/components/ui/result";
import { formatCurrency, formatPercent } from "@/utils/formatters";

// --- Tipe Data ---
interface LoanResultData {
  mainAssetPrice?: number;
  downPaymentPercent?: number;
  downPaymentAmount?: number;
  loanTerm?: number;
  interestRate?: number;
  loanAmount: number;
  monthlyPrincipal: number;
  monthlyInterest: number;
  monthlyPayment: number;
  totalInterest: number;
  totalPayment: number;
  firstPayment: number;
  insurancePercent?: number;
  insuranceAmount?: number;
  provisionPercent?: number;
  provisionAmount?: number;
  policyFee?: number;
  adminFee?: number;
}

// --- Tipe Konfigurasi ---
interface LoanResultConfig {
  onExport: () => void;
  showOtherFees?: boolean;
  showTotalPaymentSimple?: boolean;
  labels?: {
    mainAssetLabel?: string;
    downPaymentLabel?: string;
    loanPrincipalLabel?: string;
  };
  showPrincipalCalculation?: boolean;
  showDownPayment?: boolean;
}

interface LoanResultDisplayProps {
  data: LoanResultData;
  config: LoanResultConfig;
}

// --- Komponen Utama ---
export const LoanResultDisplay: FC<LoanResultDisplayProps> = ({
  data,
  config,
}) => {
  const {
    onExport,
    showOtherFees = false,
    showTotalPaymentSimple = false,
    labels = {
      mainAssetLabel: "Harga Aset",
      downPaymentLabel: "Uang Muka",
      loanPrincipalLabel: "Pokok Pinjaman",
    },
    showPrincipalCalculation = false,
    showDownPayment = false,
  } = config;

  const infoGridItems = useMemo(() => {
    const items: { label: string; value: ReactNode }[] = [];

    if (data.mainAssetPrice) {
      items.push({
        label: labels.mainAssetLabel!,
        value: formatCurrency(data.mainAssetPrice),
      });
    }

    if (showDownPayment && data.downPaymentAmount) {
      items.push({
        label: labels.downPaymentLabel!,
        value: (
          <>
            {formatCurrency(data.downPaymentAmount)}
            <span className="text-sm font-normal text-gray-500 ml-1">
              ({formatPercent(data.downPaymentPercent ?? 0)})
            </span>
          </>
        ),
      });
    }

    items.push(
      {
        label: "Tenor",
        value: (
          <>
            {data.loanTerm} tahun
            <span className="text-sm font-normal text-gray-500 ml-1">
              ({(data.loanTerm ?? 0) * 12} bulan)
            </span>
          </>
        ),
      },
      {
        label: "Bunga (Flat)",
        value: (
          <>
            {/* --- PERBAIKAN 1 --- */}
            {formatPercent(data.interestRate ?? 0, { minimumFractionDigits: 1 })} / tahun
            <span className="text-sm font-normal text-gray-500 ml-1">
              {/* --- PERBAIKAN 2 --- */}
              ({formatPercent((data.interestRate ?? 0) / 12, { minimumFractionDigits: 3 })} / bulan)
            </span>
          </>
        ),
      }
    );

    return items;
  }, [data, labels, showDownPayment]);

  const infoTabContent = (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">
        Informasi Pinjaman Anda
      </h2>
      <ResultGrid items={infoGridItems} />

      {showPrincipalCalculation && (
        // --- PERBAIKAN 3 ---
        <ResultSection title={labels.loanPrincipalLabel!} variant="blue">
          <ResultRow
            label={`${labels.mainAssetLabel!}:`}
            value={formatCurrency(data.mainAssetPrice ?? 0)}
          />
          <ResultRow
            label={`${labels.downPaymentLabel!}:`}
            value={`- ${formatCurrency(data.downPaymentAmount ?? 0)}`}
          />
          <ResultRow
            label={`${labels.loanPrincipalLabel!}:`}
            value={formatCurrency(data.loanAmount)}
            isTotal
          />
        </ResultSection>
      )}

      {showOtherFees && (
        <ResultSection title="Biaya Lainnya (dibayar di muka)" variant="gray">
          <ResultRow
            label="Asuransi:"
            value={formatCurrency(data.insuranceAmount ?? 0)}
            info={data.mainAssetPrice ? `${formatPercent(
              data.insurancePercent ?? 0
            )}% dari ${labels.mainAssetLabel!}` : undefined}
          />
          <ResultRow
            label="Provisi:"
            value={formatCurrency(data.provisionAmount ?? 0)}
            info={`${formatPercent(
              data.provisionPercent ?? 0,
              // --- PERBAIKAN 4 ---
              { minimumFractionDigits: 1 }
            )}% dari plafon pinjaman`}
          />
          <ResultRow
            label="Biaya Polis Asuransi:"
            value={formatCurrency(data.policyFee ?? 0)}
          />
          <ResultRow
            label="Biaya Administrasi:"
            value={formatCurrency(data.adminFee ?? 0)}
          />
        </ResultSection>
      )}
    </div>
  );

  const paymentTabContent = (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">
        Informasi Pembayaran
      </h2>

      <ResultSection title="Angsuran per Bulan" variant="green">
        <ResultRow
          label="Angsuran Pokok:"
          value={formatCurrency(data.monthlyPrincipal)}
        />
        <ResultRow
          label="Angsuran Bunga:"
          value={formatCurrency(data.monthlyInterest)}
        />
        <ResultRow
          label="Total Angsuran per Bulan:"
          value={formatCurrency(data.monthlyPayment)}
          isTotal
        />
      </ResultSection>

      <ResultSection title="Pembayaran Pertama Kali" variant="purple">
        {showDownPayment && (
          <ResultRow
            label={`${labels.downPaymentLabel!}:`}
            value={formatCurrency(data.downPaymentAmount ?? 0)}
          />
        )}
        <ResultRow
          label="Angsuran Pertama:"
          value={formatCurrency(data.monthlyPayment)}
        />
        {showOtherFees && (
          <>
            <ResultRow label="Asuransi:" value={formatCurrency(data.insuranceAmount ?? 0)} />
            <ResultRow label="Provisi:" value={formatCurrency(data.provisionAmount ?? 0)} />
            <ResultRow label="Biaya Polis:" value={formatCurrency(data.policyFee ?? 0)} />
            <ResultRow label="Administrasi:" value={formatCurrency(data.adminFee ?? 0)} />
          </>
        )}
        <ResultRow
          label="Total Pembayaran Pertama:"
          value={formatCurrency(data.firstPayment)}
          isTotal
        />
      </ResultSection>

      {showTotalPaymentSimple && (
        <ResultSection title="Total Pembayaran" variant="indigo">
          <ResultRow label="Total Pokok Pinjaman:" value={formatCurrency(data.loanAmount)} />
          <ResultRow label="Total Bunga:" value={formatCurrency(data.totalInterest)} />
          <ResultRow label="Total Keseluruhan:" value={formatCurrency(data.totalPayment)} isTotal />
        </ResultSection>
      )}
    </div>
  );

  const tabs = [
    { id: "info", label: "Informasi Pinjaman", content: infoTabContent },
    { id: "payment", label: "Pembayaran", content: paymentTabContent },
  ];

  return (
    <ResultCard>
      <ResultTabs tabs={tabs} />
      <ExportButton onClick={onExport} />
    </ResultCard>
  );
};


----

referensi
"use client";

import { jsPDF } from "jspdf";
import "jspdf-autotable";
// BARU: Impor versi LoanResultDisplay yang sudah di-refactor
import { LoanResultDisplay } from "@/components/ui/loan/"
import { formatCurrency, formatPercent } from "@/utils/formatters";
import { CarLoanBudgetResult as LoanDetailsType } from "@/types/car-loan";

interface CarLoanBudgetResultProps {
  loanDetails: LoanDetailsType;
}

export default function CarLoanBudgetResult({
  loanDetails,
}: CarLoanBudgetResultProps) {
  const handleExportPDF = () => {
    // ... fungsi export PDF tetap sama ...
    const doc = new jsPDF();
    doc.text("Simulasi Kredit Mobil (Berdasarkan Budget)", 14, 20);

    (doc as any).autoTable({
      startY: 30,
      head: [["Keterangan", "Nilai"]],
      body: [
        ["Harga Mobil OTR", formatCurrency(loanDetails.carPrice)],
        [
          "Uang Muka (DP)",
          `${formatCurrency(loanDetails.downPaymentAmount)} (${formatPercent(
            loanDetails.downPaymentPercent
          )}%)`,
        ],
        ["Tenor Pinjaman", `${loanDetails.loanTerm} tahun`],
        ["Plafon Pinjaman", formatCurrency(loanDetails.loanAmount)],
        ["Angsuran per Bulan", formatCurrency(loanDetails.monthlyPayment)],
        ["Total Pembayaran", formatCurrency(loanDetails.totalPayment)],
        ["Pembayaran Pertama", formatCurrency(loanDetails.firstPayment)],
      ],
      theme: "grid",
      headStyles: { fillColor: [66, 133, 244] },
    });

    doc.save("simulasi-kredit-mobil-budget.pdf");
  };

  return (
    <LoanResultDisplay
      // BARU: Mapping data spesifik (carPrice) ke data generik (mainAssetPrice)
      data={{
        ...loanDetails,
        mainAssetPrice: loanDetails.carPrice,
      }}
      // BARU: Konfigurasi yang lebih detail untuk memberitahu komponen cara render
      config={{
        onExport: handleExportPDF,
        showOtherFees: false, // Sesuai kebutuhan 'budget'
        showTotalPaymentSimple: true,

        // --- Konfigurasi Tampilan Baru ---
        showPrincipalCalculation: true, // Tampilkan bagian (Harga - DP = Plafon)
        showDownPayment: true, // Tampilkan semua yang berhubungan dengan DP

        // --- Konfigurasi Label Baru ---
        labels: {
          mainAssetLabel: "Harga Mobil OTR",
          downPaymentLabel: "Uang Muka (DP)",
          loanPrincipalLabel: "Plafon Pinjaman Anda",
        },
      }}
    />
  );
}


Tentu, saya akan membuat serangkaian komponen `Result` yang dapat digunakan kembali (reusable) berdasarkan file-file yang Anda berikan. Ini adalah praktik yang sangat baik untuk menjaga konsistensi UI dan mengurangi duplikasi kode.

Struktur yang akan kita buat adalah sebagai berikut:

1.  **Komponen UI Dasar (`components/ui/result/`)**: Ini adalah blok bangunan visual untuk menampilkan hasil.
    *   `ResultCard.tsx`: Wadah utama dengan bayangan dan sudut membulat.
    *   `ResultTabs.tsx`: Mengelola navigasi tab ("Informasi Pinjaman", "Pembayaran").
    *   `ResultSection.tsx`: Kotak berwarna untuk mengelompokkan detail (misalnya, "Plafon Pinjaman").
    *   `ResultRow.tsx`: Baris untuk menampilkan pasangan label dan nilai.
    *   `ResultGrid.tsx`: Grid 2x2 untuk info utama (Harga, DP, Tenor, Bunga).
    *   `ExportButton.tsx`: Tombol untuk fungsionalitas ekspor.
    *   `index.ts`: Mengekspor semua komponen di atas.

2.  **Komponen Fitur (`features/common/`)**:
    *   `LoanResultDisplay.tsx`: Komponen cerdas yang menggunakan semua blok bangunan di atas untuk merender hasil kalkulasi pinjaman secara dinamis berdasarkan data yang diberikan.

Mari kita mulai dengan membuat file-file tersebut.

---

### 1. Buat Komponen UI Dasar di `components/ui/result/`

#### `components/ui/result/ResultCard.tsx`
Wadah utama untuk semua konten hasil.

```typescript
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
```

#### `components/ui/result/ResultTabs.tsx`
Mengelola logika dan tampilan tab.

```typescript
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
```

#### `components/ui/result/ResultSection.tsx`
Kotak berwarna untuk setiap bagian detail.

```typescript
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
```

#### `components/ui/result/ResultRow.tsx`
Baris detail (label + nilai).

```typescript
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
```

#### `components/ui/result/ResultGrid.tsx`
Grid untuk informasi utama.

```typescript
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
```

#### `components/ui/result/ExportButton.tsx`
Tombol ekspor.

```typescript
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
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Export PDF
        </button>
    </div>
)
```

#### `components/ui/result/index.ts`
File barrel untuk ekspor yang mudah.

```typescript
export * from "./ResultCard";
export * from "./ResultTabs";
export * from "./ResultSection";
export * from "./ResultRow";
export * from "./ResultGrid";
export * from "./ExportButton";
```

---

### 2. Buat Komponen `LoanResultDisplay` yang Reusable

Sekarang kita akan membuat komponen `LoanResultDisplay.tsx` di `features/common/` yang menggunakan semua komponen UI di atas. Komponen ini akan menerima `loanDetails` dan `config` untuk menentukan apa yang harus ditampilkan.

#### `features/common/LoanResultDisplay.tsx`

```typescript
"use client";

import { FC, useMemo } from "react";
import {
  ResultCard,
  ResultTabs,
  ResultSection,
  ResultRow,
  ResultGrid,
  ExportButton,
} from "@/components/ui/result";
import { formatCurrency, formatPercent } from "@/utils/formatters";

// --- Tipe Generik untuk Data Hasil ---
// Ini dapat mencakup semua kemungkinan field dari semua kalkulator
interface LoanResultData {
  // Input & Info Dasar
  carPrice?: number;
  downPaymentPercent?: number;
  downPaymentAmount?: number;
  loanTerm?: number;
  interestRate?: number;
  monthlyInterestRate?: number;

  // Hasil Kalkulasi
  loanAmount: number;
  monthlyPrincipal: number;
  monthlyInterest: number;
  monthlyPayment: number;
  totalInterest: number;
  totalPayment: number;
  firstPayment: number;

  // Biaya Tambahan (Opsional)
  insurancePercent?: number;
  insuranceAmount?: number;
  provisionPercent?: number;
  provisionAmount?: number;
  policyFee?: number;
  adminFee?: number;
}

// --- Tipe untuk Konfigurasi ---
interface LoanResultConfig {
  showOtherFees?: boolean;
  showTotalPaymentSimple?: boolean; // Untuk total pembayaran di tab 'payment'
  onExport: () => void;
}

interface LoanResultDisplayProps {
  data: LoanResultData;
  config: LoanResultConfig;
}

// --- Komponen Utama ---
export const LoanResultDisplay: FC<LoanResultDisplayProps> = ({ data, config }) => {
  const { onExport, showOtherFees = false, showTotalPaymentSimple = false } = config;

  // Memoize grid items untuk performa
  const infoGridItems = useMemo(() => [
    { label: "Harga Mobil OTR", value: formatCurrency(data.carPrice ?? 0) },
    {
      label: "Uang Muka (DP)",
      value: (
        <>
          {formatCurrency(data.downPaymentAmount ?? 0)}
          <span className="text-sm font-normal text-gray-500 ml-1">
            ({formatPercent(data.downPaymentPercent ?? 0)})
          </span>
        </>
      ),
    },
    {
      label: "Tenor",
      value: (
        <>
          {data.loanTerm} tahun
          <span className="text-sm font-normal text-gray-500 ml-1">
            ({(data.loanTerm ?? 0) * 12} bulan)
          </span>
        </>
      ),
    },
    {
      label: "Bunga (Flat)",
      value: (
        <>
          {formatPercent(data.interestRate ?? 0, 1)}% / tahun
          <span className="text-sm font-normal text-gray-500 ml-1">
            ({formatPercent((data.interestRate ?? 0) / 12, 3)}% / bulan)
          </span>
        </>
      ),
    },
  ], [data]);

  const infoTabContent = (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">Informasi Pinjaman Anda</h2>
      <ResultGrid items={infoGridItems} />

      <ResultSection title="Plafon Pinjaman Anda" variant="blue">
        {data.carPrice && (
            <ResultRow label="Harga Mobil OTR:" value={formatCurrency(data.carPrice)} />
        )}
        <ResultRow label="Uang Muka (DP):" value={`- ${formatCurrency(data.downPaymentAmount ?? 0)}`} />
        <ResultRow label="Plafon Pinjaman Anda:" value={formatCurrency(data.loanAmount)} isTotal />
      </ResultSection>

      {showOtherFees && (
        <ResultSection title="Biaya Lainnya (dibayar di muka)" variant="gray">
          <ResultRow
            label="Asuransi:"
            value={formatCurrency(data.insuranceAmount ?? 0)}
            info={`${formatPercent(data.insurancePercent ?? 0)}% dari harga OTR`}
          />
          <ResultRow
            label="Provisi:"
            value={formatCurrency(data.provisionAmount ?? 0)}
            info={`${formatPercent(data.provisionPercent ?? 0, 1)}% dari plafon pinjaman`}
          />
          <ResultRow label="Biaya Polis Asuransi:" value={formatCurrency(data.policyFee ?? 0)} />
          <ResultRow label="Biaya Administrasi:" value={formatCurrency(data.adminFee ?? 0)} />
        </ResultSection>
      )}
    </div>
  );

  const paymentTabContent = (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">Informasi Pembayaran</h2>

      <ResultSection title="Angsuran per Bulan" variant="green">
        <ResultRow label="Angsuran Pokok:" value={formatCurrency(data.monthlyPrincipal)} />
        <ResultRow label="Angsuran Bunga:" value={formatCurrency(data.monthlyInterest)} />
        <ResultRow label="Total Angsuran per Bulan:" value={formatCurrency(data.monthlyPayment)} isTotal />
      </ResultSection>

      <ResultSection title="Pembayaran Pertama Kali" variant="purple">
        <ResultRow label="Uang Muka (DP):" value={formatCurrency(data.downPaymentAmount ?? 0)} />
        <ResultRow label="Angsuran Pertama:" value={formatCurrency(data.monthlyPayment)} />
        {showOtherFees && (
            <>
                <ResultRow label="Asuransi:" value={formatCurrency(data.insuranceAmount ?? 0)} />
                <ResultRow label="Provisi:" value={formatCurrency(data.provisionAmount ?? 0)} />
                <ResultRow label="Biaya Polis:" value={formatCurrency(data.policyFee ?? 0)} />
                <ResultRow label="Administrasi:" value={formatCurrency(data.adminFee ?? 0)} />
            </>
        )}
        <ResultRow label="Total Pembayaran Pertama:" value={formatCurrency(data.firstPayment)} isTotal />
      </ResultSection>

      {showTotalPaymentSimple && (
          <ResultSection title="Total Pembayaran" variant="indigo">
              <ResultRow label="Total Pokok Pinjaman:" value={formatCurrency(data.loanAmount)} />
              <ResultRow label="Total Bunga:" value={formatCurrency(data.totalInterest)} />
              <ResultRow label="Total Keseluruhan:" value={formatCurrency(data.totalPayment)} isTotal />
          </ResultSection>
      )}
    </div>
  );

  const tabs = [
    { id: "info", label: "Informasi Pinjaman", content: infoTabContent },
    { id: "payment", label: "Pembayaran", content: paymentTabContent },
  ];

  return (
    <ResultCard>
      <ResultTabs tabs={tabs} />
      <ExportButton onClick={onExport} />
    </ResultCard>
  );
};
```

### 3. Cara Menggunakan Komponen Reusable

Sekarang, file-file seperti `CarLoanSimpleResult.tsx` menjadi sangat sederhana. Mereka hanya perlu mengimpor `LoanResultDisplay`, menyiapkan data dan konfigurasi, lalu merendernya.

#### Contoh: `features/car-loan/simple/CarLoanSimpleResult.tsx` (Setelah Refactor)

```typescript
"use client";

import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { LoanResultDisplay } from "@/features/common/LoanResultDisplay";
import { formatCurrency, formatPercent } from "@/utils/formatters";

// Tipe data spesifik untuk hasil kalkulator ini
interface CarLoanSimpleResultData {
    carPrice: number;
    downPaymentPercent: number;
    downPaymentAmount: number;
    loanTerm: number;
    interestRate: number;
    monthlyInterestRate: number;
    loanAmount: number;
    monthlyPayment: number;
    monthlyPrincipal: number;
    monthlyInterest: number;
    totalPayment: number;
    totalInterest: number;
    firstPayment: number;
}

interface CarLoanSimpleResultProps {
  loanDetails: CarLoanSimpleResultData;
}

export default function CarLoanSimpleResult({ loanDetails }: CarLoanSimpleResultProps) {

  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.text("Simulasi Kredit Mobil (Simple)", 14, 20);
    (doc as any).autoTable({
      startY: 30,
      head: [['Keterangan', 'Nilai']],
      body: [
        ['Harga Mobil', formatCurrency(loanDetails.carPrice)],
        ['Uang Muka', `${formatCurrency(loanDetails.downPaymentAmount)} (${formatPercent(loanDetails.downPaymentPercent)}%)`],
        ['Plafon Pinjaman', formatCurrency(loanDetails.loanAmount)],
        ['Angsuran / Bulan', formatCurrency(loanDetails.monthlyPayment)],
        ['Total Pembayaran', formatCurrency(loanDetails.totalPayment)],
      ],
    });
    doc.save('simulasi-kredit-mobil-simple.pdf');
  };

  return (
    <LoanResultDisplay
      data={loanDetails}
      config={{
        showOtherFees: false, // Kalkulator simple tidak punya biaya lain
        showTotalPaymentSimple: true, // Tampilkan total pembayaran
        onExport: handleExportPDF,
      }}
    />
  );
}