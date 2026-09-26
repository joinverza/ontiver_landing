import type { ReactNode } from "react";

interface AuroraBadgeProps {
  children: ReactNode;
  className?: string;
  spanClassName?: string;
}

const AuroraBadge = ({ children, className = "", spanClassName = "" }: AuroraBadgeProps) => {
  return (
    <div className={`eyebrow ${className}`}>
      <span aria-hidden="true" className="size-1.5 shrink-0 rounded-full bg-current" />
      <span className={spanClassName}>{children}</span>
    </div>
  );
};

export default AuroraBadge;
