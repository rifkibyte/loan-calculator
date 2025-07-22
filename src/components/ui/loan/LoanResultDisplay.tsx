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
