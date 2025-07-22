// features/credit/annuity/CreditAnnuityForm.tsx (Refactored)
"use client";

import { useState, useMemo, FormEvent, ChangeEvent } from "react";
import {
  CurrencyInput,
  Input, // Komponen input generik
  Button,
} from "@/components/ui/form"; // Asumsi path ke komponen UI Anda
import { formatPercent } from "@/utils/formatters"; // Menggunakan formatter baru

// --- Interface & Tipe ---
// State form akan menyimpan semua nilai sebagai string
interface FormData {
  loanAmount: string;
  loanTermMonths: string;
  annualInterestRate: string;
}

// Tipe data untuk error validasi
interface FormErrors {
  [key: string]: string | undefined;
}

// Tipe data untuk properti komponen
interface CreditAnnuityFormProps {
  // onCalculate akan menerima objek dengan nilai numerik
  onCalculate: (data: { [K in keyof FormData]: number }) => void;
}

// --- Komponen Form Utama ---
export default function CreditAnnuityForm({
  onCalculate,
}: CreditAnnuityFormProps) {
  // 1. Menggunakan satu state object untuk semua data form
  const [formData, setFormData] = useState<FormData>({
    loanAmount: "500000000",
    loanTermMonths: "120",
    annualInterestRate: "14.6",
  });
  const [errors, setErrors] = useState<FormErrors>({});

  // 2. Menggunakan useMemo untuk kalkulasi turunan agar lebih efisien
  const { loanTermYears, monthlyInterestRate } = useMemo(() => {
    const term = parseInt(formData.loanTermMonths, 10) || 0;
    // Menggunakan replace untuk menangani input desimal dengan koma atau titik
    const rate = parseFloat(formData.annualInterestRate.replace(",", ".")) || 0;
    return {
      loanTermYears: term / 12,
      monthlyInterestRate: rate / 12,
    };
  }, [formData.loanTermMonths, formData.annualInterestRate]);

  // --- Event Handlers ---
  // 3. Handler generik untuk input standar (teks, angka)
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // Membersihkan input tenor agar hanya menerima angka
    if (name === "loanTermMonths") {
      setFormData((prev) => ({ ...prev, [name]: value.replace(/[^\d]/g, "") }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // 4. Handler khusus untuk CurrencyInput yang mengembalikan nilai string numerik
  const handleLoanAmountChange = (value: string) => {
    setFormData((prev) => ({ ...prev, loanAmount: value }));
  };

  // --- Validasi & Submit ---
  // Logika validasi disesuaikan untuk membaca dari state object
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    const { loanAmount, loanTermMonths, annualInterestRate } = formData;

    if (parseFloat(loanAmount) <= 0) {
      newErrors.loanAmount = "Jumlah pinjaman harus berupa angka positif.";
    }
    if (
      !Number.isInteger(parseFloat(loanTermMonths)) ||
      parseFloat(loanTermMonths) <= 0
    ) {
      newErrors.loanTermMonths = "Tenor harus berupa bilangan bulat positif.";
    }
    if (parseFloat(annualInterestRate.replace(",", ".")) < 0) {
      newErrors.annualInterestRate = "Suku bunga tidak boleh negatif.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (validateForm()) {
      // 5. Konversi semua state string ke number sebelum dikirim
      const numericData = {
        loanAmount: parseFloat(formData.loanAmount),
        loanTermMonths: parseInt(formData.loanTermMonths, 10),
        annualInterestRate: parseFloat(
          formData.annualInterestRate.replace(",", ".")
        ),
      };
      onCalculate(numericData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* 6. Menggunakan komponen CurrencyInput yang sudah jadi */}
      <CurrencyInput
        id="loanAmount"
        name="loanAmount"
        label="Jumlah Pinjaman"
        value={formData.loanAmount}
        onValueChange={handleLoanAmountChange}
        error={errors.loanAmount}
        placeholder="500.000.000"
        info="Pemisah ribuan akan ditambahkan otomatis."
      />

      {/* 7. Menggunakan komponen Input generik untuk tenor */}
      <Input
        id="loanTermMonths"
        name="loanTermMonths" // 'name' diperlukan untuk handleInputChange
        label="Tenor (jangka waktu)"
        value={formData.loanTermMonths}
        onChange={handleInputChange}
        error={errors.loanTermMonths}
        unit="bulan"
        placeholder="120"
        inputMode="numeric"
        info={`= ${loanTermYears.toFixed(2)} tahun`}
      />

      {/* 8. Menggunakan komponen Input generik untuk bunga */}
      <Input
        id="annualInterestRate"
        name="annualInterestRate" // 'name' diperlukan untuk handleInputChange
        label="Suku Bunga Pinjaman"
        value={formData.annualInterestRate}
        onChange={handleInputChange}
        error={errors.annualInterestRate}
        unit="% / tahun"
        placeholder="14.6"
        inputMode="decimal"
        // Menggunakan formatter baru untuk tampilan yang konsisten
        info={`= ${formatPercent(monthlyInterestRate, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 3,
        })} / bulan`}
      />

      {/* Bagian ini tidak perlu diubah */}
      <div className="border-t border-gray-200 pt-4">
        <h3 className="font-medium text-gray-900 mb-3">
          Metode Perhitungan Bunga
        </h3>
        <div className="bg-gray-50 p-3 rounded-md">
          <span className="text-gray-900 font-medium">Anuitas</span>
        </div>
      </div>

      {/* 9. Menggunakan komponen Button yang reusable */}
      <Button type="submit" fullWidth>
        Hitung Simulasi
      </Button>
    </form>
  );
}
