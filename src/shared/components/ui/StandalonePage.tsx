import ActionIcon from "./ActionIcon";
import type { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import Footer from "../layout/Footer";
import type { EditorialImage } from "../../data/imagery";
import type { Audience } from "../../lib/audience";
import PhotoCTA from "./PhotoCTA";
import { SiteImage } from "../media/SiteImage";

type PageAction = { label: string; to: string };

type StandalonePageProps = {
  audience?: Audience;
  eyebrow: string;
  title: ReactNode;
  description: string;
  visual?: ReactNode;
  primaryAction?: PageAction;
  secondaryAction?: PageAction;
  finalTitle: string;
  finalImage?: EditorialImage;
  finalVisual?: ReactNode;
  children: ReactNode;
};

export const EditorialPhoto = ({
  image,
  className = "",
}: {
  image: EditorialImage;
  className?: string;
}) => {
  return (
    <SiteImage
      src={image.src}
      alt={image.alt}
      width={image.width}
      height={image.height}
      className={`h-full w-full object-cover ${className}`}
      style={{ objectPosition: image.objectPosition }}
    />
  );
};

const StandalonePage = ({
  audience = "individual",
  eyebrow,
  title,
  description,
  visual,
  primaryAction,
  secondaryAction,
  finalTitle,
  finalImage,
  finalVisual,
  children,
}: StandalonePageProps) => {
  const { pathname } = useLocation();
  const imageLeft = ["/how-it-works", "/enterprise/platform", "/use-cases"].includes(pathname);
  const action =
    primaryAction ??
    (audience === "enterprise"
      ? { label: "Get a Demo", to: "/enterprise/contact" }
      : { label: "Join the Waitlist", to: "/waitlist" });

  return (
    <main id="main-content" tabIndex={-1} className="bg-surface text-[#002d0e]">
      <section className="page-intro">
        <div
          className={`site-container ${visual ? "split-hero-grid" : ""} ${imageLeft ? "split-hero-grid--image-left" : ""}`}
        >
          <div className="page-hero-content hero-enter">
            <p className="eyebrow">{eyebrow}</p>
            <h1 className="page-hero-heading text-page-hero font-medium">{title}</h1>
            <p className="page-hero-description text-subtitle text-[#526058]">{description}</p>
            <div className="page-hero-actions">
              <Link to={action.to} className="button-primary">
                {action.label}
                <ActionIcon size={18} aria-hidden="true" />
              </Link>
              {secondaryAction ? (
                <Link to={secondaryAction.to} className="button-secondary">
                  {secondaryAction.label}
                </Link>
              ) : null}
            </div>
          </div>
          {visual ? <div className="page-hero-media hero-media-enter">{visual}</div> : null}
        </div>
      </section>
      {children}
      <PhotoCTA
        title={finalTitle}
        label={action.label}
        to={action.to}
        image={finalImage}
        visual={finalVisual}
      />
      <Footer audience={audience} />
    </main>
  );
};

export default StandalonePage;
