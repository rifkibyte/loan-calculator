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
import {
  formatCurrencyDisplay,
  formatPercent,
  formatDecimal,
} from "@/utils/formatters";
import type { IslamicMortgageResultProps } from "@/types/islamic-mortgage";

export default function IslamicMortgageResult({
  mortgageDetails,
}: IslamicMortgageResultProps) {
  // Fungsi untuk ekspor PDF, logikanya tetap sama namun disesuaikan dengan data
  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Simulasi KPR Syariah", 105, 15, { align: "center" });

    (doc as any).autoTable({
      startY: 25,
      head: [["Keterangan", "Nilai"]],
      body: [
        ["Harga Rumah", formatCurrencyDisplay(mortgageDetails.housePrice)],
        [
          "Uang Muka (DP)",
          `${formatCurrencyDisplay(
            mortgageDetails.downPaymentAmount
          )} (${formatPercent(mortgageDetails.downPaymentPercent)})`,
        ],
        [
          "Tenor",
          `${mortgageDetails.loanTerm} tahun (${mortgageDetails.loanTermMonths} bulan)`,
        ],
        [
          "Margin Bank",
          `${formatDecimal(mortgageDetails.marginRate)}% / tahun`,
        ],
        ["Plafon Pinjaman", formatCurrencyDisplay(mortgageDetails.loanAmount)],
        [
          "Angsuran per Bulan",
          formatCurrencyDisplay(mortgageDetails.monthlyPayment),
        ],
        [
          "Total Pembayaran",
          formatCurrencyDisplay(mortgageDetails.totalPayment),
        ],
        [
          "Kebutuhan Gaji (30%)",
          formatCurrencyDisplay(mortgageDetails.minimumIncomeRatios.ratio30),
        ],
      ],
      theme: "grid",
      headStyles: { fillColor: [3, 155, 229] }, // Warna biru muda
    });
    doc.save("simulasi-kpr-syariah.pdf");
  };

  // --- Konten untuk Tab 1: Informasi Pinjaman ---
  const infoTabContent = (
    <div className="space-y-6">
      <LoanInfoGrid
        title="Data KPR Anda"
        items={[
          {
            label: "Harga Rumah",
            value: formatCurrencyDisplay(mortgageDetails.housePrice),
          },
          {
            label: "Uang Muka (DP)",
            value: (
              <>
                {formatCurrencyDisplay(mortgageDetails.downPaymentAmount)}
                <span className="text-sm font-normal text-gray-500 ml-1">
                  ({formatPercent(mortgageDetails.downPaymentPercent)})
                </span>
              </>
            ),
          },
          {
            label: "Tenor Pinjaman",
            value: (
              <>
                {mortgageDetails.loanTerm} tahun
                <span className="text-sm font-normal text-gray-500 ml-1">
                  ({mortgageDetails.loanTermMonths} bulan)
                </span>
              </>
            ),
          },
          {
            label: "Margin Bank (Anuitas)",
            value: (
              <>
                {formatDecimal(mortgageDetails.marginRate)}% / tahun
                <span className="text-sm font-normal text-gray-500 ml-1">
                  ({formatDecimal(mortgageDetails.monthlyMarginRate, 3)}% /
                  bulan)
                </span>
              </>
            ),
          },
        ]}
      />
      <ResultSection title="Rincian Pinjaman Anda" variant="blue">
        <ResultRow
          label="Plafon Pinjaman"
          info="Harga Rumah - Uang Muka"
          value={formatCurrencyDisplay(mortgageDetails.loanAmount)}
        />
        <ResultRow
          label="Angsuran per Bulan"
          value={formatCurrencyDisplay(mortgageDetails.monthlyPayment)}
          isTotal
        />
      </ResultSection>
    </div>
  );

  // --- Konten untuk Tab 2: Rincian Pembayaran ---
  const paymentTabContent = (
    <div className="space-y-6">
      <PaymentBreakdown
        title="Kebutuhan Penghasilan Minimal"
        variant="gray"
        rows={[
          {
            label: "Angsuran 25% dari Gaji",
            value: mortgageDetails.minimumIncomeRatios.ratio25,
          },
          {
            label: "Angsuran 30% dari Gaji",
            value: mortgageDetails.minimumIncomeRatios.ratio30,
          },
          {
            label: "Angsuran 1/3 dari Gaji",
            value: mortgageDetails.minimumIncomeRatios.ratio33,
          },
          {
            label: "Angsuran 40% dari Gaji",
            value: mortgageDetails.minimumIncomeRatios.ratio40,
          },
        ]}
      />
      <PaymentBreakdown
        title="Estimasi Biaya Bank"
        variant="purple"
        rows={[
          {
            label: "Biaya Provisi (1% Plafon)",
            value: mortgageDetails.provisionAmount,
          },
          {
            label: "Biaya Administrasi (0.1% Plafon)",
            value: mortgageDetails.adminAmount,
          },
        ]}
      />
      <PaymentBreakdown
        title="Total Pembayaran Keseluruhan"
        variant="indigo"
        rows={[
          {
            label: "Total Pokok Pinjaman",
            value: mortgageDetails.loanAmount,
          },
          { label: "Total Margin", value: mortgageDetails.totalMargin },
          {
            label: "Total Keseluruhan",
            value: mortgageDetails.totalPayment,
            isTotal: true,
          },
        ]}
      />
    </div>
  );

  // --- Merakit semua ke dalam "Cangkang" Hasil ---
  return (
    <LoanResultShell
      onExport={handleExportPDF}
      infoTabContent={infoTabContent}
      paymentTabContent={paymentTabContent}
    />
  );
}
