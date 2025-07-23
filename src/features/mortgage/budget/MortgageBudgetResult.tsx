// src/features/mortgage/budget/MortgageBudgetResult.tsx (Sekarang sudah valid)
"use client";

import { jsPDF } from "jspdf";
import "jspdf-autotable";

// 1. Impor komponen UI result yang reusable
import {
  LoanResultShell,
  LoanInfoGrid,
  PaymentBreakdown,
  ResultSection, // Diperlukan untuk info tambahan
  ResultRow,      // Diperlukan untuk info tambahan
} from "@/components/ui/result";

// 2. Impor semua formatter yang dibutuhkan dari satu tempat
import {
  formatCurrencyDisplay,
  formatPercent,
  formatDecimal,
} from "@/utils/formatters";

// 3. Impor tipe data (yang sekarang sudah diperbaiki)
import type { MortgageBudgetResult as BudgetDetails } from "@/types/mortgage-budget";

interface MortgageBudgetResultProps {
  budgetDetails: BudgetDetails;
}

export default function MortgageBudgetResult({
  budgetDetails,
}: MortgageBudgetResultProps) {
  // 4. Definisikan fungsi export PDF, gunakan formatter terpusat
  const handleExportPDF = (): void => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Simulasi KPR - Berdasarkan Budget", 105, 15, { align: "center" });

    (doc as any).autoTable({
      startY: 25,
      head: [["Keterangan", "Nilai"]],
      body: [
        ["Max. Harga Rumah", formatCurrencyDisplay(budgetDetails.maxHousePrice)],
        [
          "Min. Uang Muka",
          `${formatCurrencyDisplay(
            budgetDetails.minDownPayment
          )} (${formatPercent(budgetDetails.downPaymentPercent)})`,
        ],
        ["Max. Plafon Pinjaman", formatCurrencyDisplay(budgetDetails.maxLoanAmount)],
        ["Max. Angsuran / Bulan", formatCurrencyDisplay(budgetDetails.maxMonthlyPayment)],
        ["Tenor Pinjaman", `${budgetDetails.loanTerm} tahun`],
        ["Total Pembayaran", formatCurrencyDisplay(budgetDetails.totalPayment)],
        ["Pembayaran Pertama", formatCurrencyDisplay(budgetDetails.firstPayment)],
        ["Min. Penghasilan / Bulan", formatCurrencyDisplay(budgetDetails.minMonthlyIncome)],
      ],
      theme: "grid",
      headStyles: { fillColor: [66, 133, 244] }, // Warna biru untuk header
    });

    doc.save("simulasi-kpr-budget.pdf");
  };

  // 5. Susun konten untuk Tab "Informasi Pinjaman"
  const infoTabContent = (
    <div className="space-y-6">
      <LoanInfoGrid
        title="Estimasi KPR Anda"
        items={[
          {
            label: "Max. Harga Rumah",
            value: formatCurrencyDisplay(budgetDetails.maxHousePrice),
          },
          {
            label: "Max. Plafon Pinjaman",
            value: formatCurrencyDisplay(budgetDetails.maxLoanAmount),
          },
          {
            label: "Min. Uang Muka (DP)",
            value: (
              <>
                {formatCurrencyDisplay(budgetDetails.minDownPayment)}
                <span className="text-sm font-normal text-gray-500 ml-1">
                  ({formatPercent(budgetDetails.downPaymentPercent)})
                </span>
              </>
            ),
          },
          {
            label: "Min. Penghasilan Bersih",
            value: formatCurrencyDisplay(budgetDetails.minMonthlyIncome),
          },
        ]}
      />
      <LoanInfoGrid
        title="Data Simulasi Anda"
        items={[
          {
            label: "Budget Angsuran / Bulan",
            value: formatCurrencyDisplay(budgetDetails.monthlyBudget),
          },
          {
            label: "Tenor Pinjaman",
            value: `${budgetDetails.loanTerm} tahun (${budgetDetails.loanTermMonths} bulan)`,
          },
          {
            label: "Suku Bunga (Anuitas)",
            value: (
              <>
                {formatDecimal(budgetDetails.annualInterestRate, 2)}% / tahun
                <span className="block text-sm font-normal text-gray-500">
                  (Efektif {formatDecimal(budgetDetails.monthlyInterestRate, 3)}% / bulan)
                </span>
              </>
            ),
          },
        ]}
      />
    </div>
  );

  // 6. Susun konten untuk Tab "Rincian Pembayaran"
  const paymentTabContent = (
    <div className="space-y-6">
      <PaymentBreakdown
        title="Angsuran per Bulan"
        variant="green"
        rows={[
          {
            label: "Max. Angsuran per Bulan:",
            value: budgetDetails.maxMonthlyPayment,
            isTotal: true,
          },
        ]}
      />
      <PaymentBreakdown
        title="Total Pembayaran Pertama"
        variant="purple"
        rows={[
          { label: "Min. Uang Muka:", value: budgetDetails.minDownPayment },
          { label: "Angsuran Pertama:", value: budgetDetails.maxMonthlyPayment },
          { label: "Biaya Provisi:", value: budgetDetails.provisionAmount },
          { label: "Biaya Administrasi:", value: budgetDetails.adminAmount },
          {
            label: "Total Pembayaran Pertama:",
            value: budgetDetails.firstPayment,
            isTotal: true,
          },
        ]}
      />
      <PaymentBreakdown
        title="Total Pembayaran Pinjaman"
        variant="indigo"
        rows={[
          { label: "Total Pokok Pinjaman:", value: budgetDetails.maxLoanAmount },
          { label: "Total Bunga:", value: budgetDetails.totalInterest },
          {
            label: "Total Keseluruhan:",
            value: budgetDetails.totalPayment,
            isTotal: true,
          },
        ]}
      />
       <ResultSection title="*Catatan Tambahan" variant="gray">
          <ResultRow
            label="Rasio Angsuran:"
            value={`${formatDecimal(budgetDetails.installmentPercent, 0)}% dari penghasilan`}
            info="Rasio ini digunakan untuk menghitung minimal penghasilan bersih bulanan."
          />
           <ResultRow
            label="Biaya Bank:"
            value={`${formatPercent(budgetDetails.provisionPercent)} (provisi) + ${formatPercent(budgetDetails.adminPercent)} (admin)`}
            info="Biaya ini hanya dibayar sekali di awal dari plafon pinjaman."
          />
      </ResultSection>
    </div>
  );

  // 7. Rakit semuanya menggunakan komponen cangkang (Shell)
  return (
    <LoanResultShell
      onExport={handleExportPDF}
      infoTabContent={infoTabContent}
      paymentTabContent={paymentTabContent}
    />
  );
}
