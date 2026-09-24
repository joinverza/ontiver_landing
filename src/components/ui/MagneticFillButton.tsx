import type { ReactNode } from "react";

interface MagneticFillButtonProps {
  variant?: "dark" | "light" | "green";
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  href?: string;
  target?: string;
  rel?: string;
  disabled?: boolean;
}

export default function MagneticFillButton({ variant = "dark", children, className = "", onClick, type = "button", href, target, rel, disabled }: MagneticFillButtonProps) {
  const sharedClassName = `${variant === "green" ? "button-primary" : "button-secondary"} ${variant === "dark" ? "border-white/30 text-white hover:bg-white/10 hover:text-white" : ""} ${className}`;
  return href ? <a href={href} target={target} rel={rel} onClick={onClick} className={sharedClassName}>{children}</a> : <button type={type} onClick={onClick} disabled={disabled} className={sharedClassName}>{children}</button>;
}
