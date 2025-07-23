// features/mortgage/complete/MortgageCompleteForm.tsx (Setelah Refactor)
"use client";

import { useState, useMemo, FormEvent, ChangeEvent } from "react";
import {
  CurrencyInput,
  PercentInput,
  YearInput,
  Input, // Menggunakan Input generik untuk bunga agar bisa desimal
  Button,
} from "@/components/ui/form";
import { parseLocaleNumber } from "@/utils/formatters";

// 1. Interface untuk state form (semua dalam bentuk string)
interface FormData {
  housePrice: string;
  loanTerm: string;
  annualInterestRate: string;
  downPaymentPercent: string;
  provisionPercent: string;
  appraisalFee: string;
  adminFee: string;
  notaryFee: string;
  insuranceFee: string;
  njoptkp: string;
}

// Tipe data untuk output kalkulasi (semua dalam bentuk number)
type CalculationData = { [K in keyof FormData]: number };

// Interface untuk props komponen
interface MortgageFormProps {
  onCalculate: (formData: CalculationData) => void;
}

// Interface untuk error validasi
interface FormErrors {
  [key: string]: string | undefined;
}

export default function MortgageCompleteForm({ onCalculate }: MortgageFormProps) {
  // 2. State terpusat untuk semua input form
  const [formData, setFormData] = useState<FormData>({
    housePrice: "500000000",
    loanTerm: "10",
    annualInterestRate: "14.6",
    downPaymentPercent: "20",
    provisionPercent: "1.5",
    appraisalFee: "500000",
    adminFee: "450000",
    notaryFee: "12000000",
    insuranceFee: "7500000",
    njoptkp: "60000000",
  });
  const [errors, setErrors] = useState<FormErrors>({});

  // 3. Kalkulasi turunan menggunakan useMemo untuk efisiensi
  const { loanTermMonths, monthlyInterestRate } = useMemo(() => {
    const term = parseLocaleNumber(formData.loanTerm);
    const rate = parseLocaleNumber(formData.annualInterestRate);
    return {
      loanTermMonths: term * 12,
      monthlyInterestRate: rate / 12,
    };
  }, [formData.loanTerm, formData.annualInterestRate]);

  // 4. Event Handlers yang efisien
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handler khusus untuk CurrencyInput yang mengembalikan nilai string numerik
  const handleCurrencyChange = (name: keyof FormData) => (value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 5. Logika Validasi dan Submit yang lebih bersih
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    const numericData = Object.fromEntries(
      Object.entries(formData).map(([key, value]) => [key, parseLocaleNumber(value)])
    ) as CalculationData;

    if (numericData.housePrice <= 0) newErrors.housePrice = "Harga rumah harus positif.";
    if (numericData.loanTerm <= 0) newErrors.loanTerm = "Tenor harus positif.";
    if (numericData.annualInterestRate < 0) newErrors.annualInterestRate = "Bunga tidak boleh negatif.";
    if (numericData.downPaymentPercent <= 0 || numericData.downPaymentPercent >= 100) {
      newErrors.downPaymentPercent = "Uang muka harus antara 1-99%.";
    }
    if (numericData.provisionPercent < 0) newErrors.provisionPercent = "Biaya provisi tidak boleh negatif.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (validateForm()) {
      const numericData = Object.fromEntries(
        Object.entries(formData).map(([key, value]) => [key, parseLocaleNumber(value)])
      ) as CalculationData;
      onCalculate(numericData);
    }
  };

  // 6. Render JSX menggunakan komponen UI reusable
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Simulasi KPR Lengkap</h2>

      <CurrencyInput
        id="housePrice"
        name="housePrice"
        label="Harga Rumah"
        value={formData.housePrice}
        onValueChange={handleCurrencyChange("housePrice")}
        error={errors.housePrice}
        placeholder="500.000.000"
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
        id="downPaymentPercent"
        name="downPaymentPercent"
        label="Uang Muka (DP)"
        value={formData.downPaymentPercent}
        onChange={handleInputChange}
        error={errors.downPaymentPercent}
        placeholder="20"
        info="(persen dari harga rumah)"
      />

      <div className="border-t border-gray-200 pt-6">
        <h3 className="font-medium text-gray-900 mb-3 text-lg">Rincian Biaya</h3>
        <div className="space-y-4">
          <PercentInput
            id="provisionPercent"
            name="provisionPercent"
            label="Biaya Provisi"
            value={formData.provisionPercent}
            onChange={handleInputChange}
            error={errors.provisionPercent}
            placeholder="1.5"
            info="(persen dari plafon pinjaman)"
          />
          <CurrencyInput
            id="appraisalFee"
            name="appraisalFee"
            label="Biaya Appraisal"
            value={formData.appraisalFee}
            onValueChange={handleCurrencyChange("appraisalFee")}
            placeholder="500.000"
          />
          <CurrencyInput
            id="adminFee"
            name="adminFee"
            label="Biaya Administrasi"
            value={formData.adminFee}
            onValueChange={handleCurrencyChange("adminFee")}
            placeholder="450.000"
          />
          <CurrencyInput
            id="notaryFee"
            name="notaryFee"
            label="Biaya Notaris"
            value={formData.notaryFee}
            onValueChange={handleCurrencyChange("notaryFee")}
            placeholder="12.000.000"
          />
          <CurrencyInput
            id="insuranceFee"
            name="insuranceFee"
            label="Biaya Asuransi"
            value={formData.insuranceFee}
            onValueChange={handleCurrencyChange("insuranceFee")}
            placeholder="7.500.000"
          />
        </div>
      </div>

      <div className="border-t border-gray-200 pt-6">
        <h3 className="font-medium text-gray-900 mb-3 text-lg">Pajak (BPHTB)</h3>
        <CurrencyInput
          id="njoptkp"
          name="njoptkp"
          label="NJOPTKP / NPTKP*"
          value={formData.njoptkp}
          onValueChange={handleCurrencyChange("njoptkp")}
          placeholder="60.000.000"
          info="*Nilai Jual Objek Pajak Tidak Kena Pajak, berbeda tiap daerah."
        />
      </div>

      <Button type="submit" fullWidth>
        Hitung
      </Button>
    </form>
  );
}
