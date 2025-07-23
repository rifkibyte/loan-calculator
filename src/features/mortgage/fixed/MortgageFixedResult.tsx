// features/mortgage/fixed/result/MortgageFixedResult.tsx (Refactored)
"use client";

import { jsPDF } from "jspdf";
import "jspdf-autotable";
import {
  LoanResultShell,
  LoanInfoGrid,
  PaymentBreakdown,
  ResultSection,
  ResultRow,
} from "@/components/ui/result";
import { formatCurrencyDisplay, formatPercent } from "@/utils/formatters";
import type { MortgageFixedResult as LoanDetailsType } from "@/types/mortgage-fixed";

interface MortgageFixedResultProps {
  loanDetails: LoanDetailsType;
}

export default function MortgageFixedResult({
  loanDetails,
}: MortgageFixedResultProps) {
  // --- Fungsi Ekspor PDF (Tetap sama, hanya dilewatkan sebagai prop) ---
  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Simulasi KPR Bunga Fixed & Floating", 105, 15, {
      align: "center",
    });

    doc.setFontSize(12);
    doc.text("Ringkasan Pinjaman", 14, 30);

    const summaryData = [
      ["Jumlah Pinjaman", formatCurrencyDisplay(loanDetails.loanAmount)],
      [
        "Lama Pinjaman",
        `${loanDetails.loanTerm} tahun (${loanDetails.loanTermMonths} bulan)`,
      ],
      ["Perhitungan Bunga", loanDetails.calculationMethod],
      ["Total Pembayaran", formatCurrencyDisplay(loanDetails.totalPayment)],
      ["Total Bunga", formatCurrencyDisplay(loanDetails.totalInterest)],
    ];

    (doc as any).autoTable({
      startY: 35,
      head: [["Keterangan", "Nilai"]],
      body: summaryData,
      theme: "grid",
      headStyles: { fillColor: [66, 133, 244] },
    });

    doc.save("simulasi-kpr-bunga-fixed.pdf");
  };

  // --- Bagian 1: Menyusun Konten untuk Tab "Informasi Pinjaman" ---
  const infoTabContent = (
    <div className="space-y-6">
      <LoanInfoGrid
        title="Data Pinjaman Anda"
        items={[
          {
            label: "Jumlah Pinjaman",
            value: formatCurrencyDisplay(loanDetails.loanAmount),
          },
          {
            label: "Lama Pinjaman",
            value: `${loanDetails.loanTerm} tahun (${loanDetails.loanTermMonths} bulan)`,
          },
        ]}
      />
      <ResultSection title="Rincian Bunga (Floating)" variant="blue">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
          {loanDetails.yearlyRates.map((rate) => (
            <ResultRow
              key={rate.year}
              label={`Tahun ke-${rate.year}`}
              value={formatPercent(rate.rate)}
            />
          ))}
        </div>
      </ResultSection>
    </div>
  );

  // --- Bagian 2: Menyusun Konten untuk Tab "Rincian Pembayaran" ---
  const paymentTabContent = (
    <div className="space-y-6">
      <PaymentBreakdown
        title="Total Pembayaran Keseluruhan"
        variant="green"
        rows={[
          { label: "Jumlah Pokok Pinjaman:", value: loanDetails.loanAmount },
          { label: "Total Bunga:", value: loanDetails.totalInterest },
          {
            label: "Total Pembayaran:",
            value: loanDetails.totalPayment,
            isTotal: true,
          },
        ]}
      />
      <ResultSection title="Informasi Tambahan" variant="purple">
        <ResultRow
          label="Metode Perhitungan Bunga"
          value={loanDetails.calculationMethod}
        />
        <ResultRow
          label="Total Periode Angsuran"
          value={`${loanDetails.loanTermMonths} bulan`}
        />
      </ResultSection>
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
