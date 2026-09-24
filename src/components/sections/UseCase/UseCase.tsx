import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useCaseCards } from "../../../data/useCases";
import { individualUseCaseCards } from "../../../data/audienceContent";
import type { Audience } from "../../../lib/audience";
import AuroraBadge from "../../ui/AuroraBadge";

export default function UseCase({ audience }: { audience: Audience }) {
  const enterprise = audience === "enterprise";
  const cards = enterprise ? useCaseCards : individualUseCaseCards;
  return (
    <section id="cases" className="section-space bg-[#edf5eb]">
      <div className="site-container">
        <div className="mb-12 max-w-[740px]"><AuroraBadge>{enterprise ? "Enterprise Use Cases" : "Where It Helps"}</AuroraBadge><h2 className="section-heading mt-5">{enterprise ? "Built for the teams that need verified trust most." : "Use trusted identity across more of everyday life."}</h2></div>
        <div className="grid gap-x-7 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
          {cards.map(card => {
            const content = <><div className="aspect-[1.6] overflow-hidden rounded-3xl bg-[#002d0e]"><img src={card.imageUrl.replace("./", "/")} alt="" loading="lazy" className="h-full w-full object-cover" /></div><div className="mt-5 flex items-start justify-between gap-4"><h3 className="text-card-title font-semibold">{card.title}</h3>{enterprise ? <ArrowUpRight size={22} className="shrink-0 text-[#007d21]" /> : null}</div><p className="mt-2 text-body text-[#002d0e]/65">{card.description}</p></>;
            return enterprise ? <Link key={card.id} to={`/enterprise/use-cases/${card.id}`} className="group rounded-3xl transition-colors hover:text-[#007d21]">{content}</Link> : <article key={card.id}>{content}</article>;
          })}
        </div>
      </div>
    </section>
  );
}
