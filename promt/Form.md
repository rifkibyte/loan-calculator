Tolong refactor code saya gunakan form seperti ini seperti refernsi, untuk formatter juga banyak yang salah tolong update karena sya ubah formattternya

"use client";

import  { useState } from "react";
import { formatCurrency } from "@/utils/formatters";

interface FormData {
  loanAmount: number;
  loanTerm: number;
  yearlyRates: { year: number; rate: number }[];
  calculationMethod: string;
}

interface FormErrors {
  [key: string]: string;
}

interface MortgageFixedFormProps {
  onCalculate: (formData: FormData) => void;
}

export default function MortgageFixedForm({
  onCalculate,
}: MortgageFixedFormProps) {
  const [loanAmount, setLoanAmount] = useState<string>("500000000");
  const [loanTerm, setLoanTerm] = useState<string>("10");
  const [yearlyRates, setYearlyRates] = useState<
    { year: number; rate: number }[]
  >([
    { year: 1, rate: 5 },
    { year: 2, rate: 5 },
    { year: 3, rate: 5 },
    { year: 4, rate: 10 },
    { year: 5, rate: 9 },
    { year: 6, rate: 10 },
    { year: 7, rate: 12 },
    { year: 8, rate: 13 },
    { year: 9, rate: 9 },
    { year: 10, rate: 8 },
  ]);
  const [errors, setErrors] = useState<FormErrors>({});

  const formatInputCurrency = (value: string): string => {
    return value.replace(/[^\d]/g, "");
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!loanAmount || isNaN(Number(loanAmount)) || Number(loanAmount) <= 0) {
      newErrors.loanAmount = "Jumlah pinjaman harus berupa angka positif";
    }

    if (!loanTerm || isNaN(Number(loanTerm)) || Number(loanTerm) <= 0) {
      newErrors.loanTerm = "Lama pinjaman harus berupa angka positif";
    }

    // Validate yearly rates
    yearlyRates.forEach((rate, index) => {
      if (isNaN(rate.rate) || rate.rate < 0) {
        newErrors[
          `rate_${index}`
        ] = `Bunga tahun ke-${rate.year} harus berupa angka positif`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (validateForm()) {
      onCalculate({
        loanAmount: Number(loanAmount),
        loanTerm: Number(loanTerm),
        yearlyRates: yearlyRates,
        calculationMethod: "Anuitas - Floating",
      });
    }
  };

  const handleLoanTermChange = (value: string) => {
    const termValue = Number(value);
    setLoanTerm(value);

    // Update yearly rates array based on loan term
    const newRates = [];
    for (let i = 1; i <= termValue; i++) {
      const existingRate = yearlyRates.find((r) => r.year === i);
      newRates.push({
        year: i,
        rate: existingRate ? existingRate.rate : 5,
      });
    }
    setYearlyRates(newRates);
  };

  const handleRateChange = (year: number, rate: string) => {
    setYearlyRates((prev) =>
      prev.map((r) => (r.year === year ? { ...r, rate: Number(rate) || 0 } : r))
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Loan Amount */}
      <div>
        <label className="block text-sm font-medium text-gray-900 mb-1">
          Jumlah Pinjaman:
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <span className="text-gray-500 sm:text-sm">Rp</span>
          </div>
          <input
            type="text"
            value={loanAmount}
            onChange={(e) => setLoanAmount(formatInputCurrency(e.target.value))}
            className="w-full pl-12 pr-3 py-2 text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="500000000"
          />
        </div>
        <p className="mt-1 text-xs text-gray-500">
          masukkan angka, tidak boleh pakai koma atau titik
        </p>
        <p className="mt-1 text-sm font-medium text-gray-900">
          {formatCurrency(Number(loanAmount) || 0)}
        </p>
        {errors.loanAmount && (
          <p className="mt-1 text-sm text-red-600">{errors.loanAmount}</p>
        )}
      </div>

      {/* Loan Term */}
      <div>
        <label className="block text-sm font-medium text-gray-900 mb-1">
          Lama Pinjaman:
        </label>
        <div className="flex items-center space-x-2">
          <button
            type="button"
            onClick={() =>
              handleLoanTermChange(String(Math.max(1, Number(loanTerm) - 1)))
            }
            className="px-3 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            -
          </button>
          <div className="relative flex-1">
            <input
              type="text"
              value={loanTerm}
              onChange={(e) => handleLoanTermChange(e.target.value)}
              className="w-full pr-14 pl-3 py-2 text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-center"
              placeholder="10"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <span className="text-gray-500 sm:text-sm">tahun</span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => handleLoanTermChange(String(Number(loanTerm) + 1))}
            className="px-3 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            +
          </button>
        </div>
        {errors.loanTerm && (
          <p className="mt-1 text-sm text-red-600">{errors.loanTerm}</p>
        )}
      </div>

      {/* Yearly Interest Rates */}
      <div>
        <label className="block text-sm font-medium text-gray-900 mb-3">
          Bunga per Tahun:
        </label>
        <div className="space-y-3 max-h-64 overflow-y-auto">
          {yearlyRates.map((rate) => (
            <div key={rate.year} className="flex items-center space-x-3">
              <label className="text-sm text-gray-700 w-24">
                Bunga tahun ke-{rate.year}:
              </label>
              <div className="relative flex-1">
                <input
                  type="text"
                  value={rate.rate}
                  onChange={(e) => handleRateChange(rate.year, e.target.value)}
                  className="w-full pr-8 pl-3 py-2 text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="5"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">%</span>
                </div>
              </div>
              {errors[`rate_${rate.year - 1}`] && (
                <p className="text-sm text-red-600">
                  {errors[`rate_${rate.year - 1}`]}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Calculation Method */}
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-gray-900">
          Perhitungan Bunga:
        </label>
        <p className="text-sm font-medium text-gray-900">Anuitas - Floating</p>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 font-medium"
      >
        Hitung Simulasi
      </button>
    </form>
  );
}



refernsi
// components/car-loan/budget/CarLoanBudgetForm.tsx (Updated)
"use client";

import { useState, useMemo, FormEvent, ChangeEvent } from "react";
import {
  CurrencyInput,
  PercentInput,
  YearInput,
  Input,
  Button,
} from "@/components/ui/form"; // Impor komponen generik

// --- Interface & Tipe (Tidak berubah) ---
interface FormData {
  budget: string;
  downPaymentPercent: string;
  loanTerm: string;
  interestRate: string;
}

interface FormErrors {
  [key: string]: string | undefined;
}

interface LoanFormProps {
  onCalculate: (data: { [K in keyof FormData]: number }) => void;
}

// --- Komponen Form Utama ---
export default function CarLoanBudgetForm({ onCalculate }: LoanFormProps) {
  const [formData, setFormData] = useState<FormData>({
    budget: "2500000",
    downPaymentPercent: "30",
    loanTerm: "5",
    interestRate: "4.6",
  });
  const [errors, setErrors] = useState<FormErrors>({});

  // --- Kalkulasi turunan dengan useMemo (Tidak berubah) ---
  const { loanTermMonths, monthlyInterestRate } = useMemo(() => {
    const term = parseFloat(formData.loanTerm) || 0;
    const rate = parseFloat(formData.interestRate.replace(",", ".")) || 0;
    return {
      loanTermMonths: term * 12,
      monthlyInterestRate: rate / 12,
    };
  }, [formData.loanTerm, formData.interestRate]);

  // --- Event Handlers ---
  // Handler untuk input standar (persen, tahun, bunga)
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handler khusus untuk CurrencyInput yang mengembalikan nilai numerik
  const handleBudgetChange = (value: string) => {
    setFormData((prev) => ({ ...prev, budget: value }));
  };

  // --- Validasi & Submit (Logika tidak berubah) ---
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    const { budget, downPaymentPercent, loanTerm, interestRate } = formData;

    if (parseFloat(budget) <= 0)
      newErrors.budget = "Budget angsuran harus angka positif.";
    if (
      parseFloat(downPaymentPercent) <= 0 ||
      parseFloat(downPaymentPercent) >= 100
    )
      newErrors.downPaymentPercent = "Uang muka harus antara 1-99%.";
    if (!Number.isInteger(parseFloat(loanTerm)) || parseFloat(loanTerm) <= 0)
      newErrors.loanTerm = "Tenor harus bilangan bulat positif.";
    if (parseFloat(interestRate.replace(",", ".")) < 0)
      newErrors.interestRate = "Suku bunga tidak boleh negatif.";

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
    <form onSubmit={handleSubmit} className="space-y-6">
      <CurrencyInput
        name="budget"
        id="budget"
        label="Budget Angsuran (per bulan)"
        value={formData.budget}
        onValueChange={handleBudgetChange}
        error={errors.budget}
        placeholder="2.500.000"
      />

      <PercentInput
        id="downPaymentPercent"
        name="downPaymentPercent" // 'name' diperlukan untuk handleInputChange
        label="Uang Muka (DP)"
        value={formData.downPaymentPercent}
        onChange={handleInputChange}
        error={errors.downPaymentPercent}
        placeholder="30"
        info="(persen dari harga OTR)"
      />

      <YearInput
        id="loanTerm"
        name="loanTerm" // 'name' diperlukan untuk handleInputChange
        label="Tenor (jangka waktu)"
        value={formData.loanTerm}
        onChange={handleInputChange}
        error={errors.loanTerm}
        placeholder="5"
        info={`= ${loanTermMonths} bulan`}
      />

      <Input
        id="interestRate"
        name="interestRate" // 'name' diperlukan untuk handleInputChange
        label="Bunga Pinjaman (flat)"
        value={formData.interestRate}
        onChange={handleInputChange}
        error={errors.interestRate}
        unit="% / tahun"
        placeholder="4.6"
        inputMode="decimal"
        info={`= ${monthlyInterestRate.toFixed(3)}% / bulan`}
      />

      <Button type="submit">Hitung Simulasi</Button>
    </form>
  );
}


----

// file: utils/formatters.ts

/**
 * Parses a locale-specific numeric string (ID-ID) into a number.
 * Handles thousand separators (.) and decimal separators (,).
 * @param value The string to parse.
 * @returns A valid number or NaN if parsing is not possible.
 */
export function parseLocaleNumber(value: string): number {
  const cleanValue = String(value).replace(/\./g, "").replace(",", ".");
  return parseFloat(cleanValue);
}

/**
 * Helper internal untuk memvalidasi nilai dan memberikan nilai fallback.
 * @param value Nilai yang bisa berupa angka atau string.
 * @param fallback Nilai default jika parsing gagal (default: 0).
 * @returns Angka yang valid atau nilai fallback.
 */
export function getValidNumber(value: number | string, fallback = 0): number {
  const num = typeof value === "string" ? parseLocaleNumber(value) : value;
  return isNaN(num) || !isFinite(num) ? fallback : num;
}

// --- FUNGSI-FUNGSI YANG DIEKSPOR ---

/**
 * Memformat angka atau string angka menjadi string dengan pemisah ribuan.
 * Contoh: 1000000 -> "1.000.000"
 */
export function formatCurrency(amount: number | string): string {
  const numAmount = getValidNumber(amount);
  // Selalu format tanpa desimal untuk input
  return new Intl.NumberFormat("id-ID").format(numAmount);
}

/**
 * Memformat angka menjadi string mata uang lengkap dengan simbol "Rp" dan tanpa desimal.
 * Contoh: 1000000 -> "Rp 1.000.000"
 */
export function formatCurrencyDisplay(amount: number | string): string {
  const numAmount = getValidNumber(amount);
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(numAmount);
}

/**
 * Memformat angka menjadi persentase.
 * Contoh: 4.6 -> "4,6%"
 */
export function formatPercent(
  value: number | string,
  options?: { minimumFractionDigits?: number; maximumFractionDigits?: number }
): string {
  const numValue = getValidNumber(value, 0);

  // --- PERBAIKAN LOGIKA ---
  // Tentukan digit min/max untuk mencegah error.
  const minDigits = options?.minimumFractionDigits ?? 1;
  // Pastikan maxDigits tidak pernah lebih kecil dari minDigits.
  // Jika maxDigits tidak diset, gunakan nilai yang lebih besar antara minDigits atau default (2).
  const maxDigits = options?.maximumFractionDigits ?? Math.max(minDigits, 2);

  return new Intl.NumberFormat("id-ID", {
    style: "percent",
    minimumFractionDigits: minDigits,
    maximumFractionDigits: maxDigits,
  }).format(numValue / 100);
}

/**
 * Memformat tanggal ke format lokal Indonesia ("17 Juli 2025").
 */
export function formatDate(date: Date): string {
  if (!(date instanceof Date) || isNaN(date.getTime())) {
    return "Tanggal tidak valid";
  }
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

/**
 * Mengubah string input (termasuk yang diformat) kembali menjadi string angka mentah.
 * Contoh: "Rp 1.000.000" -> "1000000"
 * @param value - String yang akan di-parse.
 * @returns String yang hanya berisi angka.
 */
export function parseToNumericString(value: string): string {
  // Hanya simpan angka dari string
  return String(value).replace(/[^\d]/g, "");
}

---
~/workspace/side-hustle/loan-calculator/src/components/ui/form on  main! ⌚ 10:12:05
$ ls
Button.tsx        Input.tsx         YearInput.tsx
CurrencyInput.tsx PercentInput.tsx  index.ts

~/workspace/side-hustle/loan-calculator/src/components/ui/form on  main! ⌚ 10:12:07
$ cat Button.tsx        Input.tsx         YearInput.tsx CurrencyInput.tsx PercentInput.tsx  index.ts
// components/ui/form/Button.tsx
import { FC, ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  fullWidth?: boolean;
}

export const Button: FC<ButtonProps> = ({
  children,
  onClick,
  type = "submit",
  disabled = false,
  fullWidth = true,
}) => (
  <button
    type={type}
    onClick={onClick}
    disabled={disabled}
    className={`
      ${fullWidth ? "w-full" : ""}
      bg-blue-600 text-white py-3 px-4 rounded-md
      hover:bg-blue-700
      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
      font-medium
      transition-colors
      disabled:bg-gray-400 disabled:cursor-not-allowed
    `}
  >
    {children}
  </button>
);
// components/ui/form/Input.tsx
import { FC, ChangeEvent } from "react";

interface FormInputProps {
  id: string;
  name: string;
  label: string;
  value: string | number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  unit?: string;
  prefix?: string;
  placeholder?: string;
  info?: string | React.ReactNode;
  type?: "text" | "number" | "email" | "password";
  inputMode?: "numeric" | "decimal" | "text";
  disabled?: boolean;
}

export const Input: FC<FormInputProps> = ({
  id,
  name,
  label,
  value,
  onChange,
  error,
  unit,
  prefix,
  placeholder,
  info,
  type = "text",
  inputMode = "text",
  disabled = false,
}) => (
  <div>
    <label
      htmlFor={id}
      className="block text-sm font-medium text-gray-900 mb-1"
    >
      {label}
    </label>
    <div className="relative">
      {prefix && (
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <span className="text-gray-500 sm:text-sm">{prefix}</span>
        </div>
      )}
      <input
        type={type}
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        disabled={disabled}
        inputMode={inputMode}
        className={`w-full py-2 text-gray-900 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          prefix ? "pl-9" : "pl-3"
        } ${unit ? "pr-14" : "pr-3"} ${
          error ? "border-red-500" : "border-gray-300"
        }`}
        placeholder={placeholder}
      />
      {unit && (
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <span className="text-gray-500 sm:text-sm">{unit}</span>
        </div>
      )}
    </div>
    {info && <p className="mt-1 text-xs text-gray-600">{info}</p>}
    {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
  </div>
);
// components/ui/form/YearInput.tsx
import { FC, ChangeEvent } from "react";
import { Input } from "./Input";

interface YearInputProps {
  id: string;
  name: string;
  label: string;
  value: string | number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  placeholder?: string;
  info?: string;
}

export const YearInput: FC<YearInputProps> = (props) => {
  return (
    <Input
      {...props}
      unit="tahun"
      type="text"
      inputMode="numeric"
    />
  );
};
// components/ui/form/CurrencyInput.tsx
import { FC, ChangeEvent, useCallback } from "react";
import { Input } from "./Input";

// Asumsikan fungsi ini ada di utils/formatters.ts
const formatToCurrency = (value: string | number) => {
  const numericValue = String(value).replace(/[^\d]/g, "");
  return new Intl.NumberFormat("id-ID").format(Number(numericValue));
};
const parseFromCurrency = (value: string) => {
  return value.replace(/[^\d]/g, "");
};

interface CurrencyInputProps {
  id: string;
  name: string;
  label: string;
  value: string;
  onValueChange: (value: string) => void; // Mengirim nilai numerik string
  error?: string;
  placeholder?: string;
  info?: string;
}

export const CurrencyInput: FC<CurrencyInputProps> = ({
  id,
  name,
  label,
  value,
  onValueChange,
  error,
  placeholder,
  info,
}) => {
  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      onValueChange(parseFromCurrency(e.target.value));
    },
    [onValueChange]
  );

  return (
    <Input
      id={id}
      name={name}
      label={label}
      value={formatToCurrency(value)}
      onChange={handleChange}
      error={error}
      prefix="Rp"
      placeholder={placeholder}
      info={info}
      inputMode="numeric"
    />
  );
};
// components/ui/form/PercentInput.tsx
import { FC, ChangeEvent } from "react";
import { Input } from "./Input";

interface PercentInputProps {
  id: string;
  name: string;
  label: string;
  value: string | number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  placeholder?: string;
  info?: string;
}

export const PercentInput: FC<PercentInputProps> = (props) => {
  return (
    <Input
      {...props}
      unit="%"
      type="text"
      inputMode="decimal"
    />
  );
};
// components/ui/form/index.ts
export * from './Input';
export * from './CurrencyInput';
export * from './PercentInput';
export * from './YearInput';
export * from './Button';
