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

interface MultiPurposeLoanResultProps {
  loanDetails: {
    loanAmount: number;
    loanTerm: number;
    interestRate: number;
    variableRate: number;
    fixedRatePeriod: number;
    monthlyPayment: number;
    monthlyPrincipal: number;
    monthlyInterest: number;
    totalPayment: number;
    totalInterest: number;
    provisionPercent: number;
    provisionAmount: number;
    adminFee: number;
    firstPayment: number;
  };
}


export default function MultiPurposeLoanResult({
  loanDetails,
}: MultiPurposeLoanResultProps) {
  // Fungsi untuk ekspor PDF, disesuaikan dengan data dan formatters baru
  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Simulasi Kredit Multi Guna", 105, 15, { align: "center" });

    (doc as any).autoTable({
      startY: 25,
      head: [["Keterangan", "Nilai"]],
      body: [
        [
          "Jumlah Pinjaman",
          formatCurrencyDisplay(loanDetails.loanAmount),
        ],
        [
          "Tenor",
          `${loanDetails.loanTerm} tahun (${loanDetails.loanTerm * 12} bulan)`,
        ],
        [
          "Bunga Tetap",
          `${formatPercent(
            loanDetails.interestRate
          )} (${loanDetails.fixedRatePeriod} tahun pertama)`,
        ],
        [
          "Bunga Mengambang",
          `${formatPercent(
            loanDetails.variableRate
          )} (setelah tahun ke-${loanDetails.fixedRatePeriod})`,
        ],
        [
          "Angsuran per Bulan (rata-rata)",
          formatCurrencyDisplay(loanDetails.monthlyPayment),
        ],
        [
          "Total Pembayaran",
          formatCurrencyDisplay(loanDetails.totalPayment),
        ],
      ],
      theme: "grid",
      headStyles: { fillColor: [66, 133, 244] },
    });
    doc.save("simulasi-kredit-multi-guna.pdf");
  };

  // --- Konten untuk Tab 1: Informasi Pinjaman ---
  const infoTabContent = (
    <div className="space-y-6">
      <LoanInfoGrid
        title="Informasi Kredit Multi Guna Anda"
        items={[
          {
            label: "Jumlah Pinjaman",
            value: formatCurrencyDisplay(loanDetails.loanAmount),
          },
          {
            label: "Tenor Pinjaman",
            value: (
              <>
                {loanDetails.loanTerm} tahun
                <span className="text-sm font-normal text-gray-500 ml-1">
                  ({loanDetails.loanTerm * 12} bulan)
                </span>
              </>
            ),
          },
          {
            label: "Angsuran per Bulan (rata-rata)",
            value: formatCurrencyDisplay(loanDetails.monthlyPayment),
          },
        ]}
      />
      <ResultSection title="Biaya Lainnya" variant="gray">
        <ResultRow
          label="Provisi"
          value={formatCurrencyDisplay(loanDetails.provisionAmount)}
          info={`${formatPercent(
            loanDetails.provisionPercent
          )} dari plafon pinjaman`}
        />
        <ResultRow
          label="Administrasi"
          value={formatCurrencyDisplay(loanDetails.adminFee)}
        />
      </ResultSection>
    </div>
  );

  // --- Konten untuk Tab 2: Rincian Pembayaran ---
  const paymentTabContent = (
    <div className="space-y-6">
      <PaymentBreakdown
        title="Angsuran per Bulan (Rata-rata)"
        variant="green"
        rows={[
          {
            label: "Angsuran Pokok:",
            value: loanDetails.monthlyPrincipal,
          },
          {
            label: "Angsuran Bunga:",
            value: loanDetails.monthlyInterest,
          },
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
          {
            label: "Angsuran Pertama:",
            value: loanDetails.monthlyPayment,
          },
          {
            label: "Biaya Provisi:",
            value: loanDetails.provisionAmount,
          },
          {
            label: "Biaya Administrasi:",
            value: loanDetails.adminFee,
          },
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
      {/* Bagian ini menggunakan ResultSection & ResultRow untuk fleksibilitas format */}
      <ResultSection title="Detail Suku Bunga" variant="blue">
        <ResultRow
          label="Bunga Tetap (Fixed)"
          value={`${formatPercent(
            loanDetails.interestRate
          )} / tahun`}
          info={`Berlaku untuk ${loanDetails.fixedRatePeriod} tahun pertama`}
        />
        <ResultRow
          label="Bunga Mengambang (Floating)"
          value={`${formatPercent(
            loanDetails.variableRate
          )} / tahun`}
          info={`Berlaku setelah periode bunga tetap berakhir`}
        />
      </ResultSection>
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