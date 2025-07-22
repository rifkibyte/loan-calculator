// file: components/ui/loan/PaymentBreakdown.tsx

import { FC } from "react";
import { ResultSection, ResultRow } from "@/components/ui/result";
import { formatCurrencyDisplay } from "@/utils/formatters";

// Tipe data untuk setiap baris dalam rincian
export interface BreakdownRow {
  label: string;
  value: number;
  isTotal?: boolean;
}

interface PaymentBreakdownProps {
  title: string;
  rows: BreakdownRow[];
  variant?: "green" | "purple" | "indigo" | "blue" | "gray";
}

export const PaymentBreakdown: FC<PaymentBreakdownProps> = ({
  title,
  rows,
  variant = "gray",
}) => {
  if (rows.length === 0) {
    return null;
  }

  return (
    <ResultSection title={title} variant={variant}>
      {rows.map((row) => (
        <ResultRow
          key={row.label}
          label={row.label}
          value={formatCurrencyDisplay(row.value)}
          isTotal={row.isTotal}
        />
      ))}
    </ResultSection>
  );
};
