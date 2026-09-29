import type { EditorialImage } from "../../data/imagery";

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
        <img
          src={photo.src}
          alt={photo.alt}
          width={photo.width}
          height={photo.height}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority && index === 0 ? "high" : undefined}
          decoding="async"
          style={{ objectPosition: photo.objectPosition }}
        />
      </div>
    ))}
  </div>
);

export default EditorialCollage;
