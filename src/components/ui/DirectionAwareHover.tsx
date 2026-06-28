import {
  useState,
  type CSSProperties,
  type MouseEvent,
  type ReactNode,
} from "react";

export type Direction = "top" | "right" | "bottom" | "left";

type DirectionAwareHoverProps = {
  imageUrl: string;
  children: ReactNode;
  className?: string;
  imageClassName?: string;
  overlayClassName?: string;
  showOverlay?: boolean;
  onDirectionEnter?: (
    direction: Direction,
    event: MouseEvent<HTMLElement>
  ) => void;
  onDirectionLeave?: (
    direction: Direction,
    event: MouseEvent<HTMLElement>
  ) => void;
};

const directionVars: Record<Direction, CSSProperties> = {
  top: {
    "--module-overlay-x": "0px",
    "--module-overlay-y": "-100%",
    "--module-content-x": "0px",
    "--module-content-y": "-4px",
    "--module-image-x": "0px",
    "--module-image-y": "8px",
  } as CSSProperties,
  right: {
    "--module-overlay-x": "100%",
    "--module-overlay-y": "0px",
    "--module-content-x": "4px",
    "--module-content-y": "0px",
    "--module-image-x": "-8px",
    "--module-image-y": "0px",
  } as CSSProperties,
  bottom: {
    "--module-overlay-x": "0px",
    "--module-overlay-y": "100%",
    "--module-content-x": "0px",
    "--module-content-y": "4px",
    "--module-image-x": "0px",
    "--module-image-y": "-8px",
  } as CSSProperties,
  left: {
    "--module-overlay-x": "-100%",
    "--module-overlay-y": "0px",
    "--module-content-x": "-4px",
    "--module-content-y": "0px",
    "--module-image-x": "8px",
    "--module-image-y": "0px",
  } as CSSProperties,
};

function getDirection(event: MouseEvent<HTMLElement>): Direction {
  const rect = event.currentTarget.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  const distances = [
    { direction: "top" as const, value: y },
    { direction: "right" as const, value: rect.width - x },
    { direction: "bottom" as const, value: rect.height - y },
    { direction: "left" as const, value: x },
  ];

  return distances.reduce((nearest, candidate) =>
    candidate.value < nearest.value ? candidate : nearest
  ).direction;
}

export default function DirectionAwareHover({
  imageUrl,
  children,
  className = "",
  imageClassName = "",
  overlayClassName = "",
  showOverlay = true,
  onDirectionEnter,
  onDirectionLeave,
}: DirectionAwareHoverProps) {
  const [direction, setDirection] = useState<Direction>("top");
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = (event: MouseEvent<HTMLElement>) => {
    const nextDirection = getDirection(event);
    setDirection(nextDirection);
    setIsHovered(true);
    onDirectionEnter?.(nextDirection, event);
  };

  const handleMouseLeave = (event: MouseEvent<HTMLElement>) => {
    const nextDirection = getDirection(event);
    setDirection(nextDirection);
    setIsHovered(false);
    onDirectionLeave?.(nextDirection, event);
  };

  return (
    <article
      className={`group relative block h-full w-full overflow-hidden border border-white/10 bg-[#05150e] transition-[border-color,transform] duration-[260ms] ease-[cubic-bezier(0.2,0,0,1)] will-change-[transform,border-color] ${className}`}
      data-hovered={isHovered ? "true" : "false"}
      data-direction={direction}
      style={directionVars[direction]}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className={`direction-aware-hover__image absolute inset-0 z-0 scale-[1.04] bg-cover bg-center opacity-60 brightness-[0.65] transition-[filter,opacity,transform] duration-[320ms] ease-[cubic-bezier(0.2,0,0,1)] will-change-[transform,filter] group-data-[hovered=true]:opacity-100 group-data-[hovered=true]:[filter:brightness(1.4)_saturate(1.2)_contrast(1.1)] group-data-[hovered=true]:[transform:translate3d(var(--module-image-x),var(--module-image-y),0)_scale(1.07)] ${imageClassName}`}
        style={{ backgroundImage: `url(${imageUrl})` }}
      />
      {showOverlay ? (
        <div
          className={`pointer-events-none absolute inset-0 z-[1] opacity-0 transition-[opacity,transform] duration-[320ms] ease-[cubic-bezier(0.2,0,0,1)] [transform:translate3d(var(--module-overlay-x),var(--module-overlay-y),0)] group-data-[hovered=true]:opacity-40 group-data-[hovered=true]:[transform:translate3d(0,0,0)] ${overlayClassName}`}
        />
      ) : null}
      <div className="absolute inset-0 z-[2] transition-transform duration-[320ms] ease-[cubic-bezier(0.2,0,0,1)] group-data-[hovered=true]:[transform:translate3d(var(--module-content-x),var(--module-content-y),0)]">
        {children}
      </div>
    </article>
  );
}
