// file: app/kalkulator/kredit-mobil-budget/result/page.tsx (Setelah di-refactor)

"use client";

import { jsPDF } from "jspdf";
import "jspdf-autotable";
import {
  LoanResultShell,
  LoanInfoGrid,
  PaymentBreakdown,
} from "@/components/ui/loan"; // Impor komponen baru yang bisa disusun
import {
  formatCurrencyDisplay,
  formatPercent,
} from "@/utils/formatters";
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
