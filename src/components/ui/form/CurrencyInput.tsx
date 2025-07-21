// components/ui/form/CurrencyInput.tsx
import { FC, ChangeEvent, useCallback } from "react";
import { Input } from "./Input";

// Asumsikan fungsi ini ada di utils/formatters.ts
const formatToCurrency = (value: string | number) => {
  const numericValue = String(value).replace(/[^\d]/g, "");
  return new Intl.NumberFormat("id-ID").format(Number(numericValue));
};
const parseFromCurrency = (value: string) => {
  return value.replace(/[^\d]/g, "");
};

interface CurrencyInputProps {
  id: string;
  name: string;
  label: string;
  value: string;
  onValueChange: (value: string) => void; // Mengirim nilai numerik string
  error?: string;
  placeholder?: string;
  info?: string;
}

export const CurrencyInput: FC<CurrencyInputProps> = ({
  id,
  name,
  label,
  value,
  onValueChange,
  error,
  placeholder,
  info,
}) => {
  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      onValueChange(parseFromCurrency(e.target.value));
    },
    [onValueChange]
  );

  return (
    <Input
      id={id}
      name={name}
      label={label}
      value={formatToCurrency(value)}
      onChange={handleChange}
      error={error}
      prefix="Rp"
      placeholder={placeholder}
      info={info}
      inputMode="numeric"
    />
  );
};
