// features/mortgage/complete/MortgageCompleteResult.tsx (Setelah Refactor)
"use client";

import { jsPDF } from "jspdf";
import "jspdf-autotable";

// 1. Impor komponen UI reusable dari direktori result
import {
  LoanResultShell,
  LoanInfoGrid,
  PaymentBreakdown,
  ResultRow,
  ResultSection,
} from "@/components/ui/result";

// 2. Impor formatters yang sudah terstandarisasi
import { formatCurrencyDisplay, formatPercent, formatDecimal } from "@/utils/formatters";
import type { MortgageResult as MortgageDetails } from "@/types/mortgage";

interface MortgageResultProps {
  mortgageDetails: MortgageDetails;
}

export default function MortgageCompleteResult({ mortgageDetails }: MortgageResultProps) {
  // 3. Logika bisnis (seperti export PDF) tetap di sini, tapi terpisah dari render
  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Simulasi Kredit Rumah", 105, 15, { align: "center" });

    (doc as any).autoTable({
      startY: 25,
      head: [["Keterangan", "Nilai"]],
      body: [
        ["Harga Rumah", formatCurrencyDisplay(mortgageDetails.housePrice)],
        [
          "Uang Muka (DP)",
          `${formatCurrencyDisplay(mortgageDetails.downPaymentAmount)} (${formatPercent(mortgageDetails.downPaymentPercent)})`,
        ],
        ["Plafon Pinjaman", formatCurrencyDisplay(mortgageDetails.loanAmount)],
        ["Tenor", `${mortgageDetails.loanTerm} tahun (${mortgageDetails.loanTermMonths} bulan)`],
        ["Bunga", `${formatPercent(mortgageDetails.annualInterestRate)}% / tahun`],
        ["Angsuran per Bulan", formatCurrencyDisplay(mortgageDetails.monthlyPayment)],
        ["Total Biaya & Pajak", formatCurrencyDisplay(mortgageDetails.totalCosts)],
        ["Total Pembayaran Pertama", formatCurrencyDisplay(mortgageDetails.firstPayment)],
        ["Total Pembayaran KPR", formatCurrencyDisplay(mortgageDetails.totalPayment)],
      ],
      theme: "grid",
      headStyles: { fillColor: [4, 102, 200] }, // Warna biru
    });
    doc.save("simulasi-kpr-lengkap.pdf");
  };

  // 4. Definisikan konten untuk setiap tab secara deklaratif

  // --- KONTEN TAB 1: Informasi Pinjaman (Ringkasan) ---
  const infoTabContent = (
    <div className="space-y-6">
      <LoanInfoGrid
        title="Ringkasan KPR Anda"
        items={[
          {
            label: "Harga Rumah",
            value: formatCurrencyDisplay(mortgageDetails.housePrice),
          },
          {
            label: "Plafon Pinjaman",
            value: formatCurrencyDisplay(mortgageDetails.loanAmount),
          },
          {
            label: "Angsuran per Bulan",
            value: formatCurrencyDisplay(mortgageDetails.monthlyPayment),
          },
          {
            label: "Tenor",
            value: `${mortgageDetails.loanTerm} tahun (${mortgageDetails.loanTermMonths} bulan)`,
          },
          {
            label: "Suku Bunga",
            value: (
              <>
                {formatPercent(mortgageDetails.annualInterestRate)}% / tahun
                <span className="block text-sm font-normal text-gray-500">
                  ({formatDecimal(mortgageDetails.monthlyInterestRate, 3)}% / bulan)
                </span>
              </>
            ),
          },
          {
            label: "Metode Bunga",
            value: mortgageDetails.calculationMethod,
          },
        ]}
      />

      <PaymentBreakdown
        title="Total Pembayaran KPR"
        variant="indigo"
        rows={[
          { label: "Total Pokok Pinjaman:", value: mortgageDetails.loanAmount },
          { label: "Total Bunga:", value: mortgageDetails.totalInterest },
          { label: "Total Keseluruhan:", value: mortgageDetails.totalPayment, isTotal: true },
        ]}
      />
    </div>
  );

  // --- KONTEN TAB 2: Rincian Pembayaran (Detail Biaya) ---
  const paymentTabContent = (
    <div className="space-y-6">
      <PaymentBreakdown
        title="Pembayaran Pertama Kali"
        variant="purple"
        rows={[
          { label: "Uang Muka (DP):", value: mortgageDetails.downPaymentAmount },
          { label: "Total Biaya & Pajak:", value: mortgageDetails.totalCosts },
          { label: "Total:", value: mortgageDetails.firstPayment, isTotal: true },
        ]}
      />
      <ResultSection title="Rincian Biaya & Pajak" variant="gray">
        <ResultRow
          label="Biaya Provisi"
          value={formatCurrencyDisplay(mortgageDetails.provisionAmount)}
          info={`${formatPercent(mortgageDetails.provisionPercent)} dari plafon`}
        />
        <ResultRow label="Biaya Appraisal" value={formatCurrencyDisplay(mortgageDetails.appraisalFee)} />
        <ResultRow label="Biaya Administrasi" value={formatCurrencyDisplay(mortgageDetails.adminFee)} />
        <ResultRow label="Biaya Notaris" value={formatCurrencyDisplay(mortgageDetails.notaryFee)} />
        <ResultRow label="Biaya Asuransi" value={formatCurrencyDisplay(mortgageDetails.insuranceFee)} />
        <ResultRow
          label="Pajak Pembeli (BPHTB)"
          value={formatCurrencyDisplay(mortgageDetails.bphtbTax)}
          info={`5% × (Harga Rumah - NJOPTKP)`}
        />
        <ResultRow
          label="Total Biaya & Pajak"
          value={formatCurrencyDisplay(mortgageDetails.totalCosts)}
          isTotal={true}
        />
      </ResultSection>
    </div>
  );

  // 5. Rakit semuanya ke dalam komponen "cangkang" (Shell)
  return (
    <LoanResultShell
      onExport={handleExportPDF}
      infoTabContent={infoTabContent}
      paymentTabContent={paymentTabContent}
    />
  );
}
