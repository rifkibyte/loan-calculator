"use client";

import { useState } from "react";
import { MultiPurposeLoanForm, MultiPurposeLoanResult, MultiPurposeLoanSchedule } from "@/components/other-kredit/multi-purpose-loan";
import { Header, Footer } from "@/components/common";
import { calculateMultiPurposeLoan } from "@/utils/calculators/other-kredit/multiPurposeLoanCalculator";
import { AmortizationItem } from "@/types/common";
import { MultiPurposeLoanResult as LoanDetails } from "@/types/multi-purpose-loan";

// Interface for form data
interface FormData {
  loanAmount: number;
  loanTerm: number;
  interestRate: number;
  variableRate: number;
  fixedRatePeriod: number;
  applicantType: 'employee' | 'professional' | 'entrepreneur';
  provisionPercent: number;
  adminFee: number;
}

export default function MultiPurposeLoanPage(): JSX.Element {
  const [loanDetails, setLoanDetails] = useState<LoanDetails | null>(null);
  const [schedule, setSchedule] = useState<AmortizationItem[]>([]);
  const [showResults, setShowResults] = useState<boolean>(false);

  // Handle form calculation
  const handleCalculate = (formData: FormData): void => {
    const calculationResult = calculateMultiPurposeLoan(
      formData.loanAmount,
      formData.loanTerm,
      formData.interestRate,
      formData.variableRate,
      formData.fixedRatePeriod,
      formData.provisionPercent,
      formData.adminFee
    );
    
    setLoanDetails({
      loanAmount: formData.loanAmount,
      loanTerm: formData.loanTerm,
      interestRate: formData.interestRate,
      variableRate: formData.variableRate,
      fixedRatePeriod: formData.fixedRatePeriod,
      applicantType: formData.applicantType,
      monthlyPayment: calculationResult.monthlyPayment,
      monthlyPrincipal: calculationResult.monthlyPrincipal,
      monthlyInterest: calculationResult.monthlyInterest,
      totalPayment: calculationResult.totalPayment,
      totalInterest: calculationResult.totalInterest,
      provisionPercent: formData.provisionPercent,
      provisionAmount: calculationResult.provisionAmount,
      adminFee: formData.adminFee,
      firstPayment: calculationResult.firstPayment,
      amortizationSchedule: calculationResult.amortizationSchedule
    });
    
    setSchedule(calculationResult.amortizationSchedule);
    setShowResults(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <div className="container mx-auto py-8 px-4 flex-grow">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-600 mb-2">
            Kalkulator Kredit Multi Guna Bank Mandiri
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Simulasi kredit multi guna dengan suku bunga kompetitif mulai dari 6.00% fix 3 tahun pertama. 
            Dapatkan perhitungan angsuran yang akurat untuk perencanaan keuangan Anda.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 bg-white p-6 rounded-lg shadow-md">
            <MultiPurposeLoanForm onCalculate={handleCalculate} />
          </div>
          
          <div className="lg:col-span-2">
            {showResults && loanDetails && (
              <div className="space-y-6">
                <MultiPurposeLoanResult loanDetails={loanDetails} />
                <MultiPurposeLoanSchedule 
                  schedule={schedule} 
                  fixedRatePeriod={loanDetails.fixedRatePeriod}
                />
              </div>
            )}
          </div>
        </div>

        {/* Disclaimer Section */}
        <div className="mt-12 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-yellow-800 mb-3">
            ⚠️ Disclaimer
          </h3>
          <div className="text-sm text-yellow-700 space-y-2">
            <p>
              • Simulasi ini hanya untuk keperluan ilustrasi dan bukan merupakan penawaran resmi dari Bank Mandiri.
            </p>
            <p>
              • Suku bunga dapat berubah sewaktu-waktu sesuai dengan kebijakan bank dan kondisi pasar.
            </p>
            <p>
              • Persetujuan kredit tergantung pada hasil analisis kelayakan dan kebijakan bank.
            </p>
            <p>
              • Untuk informasi lebih lanjut dan penawaran resmi, silakan hubungi Call Center Bank Mandiri di 14000 atau kunjungi cabang terdekat.
            </p>
            <p>
              • Syarat dan ketentuan berlaku sesuai dengan kebijakan Bank Mandiri.
            </p>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Suku Bunga Kompetitif</h3>
            <p className="text-sm text-gray-600">
              Mulai dari 6.00% fix untuk 3 tahun pertama dengan minimum tenor 7 tahun
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Limit Besar</h3>
            <p className="text-sm text-gray-600">
              Hingga Rp 10 milyar untuk Pegawai/Profesional, Rp 200 juta untuk Wiraswasta
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a4 4 0 118 0v4m-4 8a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Tenor Fleksibel</h3>
            <p className="text-sm text-gray-600">
              Hingga 15 tahun untuk Pegawai, 10 tahun Profesional, 7 tahun Wiraswasta
            </p>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
