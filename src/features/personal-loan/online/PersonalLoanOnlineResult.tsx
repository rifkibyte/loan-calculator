// feature/online-loan/result/OnlineLoanResult.tsx
"use client";

import { jsPDF } from "jspdf";
import "jspdf-autotable";
import {
  LoanResultShell,
  LoanInfoGrid,
  PaymentBreakdown,
} from "@/components/ui/result";
import { formatCurrencyDisplay, formatPercent } from "@/utils/formatters";

 interface LoanDetailsType {
  loanAmount: number;
  interestRate: number;
  loanTerm: number;
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
}

interface OnlineLoanResultProps {
  loanDetails: LoanDetailsType;
}


export default function OnlineLoanResult({
  loanDetails,
}: OnlineLoanResultProps) {
  // --- Fungsi Ekspor PDF ---
  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.text("Simulasi Pinjaman Online", 14, 20);
    (doc as any).autoTable({
      startY: 30,
      head: [["Keterangan", "Nilai"]],
      body: [
        ["Jumlah Pinjaman", formatCurrencyDisplay(loanDetails.loanAmount)],
        [
          "Suku Bunga per Tahun",
          formatPercent(loanDetails.interestRate, {
            minimumFractionDigits: 1,
            maximumFractionDigits: 2,
          }),
        ],
        ["Tenor Pinjaman", `${loanDetails.loanTerm} tahun`],
        ["Angsuran per Bulan", formatCurrencyDisplay(loanDetails.monthlyPayment)],
        ["Total Bunga", formatCurrencyDisplay(loanDetails.totalInterest)],
        ["Total Pembayaran", formatCurrencyDisplay(loanDetails.totalPayment)],
      ],
      theme: "grid",
      headStyles: { fillColor: [66, 133, 244] }, // Warna biru
    });
    doc.save("simulasi-pinjaman-online.pdf");
  };

  // --- Konten untuk Tab "Informasi Pinjaman" ---
  const infoTabContent = (
    <div className="space-y-6">
      <LoanInfoGrid
        title="Rincian Pinjaman Anda"
        items={[
          {
            label: "Jumlah Pinjaman",
            value: formatCurrencyDisplay(loanDetails.loanAmount),
          },
          {
            label: "Suku Bunga (per tahun)",
            value: formatPercent(loanDetails.interestRate, {
                minimumFractionDigits: 1,
                maximumFractionDigits: 2,
            }),
          },
          {
            label: "Tenor Pinjaman",
            value: `${loanDetails.loanTerm} tahun`,
          },
        ]}
      />
    </div>
  );

  // --- Konten untuk Tab "Rincian Pembayaran" ---
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
        title="Total Pembayaran Keseluruhan"
        variant="indigo"
        rows={[
          { label: "Total Pokok Pinjaman:", value: loanDetails.loanAmount },
          { label: "Total Bunga:", value: loanDetails.totalInterest },
          {
            label: "Total Keseluruhan:",
            value: loanDetails.totalPayment,
            isTotal: true,
          },
        ]}
      />
    </div>
  );

  // --- Merakit komponen UI menjadi satu kesatuan ---
  return (
    <LoanResultShell
      onExport={handleExportPDF}
      infoTabContent={infoTabContent}
      paymentTabContent={paymentTabContent}
    />
  );
}
