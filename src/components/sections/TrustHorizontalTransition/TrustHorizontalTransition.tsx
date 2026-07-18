import { ArrowUpRight, ShieldCheck } from "lucide-react";
import { securityFeatures } from "../../../data/trust";
import { individualSecurityFeatures } from "../../../data/audienceContent";
import type { Audience } from "../../../lib/audience";

export default function TrustHorizontalTransition({ audience }: { audience: Audience }) {
  const features = audience === "enterprise" ? securityFeatures : individualSecurityFeatures;

  return (
    <section id="security" className="bg-[#edf1ed] px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-[1180px]">
        <div className="grid gap-8 border-b border-black/10 pb-10 lg:grid-cols-[1fr_520px] lg:items-end">
          <div>
            <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[.18em] text-[#08772a]"><ShieldCheck className="h-4 w-4" /> Trust and control</p>
            <h2 className="mt-5 max-w-[12ch] text-4xl font-semibold tracking-[-.04em] text-[#071b13] sm:text-6xl">Security people can understand.</h2>
          </div>
          <p className="max-w-xl text-base leading-7 text-black/60">Ontiver combines explicit consent, auditable activity, scoped access, and data minimization without interrupting the page with pinned or horizontal-scrolling effects.</p>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {features.map((feature) => (
            <article key={feature.title} className="rounded-[1.5rem] border border-black/10 bg-white p-6 sm:p-8">
              <div className="flex items-start justify-between gap-5">
                <div><p className="text-xs font-bold uppercase tracking-[.15em] text-[#08772a]">{feature.eyebrow}</p><h3 className="mt-3 text-2xl font-semibold tracking-tight text-[#071b13]">{feature.title}</h3></div>
                <span className="rounded-full bg-[#eaf5ec] px-3 py-1.5 text-xs font-bold text-[#08772a]">{feature.metric}</span>
              </div>
              <p className="mt-4 leading-7 text-black/60">{feature.description}</p>
              <div className="mt-6 flex flex-wrap gap-2">{feature.chips.map((chip) => <span key={chip} className="rounded-full border border-black/10 px-3 py-1.5 text-xs font-semibold text-black/60">{chip}</span>)}</div>
              <a href={feature.primaryAction.href} className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-[#08772a]">{feature.primaryAction.label}<ArrowUpRight className="h-4 w-4" /></a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
