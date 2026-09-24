import { ArrowLeft, ArrowUpRight, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import type { UseCasePageDetail } from "../../data/useCases";

type UseCaseHeroProps = { detail: UseCasePageDetail; onBack: () => void };

export default function UseCaseHero({ detail, onBack }: UseCaseHeroProps) {
  return (
    <section className="page-intro">
      <div className="site-container">
        <button type="button" onClick={onBack} className="mb-10 inline-flex cursor-pointer items-center gap-2 text-body text-[#637060] hover:text-[#007d21]"><ArrowLeft size={16} />Back</button>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="eyebrow">Explore {detail.eyebrow} workflows</p>
            <h1 className="mt-6 text-page-hero font-semibold tracking-[-0.045em]">{detail.heroTitle}</h1>
            <p className="mt-6 max-w-[480px] text-subtitle text-[#526052]">{detail.tagline}</p>
            <Link to="/enterprise/contact" className="button-primary mt-9">Discuss a pilot<ArrowUpRight size={18} /></Link>
            <p className="mt-4 text-meta text-[#637060]">Pre-pilot · Scope and availability to be agreed.</p>
          </div>
          <div className="relative">
            <img src={detail.imageUrl} alt="" fetchPriority="high" className="aspect-[6/5] w-full rounded-[28px] object-cover lg:rounded-[40px]" />
            <div className="absolute bottom-5 left-5 right-5 flex items-center gap-3 rounded-2xl bg-white/95 p-4 backdrop-blur-sm sm:bottom-7 sm:left-7 sm:right-auto sm:px-6">
              <span className="grid size-11 shrink-0 place-items-center rounded-full bg-[#edf5eb] text-[#007d21]"><ShieldCheck size={22} /></span>
              <div><p className="text-body font-semibold">Designed for consent-led identity.</p><p className="mt-0.5 text-meta text-[#637060]">Reuse where supported.</p></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
