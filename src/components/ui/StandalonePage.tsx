import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "../sections/Footer/Footer";
import type { EditorialImage } from "../../data/imagery";
import type { Audience } from "../../lib/audience";

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
  children: ReactNode;
};

export function EditorialPhoto({ image, className = "" }: { image: EditorialImage; className?: string }) {
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
}

export default function StandalonePage({
  audience = "individual",
  eyebrow,
  title,
  description,
  visual,
  primaryAction,
  secondaryAction,
  finalTitle,
  children,
}: StandalonePageProps) {
  const action = primaryAction ?? (audience === "enterprise"
    ? { label: "Get a demo", to: "/enterprise/contact" }
    : { label: "Join Waitlist", to: "/waitlist" });

  return (
    <main className="bg-white text-[#002d0e]">
      <section className="page-intro">
        <div className={`site-container ${visual ? "grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14" : ""}`}>
          <div className={visual ? "min-w-0" : "max-w-[1050px]"}>
            <p className="eyebrow">{eyebrow}</p>
            <h1 className="mt-6 text-page-hero font-semibold">{title}</h1>
            <p className="mt-7 max-w-[760px] text-subtitle text-[#526058]">{description}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to={action.to} className="button-primary">{action.label}<ArrowUpRight size={18} aria-hidden="true" /></Link>
              {secondaryAction ? <Link to={secondaryAction.to} className="button-secondary">{secondaryAction.label}</Link> : null}
            </div>
          </div>
          {visual ? <div className="min-w-0">{visual}</div> : null}
        </div>
      </section>
      {children}
      <section className="section-space bg-[#edf5e7]">
        <div className="site-container flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
          <h2 className="section-heading max-w-[800px]">{finalTitle}</h2>
          <Link to={action.to} className="button-primary shrink-0">{action.label}<ArrowUpRight size={18} aria-hidden="true" /></Link>
        </div>
      </section>
      <Footer audience={audience} />
    </main>
  );
}
