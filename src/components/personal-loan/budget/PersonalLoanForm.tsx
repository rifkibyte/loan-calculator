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
