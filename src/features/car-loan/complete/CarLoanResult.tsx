"use client";

import { jsPDF } from "jspdf";
import "jspdf-autotable";
import {
  LoanResultShell,
  LoanInfoGrid,
  PaymentBreakdown,
} from "@/components/ui/result"; // Impor komponen baru yang bisa disusun
import { formatCurrencyDisplay, formatPercent } from "@/utils/formatters";

// Interface lokal bisa tetap digunakan, tidak ada perubahan
interface CarLoanCompleteDetails {
  carPrice: number;
  downPaymentPercent: number;
  downPaymentAmount: number;
  loanTerm: number;
  interestRate: number;
  loanAmount: number;
  monthlyPrincipal: number;
  monthlyInterest: number;
  monthlyPayment: number;
  totalInterest: number;
  totalPayment: number;
  firstPayment: number;
  insurancePercent: number;
  insuranceAmount: number;
  provisionPercent: number;
  provisionAmount: number;
  policyFee: number;
  adminFee: number;
}

interface CarLoanCompleteResultProps {
  loanDetails: CarLoanCompleteDetails;
}

export default function CarLoanCompleteResult({
  loanDetails,
}: CarLoanCompleteResultProps) {
  // Fungsi export PDF tidak perlu diubah
  const handleExportPDF = () => {
    // ... (logika export PDF Anda yang sudah ada di sini) ...
    const doc = new jsPDF();
    // ...
    doc.save("simulasi-kredit-lengkap.pdf");
  };

  // Kalkulasi kecil untuk membantu menyusun UI
  const totalOtherFees =
    loanDetails.insuranceAmount +
    loanDetails.provisionAmount +
    loanDetails.policyFee +
    loanDetails.adminFee;

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
            value: `${loanDetails.loanTerm} tahun (${
              loanDetails.loanTerm * 12
            } bulan)`,
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
    <div className="space-y-8">
      <PaymentBreakdown
        title="Angsuran per Bulan"
        variant="green"
        rows={[
          {
            label: "Pokok Bulanan:",
            value: loanDetails.monthlyPrincipal,
          },
          {
            label: "Bunga Bulanan:",
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
        title="Biaya Lainnya (dibayar di muka)"
        variant="gray"
        rows={[
          {
            label: `Asuransi (${formatPercent(
              loanDetails.insurancePercent
            )} dari OTR):`,
            value: loanDetails.insuranceAmount,
          },
          {
            label: `Provisi (${formatPercent(loanDetails.provisionPercent, {
              minimumFractionDigits: 1,
            })}% dari Plafon):`,
            value: loanDetails.provisionAmount,
          },
          { label: "Biaya Polis Asuransi:", value: loanDetails.policyFee },
          { label: "Biaya Administrasi:", value: loanDetails.adminFee },
          {
            label: "Total Biaya Lainnya:",
            value: totalOtherFees,
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
          { label: "Total Biaya Lainnya:", value: totalOtherFees },
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
