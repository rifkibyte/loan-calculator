// components/ui/form/PercentInput.tsx
import { FC, ChangeEvent } from "react";
import { Input } from "./Input";

interface PercentInputProps {
  id: string;
  name: string;
  label: string;
  value: string | number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  placeholder?: string;
  info?: string;
}

export const PercentInput: FC<PercentInputProps> = (props) => {
  return (
    <Input
      {...props}
      unit="%"
      type="text"
      inputMode="decimal"
    />
  );
};
