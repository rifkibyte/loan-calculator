"use client";

import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { LoanResultDisplay } from "@/features/common/LoanResultDisplay";
import { formatCurrency, formatPercent } from "@/utils/formatters";
import { CarLoanBudgetResult as LoanDetailsType } from "@/types/car-loan";

interface CarLoanBudgetResultProps {
  loanDetails: LoanDetailsType;
}

export default function CarLoanBudgetResult({ loanDetails }: CarLoanBudgetResultProps) {
  
  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.text("Simulasi Kredit Mobil (Berdasarkan Budget)", 14, 20);
    
    (doc as any).autoTable({
      startY: 30,
      head: [['Keterangan', 'Nilai']],
      body: [
        ['Harga Mobil OTR', formatCurrency(loanDetails.carPrice)],
        ['Uang Muka (DP)', `${formatCurrency(loanDetails.downPaymentAmount)} (${formatPercent(loanDetails.downPaymentPercent)}%)`],
        ['Tenor Pinjaman', `${loanDetails.loanTerm} tahun`],
        ['Plafon Pinjaman', formatCurrency(loanDetails.loanAmount)],
        ['Angsuran per Bulan', formatCurrency(loanDetails.monthlyPayment)],
        ['Total Pembayaran', formatCurrency(loanDetails.totalPayment)], // Data ini sekarang ada
        ['Pembayaran Pertama', formatCurrency(loanDetails.firstPayment)],
      ],
      theme: 'grid',
      headStyles: { fillColor: [66, 133, 244] },
    });
    
    doc.save('simulasi-kredit-mobil-budget.pdf');
  };

  return (
    <LoanResultDisplay
      data={loanDetails}
      config={{
        showOtherFees: false,
        showTotalPaymentSimple: true, 
        onExport: handleExportPDF,
      }}
    />
  );
}
