import { useRef, useCallback, useState, type MouseEvent, type ReactNode } from "react";

type MagneticFillVariant = "dark" | "light" | "green";

interface MagneticFillButtonProps {
  variant?: MagneticFillVariant;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

const VARIANT_STYLES = {
  dark: {
    border: "1.5px solid rgba(255,255,255,0.25)",
    bg: "transparent",
    fill: "#ffffff",
    textDefault: "#ffffff",
    textHover: "#0a0a0a",
  },
  light: {
    border: "1.5px solid rgba(0,147,17,0.4)",
    bg: "#ffffff",
    fill: "linear-gradient(to bottom right, #002D0E, #009311)",
    textDefault: " #002D0E",
    textHover: "#ffffff",
  },
  green: {
    border: "1.5px solid rgba(0,147,17,0.4)",
    bg: "linear-gradient(to bottom right, #002D0E, #009311)",
    fill: "#ffffff",
    textDefault: "#ffffff",
    textHover: "#002D0E",
  },
};

export default function MagneticFillButton({
  variant = "dark",
  children,
  className = "",
  onClick,
  type = "button",
}: MagneticFillButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [fillOrigin, setFillOrigin] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const styles = VARIANT_STYLES[variant];

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

  return (
    <button
      ref={buttonRef}
      className={`relative overflow-hidden cursor-pointer ${className}`}
      style={{
        border: styles.border,
        background: styles.bg,
        color: isHovered ? styles.textHover : styles.textDefault,
        transition: isHovered
          ? "color 350ms cubic-bezier(0.4, 0, 0.2, 1)"
          : "color 300ms cubic-bezier(0.4, 0, 0.2, 1)",
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      type={type}
    >
      {/* Radial fill circle */}
      <span
        className="absolute pointer-events-none rounded-full"
        style={{
          width: 500,
          height: 500,
          left: fillOrigin.x,
          top: fillOrigin.y,
          transform: `translate(-50%, -50%) scale(${isHovered ? 1 : 0})`,
          background: styles.fill,
          transition: isHovered
            ? "transform 350ms cubic-bezier(0.4, 0, 0.2, 1)"
            : "transform 300ms cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      />

      {/* Button content */}
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
    </button>
  );
}
