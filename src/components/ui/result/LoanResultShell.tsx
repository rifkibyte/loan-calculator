// file: components/ui/loan/LoanResultShell.tsx

"use client";

import { FC, ReactNode } from "react";
import {
  ResultCard,
  ResultTabs,
  ExportButton,
} from "@/components/ui/result";

interface LoanResultShellProps {
  onExport: () => void;
  infoTabContent: ReactNode;
  paymentTabContent: ReactNode;
}

export const LoanResultShell: FC<LoanResultShellProps> = ({
  onExport,
  infoTabContent,
  paymentTabContent,
}) => {
  const tabs = [
    { id: "info", label: "Informasi Pinjaman", content: infoTabContent },
    { id: "payment", label: "Rincian Pembayaran", content: paymentTabContent },
  ];

  return (
    <ResultCard>
      <ResultTabs tabs={tabs} />
      <ExportButton onClick={onExport} />
    </ResultCard>
  );
};
