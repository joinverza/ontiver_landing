import ActionIcon from "../../../../shared/components/ui/ActionIcon";
import { Link } from "react-router-dom";
import type { UseCasePageDetail } from "../data/useCases";
import { DirectionAwarePhoto } from "../../../../shared/components/media/DirectionAwarePhoto";
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
            className="inline-flex items-center gap-2 text-body font-medium text-accent"
          >
            All industries
            <ActionIcon size={18} />
          </Link>
        </div>
        <div
          data-horizontal-cards
          data-lenis-prevent-horizontal
          tabIndex={0}
          role="region"
          aria-label="Related industry cards"
          style={{ overscrollBehaviorY: "auto" }}
          onKeyDown={(event) => {
            if (
              event.target !== event.currentTarget ||
              !["ArrowLeft", "ArrowRight"].includes(event.key)
            )
              return;
            const rail = event.currentTarget;
            if (rail.scrollWidth <= rail.clientWidth) return;
            event.preventDefault();
            rail.scrollBy({
              left: (event.key === "ArrowRight" ? 1 : -1) * rail.clientWidth * 0.85,
            });
          }}
          className="flex items-stretch gap-5 overflow-x-auto overscroll-x-contain pb-3 lg:grid lg:grid-cols-3 lg:gap-7 lg:overflow-visible"
        >
          {items.slice(0, 3).map((item) => (
            <Link
              key={item.id}
              to={`/enterprise/use-cases/${item.id}`}
              className="group w-[85%] min-w-0 shrink-0 lg:w-auto"
            >
              <DirectionAwarePhoto
                image={getIndustryImage(item.id)}
                focusable={false}
                sizes="(min-width: 1000px) 32vw, 90vw"
                caption={
                  <>
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-card-title font-medium">{item.heroTitle}</h3>
                      <ActionIcon size={21} className="mt-1 shrink-0" aria-hidden="true" />
                    </div>
                    <p className="mt-2 text-sm">{item.purpose}</p>
                  </>
                }
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RelatedUseCases;
