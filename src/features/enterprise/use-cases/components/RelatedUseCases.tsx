import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import type { UseCasePageDetail } from "../data/useCases";
import { BusinessPhoto } from "../../../../shared/components/media/BusinessPhoto";
import { getIndustryImage } from "../../../../shared/components/media/businessImages";

const RelatedUseCases = ({ items }: { items: UseCasePageDetail[] }) => {
  return (
    <section className="section-space">
      <div className="site-container">
        <div data-scroll-reveal className="mb-8 flex flex-wrap items-end justify-between gap-5">
          <div>
            <p className="eyebrow">Explore other workflows</p>
            <h2 className="mt-4 text-section font-normal">Related industries.</h2>
          </div>
          <Link
            to="/enterprise/use-cases"
            className="inline-flex items-center gap-2 text-body font-medium text-[#007d21]"
          >
            All industries
            <ArrowUpRight size={18} />
          </Link>
        </div>
        <div
          data-horizontal-cards
          data-lenis-prevent
          tabIndex={0}
          role="region"
          aria-label="Related industry cards"
          className="flex items-start gap-5 overflow-x-auto pb-3 md:grid md:grid-cols-3 md:gap-7 md:overflow-visible"
        >
          {items.slice(0, 3).map((item) => (
            <Link
              data-scroll-reveal
              key={item.id}
              to={`/enterprise/use-cases/${item.id}`}
              className="group w-[85%] min-w-0 shrink-0 md:w-auto"
            >
              <div className="h-[170px] overflow-hidden rounded-xl sm:h-[200px]">
                <BusinessPhoto image={getIndustryImage(item.id)} />
              </div>
              <div className="mt-4 flex items-start justify-between gap-3">
                <h3 className="text-card-title font-medium group-hover:text-[#007d21]">
                  {item.heroTitle}
                </h3>
                <ArrowUpRight size={21} className="mt-1 shrink-0 text-[#007d21]" />
              </div>
              <p className="mt-2 text-sm text-[#637060]">{item.purpose}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RelatedUseCases;
