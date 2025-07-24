"use client";

import { jsPDF } from "jspdf";
import "jspdf-autotable";
import {
  LoanResultShell,
  LoanInfoGrid,
  PaymentBreakdown,
} from "@/components/ui/result";
import {
  formatCurrencyDisplay,
  formatPercent,
  formatDecimal,
} from "@/utils/formatters";

interface PeopleBusinessCreditResultProps {
  loanDetails: {
    loanAmount: number;
    loanTerm: number;
    interestRate: number;
    loanPurpose: string;
    monthlyPayment: number;
    monthlyPrincipal: number;
    monthlyInterest: number;
    totalPayment: number;
    totalInterest: number;
    adminFee: number;
    insuranceFee: number;
    firstPayment: number;
  };
}

export default function PeopleBusinessCreditResult({
  loanDetails,
}: PeopleBusinessCreditResultProps) {
  // Helper untuk menerjemahkan tujuan pinjaman
  const formatLoanPurpose = (purpose: string) => {
    const purposes: { [key: string]: string } = {
      "working-capital": "Modal Kerja",
      investment: "Investasi",
      consumptive: "Konsumtif",
    };
    return purposes[purpose] || purpose;
  };

  // Fungsi untuk ekspor PDF, disesuaikan dengan data KUR
  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Simulasi Kredit Usaha Rakyat (KUR)", 105, 15, {
      align: "center",
    });

    (doc as any).autoTable({
      startY: 25,
      head: [["Keterangan", "Nilai"]],
      body: [
        ["Jumlah Pinjaman", formatCurrencyDisplay(loanDetails.loanAmount)],
        ["Tujuan Pinjaman", formatLoanPurpose(loanDetails.loanPurpose)],
        [
          "Tenor",
          `${loanDetails.loanTerm} tahun (${loanDetails.loanTerm * 12} bulan)`,
        ],
        [
          "Suku Bunga",
          `${formatPercent(loanDetails.interestRate, {
            minimumFractionDigits: 0,
          })} / tahun`,
        ],
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

    doc.save("simulasi-kur.pdf");
  };

  // --- Konten untuk Tab 1: Informasi Pinjaman ---
  const infoTabContent = (
    <div className="space-y-6">
      <LoanInfoGrid
        title="Informasi Kredit Usaha Rakyat"
        items={[
          {
            label: "Jumlah Pinjaman",
            value: formatCurrencyDisplay(loanDetails.loanAmount),
          },
          {
            label: "Tujuan Pinjaman",
            value: formatLoanPurpose(loanDetails.loanPurpose),
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
            label: "Suku Bunga KUR",
            value: (
              <>
                {formatPercent(loanDetails.interestRate, {
                  minimumFractionDigits: 0,
                })}{" "}
                / tahun
                <span className="text-sm font-normal text-gray-500 ml-1">
                  ({formatDecimal(loanDetails.interestRate / 12)}% / bulan)
                </span>
              </>
            ),
          },
        ]}
      />
      <PaymentBreakdown
        title="Biaya Lainnya"
        variant="gray"
        rows={[
          {
            label: "Biaya Administrasi",
            value: loanDetails.adminFee,
          },
          {
            label: "Biaya Asuransi",
            value: loanDetails.insuranceFee,
          },
        ]}
      />
    </div>
  );

  // --- Konten untuk Tab 2: Rincian Pembayaran ---
  const paymentTabContent = (
    <div className="space-y-6">
      <PaymentBreakdown
        title="Angsuran per Bulan"
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
            label: "Biaya Administrasi:",
            value: loanDetails.adminFee,
          },
          {
            label: "Biaya Asuransi:",
            value: loanDetails.insuranceFee,
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
