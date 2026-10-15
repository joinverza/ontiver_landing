import type { EditorialImage } from "../../data/imagery";
import { SiteImage } from "./SiteImage";

type EditorialCollageProps = {
  image: EditorialImage;
  detailImage?: EditorialImage;
  priority?: boolean;
  className?: string;
};

const EditorialCollage = ({
  image,
  detailImage,
  priority = false,
  className = "",
}: EditorialCollageProps) => (
  <div
    className={`editorial-collage ${className}`}
    data-layout={detailImage ? "paired" : "single"}
    data-orientation={image.height > image.width ? "portrait" : "landscape"}
  >
    {[image, ...(detailImage ? [detailImage] : [])].map((photo, index) => (
      <div className="editorial-collage-frame" key={photo.src}>
        <SiteImage
          src={photo.src}
          alt={photo.alt}
          width={photo.width}
          height={photo.height}
          priority={priority && index === 0}
          sizes={priority ? "(min-width: 1024px) 47vw, 100vw" : undefined}
          style={{ objectPosition: photo.objectPosition }}
        />
      </div>
    ))}
  </div>
);

export default EditorialCollage;
