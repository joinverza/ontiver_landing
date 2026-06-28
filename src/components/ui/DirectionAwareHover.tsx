import {
  useState,
  type CSSProperties,
  type MouseEvent,
  type ReactNode,
} from "react";

type Direction = "top" | "right" | "bottom" | "left";

type DirectionAwareHoverProps = {
  imageUrl: string;
  children: ReactNode;
  className?: string;
  imageClassName?: string;
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
}: DirectionAwareHoverProps) {
  const [direction, setDirection] = useState<Direction>("top");
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = (event: MouseEvent<HTMLElement>) => {
    setDirection(getDirection(event));
    setIsHovered(true);
  };

  const handleMouseLeave = (event: MouseEvent<HTMLElement>) => {
    setDirection(getDirection(event));
    setIsHovered(false);
  };

  return (
    <article
      className={`direction-aware-hover ${className}`}
      data-hovered={isHovered ? "true" : "false"}
      data-direction={direction}
      style={directionVars[direction]}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className={`direction-aware-hover__image ${imageClassName}`}
        style={{ backgroundImage: `url(${imageUrl})` }}
      />
      <div className="direction-aware-hover__overlay" />
      <div className="direction-aware-hover__content">{children}</div>
    </article>
  );
}
