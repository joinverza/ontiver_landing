import {
  useCallback,
  useRef,
  useState,
  type MouseEvent as ReactMouseEvent,
  type MouseEventHandler,
  type ReactNode,
  type RefObject,
} from "react";

type MagneticFillVariant = "dark" | "light" | "green";
type MagneticFillElement = HTMLButtonElement | HTMLAnchorElement;

interface MagneticFillButtonProps {
  variant?: MagneticFillVariant;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  href?: string;
  target?: string;
  rel?: string;
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
  href,
  target,
  rel,
}: MagneticFillButtonProps) {
  const buttonRef = useRef<MagneticFillElement>(null);
  const [fillOrigin, setFillOrigin] = useState({ x: 0, y: 0 });
  const [fillSize, setFillSize] = useState(500);
  const [isHovered, setIsHovered] = useState(false);

  const styles = VARIANT_STYLES[variant];

  const getRelativeCoords = useCallback(
    (e: ReactMouseEvent<MagneticFillElement>) => {
      const rect = buttonRef.current?.getBoundingClientRect();
      if (!rect) return { x: 0, y: 0 };
      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    },
    [],
  );

  const handleMouseEnter = useCallback(
    (e: ReactMouseEvent<MagneticFillElement>) => {
      const coords = getRelativeCoords(e);
      const rect = buttonRef.current?.getBoundingClientRect();
      if (rect) {
        const farthestX = Math.max(coords.x, rect.width - coords.x);
        const farthestY = Math.max(coords.y, rect.height - coords.y);
        setFillSize(Math.ceil(Math.hypot(farthestX, farthestY) * 2 + 24));
      }
      setFillOrigin(coords);
      setIsHovered(true);
    },
    [getRelativeCoords],
  );

  const handleMouseLeave = useCallback(
    (e: ReactMouseEvent<MagneticFillElement>) => {
      const coords = getRelativeCoords(e);
      setFillOrigin(coords);
      setIsHovered(false);
    },
    [getRelativeCoords],
  );

  const sharedProps = {
    className: `relative overflow-hidden cursor-pointer ${className}`,
    style: {
      border: styles.border,
      background: styles.bg,
      color: isHovered ? styles.textHover : styles.textDefault,
      transition: isHovered
        ? "all 350ms cubic-bezier(0.4, 0, 0.2, 1)"
        : "all 300ms cubic-bezier(0.4, 0, 0.2, 1)",
    },
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    onClick,
  };

  const content = (
    <>
      <span
        className="pointer-events-none absolute rounded-full"
        style={{
          width: fillSize,
          height: fillSize,
          left: fillOrigin.x,
          top: fillOrigin.y,
          transform: `translate(-50%, -50%) scale(${isHovered ? 1 : 0})`,
          background: styles.fill,
          transition: isHovered
            ? "transform 900ms cubic-bezier(0.4, 0, 0.2, 1)"
            : "transform 700ms cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      />

      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
    </>
  );

  if (href) {
    return (
      <a
        {...sharedProps}
        ref={buttonRef as RefObject<HTMLAnchorElement>}
        href={href}
        target={target}
        rel={rel}
        onMouseEnter={handleMouseEnter as MouseEventHandler<HTMLAnchorElement>}
        onMouseLeave={handleMouseLeave as MouseEventHandler<HTMLAnchorElement>}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      {...sharedProps}
      ref={buttonRef as RefObject<HTMLButtonElement>}
      type={type}
      onMouseEnter={handleMouseEnter as MouseEventHandler<HTMLButtonElement>}
      onMouseLeave={handleMouseLeave as MouseEventHandler<HTMLButtonElement>}
    >
      {content}
    </button>
  );
}
