"use client";

import { useState, FormEvent, ChangeEvent } from "react";
import {
  CurrencyInput,
  PercentInput,
  YearInput,
  Input,
  Button,
} from "@/components/ui/form";
import { formatCurrencyDisplay } from "@/utils/formatters";
// FIX: Impor tipe data yang sudah diperbarui
import { MultiPurposeLoanFormData } from "@/types/multi-purpose-loan";

// ... (Konstanta MAX_LOAN_AMOUNT, dll. tetap sama)
const MAX_LOAN_AMOUNT = 10000000000;
const MAX_LOAN_TERM = 15;
const MIN_LOAN_TERM = 7;

// --- Interfaces & Types ---
// Interface FormData lokal untuk state string
interface FormData {
  loanAmount: string;
  loanTerm: string;
  interestRate: string;
  variableRate: string;
  fixedRatePeriod: string;
  provisionPercent: string;
  adminFee: string;
}

interface FormErrors {
  [key: string]: string | undefined;
}

// FIX: Gunakan MultiPurposeLoanFormData secara langsung untuk onCalculate
interface MultiPurposeLoanFormProps {
  onCalculate: (data: MultiPurposeLoanFormData) => void;
}

// --- Main Form Component ---
export default function MultiPurposeLoanForm({
  onCalculate,
}: MultiPurposeLoanFormProps) {
  // ... (State dan handler tidak perlu diubah)
  const [formData, setFormData] = useState<FormData>({
    loanAmount: "100000000",
    loanTerm: "7",
    interestRate: "6.0",
    variableRate: "8.0",
    fixedRatePeriod: "3",
    provisionPercent: "1.0",
    adminFee: "500000",
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCurrencyChange = (name: keyof FormData) => (value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = (): boolean => {
    // ... (Logika validasi tidak berubah)
    const newErrors: FormErrors = {};
    const {
      loanAmount,
      loanTerm,
      interestRate,
      variableRate,
      fixedRatePeriod,
      provisionPercent,
      adminFee,
    } = formData;

    const numLoanAmount = parseFloat(loanAmount);
    if (numLoanAmount <= 0)
      newErrors.loanAmount = "Jumlah pinjaman harus berupa angka positif.";
    else if (numLoanAmount > MAX_LOAN_AMOUNT)
      newErrors.loanAmount = `Jumlah pinjaman maksimal ${formatCurrencyDisplay(
        MAX_LOAN_AMOUNT
      )}.`;

    const numLoanTerm = parseFloat(loanTerm);
    if (!Number.isInteger(numLoanTerm) || numLoanTerm <= 0)
      newErrors.loanTerm = "Tenor harus bilangan bulat positif.";
    else if (numLoanTerm < MIN_LOAN_TERM)
      newErrors.loanTerm = `Tenor minimum adalah ${MIN_LOAN_TERM} tahun.`;
    else if (numLoanTerm > MAX_LOAN_TERM)
      newErrors.loanTerm = `Tenor maksimal adalah ${MAX_LOAN_TERM} tahun.`;

    if (parseFloat(interestRate.replace(",", ".")) < 0)
      newErrors.interestRate = "Suku bunga tetap tidak boleh negatif.";
    if (parseFloat(variableRate.replace(",", ".")) < 0)
      newErrors.variableRate = "Suku bunga mengambang tidak boleh negatif.";
    if (parseFloat(fixedRatePeriod) <= 0)
      newErrors.fixedRatePeriod =
        "Periode bunga tetap harus berupa angka positif.";
    if (parseFloat(provisionPercent.replace(",", ".")) < 0)
      newErrors.provisionPercent = "Provisi tidak boleh negatif.";
    if (parseFloat(adminFee) < 0)
      newErrors.adminFee = "Biaya administrasi tidak boleh negatif.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (validateForm()) {
      // Objek numericData sekarang akan cocok dengan tipe MultiPurposeLoanFormData yang baru
      const numericData: MultiPurposeLoanFormData = {
        loanAmount: parseFloat(formData.loanAmount),
        loanTerm: parseFloat(formData.loanTerm),
        interestRate: parseFloat(formData.interestRate.replace(",", ".")),
        variableRate: parseFloat(formData.variableRate.replace(",", ".")),
        fixedRatePeriod: parseFloat(formData.fixedRatePeriod),
        provisionPercent: parseFloat(
          formData.provisionPercent.replace(",", ".")
        ),
        adminFee: parseFloat(formData.adminFee),
      };
      onCalculate(numericData);
    }
  };
  // --- JSX (Bagian Jenis Pemohon Dihapus) ---
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Input Jenis Pemohon telah dihapus */}

      <CurrencyInput
        id="loanAmount"
        name="loanAmount"
        label="Jumlah Pinjaman"
        value={formData.loanAmount}
        onValueChange={handleCurrencyChange("loanAmount")}
        error={errors.loanAmount}
        placeholder="100.000.000"
        info={`Maksimal pinjaman: ${formatCurrencyDisplay(MAX_LOAN_AMOUNT)}`}
      />

      <YearInput
        id="loanTerm"
        name="loanTerm"
        label="Tenor (jangka waktu)"
        value={formData.loanTerm}
        onChange={handleInputChange}
        error={errors.loanTerm}
        placeholder="7"
        info={`Minimum: ${MIN_LOAN_TERM} tahun, Maksimal: ${MAX_LOAN_TERM} tahun`}
      />

      {/* Bagian Suku Bunga dan Biaya Lainnya tidak berubah */}
      <div className="border-t border-gray-200 pt-6 space-y-4">
        <h3 className="text-lg font-medium leading-6 text-gray-900">
          Suku Bunga
        </h3>
        <YearInput
          id="fixedRatePeriod"
          name="fixedRatePeriod"
          label="Periode Bunga Tetap"
          value={formData.fixedRatePeriod}
          onChange={handleInputChange}
          error={errors.fixedRatePeriod}
          placeholder="3"
        />
        <Input
          id="interestRate"
          name="interestRate"
          label={`Bunga Tetap (${formData.fixedRatePeriod} tahun pertama)`}
          value={formData.interestRate}
          onChange={handleInputChange}
          error={errors.interestRate}
          unit="% / tahun"
          placeholder="6.0"
          inputMode="decimal"
        />
        <Input
          id="variableRate"
          name="variableRate"
          label={`Bunga Mengambang (setelah tahun ke-${formData.fixedRatePeriod})`}
          value={formData.variableRate}
          onChange={handleInputChange}
          error={errors.variableRate}
          unit="% / tahun"
          placeholder="8.0"
          inputMode="decimal"
          info="*Suku bunga dapat berubah sewaktu-waktu."
        />
      </div>

      <div className="border-t border-gray-200 pt-6 space-y-4">
        <h3 className="text-lg font-medium leading-6 text-gray-900">
          Biaya Lainnya
        </h3>
        <PercentInput
          id="provisionPercent"
          name="provisionPercent"
          label="Provisi"
          value={formData.provisionPercent}
          onChange={handleInputChange}
          error={errors.provisionPercent}
          placeholder="1.0"
          info="(persen dari total pinjaman)"
        />
        <CurrencyInput
          id="adminFee"
          name="adminFee"
          label="Biaya Administrasi"
          value={formData.adminFee}
          onValueChange={handleCurrencyChange("adminFee")}
          error={errors.adminFee}
          placeholder="500.000"
        />
      </div>

      <Button type="submit" fullWidth>
        Hitung Simulasi Kredit
      </Button>
    </form>
  );
}
