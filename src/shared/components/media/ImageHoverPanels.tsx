import ActionIcon from "../ui/ActionIcon";
import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import type { EditorialImage } from "../../data/imagery";
import { SiteImage } from "./SiteImage";
import "./image-hover-panels.css";

type ImageHoverPanelItem = {
  id: string;
  title: string;
  description: string;
  image: EditorialImage;
  to?: string;
  details?: ReactNode;
};

type ImageHoverPanelsProps = {
  items: ImageHoverPanelItem[];
  label: string;
  headingLevel?: "h2" | "h3";
};

const ImageHoverPanels = ({
  items,
  label,
  headingLevel: Heading = "h3",
}: ImageHoverPanelsProps) => {
  const rows = Array.from({ length: Math.ceil(items.length / 3) }, (_, index) =>
    items.slice(index * 3, index * 3 + 3),
  );

  return (
    <div className="image-hover-panels" role="group" aria-label={label}>
      {rows.map((row, rowIndex) => (
        <div
          key={row[0].id}
          className="image-hover-panel-row"
          role="region"
          aria-label={`${label} ${rowIndex + 1}`}
          tabIndex={0}
          onKeyDown={(event) => {
            if (
              event.target !== event.currentTarget ||
              !["ArrowLeft", "ArrowRight"].includes(event.key)
            )
              return;
            const rail = event.currentTarget;
            if (rail.scrollWidth <= rail.clientWidth) return;
            event.preventDefault();
            const cardWidth =
              rail.firstElementChild?.getBoundingClientRect().width ?? rail.clientWidth;
            const gap = Number.parseFloat(getComputedStyle(rail).columnGap) || 0;
            rail.scrollBy({ left: (event.key === "ArrowRight" ? 1 : -1) * (cardWidth + gap) });
          }}
        >
          {row.map((item) => {
            const content = (
              <>
                <div className="image-hover-panel-photo">
                  <SiteImage
                    src={item.image.src}
                    alt={item.image.alt}
                    width={item.image.width}
                    height={item.image.height}
                    sizes="(min-width: 1024px) 40vw, (min-width: 640px) 50vw, 90vw"
                    style={{ objectPosition: item.image.objectPosition }}
                  />
                </div>
                <div className="image-hover-panel-content">
                  <Heading className="image-hover-panel-heading">{item.title}</Heading>
                  <p className="image-hover-panel-description">{item.description}</p>
                  {item.to && (
                    <ActionIcon className="image-hover-panel-arrow" size={24} aria-hidden="true" />
                  )}
                </div>
              </>
            );

            return (
              <article key={item.id} className="image-hover-panel">
                {item.to ? (
                  <Link to={item.to} className="image-hover-panel-visual">
                    {content}
                  </Link>
                ) : (
                  <div className="image-hover-panel-visual">{content}</div>
                )}
                {item.details && <div className="image-hover-panel-details">{item.details}</div>}
              </article>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default ImageHoverPanels;
