import type { ChangeEvent, FocusEvent } from "react";
import type { ContactFieldConfig } from "../../data/contact";

type ContactFieldProps = {
  field: ContactFieldConfig;
  value: string;
  focused: boolean;
  missing: boolean;
  swept: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onFocus: (event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onBlur: () => void;
};

export default function ContactField({
  field,
  value,
  focused,
  missing,
  swept,
  onChange,
  onFocus,
  onBlur,
}: ContactFieldProps) {
  const active = focused || value.length > 0;

  return (
    <label
      className={`contact-form-field block ${field.wide ? "md:col-span-2" : ""}`}
    >
      <span
        className={`block text-[13px] font-medium transition-colors duration-150 ${
          missing ? "text-red-500" : active ? "text-[#009311]" : "text-black/45"
        }`}
      >
        {field.label}
      </span>
      <span className="relative mt-2 block sm:mt-3">
        {field.type === "textarea" ? (
          <textarea
            className="min-h-[88px] w-full resize-y bg-transparent pb-3 text-sm text-black outline-none placeholder:text-black/25 sm:min-h-[106px]"
            placeholder={field.placeholder}
            value={value}
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
          />
        ) : (
          <input
            className="h-8 w-full bg-transparent pb-2.5 text-sm text-black outline-none placeholder:text-black/25 sm:h-9 sm:pb-3"
            placeholder={field.placeholder}
            type={field.type ?? "text"}
            value={value}
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
          />
        )}
        <span className="contact-field-line absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-[#D8DED8]" />
        <span
          className={`absolute bottom-0 left-0 h-px w-full transition-colors duration-150 ${
            missing
              ? "bg-red-500/80"
              : focused
                ? "bg-[#009311]"
                : value
                  ? "bg-[#009311]/30"
                  : "bg-[#D8DED8]"
          }`}
        />
        <span
          className={`absolute bottom-[-1.5px] left-0 h-1 w-1 rounded-full bg-[#009311] transition-opacity duration-100 ${
            focused ? "opacity-100" : "opacity-0"
          }`}
        />
        {swept ? (
          <span className="pointer-events-none absolute bottom-0 left-0 h-px w-full origin-left animate-[contact-field-sweep_300ms_ease-out_1] bg-[#25d83d]" />
        ) : null}
      </span>
    </label>
  );
}
