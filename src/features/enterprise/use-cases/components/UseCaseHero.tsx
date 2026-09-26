import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import type { UseCasePageDetail } from "../data/useCases";
import { BusinessPhoto } from "../../../../shared/components/media/BusinessPhoto";
import { getIndustryImage } from "../../../../shared/components/media/businessImages";

const UseCaseHero = ({ detail }: { detail: UseCasePageDetail }) => {
  return (
    <section className="page-intro">
      <div className="site-container">
        <Link
          to="/enterprise/use-cases"
          className="mb-8 inline-flex items-center gap-2 text-body text-[#637060] hover:text-[#007d21]"
        >
          <ArrowLeft size={16} />
          All industries
        </Link>
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
          <div data-scroll-reveal className="min-w-0">
            <p className="eyebrow">{detail.eyebrow}</p>
            <h1 className="mt-5 text-page-hero font-normal [overflow-wrap:anywhere]">
              {detail.heroTitle}
            </h1>
            <p className="mt-5 max-w-[500px] text-subtitle text-[#526052]">{detail.tagline}</p>
            <Link to={detail.pilotPath} className="button-primary mt-7">
              {detail.pilotCta}
              <ArrowUpRight size={18} />
            </Link>
            <p className="mt-4 text-meta text-[#637060]">
              Proposed template · Pilot scope and availability to be agreed.
            </p>
          </div>
          <div
            data-scroll-reveal
            className="h-[260px] overflow-hidden rounded-2xl sm:h-[340px] lg:h-[380px]"
          >
            <BusinessPhoto image={getIndustryImage(detail.id)} priority />
          </div>
        </div>
      </div>
    </section>
  );
};

export default UseCaseHero;
