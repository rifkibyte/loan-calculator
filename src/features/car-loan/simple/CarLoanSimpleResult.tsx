"use client";

import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { LoanResultDisplay } from "@/components/ui/loan/";
import { formatCurrencyDisplay, formatPercent } from "@/utils/formatters"; // Gunakan formatter yang lebih deskriptif

// 2. Definisikan tipe data yang diterima komponen ini.
// Nama field `carPrice` spesifik untuk konteks kredit mobil.
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
  // 3. Logika untuk membuat PDF tetap berada di sini, karena spesifik untuk hasil ini.
  const handleExportPDF = () => {
    const doc = new jsPDF();
    const tableBody = [
      ["Harga Mobil OTR", formatCurrencyDisplay(loanDetails.carPrice)],
      [
        "Uang Muka (DP)",
        `${formatCurrencyDisplay(
          loanDetails.downPaymentAmount
        )} (${formatPercent(loanDetails.downPaymentPercent)})`,
      ],
      ["Tenor", `${loanDetails.loanTerm} tahun`],
      [
        "Bunga (Flat)",
        `${formatPercent(loanDetails.interestRate, {
          minimumFractionDigits: 1,
        })}/tahun`,
      ],
      ["Plafon Pinjaman", formatCurrencyDisplay(loanDetails.loanAmount)],
      ["Angsuran per Bulan", formatCurrencyDisplay(loanDetails.monthlyPayment)],
      ["Total Pembayaran", formatCurrencyDisplay(loanDetails.totalPayment)],
      ["Pembayaran Pertama", formatCurrencyDisplay(loanDetails.firstPayment)],
    ];

    doc.setFontSize(18);
    doc.text("Simulasi Kredit Mobil Sederhana", 105, 20, { align: "center" });

    (doc as any).autoTable({
      startY: 30,
      head: [["Keterangan", "Nilai"]],
      body: tableBody,
      theme: "grid",
      headStyles: { fillColor: [41, 128, 185] },
      styles: { fontSize: 10 },
    });

    doc.save("simulasi-kredit-mobil.pdf");
  };

  // 4. Render komponen LoanResultDisplay dengan memetakan data dan mengatur konfigurasi.
  return (
    <LoanResultDisplay
      // 4A. Petakan data spesifik ke properti generik.
      // `loanDetails` memiliki `carPrice`, tapi `LoanResultDisplay` butuh `mainAssetPrice`.
      data={{
        ...loanDetails,
        mainAssetPrice: loanDetails.carPrice, // Mapping terjadi di sini
      }}
      // 4B. Konfigurasikan tampilan sesuai kebutuhan kalkulator "Simple".
      config={{
        onExport: handleExportPDF,
        showOtherFees: false, // Kalkulator simple tidak menampilkan biaya admin, provisi, dll.
        showTotalPaymentSimple: true, // Tampilkan ringkasan total pembayaran di tab kedua.

        // --- Konfigurasi Tampilan Baru ---
        showPrincipalCalculation: true, // Tampilkan bagian "Harga - DP = Plafon Pinjaman".
        showDownPayment: true, // Tampilkan rincian DP di semua tempat yang relevan.

        // --- Konfigurasi Label Baru ---
        // Beri tahu komponen label apa yang harus digunakan untuk aset utama.
        labels: {
          mainAssetLabel: "Harga Mobil OTR",
          downPaymentLabel: "Uang Muka (DP)",
          loanPrincipalLabel: "Plafon Pinjaman Anda",
        },
      }}
    />
  );
}
