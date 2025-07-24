"use client";

import { useState, useMemo, FormEvent, ChangeEvent } from "react";
import {
  CurrencyInput,
  PercentInput,
  YearInput,
  Input,
  Button,
} from "@/components/ui/form";
import { formatCurrencyDisplay } from "@/utils/formatters"; // Impor formatter untuk tampilan

// --- Interface & Tipe ---
interface FormData {
  netIncome: string;
  downPaymentPercent: string;
  loanTerm: string;
  interestRate: string;
  maxInstallmentPercent: string;
}

interface FormErrors {
  [key: string]: string | undefined;
}

interface MortgageIncomeFormProps {
  onCalculate: (data: { [K in keyof FormData]: number }) => void;
}

// --- Komponen Form Utama ---
export default function MortgageIncomeForm({
  onCalculate,
}: MortgageIncomeFormProps) {
  const [formData, setFormData] = useState<FormData>({
    netIncome: "15000000",
    downPaymentPercent: "20",
    loanTerm: "15",
    interestRate: "14.6",
    maxInstallmentPercent: "30",
  });
  const [errors, setErrors] = useState<FormErrors>({});

  // --- Kalkulasi turunan dengan useMemo ---
  const { loanTermMonths, monthlyInterestRate, maxInstallmentAmount } =
    useMemo(() => {
      const term = parseFloat(formData.loanTerm) || 0;
      const rate = parseFloat(formData.interestRate.replace(",", ".")) || 0;
      const income = parseFloat(formData.netIncome) || 0;
      const installmentPercent =
        parseFloat(formData.maxInstallmentPercent.replace(",", ".")) || 0;

      return {
        loanTermMonths: term * 12,
        monthlyInterestRate: rate / 12,
        maxInstallmentAmount: (income * installmentPercent) / 100,
      };
    }, [
      formData.loanTerm,
      formData.interestRate,
      formData.netIncome,
      formData.maxInstallmentPercent,
    ]);

  // --- Event Handlers ---
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleIncomeChange = (value: string) => {
    setFormData((prev) => ({ ...prev, netIncome: value }));
  };

  // --- Validasi & Submit ---
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    const {
      netIncome,
      downPaymentPercent,
      loanTerm,
      interestRate,
      maxInstallmentPercent,
    } = formData;

    // Helper untuk parse, mengganti koma jika ada
    const parse = (val: string) => parseFloat(val.replace(",", "."));

    if (parse(netIncome) <= 0)
      newErrors.netIncome = "Penghasilan bersih harus angka positif.";
    if (parse(downPaymentPercent) <= 0 || parse(downPaymentPercent) >= 100)
      newErrors.downPaymentPercent = "Uang muka harus antara 1-99%.";
    if (!Number.isInteger(parse(loanTerm)) || parse(loanTerm) <= 0)
      newErrors.loanTerm = "Tenor harus bilangan bulat positif.";
    if (parse(interestRate) < 0)
      newErrors.interestRate = "Suku bunga tidak boleh negatif.";
    if (
      parse(maxInstallmentPercent) <= 0 ||
      parse(maxInstallmentPercent) > 100
    )
      newErrors.maxInstallmentPercent =
        "Persentase angsuran harus antara 1-100%.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (validateForm()) {
      const numericData = Object.fromEntries(
        Object.entries(formData).map(([key, value]) => [
          key,
          parseFloat(value.replace(",", ".")),
        ])
      ) as { [K in keyof FormData]: number };
      onCalculate(numericData);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">
        Simulasi KPR - Berdasarkan Penghasilan
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <CurrencyInput
          id="netIncome"
          name="netIncome"
          label="Penghasilan Bersih (per bulan)"
          value={formData.netIncome}
          onValueChange={handleIncomeChange}
          error={errors.netIncome}
          placeholder="15.000.000"
        />

        <PercentInput
          id="downPaymentPercent"
          name="downPaymentPercent"
          label="Uang Muka (DP)"
          value={formData.downPaymentPercent}
          onChange={handleInputChange}
          error={errors.downPaymentPercent}
          placeholder="20"
          info="(persen dari harga properti)"
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
          id="interestRate"
          name="interestRate"
          label="Bunga Pinjaman"
          value={formData.interestRate}
          onChange={handleInputChange}
          error={errors.interestRate}
          unit="% / tahun"
          placeholder="14.6"
          inputMode="decimal"
          info={`= ${monthlyInterestRate.toFixed(3)}% / bulan`}
        />

        <PercentInput
          id="maxInstallmentPercent"
          name="maxInstallmentPercent"
          label="Maksimal Angsuran (per bulan)"
          value={formData.maxInstallmentPercent}
          onChange={handleInputChange}
          error={errors.maxInstallmentPercent}
          placeholder="30"
          info={`(persen dari penghasilan) ≈ ${formatCurrencyDisplay(
            maxInstallmentAmount
          )}`}
        />

        <div className="flex items-center justify-between gap-4 pt-2">
          <label className="text-sm font-medium text-gray-900">
            Perhitungan Bunga:
          </label>
          <p className="text-sm font-medium text-gray-900">Anuitas</p>
        </div>

        <Button type="submit" fullWidth>
          Hitung
        </Button>
      </form>
    </div>
  );
}
