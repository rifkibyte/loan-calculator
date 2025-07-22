Tolong refactor code saya gunakan form seperti ini seperti refernsi, untuk formatter juga banyak yang salah tolong update karena sya ubah formattternya

code saya:
"use client";

import { useState } from "react";
// Mengimpor fungsi-fungsi utilitas
import {
  formatCurrency,
  parseCurrency,
  formatDecimal,
} from "@/utils/formatters";

// Interface for form data
interface FormData {
  loanAmount: number;
  loanTermMonths: number;
  annualInterestRate: number;
}

// Interface for form validation errors
interface FormErrors {
  [key: string]: string;
}

// Interface for component props
interface CreditAnnuityFormProps {
  onCalculate: (formData: FormData) => void;
}

export default function CreditAnnuityForm({
  onCalculate,
}: CreditAnnuityFormProps) {
  // Form state variables
  const [loanAmount, setLoanAmount] = useState<string>("500000000");
  const [loanTermMonths, setLoanTermMonths] = useState<string>("120");
  const [annualInterestRate, setAnnualInterestRate] = useState<string>("14.6");
  const [errors, setErrors] = useState<FormErrors>({});

  // Derived values for display
  const loanTermYears: number = Number(loanTermMonths) / 12;
  const monthlyInterestRate: number = Number(annualInterestRate) / 12;

  /**
   * Handles changes in the loan amount input using the parseCurrency utility.
   * @param e - The input change event
   */
  const handleLoanAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Menggunakan parseCurrency untuk membersihkan input dan mengubahnya menjadi angka
    const numericValue = parseCurrency(e.target.value);
    // Menyimpan nilai mentah sebagai string di dalam state
    setLoanAmount(String(numericValue));
  };

  /**
   * Validate form inputs
   * @returns boolean indicating if form is valid
   */
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!loanAmount || isNaN(Number(loanAmount)) || Number(loanAmount) <= 0) {
      newErrors.loanAmount = "Jumlah pinjaman harus berupa angka positif";
    }

    if (
      !loanTermMonths ||
      isNaN(Number(loanTermMonths)) ||
      Number(loanTermMonths) <= 0 ||
      !Number.isInteger(Number(loanTermMonths))
    ) {
      newErrors.loanTermMonths =
        "Lama pinjaman harus berupa bilangan bulat positif";
    }

    if (
      !annualInterestRate ||
      isNaN(Number(annualInterestRate)) ||
      Number(annualInterestRate) < 0
    ) {
      newErrors.annualInterestRate =
        "Bunga pinjaman harus berupa angka positif atau nol";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Handle form submission
   * @param e - Form event
   */
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (validateForm()) {
      onCalculate({
        loanAmount: Number(loanAmount),
        loanTermMonths: Number(loanTermMonths),
        annualInterestRate: Number(annualInterestRate),
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Loan Amount Input */}
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
            // Menggunakan formatCurrency dari utils untuk menampilkan nilai
            value={formatCurrency(loanAmount)}
            onChange={handleLoanAmountChange}
            className="w-full pl-12 pr-3 py-2 text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="500.000.000"
            inputMode="numeric"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <span className="text-gray-500 sm:text-sm">,00</span>
          </div>
        </div>
        <p className="mt-1 text-xs text-gray-600">
          Pemisah ribuan (titik) akan ditambahkan secara otomatis.
        </p>
        {errors.loanAmount && (
          <p className="mt-1 text-sm text-red-600">{errors.loanAmount}</p>
        )}
      </div>

      {/* Loan Term Input */}
      <div>
        <label className="block text-sm font-medium text-gray-900 mb-1">
          Tenor (jangka waktu):
        </label>
        <div className="relative">
          <input
            type="text"
            value={loanTermMonths}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setLoanTermMonths(e.target.value.replace(/[^\d]/g, ""))
            }
            className="w-full pr-14 pl-3 py-2 text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="120"
            inputMode="numeric"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <span className="text-gray-500 sm:text-sm">bulan</span>
          </div>
        </div>
        {/* Menggunakan formatDecimal untuk konsistensi */}
        <p className="mt-1 text-xs text-gray-900">
          = {formatDecimal(loanTermYears, 2)} tahun
        </p>
        {errors.loanTermMonths && (
          <p className="mt-1 text-sm text-red-600">{errors.loanTermMonths}</p>
        )}
      </div>

      {/* Interest Rate Input */}
      <div>
        <label className="block text-sm font-medium text-gray-900 mb-1">
          Suku Bunga Pinjaman:
        </label>
        <div className="relative">
          <input
            type="text"
            value={annualInterestRate}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setAnnualInterestRate(e.target.value)
            }
            className="w-full pr-20 pl-3 py-2 text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="14.6"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <span className="text-gray-500 sm:text-sm">% / tahun</span>
          </div>
        </div>
        {/* Menggunakan formatDecimal untuk konsistensi */}
        <p className="mt-1 text-xs text-gray-900">
          = {formatDecimal(monthlyInterestRate, 2)} % / bulan
        </p>
        {errors.annualInterestRate && (
          <p className="mt-1 text-sm text-red-600">
            {errors.annualInterestRate}
          </p>
        )}
      </div>

      {/* Calculation Method Display */}
      <div className="border-t border-gray-200 pt-4">
        <h3 className="font-medium text-gray-900 mb-3">
          Metode Perhitungan Bunga
        </h3>
        <div className="bg-gray-50 p-3 rounded-md">
          <span className="text-gray-900 font-medium">Anuitas</span>
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

#### **`components/ui/form/Input.tsx`**
Ini adalah komponen input dasar yang paling fleksibel, dilengkapi dengan label, error, unit, dan prefix.

```typescript
// components/ui/form/Input.tsx
import { FC, ChangeEvent } from "react";

interface FormInputProps {
  id: string;
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
```

---

#### **`components/ui/form/CurrencyInput.tsx`**
Komponen khusus untuk input mata uang (Rupiah).

```typescript
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
  label: string;
  value: string;
  onValueChange: (value: string) => void; // Mengirim nilai numerik string
  error?: string;
  placeholder?: string;
  info?: string;
}

export const CurrencyInput: FC<CurrencyInputProps> = ({
  id,
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
```

---

#### **`components/ui/form/PercentInput.tsx`**
Komponen khusus untuk input persentase.

```typescript
// components/ui/form/PercentInput.tsx
import { FC, ChangeEvent } from "react";
import { Input } from "./Input";

interface PercentInputProps {
  id: string;
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
```

---

#### **`components/ui/form/YearInput.tsx`**
Komponen khusus untuk input tahun.

```typescript
// components/ui/form/YearInput.tsx
import { FC, ChangeEvent } from "react";
import { Input } from "./Input";

interface YearInputProps {
  id: string;
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
```

---

#### **`components/ui/form/Button.tsx`**
Komponen tombol yang bisa dikonfigurasi.

```typescript
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
```

---

#### **`components/ui/form/index.ts`**
File ini berguna untuk mempermudah impor.

```typescript
// components/ui/form/index.ts
export * from './Input';
export * from './CurrencyInput';
export * from './PercentInput';
export * from './YearInput';
export * from './Button';
```

### 2. Cara Menggunakan Komponen Baru

Sekarang, mari kita refactor salah satu form Anda, misalnya `CarLoanSimpleForm.tsx`, untuk menggunakan komponen-komponen baru ini.

**Sebelum Refactor (kode Anda):**
```typescript
// components/car-loan/simple/CarLoanSimpleForm.tsx (Lama)
// ... (kode panjang seperti yang Anda berikan)
```

**Setelah Refactor (menggunakan komponen baru):**
Kode menjadi jauh lebih singkat, bersih, dan mudah dibaca.

```typescript
// components/car-loan/simple/CarLoanSimpleForm.tsx (Baru)
"use client";

import { useState, FormEvent } from "react";
import {
  CurrencyInput,
  PercentInput,
  YearInput,
  Input, // Untuk bunga
  Button,
} from "@/components/ui/form"; // Impor mudah dari satu tempat

// Interface bisa dipindahkan ke file types/
interface FormData {
  carPrice: string;
  downPaymentPercent: string;
  loanTerm: string;
  interestRate: string;
}

interface FormErrors {
  [key: string]: string | undefined;
}

interface CarLoanSimpleFormProps {
  onCalculate: (formData: { [K in keyof FormData]: number }) => void;
}

export default function CarLoanSimpleForm({ onCalculate }: CarLoanSimpleFormProps) {
  const [formData, setFormData] = useState<FormData>({
    carPrice: "250000000",
    downPaymentPercent: "30",
    loanTerm: "5",
    interestRate: "4.8",
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleCurrencyChange = (name: keyof FormData) => (value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = (): boolean => {
    // ... (logika validasi tetap sama, tidak perlu diubah)
    const newErrors: FormErrors = {};
    if (Number(formData.carPrice) <= 0) newErrors.carPrice = "Harga mobil harus positif";
    if (Number(formData.downPaymentPercent) <= 0 || Number(formData.downPaymentPercent) >= 100) newErrors.downPaymentPercent = "DP harus antara 1-99%";
    if (Number(formData.loanTerm) <= 0) newErrors.loanTerm = "Tenor harus positif";
    if (Number(formData.interestRate) < 0) newErrors.interestRate = "Bunga tidak boleh negatif";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      const numericData = {
        carPrice: Number(formData.carPrice),
        downPaymentPercent: Number(formData.downPaymentPercent),
        loanTerm: Number(formData.loanTerm),
        interestRate: Number(formData.interestRate.replace(",", ".")),
      };
      onCalculate(numericData);
    }
  };
  
  const loanTermMonths = Number(formData.loanTerm) * 12;
  const monthlyInterestRate = (Number(formData.interestRate.replace(",", ".")) / 12).toFixed(2);

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <CurrencyInput
        id="carPrice"
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
        info={`= ${loanTermMonths} bulan`}
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
        info={`= ${monthlyInterestRate}% / bulan`}
      />

      <Button type="submit">
        Hitung Simulasi
      </Button>
    </form>
  );
}