import { FC, ReactNode } from "react";

interface GridItem {
    label: string;
    value: ReactNode;
}

interface ResultGridProps {
  items: GridItem[];
}

export const ResultGrid: FC<ResultGridProps> = ({ items }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {items.map((item, index) => (
        <div key={index}>
          <p className="text-sm text-gray-600">{item.label}:</p>
          <p className="text-lg font-bold text-gray-900">{item.value}</p>
        </div>
      ))}
    </div>
  );
};
