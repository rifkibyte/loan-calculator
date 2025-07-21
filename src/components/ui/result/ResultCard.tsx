import { FC, ReactNode } from "react";

interface ResultCardProps {
  children: ReactNode;
}

export const ResultCard: FC<ResultCardProps> = ({ children }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {children}
    </div>
  );
};
