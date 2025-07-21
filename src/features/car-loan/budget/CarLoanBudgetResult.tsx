// features/car-loan/budget/CarLoanBudgetResult.tsx (Updated)
"use client";

import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { LoanResultDisplay } from "@/features/common/LoanResultDisplay";
import { formatCurrency, formatPercent } from "@/utils/formatters";
import { CarLoanBudgetResult as LoanDetailsType } from "@/types/car-loan";


// --- Tipe Properti ---
interface CarLoanBudgetResultProps {
  loanDetails: LoanDetailsType;
}

// --- Komponen Utama (Setelah Refactor) ---
export default function CarLoanBudgetResult({ loanDetails }: CarLoanBudgetResultProps) {
  
  // Fungsi untuk mengekspor hasil ke PDF
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
        ['Pembayaran Pertama', formatCurrency(loanDetails.firstPayment)],
      ],
      theme: 'grid',
      headStyles: { fillColor: [66, 133, 244] },
    });
    
    doc.save('simulasi-kredit-mobil-budget.pdf');
  };

  // Render komponen reusable dengan data dan konfigurasi yang sesuai
  return (
    <LoanResultDisplay
      data={loanDetails}
      config={{
        // Kalkulator budget tidak memiliki biaya lain seperti asuransi/provisi
        showOtherFees: false, 
        // Kalkulator budget tidak menampilkan bagian "Total Pembayaran"
        showTotalPaymentSimple: false, 
        // Menyediakan fungsi ekspor
        onExport: handleExportPDF,
      }}
    />
  );
}
