import { FC, ReactNode } from "react";

const variants = {
  blue: "bg-blue-50 border-blue-200 text-blue-800",
  green: "bg-green-50 border-green-200 text-green-800",
  purple: "bg-purple-50 border-purple-200 text-purple-800",
  indigo: "bg-indigo-50 border-indigo-200 text-indigo-800",
  gray: "bg-gray-50 border-gray-200 text-gray-800",
};

interface ResultSectionProps {
  title: string;
  children: ReactNode;
  variant?: keyof typeof variants;
}

export const ResultSection: FC<ResultSectionProps> = ({
  title,
  children,
  variant = "gray",
}) => {
  return (
    <div className={`p-4 rounded-lg border ${variants[variant]}`}>
      <h3 className="font-semibold text-gray-900 mb-3">{title}</h3>
      <div className="space-y-2">{children}</div>
    </div>
  );
};
