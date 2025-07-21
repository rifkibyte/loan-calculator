"use client";

import { useState, useMemo, FC, ChangeEvent, FormEvent } from "react";
import { formatCurrency, parseToNumericString } from "@/utils/formatters"; // Impor fungsi baru

// --- Interface & Tipe ---
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

// --- Komponen Input Kustom untuk mengurangi repetisi ---
interface FormInputProps {
  id: keyof FormData;
  label: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  unit?: string;
  placeholder?: string;
  info?: string | React.ReactNode;
  isCurrency?: boolean;
}

const FormInput: FC<FormInputProps> = ({
  id,
  label,
  value,
  onChange,
  error,
  unit,
  placeholder,
  info,
  isCurrency,
}) => (
  <div>
    <label
      htmlFor={id}
      className="block text-sm font-medium text-gray-900 mb-1"
    >
      {label}
    </label>
    <div className="relative">
      {isCurrency && (
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <span className="text-gray-500 sm:text-sm">Rp</span>
        </div>
      )}
      <input
        type="text"
        id={id}
        name={id}
        value={isCurrency ? formatCurrency(value) : value}
        onChange={onChange}
        className={`w-full py-2 text-gray-900 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          isCurrency
            ? "pl-9 pr-3"
            : `pr-${unit ? String(unit).length * 4 : 3} pl-3`
        } ${error ? "border-red-500" : "border-gray-300"}`}
        placeholder={placeholder}
        inputMode={id === "interestRate" ? "decimal" : "numeric"}
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

// --- Komponen Form Utama ---
export default function CarLoanBudgetForm({ onCalculate }: LoanFormProps) {
  const [formData, setFormData] = useState<FormData>({
    budget: "2500000",
    downPaymentPercent: "30",
    loanTerm: "5",
    interestRate: "4.6",
  });
  const [errors, setErrors] = useState<FormErrors>({});

  // Gunakan `useMemo` untuk kalkulasi agar tidak dihitung ulang setiap render
  const { loanTermMonths, monthlyInterestRate } = useMemo(() => {
    const term = parseFloat(formData.loanTerm) || 0;
    const rate = parseFloat(formData.interestRate.replace(",", ".")) || 0;
    return {
      loanTermMonths: term * 12,
      monthlyInterestRate: rate / 12,
    };
  }, [formData.loanTerm, formData.interestRate]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // Gunakan parser untuk membersihkan input secara real-time
    const cleanedValue = parseToNumericString(value);

    setFormData((prev) => ({ ...prev, [name]: cleanedValue }));
  };

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
      // Konversi semua nilai string ke number sebelum dikirim
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
      <FormInput
        id="budget"
        label="Budget Angsuran (per bulan)"
        value={formData.budget}
        onChange={handleInputChange}
        error={errors.budget}
        placeholder="2.500.000"
        isCurrency
      />
      <FormInput
        id="downPaymentPercent"
        label="Uang Muka (DP)"
        value={formData.downPaymentPercent}
        onChange={handleInputChange}
        error={errors.downPaymentPercent}
        unit="%"
        placeholder="30"
        info="(persen dari harga OTR)"
      />
      <FormInput
        id="loanTerm"
        label="Tenor (jangka waktu)"
        value={formData.loanTerm}
        onChange={handleInputChange}
        error={errors.loanTerm}
        unit="tahun"
        placeholder="5"
        info={`= ${loanTermMonths} bulan`}
      />
      <FormInput
        id="interestRate"
        label="Bunga Pinjaman (flat)"
        value={formData.interestRate}
        onChange={handleInputChange}
        error={errors.interestRate}
        unit="% / tahun"
        placeholder="4.6"
        info={`= ${monthlyInterestRate.toFixed(3)}% / bulan`}
      />

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 font-medium"
      >
        Hitung Simulasi
      </button>
    </form>
  );
}
