// src/features/personal-loan/online/PersonalLoanOnlineForm.tsx
"use client";

import { useState, useMemo, FormEvent, ChangeEvent } from "react";
import {
  CurrencyInput,
  YearInput,
  Input,
  Button,
} from "@/components/ui/form";
import { parseLocaleNumber } from "@/utils/formatters";

// --- Interface & Tipe ---
interface FormData {
  loanAmount: string;     // Jumlah pinjaman
  interestRate: string;   // Suku bunga per BULAN
  loanTerm: string;       // Tenor dalam TAHUN
}

interface FormErrors {
  [key: string]: string | undefined;
}

interface LoanFormProps {
  onCalculate: (data: { [K in keyof FormData]: number }) => void;
}

// --- Komponen Form Utama ---
export default function PersonalLoanOnlineForm({ onCalculate }: LoanFormProps) {
  const [formData, setFormData] = useState<FormData>({
    loanAmount: "3000000", // Contoh jumlah pinjaman online yang umum
    interestRate: "2.5",   // Contoh bunga per bulan
    loanTerm: "1",         // Contoh tenor dalam 1 tahun
  });
  const [errors, setErrors] = useState<FormErrors>({});

  // --- Kalkulasi turunan dengan useMemo ---
  // Hanya menghitung total bulan untuk ditampilkan sebagai info
  const loanTermMonths = useMemo(() => {
    const termInYears = parseLocaleNumber(formData.loanTerm) || 0;
    return termInYears * 12;
  }, [formData.loanTerm]);

  // --- Event Handlers ---
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAmountChange = (value: string) => {
    setFormData((prev) => ({ ...prev, loanAmount: value }));
  };

  // --- Validasi & Submit ---
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    const { loanAmount, interestRate, loanTerm } = formData;

    if (parseLocaleNumber(loanAmount) <= 0) {
      newErrors.loanAmount = "Jumlah pinjaman harus lebih dari 0.";
    }
    if (parseLocaleNumber(interestRate) <= 0) {
      newErrors.interestRate = "Suku bunga harus lebih dari 0.";
    }
    if (parseLocaleNumber(loanTerm) <= 0) {
      newErrors.loanTerm = "Jangka waktu harus lebih dari 0.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (validateForm()) {
      const numericData = {
        loanAmount: parseLocaleNumber(formData.loanAmount),
        interestRate: parseLocaleNumber(formData.interestRate), // Nilai ini sudah per bulan
        loanTerm: parseLocaleNumber(formData.loanTerm),
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
        onValueChange={handleAmountChange}
        error={errors.loanAmount}
        placeholder="3.000.000"
      />

      <Input
        id="interestRate"
        name="interestRate"
        label="Bunga Pinjaman (flat) per Bulan"
        value={formData.interestRate}
        onChange={handleInputChange}
        error={errors.interestRate}
        unit="% / bulan"
        placeholder="2.5"
        inputMode="decimal"
        // Info text dihilangkan karena input sudah sesuai (per bulan)
      />

      <YearInput
        id="loanTerm"
        name="loanTerm"
        label="Tenor (Jangka Waktu)"
        value={formData.loanTerm}
        onChange={handleInputChange}
        error={errors.loanTerm}
        placeholder="1"
        info={`= ${loanTermMonths} bulan`}
      />

      <Button type="submit" fullWidth>
        Hitung Angsuran
      </Button>
    </form>
  );
}
