import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

type LinkArrowProps = {
  href?: string;
  children: ReactNode;
  variant?: "light" | "dark";
  className?: string;
  textClassName?: string;
  ariaLabel?: string;
};

export default function LinkArrow({ href, children, variant = "light", className = "", textClassName = "", ariaLabel }: LinkArrowProps) {
  const classes = `inline-flex items-center gap-3 py-1 text-sm font-semibold transition-colors ${variant === "dark" ? "text-white/80 hover:text-white" : "text-[#007d21] hover:text-[#002d0e]"} ${className}`;
  const content = <><span className={textClassName}>{children}</span><ArrowUpRight size={18} className="shrink-0" aria-hidden="true" /></>;
  if (!href) return <span className={classes}>{content}</span>;
  if (/^(https?:|mailto:|tel:|#)/.test(href)) return <a href={href} className={classes} aria-label={ariaLabel} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noreferrer" : undefined}>{content}</a>;
  return <Link to={href} className={classes} aria-label={ariaLabel}>{content}</Link>;
}
