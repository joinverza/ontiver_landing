import type { ComponentProps } from "react";

type NavigationIconProps = ComponentProps<"svg"> & {
  size?: number | string;
  variant: "menu" | "close";
};

/** Filled, cut-corner marks that share the directional icon's geometric style. */
const NavigationIcon = ({
  size = 24,
  variant,
  className = "",
  "aria-hidden": ariaHidden = true,
  ...props
}: NavigationIconProps) => (
  <svg
    {...props}
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    focusable="false"
    aria-hidden={ariaHidden}
    data-variant={variant}
    className={`ontiver-navigation-icon ${className}`}
  >
    {variant === "menu" ? (
      <>
        <path className="navigation-icon-top" d="M4 6.5h16l-2 3H4z" />
        <g className="navigation-icon-bottom">
          <path d="M9 14.5h11v3H7z" />
          <rect x="4" y="14.5" width="2" height="3" rx="0.75" />
        </g>
      </>
    ) : (
      <>
        <path d="M4 4h3l4 5v2H9ZM20 20h-3l-4-5v-2h2Z" />
        <path d="M20 4v3l-5 4h-2V9ZM4 20v-3l5-4h2v2Z" />
      </>
    )}
  </svg>
);

export default NavigationIcon;
