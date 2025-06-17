"use client";

import { formatCurrency } from "@/utils/formatters";

interface ScheduleItem {
  period: number;
  payment: number;
  principal: number;
  interest: number;
  remainingBalance: number;
}

interface CarLoanSimpleScheduleProps {
  schedule: ScheduleItem[];
  totalInterest: number;
  totalPrincipal: number;
  totalPayment: number;
}

export default function CarLoanSimpleSchedule({ 
  schedule, 
  totalInterest, 
  totalPrincipal, 
  totalPayment 
}: CarLoanSimpleScheduleProps) {
  // Add period 0 for initial balance
  const fullSchedule = [
    {
      period: 0,
      payment: 0,
      principal: 0,
      interest: 0,
      remainingBalance: totalPrincipal
    },
    ...schedule
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Tabel Angsuran</h3>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Bulan
              </th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Angsuran Bunga
              </th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Angsuran Pokok
              </th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total Angsuran
              </th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Sisa pinjaman
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {fullSchedule.map((item) => (
              <tr key={item.period}>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                  {item.period}
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                  {formatCurrency(item.interest)}
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                  {formatCurrency(item.principal)}
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                  {formatCurrency(item.payment)}
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                  {formatCurrency(item.remainingBalance)}
                </td>
              </tr>
            ))}
            {/* Total row */}
            <tr className="bg-gray-50 font-semibold">
              <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                Total
              </td>
              <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                {formatCurrency(totalInterest)}
              </td>
              <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                {formatCurrency(totalPrincipal)}
              </td>
              <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                {formatCurrency(totalPayment)}
              </td>
              <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
