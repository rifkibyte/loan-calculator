"use client";

import { useState } from "react";
import { AmortizationScheduleItem } from "@/utils/carSimpleLoanCalculator";

interface CarSimpleLoanScheduleProps {
  schedule: AmortizationScheduleItem[];
}

export default function CarSimpleLoanSchedule({ schedule }: CarSimpleLoanScheduleProps) {
  const [showAll, setShowAll] = useState<boolean>(false);
  const displayedSchedule = showAll ? schedule : schedule.slice(0, 12);

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  if (!schedule || schedule.length === 0) {
    return null;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        Tabel Angsuran
      </h2>
      
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-3 py-2 text-left font-medium text-gray-700">Bulan</th>
              <th className="px-3 py-2 text-right font-medium text-gray-700">Angsuran</th>
              <th className="px-3 py-2 text-right font-medium text-gray-700">Pokok</th>
              <th className="px-3 py-2 text-right font-medium text-gray-700">Bunga</th>
              <th className="px-3 py-2 text-right font-medium text-gray-700">Sisa Pinjaman</th>
            </tr>
          </thead>
          <tbody>
            {displayedSchedule.map((payment, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className="px-3 py-2 font-medium">{payment.month}</td>
                <td className="px-3 py-2 text-right">{formatCurrency(payment.payment)}</td>
                <td className="px-3 py-2 text-right">{formatCurrency(payment.principal)}</td>
                <td className="px-3 py-2 text-right">{formatCurrency(payment.interest)}</td>
                <td className="px-3 py-2 text-right font-medium">{formatCurrency(payment.balance)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {schedule.length > 12 && (
        <div className="mt-4 text-center">
          <button
            onClick={() => setShowAll(!showAll)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            {showAll ? 'Tampilkan Lebih Sedikit' : `Tampilkan Semua (${schedule.length} bulan)`}
          </button>
        </div>
      )}
    </div>
  );
}
