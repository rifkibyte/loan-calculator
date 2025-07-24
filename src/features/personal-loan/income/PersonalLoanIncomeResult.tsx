// /features/personal-loan/budget/PersonalLoanResult.tsx

import { formatCurrencyDisplay, formatPercent } from "@/utils/formatters"; // Asumsi path formatter Anda
import { CalculationResult } from "@/utils/calculators/personal-loan/personalLoanIncomeCalculator"; // Import tipe baru

interface PersonalLoanResultProps {
  result: CalculationResult;
}

// Komponen kecil untuk baris data
const DataRow = ({ label, value, subValue }: { label: string; value: string | number; subValue?: string }) => (
  <div className="flex justify-between items-start py-2 border-b border-gray-200">
    <span className="text-sm text-gray-600">{label}</span>
    <div className="text-right">
      <span className="text-sm font-semibold text-gray-800">{value}</span>
      {subValue && <span className="block text-xs text-gray-500">{subValue}</span>}
    </div>
  </div>
);

export default function PersonalLoanResult({ result }: PersonalLoanResultProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Kolom Kiri: Data Anda */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3 border-b pb-2">Data Anda</h3>
          <div className="space-y-2">
            <DataRow
              label="Penghasilan Bersih (per bulan)"
              value={formatCurrencyDisplay(result.netIncome)}
            />
            <DataRow
              label="Baki Kredit (max. angsuran)"
              value={formatCurrencyDisplay(result.debtRatioAmount)}
              subValue={`(${formatPercent(result.debtRatioPercent)})`}
            />
            <DataRow
              label="Total Angsuran Pinjaman Lain"
              value={formatCurrencyDisplay(result.otherLoanPayment)}
            />
            <DataRow
              label="Bunga KTA"
              value={`${formatPercent(result.monthlyInterestRate, { minimumFractionDigits: 2 })} / bulan`}
              subValue={`(${(result.monthlyInterestRate * 12).toFixed(2)} % / tahun)`}
            />
             <DataRow
              label="Perhitungan Bunga"
              value="FLAT"
            />
          </div>
        </div>

        {/* Kolom Kanan: Angsuran per Bulan */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3 border-b pb-2">Angsuran per Bulan</h3>
          <div className="space-y-2">
             <div className="flex justify-between py-2">
                <span className="text-sm text-gray-600">Baki Kredit:</span>
                <span className="text-sm font-semibold text-gray-800">{formatCurrencyDisplay(result.debtRatioAmount)}</span>
            </div>
             <div className="flex justify-between py-2 border-b-2 border-gray-300">
                <span className="text-sm text-gray-600">Angsuran Lain per Bulan:</span>
                <span className="text-sm font-semibold text-gray-800">{formatCurrencyDisplay(result.otherLoanPayment)}</span>
            </div>
            <div className="flex justify-between py-2 mt-2">
                <span className="text-sm font-bold text-blue-600">Max. Angsuran KTA per Bulan:</span>
                <span className="text-sm font-bold text-blue-600">{formatCurrencyDisplay(result.maxKtaPayment)}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
