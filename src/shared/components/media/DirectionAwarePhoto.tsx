import type { PointerEvent, ReactNode } from "react";
import type { EditorialImage } from "../../data/imagery";
import { SiteImage } from "./SiteImage";
import "./direction-aware-photo.css";

type FrameProps = {
  children: ReactNode;
  caption?: ReactNode;
  className?: string;
  focusable?: boolean;
};

// Read the entry/exit edge once; no pointer-move loop or React render is needed.
const setDirection = (event: PointerEvent<HTMLElement>) => {
  if (event.pointerType !== "mouse") return;
  const node = event.currentTarget;
  const box = node.getBoundingClientRect();
  const x = (event.clientX - box.left) / box.width;
  const y = (event.clientY - box.top) / box.height;
  const distances = [y, 1 - x, 1 - y, x];
  const edge = distances.indexOf(Math.min(...distances));
  node.style.setProperty("--hover-x", `${[0, 24, 0, -24][edge]}px`);
  node.style.setProperty("--hover-y", `${[-24, 0, 24, 0][edge]}px`);
};

export const DirectionAwareFrame = ({
  children,
  caption,
  className = "",
  focusable = true,
}: FrameProps) => (
  <figure
    className={`direction-photo ${className}`}
    onPointerEnter={setDirection}
    onPointerLeave={setDirection}
    tabIndex={caption && focusable ? 0 : undefined}
  >
    <div className="direction-photo-media">{children}</div>
    {caption && <figcaption className="direction-photo-caption">{caption}</figcaption>}
  </figure>
);

export const DirectionAwarePhoto = ({
  image,
  caption,
  className,
  priority = false,
  sizes,
  focusable,
}: {
  image: EditorialImage;
  caption?: ReactNode;
  className?: string;
  priority?: boolean;
  sizes?: string;
  focusable?: boolean;
}) => (
  <DirectionAwareFrame caption={caption} className={className} focusable={focusable}>
    <SiteImage
      src={image.src}
      alt={image.alt}
      width={image.width}
      height={image.height}
      priority={priority}
      sizes={sizes}
      style={{ objectPosition: image.objectPosition }}
    />
  </DirectionAwareFrame>
);
