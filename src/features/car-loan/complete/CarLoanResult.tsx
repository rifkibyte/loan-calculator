"use client";

import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { LoanResultDisplay } from "@/components/ui/loan/"
import { formatCurrency, formatPercent } from "@/utils/formatters";

// Interface lokal untuk memastikan semua properti tersedia
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

export default function CarLoanCompleteResult({ loanDetails }: CarLoanCompleteResultProps) {
  
  const handleExportPDF = () => {
    const doc = new jsPDF();
    const startY = 25;

    doc.setFontSize(18);
    doc.text("Simulasi Kredit Mobil (Lengkap)", 105, 15, { align: "center" });

    (doc as any).autoTable({
      startY: startY,
      head: [['Informasi Pinjaman', '']],
      body: [
        ['Harga Mobil OTR', formatCurrency(loanDetails.carPrice)],
        ['Uang Muka (DP)', `${formatCurrency(loanDetails.downPaymentAmount)} (${formatPercent(loanDetails.downPaymentPercent)})`],
        ['Tenor Pinjaman', `${loanDetails.loanTerm} tahun (${loanDetails.loanTerm * 12} bulan)`],
        // --- PERBAIKAN 1 ---
        // Mengubah argumen kedua dari '1' menjadi objek '{ minimumFractionDigits: 1 }'
        ['Suku Bunga', `${formatPercent(loanDetails.interestRate, { minimumFractionDigits: 1 })} / tahun`],
        ['Plafon Pinjaman', formatCurrency(loanDetails.loanAmount)],
        ['Angsuran per Bulan', formatCurrency(loanDetails.monthlyPayment)],
      ],
      theme: 'grid',
      headStyles: { fillColor: [41, 128, 185] },
    });

    (doc as any).autoTable({
      startY: (doc as any).lastAutoTable.finalY + 10,
      head: [['Biaya Lainnya (dibayar di muka)', '']],
      body: [
        ['Asuransi', `${formatCurrency(loanDetails.insuranceAmount)} (${formatPercent(loanDetails.insurancePercent)}% dari OTR)`],
        // --- PERBAIKAN 2 ---
        // Mengubah argumen kedua dari '1' menjadi objek '{ minimumFractionDigits: 1 }'
        ['Provisi', `${formatCurrency(loanDetails.provisionAmount)} (${formatPercent(loanDetails.provisionPercent, { minimumFractionDigits: 1 })}% dari Plafon)`],
        ['Biaya Polis Asuransi', formatCurrency(loanDetails.policyFee)],
        ['Biaya Administrasi', formatCurrency(loanDetails.adminFee)],
      ],
      theme: 'grid',
      headStyles: { fillColor: [142, 68, 173] },
    });
    
    (doc as any).autoTable({
        startY: (doc as any).lastAutoTable.finalY + 10,
        head: [['Ringkasan Pembayaran', '']],
        body: [
            ['Total Pembayaran Pertama', formatCurrency(loanDetails.firstPayment)],
            ['Total Bunga Selama Tenor', formatCurrency(loanDetails.totalInterest)],
            ['Total Pembayaran Selama Tenor', formatCurrency(loanDetails.totalPayment)],
        ],
        theme: 'grid',
        headStyles: { fillColor: [22, 160, 133] },
      });

    doc.save('simulasi-kredit-lengkap.pdf');
  };

  return (
    <LoanResultDisplay
      data={{
        ...loanDetails,
        mainAssetPrice: loanDetails.carPrice,
      }}
      config={{
        onExport: handleExportPDF,
        showOtherFees: true,
        showTotalPaymentSimple: true,
        showPrincipalCalculation: true,
        showDownPayment: true,
        labels: {
          mainAssetLabel: "Harga Mobil OTR",
          downPaymentLabel: "Uang Muka (DP)",
          loanPrincipalLabel: "Plafon Pinjaman Anda",
        },
      }}
    />
  );
}
