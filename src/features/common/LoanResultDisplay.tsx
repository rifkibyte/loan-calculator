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
export const LoanResultDisplay: FC<LoanResultDisplayProps> = ({
  data,
  config,
}) => {
  const {
    onExport,
    showOtherFees = false,
    showTotalPaymentSimple = false,
  } = config;

  // Memoize grid items untuk performa
  const infoGridItems = useMemo(
    () => [
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
            {/* --- PERBAIKAN: Hapus '%' manual setelah fungsi --- */}
            {formatPercent(data.interestRate ?? 0, 1)} / tahun
            <span className="text-sm font-normal text-gray-500 ml-1">
              {/* --- PERBAIKAN: Hapus '%' manual setelah fungsi --- */}(
              {formatPercent((data.interestRate ?? 0) / 12, 3)} / bulan)
            </span>
          </>
        ),
      },
    ],
    [data]
  );

  const infoTabContent = (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">
        Informasi Pinjaman Anda
      </h2>
      <ResultGrid items={infoGridItems} />

      <ResultSection title="Plafon Pinjaman Anda" variant="blue">
        {data.carPrice && (
          <ResultRow
            label="Harga Mobil OTR:"
            value={formatCurrency(data.carPrice)}
          />
        )}
        <ResultRow
          label="Uang Muka (DP):"
          value={`- ${formatCurrency(data.downPaymentAmount ?? 0)}`}
        />
        <ResultRow
          label="Plafon Pinjaman Anda:"
          value={formatCurrency(data.loanAmount)}
          isTotal
        />
      </ResultSection>

      {showOtherFees && (
        <ResultSection title="Biaya Lainnya (dibayar di muka)" variant="gray">
          <ResultRow
            label="Asuransi:"
            value={formatCurrency(data.insuranceAmount ?? 0)}
            info={`${formatPercent(
              data.insurancePercent ?? 0
            )}% dari harga OTR`}
          />
          <ResultRow
            label="Provisi:"
            value={formatCurrency(data.provisionAmount ?? 0)}
            info={`${formatPercent(
              data.provisionPercent ?? 0,
              1
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
        <ResultRow
          label="Uang Muka (DP):"
          value={formatCurrency(data.downPaymentAmount ?? 0)}
        />
        <ResultRow
          label="Angsuran Pertama:"
          value={formatCurrency(data.monthlyPayment)}
        />
        {showOtherFees && (
          <>
            <ResultRow
              label="Asuransi:"
              value={formatCurrency(data.insuranceAmount ?? 0)}
            />
            <ResultRow
              label="Provisi:"
              value={formatCurrency(data.provisionAmount ?? 0)}
            />
            <ResultRow
              label="Biaya Polis:"
              value={formatCurrency(data.policyFee ?? 0)}
            />
            <ResultRow
              label="Administrasi:"
              value={formatCurrency(data.adminFee ?? 0)}
            />
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
          <ResultRow
            label="Total Pokok Pinjaman:"
            value={formatCurrency(data.loanAmount)}
          />
          <ResultRow
            label="Total Bunga:"
            value={formatCurrency(data.totalInterest)}
          />
          <ResultRow
            label="Total Keseluruhan:"
            value={formatCurrency(data.totalPayment)}
            isTotal
          />
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
