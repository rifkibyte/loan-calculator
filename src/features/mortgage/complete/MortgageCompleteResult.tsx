"use client";

import  { useState } from "react";
import { jsPDF } from "jspdf";
import type { MortgageResult as MortgageDetails } from "@/types/mortgage";

interface MortgageResultProps {
  mortgageDetails: MortgageDetails;
}

export default function MortgageCompleteResult({
  mortgageDetails,
}: MortgageResultProps) {
  const [activeTab, setActiveTab] = useState<string>("summary");

  const formatCurrency = (value: number): string => {
    if (isNaN(value) || !isFinite(value)) {
      return "Rp 0,00";
    }
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const formatPercent = (value: number): string => {
    if (isNaN(value) || !isFinite(value)) {
      return "0";
    }
    return value.toFixed(1);
  };

  const handlePrint = (): void => {
    window.print();
  };

  const handleExportPDF = (): void => {
    const doc = new jsPDF();

    // Add title
    doc.setFontSize(18);
    doc.text("Simulasi Kredit Rumah", 105, 15, { align: "center" });

    // Add summary
    doc.setFontSize(12);
    doc.text("Ringkasan KPR", 14, 30);

    const summaryInfo = [
      ["Harga Rumah", formatCurrency(mortgageDetails.housePrice)],
      [
        "Uang Muka (DP)",
        `${formatCurrency(mortgageDetails.downPaymentAmount)} (${formatPercent(
          mortgageDetails.downPaymentPercent
        )}%)`,
      ],
      ["Plafon Pinjaman", formatCurrency(mortgageDetails.loanAmount)],
      [
        "Tenor",
        `${mortgageDetails.loanTerm} tahun (${mortgageDetails.loanTermMonths} bulan)`,
      ],
      [
        "Bunga",
        `${formatPercent(mortgageDetails.annualInterestRate)}% / tahun`,
      ],
      ["Angsuran per Bulan", formatCurrency(mortgageDetails.monthlyPayment)],
      ["Total Biaya & Pajak", formatCurrency(mortgageDetails.totalCosts)],
      [
        "Total Pembayaran Pertama",
        formatCurrency(mortgageDetails.firstPayment),
      ],
    ];

    (doc as any).autoTable({
      startY: 35,
      body: summaryInfo,
      theme: "grid",
      styles: { fontSize: 10 },
    });

    doc.save("simulasi-kpr.pdf");
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Tab Navigation */}
      <div className="flex border-b">
        <button
          className={`flex-1 py-3 px-4 text-center font-medium ${
            activeTab === "summary"
              ? "bg-blue-50 text-blue-600 border-b-2 border-blue-600"
              : "text-gray-600 hover:text-gray-800"
          }`}
          onClick={() => setActiveTab("summary")}
        >
          Ringkasan KPR
        </button>
        <button
          className={`flex-1 py-3 px-4 text-center font-medium ${
            activeTab === "details"
              ? "bg-blue-50 text-blue-600 border-b-2 border-blue-600"
              : "text-gray-600 hover:text-gray-800"
          }`}
          onClick={() => setActiveTab("details")}
        >
          Detail Biaya
        </button>
      </div>

      <div className="p-6">
        {/* Tab 1: Ringkasan KPR */}
        {activeTab === "summary" && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Ringkasan KPR Anda
            </h2>

            {/* Data Properti */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-3">
                Data Properti
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Harga Rumah:</span>
                  <span className="font-medium text-gray-900">
                    {formatCurrency(mortgageDetails.housePrice)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Uang Muka (DP):</span>
                  <span className="font-medium text-gray-900">
                    {formatCurrency(mortgageDetails.downPaymentAmount)}
                    <br />
                    <span className="text-sm text-gray-500">
                      ({formatPercent(mortgageDetails.downPaymentPercent)}%)
                    </span>
                  </span>
                </div>
                <div className="flex justify-between border-t pt-2">
                  <span className="text-gray-600 font-medium">
                    Plafon Pinjaman:
                  </span>
                  <span className="font-semibold text-gray-900">
                    {formatCurrency(mortgageDetails.loanAmount)}
                  </span>
                </div>
              </div>
            </div>

            {/* Data KPR - Moved below Data Properti */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-3">Data KPR</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Tenor:</span>
                  <span className="font-medium text-gray-900">
                    {mortgageDetails.loanTerm} tahun
                    <br />
                    <span className="text-sm text-gray-500">
                      ({mortgageDetails.loanTermMonths} bulan)
                    </span>
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Bunga:</span>
                  <span className="font-medium text-gray-900">
                    {formatPercent(mortgageDetails.annualInterestRate)}% / tahun
                    <br />
                    <span className="text-sm text-gray-500">
                      ({formatPercent(mortgageDetails.monthlyInterestRate)}% /
                      bulan)
                    </span>
                  </span>
                </div>
                <div className="flex justify-between border-t pt-2">
                  <span className="text-gray-600 font-medium">
                    Angsuran per Bulan:
                  </span>
                  <span className="font-semibold text-gray-900">
                    {formatCurrency(mortgageDetails.monthlyPayment)}
                  </span>
                </div>
              </div>
            </div>

            {/* Pembayaran Pertama */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-3">
                Pembayaran Pertama Kali
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Uang Muka:</span>
                  <span className="font-medium text-gray-900">
                    {formatCurrency(mortgageDetails.downPaymentAmount)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Biaya & Pajak:</span>
                  <span className="font-medium text-gray-900">
                    {formatCurrency(mortgageDetails.totalCosts)}
                  </span>
                </div>
                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between">
                    <span className="font-semibold text-gray-900">
                      Total Pembayaran Pertama:
                    </span>
                    <span className="font-bold text-gray-900 text-lg">
                      {formatCurrency(mortgageDetails.firstPayment)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Informasi Tambahan */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">
                Informasi Penting:
              </h3>
              <div className="text-sm text-gray-600 space-y-1">
                <p>
                  • Perhitungan menggunakan metode bunga{" "}
                  {mortgageDetails.calculationMethod}
                </p>
                <p>• Angsuran bulanan sudah termasuk bunga dan pokok</p>
                <p>
                  • Total pembayaran selama {mortgageDetails.loanTerm} tahun:{" "}
                  <span className="font-medium text-gray-900">
                    {formatCurrency(mortgageDetails.totalPayment)}
                  </span>
                </p>
                <p>
                  • Total bunga yang dibayar:{" "}
                  <span className="font-medium text-gray-900">
                    {formatCurrency(mortgageDetails.totalInterest)}
                  </span>
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Detail Biaya */}
        {activeTab === "details" && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Detail Biaya & Pajak
            </h2>

            {/* Biaya Bank */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-3">Biaya Bank</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="text-gray-600">
                    Biaya Provisi
                    <br />
                    <span className="text-sm">
                      ({formatPercent(mortgageDetails.provisionPercent)}% dari
                      plafon)
                    </span>
                  </span>
                  <span className="font-medium text-gray-900">
                    {formatCurrency(mortgageDetails.provisionAmount)}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="text-gray-600">Biaya Appraisal</span>
                  <span className="font-medium text-gray-900">
                    {formatCurrency(mortgageDetails.appraisalFee)}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600">Biaya Administrasi</span>
                  <span className="font-medium text-gray-900">
                    {formatCurrency(mortgageDetails.adminFee)}
                  </span>
                </div>
              </div>
            </div>

            {/* Biaya Lain */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-3">
                Biaya Lainnya
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="text-gray-600">Biaya Notaris</span>
                  <span className="font-medium text-gray-900">
                    {formatCurrency(mortgageDetails.notaryFee)}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600">Biaya Asuransi</span>
                  <span className="font-medium text-gray-900">
                    {formatCurrency(mortgageDetails.insuranceFee)}
                  </span>
                </div>
              </div>
            </div>

            {/* Pajak */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-3">Pajak</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600">
                    Pajak Pembeli / BPHTB
                    <br />
                    <span className="text-sm">
                      5% × ({formatCurrency(mortgageDetails.housePrice)} -{" "}
                      {formatCurrency(mortgageDetails.njoptkp)})
                    </span>
                  </span>
                  <span className="font-medium text-gray-900">
                    {formatCurrency(mortgageDetails.bphtbTax)}
                  </span>
                </div>
              </div>
            </div>

            {/* Total */}
            <div className="bg-gray-800 text-white p-4 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="font-bold text-lg">Total Biaya & Pajak:</span>
                <span className="font-bold text-xl">
                  {formatCurrency(mortgageDetails.totalCosts)}
                </span>
              </div>
            </div>

            {/* Breakdown Detail */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">
                Catatan NJOPTKP/NPTKP:
              </h3>
              <div className="text-sm text-gray-600 space-y-1">
                <p>
                  • NJOPTKP/NPTKP yang digunakan:{" "}
                  <span className="font-medium text-gray-900">
                    {formatCurrency(mortgageDetails.njoptkp)}
                  </span>
                </p>
                <p>
                  • Nilai ini berbeda-beda tiap daerah dan dapat berubah
                  sewaktu-waktu
                </p>
                <p>
                  • Contoh: DKI Jakarta Rp 60 juta, Bekasi & Tangerang Rp 30
                  juta, Depok Rp 20 juta
                </p>
                <p>
                  • Pastikan menggunakan nilai NJOPTKP terbaru sesuai lokasi
                  properti
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="mt-6 flex space-x-4">
          <button
            onClick={handlePrint}
            className="flex-1 bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            Print
          </button>
          <button
            onClick={handleExportPDF}
            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Export PDF
          </button>
        </div>
      </div>
    </div>
  );
}
