"use client";

import { useState, useMemo, FormEvent, ChangeEvent } from "react";
import { CurrencyInput, YearInput, Input, Button } from "@/components/ui/form";
import { formatPercent } from "@/utils/formatters"; // Impor formatter

// --- Interfaces & Types ---
interface FormData {
  loanAmount: string;
  loanTerm: string;
  interestRate: string;
  loanPurpose: "working-capital" | "investment" | "consumptive" | "";
  adminFee: string;
  insuranceFee: string;
}

interface FormErrors {
  [key: string]: string | undefined;
}

interface PeopleBusinessCreditFormProps {
  onCalculate: (data: {
    loanAmount: number;
    loanTerm: number;
    interestRate: number;
    loanPurpose: string;
    adminFee: number;
    insuranceFee: number;
  }) => void;
}

const LOAN_PURPOSE_OPTIONS = [
  { value: "working-capital", label: "Modal Kerja" },
  { value: "investment", label: "Investasi" },
  { value: "consumptive", label: "Konsumtif" },
];

// --- Main Form Component ---
export default function PeopleBusinessCreditForm({
  onCalculate,
}: PeopleBusinessCreditFormProps) {
  // --- State ---
  const [formData, setFormData] = useState<FormData>({
    loanAmount: "50000000",
    loanTerm: "3",
    interestRate: "15",
    loanPurpose: "working-capital",
    adminFee: "500000",
    insuranceFee: "300000",
  });
  const [errors, setErrors] = useState<FormErrors>({});

  // --- Derived Calculations with useMemo ---
  const { loanTermMonths, monthlyInterestRate } = useMemo(() => {
    const term = parseFloat(formData.loanTerm) || 0;
    const rate = parseFloat(formData.interestRate.replace(",", ".")) || 0;
    return {
      loanTermMonths: term * 12,
      monthlyInterestRate: rate > 0 ? rate / 12 : 0,
    };
  }, [formData.loanTerm, formData.interestRate]);

  // --- Event Handlers ---
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value as any }));
  };

  const handleCurrencyChange = (name: keyof FormData) => (value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // --- Validation & Submit ---
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    const { loanAmount, loanTerm, interestRate, loanPurpose } = formData;

    const numLoanAmount = parseFloat(loanAmount);
    if (numLoanAmount <= 0) {
      newErrors.loanAmount = "Jumlah pinjaman harus berupa angka positif.";
    } else if (numLoanAmount > 500000000) {
      newErrors.loanAmount = "Jumlah pinjaman KUR maksimal Rp 500.000.000.";
    }

    const numLoanTerm = parseFloat(loanTerm);
    if (!Number.isInteger(numLoanTerm) || numLoanTerm <= 0) {
      newErrors.loanTerm = "Tenor harus berupa bilangan bulat positif.";
    } else if (numLoanTerm > 5) {
      newErrors.loanTerm = "Tenor KUR maksimal 5 tahun.";
    }

    if (parseFloat(interestRate.replace(",", ".")) < 0) {
      newErrors.interestRate = "Suku bunga tidak boleh negatif.";
    }
    if (!loanPurpose) {
      newErrors.loanPurpose = "Tujuan pinjaman harus dipilih.";
    }

    // Validasi biaya bisa ditambahkan di sini jika perlu
    // if (parseFloat(adminFee) < 0) ...
    // if (parseFloat(insuranceFee) < 0) ...

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (validateForm()) {
      const numericData = {
        loanAmount: parseFloat(formData.loanAmount),
        loanTerm: parseFloat(formData.loanTerm),
        interestRate: parseFloat(formData.interestRate.replace(",", ".")),
        loanPurpose: formData.loanPurpose,
        adminFee: parseFloat(formData.adminFee),
        insuranceFee: parseFloat(formData.insuranceFee),
      };
      onCalculate(numericData);
    }
  };

  // --- JSX ---
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">
          Simulasi Kredit Usaha Rakyat (KUR)
        </h2>
      </div>

      <CurrencyInput
        id="loanAmount"
        name="loanAmount"
        label="Jumlah Pinjaman"
        value={formData.loanAmount}
        onValueChange={handleCurrencyChange("loanAmount")}
        error={errors.loanAmount}
        placeholder="50.000.000"
        info="Maksimal Rp 500.000.000"
      />

      <div>
        <label
          htmlFor="loanPurpose"
          className="block text-sm font-medium text-gray-900 mb-1"
        >
          Tujuan Pinjaman
        </label>
        <select
          id="loanPurpose"
          name="loanPurpose"
          value={formData.loanPurpose}
          onChange={handleInputChange}
          className={`w-full pl-3 pr-3 py-2 text-gray-900 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.loanPurpose ? "border-red-500" : "border-gray-300"
          }`}
        >
          <option value="">Pilih Tujuan Pinjaman</option>
          {LOAN_PURPOSE_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {errors.loanPurpose && (
          <p className="mt-1 text-sm text-red-600">{errors.loanPurpose}</p>
        )}
      </div>

      <YearInput
        id="loanTerm"
        name="loanTerm"
        label="Tenor (jangka waktu)"
        value={formData.loanTerm}
        onChange={handleInputChange}
        error={errors.loanTerm}
        placeholder="3"
        info={`= ${loanTermMonths} bulan (Maksimal 5 tahun)`}
      />

      <Input
        id="interestRate"
        name="interestRate"
        label="Suku Bunga KUR"
        value={formData.interestRate}
        onChange={handleInputChange}
        error={errors.interestRate}
        unit="% / tahun"
        placeholder="15"
        inputMode="decimal"
        info={`= ${formatPercent(monthlyInterestRate, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 3,
        })}/bulan`}
      />

      <div className="border-t border-gray-200 pt-6 space-y-4">
        <h3 className="text-lg font-medium leading-6 text-gray-900">
          Biaya Lainnya
        </h3>
        <CurrencyInput
          id="adminFee"
          name="adminFee"
          label="Biaya Administrasi"
          value={formData.adminFee}
          onValueChange={handleCurrencyChange("adminFee")}
          error={errors.adminFee}
          placeholder="500.000"
        />
        <CurrencyInput
          id="insuranceFee"
          name="insuranceFee"
          label="Biaya Asuransi"
          value={formData.insuranceFee}
          onValueChange={handleCurrencyChange("insuranceFee")}
          error={errors.insuranceFee}
          placeholder="300.000"
        />
      </div>

      <Button type="submit" fullWidth>
        Hitung Simulasi KUR
      </Button>
    </form>
  );
}
