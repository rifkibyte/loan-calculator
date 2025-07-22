// file: components/ui/loan/LoanInfoGrid.tsx

import { FC, ReactNode } from "react";
import { ResultGrid } from "@/components/ui/result";

export interface InfoGridItem {
  label: string;
  value: ReactNode; // value bisa berupa string atau JSX
}

interface LoanInfoGridProps {
  title: string;
  items: InfoGridItem[];
}

export const LoanInfoGrid: FC<LoanInfoGridProps> = ({ title, items }) => {
  if (items.length === 0) {
    return null;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
      <ResultGrid items={items} />
    </div>
  );
};
