import type { EditorialImage } from "../../data/imagery";
import { SiteImage } from "./SiteImage";

export const BusinessPhoto = ({
  image,
  className = "",
  priority = false,
}: {
  image: EditorialImage;
  className?: string;
  priority?: boolean;
}) => {
  return (
    <SiteImage
      src={image.src}
      alt={image.alt}
      width={image.width}
      height={image.height}
      priority={priority}
      className={`h-full w-full object-cover ${className}`}
      style={{ objectPosition: image.objectPosition }}
    />
  );
};

export const PhotoMosaic = ({
  images,
  priority = false,
}: {
  images: readonly EditorialImage[];
  priority?: boolean;
}) => {
  return (
    <div className="grid aspect-[1.04] min-w-0 grid-cols-2 grid-rows-2 gap-3 sm:gap-4">
      {images.slice(0, 3).map((image, index) => (
        <div
          key={image.src}
          className={`min-h-0 overflow-hidden ${index === 2 ? "col-span-2" : ""}`}
        >
          <BusinessPhoto image={image} priority={priority && index < 2} />
        </div>
      ))}
    </div>
  );
};
