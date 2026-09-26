import type { ReactNode } from "react";

type SupportFieldProps = {
  children: ReactNode;
  className?: string;
  htmlFor: string;
  label: string;
  required?: boolean;
};

export const SupportField = ({
  children,
  className = "",
  htmlFor,
  label,
  required = false,
}: SupportFieldProps) => {
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className="text-body font-medium text-[#002d0e]">
        {label}
        {required ? <span className="ml-1 text-[#008f24]">*</span> : null}
      </label>
      <div className="mt-3">{children}</div>
    </div>
  );
};
