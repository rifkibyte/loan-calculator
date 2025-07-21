"use client";

import { useState, FC, ReactNode } from "react";
// Menggunakan formatter yang sudah ditingkatkan dan lebih andal
import { formatCurrencyDisplay, formatPercent } from "@/utils/formatters";
import { CarLoanBudgetResult as LoanDetailsType } from "@/types/car-loan"; // Asumsi path tipe

// --- Tipe Properti ---
interface LoanResultProps {
  loanDetails: LoanDetailsType;
}

// --- Komponen Lokal untuk Mencegah Repetisi (Tanpa Mengubah Styling) ---
const DetailRow: FC<{
  label: ReactNode;
  value: string;
  isTotal?: boolean;
  totalColor?: string;
}> = ({ label, value, isTotal = false, totalColor = "text-gray-900" }) => (
  <div
    className={`flex justify-between ${isTotal ? "border-t pt-2 mt-2" : ""}`}
    // Menggunakan border color yang sesuai dengan parent
    style={{ borderColor: "currentColor" }}
  >
    <span className={isTotal ? "font-medium" : ""}>{label}</span>
    <span className={isTotal ? `font-bold ${totalColor}` : "font-medium"}>
      {value}
    </span>
  </div>
);

// --- Komponen Utama ---
export default function CarLoanBudgetResult({ loanDetails }: LoanResultProps) {
  const [activeTab, setActiveTab] = useState<"info" | "payment">("info");

  // Kalkulasi nilai turunan di satu tempat
  const {
    carPrice,
    downPaymentAmount,
    downPaymentPercent,
    loanTerm,
    interestRate,
    monthlyInterestRate,
    loanAmount,
    monthlyPrincipal,
    monthlyInterest,
    monthlyPayment,
    firstPayment,
  } = loanDetails;

  const loanTermInMonths = loanTerm * 12;
  // Menggunakan formatter persen yang sudah benar
  const monthlyInterestRateDisplay = formatPercent(monthlyInterestRate * 100);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Tab Navigation (Struktur dan styling tetap sama) */}
      <div className="flex border-b">
        <button
          className={`flex-1 py-3 px-4 text-center font-medium ${
            activeTab === "info"
              ? "bg-blue-50 text-blue-600 border-b-2 border-blue-600"
              : "text-gray-600"
          }`}
          onClick={() => setActiveTab("info")}
        >
          Informasi Pinjaman
        </button>
        <button
          className={`flex-1 py-3 px-4 text-center font-medium ${
            activeTab === "payment"
              ? "bg-blue-50 text-blue-600 border-b-2 border-blue-600"
              : "text-gray-600"
          }`}
          onClick={() => setActiveTab("payment")}
        >
          Pembayaran
        </button>
      </div>

      {/* Konten Tab */}
      <div className="p-6">
        {activeTab === "info" && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Informasi Pinjaman Anda
            </h2>

            {/* Grid Info Utama (Struktur tetap, kode lebih bersih) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Harga Mobil OTR:</p>
                <p className="text-lg font-bold text-gray-900">
                  {formatCurrencyDisplay(carPrice)}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Uang Muka (DP):</p>
                <p className="text-lg font-bold text-gray-900">
                  {formatCurrencyDisplay(downPaymentAmount)}
                  <span className="text-sm font-normal text-gray-500 ml-1">
                    ({downPaymentPercent}%)
                  </span>
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Tenor:</p>
                <p className="text-lg font-bold text-gray-900">
                  {loanTerm} tahun
                  <span className="text-sm font-normal text-gray-500 ml-1">
                    ({loanTermInMonths} bulan)
                  </span>
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Bunga (Flat):</p>
                <p className="text-lg font-bold text-gray-900">
                  {String(interestRate).replace(".", ",")}% / tahun
                  <span className="text-sm font-normal text-gray-500 ml-1">
                    ({monthlyInterestRateDisplay} / bulan)
                  </span>
                </p>
              </div>
            </div>

            {/* Kotak Plafon Pinjaman (Struktur tetap, kode lebih bersih) */}
            <div className="bg-blue-50 p-4 rounded-lg text-blue-200">
              <h3 className="font-semibold text-gray-900 mb-3">
                Plafon Pinjaman Anda
              </h3>
              <div className="space-y-2 text-gray-900">
                <DetailRow
                  label="Harga Mobil OTR:"
                  value={formatCurrencyDisplay(carPrice)}
                />
                <DetailRow
                  label="Uang Muka (DP):"
                  value={`- ${formatCurrencyDisplay(downPaymentAmount)}`}
                />
                <DetailRow
                  label="Plafon Pinjaman Anda:"
                  value={formatCurrencyDisplay(loanAmount)}
                  isTotal={true}
                  totalColor="text-blue-700"
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === "payment" && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Informasi Pembayaran
            </h2>

            {/* Kotak Angsuran (Struktur tetap, kode lebih bersih) */}
            <div className="bg-green-50 p-4 rounded-lg text-green-200">
              <h3 className="font-semibold text-gray-900 mb-3">
                Angsuran per Bulan
              </h3>
              <div className="space-y-2 text-gray-900">
                <DetailRow
                  label="Angsuran Pokok per Bulan:"
                  value={formatCurrencyDisplay(monthlyPrincipal)}
                />
                <DetailRow
                  label="Angsuran Bunga per Bulan:"
                  value={formatCurrencyDisplay(monthlyInterest)}
                />
                <DetailRow
                  label="Total Angsuran per Bulan:"
                  value={formatCurrencyDisplay(monthlyPayment)}
                  isTotal={true}
                  totalColor="text-green-700"
                />
              </div>
            </div>

            {/* Kotak Pembayaran Pertama (Struktur tetap, kode lebih bersih) */}
            <div className="bg-purple-50 p-4 rounded-lg text-purple-200">
              <h3 className="font-semibold text-gray-900 mb-3">
                Pembayaran Pertama Kali
              </h3>
              <div className="space-y-2 text-gray-900">
                <DetailRow
                  label="Uang Muka (DP):"
                  value={formatCurrencyDisplay(downPaymentAmount)}
                />
                <DetailRow
                  label="Angsuran Pertama:"
                  value={formatCurrencyDisplay(monthlyPayment)}
                />
                <DetailRow
                  label="Total Pembayaran Pertama:"
                  value={formatCurrencyDisplay(firstPayment)}
                  isTotal={true}
                  totalColor="text-purple-700"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
