import ActionIcon from "../../../../shared/components/ui/ActionIcon";
import { Link } from "react-router-dom";
import type { UseCasePageDetail } from "../data/useCases";
import ContextPhoto from "../../../../shared/components/ui/ContextPhoto";
import { getIndustryImage } from "../../../../shared/components/media/businessImages";

const UseCaseHero = ({ detail }: { detail: UseCasePageDetail }) => {
  return (
    <section className="page-intro pt-32!">
      <div
        className={`site-container split-hero-grid ${(detail.section ?? 0) % 2 ? "split-hero-grid--image-left" : ""}`}
      >
        <Link
          to="/enterprise/use-cases"
          className="mb-8 inline-flex items-center gap-2 text-body text-[#526058] hover:text-accent"
        >
          <ActionIcon direction="back" size={16} />
          All industries
        </Link>
        <div data-scroll-reveal className="page-hero-content">
          <p className="eyebrow">{detail.eyebrow}</p>
          <h1 className="page-hero-heading text-page-hero font-normal">{detail.heroTitle}</h1>
          <p className="page-hero-description text-subtitle text-[#526052]">{detail.tagline}</p>
          <div className="page-hero-actions">
            <Link to={detail.pilotPath} className="button-primary">
              {detail.pilotCta}
              <ActionIcon size={18} />
            </Link>
          </div>
          <p className="mt-4 text-meta text-[#526058]">
            Proposed template · Pilot scope and availability to be agreed.
          </p>
        </div>
        <div data-scroll-reveal className="page-hero-media">
          <ContextPhoto
            image={getIndustryImage(detail.id)}
            className="rounded-2xl!"
            priority
            sizes="(min-width: 1024px) 47vw, 100vw"
          />
        </div>
      </div>
    </section>
  );
};

export default UseCaseHero;
