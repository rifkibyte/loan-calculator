// components/ui/form/Input.tsx
import { FC, ChangeEvent } from "react";

interface FormInputProps {
  id: string;
  name: string;
  label: string;
  value: string | number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  unit?: string;
  prefix?: string;
  placeholder?: string;
  info?: string | React.ReactNode;
  type?: "text" | "number" | "email" | "password";
  inputMode?: "numeric" | "decimal" | "text";
  disabled?: boolean;
}

export const Input: FC<FormInputProps> = ({
  id,
  name,
  label,
  value,
  onChange,
  error,
  unit,
  prefix,
  placeholder,
  info,
  type = "text",
  inputMode = "text",
  disabled = false,
}) => (
  <div>
    <label
      htmlFor={id}
      className="block text-sm font-medium text-gray-900 mb-1"
    >
      {label}
    </label>
    <div className="relative">
      {prefix && (
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <span className="text-gray-500 sm:text-sm">{prefix}</span>
        </div>
      )}
      <input
        type={type}
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        disabled={disabled}
        inputMode={inputMode}
        className={`w-full py-2 text-gray-900 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          prefix ? "pl-9" : "pl-3"
        } ${unit ? "pr-14" : "pr-3"} ${
          error ? "border-red-500" : "border-gray-300"
        }`}
        placeholder={placeholder}
      />
      {unit && (
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <span className="text-gray-500 sm:text-sm">{unit}</span>
        </div>
      )}
    </div>
    {info && <p className="mt-1 text-xs text-gray-600">{info}</p>}
    {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
  </div>
);
