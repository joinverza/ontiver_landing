import { Check } from "lucide-react";
import type { UseCasePageDetail } from "../../data/useCases";

export default function UseCaseChallenge({ detail }: { detail: UseCasePageDetail }) {
  return (
    <section className="section-space">
      <div className="site-container">
        <div data-scroll-reveal className="grid gap-7 border-b border-[#e4ebe0] pb-14 lg:grid-cols-[1.15fr_1fr] lg:gap-20">
          <h2 className="text-section font-semibold tracking-[-0.035em]">{detail.headline}</h2>
          <p className="text-subtitle text-[#637060]">{detail.intro}</p>
        </div>
        <div className="mt-14 grid items-center gap-10 lg:grid-cols-2 lg:gap-20">
          <div data-scroll-reveal className="overflow-hidden rounded-[28px] bg-[#edf5eb]">
            <img src={detail.imageUrl} alt={detail.challenge.visualTitle} loading="lazy" className="aspect-[6/5] w-full object-cover" />
            <p className="px-7 py-5 text-meta font-medium text-[#637060]">{detail.challenge.visualTitle}</p>
          </div>
          <div data-scroll-reveal>
            <p className="eyebrow">{detail.challenge.label}</p>
            <h2 className="mt-5 text-section font-semibold tracking-[-0.035em]">{detail.challenge.heading}</h2>
            <p className="mt-6 text-body text-[#637060]">{detail.challenge.body}</p>
            <p className="mt-7 text-meta font-semibold uppercase tracking-[0.12em] text-[#007d21]">Intended workflow outcomes</p>
            <ul className="mt-4 space-y-4">{detail.outcomes.map((outcome) => <li key={outcome} className="flex items-start gap-3 text-body text-[#526052]"><Check size={18} className="mt-1 shrink-0 text-[#009311]" />{outcome}</li>)}</ul>
          </div>
        </div>
      </div>
    </section>
  );
}
