import { imagery, type EditorialImage } from "../../data/imagery";

const ContextPhoto = ({
  image = imagery.work,
  size = "hero",
  priority = false,
  className = "",
}: {
  image?: EditorialImage;
  size?: "hero" | "card" | "wide";
  priority?: boolean;
  className?: string;
}) => {
  return (
    <div className={`context-photo context-photo--${size} ${className}`}>
      <img
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : undefined}
        style={{ objectPosition: image.objectPosition }}
      />
    </div>
  );
};

export default ContextPhoto;
