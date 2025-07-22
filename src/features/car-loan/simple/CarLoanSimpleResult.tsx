"use client";

import { jsPDF } from "jspdf";
import "jspdf-autotable";
import {
  LoanResultShell,
  LoanInfoGrid,
  PaymentBreakdown,
} from "@/components/ui/loan"; // Impor komponen komposisi
import { formatCurrencyDisplay, formatPercent } from "@/utils/formatters";

// Definisi tipe data tidak perlu diubah
interface SimpleLoanResultData {
  carPrice: number;
  downPaymentPercent: number;
  downPaymentAmount: number;
  loanTerm: number;
  interestRate: number;
  monthlyInterestRate: number;
  loanAmount: number;
  monthlyPayment: number;
  monthlyPrincipal: number;
  monthlyInterest: number;
  totalPayment: number;
  totalInterest: number;
  firstPayment: number;
}

interface CarLoanSimpleResultProps {
  loanDetails: SimpleLoanResultData;
}

export default function CarLoanSimpleResult({
  loanDetails,
}: CarLoanSimpleResultProps) {
  // Logika export PDF tidak perlu diubah
  const handleExportPDF = () => {
    const doc = new jsPDF();
    // ... (logika export PDF Anda yang sudah ada di sini) ...
    doc.save("simulasi-kredit-mobil.pdf");
  };

  // --- Bagian 1: Menyusun Konten untuk Tab "Informasi Pinjaman" ---
  const infoTabContent = (
    <div className="space-y-6">
      <LoanInfoGrid
        title="Informasi Pinjaman Anda"
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
          {
            label: "Suku Bunga (Flat)",
            value: `${formatPercent(loanDetails.interestRate, {
              minimumFractionDigits: 1,
            })} / tahun`,
          },
        ]}
      />
      <PaymentBreakdown
        title="Plafon Pinjaman Anda"
        variant="blue"
        rows={[
          { label: "Harga Mobil OTR:", value: loanDetails.carPrice },
          { label: "Uang Muka (DP):", value: -loanDetails.downPaymentAmount },
          {
            label: "Total Plafon Pinjaman:",
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
          { label: "Pokok Bulanan:", value: loanDetails.monthlyPrincipal },
          { label: "Bunga Bulanan:", value: loanDetails.monthlyInterest },
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

  // --- Bagian 3: Merakit semuanya ke dalam "Cangkang" ---
  return (
    <LoanResultShell
      onExport={handleExportPDF}
      infoTabContent={infoTabContent}
      paymentTabContent={paymentTabContent}
    />
  );
}
