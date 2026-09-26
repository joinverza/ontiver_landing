import type { CSSProperties, ReactNode } from "react";

type PlatformIconProps = {
  label: string;
  color: string;
  href: string;
  children: ReactNode;
};

const PlatformIcon = ({ label, color, href, children }: PlatformIconProps) => {
  return (
    <a
      className="group inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-[#dde6dc] text-[#002d0e]/60 transition-colors hover:bg-[#edf5eb]"
      aria-label={label}
      href={href}
      rel="noreferrer"
      target="_blank"
      style={{ "--platform-color": color } as CSSProperties}
    >
      <span className="transition-transform duration-150 group-hover:scale-[1.15] group-hover:text-[var(--platform-color)]">
        {children}
      </span>
    </a>
  );
};

export default PlatformIcon;
