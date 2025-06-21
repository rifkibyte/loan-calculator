import { useState } from "react";

interface FormData {
  loanAmount: number;
  creditRatio: number;
  monthlyInterestRate: number;
  calculationMethod: string;
}

interface FormErrors {
  loanAmount?: string;
  creditRatio?: string;
  monthlyInterestRate?: string;
}

interface PersonalLoanAmountFormProps {
  onCalculate: (formData: FormData) => void;
}

export default function PersonalLoanAmountForm({ onCalculate }: PersonalLoanAmountFormProps) {
  const [loanAmount, setLoanAmount] = useState<string>("50000000");
  const [creditRatio, setCreditRatio] = useState<string>("30");
  const [monthlyInterestRate, setMonthlyInterestRate] = useState<string>("1.25");
  const [calculationMethod] = useState<string>("FLAT");
  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!loanAmount || isNaN(Number(loanAmount)) || Number(loanAmount) <= 0) {
      newErrors.loanAmount = "Besar pinjaman harus berupa angka positif";
    }
    
    if (!creditRatio || isNaN(Number(creditRatio)) || Number(creditRatio) <= 0 || Number(creditRatio) > 100) {
      newErrors.creditRatio = "Baki kredit harus antara 1-100%";
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
        loanAmount: Number(loanAmount),
        creditRatio: Number(creditRatio),
        monthlyInterestRate: Number(monthlyInterestRate),
        calculationMethod
      });
    }
  };

  const formatInputCurrency = (value: string): string => {
    return value.replace(/[^\d]/g, "");
  };

  const formatCurrency = (value: string): string => {
    if (!value) return "";
    const number = parseInt(value.replace(/[^\d]/g, ""));
    if (isNaN(number)) return "";
    return new Intl.NumberFormat("id-ID").format(number);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        Simulasi KTA
      </h2>
      
      {/* Loan Amount */}
      <div>
        <label className="block text-sm font-medium text-gray-900 mb-1">
          Besar Pinjaman
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <span className="text-gray-500 sm:text-sm">Rp</span>
          </div>
          <input
            type="text"
            value={formatCurrency(loanAmount)}
            onChange={(e) => setLoanAmount(formatInputCurrency(e.target.value))}
            className="w-full pl-12 pr-3 py-2 text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="50.000.000"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <span className="text-gray-500 sm:text-sm">,00</span>
          </div>
        </div>
        <p className="mt-1 text-xs text-gray-600">
          masukkan angka, tidak boleh pakai koma atau titik
        </p>
        {errors.loanAmount && (
          <p className="mt-1 text-sm text-red-600">{errors.loanAmount}</p>
        )}
      </div>
      
      {/* Credit Ratio */}
      <div>
        <label className="block text-sm font-medium text-gray-900 mb-1">
          Baki Kredit<br />
          <span className="text-xs text-gray-600">(maksimum angsuran per bulan)</span>
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
        <p className="mt-1 text-xs text-gray-600">
          (persen dari penghasilan bersih)
        </p>
        {errors.creditRatio && (
          <p className="mt-1 text-sm text-red-600">{errors.creditRatio}</p>
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
        <p className="mt-1 text-xs text-gray-600">
          masukkan angka, misal 1.5
        </p>
        <p className="mt-1 text-xs text-gray-600">
          = {(Number(monthlyInterestRate) * 12).toFixed(2)}% / tahun
        </p>
        {errors.monthlyInterestRate && (
          <p className="mt-1 text-sm text-red-600">{errors.monthlyInterestRate}</p>
        )}
      </div>
      
      {/* Calculation Method */}
      <div>
        <label className="block text-sm font-medium text-gray-900 mb-1">
          Perhitungan Bunga
        </label>
        <div className="relative">
          <input
            type="text"
            value={calculationMethod}
            readOnly
            className="w-full pl-3 pr-3 py-2 text-gray-900 bg-gray-100 border border-gray-300 rounded-md"
          />
        </div>
      </div>
      
      {/* Submit Button */}
      <div className="pt-4">
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-md transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Hitung
        </button>
      </div>
    </form>
  );
}
