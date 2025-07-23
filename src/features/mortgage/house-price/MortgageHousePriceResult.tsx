// file: app/kalkulator/kpr/harga-rumah/result/page.tsx (Setelah di-refactor)

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
import type { MortgageHousePriceResult as LoanDetailsType } from "@/types/mortgage-house-price";

interface MortgageResultProps {
  mortgageDetails: LoanDetailsType;
}

export default function MortgageHousePriceResult({
  mortgageDetails,
}: MortgageResultProps) {
  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Simulasi KPR - Berdasarkan Harga Rumah", 105, 15, {
      align: "center",
    });

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
          "Bunga",
          `${formatPercent(mortgageDetails.annualInterestRate, {
            minimumFractionDigits: 2,
          })} / tahun`,
        ],
        ["Perhitungan Bunga", mortgageDetails.calculationMethod],
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
          "Minimal Penghasilan (30%)",
          formatCurrencyDisplay(mortgageDetails.minimumIncome30),
        ],
      ],
      theme: "grid",
      headStyles: { fillColor: [66, 133, 244] },
    });
    doc.save("simulasi-kpr-harga-rumah.pdf");
  };

  // --- Bagian 1: Konten untuk Tab "Ringkasan KPR" ---
  const infoTabContent = (
    <div className="space-y-6">
      <LoanInfoGrid
        title="Data Anda"
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
            label: "Tenor",
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
            label: "Bunga",
            value: (
              <>
                {formatPercent(mortgageDetails.annualInterestRate, {
                  minimumFractionDigits: 2,
                })}{" "}
                / tahun
              </>
            ),
          },
          {
            label: "Perhitungan Bunga",
            value: (
              <span className="capitalize">
                {mortgageDetails.calculationMethod}
              </span>
            ),
          },
        ]}
      />
      <ResultSection title="KPR Anda" variant="green">
        <ResultRow
          label="Plafon Pinjaman"
          info="Harga Rumah - Uang Muka"
          value={formatCurrencyDisplay(mortgageDetails.loanAmount)}
        />
        <ResultRow
          label="Angsuran per Bulan"
          value={formatCurrencyDisplay(mortgageDetails.monthlyPayment)}
          isTotal={true}
        />
      </ResultSection>
    </div>
  );

  // --- Bagian 2: Konten untuk Tab "Detail Biaya" ---
  const paymentTabContent = (
    <div className="space-y-6">
      <PaymentBreakdown
        title="Penghasilan Bersih Minimal (per bulan)"
        variant="blue"
        rows={[
          {
            label: "Angsuran 30% dari Gaji",
            value: mortgageDetails.minimumIncome30,
          },
          {
            label: "Angsuran 1/3 dari Gaji",
            value: mortgageDetails.minimumIncome33,
          },
          {
            label: "Angsuran 40% dari Gaji",
            value: mortgageDetails.minimumIncome40,
          },
        ]}
      />
      <PaymentBreakdown
        title="Biaya Bank (Estimasi)"
        variant="purple"
        rows={[
          {
            label: "Biaya Provisi (1%)",
            value: mortgageDetails.provisionAmount,
          },
          {
            label: "Biaya Administrasi (0.1%)",
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
          {
            label: "Total Bunga",
            value: mortgageDetails.totalInterest,
          },
          {
            label: "Total Keseluruhan",
            value: mortgageDetails.totalPayment,
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
      // Anda bisa mengganti label tab di sini jika komponen LoanResultShell dimodifikasi untuk menerimanya
      // Contoh: tabLabels={{ info: "Ringkasan KPR", payment: "Detail Biaya" }}
    />
  );
}
