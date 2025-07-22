"use client";

import { jsPDF } from "jspdf";
import "jspdf-autotable";
// BARU: Impor versi LoanResultDisplay yang sudah di-refactor
import { LoanResultDisplay } from "@/features/common/LoanResultDisplay";
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
