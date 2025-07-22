"use client";

import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { LoanResultDisplay } from "@/features/common/LoanResultDisplay";
import { formatCurrencyDisplay, formatPercent } from "@/utils/formatters";

// Tipe data spesifik untuk hasil kalkulator lengkap
// Pastikan semua field yang dibutuhkan oleh LoanResultDisplay ada di sini
interface LoanDetails {
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
  insurancePercent: number;
  insuranceAmount: number;
  provisionPercent: number;
  provisionAmount: number;
  policyFee: number;
  adminFee: number;
  firstPayment: number;
}

interface LoanResultProps {
  loanDetails: LoanDetails;
}

export default function LoanResult({ loanDetails }: LoanResultProps) {
  
  const handleExportPDF = () => {
    const doc = new jsPDF();
    const startY = 25; // Posisi awal untuk tabel pertama
    
    // Judul Dokumen
    doc.setFontSize(18);
    doc.text("Simulasi Kredit Mobil (Lengkap)", 105, 15, { align: "center" });

    // Tabel 1: Informasi Pinjaman Utama
    (doc as any).autoTable({
      startY: startY,
      head: [['Informasi Pinjaman', '']],
      body: [
        ['Harga Mobil OTR', formatCurrencyDisplay(loanDetails.carPrice)],
        ['Uang Muka (DP)', `${formatCurrencyDisplay(loanDetails.downPaymentAmount)} (${formatPercent(loanDetails.downPaymentPercent)})`],
        ['Tenor Pinjaman', `${loanDetails.loanTerm} tahun (${loanDetails.loanTerm * 12} bulan)`],
        ['Suku Bunga', `${formatPercent(loanDetails.interestRate, 1)}% / tahun`],
        ['Plafon Pinjaman', formatCurrencyDisplay(loanDetails.loanAmount)],
        ['Angsuran per Bulan', formatCurrencyDisplay(loanDetails.monthlyPayment)],
      ],
      theme: 'grid',
      headStyles: { fillColor: [41, 128, 185] }, // Biru
    });

    // Tabel 2: Biaya Lain-lain
    (doc as any).autoTable({
      startY: (doc as any).lastAutoTable.finalY + 10,
      head: [['Biaya Lainnya (dibayar di muka)', '']],
      body: [
        ['Asuransi', `${formatCurrencyDisplay(loanDetails.insuranceAmount)} (${formatPercent(loanDetails.insurancePercent)}% dari OTR)`],
        ['Provisi', `${formatCurrencyDisplay(loanDetails.provisionAmount)} (${formatPercent(loanDetails.provisionPercent, 1)}% dari Plafon)`],
        ['Biaya Polis Asuransi', formatCurrencyDisplay(loanDetails.policyFee)],
        ['Biaya Administrasi', formatCurrencyDisplay(loanDetails.adminFee)],
      ],
      theme: 'grid',
      headStyles: { fillColor: [142, 68, 173] }, // Ungu
    });
    
    // Tabel 3: Ringkasan Pembayaran
    (doc as any).autoTable({
        startY: (doc as any).lastAutoTable.finalY + 10,
        head: [['Ringkasan Pembayaran', '']],
        body: [
            ['Total Pembayaran Pertama', formatCurrencyDisplay(loanDetails.firstPayment)],
            ['Total Bunga Selama Tenor', formatCurrencyDisplay(loanDetails.totalInterest)],
            ['Total Pembayaran Selama Tenor', formatCurrencyDisplay(loanDetails.totalPayment)],
        ],
        theme: 'grid',
        headStyles: { fillColor: [22, 160, 133] }, // Hijau
      });

    doc.save('simulasi-kredit-lengkap.pdf');
  };

  return (
    <LoanResultDisplay
      data={loanDetails}
      config={{
        showOtherFees: true, // <-- Tampilkan bagian "Biaya Lainnya"
        showTotalPaymentSimple: true, // <-- Tampilkan bagian "Total Pembayaran"
        onExport: handleExportPDF, // <-- Gunakan fungsi ekspor yang sudah kita buat
      }}
    />
  );
}
