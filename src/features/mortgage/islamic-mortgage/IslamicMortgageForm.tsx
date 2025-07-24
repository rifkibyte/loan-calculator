"use client";

import { useState, useMemo, FormEvent, ChangeEvent } from "react";
import {
  CurrencyInput,
  PercentInput,
  YearInput,
  Input,
  Button,
} from "@/components/ui/form";

// --- Interface & Tipe ---
interface FormData {
  housePrice: string;
  downPaymentPercent: string;
  loanTerm: string;
  marginRate: string;
  calculationMethod: "anuitas" | "flat";
}

interface FormErrors {
  [key: string]: string | undefined;
}

interface IslamicMortgageFormProps {
  onCalculate: (data: {
    housePrice: number;
    downPaymentPercent: number;
    loanTerm: number;
    marginRate: number;
    calculationMethod: "anuitas" | "flat";
  }) => void;
}

// --- Komponen Form Utama ---
export default function IslamicMortgageForm({
  onCalculate,
}: IslamicMortgageFormProps) {
  const [formData, setFormData] = useState<FormData>({
    housePrice: "500000000",
    downPaymentPercent: "30",
    loanTerm: "10",
    marginRate: "8.3",
    calculationMethod: "anuitas",
  });
  const [errors, setErrors] = useState<FormErrors>({});

  // --- Kalkulasi turunan dengan useMemo ---
  const { loanTermMonths, monthlyMarginRate } = useMemo(() => {
    const term = parseFloat(formData.loanTerm) || 0;
    const rate = parseFloat(formData.marginRate.replace(",", ".")) || 0;
    return {
      loanTermMonths: term * 12,
      monthlyMarginRate: rate / 12,
    };
  }, [formData.loanTerm, formData.marginRate]);

  // --- Event Handlers ---
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleHousePriceChange = (value: string) => {
    setFormData((prev) => ({ ...prev, housePrice: value }));
  };

  // --- Validasi & Submit ---
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    const { housePrice, downPaymentPercent, loanTerm, marginRate } = formData;

    if (parseFloat(housePrice) <= 0) {
      newErrors.housePrice = "Harga rumah harus berupa angka positif.";
    }
    if (
      parseFloat(downPaymentPercent) <= 0 ||
      parseFloat(downPaymentPercent) >= 100
    ) {
      newErrors.downPaymentPercent = "Uang muka harus antara 1-99%.";
    }
    if (!Number.isInteger(parseFloat(loanTerm)) || parseFloat(loanTerm) <= 0) {
      newErrors.loanTerm = "Tenor harus berupa bilangan bulat positif.";
    }
    if (parseFloat(marginRate.replace(",", ".")) < 0) {
      newErrors.marginRate = "Margin bank harus berupa angka positif atau nol.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (validateForm()) {
      const numericData = {
        housePrice: parseFloat(formData.housePrice),
        downPaymentPercent: parseFloat(formData.downPaymentPercent),
        loanTerm: parseFloat(formData.loanTerm),
        marginRate: parseFloat(formData.marginRate.replace(",", ".")),
        calculationMethod: formData.calculationMethod,
      };
      onCalculate(numericData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">
          Simulasi KPR Syariah
        </h2>
      </div>

      <CurrencyInput
        id="housePrice"
        name="housePrice"
        label="Harga Rumah"
        value={formData.housePrice}
        onValueChange={handleHousePriceChange}
        error={errors.housePrice}
        placeholder="500.000.000"
        info="Masukkan angka, tidak boleh pakai koma atau titik."
      />

      <YearInput
        id="loanTerm"
        name="loanTerm"
        label="Tenor (jangka waktu)"
        value={formData.loanTerm}
        onChange={handleInputChange}
        error={errors.loanTerm}
        placeholder="10"
        info={`= ${loanTermMonths} bulan`}
      />

      <Input
        id="marginRate"
        name="marginRate"
        label="Margin Bank"
        value={formData.marginRate}
        onChange={handleInputChange}
        error={errors.marginRate}
        unit="% / tahun"
        placeholder="8.3"
        inputMode="decimal"
        info={`= ${monthlyMarginRate.toFixed(3)}% / bulan`}
      />

      <PercentInput
        id="downPaymentPercent"
        name="downPaymentPercent"
        label="Uang Muka (DP)"
        value={formData.downPaymentPercent}
        onChange={handleInputChange}
        error={errors.downPaymentPercent}
        placeholder="30"
        info="(persen dari harga rumah)"
      />

      <div>
        <label
          htmlFor="calculationMethod"
          className="block text-sm font-medium text-gray-900 mb-1"
        >
          Perhitungan Margin
        </label>
        <select
          id="calculationMethod"
          name="calculationMethod"
          value={formData.calculationMethod}
          onChange={handleInputChange}
          className="w-full pl-3 pr-3 py-2 text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
