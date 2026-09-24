import { ArrowUpRight, Bell, Fingerprint, History, KeyRound, ShieldCheck, WalletCards } from "lucide-react";
import { Link } from "react-router-dom";
import { platformLayers } from "../../../data/platform";
import { individualModuleCards } from "../../../data/audienceContent";
import type { Audience } from "../../../lib/audience";

const individualIcons = [Fingerprint, WalletCards, ShieldCheck, History, Bell, KeyRound];
const individualTitles = ["Identity proof", "Reusable credentials", "Your permission", "Less exposure", "Activity history", "Your control"];

export default function Modules({ audience }: { audience: Audience }) {
  const enterprise = audience === "enterprise";
  const cards = enterprise ? platformLayers : individualModuleCards.map((card, index) => ({
    ...card, title: individualTitles[index], icon: individualIcons[index],
  }));
  return (
    <section id="features" className="section-space bg-white">
      <div className="site-container">
        <div className="mb-12 grid gap-6 lg:grid-cols-[1.2fr_1fr] lg:items-end">
          <div><p className="eyebrow">{enterprise ? "The Ontiver platform" : "Built for you"}</p><h2 className="section-heading mt-4 max-w-[630px]">{enterprise ? "One platform. The layers of trust." : "Everything you need to stay in control."}</h2></div>
          <p className="max-w-[430px] text-subtitle text-[#002d0e]/65 lg:ml-auto">{enterprise ? "Connect the checks, decisions, and permissions behind your identity workflow. Explore each layer to see how they fit together." : "A place for your verification status, your permissions, and the history of where your proof is shared."}</p>
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {cards.map((card, index) => {
            const Icon = card.icon;
            return <Link data-scroll-reveal key={card.id} to={enterprise ? `/enterprise/platform/${card.id}` : "/security"} className="group flex min-h-[245px] flex-col items-start rounded-3xl border border-[#dce6d9] bg-[#f7f9f5] p-7 transition-colors hover:border-[#007d21]/40 hover:bg-[#edf5eb] sm:p-8">
              <div className="flex w-full items-center justify-between gap-4"><span className="grid size-12 place-items-center rounded-2xl border border-[#002d0e]/10 bg-white text-[#007d21]"><Icon size={25} strokeWidth={1.5} /></span><span className="text-meta font-medium text-[#002d0e]/40">0{index + 1}</span></div>
              <h3 className="mt-7 text-card-title font-semibold">{card.title}</h3>
              <p className="mb-6 mt-3 text-body text-[#002d0e]/65">{card.description}</p>
              <span className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-[#007d21]">{enterprise ? "Explore layer" : "Explore privacy & control"}<ArrowUpRight size={17} /></span>
            </Link>;
          })}
        </div>
      </div>
    </section>
  );
}
