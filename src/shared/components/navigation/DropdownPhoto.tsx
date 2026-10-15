import ActionIcon from "../ui/ActionIcon";
import { useState } from "react";
import { Link } from "react-router-dom";
import type { EditorialImage } from "../../data/imagery";
import type { NavLink } from "../../data/navigation";
import { SiteImage } from "../media/SiteImage";

type PhotoPreview = {
  item: NavLink;
  image: EditorialImage;
  label: string;
};

const DropdownPhoto = ({
  preview,
  onNavigate,
}: {
  preview: PhotoPreview;
  onNavigate: () => void;
}) => {
  const [images, setImages] = useState([preview.image]);
  const [loadedSources, setLoadedSources] = useState<string[]>([]);
  const [displayed, setDisplayed] = useState(preview);
  const [labels, setLabels] = useState([preview.label]);

  if (!images.some((image) => image.src === preview.image.src)) {
    setImages([...images, preview.image]);
  }
  // Keep the last decoded photograph visible while the next one loads.
  if (
    loadedSources.includes(preview.image.src) &&
    (displayed.item !== preview.item || displayed.label !== preview.label)
  ) {
    setDisplayed(preview);
  }
  if (!labels.includes(preview.label)) {
    setLabels([...labels, preview.label]);
  }

  return (
    <Link
      className="nav-dropdown-photo"
      to={preview.item.to}
      target={preview.item.external ? "_blank" : undefined}
      rel={preview.item.external ? "noreferrer" : undefined}
      onClick={onNavigate}
      aria-label={preview.item.name}
    >
      {images.map((image) => (
        <SiteImage
          key={image.src}
          src={image.src}
          alt={image.src === displayed.image.src ? image.alt : ""}
          aria-hidden={image.src !== displayed.image.src}
          width={image.width}
          height={image.height}
          sizes="32vw"
          priority
          reveal={false}
          className="nav-dropdown-photo-layer"
          data-visible={image.src === displayed.image.src && loadedSources.includes(image.src)}
          onLoad={async (event) => {
            await event.currentTarget.decode().catch(() => undefined);
            setLoadedSources((sources) =>
              sources.includes(image.src) ? sources : [...sources, image.src],
            );
          }}
          style={{ objectPosition: image.objectPosition }}
        />
      ))}
      <span className="nav-dropdown-photo-label">
        <span className="nav-dropdown-label-stack">
          {labels.map((label) => (
            <span
              key={label}
              className="nav-dropdown-label-layer"
              data-visible={displayed.label === label}
              aria-hidden={displayed.label !== label}
            >
              {label}
            </span>
          ))}
        </span>
        <ActionIcon size={22} aria-hidden="true" />
      </span>
    </Link>
  );
};

export default DropdownPhoto;
