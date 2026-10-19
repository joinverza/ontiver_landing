import { forwardRef, type ReactNode } from "react";
import type { IconProps, OntiverIcon } from "./types";

// Share sizing and accessibility while keeping each glyph's geometry independent.
export const createIcon = (name: string, artwork: ReactNode): OntiverIcon => {
  const Icon = forwardRef<SVGSVGElement, IconProps>(function OntiverGlyph(
    {
      size = 24,
      color = "currentColor",
      strokeWidth = 1.65,
      className = "",
      children,
      "aria-label": ariaLabel,
      "aria-labelledby": ariaLabelledBy,
      "aria-hidden": ariaHidden,
      role,
      ...props
    },
    ref,
  ) {
    const labelled = Boolean(ariaLabel || ariaLabelledBy);

    return (
      <svg
        ref={ref}
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        focusable="false"
        aria-hidden={ariaHidden ?? (labelled ? undefined : true)}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        role={role ?? (labelled ? "img" : undefined)}
        className={`ontiver-icon ontiver-icon-${name}${className ? ` ${className}` : ""}`}
        {...props}
      >
        {artwork}
        {children}
      </svg>
    );
  });

  Icon.displayName = `OntiverIcon(${name})`;
  return Icon;
};
