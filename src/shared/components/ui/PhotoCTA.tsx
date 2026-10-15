import ActionIcon from "./ActionIcon";
import { Link } from "react-router-dom";
import type { ReactNode } from "react";
import type { EditorialImage } from "../../data/imagery";
import "./cta-band.css";

const PhotoCTA = ({
  title,
  label,
  to,
}: {
  title: string;
  label: string;
  to: string;
  image?: EditorialImage;
  visual?: ReactNode;
}) => {
  return (
    <section className="section-space section-compact cta-band">
      <div className="site-container cta-band-layout" data-scroll-reveal>
        <div className="cta-band-primary">
          <p className="text-meta font-semibold uppercase tracking-wider text-[#c7e6b5]">
            Your next step
          </p>
          <h2 className="section-heading mt-3">{title}</h2>
          <Link to={to} className="button-primary button-on-dark mt-6">
            {label}
            <ActionIcon size={18} />
          </Link>
        </div>
        <div className="cta-band-details">
          <p className="text-subtitle text-white/80">
            {to.startsWith("/enterprise")
              ? "Bring one onboarding challenge. Together, we can map the evidence, consent, and review steps for a focused pilot."
              : "Get updates on the planned identity wallet, where every request starts with your choice about what to share."}
          </p>
        </div>
      </div>
    </section>
  );
};

export default PhotoCTA;
