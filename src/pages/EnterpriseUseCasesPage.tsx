import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import StandalonePage from "../components/ui/StandalonePage";
import { getImageAlt, getImagePosition } from "../data/imagery";
import { useCaseCards } from "../data/useCases";

export default function EnterpriseUseCasesPage() {
  return (
    <StandalonePage
      audience="enterprise"
      eyebrow="Enterprise use cases"
      title={<>For the businesses<br /><span className="text-[#007d21]">people depend on.</span></>}
      description="Explore a verification journey shaped around your industry, your team, and the people you serve."
      secondaryAction={{ label: "Explore the platform", to: "/enterprise/platform" }}
      finalTitle="Start with your industry's next step."
    >
      <section className="section-space" aria-label="Enterprise use cases">
        <div className="site-container grid gap-x-7 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
          {useCaseCards.map((card) => (
            <Link key={card.id} to={`/enterprise/use-cases/${card.id}`} className="group rounded-[28px]">
              <div className="aspect-[1.3] overflow-hidden rounded-[28px] bg-[#edf5e7]">
                <img src={card.imageUrl} alt={getImageAlt(card.imageUrl)} loading="lazy" className="h-full w-full object-cover" style={{ objectPosition: getImagePosition(card.imageUrl) }} />
              </div>
              <div className="mt-6 flex items-start justify-between gap-4"><h2 className="text-card-title font-semibold group-hover:text-[#007d21]">{card.title}</h2><ArrowUpRight className="mt-1 size-5 shrink-0 text-[#007d21]" aria-hidden="true" /></div>
              <p className="mt-3 text-body text-[#526058]">{card.description}</p>
            </Link>
          ))}
        </div>
      </section>
    </StandalonePage>
  );
}
