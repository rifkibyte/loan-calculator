// features/car-loan/complete/LoanForm.tsx (Final Version)
"use client";

import { useState, useMemo, FormEvent, ChangeEvent } from "react";
import {
  CurrencyInput,
  PercentInput,
  YearInput,
  Input,
  Button,
} from "@/components/ui/form";
import { parseLocaleNumber } from "@/utils/formatters"; // Impor ini sekarang akan berhasil

// --- Interface & Tipe Data ---
interface FormData {
  carPrice: string;
  downPaymentPercent: string;
  loanTerm: string;
  interestRate: string;
  insurancePercent: string;
  provisionPercent: string;
  policyFee: string;
  adminFee: string;
}

interface FormErrors {
  [key: string]: string | undefined;
}

interface LoanFormProps {
  onCalculate: (data: { [K in keyof FormData]: number }) => void;
}

// --- Komponen Form Utama ---
export default function LoanForm({ onCalculate }: LoanFormProps) {
  const [formData, setFormData] = useState<FormData>({
    carPrice: "250000000",
    downPaymentPercent: "30",
    loanTerm: "5",
    interestRate: "4.8",
    insurancePercent: "5",
    provisionPercent: "0.5",
    policyFee: "40000",
    adminFee: "700000",
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const { loanTermMonths, monthlyInterestRate } = useMemo(() => {
    const term = parseLocaleNumber(formData.loanTerm);
    const rate = parseLocaleNumber(formData.interestRate);
    return {
      loanTermMonths: term * 12,
      monthlyInterestRate: rate > 0 ? rate / 12 : 0,
    };
  }, [formData.loanTerm, formData.interestRate]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCurrencyChange = (name: keyof FormData) => (value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    if (parseLocaleNumber(formData.carPrice) <= 0)
      newErrors.carPrice = "Harga mobil harus positif.";
    const dp = parseLocaleNumber(formData.downPaymentPercent);
    if (dp <= 0 || dp >= 100)
      newErrors.downPaymentPercent = "Uang muka harus antara 1-99%.";
    if (
      !Number.isInteger(parseLocaleNumber(formData.loanTerm)) ||
      parseLocaleNumber(formData.loanTerm) <= 0
    )
      newErrors.loanTerm = "Tenor harus bilangan bulat positif.";
    if (parseLocaleNumber(formData.interestRate) < 0)
      newErrors.interestRate = "Suku bunga tidak boleh negatif.";
    if (parseLocaleNumber(formData.insurancePercent) < 0)
      newErrors.insurancePercent = "Asuransi tidak boleh negatif.";
    if (parseLocaleNumber(formData.provisionPercent) < 0)
      newErrors.provisionPercent = "Provisi tidak boleh negatif.";
    if (parseLocaleNumber(formData.policyFee) < 0)
      newErrors.policyFee = "Biaya polis tidak boleh negatif.";
    if (parseLocaleNumber(formData.adminFee) < 0)
      newErrors.adminFee = "Biaya admin tidak boleh negatif.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
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

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-white p-6 rounded-lg shadow-md"
    >
      <CurrencyInput
        id="carPrice"
        name="carPrice"
        label="Harga Mobil OTR"
        value={formData.carPrice}
        onValueChange={handleCurrencyChange("carPrice")}
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
        info={
          !isNaN(loanTermMonths) && loanTermMonths > 0
            ? `= ${loanTermMonths} bulan`
            : ""
        }
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
        info={
          !isNaN(monthlyInterestRate) && monthlyInterestRate > 0
            ? `= ${monthlyInterestRate.toFixed(3).replace(".", ",")}% / bulan`
            : ""
        }
      />

      <div className="border-t border-gray-200 pt-6 space-y-4">
        <h3 className="text-lg font-medium text-gray-900">Biaya Lain-lain</h3>
        <PercentInput
          id="insurancePercent"
          name="insurancePercent"
          label="Asuransi"
          value={formData.insurancePercent}
          onChange={handleInputChange}
          error={errors.insurancePercent}
          placeholder="5"
          info="(persen dari harga OTR)"
        />
        <PercentInput
          id="provisionPercent"
          name="provisionPercent"
          label="Provisi"
          value={formData.provisionPercent}
          onChange={handleInputChange}
          error={errors.provisionPercent}
          placeholder="0.5"
          info="(persen dari plafon pinjaman)"
        />
        <CurrencyInput
          id="policyFee"
          name="policyFee"
          label="Biaya Polis Asuransi"
          value={formData.policyFee}
          onValueChange={handleCurrencyChange("policyFee")}
          error={errors.policyFee}
          placeholder="40.000"
        />
        <CurrencyInput
          id="adminFee"
          name="adminFee"
          label="Biaya Administrasi"
          value={formData.adminFee}
          onValueChange={handleCurrencyChange("adminFee")}
          error={errors.adminFee}
          placeholder="700.000"
        />
      </div>

      <Button type="submit" fullWidth>
        Hitung Simulasi
      </Button>
    </form>
  );
}
