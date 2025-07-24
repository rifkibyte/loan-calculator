Tolong refactor code saya gunakan form seperti ini seperti refernsi, untuk formatter juga banyak yang salah tolong update karena sya ubah formattternya.

komponennya juga sudah saya taruh dibawah jadi tolong ikuti dengan benar
import { useState } from "react";

interface FormData {
  netIncome: number;
  creditRatio: number;
  otherInstallments: number;
  monthlyInterestRate: number;
}

interface FormErrors {
  netIncome?: string;
  creditRatio?: string;
  otherInstallments?: string;
  monthlyInterestRate?: string;
}

interface PersonalLoanFormProps {
  onCalculate: (formData: FormData) => void;
}

export default function PersonalLoanForm({ onCalculate }: PersonalLoanFormProps) {
  const [netIncome, setNetIncome] = useState<string>("5500000");
  const [creditRatio, setCreditRatio] = useState<string>("30");
  const [otherInstallments, setOtherInstallments] = useState<string>("1250000");
  const [monthlyInterestRate, setMonthlyInterestRate] = useState<string>("1.25");
  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!netIncome || isNaN(Number(netIncome)) || Number(netIncome) <= 0) {
      newErrors.netIncome = "Penghasilan bersih harus berupa angka positif";
    }
    
    if (!creditRatio || isNaN(Number(creditRatio)) || Number(creditRatio) <= 0 || Number(creditRatio) > 100) {
      newErrors.creditRatio = "Baki kredit harus antara 1-100%";
    }
    
    if (!otherInstallments || isNaN(Number(otherInstallments)) || Number(otherInstallments) < 0) {
      newErrors.otherInstallments = "Angsuran lain harus angka positif";
    }
    
    if (!monthlyInterestRate || isNaN(Number(monthlyInterestRate)) || Number(monthlyInterestRate) <= 0) {
      newErrors.monthlyInterestRate = "Bunga harus angka positif";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onCalculate({
        netIncome: Number(netIncome),
        creditRatio: Number(creditRatio),
        otherInstallments: Number(otherInstallments),
        monthlyInterestRate: Number(monthlyInterestRate)
      });
    }
  };

  const formatInputCurrency = (value: string): string => {
    return value.replace(/[^\d]/g, "");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        Simulasi KTA - Limit Kredit
      </h2>
      
      {/* Net Income */}
      <div>
        <label className="block text-sm font-medium text-gray-900 mb-1">
          Penghasilan Bersih (per bulan)
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <span className="text-gray-500 sm:text-sm">Rp</span>
          </div>
          <input
            type="text"
            value={netIncome}
            onChange={(e) => setNetIncome(formatInputCurrency(e.target.value))}
            className="w-full pl-12 pr-3 py-2 text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="5500000"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <span className="text-gray-500 sm:text-sm">,00</span>
          </div>
        </div>
        <p className="mt-1 text-xs text-gray-900">
          masukkan angka, tidak boleh pakai koma atau titik
        </p>
        {errors.netIncome && (
          <p className="mt-1 text-sm text-red-600">{errors.netIncome}</p>
        )}
      </div>
      
      {/* Credit Ratio */}
      <div>
        <label className="block text-sm font-medium text-gray-900 mb-1">
          Baki Kredit (maksimum angsuran per bulan)
        </label>
        <div className="relative">
          <input
            type="text"
            value={creditRatio}
            onChange={(e) => setCreditRatio(e.target.value.replace(/[^\d.]/g, ""))}
            className="w-full pr-8 pl-3 py-2 text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="30"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <span className="text-gray-500 sm:text-sm">%</span>
          </div>
        </div>
        <p className="mt-1 text-xs text-gray-900">
          (persen dari penghasilan bersih)
        </p>
        {errors.creditRatio && (
          <p className="mt-1 text-sm text-red-600">{errors.creditRatio}</p>
        )}
      </div>
      
      {/* Other Installments */}
      <div>
        <label className="block text-sm font-medium text-gray-900 mb-1">
          Angsuran dari Pinjaman Lain (total cicilan KPR + cicilan kendaraan + dll)
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <span className="text-gray-500 sm:text-sm">Rp</span>
          </div>
          <input
            type="text"
            value={otherInstallments}
            onChange={(e) => setOtherInstallments(formatInputCurrency(e.target.value))}
            className="w-full pl-12 pr-3 py-2 text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="1250000"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <span className="text-gray-500 sm:text-sm">,00</span>
          </div>
        </div>
        <p className="mt-1 text-xs text-gray-900">
          masukkan angka, tidak boleh pakai koma atau titik
        </p>
        {errors.otherInstallments && (
          <p className="mt-1 text-sm text-red-600">{errors.otherInstallments}</p>
        )}
      </div>
      
      {/* Interest Rate */}
      <div>
        <label className="block text-sm font-medium text-gray-900 mb-1">
          Bunga KTA
        </label>
        <div className="relative">
          <input
            type="text"
            value={monthlyInterestRate}
            onChange={(e) => setMonthlyInterestRate(e.target.value.replace(/[^\d.]/g, ""))}
            className="w-full pr-28 pl-3 py-2 text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="1.25"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <span className="text-gray-500 sm:text-sm">% / bulan</span>
          </div>
        </div>
        <p className="mt-1 text-xs text-gray-900">
          = {(Number(monthlyInterestRate) * 12).toFixed(2)}% / tahun
        </p>
        <p className="mt-1 text-xs text-gray-900">
          masukkan angka, misal 1.5
        </p>
        {errors.monthlyInterestRate && (
          <p className="mt-1 text-sm text-red-600">{errors.monthlyInterestRate}</p>
        )}
      </div>
      
      {/* Submit Button */}
      <div className="pt-4">
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-md transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Hitung Simulasi KTA
        </button>
      </div>
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
