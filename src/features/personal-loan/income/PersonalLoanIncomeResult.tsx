"use client";

import { jsPDF } from "jspdf";
import "jspdf-autotable";
import {
  LoanResultShell,
  LoanInfoGrid,
  PaymentBreakdown,
} from "@/components/ui/result"; // Impor komponen UI baru
import { formatCurrencyDisplay, formatPercent } from "@/utils/formatters";
import { CalculationResult } from "@/utils/calculators/personal-loan/personalLoanIncomeCalculator";

interface PersonalLoanResultProps {
  result: CalculationResult;
}

export default function PersonalLoanResult({
  result,
}: PersonalLoanResultProps) {
  // Fungsi untuk menangani ekspor ke PDF
  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.text("Simulasi Personal Loan (Berdasarkan Budget)", 14, 20);

    // Tabel untuk Data Anda
    (doc as any).autoTable({
      startY: 30,
      head: [["Data Anda", "Nilai"]],
      body: [
        [
          "Penghasilan Bersih (per bulan)",
          formatCurrencyDisplay(result.netIncome),
        ],
        [
          "Baki Kredit (max. angsuran)",
          `${formatCurrencyDisplay(result.debtRatioAmount)} (${formatPercent(
            result.debtRatioPercent
          )})`,
        ],
        [
          "Total Angsuran Pinjaman Lain",
          formatCurrencyDisplay(result.otherLoanPayment),
        ],
        [
          "Bunga KTA",
          `${formatPercent(result.monthlyInterestRate, {
            minimumFractionDigits: 2,
          })} / bulan`,
        ],
        ["Perhitungan Bunga", "FLAT"],
      ],
      theme: "grid",
      headStyles: { fillColor: [66, 133, 244] },
    });

    // Tabel untuk Rincian Angsuran
    (doc as any).autoTable({
      head: [["Rincian Angsuran", "Nilai"]],
      body: [
        ["Baki Kredit:", formatCurrencyDisplay(result.debtRatioAmount)],
        [
          "Angsuran Lain per Bulan:",
          formatCurrencyDisplay(result.otherLoanPayment),
        ],
        [
          "Max. Angsuran KTA per Bulan:",
          formatCurrencyDisplay(result.maxKtaPayment),
        ],
      ],
      theme: "grid",
      headStyles: { fillColor: [28, 161, 95] },
    });

    doc.save("simulasi-personal-loan-budget.pdf");
  };

  // --- Bagian 1: Konten untuk Tab "Informasi Budget" ---
  const infoTabContent = (
    <div className="space-y-6">
      <LoanInfoGrid
        title="Parameter Budget Anda"
        items={[
          {
            label: "Penghasilan Bersih (per bulan)",
            value: formatCurrencyDisplay(result.netIncome),
          },
          {
            label: "Baki Kredit (max. angsuran)",
            value: (
              <>
                {formatCurrencyDisplay(result.debtRatioAmount)}
                <span className="text-sm font-normal text-gray-500 ml-1">
                  ({formatPercent(result.debtRatioPercent)})
                </span>
              </>
            ),
          },
          {
            label: "Total Angsuran Pinjaman Lain",
            value: formatCurrencyDisplay(result.otherLoanPayment),
          },
          {
            label: "Asumsi Bunga KTA",
            value: (
              <>
                {`${formatPercent(result.monthlyInterestRate, {
                  minimumFractionDigits: 2,
                })} / bulan`}
                <span className="block text-sm font-normal text-gray-500">
                  (Estimasi {result.monthlyInterestRate * 12}% / tahun)
                </span>
              </>
            ),
          },
          {
            label: "Perhitungan Bunga",
            value: "FLAT",
          },
        ]}
      />
    </div>
  );

  // --- Bagian 2: Konten untuk Tab "Hasil Kalkulasi" ---
  const paymentTabContent = (
    <div className="space-y-6">
      <PaymentBreakdown
        title="Perhitungan Maksimal Angsuran"
        variant="blue"
        rows={[
          {
            label: "Baki Kredit Tersedia:",
            value: result.debtRatioAmount,
          },
          {
            label: "Angsuran Lain per Bulan:",
            value: result.otherLoanPayment,
          },
          {
            label: "Max. Angsuran KTA per Bulan:",
            value: result.maxKtaPayment,
            isTotal: true,
          },
        ]}
      />
    </div>
  );

  // --- Bagian 3: Merakit semuanya ke dalam "Cangkang" Hasil ---
  return (
    <LoanResultShell
      onExport={handleExportPDF}
      infoTabContent={infoTabContent}
      paymentTabContent={paymentTabContent} // Menggunakan nama prop yang sesuai
    />
  );
}
