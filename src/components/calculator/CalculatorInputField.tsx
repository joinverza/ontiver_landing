import { motion } from "framer-motion";
import type { CalculatorField, CalculatorFieldKey } from "../../data/calculator";

type CalculatorInputFieldProps = {
  field: CalculatorField;
  value: string;
  focused: boolean;
  hasValue: boolean;
  flashFields: boolean;
  pulseField: CalculatorFieldKey | null;
  onChange: (key: CalculatorFieldKey, value: string) => void;
  onFocus: (key: CalculatorFieldKey) => void;
  onBlur: () => void;
};

export default function CalculatorInputField({
  field,
  value,
  focused,
  hasValue,
  flashFields,
  pulseField,
  onChange,
  onFocus,
  onBlur,
}: CalculatorInputFieldProps) {
  return (
    <div className="kyc-calculator-field flex flex-col gap-2">
      <label
        className={`text-sm font-medium transition-colors duration-150 ${
          focused || hasValue ? "text-[#009311]" : "text-black/55"
        }`}
      >
        {field.label}
      </label>
      <div className="relative">
        {field.prefix ? (
          <span
            className={`absolute left-4 top-1/2 -translate-y-1/2 text-sm font-semibold transition-colors duration-150 ${
              focused || hasValue ? "text-[#009311]" : "text-black/35"
            }`}
          >
            {field.prefix}
          </span>
        ) : null}
        <motion.input
          inputMode="numeric"
          className={`h-12 w-full rounded-lg border bg-white px-4 text-sm text-black outline-none transition-[background-color,border-color,box-shadow] duration-200 placeholder:text-black/30 ${
            field.prefix ? "pl-8" : ""
          } ${
            focused
              ? "border-[#009311]/60 [box-shadow:0_0_0_3px_rgba(34,197,94,0.08)]"
              : hasValue
                ? "border-[#009311]/25"
                : "border-[#DDE5DD]"
          } ${flashFields ? "bg-red-500/[0.05]" : ""}`}
          placeholder={field.placeholder}
          value={value}
          animate={{ scale: pulseField === field.key ? [1, 1.01, 1] : 1 }}
          transition={{ duration: 0.1 }}
          onChange={(event) => onChange(field.key, event.target.value)}
          onFocus={() => onFocus(field.key)}
          onBlur={onBlur}
        />
      </div>
    </div>
  );
}
