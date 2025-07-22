Tolong refactor code ini supaya mengikuti referensi, untuk interface dan types gausah menggunakan import jadi jangan dari external seperti di referensi

kode saya:
"use client";

import { useState } from "react";
import {
CarLoanSimpleForm,
CarLoanSimpleResult,
CarLoanSimpleSchedule,
} from "@/features/car-loan/simple";
import { Header, Footer } from "@/components/layout";
import { calculateSimpleLoan } from "@/utils/calculators/car-loan/simpleCalculator";
import { AmortizationItem } from "@/types/common";
import { CarLoanSimpleResult as SimpleLoanDetails } from "@/types/car-loan";

// Interface for form data
interface FormData {
carPrice: number;
downPaymentPercent: number;
loanTerm: number;
interestRate: number;
}

export default function CarLoanSimplePage() {
const [loanDetails, setLoanDetails] = useState<SimpleLoanDetails | null>(
null
);
const [schedule, setSchedule] = useState<AmortizationItem[]>([]);
const [showResults, setShowResults] = useState<boolean>(false);

// Handle form calculation
const handleCalculate = (formData: FormData): void => {
const calculationResult = calculateSimpleLoan(
formData.carPrice,
formData.downPaymentPercent,
formData.loanTerm,
formData.interestRate
);

    setLoanDetails({
      carPrice: formData.carPrice,
      downPaymentPercent: formData.downPaymentPercent,
      downPaymentAmount:
        formData.carPrice * (formData.downPaymentPercent / 100),
      loanTerm: formData.loanTerm,
      interestRate: formData.interestRate,
      monthlyInterestRate: formData.interestRate / 12,
      loanAmount: calculationResult.loanAmount,
      monthlyPayment: calculationResult.monthlyPayment,
      monthlyPrincipal: calculationResult.monthlyPrincipal,
      monthlyInterest: calculationResult.monthlyInterest,
      totalPayment: calculationResult.totalPayment,
      totalInterest: calculationResult.totalInterest,
      firstPayment: calculationResult.firstPayment,
      amortizationSchedule: calculationResult.amortizationSchedule,
    });

    setSchedule(calculationResult.amortizationSchedule);
    setShowResults(true);

};

return (
<div className="min-h-screen bg-gray-50 flex flex-col">
<Header />

      <div className="container mx-auto py-8 px-4 flex-grow">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">
          Simulasi Kredit Mobil Sederhana
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 bg-white p-6 rounded-lg shadow-md">
            <CarLoanSimpleForm onCalculate={handleCalculate} />
          </div>

          <div className="lg:col-span-2">
            {showResults && loanDetails && (
              <div className="space-y-6">
                <CarLoanSimpleResult loanDetails={loanDetails} />
                <CarLoanSimpleSchedule
                  schedule={schedule}
                  totalInterest={loanDetails.totalInterest}
                  totalPrincipal={loanDetails.loanAmount}
                  totalPayment={loanDetails.totalPayment}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>

);
}

referensi

"use client";

// Impor untuk fitur spesifik (Budget)
import {
CarLoanBudgetForm,
CarLoanBudgetResult,
CarLoanBudgetSchedule,
} from "@/features/car-loan/budget";
import { calculateLoanFromBudget } from "@/utils/calculators/car-loan/budgetCalculator";
import { CarLoanBudgetResult as LoanDetails } from "@/types/car-loan";

// Impor untuk layout dan komponen reusable baru kita
import { Header, Footer } from "@/components/layout";
import { LoanCalculatorController } from "@/components/ui/loan";
interface CarLoanBudgetFormInput {
budget: number;
downPaymentPercent: number;
loanTerm: number;
interestRate: number;
}

export default function CarLoanBudgetPage() {
// 1. Logika kalkulasi dan transformasi data diekstrak ke fungsi murni.
// Fungsi ini akan kita teruskan sebagai prop ke controller.
const performBudgetCalculation = (
formData: CarLoanBudgetFormInput
): LoanDetails => {
const { budget, downPaymentPercent, loanTerm, interestRate } = formData;
const calculationResult = calculateLoanFromBudget(
budget,
downPaymentPercent,
loanTerm,
interestRate
);

    // Menggabungkan hasil kalkulasi dengan data dari form untuk membentuk objek state akhir
    return {
      ...calculationResult,
      downPaymentPercent,
      loanTerm,
      interestRate,
      monthlyInterestRate: interestRate / 12 / 100,
      monthlyPayment: budget,
    };

};

return (
<div className="min-h-screen bg-gray-50 flex flex-col">
<Header />
<main className="container mx-auto py-10 px-4 flex-grow">
{/_ 2. Gunakan controller reusable. Semua state dan layout ada di dalamnya. _/}
<LoanCalculatorController
          pageTitle="Kalkulator KKB Berdasarkan Budget"
          pageDescription="Masukkan budget angsuran bulanan Anda untuk mengetahui estimasi harga mobil yang bisa Anda dapatkan."
          FormComponent={CarLoanBudgetForm}
          performCalculation={performBudgetCalculation}
        >
{/_ 3. Gunakan pola "render prop" untuk mendefinisikan bagaimana hasil ditampilkan _/}
{(loanDetails) => (
<>
<CarLoanBudgetResult loanDetails={loanDetails} />
<CarLoanBudgetSchedule loanDetails={loanDetails} />
</>
)}
</LoanCalculatorController>
</main>
<Footer />
</div>
);
}

LoanCalculatorController.tsx
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
{/_ Judul dan deskripsi halaman di-render dari props _/}
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
