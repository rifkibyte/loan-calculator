// /features/personal-loan/budget/PersonalLoanSchedule.tsx

import { formatCurrencyDisplay } from "@/utils/formatters"; // Asumsi path formatter Anda
import { LoanLimitItem } from "@/utils/calculators/personal-loan/personalLoanIncomeCalculator"; // Import tipe baru

interface PersonalLoanScheduleProps {
  limitTable: LoanLimitItem[];
}

export default function PersonalLoanSchedule({ limitTable }: PersonalLoanScheduleProps) {
  if (!limitTable || limitTable.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md text-center">
        <p className="text-gray-500">Tidak ada data untuk ditampilkan. Kemampuan bayar Anda mungkin tidak mencukupi.</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Limit Kredit - Tabel Batas Wajar Pinjaman
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Jangka Waktu
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Maksimum Angsuran
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Limit Kredit KTA
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {limitTable.map((item) => (
              <tr key={item.term} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                  {item.term} bulan
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatCurrencyDisplay(item.maxPayment)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 font-semibold">
                  {formatCurrencyDisplay(item.loanAmount)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
