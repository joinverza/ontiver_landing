import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  text: ReactNode;
};

export default function Button({ text, className, type = "button", ...props }: ButtonProps) {
  return (
    <button className={className} type={type} {...props}>
      {text}
    </button>
  );
}
