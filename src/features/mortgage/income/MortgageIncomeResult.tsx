"use client";

import { jsPDF } from "jspdf";
import "jspdf-autotable";

// Impor komponen UI generik dari referensi
import {
  ResultCard,
  ResultTabs,
  ExportButton,
  LoanInfoGrid,
  PaymentBreakdown,
} from "@/components/ui/result";

// Impor formatters dari utils
import {
  formatCurrencyDisplay,
  formatPercent,
  formatDecimal,
} from "@/utils/formatters";

// Impor tipe data (pastikan path-nya sesuai)
import type { MortgageIncomeResult as LoanDetailsType } from "@/types/mortgage-income";

interface MortgageIncomeResultProps {
  loanDetails: LoanDetailsType;
}

export default function MortgageIncomeResult({
  loanDetails,
}: MortgageIncomeResultProps) {
  // --- Fungsi Ekspor PDF (dengan fallback untuk nilai undefined) ---
  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Simulasi KPR Berdasarkan Penghasilan", 105, 20, {
      align: "center",
    });

    // Tabel Data Pengguna
    doc.setFontSize(12);
    (doc as any).autoTable({
      startY: 30,
      head: [["Data Anda", "Nilai"]],
      body: [
        [
          "Penghasilan Bersih (per bulan)",
          formatCurrencyDisplay(loanDetails.netIncome ?? 0),
        ],
        ["Tenor", `${loanDetails.loanTerm} tahun`],
        [
          "Bunga Pinjaman",
          `${formatPercent(loanDetails.interestRate ?? 0)} / tahun`,
        ],
        ["Metode Bunga", loanDetails.calculationMethod],
      ],
      theme: "grid",
      headStyles: { fillColor: [66, 133, 244] }, // Biru
    });

    // Tabel Hasil KPR
    (doc as any).autoTable({
      startY: (doc as any).lastAutoTable.finalY + 10,
      head: [["Hasil Simulasi KPR", "Nilai"]],
      body: [
        [
          "Max. Harga Properti",
          formatCurrencyDisplay(loanDetails.maxHousePrice ?? 0),
        ],
        [
          "Min. Uang Muka (DP)",
          formatCurrencyDisplay(loanDetails.minDownPayment ?? 0),
        ],
        [
          "Max. Plafon Pinjaman",
          formatCurrencyDisplay(loanDetails.maxLoanAmount ?? 0),
        ],
        [
          "Max. Angsuran per Bulan",
          formatCurrencyDisplay(loanDetails.maxInstallmentAmount ?? 0),
        ],
        ["Total Bunga", formatCurrencyDisplay(loanDetails.totalInterest ?? 0)],
        [
          "Total Pembayaran",
          formatCurrencyDisplay(loanDetails.totalPayment ?? 0),
        ],
      ],
      theme: "grid",
      headStyles: { fillColor: [52, 168, 83] }, // Hijau
    });

    doc.save("simulasi-kpr-berdasarkan-penghasilan.pdf");
  };

  // --- Bagian 1: Menyusun Konten untuk Tab "Ringkasan KPR" ---
  const summaryTabContent = (
    <div className="space-y-6">
      <LoanInfoGrid
        title="Data Anda"
        items={[
          {
            label: "Penghasilan Bersih (per bulan)",
            value: formatCurrencyDisplay(loanDetails.netIncome ?? 0),
          },
          {
            label: "Tenor",
            value: (
              <>
                {loanDetails.loanTerm} tahun
                <span className="text-sm font-normal text-gray-500 ml-1">
                  ({(loanDetails.loanTerm ?? 0) * 12} bulan)
                </span>
              </>
            ),
          },
          {
            label: "Bunga Pinjaman",
            value: (
              <>
                {formatPercent(loanDetails.interestRate ?? 0, {
                  minimumFractionDigits: 1,
                  maximumFractionDigits: 2,
                })}{" "}
                / tahun
                <span className="text-sm font-normal text-gray-500 ml-1">
                  ({formatDecimal(loanDetails.monthlyInterestRate ?? 0, 3)}% /
                  bulan)
                </span>
              </>
            ),
          },
          {
            label: "Perhitungan Bunga",
            value: (
              <span className="capitalize">
                {loanDetails.calculationMethod}
              </span>
            ),
          },
        ]}
      />
      <PaymentBreakdown
        title="Kemampuan KPR Anda"
        variant="green"
        rows={[
          {
            label: "Max. Angsuran per Bulan:",
            value: loanDetails.maxInstallmentAmount ?? 0,
          },
          {
            label: "Max. Plafon Pinjaman:",
            value: loanDetails.maxLoanAmount ?? 0,
          },
          {
            label: "Min. Uang Muka (DP):",
            value: loanDetails.minDownPayment ?? 0,
          },
          {
            label: "Max. Harga Properti:",
            value: loanDetails.maxHousePrice ?? 0,
            isTotal: true,
          },
        ]}
      />
    </div>
  );

  // --- Bagian 2: Menyusun Konten untuk Tab "Biaya Lain" ---
  const costsTabContent = (
    <div className="space-y-6">
      <PaymentBreakdown
        title="Estimasi Biaya Bank"
        variant="purple"
        rows={[
          // FIX: Memberikan fallback 0 jika nilai undefined
          {
            label: "Biaya Provisi (1% Plafon)",
            value: loanDetails.provisionFee ?? 0,
          },
          {
            label: "Biaya Administrasi (0.1% Plafon)",
            value: loanDetails.adminFee ?? 0,
          },
        ]}
      />
      <PaymentBreakdown
        title="Total Pembayaran Keseluruhan"
        variant="indigo"
        rows={[
          {
            label: "Total Pokok Pinjaman:",
            value: loanDetails.maxLoanAmount ?? 0,
          },
          {
            label: "Total Bunga:",
            value: loanDetails.totalInterest ?? 0,
          },
          {
            label: "Total Pembayaran (Pokok + Bunga):",
            value: loanDetails.totalPayment ?? 0,
            isTotal: true,
          },
        ]}
      />
      {/* Disclaimer ditambahkan langsung */}
      <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400">
        <p className="text-sm text-yellow-800">
          <strong>*Catatan:</strong> Biaya-biaya di atas adalah estimasi dan
          dapat berbeda tergantung kebijakan bank. Mohon konfirmasi kembali
          dengan pihak bank.
        </p>
      </div>
    </div>
  );

  // --- Bagian 3: Merakit semuanya menggunakan komponen UI ---
  const tabs = [
    { id: "ringkasan", label: "Ringkasan KPR", content: summaryTabContent },
    { id: "biaya", label: "Biaya Lain*", content: costsTabContent },
  ];

  return (
    <ResultCard>
      <ResultTabs tabs={tabs} />
      <ExportButton onClick={handleExportPDF} />
    </ResultCard>
  );
}
