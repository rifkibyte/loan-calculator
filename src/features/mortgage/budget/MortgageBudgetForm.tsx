// src/components/mortgage/budget/MortgageBudgetForm.tsx
"use client";

import { useState, useMemo, FormEvent, ChangeEvent } from "react";
import {
  Button,
  CurrencyInput,
  Input,
  PercentInput,
  YearInput,
} from "@/components/ui/form";
import { parseLocaleNumber } from "@/utils/formatters"; // Impor parser dari utils

// --- Interface & Tipe ---

// 1. Definisikan state form sebagai satu objek
interface FormData {
  monthlyBudget: string;
  downPaymentPercent: string;
  loanTerm: string;
  annualInterestRate: string;
  installmentPercent: string;
  provisionPercent: string;
  adminPercent: string;
}

interface FormErrors {
  [key: string]: string | undefined;
}

// 2. Definisikan props, pastikan onCalculate menerima angka
interface MortgageBudgetFormProps {
  onCalculate: (data: { [K in keyof FormData]: number }) => void;
}

// --- Komponen Form Utama ---
export default function MortgageBudgetForm({
  onCalculate,
}: MortgageBudgetFormProps) {
  // 3. Gunakan satu state object untuk semua data form
  const [formData, setFormData] = useState<FormData>({
    monthlyBudget: "5000000",
    downPaymentPercent: "20",
    loanTerm: "15",
    annualInterestRate: "14.6",
    installmentPercent: "30",
    provisionPercent: "1",
    adminPercent: "0.1",
  });
  const [errors, setErrors] = useState<FormErrors>({});

  // 4. Gunakan useMemo untuk kalkulasi turunan agar efisien
  const { loanTermMonths, monthlyInterestRate } = useMemo(() => {
    const term = parseLocaleNumber(formData.loanTerm);
    const rate = parseLocaleNumber(formData.annualInterestRate);
    return {
      loanTermMonths: term * 12,
      monthlyInterestRate: rate / 12,
    };
  }, [formData.loanTerm, formData.annualInterestRate]);

  // --- Event Handlers ---

  // 5. Satu handler untuk semua input standar (non-currency)
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handler khusus untuk CurrencyInput yang nilainya sudah di-parse
  const handleBudgetChange = (value: string) => {
    setFormData((prev) => ({ ...prev, monthlyBudget: value }));
  };

  // --- Validasi & Submit ---
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    const {
      monthlyBudget,
      downPaymentPercent,
      loanTerm,
      annualInterestRate,
      installmentPercent,
      provisionPercent,
      adminPercent,
    } = formData;

    // Gunakan parseLocaleNumber untuk validasi yang akurat
    if (parseLocaleNumber(monthlyBudget) <= 0)
      newErrors.monthlyBudget = "Budget angsuran harus angka positif.";
    if (
      parseLocaleNumber(downPaymentPercent) <= 0 ||
      parseLocaleNumber(downPaymentPercent) >= 100
    )
      newErrors.downPaymentPercent = "Uang muka harus antara 1-99%.";
    if (
      !Number.isInteger(parseLocaleNumber(loanTerm)) ||
      parseLocaleNumber(loanTerm) <= 0
    )
      newErrors.loanTerm = "Tenor harus bilangan bulat positif.";
    if (parseLocaleNumber(annualInterestRate) < 0)
      newErrors.annualInterestRate = "Suku bunga tidak boleh negatif.";
    if (
      parseLocaleNumber(installmentPercent) <= 0 ||
      parseLocaleNumber(installmentPercent) > 100
    )
      newErrors.installmentPercent = "Persentase angsuran harus antara 1-100.";
    if (parseLocaleNumber(provisionPercent) < 0)
      newErrors.provisionPercent = "Provisi tidak boleh negatif.";
    if (parseLocaleNumber(adminPercent) < 0)
      newErrors.adminPercent = "Administrasi tidak boleh negatif.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (validateForm()) {
      // 6. Konversi semua state string ke angka sebelum dikirim
      const numericData = Object.fromEntries(
        Object.entries(formData).map(([key, value]) => [
          key,
          parseLocaleNumber(value), // Gunakan parser yang konsisten
        ])
      ) as { [K in keyof FormData]: number };
      onCalculate(numericData);
    }
  };

  // --- Render JSX ---
  return (
    // 7. Gunakan komponen UI yang sudah dibuat
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900 -mb-2">
        Data Simulasi
      </h2>

      <CurrencyInput
        id="monthlyBudget"
        name="monthlyBudget"
        label="Budget Angsuran (per bulan)"
        value={formData.monthlyBudget}
        onValueChange={handleBudgetChange}
        error={errors.monthlyBudget}
        placeholder="5.000.000"
        info="Masukkan budget maksimal untuk angsuran bulanan Anda."
      />

      <PercentInput
        id="downPaymentPercent"
        name="downPaymentPercent"
        label="Uang Muka (DP)"
        value={formData.downPaymentPercent}
        onChange={handleInputChange}
        error={errors.downPaymentPercent}
        placeholder="20"
        info="(persen dari harga rumah)"
      />

      <YearInput
        id="loanTerm"
        name="loanTerm"
        label="Tenor (jangka waktu)"
        value={formData.loanTerm}
        onChange={handleInputChange}
        error={errors.loanTerm}
        placeholder="15"
        info={`= ${loanTermMonths} bulan`}
      />

      <Input
        id="annualInterestRate"
        name="annualInterestRate"
        label="Bunga Pinjaman"
        value={formData.annualInterestRate}
        onChange={handleInputChange}
        error={errors.annualInterestRate}
        unit="% / tahun"
        placeholder="14.6"
        inputMode="decimal"
        info={`= ${monthlyInterestRate.toFixed(3)}% / bulan`}
      />

      <PercentInput
        id="installmentPercent"
        name="installmentPercent"
        label="Rasio Angsuran"
        value={formData.installmentPercent}
        onChange={handleInputChange}
        error={errors.installmentPercent}
        placeholder="30"
        info="(persen dari total penghasilan bersih bulanan)"
      />

      <div>
        <label className="block text-sm font-medium text-gray-900 mb-1">
          Perhitungan Bunga
        </label>
        <div className="bg-gray-100 p-2 rounded-md border border-gray-200">
          <span className="text-gray-800 text-sm font-medium">Anuitas</span>
        </div>
      </div>

      <div className="border-t border-gray-200 pt-4 space-y-4">
        <h3 className="font-medium text-gray-900 -mb-2">Biaya Bank Tambahan</h3>
        <PercentInput
          id="provisionPercent"
          name="provisionPercent"
          label="Biaya Provisi"
          value={formData.provisionPercent}
          onChange={handleInputChange}
          error={errors.provisionPercent}
          placeholder="1"
          info="(persen dari total pinjaman/plafon)"
        />
        <PercentInput
          id="adminPercent"
          name="adminPercent"
          label="Biaya Administrasi"
          value={formData.adminPercent}
          onChange={handleInputChange}
          error={errors.adminPercent}
          placeholder="0.1"
          info="(persen dari total pinjaman/plafon)"
        />
      </div>

      <Button type="submit" fullWidth>
        Hitung Simulasi
      </Button>
    </form>
  );
}
