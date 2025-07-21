// components/ui/form/YearInput.tsx
import { FC, ChangeEvent } from "react";
import { Input } from "./Input";

interface YearInputProps {
  id: string;
  name: string;
  label: string;
  value: string | number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  placeholder?: string;
  info?: string;
}

export const YearInput: FC<YearInputProps> = (props) => {
  return (
    <Input
      {...props}
      unit="tahun"
      type="text"
      inputMode="numeric"
    />
  );
};
