import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useCaseCards } from "../../../data/useCases";
import { individualUseCaseCards } from "../../../data/audienceContent";
import type { Audience } from "../../../lib/audience";
import AuroraBadge from "../../ui/AuroraBadge";
import { getImageAlt, getImagePosition } from "../../../data/imagery";

export default function UseCase({ audience }: { audience: Audience }) {
  const enterprise = audience === "enterprise";
  const cards = enterprise ? useCaseCards : individualUseCaseCards;
  return (
    <section id="cases" className="section-space bg-white">
      <div className="site-container">
        <div className="mx-auto mb-12 max-w-[900px] text-center lg:mb-16"><AuroraBadge>{enterprise ? "Enterprise Use Cases" : "Where It Helps"}</AuroraBadge><h2 className="section-heading mt-5">{enterprise ? "For the businesses people depend on." : "Trusted identity. More of everyday life."}</h2><p className="mx-auto mt-6 max-w-[650px] text-subtitle text-[#002d0e]/65">{enterprise ? "Explore a verification journey shaped around your industry, your team, and the people you serve." : "From a new opportunity to an everyday service, see where reusable proof could help on supported platforms."}</p></div>
        <div className="grid gap-x-7 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
          {cards.map(card => {
            const content = <><div className="aspect-[1.3] overflow-hidden rounded-3xl bg-[#e2edda]"><img src={card.imageUrl.replace("./", "/")} alt={getImageAlt(card.imageUrl)} loading="lazy" className="h-full w-full object-cover" style={{ objectPosition: getImagePosition(card.imageUrl) }} /></div><div className="mt-6 flex items-start justify-between gap-4"><h3 className="text-card-title font-semibold">{card.title}</h3>{enterprise ? <ArrowUpRight size={24} className="shrink-0 text-[#007d21]" /> : null}</div><p className="mt-3 text-body text-[#002d0e]/65">{card.description}</p></>;
            return enterprise ? <Link key={card.id} to={`/enterprise/use-cases/${card.id}`} className="group rounded-3xl transition-colors hover:text-[#007d21]">{content}</Link> : <article key={card.id}>{content}</article>;
          })}
        </div>
      </div>
    </section>
  );
}
