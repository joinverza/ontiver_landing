import { useRef, useCallback, useState, type MouseEvent } from "react";

type MagneticButtonVariant = "dark" | "light";

interface MagneticButtonProps {
  variant?: MagneticButtonVariant;
  size?: number;
  className?: string;
  onClick?: () => void;
  ariaLabel?: string;
}

export default function MagneticButton({
  variant = "dark",
  size = 56,
  className = "",
  onClick,
  ariaLabel = "Navigate",
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [fillOrigin, setFillOrigin] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // Colors based on variant
  const borderColor = variant === "dark" ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.2)";
  const fillColor = variant === "dark" ? "#ffffff" : "#0a0a0a";
  const arrowDefault = variant === "dark" ? "#ffffff" : "#0a0a0a";
  const arrowHover = variant === "dark" ? "#0a0a0a" : "#ffffff";

  const getRelativeCoords = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      const rect = buttonRef.current?.getBoundingClientRect();
      if (!rect) return { x: 0, y: 0 };
      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    },
    []
  );

  const handleMouseEnter = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      const coords = getRelativeCoords(e);
      setFillOrigin(coords);
      setIsHovered(true);
    },
    [getRelativeCoords]
  );

  const handleMouseLeave = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      const coords = getRelativeCoords(e);
      setFillOrigin(coords);
      setIsHovered(false);
    },
    [getRelativeCoords]
  );

  // The fill circle needs to be large enough to cover the entire button from any edge point.
  // 2.5x the button size guarantees full coverage from any entry point.
  const fillDiameter = size * 2.5;

  return (
    <button
      ref={buttonRef}
      className={`relative rounded-full overflow-hidden cursor-pointer flex items-center justify-center ${className}`}
      style={{
        width: size,
        height: size,
        border: `1.5px solid ${borderColor}`,
        background: "transparent",
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      aria-label={ariaLabel}
      type="button"
    >
      {/* Fill circle */}
      <span
        className="absolute pointer-events-none rounded-full"
        style={{
          width: fillDiameter,
          height: fillDiameter,
          left: fillOrigin.x,
          top: fillOrigin.y,
          transform: `translate(-50%, -50%) scale(${isHovered ? 1 : 0})`,
          backgroundColor: fillColor,
          transition: isHovered
            ? "transform 350ms cubic-bezier(0.4, 0, 0.2, 1)"
            : "transform 300ms cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      />

      {/* Arrow icon */}
      <svg
        width={size * 0.36}
        height={size * 0.36}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="relative z-10 transition-colors"
        style={{
          color: isHovered ? arrowHover : arrowDefault,
          transitionDuration: isHovered ? "350ms" : "300ms",
          transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <line x1="7" y1="17" x2="17" y2="7" />
        <polyline points="7 7 17 7 17 17" />
      </svg>
    </button>
  );
}
