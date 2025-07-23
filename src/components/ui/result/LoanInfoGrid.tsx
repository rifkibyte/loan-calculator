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
  variant?: "default" | "rounded";
}

export const LoanInfoGrid: FC<LoanInfoGridProps> = ({
  title,
  items,
  variant = "default",
}) => {
  if (items.length === 0) {
    return null;
  }

  const isRounded = variant === "rounded";

  return (
    <div className="space-y-6">
      <div
        className={
          isRounded ? "p-4 rounded-lg border bg-blue-50 border-blue-200" : ""
        }
      >
        <h2 className="text-xl font-semibold text-gray-900">{title}</h2>

        <div className={isRounded ? "mt-6" : "mt-2"}>
          <ResultGrid items={items} />
        </div>
      </div>
    </div>
  );
};
