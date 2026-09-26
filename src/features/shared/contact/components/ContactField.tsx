import type { ChangeEvent } from "react";
import type { ContactFieldConfig } from "../data/contact";

type ContactFieldProps = {
  field: ContactFieldConfig;
  value: string;
  missing: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
};

export const ContactField = ({ field, value, missing, onChange }: ContactFieldProps) => {
  const wide = field.wide || field.key === "subject";
  const inputClass = `min-h-14 w-full rounded-[10px] border bg-white px-4 text-body font-normal text-[#002d0e] outline-none transition-colors placeholder:text-[#647365]/65 focus:border-[#009311] focus:ring-2 focus:ring-[#009311]/10 ${
    missing ? "border-red-500" : "border-[#dde6dc]"
  }`;

  return (
    <label className={`block min-w-0 ${wide ? "md:col-span-2" : ""}`}>
      <span className="mb-2.5 block text-sm font-medium text-[#002d0e]">
        {field.label} <span className="text-[#007d21]">*</span>
      </span>
      {field.type === "textarea" ? (
        <textarea
          className={`${inputClass} min-h-36 resize-y py-3.5`}
          placeholder={field.placeholder}
          name={field.key}
          required
          value={value}
          onChange={onChange}
          aria-invalid={missing || undefined}
          aria-describedby={missing ? `${field.key}-error` : undefined}
        />
      ) : (
        <input
          className={inputClass}
          placeholder={field.placeholder}
          type={field.type ?? "text"}
          name={field.key}
          autoComplete={
            field.key === "firstName" ? "given-name" : field.key === "email" ? "email" : undefined
          }
          required
          value={value}
          onChange={onChange}
          aria-invalid={missing || undefined}
          aria-describedby={missing ? `${field.key}-error` : undefined}
        />
      )}
      {missing ? (
        <span id={`${field.key}-error`} className="mt-2 block text-sm text-red-700">
          Please complete this field.
        </span>
      ) : null}
    </label>
  );
};
