"use client";

import { jsPDF } from "jspdf";
import "jspdf-autotable";
import {
  LoanResultShell,
  LoanInfoGrid,
  PaymentBreakdown,
  ResultSection,
} from "@/components/ui/result";
import { formatCurrencyDisplay, formatPercent } from "@/utils/formatters";

interface PersonalLoanResultProps {
  loanDetails: {
    netIncome: number;
    debtRatioPercent: number;
    debtRatioAmount: number;
    otherLoanPayment: number;
    interestRate: number; // Bunga per bulan
    annualInterestRate: number; // Bunga per tahun
    maxKtaPayment: number; // Maksimal angsuran KTA
    loanAmount: number;
    monthlyPayment: number;
    monthlyPrincipal: number;
    monthlyInterest: number;
    totalPayment: number;
    totalInterest: number;
    calculationMethod: string;
  };
}

export default function PersonalLoanResult({
  loanDetails,
}: PersonalLoanResultProps) {
  // Fungsi untuk ekspor PDF, disesuaikan dengan data dan formatters baru
  const handleExportPDF = (): void => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Simulasi KTA - Limit Kredit", 105, 15, { align: "center" });

    (doc as any).autoTable({
      startY: 25,
      head: [["Keterangan", "Nilai"]],
      body: [
        [
          "Penghasilan Bersih per Bulan",
          formatCurrencyDisplay(loanDetails.netIncome),
        ],
        ["Rasio Kredit", formatPercent(loanDetails.debtRatioPercent)],
        [
          "Maksimal Angsuran per Bulan",
          formatCurrencyDisplay(loanDetails.debtRatioAmount),
        ],
        [
          "Angsuran Pinjaman Lain",
          formatCurrencyDisplay(loanDetails.otherLoanPayment),
        ],
        [
          "Maksimal Angsuran KTA",
          formatCurrencyDisplay(loanDetails.maxKtaPayment),
        ],
        [
          "Estimasi Plafon Pinjaman",
          formatCurrencyDisplay(loanDetails.loanAmount),
        ],
        ["Total Pembayaran", formatCurrencyDisplay(loanDetails.totalPayment)],
      ],
      theme: "grid",
      headStyles: { fillColor: [66, 133, 244] },
    });
    doc.save("simulasi-kta-limit-kredit.pdf");
  };

  // --- Konten untuk Tab 1: Informasi Pinjaman ---
  const infoTabContent = (
    <div className="space-y-6">
      <LoanInfoGrid
        title="Informasi Finansial Anda"
        items={[
          {
            label: "Penghasilan Bersih (per bulan)",
            value: formatCurrencyDisplay(loanDetails.netIncome),
          },
          {
            label: "Rasio Kredit",
            value: (
              <>
                {formatPercent(loanDetails.debtRatioPercent)}
                <span className="text-sm font-normal text-gray-500 ml-1">
                  dari penghasilan
                </span>
              </>
            ),
          },
          {
            label: "Angsuran Pinjaman Lain",
            value: formatCurrencyDisplay(loanDetails.otherLoanPayment),
          },
          {
            label: "Bunga KTA",
            value: (
              <>
                {formatPercent(loanDetails.interestRate, {
                  minimumFractionDigits: 2,
                })}{" "}
                / bulan
                <span className="block text-sm font-normal text-gray-500">
                  (
                  {formatPercent(loanDetails.annualInterestRate, {
                    minimumFractionDigits: 2,
                  })}{" "}
                  / tahun)
                </span>
              </>
            ),
          },
        ]}
      />

      <PaymentBreakdown
        title="Kemampuan Angsuran per Bulan"
        variant="blue"
        rows={[
          {
            label: "Maksimal Angsuran (dari penghasilan):",
            value: loanDetails.debtRatioAmount,
          },
          {
            label: "Angsuran Pinjaman Lain:",
            value: loanDetails.otherLoanPayment,
          },
          {
            label: "Maksimal Angsuran KTA per Bulan:",
            value: loanDetails.maxKtaPayment,
            isTotal: true,
          },
        ]}
      />

      <PaymentBreakdown
        title="Estimasi Plafon Pinjaman"
        variant="gray"
        rows={[
          {
            label: `Metode: ${loanDetails.calculationMethod}`,
            value: loanDetails.loanAmount,
            isTotal: true,
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
            label: "Total Pembayaran:",
            value: loanDetails.totalPayment,
            isTotal: true,
          },
        ]}
      />

      <ResultSection title="Catatan Penting" variant="gray">
        <ul className="text-sm text-gray-700 list-disc list-inside space-y-1">
          <li>
            Angsuran per bulan ini adalah jumlah maksimal yang dapat Anda
            alokasikan untuk pinjaman KTA.
          </li>
          <li>
            Plafon pinjaman merupakan estimasi berdasarkan kemampuan bayar
            maksimal Anda.
          </li>
          <li>
            Bunga dihitung menggunakan metode {loanDetails.calculationMethod}.
          </li>
        </ul>
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
