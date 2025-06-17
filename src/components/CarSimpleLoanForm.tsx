"use client";

import { useState } from "react";
import { CarSimpleLoanFormData } from "@/utils/carSimpleLoanCalculator";

interface CarSimpleLoanFormProps {
  onCalculate: (formData: CarSimpleLoanFormData) => void;
}

interface FormErrors {
  carPrice?: string;
  loanTerm?: string;
  interestRate?: string;
  downPaymentPercent?: string;
}

export default function CarSimpleLoanForm({ onCalculate }: CarSimpleLoanFormProps) {
  const [formData, setFormData] = useState<CarSimpleLoanFormData>({
    carPrice: 250000000,
    loanTermYears: 5,
    annualInterestRate: 4.8,
    downPaymentPercent: 30
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const formatNumber = (num: number): string => {
    return new Intl.NumberFormat('id-ID').format(num);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numericValue = parseFloat(value) || 0;
    
    setFormData(prev => ({
      ...prev,
      [name]: numericValue
    }));
    
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (formData.carPrice <= 0) {
      newErrors.carPrice = 'Harga mobil harus lebih dari 0';
    }
    
    if (formData.loanTermYears <= 0 || formData.loanTermYears > 10) {
      newErrors.loanTerm = 'Tenor harus antara 1-10 tahun';
    }
    
    if (formData.annualInterestRate <= 0 || formData.annualInterestRate > 50) {
      newErrors.interestRate = 'Bunga harus antara 0.1-50%';
    }
    
    if (formData.downPaymentPercent < 0 || formData.downPaymentPercent >= 100) {
      newErrors.downPaymentPercent = 'DP harus antara 0-99%';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      onCalculate(formData);
    }
  };

  const handleReset = () => {
    setFormData({
      carPrice: 250000000,
      loanTermYears: 5,
      annualInterestRate: 4.8,
      downPaymentPercent: 30
    });
    setErrors({});
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        Input Data Kredit
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Car Price */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Harga Mobil OTR
          </label>
          <input
            type="number"
            name="carPrice"
            value={formData.carPrice}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 ${
              errors.carPrice ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="250000000"
          />
          <p className="text-xs text-gray-500 mt-1">
            masukkan angka, tidak boleh pakai koma atau titik
          </p>
          <p className="text-sm text-blue-600 font-medium">
            Rp {formatNumber(formData.carPrice)}
          </p>
          {errors.carPrice && (
            <p className="text-red-500 text-xs mt-1">{errors.carPrice}</p>
          )}
        </div>

        {/* Loan Term */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tenor (jangka waktu)
          </label>
          <input
            type="number"
            name="loanTermYears"
            value={formData.loanTermYears}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 ${
              errors.loanTerm ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="5"
            min="1"
            max="10"
          />
          <p className="text-xs text-gray-500 mt-1">
            masukkan angka, tidak boleh pakai koma atau titik
          </p>
          <p className="text-sm text-blue-600 font-medium">
            = {formData.loanTermYears * 12} bulan
          </p>
          {errors.loanTerm && (
            <p className="text-red-500 text-xs mt-1">{errors.loanTerm}</p>
          )}
        </div>

        {/* Interest Rate */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Bunga Pinjaman
          </label>
          <input
            type="number"
            name="annualInterestRate"
            value={formData.annualInterestRate}
            onChange={handleInputChange}
            step="0.1"
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 ${
              errors.interestRate ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="4.8"
          />
          <p className="text-xs text-gray-500 mt-1">
            masukkan angka, misal 6.5
          </p>
          <p className="text-sm text-blue-600 font-medium">
            = {(formData.annualInterestRate / 12).toFixed(2)} % / bulan
          </p>
          {errors.interestRate && (
            <p className="text-red-500 text-xs mt-1">{errors.interestRate}</p>
          )}
        </div>

        {/* Down Payment */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Uang Muka (DP)
          </label>
          <input
            type="number"
            name="downPaymentPercent"
            value={formData.downPaymentPercent}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 ${
              errors.downPaymentPercent ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="30"
            min="0"
            max="99"
          />
          <p className="text-xs text-gray-500 mt-1">
            (persen dari harga OTR)
          </p>
          {errors.downPaymentPercent && (
            <p className="text-red-500 text-xs mt-1">{errors.downPaymentPercent}</p>
          )}
        </div>

        {/* Interest Calculation Method */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Perhitungan Bunga
          </label>
          <div className="px-3 py-2 bg-gray-100 border border-gray-300 rounded-md">
            <span className="text-gray-700">Flat</span>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
          >
            Hitung Simulasi
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}
