"use client";

import { useState, useMemo, FormEvent, ChangeEvent } from "react";
import {
  CurrencyInput,
  PercentInput,
  YearInput,
  Input,
  Button,
} from "@/components/ui/form"; // Asumsi path komponen UI Anda

// --- Interface & Tipe Data ---

// Menyimpan semua data form dalam bentuk string, sesuai input dari user
interface FormData {
  carPrice: string;
  downPaymentPercent: string;
  loanTerm: string;
  interestRate: string;
}

// Tipe untuk menampung pesan error per-field
interface FormErrors {
  [key: string]: string | undefined;
}

// Tipe untuk prop, onCalculate akan menerima data yang sudah diubah menjadi angka
interface CarLoanSimpleFormProps {
  onCalculate: (formData: { [K in keyof FormData]: number }) => void;
}

// --- Komponen Form Utama ---

export default function CarLoanSimpleForm({
  onCalculate,
}: CarLoanSimpleFormProps) {
  // 1. State terpusat untuk semua data form
  const [formData, setFormData] = useState<FormData>({
    carPrice: "250000000",
    downPaymentPercent: "30",
    loanTerm: "5",
    interestRate: "4.8",
  });
  const [errors, setErrors] = useState<FormErrors>({});

  // 2. Handler generik untuk input standar (teks, angka, persen)
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handler khusus untuk CurrencyInput yang mengembalikan nilai string numerik
  const handleCurrencyChange = (value: string) => {
    setFormData((prev) => ({ ...prev, carPrice: value }));
  };

  // 3. Kalkulasi turunan menggunakan useMemo untuk efisiensi
  const { loanTermMonths, monthlyInterestRate } = useMemo(() => {
    const term = Number(formData.loanTerm) || 0;
    // Mengganti koma dengan titik untuk parsing desimal yang benar
    const rate = parseFloat(formData.interestRate.replace(",", ".")) || 0;
    return {
      loanTermMonths: term * 12,
      monthlyInterestRate: rate / 12,
    };
  }, [formData.loanTerm, formData.interestRate]);

  // 4. Logika validasi dan submit disesuaikan dengan state terpusat
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    const { carPrice, downPaymentPercent, loanTerm, interestRate } = formData;

    if (Number(carPrice) <= 0) {
      newErrors.carPrice = "Harga mobil harus berupa angka positif.";
    }
    if (Number(downPaymentPercent) <= 0 || Number(downPaymentPercent) >= 100) {
      newErrors.downPaymentPercent = "Persentase DP harus antara 1 dan 99.";
    }
    if (!Number.isInteger(Number(loanTerm)) || Number(loanTerm) <= 0) {
      newErrors.loanTerm = "Tenor harus berupa bilangan bulat positif.";
    }
    if (parseFloat(interestRate.replace(",", ".")) < 0) {
      newErrors.interestRate = "Suku bunga harus angka positif atau nol.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (validateForm()) {
      // Ubah semua state string menjadi number sebelum dikirim
      const numericData = {
        carPrice: Number(formData.carPrice),
        downPaymentPercent: Number(formData.downPaymentPercent),
        loanTerm: Number(formData.loanTerm),
        interestRate: parseFloat(formData.interestRate.replace(",", ".")),
      };
      onCalculate(numericData);
    }
  };

  // 5. Render JSX menggunakan komponen UI generik
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <CurrencyInput
        id="carPrice"
        name="carPrice"
        label="Harga Mobil OTR"
        value={formData.carPrice}
        onValueChange={handleCurrencyChange}
        error={errors.carPrice}
        placeholder="250.000.000"
      />

      <PercentInput
        id="downPaymentPercent"
        name="downPaymentPercent"
        label="Uang Muka (DP)"
        value={formData.downPaymentPercent}
        onChange={handleInputChange}
        error={errors.downPaymentPercent}
        placeholder="30"
        info="(persen dari harga OTR)"
      />

      <YearInput
        id="loanTerm"
        name="loanTerm"
        label="Tenor (jangka waktu)"
        value={formData.loanTerm}
        onChange={handleInputChange}
        error={errors.loanTerm}
        placeholder="5"
        info={`= ${loanTermMonths} bulan`}
      />

      <Input
        id="interestRate"
        name="interestRate"
        label="Bunga Pinjaman (Flat)"
        value={formData.interestRate}
        onChange={handleInputChange}
        error={errors.interestRate}
        unit="% / tahun"
        placeholder="4.8"
        inputMode="decimal"
        info={`= ${monthlyInterestRate.toFixed(3).replace(".", ",")}% / bulan`}
      />

      <Button type="submit" fullWidth>
        Hitung Simulasi
      </Button>
    </form>
  );
}
