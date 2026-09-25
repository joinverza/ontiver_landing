import { useId } from "react";
import type { CalculatorField, CalculatorFieldKey } from "../../data/calculator";

type CalculatorInputFieldProps = { field: CalculatorField; value: string; onChange: (key: CalculatorFieldKey, value: string) => void };

export default function CalculatorInputField({ field, value, onChange }: CalculatorInputFieldProps) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className="block text-body font-medium text-[#526052]">{field.label}</label>
      <div className="relative mt-2">
        {field.prefix ? <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-body text-[#637060]">{field.prefix}</span> : null}
        <input id={id} required inputMode={field.prefix ? "decimal" : "numeric"} type="number" min="0" step={field.prefix ? "any" : "1"} value={value} onChange={(event) => onChange(field.key, event.target.value)} placeholder={field.placeholder} className={`h-13 w-full rounded-xl border border-[#dce5d8] bg-white pr-4 text-body text-[#002d0e] outline-none placeholder:text-[#8a9485] focus:border-[#009311] focus:ring-2 focus:ring-[#009311]/10 ${field.prefix ? "pl-9" : "pl-4"}`} />
      </div>
    </div>
  );
}
