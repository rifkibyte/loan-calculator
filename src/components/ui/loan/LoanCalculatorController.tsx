"use client";

import { useState, ReactNode } from "react";
import ResultsPlaceholder from "./ResultsPlaceholder"; // Impor komponen placeholder kita

// Menggunakan Generics <TFormInput, TLoanDetails> agar fleksibel untuk semua tipe data
interface LoanCalculatorControllerProps<TFormInput, TLoanDetails> {
  pageTitle: string;
  pageDescription: string;
  // Menerima komponen Form, yang harus memiliki prop onCalculate
  FormComponent: React.ComponentType<{ onCalculate: (data: TFormInput) => void }>;
  // Menerima fungsi yang menangani seluruh logika kalkulasi dan pembentukan data
  performCalculation: (formData: TFormInput) => TLoanDetails;
  // Menggunakan "render prop" untuk menampilkan hasil, memberikan fleksibilitas maksimum
  children: (loanDetails: TLoanDetails) => ReactNode;
}

export default function LoanCalculatorController<TFormInput, TLoanDetails>({
  pageTitle,
  pageDescription,
  FormComponent,
  performCalculation,
  children,
}: LoanCalculatorControllerProps<TFormInput, TLoanDetails>) {
  // State management sekarang ada di sini
  const [loanDetails, setLoanDetails] = useState<TLoanDetails | null>(null);

  // Logika handler sekarang ada di sini
  const handleCalculate = (formData: TFormInput) => {
    const result = performCalculation(formData);
    setLoanDetails(result);
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Judul dan deskripsi halaman di-render dari props */}
      <h1 className="text-3xl lg:text-4xl font-bold text-center text-gray-800 mb-2">
        {pageTitle}
      </h1>
      <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
        {pageDescription}
      </p>

      {/* Layout grid sekarang menjadi bagian dari komponen ini */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 bg-white p-6 rounded-lg shadow-lg h-fit">
          {/* Komponen Form dirender dari props */}
          <FormComponent onCalculate={handleCalculate} />
        </div>

        <div className="lg:col-span-2">
          {/* Logika kondisional sekarang ada di sini */}
          {loanDetails ? (
            <div className="space-y-8">
              {/* Hasil dirender menggunakan pola "render prop" */}
              {children(loanDetails)}
            </div>
          ) : (
            <ResultsPlaceholder />
          )}
        </div>
      </div>
    </div>
  );
}
