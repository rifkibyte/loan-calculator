"use client";

import { useState, FormEvent, ChangeEvent } from "react";
import {
  CurrencyInput,
  YearInput,
  PercentInput,
  Button,
} from "@/components/ui/form";
import { parseToNumericString } from "@/utils/formatters";

// --- Interfaces ---
interface FormData {
  loanAmount: string;
  loanTerm: string;
  yearlyRates: { year: number; rate: string }[];
}

interface FormErrors {
  loanAmount?: string;
  loanTerm?: string;
  [key: string]: string | undefined; // Untuk error pada rate dinamis
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
      rate:
        i < 3
          ? "5"
          : i === 3
          ? "10"
          : i === 4
          ? "9"
          : i === 5
          ? "10"
          : i === 6
          ? "12"
          : i === 7
          ? "13"
          : i === 8
          ? "9"
          : "8",
    })),
  });
  const [errors, setErrors] = useState<FormErrors>({});

  // --- Event Handlers ---
  const handleLoanAmountChange = (value: string) => {
    setFormData((prev) => ({ ...prev, loanAmount: value }));
  };

  const handleLoanTermChange = (e: ChangeEvent<HTMLInputElement>) => {
    const termValue = parseInt(parseToNumericString(e.target.value), 10) || 0;
    const newTerm = termValue > 0 ? String(termValue) : "";

    setFormData((prev) => {
      const currentRates = prev.yearlyRates;
      const newRates = Array.from({ length: termValue }, (_, i) => {
        const year = i + 1;
        const existingRate = currentRates.find((r) => r.year === year);
        return {
          year: year,
          rate: existingRate ? existingRate.rate : "5", // Default rate 5%
        };
      });
      return { ...prev, loanTerm: newTerm, yearlyRates: newRates };
    });
  };

  const handleRateChange = (year: number, value: string) => {
    setFormData((prev) => ({
      ...prev,
      yearlyRates: prev.yearlyRates.map((r) =>
        r.year === year ? { ...r, rate: value } : r
      ),
    }));
  };

  // --- Validasi & Submit ---
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    const { loanAmount, loanTerm, yearlyRates } = formData;

    if (parseFloat(loanAmount) <= 0) {
      newErrors.loanAmount = "Jumlah pinjaman harus lebih dari nol.";
    }
    if (!Number.isInteger(parseFloat(loanTerm)) || parseFloat(loanTerm) <= 0) {
      newErrors.loanTerm = "Lama pinjaman harus bilangan bulat positif.";
    }

    yearlyRates.forEach((rate) => {
      if (
        rate.rate === "" ||
        isNaN(parseFloat(rate.rate.replace(",", "."))) ||
        parseFloat(rate.rate.replace(",", ".")) < 0
      ) {
        newErrors[
          `rate_${rate.year}`
        ] = `Bunga tahun ke-${rate.year} harus diisi dan positif.`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (validateForm()) {
      onCalculate({
        loanAmount: parseFloat(formData.loanAmount),
        loanTerm: parseInt(formData.loanTerm, 10),
        yearlyRates: formData.yearlyRates.map((r) => ({
          ...r,
          rate: parseFloat(r.rate.replace(",", ".")),
        })),
        calculationMethod: "Anuitas - Floating",
      });
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
      />

      <YearInput
        id="loanTerm"
        name="loanTerm"
        label="Lama Pinjaman"
        value={formData.loanTerm}
        onChange={handleLoanTermChange}
        error={errors.loanTerm}
        placeholder="10"
      />

      <div>
        <label className="block text-sm font-medium text-gray-900 mb-3">
          Bunga per Tahun
        </label>
        <div className="space-y-3 max-h-72 overflow-y-auto pr-2">
          {formData.yearlyRates.map((rate) => (
            <PercentInput
              key={rate.year}
              id={`rate_${rate.year}`}
              name={`rate_${rate.year}`}
              label={`Bunga tahun ke-${rate.year}`}
              value={rate.rate}
              onChange={(e) => handleRateChange(rate.year, e.target.value)}
              error={errors[`rate_${rate.year}`]}
              placeholder="5"
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
