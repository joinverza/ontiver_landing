import type { CSSProperties, ReactNode } from "react";

type PlatformIconProps = {
  label: string;
  count: string;
  color: string;
  children: ReactNode;
};

export default function PlatformIcon({
  label,
  count,
  color,
  children,
}: PlatformIconProps) {
  return (
    <button
      className="group flex flex-col items-center gap-2 text-black/40 transition-colors duration-150"
      type="button"
      aria-label={label}
      style={{ "--platform-color": color } as CSSProperties}
    >
      <span className="transition-transform duration-150 group-hover:scale-[1.15] group-hover:text-[var(--platform-color)]">
        {children}
      </span>
      <span className="text-xs font-medium">{count}</span>
    </button>
  );
}
