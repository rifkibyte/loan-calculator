// file: src/features/mortgage/house-price/MortgageHousePriceForm.tsx (Perbaikan Final)
"use client";

import { useState, FormEvent } from "react";
import { MortgageHousePriceFormData } from "@/types/mortgage-house-price";

// 1. Impor komponen-komponen DARI DIREKTORI ANDA
import {
  CurrencyInput,
  PercentInput,
  YearInput,
  Button,
} from "@/components/ui/form";

// 2. Definisikan props yang benar (ini tidak berubah dan sudah tepat)
interface MortgageHousePriceFormProps {
  onCalculate: (data: MortgageHousePriceFormData) => void;
}

export function MortgageHousePriceForm({
  onCalculate,
}: MortgageHousePriceFormProps) {
  // 3. Gunakan React State standar untuk mengelola data form, bukan react-hook-form
  const [formData, setFormData] = useState<MortgageHousePriceFormData>({
    housePrice: 500000000,
    downPaymentPercent: 20,
    loanTerm: 15,
    annualInterestRate: 5.5,
    calculationMethod: "anuitas",
  });

  // Handler untuk memperbarui state
  const handleValueChange = (
    field: keyof MortgageHousePriceFormData,
    value: string | number
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: typeof prev[field] === "number" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault(); // Mencegah reload halaman
    onCalculate(formData); // Mengirim data ke controller
  };

  return (
    // 4. Gunakan tag <form> biasa dan panggil handleSubmit saat di-submit
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* 
        Gunakan komponen-komponen custom Anda.
        Perhatikan `onValueChange` untuk CurrencyInput dan `onChange` untuk yang lain,
        disesuaikan dengan bagaimana Anda membuat komponen tersebut.
      */}
      <CurrencyInput
        id="housePrice"
        name="housePrice"
        label="Harga Rumah"
        value={String(formData.housePrice)}
        onValueChange={(value) => handleValueChange("housePrice", value)}
        placeholder="Contoh: 500000000"
      />

      <PercentInput
        id="downPaymentPercent"
        name="downPaymentPercent"
        label="Uang Muka (DP)"
        value={formData.downPaymentPercent}
        onChange={(e) =>
          handleValueChange("downPaymentPercent", e.target.value)
        }
        placeholder="Contoh: 20"
      />

      <YearInput
        id="loanTerm"
        name="loanTerm"
        label="Jangka Waktu Pinjaman"
        value={formData.loanTerm}
        onChange={(e) => handleValueChange("loanTerm", e.target.value)}
        placeholder="Contoh: 15"
      />

      <PercentInput
        id="annualInterestRate"
        name="annualInterestRate"
        label="Suku Bunga Tahunan"
        value={formData.annualInterestRate}
        onChange={(e) =>
          handleValueChange("annualInterestRate", e.target.value)
        }
        placeholder="Contoh: 5.5"
      />

      {/* Karena Anda tidak punya komponen Select, kita gunakan select HTML standar */}
      <div>
        <label
          htmlFor="calculationMethod"
          className="block text-sm font-medium text-gray-900 mb-1"
        >
          Metode Perhitungan
        </label>
        <select
          id="calculationMethod"
          name="calculationMethod"
          value={formData.calculationMethod}
          onChange={(e) =>
            handleValueChange("calculationMethod", e.target.value)
          }
          className="w-full py-2 pl-3 pr-10 text-gray-900 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300"
        >
          <option value="anuitas">Anuitas</option>
          <option value="flat">Flat</option>
        </select>
      </div>

      <Button type="submit" fullWidth>
        Hitung Simulasi
      </Button>
    </form>
  );
}
