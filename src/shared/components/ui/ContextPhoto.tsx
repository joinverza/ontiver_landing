import { imagery, type EditorialImage } from "../../data/imagery";
import type { ReactNode } from "react";
import { DirectionAwarePhoto } from "../media/DirectionAwarePhoto";

const ContextPhoto = ({
  image = imagery.work,
  size = "hero",
  priority = false,
  sizes,
  caption,
  className = "",
}: {
  image?: EditorialImage;
  size?: "hero" | "card" | "wide";
  priority?: boolean;
  sizes?: string;
  caption?: ReactNode;
  className?: string;
}) => {
  return (
    <DirectionAwarePhoto
      image={image}
      caption={caption}
      priority={priority}
      sizes={sizes}
      className={`context-photo context-photo--${size} ${className}`}
    />
  );
};

export default ContextPhoto;
