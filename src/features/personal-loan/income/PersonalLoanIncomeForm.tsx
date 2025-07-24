"use client";

import { useState, useMemo, FormEvent, ChangeEvent } from "react";
import {
  CurrencyInput,
  PercentInput,
  Input,
  Button,
} from "@/components/ui/form";
import { formatPercent, parseLocaleNumber } from "@/utils/formatters";

// --- Interfaces & Types ---
interface FormData {
  netIncome: string;
  creditRatio: string;
  otherInstallments: string;
  monthlyInterestRate: string;
}

interface FormErrors {
  netIncome?: string;
  creditRatio?: string;
  otherInstallments?: string;
  monthlyInterestRate?: string;
}

interface PersonalLoanLimitFormProps {
  onCalculate: (data: { [K in keyof FormData]: number }) => void;
}

// --- Main Form Component ---
export default function PersonalLoanLimitForm({
  onCalculate,
}: PersonalLoanLimitFormProps) {
  // --- State ---
  const [formData, setFormData] = useState<FormData>({
    netIncome: "5500000",
    creditRatio: "30",
    otherInstallments: "1250000",
    monthlyInterestRate: "1.25",
  });
  const [errors, setErrors] = useState<FormErrors>({});

  // --- Derived Calculations with useMemo ---
  const annualInterestRate = useMemo(() => {
    const monthlyRate = parseLocaleNumber(formData.monthlyInterestRate);
    return isNaN(monthlyRate) ? 0 : monthlyRate * 12;
  }, [formData.monthlyInterestRate]);

  // --- Event Handlers ---
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCurrencyChange = (name: keyof FormData) => (value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // --- Validation & Submit ---
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    const { netIncome, creditRatio, otherInstallments, monthlyInterestRate } =
      formData;

    if (parseLocaleNumber(netIncome) <= 0) {
      newErrors.netIncome = "Penghasilan bersih harus berupa angka positif.";
    }

    const numCreditRatio = parseLocaleNumber(creditRatio);
    if (numCreditRatio <= 0 || numCreditRatio > 100) {
      newErrors.creditRatio = "Baki kredit harus antara 1-100%.";
    }

    if (parseLocaleNumber(otherInstallments) < 0) {
      newErrors.otherInstallments = "Angsuran lain tidak boleh negatif.";
    }

    if (parseLocaleNumber(monthlyInterestRate) <= 0) {
      newErrors.monthlyInterestRate = "Bunga harus berupa angka positif.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      const numericData = Object.fromEntries(
        Object.entries(formData).map(([key, value]) => [
          key,
          parseLocaleNumber(value),
        ])
      ) as { [K in keyof FormData]: number };
      onCalculate(numericData);
    }
  };

  // --- JSX ---
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900 text-center">
        Simulasi KTA - Hitung Limit Pinjaman
      </h2>

      <CurrencyInput
        id="netIncome"
        name="netIncome"
        label="Penghasilan Bersih (per bulan)"
        value={formData.netIncome}
        onValueChange={handleCurrencyChange("netIncome")}
        error={errors.netIncome}
        placeholder="5.500.000"
      />

      <PercentInput
        id="creditRatio"
        name="creditRatio"
        label="Baki Kredit (maksimum angsuran per bulan)"
        value={formData.creditRatio}
        onChange={handleInputChange}
        error={errors.creditRatio}
        placeholder="30"
        info="(persen dari penghasilan bersih)"
      />

      <CurrencyInput
        id="otherInstallments"
        name="otherInstallments"
        label="Total Angsuran Pinjaman Lain"
        value={formData.otherInstallments}
        onValueChange={handleCurrencyChange("otherInstallments")}
        error={errors.otherInstallments}
        placeholder="1.250.000"
        info="Total cicilan KPR, kendaraan, dll."
      />

      <Input
        id="monthlyInterestRate"
        name="monthlyInterestRate"
        label="Bunga KTA"
        value={formData.monthlyInterestRate}
        onChange={handleInputChange}
        error={errors.monthlyInterestRate}
        unit="% / bulan"
        placeholder="1.25"
        inputMode="decimal"
        info={`= ${formatPercent(annualInterestRate)} / tahun`}
      />

      <Button type="submit" fullWidth>
        Hitung Simulasi KTA
      </Button>
    </form>
  );
}