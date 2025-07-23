// features/mortgage/fixed/MortgageFixedForm.tsx (Corrected)
"use client";

import { useState, FormEvent } from "react";
import { Button, CurrencyInput, Input } from "@/components/ui/form";
import { formatCurrencyDisplay, parseLocaleNumber } from "@/utils/formatters";

// --- Interface & Tipe ---

interface YearlyRate {
  year: number;
  rate: string; // Gunakan string untuk input form
}

interface FormData {
  loanAmount: string;
  loanTerm: string;
  yearlyRates: YearlyRate[];
}

interface FormErrors {
  [key: string]: string | undefined;
}

interface MortgageFixedFormProps {
  onCalculate: (data: {
    loanAmount: number;
    loanTerm: number;
    yearlyRates: { year: number; rate: number }[];
    calculationMethod: string;
  }) => void;
}

// --- Komponen Form Utama ---

export default function MortgageFixedForm({
  onCalculate,
}: MortgageFixedFormProps) {
  const [formData, setFormData] = useState<FormData>({
    loanAmount: "500000000",
    loanTerm: "10",
    yearlyRates: Array.from({ length: 10 }, (_, i) => ({
      year: i + 1,
      rate: i < 3 ? "5" : "10", // Contoh rate awal
    })),
  });
  const [errors, setErrors] = useState<FormErrors>({});

  // --- Event Handlers ---

  const handleLoanAmountChange = (value: string) => {
    setFormData((prev) => ({ ...prev, loanAmount: value }));
  };

  const handleLoanTermChange = (value: string) => {
    // Pastikan hanya angka yang diproses
    const termValue = parseInt(value.replace(/[^\d]/g, ""), 10) || 0;
    const currentRates = formData.yearlyRates;

    setFormData((prev) => {
      const newRates: YearlyRate[] = [];
      for (let i = 1; i <= termValue; i++) {
        const existingRate = currentRates.find((r) => r.year === i);
        newRates.push({
          year: i,
          rate: existingRate ? existingRate.rate : "5", // Default rate 5%
        });
      }
      return { ...prev, loanTerm: String(termValue), yearlyRates: newRates };
    });
  };

  const handleRateChange = (year: number, rate: string) => {
    setFormData((prev) => ({
      ...prev,
      yearlyRates: prev.yearlyRates.map((r) =>
        r.year === year ? { ...r, rate } : r
      ),
    }));
  };

  // --- Validasi & Submit ---

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    const { loanAmount, loanTerm, yearlyRates } = formData;

    if (parseLocaleNumber(loanAmount) <= 0) {
      newErrors.loanAmount = "Jumlah pinjaman harus angka positif.";
    }
    if (
      !Number.isInteger(parseLocaleNumber(loanTerm)) ||
      parseLocaleNumber(loanTerm) <= 0
    ) {
      newErrors.loanTerm = "Lama pinjaman harus bilangan bulat positif.";
    }

    yearlyRates.forEach((rateItem, index) => {
      if (parseLocaleNumber(rateItem.rate) < 0) {
        newErrors[
          `rate_${index}`
        ] = `Bunga tahun ke-${rateItem.year} tidak boleh negatif.`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (validateForm()) {
      // Konversi state string ke format numerik untuk kalkulasi
      const numericData = {
        loanAmount: parseLocaleNumber(formData.loanAmount),
        loanTerm: parseLocaleNumber(formData.loanTerm),
        yearlyRates: formData.yearlyRates.map((r) => ({
          year: r.year,
          rate: parseLocaleNumber(r.rate),
        })),
        calculationMethod: "Anuitas - Floating",
      };
      onCalculate(numericData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <CurrencyInput
        id="loanAmount"
        name="loanAmount"
        label="Jumlah Pinjaman"
        value={formData.loanAmount}
        onValueChange={handleLoanAmountChange}
        error={errors.loanAmount}
        placeholder="500.000.000"
        info={formatCurrencyDisplay(formData.loanAmount)}
      />

      <div>
        <label className="block text-sm font-medium text-gray-900 mb-1">
          Lama Pinjaman
        </label>
        <div className="flex items-center space-x-2">
          <button
            type="button"
            onClick={() =>
              handleLoanTermChange(
                String(Math.max(1, parseInt(formData.loanTerm, 10) - 1))
              )
            }
            className="px-3 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            -
          </button>
          <div className="flex-1">
            <Input
              id="loanTerm"
              name="loanTerm"
              label=""
              value={formData.loanTerm}
              onChange={(e) => handleLoanTermChange(e.target.value)}
              error={errors.loanTerm}
              unit="tahun"
              inputMode="numeric"
            />
          </div>
          <button
            type="button"
            onClick={() =>
              handleLoanTermChange(String(parseInt(formData.loanTerm, 10) + 1))
            }
            className="px-3 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            +
          </button>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-900 mb-3">
          Bunga per Tahun (Floating)
        </label>
        <div className="space-y-3 max-h-72 overflow-y-auto pr-2">
          {formData.yearlyRates.map((rate, index) => (
            <Input
              key={rate.year}
              id={`rate_${index}`}
              name={`rate_${index}`}
              label={`Bunga tahun ke-${rate.year}`}
              value={rate.rate}
              onChange={(e) => handleRateChange(rate.year, e.target.value)}
              unit="%"
              inputMode="decimal"
              error={errors[`rate_${index}`]}
            />
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between pt-2">
        <label className="text-sm font-medium text-gray-900">
          Perhitungan Bunga:
        </label>
        <p className="text-sm font-medium text-gray-900">Anuitas - Floating</p>
      </div>

      <Button type="submit">Hitung Simulasi</Button>
    </form>
  );
}
