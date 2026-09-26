import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "../layout/Footer";
import type { EditorialImage } from "../../data/imagery";
import type { Audience } from "../../lib/audience";
import PhotoCTA from "./PhotoCTA";

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
    <img
      src={image.src}
      alt={image.alt}
      width={image.width}
      height={image.height}
      className={`h-full w-full rounded-[28px] object-cover ${className}`}
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
  finalVisual,
  children,
}: StandalonePageProps) => {
  const action =
    primaryAction ??
    (audience === "enterprise"
      ? { label: "Get a Demo", to: "/enterprise/contact" }
      : { label: "Join the Waitlist", to: "/waitlist" });

  return (
    <main id="main-content" tabIndex={-1} className="bg-white text-[#002d0e]">
      <section className="page-intro">
        <div
          className={`site-container ${visual ? "grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14" : ""}`}
        >
          <div className={`hero-enter ${visual ? "min-w-0" : "max-w-[1050px]"}`}>
            <p className="eyebrow">{eyebrow}</p>
            <h1 className="mt-6 text-page-hero font-medium">{title}</h1>
            <p className="mt-7 max-w-[760px] text-subtitle text-[#526058]">{description}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to={action.to} className="button-primary">
                {action.label}
                <ArrowUpRight size={18} aria-hidden="true" />
              </Link>
              {secondaryAction ? (
                <Link to={secondaryAction.to} className="button-secondary">
                  {secondaryAction.label}
                </Link>
              ) : null}
            </div>
          </div>
          {visual ? <div className="hero-media-enter min-w-0">{visual}</div> : null}
        </div>
      </section>
      {children}
      <PhotoCTA title={finalTitle} label={action.label} to={action.to} visual={finalVisual} />
      <Footer audience={audience} />
    </main>
  );
};

export default StandalonePage;
