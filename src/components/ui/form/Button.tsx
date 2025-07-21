// components/ui/form/Button.tsx
import { FC, ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  fullWidth?: boolean;
}

export const Button: FC<ButtonProps> = ({
  children,
  onClick,
  type = "submit",
  disabled = false,
  fullWidth = true,
}) => (
  <button
    type={type}
    onClick={onClick}
    disabled={disabled}
    className={`
      ${fullWidth ? "w-full" : ""}
      bg-blue-600 text-white py-3 px-4 rounded-md 
      hover:bg-blue-700 
      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 
      font-medium
      transition-colors
      disabled:bg-gray-400 disabled:cursor-not-allowed
    `}
  >
    {children}
  </button>
);
