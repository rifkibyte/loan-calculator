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
  loanAmount: string;
  creditRatio: string;
  monthlyInterestRate: string;
  calculationMethod: "FLAT";
}

interface FormErrors {
  loanAmount?: string;
  creditRatio?: string;
  monthlyInterestRate?: string;
}

interface PersonalLoanAmountFormProps {
  onCalculate: (data: {
    loanAmount: number;
    creditRatio: number;
    monthlyInterestRate: number;
    calculationMethod: string;
  }) => void;
}

// --- Main Form Component ---
export default function PersonalLoanAmountForm({
  onCalculate,
}: PersonalLoanAmountFormProps) {
  // --- State ---
  const [formData, setFormData] = useState<FormData>({
    loanAmount: "50000000",
    creditRatio: "30",
    monthlyInterestRate: "1.25",
    calculationMethod: "FLAT",
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
    const { loanAmount, creditRatio, monthlyInterestRate } = formData;

    if (parseLocaleNumber(loanAmount) <= 0) {
      newErrors.loanAmount = "Besar pinjaman harus berupa angka positif.";
    }

    const numCreditRatio = parseLocaleNumber(creditRatio);
    if (numCreditRatio <= 0 || numCreditRatio > 100) {
      newErrors.creditRatio = "Baki kredit harus antara 1-100%.";
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
      onCalculate({
        loanAmount: parseLocaleNumber(formData.loanAmount),
        creditRatio: parseLocaleNumber(formData.creditRatio),
        monthlyInterestRate: parseLocaleNumber(formData.monthlyInterestRate),
        calculationMethod: formData.calculationMethod,
      });
    }
  };

  // --- JSX ---
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900 text-center">
        Simulasi Kredit Tanpa Agunan (KTA)
      </h2>

      <CurrencyInput
        id="loanAmount"
        name="loanAmount"
        label="Besar Pinjaman"
        value={formData.loanAmount}
        onValueChange={handleCurrencyChange("loanAmount")}
        error={errors.loanAmount}
        placeholder="50.000.000"
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

      <Input
        id="calculationMethod"
        name="calculationMethod"
        label="Perhitungan Bunga"
        value={formData.calculationMethod}
        onChange={() => {}} // No-op untuk input read-only
        disabled={true}
      />

      <Button type="submit" fullWidth>
        Hitung
      </Button>
    </form>
  );
}
