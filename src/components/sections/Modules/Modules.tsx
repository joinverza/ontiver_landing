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
        <div className="mx-auto mb-12 max-w-[880px] text-center lg:mb-16">
          <p className="eyebrow">{enterprise ? "The Ontiver platform" : "Built for you"}</p><h2 className="section-heading mt-5">{enterprise ? "One platform for trusted identity." : "Your identity. Your control."}</h2>
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {cards.map((card, index) => {
            const Icon = card.icon;
            return <Link data-scroll-reveal key={card.id} to={enterprise ? `/enterprise/platform/${card.id}` : "/security"} className="group flex flex-col items-start rounded-3xl border border-[#dce6d9] bg-[#f7f9f5] p-6 transition-colors hover:border-[#007d21]/40 hover:bg-[#edf5eb] sm:p-7">
              <div className="flex w-full items-center justify-between gap-4"><span className="grid size-12 place-items-center rounded-2xl border border-[#002d0e]/10 bg-white text-[#007d21]"><Icon size={25} strokeWidth={1.5} /></span><span className="text-meta font-medium text-[#002d0e]/40">0{index + 1}</span></div>
              <div className="mt-5 flex w-full items-center justify-between gap-3"><h3 className="text-card-title font-semibold">{card.title}</h3><ArrowUpRight size={19} className="shrink-0 text-[#007d21]" aria-hidden="true" /></div>
              <p className="mt-2 text-body text-[#002d0e]/65">{card.description}</p>
            </Link>;
          })}
        </div>
      </div>
    </section>
  );
}
