"use client";

import "jspdf-autotable";
import {
  LoanResultShell,
  LoanInfoGrid,
  PaymentBreakdown,
} from "@/components/ui/loan"; // Impor komponen baru
import {
  formatCurrencyDisplay,
  formatDecimal,
  formatPercent,
} from "@/utils/formatters";

interface CreditAnnuityResultProps {
  loanDetails: {
    loanAmount: number;
    loanTermMonths: number;
    loanTermYears: number;
    annualInterestRate: number;
    monthlyInterestRate: number;
    monthlyPayment: number;
    totalPayment: number;
    totalInterest: number;
  };
}


export default function CreditAnnuityResult({
  loanDetails,
}: CreditAnnuityResultProps) {

  const handleExportPDF = () => { /* ... logika export PDF ... */ };

  // 1. Definisikan konten untuk Tab Informasi
  const infoTabContent = (
    <div className="space-y-6">
      <LoanInfoGrid
        title="Informasi Pinjaman Anda"
        items={[
          {
            label: "Pokok Pinjaman",
            value: formatCurrencyDisplay(loanDetails.loanAmount),
          },
          {
            label: "Lama Pinjaman",
            value: (
              <>
                {loanDetails.loanTermMonths} bulan
                <span className="text-sm font-normal text-gray-500 ml-1">
                  ({formatDecimal(loanDetails.loanTermYears, 1)} tahun)
                </span>
              </>
            ),
          },
          {
            label: "Suku Bunga (Anuitas)",
            value: (
              <>
                {formatPercent(loanDetails.annualInterestRate, {
                  minimumFractionDigits: 2,
                })}{" "}
                / tahun
              </>
            ),
          },
        ]}
      />
    </div>
  );

  // 2. Definisikan konten untuk Tab Pembayaran
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
        title="Total Pembayaran"
        variant="indigo"
        rows={[
          {
            label: "Total Pokok Pinjaman:",
            value: loanDetails.loanAmount,
          },
          {
            label: "Total Bunga:",
            value: loanDetails.totalInterest,
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

  // 3. Masukkan konten ke dalam cangkang
  return (
    <LoanResultShell
      onExport={handleExportPDF}
      infoTabContent={infoTabContent}
      paymentTabContent={paymentTabContent}
    />
  );
}
