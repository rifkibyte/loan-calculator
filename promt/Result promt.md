Buatkan kode LoanResultDisplay ini agar reusabble, sebenernya ini udah works di car-loan tapi di kredit card, annuity ga bisa

LoanResultDisplay
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

---
carloan/complete
"use client";

import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { LoanResultDisplay } from "@/components/ui/loan/"
import { formatCurrency, formatPercent } from "@/utils/formatters";

// Interface lokal untuk memastikan semua properti tersedia
interface CarLoanCompleteDetails {
  carPrice: number;
  downPaymentPercent: number;
  downPaymentAmount: number;
  loanTerm: number;
  interestRate: number;
  loanAmount: number;
  monthlyPrincipal: number;
  monthlyInterest: number;
  monthlyPayment: number;
  totalInterest: number;
  totalPayment: number;
  firstPayment: number;
  insurancePercent: number;
  insuranceAmount: number;
  provisionPercent: number;
  provisionAmount: number;
  policyFee: number;
  adminFee: number;
}

interface CarLoanCompleteResultProps {
  loanDetails: CarLoanCompleteDetails;
}

export default function CarLoanCompleteResult({ loanDetails }: CarLoanCompleteResultProps) {
  
  const handleExportPDF = () => {
    const doc = new jsPDF();
    const startY = 25;

    doc.setFontSize(18);
    doc.text("Simulasi Kredit Mobil (Lengkap)", 105, 15, { align: "center" });

    (doc as any).autoTable({
      startY: startY,
      head: [['Informasi Pinjaman', '']],
      body: [
        ['Harga Mobil OTR', formatCurrency(loanDetails.carPrice)],
        ['Uang Muka (DP)', `${formatCurrency(loanDetails.downPaymentAmount)} (${formatPercent(loanDetails.downPaymentPercent)})`],
        ['Tenor Pinjaman', `${loanDetails.loanTerm} tahun (${loanDetails.loanTerm * 12} bulan)`],
        // --- PERBAIKAN 1 ---
        // Mengubah argumen kedua dari '1' menjadi objek '{ minimumFractionDigits: 1 }'
        ['Suku Bunga', `${formatPercent(loanDetails.interestRate, { minimumFractionDigits: 1 })} / tahun`],
        ['Plafon Pinjaman', formatCurrency(loanDetails.loanAmount)],
        ['Angsuran per Bulan', formatCurrency(loanDetails.monthlyPayment)],
      ],
      theme: 'grid',
      headStyles: { fillColor: [41, 128, 185] },
    });

    (doc as any).autoTable({
      startY: (doc as any).lastAutoTable.finalY + 10,
      head: [['Biaya Lainnya (dibayar di muka)', '']],
      body: [
        ['Asuransi', `${formatCurrency(loanDetails.insuranceAmount)} (${formatPercent(loanDetails.insurancePercent)}% dari OTR)`],
        // --- PERBAIKAN 2 ---
        // Mengubah argumen kedua dari '1' menjadi objek '{ minimumFractionDigits: 1 }'
        ['Provisi', `${formatCurrency(loanDetails.provisionAmount)} (${formatPercent(loanDetails.provisionPercent, { minimumFractionDigits: 1 })}% dari Plafon)`],
        ['Biaya Polis Asuransi', formatCurrency(loanDetails.policyFee)],
        ['Biaya Administrasi', formatCurrency(loanDetails.adminFee)],
      ],
      theme: 'grid',
      headStyles: { fillColor: [142, 68, 173] },
    });
    
    (doc as any).autoTable({
        startY: (doc as any).lastAutoTable.finalY + 10,
        head: [['Ringkasan Pembayaran', '']],
        body: [
            ['Total Pembayaran Pertama', formatCurrency(loanDetails.firstPayment)],
            ['Total Bunga Selama Tenor', formatCurrency(loanDetails.totalInterest)],
            ['Total Pembayaran Selama Tenor', formatCurrency(loanDetails.totalPayment)],
        ],
        theme: 'grid',
        headStyles: { fillColor: [22, 160, 133] },
      });

    doc.save('simulasi-kredit-lengkap.pdf');
  };

  return (
    <LoanResultDisplay
      data={{
        ...loanDetails,
        mainAssetPrice: loanDetails.carPrice,
      }}
      config={{
        onExport: handleExportPDF,
        showOtherFees: true,
        showTotalPaymentSimple: true,
        showPrincipalCalculation: true,
        showDownPayment: true,
        labels: {
          mainAssetLabel: "Harga Mobil OTR",
          downPaymentLabel: "Uang Muka (DP)",
          loanPrincipalLabel: "Plafon Pinjaman Anda",
        },
      }}
    />
  );
}


---
carloan/budget
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


---
carloan/simple
"use client";

import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { LoanResultDisplay } from "@/components/ui/loan/";
import { formatCurrencyDisplay, formatPercent } from "@/utils/formatters"; // Gunakan formatter yang lebih deskriptif

// 2. Definisikan tipe data yang diterima komponen ini.
// Nama field `carPrice` spesifik untuk konteks kredit mobil.
interface SimpleLoanResultData {
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
  loanDetails: SimpleLoanResultData;
}

export default function CarLoanSimpleResult({
  loanDetails,
}: CarLoanSimpleResultProps) {
  // 3. Logika untuk membuat PDF tetap berada di sini, karena spesifik untuk hasil ini.
  const handleExportPDF = () => {
    const doc = new jsPDF();
    const tableBody = [
      ["Harga Mobil OTR", formatCurrencyDisplay(loanDetails.carPrice)],
      [
        "Uang Muka (DP)",
        `${formatCurrencyDisplay(
          loanDetails.downPaymentAmount
        )} (${formatPercent(loanDetails.downPaymentPercent)})`,
      ],
      ["Tenor", `${loanDetails.loanTerm} tahun`],
      [
        "Bunga (Flat)",
        `${formatPercent(loanDetails.interestRate, {
          minimumFractionDigits: 1,
        })}/tahun`,
      ],
      ["Plafon Pinjaman", formatCurrencyDisplay(loanDetails.loanAmount)],
      ["Angsuran per Bulan", formatCurrencyDisplay(loanDetails.monthlyPayment)],
      ["Total Pembayaran", formatCurrencyDisplay(loanDetails.totalPayment)],
      ["Pembayaran Pertama", formatCurrencyDisplay(loanDetails.firstPayment)],
    ];

    doc.setFontSize(18);
    doc.text("Simulasi Kredit Mobil Sederhana", 105, 20, { align: "center" });

    (doc as any).autoTable({
      startY: 30,
      head: [["Keterangan", "Nilai"]],
      body: tableBody,
      theme: "grid",
      headStyles: { fillColor: [41, 128, 185] },
      styles: { fontSize: 10 },
    });

    doc.save("simulasi-kredit-mobil.pdf");
  };

  // 4. Render komponen LoanResultDisplay dengan memetakan data dan mengatur konfigurasi.
  return (
    <LoanResultDisplay
      // 4A. Petakan data spesifik ke properti generik.
      // `loanDetails` memiliki `carPrice`, tapi `LoanResultDisplay` butuh `mainAssetPrice`.
      data={{
        ...loanDetails,
        mainAssetPrice: loanDetails.carPrice, // Mapping terjadi di sini
      }}
      // 4B. Konfigurasikan tampilan sesuai kebutuhan kalkulator "Simple".
      config={{
        onExport: handleExportPDF,
        showOtherFees: false, // Kalkulator simple tidak menampilkan biaya admin, provisi, dll.
        showTotalPaymentSimple: true, // Tampilkan ringkasan total pembayaran di tab kedua.

        // --- Konfigurasi Tampilan Baru ---
        showPrincipalCalculation: true, // Tampilkan bagian "Harga - DP = Plafon Pinjaman".
        showDownPayment: true, // Tampilkan rincian DP di semua tempat yang relevan.

        // --- Konfigurasi Label Baru ---
        // Beri tahu komponen label apa yang harus digunakan untuk aset utama.
        labels: {
          mainAssetLabel: "Harga Mobil OTR",
          downPaymentLabel: "Uang Muka (DP)",
          loanPrincipalLabel: "Plafon Pinjaman Anda",
        },
      }}
    />
  );
}


---
~/workspace/side-hustle/loan-calculator/src/components/ui/loan on  main! ⌚ 20:28:34
$ cat LoanCalculatorController.tsx LoanSchedule.tsx LoanResultDisplay.tsx ResultsPlaceholder.tsx index.ts
"use client";

import { useState, ReactNode } from "react";
import ResultsPlaceholder from "./ResultsPlaceholder"; // Impor komponen placeholder kita

// Menggunakan Generics <TFormInput, TLoanDetails> agar fleksibel untuk semua tipe data
interface LoanCalculatorControllerProps<TFormInput, TLoanDetails> {
  pageTitle: string;
  pageDescription: string;
  // Menerima komponen Form, yang harus memiliki prop onCalculate
  FormComponent: React.ComponentType<{ onCalculate: (data: TFormInput) => void }>;
  // Menerima fungsi yang menangani seluruh logika kalkulasi dan pembentukan data
  performCalculation: (formData: TFormInput) => TLoanDetails;
  // Menggunakan "render prop" untuk menampilkan hasil, memberikan fleksibilitas maksimum
  children: (loanDetails: TLoanDetails) => ReactNode;
}

export default function LoanCalculatorController<TFormInput, TLoanDetails>({
  pageTitle,
  pageDescription,
  FormComponent,
  performCalculation,
  children,
}: LoanCalculatorControllerProps<TFormInput, TLoanDetails>) {
  // State management sekarang ada di sini
  const [loanDetails, setLoanDetails] = useState<TLoanDetails | null>(null);

  // Logika handler sekarang ada di sini
  const handleCalculate = (formData: TFormInput) => {
    const result = performCalculation(formData);
    setLoanDetails(result);
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Judul dan deskripsi halaman di-render dari props */}
      <h1 className="text-3xl lg:text-4xl font-bold text-center text-gray-800 mb-2">
        {pageTitle}
      </h1>
      <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
        {pageDescription}
      </p>

      {/* Layout grid sekarang menjadi bagian dari komponen ini */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 bg-white p-6 rounded-lg shadow-lg h-fit">
          {/* Komponen Form dirender dari props */}
          <FormComponent onCalculate={handleCalculate} />
        </div>

        <div className="lg:col-span-2">
          {/* Logika kondisional sekarang ada di sini */}
          {loanDetails ? (
            <div className="space-y-8">
              {/* Hasil dirender menggunakan pola "render prop" */}
              {children(loanDetails)}
            </div>
          ) : (
            <ResultsPlaceholder />
          )}
        </div>
      </div>
    </div>
  );
}
// file: features/common/LoanSchedule.tsx

"use client";

import { useState, useMemo, FC } from "react";
import { formatCurrency } from "@/utils/formatters";

// --- Tipe Data Generik ---
interface ScheduleItem {
  period: number;
  payment: number;
  principal: number;
  interest: number;
  remainingBalance: number;
}

interface LoanScheduleProps {
  schedule: ScheduleItem[];
  itemsPerPage?: number; // Opsional, dengan nilai default
}

// --- Sub-komponen UI ---

// Komponen untuk Ringkasan Total
const ScheduleSummary: FC<{
  totals: { interest: number; principal: number; payment: number };
}> = ({ totals }) => (
  <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-md">
    <div>
      <p className="text-sm text-gray-600">Total Bunga:</p>
      <p className="text-lg font-semibold text-gray-900">
        {formatCurrency(totals.interest)}
      </p>
    </div>
    <div>
      <p className="text-sm text-gray-600">Total Pokok:</p>
      <p className="text-lg font-semibold text-gray-900">
        {formatCurrency(totals.principal)}
      </p>
    </div>
    <div>
      <p className="text-sm text-gray-600">Total Angsuran:</p>
      <p className="text-lg font-semibold text-gray-900">
        {formatCurrency(totals.payment)}
      </p>
    </div>
  </div>
);

// Komponen untuk Tabel Jadwal Angsuran
const ScheduleTable: FC<{ items: ScheduleItem[] }> = ({ items }) => (
  <div className="overflow-x-auto">
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          {["Bulan", "Angsuran Bunga", "Angsuran Pokok", "Total Angsuran", "Sisa Pinjaman"].map(
            (header) => (
              <th key={header} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {header}
              </th>
            )
          )}
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {items.map((item) => (
          <tr key={item.period} className={item.period % 2 === 0 ? "bg-gray-50" : ""}>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">{item.period}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatCurrency(item.interest)}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatCurrency(item.principal)}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-medium">{formatCurrency(item.payment)}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatCurrency(item.remainingBalance)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

// Komponen untuk Paginasi (dibuat lebih sederhana dan jelas)
const Pagination: FC<{
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}> = ({ currentPage, totalPages, onPageChange }) => {
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <div className="flex items-center justify-center space-x-1 mt-4">
             <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1 rounded-md bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
            >
                {"<"}
            </button>
            {pageNumbers.map(num => (
                 <button
                    key={num}
                    onClick={() => onPageChange(num)}
                    className={`px-3 py-1 rounded-md ${currentPage === num ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
                >
                    {num}
                </button>
            ))}
             <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-1 rounded-md bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
            >
                {">"}
            </button>
        </div>
    );
};


// --- Komponen Utama (Reusable) ---
export default function LoanSchedule({ schedule, itemsPerPage = 12 }: LoanScheduleProps) {
  const [currentPage, setCurrentPage] = useState(1);

  // Kalkulasi total di-memoize untuk performa
  const totals = useMemo(() => {
    return schedule.reduce(
      (acc, item) => ({
        interest: acc.interest + item.interest,
        principal: acc.principal + item.principal,
        payment: acc.payment + item.payment,
      }),
      { interest: 0, principal: 0, payment: 0 }
    );
  }, [schedule]);

  // Item yang ditampilkan per halaman juga di-memoize
  const currentItems = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return schedule.slice(startIndex, startIndex + itemsPerPage);
  }, [currentPage, schedule, itemsPerPage]);

  const totalPages = Math.ceil(schedule.length / itemsPerPage);

  // Guard clause jika tidak ada data
  if (!schedule || schedule.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md text-center">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Tabel Angsuran</h2>
        <p className="text-gray-500">Data angsuran tidak tersedia.</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Tabel Angsuran</h2>
      <ScheduleTable items={currentItems} />
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
      <ScheduleSummary totals={totals} />
    </div>
  );
}
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
import { formatCurrencyDisplay, formatPercent } from "@/utils/formatters";

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
  // Data bisa jadi undefined saat kalkulasi awal, jadi kita tandai sebagai opsional
  data?: LoanResultData;
  config: LoanResultConfig;
}

// --- Komponen Utama ---
export const LoanResultDisplay: FC<LoanResultDisplayProps> = ({
  data,
  config,
}) => {
  // --- PERBAIKAN UTAMA: GUARD CLAUSE ---
  // Jika data belum ada (masih undefined atau null saat render pertama/kalkulasi),
  // jangan render apapun. Ini adalah cara paling aman untuk mencegah error
  // "Cannot read properties of undefined".
  if (!data) {
    return null;
  }
  // --- AKHIR PERBAIKAN ---

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

  // Memo untuk kalkulasi item pada grid informasi utama
  // Kode di dalam useMemo ini sekarang aman karena sudah dipastikan `data` ada.
  const infoGridItems = useMemo(() => {
    const items: { label: string; value: ReactNode }[] = [];

    if (data.mainAssetPrice) {
      items.push({
        label: labels.mainAssetLabel!,
        value: formatCurrencyDisplay(data.mainAssetPrice),
      });
    }

    if (showDownPayment && data.downPaymentAmount) {
      items.push({
        label: labels.downPaymentLabel!,
        value: (
          <>
            {formatCurrencyDisplay(data.downPaymentAmount)}
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
        label: "Suku Bunga (Flat)",
        value: (
          <>
            {formatPercent(data.interestRate ?? 0, {
              minimumFractionDigits: 1,
              maximumFractionDigits: 2,
            })}{" "}
            / tahun
            <span className="text-sm font-normal text-gray-500 ml-1">
              (
              {formatPercent((data.interestRate ?? 0) / 12, {
                minimumFractionDigits: 3,
                maximumFractionDigits: 3,
              })}{" "}
              / bulan)
            </span>
          </>
        ),
      }
    );

    return items;
  }, [data, labels, showDownPayment]);

  // Konten untuk Tab Informasi
  const infoTabContent = (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">
        Informasi Pinjaman Anda
      </h2>
      <ResultGrid items={infoGridItems} />

      {showPrincipalCalculation && (
        <ResultSection title={labels.loanPrincipalLabel!} variant="blue">
          <ResultRow
            label={`${labels.mainAssetLabel!}:`}
            value={formatCurrencyDisplay(data.mainAssetPrice ?? 0)}
          />
          <ResultRow
            label={`${labels.downPaymentLabel!}:`}
            value={`- ${formatCurrencyDisplay(data.downPaymentAmount ?? 0)}`}
          />
          <ResultRow
            label={`${labels.loanPrincipalLabel!}:`}
            value={formatCurrencyDisplay(data.loanAmount)}
            isTotal
          />
        </ResultSection>
      )}

      {showOtherFees && (
        <ResultSection title="Biaya Lainnya (dibayar di muka)" variant="gray">
          <ResultRow
            label="Asuransi:"
            value={formatCurrencyDisplay(data.insuranceAmount ?? 0)}
            info={
              data.mainAssetPrice
                ? `${formatPercent(
                    data.insurancePercent ?? 0
                  )} dari ${labels.mainAssetLabel!}`
                : undefined
            }
          />
          <ResultRow
            label="Provisi:"
            value={formatCurrencyDisplay(data.provisionAmount ?? 0)}
            info={`${formatPercent(data.provisionPercent ?? 0, {
              minimumFractionDigits: 1,
              maximumFractionDigits: 2,
            })} dari plafon pinjaman`}
          />
          <ResultRow
            label="Biaya Polis Asuransi:"
            value={formatCurrencyDisplay(data.policyFee ?? 0)}
          />
          <ResultRow
            label="Biaya Administrasi:"
            value={formatCurrencyDisplay(data.adminFee ?? 0)}
          />
        </ResultSection>
      )}
    </div>
  );

  // Konten untuk Tab Pembayaran
  const paymentTabContent = (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">
        Informasi Pembayaran
      </h2>

      <ResultSection title="Angsuran per Bulan" variant="green">
        <ResultRow
          label="Angsuran Pokok:"
          value={formatCurrencyDisplay(data.monthlyPrincipal)}
        />
        <ResultRow
          label="Angsuran Bunga:"
          value={formatCurrencyDisplay(data.monthlyInterest)}
        />
        <ResultRow
          label="Total Angsuran per Bulan:"
          value={formatCurrencyDisplay(data.monthlyPayment)}
          isTotal
        />
      </ResultSection>

      <ResultSection title="Pembayaran Pertama Kali" variant="purple">
        {showDownPayment && (
          <ResultRow
            label={`${labels.downPaymentLabel!}:`}
            value={formatCurrencyDisplay(data.downPaymentAmount ?? 0)}
          />
        )}
        <ResultRow
          label="Angsuran Pertama:"
          value={formatCurrencyDisplay(data.monthlyPayment)}
        />
        {showOtherFees && (
          <>
            <ResultRow
              label="Asuransi:"
              value={formatCurrencyDisplay(data.insuranceAmount ?? 0)}
            />
            <ResultRow
              label="Provisi:"
              value={formatCurrencyDisplay(data.provisionAmount ?? 0)}
            />
            <ResultRow
              label="Biaya Polis:"
              value={formatCurrencyDisplay(data.policyFee ?? 0)}
            />
            <ResultRow
              label="Administrasi:"
              value={formatCurrencyDisplay(data.adminFee ?? 0)}
            />
          </>
        )}
        <ResultRow
          label="Total Pembayaran Pertama:"
          value={formatCurrencyDisplay(data.firstPayment)}
          isTotal
        />
      </ResultSection>

      {showTotalPaymentSimple && (
        <ResultSection title="Total Pembayaran" variant="indigo">
          <ResultRow
            label="Total Pokok Pinjaman:"
            value={formatCurrencyDisplay(data.loanAmount)}
          />
          <ResultRow
            label="Total Bunga:"
            value={formatCurrencyDisplay(data.totalInterest)}
          />
          <ResultRow
            label="Total Keseluruhan:"
            value={formatCurrencyDisplay(data.totalPayment)}
            isTotal
          />
        </ResultSection>
      )}
    </div>
  );

  // Definisi Tab
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
export default function ResultsPlaceholder() {
  return (
    <div className="flex items-center justify-center h-full bg-white p-6 rounded-lg shadow-lg">
      <div className="text-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="mx-auto h-12 w-12 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
        <h3 className="mt-2 text-lg font-medium text-gray-900">
          Hasil Simulasi
        </h3>
        <p className="mt-1 text-sm text-gray-500">
          Hasil perhitungan Anda akan ditampilkan di sini.
        </p>
      </div>
    </div>
  );
}
// components/ui/form/index.ts
export * from "./LoanResultDisplay";
export { default as LoanSchedule } from "./LoanSchedule";
export { default as LoanCalculatorController } from "./LoanCalculatorController";
export { default as ResultsPlaceholder } from "./ResultsPlaceholder";
