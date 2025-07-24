"use client";

import { useState, useMemo, FormEvent, ChangeEvent } from "react";
import {
  CurrencyInput,
  PercentInput,
  YearInput,
  Input,
  Button,
} from "@/components/ui/form";
import {
  getMaxLoanAmount,
  getMaxLoanTerm,
} from "@/utils/calculators/other-credit/multiPurposeLoanCalculator";
import { formatCurrencyDisplay } from "@/utils/formatters"; // Pastikan formatter ini diimpor

// --- Interfaces & Types ---
type ApplicantType = "employee" | "professional" | "entrepreneur";

interface FormData {
  loanAmount: string;
  loanTerm: string;
  interestRate: string;
  variableRate: string;
  fixedRatePeriod: string;
  applicantType: ApplicantType;
  provisionPercent: string;
  adminFee: string;
}

interface FormErrors {
  [key: string]: string | undefined;
}

interface MultiPurposeLoanFormProps {
  onCalculate: (data: {
    loanAmount: number;
    loanTerm: number;
    interestRate: number;
    variableRate: number;
    fixedRatePeriod: number;
    applicantType: ApplicantType;
    provisionPercent: number;
    adminFee: number;
  }) => void;
}

const APPLICANT_TYPES: { value: ApplicantType; label: string }[] = [
  { value: "employee", label: "Pegawai" },
  { value: "professional", label: "Profesional" },
  { value: "entrepreneur", label: "Wiraswasta" },
];

// --- Main Form Component ---
export default function MultiPurposeLoanForm({
  onCalculate,
}: MultiPurposeLoanFormProps) {
  // --- State ---
  const [formData, setFormData] = useState<FormData>({
    loanAmount: "100000000",
    loanTerm: "7",
    interestRate: "6.0",
    variableRate: "8.0",
    fixedRatePeriod: "3",
    applicantType: "employee",
    provisionPercent: "1.0",
    adminFee: "500000",
  });
  const [errors, setErrors] = useState<FormErrors>({});

  // --- Derived Calculations with useMemo ---
  const { maxLoanAmount, maxLoanTerm } = useMemo(() => {
    return {
      maxLoanAmount: getMaxLoanAmount(formData.applicantType),
      maxLoanTerm: getMaxLoanTerm(formData.applicantType),
    };
  }, [formData.applicantType]);

  // --- Event Handlers ---
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCurrencyChange = (name: keyof FormData) => (value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // --- Validation & Submit ---
  const validateForm = (): boolean => {
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
    if (numLoanAmount <= 0) {
      newErrors.loanAmount = "Jumlah pinjaman harus berupa angka positif.";
    } else if (numLoanAmount > maxLoanAmount) {
      newErrors.loanAmount = `Jumlah pinjaman maks. ${formatCurrencyDisplay(
        maxLoanAmount,
      )} untuk pemohon ini.`;
    }

    const numLoanTerm = parseFloat(loanTerm);
    if (!Number.isInteger(numLoanTerm) || numLoanTerm <= 0) {
      newErrors.loanTerm = "Tenor harus bilangan bulat positif.";
    } else if (numLoanTerm < 7) {
      newErrors.loanTerm = "Tenor minimum adalah 7 tahun.";
    } else if (numLoanTerm > maxLoanTerm) {
      newErrors.loanTerm = `Tenor maks. ${maxLoanTerm} tahun untuk pemohon ini.`;
    }

    if (parseFloat(interestRate.replace(",", ".")) < 0) {
      newErrors.interestRate = "Suku bunga tetap tidak boleh negatif.";
    }
    if (parseFloat(variableRate.replace(",", ".")) < 0) {
      newErrors.variableRate = "Suku bunga mengambang tidak boleh negatif.";
    }
    if (parseFloat(fixedRatePeriod) <= 0) {
      newErrors.fixedRatePeriod =
        "Periode bunga tetap harus berupa angka positif.";
    }
    if (parseFloat(provisionPercent.replace(",", ".")) < 0) {
      newErrors.provisionPercent = "Provisi tidak boleh negatif.";
    }
    if (parseFloat(adminFee) < 0) {
      newErrors.adminFee = "Biaya administrasi tidak boleh negatif.";
    }

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
        variableRate: parseFloat(formData.variableRate.replace(",", ".")),
        fixedRatePeriod: parseFloat(formData.fixedRatePeriod),
        applicantType: formData.applicantType,
        provisionPercent: parseFloat(
          formData.provisionPercent.replace(",", "."),
        ),
        adminFee: parseFloat(formData.adminFee),
      };
      onCalculate(numericData);
    }
  };

  // --- JSX ---
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-blue-50 p-4 rounded-lg">
        <h3 className="font-semibold text-blue-800 mb-2">
          Kredit Multi Guna Bank Mandiri
        </h3>
        <ul className="text-sm text-blue-700 space-y-1 list-disc list-inside">
          <li>Suku bunga kompetitif mulai 6.00% fix 3 tahun pertama</li>
          <li>Tenor minimum 7 tahun</li>
          <li>Limit hingga Rp 10 milyar (Pegawai/Profesional)</li>
          <li>Limit hingga Rp 200 juta (Wiraswasta)</li>
        </ul>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-900 mb-2">
          Jenis Pemohon
        </label>
        <div className="grid grid-cols-1 gap-2">
          {APPLICANT_TYPES.map(({ value, label }) => (
            <label
              key={value}
              className="flex items-center p-3 border rounded-md has-[:checked]:bg-blue-50 has-[:checked]:border-blue-500 transition-colors cursor-pointer"
            >
              <input
                type="radio"
                name="applicantType"
                value={value}
                checked={formData.applicantType === value}
                onChange={handleInputChange}
                className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-3 text-sm text-gray-900">
                {label}
                <span className="block text-xs text-gray-500">
                  Maks. Pinjaman: {formatCurrencyDisplay(getMaxLoanAmount(value))}
                  , Maks. Tenor: {getMaxLoanTerm(value)} tahun
                </span>
              </span>
            </label>
          ))}
        </div>
      </div>

      <CurrencyInput
        id="loanAmount"
        name="loanAmount"
        label="Jumlah Pinjaman"
        value={formData.loanAmount}
        onValueChange={handleCurrencyChange("loanAmount")}
        error={errors.loanAmount}
        placeholder="100.000.000"
        info={`Maksimal pinjaman untuk pemohon ini: ${formatCurrencyDisplay(
          maxLoanAmount,
        )}`}
      />

      <YearInput
        id="loanTerm"
        name="loanTerm"
        label="Tenor (jangka waktu)"
        value={formData.loanTerm}
        onChange={handleInputChange}
        error={errors.loanTerm}
        placeholder="7"
        info={`Minimum: 7 tahun, Maksimal: ${maxLoanTerm} tahun`}
      />

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
