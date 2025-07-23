Tolong refactor code saya gunakan form seperti ini seperti refernsi, untuk formatter juga banyak yang salah tolong update karena sya ubah formattternya

code saya:// src/components/mortgage/budget/MortgageBudgetForm.tsx
"use client";

import { useState } from "react";

interface FormData {
  monthlyBudget: number;
  downPaymentPercent: number;
  loanTerm: number;
  annualInterestRate: number;
  installmentPercent: number;
  provisionPercent: number;
  adminPercent: number;
}

interface FormErrors {
  [key: string]: string;
}

interface MortgageBudgetFormProps {
  onCalculate: (formData: FormData) => void;
}

export default function MortgageBudgetForm({
  onCalculate,
}: MortgageBudgetFormProps) {
  const [monthlyBudget, setMonthlyBudget] = useState<string>("5000000");
  const [downPaymentPercent, setDownPaymentPercent] = useState<string>("20");
  const [loanTerm, setLoanTerm] = useState<string>("15");
  const [annualInterestRate, setAnnualInterestRate] = useState<string>("14.6");
  const [installmentPercent, setInstallmentPercent] = useState<string>("30");
  const [provisionPercent, setProvisionPercent] = useState<string>("1");
  const [adminPercent, setAdminPercent] = useState<string>("0.1");
  const [errors, setErrors] = useState<FormErrors>({});

  // Derived values for display
  const loanTermMonths = Number(loanTerm) * 12;
  const monthlyInterestRate = Number(annualInterestRate) / 12;

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (
      !monthlyBudget ||
      isNaN(Number(monthlyBudget)) ||
      Number(monthlyBudget) <= 0
    ) {
      newErrors.monthlyBudget = "Budget angsuran harus berupa angka positif";
    }

    if (
      !downPaymentPercent ||
      isNaN(Number(downPaymentPercent)) ||
      Number(downPaymentPercent) <= 0 ||
      Number(downPaymentPercent) >= 100
    ) {
      newErrors.downPaymentPercent =
        "Persentase uang muka harus antara 0 dan 100";
    }

    if (
      !loanTerm ||
      isNaN(Number(loanTerm)) ||
      Number(loanTerm) <= 0 ||
      !Number.isInteger(Number(loanTerm))
    ) {
      newErrors.loanTerm = "Tenor harus berupa bilangan bulat positif";
    }

    if (
      !annualInterestRate ||
      isNaN(Number(annualInterestRate)) ||
      Number(annualInterestRate) < 0
    ) {
      newErrors.annualInterestRate =
        "Suku bunga harus berupa angka positif atau nol";
    }

    if (
      !installmentPercent ||
      isNaN(Number(installmentPercent)) ||
      Number(installmentPercent) <= 0 ||
      Number(installmentPercent) > 100
    ) {
      newErrors.installmentPercent =
        "Persentase angsuran harus antara 0 dan 100";
    }

    if (
      !provisionPercent ||
      isNaN(Number(provisionPercent)) ||
      Number(provisionPercent) < 0
    ) {
      newErrors.provisionPercent =
        "Persentase provisi harus berupa angka positif atau nol";
    }

    if (
      !adminPercent ||
      isNaN(Number(adminPercent)) ||
      Number(adminPercent) < 0
    ) {
      newErrors.adminPercent =
        "Persentase administrasi harus berupa angka positif atau nol";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (validateForm()) {
      onCalculate({
        monthlyBudget: Number(monthlyBudget),
        downPaymentPercent: Number(downPaymentPercent),
        loanTerm: Number(loanTerm),
        annualInterestRate: Number(annualInterestRate),
        installmentPercent: Number(installmentPercent),
        provisionPercent: Number(provisionPercent),
        adminPercent: Number(adminPercent),
      });
    }
  };

  const formatInputCurrency = (value: string): string => {
    return value.replace(/[^\d]/g, "");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        Simulasi KPR - berdasar budget
      </h2>

      {/* Monthly Budget Input */}
      <div>
        <label className="block text-sm font-medium text-gray-900 mb-1">
          Budget Angsuran (per bulan):
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <span className="text-gray-500 sm:text-sm">Rp</span>
          </div>
          <input
            type="text"
            value={monthlyBudget}
            onChange={(e) =>
              setMonthlyBudget(formatInputCurrency(e.target.value))
            }
            className="w-full pl-12 pr-3 py-2 text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="5000000"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <span className="text-gray-500 sm:text-sm">,00</span>
          </div>
        </div>
        <p className="mt-1 text-xs text-gray-600">
          masukkan angka, tidak boleh pakai koma atau titik
        </p>
        {errors.monthlyBudget && (
          <p className="mt-1 text-sm text-red-600">{errors.monthlyBudget}</p>
        )}
      </div>

      {/* Down Payment Percentage */}
      <div>
        <label className="block text-sm font-medium text-gray-900 mb-1">
          Uang Muka (DP):
        </label>
        <div className="relative">
          <input
            type="text"
            value={downPaymentPercent}
            onChange={(e) => setDownPaymentPercent(e.target.value)}
            className="w-full pr-8 pl-3 py-2 text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="20"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <span className="text-gray-500 sm:text-sm">%</span>
          </div>
        </div>
        <p className="mt-1 text-xs text-gray-600">(persen dari harga rumah)</p>
        {errors.downPaymentPercent && (
          <p className="mt-1 text-sm text-red-600">
            {errors.downPaymentPercent}
          </p>
        )}
      </div>

      {/* Loan Term */}
      <div>
        <label className="block text-sm font-medium text-gray-900 mb-1">
          Tenor (jangka waktu):
        </label>
        <div className="relative">
          <input
            type="text"
            value={loanTerm}
            onChange={(e) => setLoanTerm(e.target.value)}
            className="w-full pr-14 pl-3 py-2 text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="15"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <span className="text-gray-500 sm:text-sm">tahun</span>
          </div>
        </div>
        <p className="mt-1 text-xs text-gray-600">= {loanTermMonths} bulan</p>
        {errors.loanTerm && (
          <p className="mt-1 text-sm text-red-600">{errors.loanTerm}</p>
        )}
      </div>

      {/* Interest Rate */}
      <div>
        <label className="block text-sm font-medium text-gray-900 mb-1">
          Bunga Pinjaman:
        </label>
        <div className="relative">
          <input
            type="text"
            value={annualInterestRate}
            onChange={(e) => setAnnualInterestRate(e.target.value)}
            className="w-full pr-16 pl-3 py-2 text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="14.6"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <span className="text-gray-500 sm:text-sm">% / tahun</span>
          </div>
        </div>
        <p className="mt-1 text-xs text-gray-600">
          = {monthlyInterestRate.toFixed(2)}% / bulan
        </p>
        {errors.annualInterestRate && (
          <p className="mt-1 text-sm text-red-600">
            {errors.annualInterestRate}
          </p>
        )}
      </div>

      {/* Installment Percentage */}
      <div>
        <label className="block text-sm font-medium text-gray-900 mb-1">
          Besar Angsuran (per bulan):
        </label>
        <div className="relative">
          <input
            type="text"
            value={installmentPercent}
            onChange={(e) => setInstallmentPercent(e.target.value)}
            className="w-full pr-8 pl-3 py-2 text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="30"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <span className="text-gray-500 sm:text-sm">%</span>
          </div>
        </div>
        <p className="mt-1 text-xs text-gray-600">
          (persen dari penghasilan bersih)
        </p>
        {errors.installmentPercent && (
          <p className="mt-1 text-sm text-red-600">
            {errors.installmentPercent}
          </p>
        )}
      </div>

      {/* Calculation Method */}
      <div>
        <label className="block text-sm font-medium text-gray-900 mb-1">
          Perhitungan Bunga:
        </label>
        <div className="bg-gray-50 p-2 rounded-md">
          <span className="text-gray-700">Anuitas</span>
        </div>
      </div>

      {/* Additional Fees */}
      <div className="border-t border-gray-200 pt-4">
        <h3 className="font-medium text-gray-900 mb-3">Biaya Bank</h3>

        <div className="space-y-4">
          {/* Provision Percentage */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1">
              Biaya Provisi:
            </label>
            <div className="relative">
              <input
                type="text"
                value={provisionPercent}
                onChange={(e) => setProvisionPercent(e.target.value)}
                className="w-full pr-8 pl-3 py-2 text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="1"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <span className="text-gray-500 sm:text-sm">%</span>
              </div>
            </div>
            <p className="mt-1 text-xs text-gray-600">(persen dari plafon)</p>
            {errors.provisionPercent && (
              <p className="mt-1 text-sm text-red-600">
                {errors.provisionPercent}
              </p>
            )}
          </div>

          {/* Admin Percentage */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1">
              Biaya Administrasi:
            </label>
            <div className="relative">
              <input
                type="text"
                value={adminPercent}
                onChange={(e) => setAdminPercent(e.target.value)}
                className="w-full pr-8 pl-3 py-2 text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="0.1"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <span className="text-gray-500 sm:text-sm">%</span>
              </div>
            </div>
            <p className="mt-1 text-xs text-gray-600">(persen dari plafon)</p>
            {errors.adminPercent && (
              <p className="mt-1 text-sm text-red-600">{errors.adminPercent}</p>
            )}
          </div>
        </div>
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
