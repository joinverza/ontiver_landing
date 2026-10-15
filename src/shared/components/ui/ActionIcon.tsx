import type { ComponentProps } from "react";

type ActionIconProps = Omit<ComponentProps<"svg">, "direction"> & {
  size?: number | string;
  direction?: "forward" | "back" | "up" | "down";
};

const iconTransforms = {
  forward: undefined,
  back: "translate(24 0) scale(-1 1)",
  up: "rotate(-90 12 12)",
  down: "rotate(90 12 12)",
};

const ActionIcon = ({
  size = 24,
  direction = "forward",
  className = "",
  "aria-hidden": ariaHidden = true,
  ...props
}: ActionIconProps) => (
  <svg
    {...props}
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    focusable="false"
    aria-hidden={ariaHidden}
    data-direction={direction}
    className={`ontiver-action-icon ${className}`}
  >
    <g transform={iconTransforms[direction]}>
      <rect x="4" y="11" width="5" height="2" rx="1" />
      <path d="M10 5.5 20 12 10 18.5 13.5 12Z" />
    </g>
  </svg>
);

export default ActionIcon;
