import { ArrowUpRight, Check, Layers3 } from "lucide-react";
import { pricingPlans } from "../../data/pricing";
import { formatPrice } from "../../lib/pricing";

type PlanOrbitPanelProps = {
  recommendation: { plan: string; reason: string } | null;
  onViewPlan: () => void;
  onComparePlans: () => void;
};

export default function PlanOrbitPanel({ recommendation, onViewPlan, onComparePlans }: PlanOrbitPanelProps) {
  const plan = pricingPlans.find((item) => item.name === recommendation?.plan);
  return (
    <div className="flex min-h-[400px] flex-col justify-between rounded-[28px] bg-[#dcebd5] p-6 sm:p-10" aria-live="polite" aria-atomic="true">
      <div className="flex items-center justify-between"><p className="eyebrow">Built around your business</p><Layers3 size={24} className="text-[#007d21]" strokeWidth={1.5} /></div>
      {recommendation && plan ? (
        <div className="py-10">
          <p className="inline-flex items-center gap-2 text-body text-[#007d21]"><Check size={18} />Your ideal plan</p>
          <h3 className="mt-5 text-section font-semibold tracking-[-0.035em]">{recommendation.plan}</h3>
          <p className="mt-5 max-w-[360px] text-body text-[#526052]">{recommendation.reason}</p>
          <p className="mt-8 text-[40px] font-semibold tracking-[-0.04em]">{formatPrice(plan.monthly)}<span className="ml-2 text-body font-normal tracking-normal text-[#526052]">{plan.monthly === null ? "pricing" : plan.monthly === 0 ? "forever" : "/ month"}</span></p>
          <ul className="mt-8 space-y-3 border-t border-[#bdd2b4] pt-7">{plan.features.slice(0, 3).map((feature) => <li key={feature} className="flex items-center gap-3 text-body text-[#526052]"><Check size={16} className="text-[#007d21]" />{feature}</li>)}</ul>
        </div>
      ) : (
        <div className="py-12">
          <span aria-hidden="true" className="mb-9 grid size-20 place-items-center rounded-[24px] bg-[#002d0e] text-[#c7edb3]"><Layers3 size={36} strokeWidth={1.2} /></span>
          <h3 className="max-w-[380px] text-section font-semibold tracking-[-0.035em]">Your next stage.<br />Your right fit.</h3>
          <p className="mt-5 max-w-[360px] text-body text-[#526052]">Tell us your verification volume and the controls you need. Find the Ontiver plan that fits your team.</p>
        </div>
      )}
      <div className="flex flex-wrap items-center gap-5">
        {recommendation ? <button type="button" className="button-primary" onClick={onViewPlan}>View {recommendation.plan}<ArrowUpRight size={17} /></button> : null}
        <button type="button" className="inline-flex min-h-12 cursor-pointer items-center gap-2 text-body font-medium text-[#007d21] hover:text-[#002d0e]" onClick={onComparePlans}>Compare plans<ArrowUpRight size={17} /></button>
      </div>
    </div>
  );
}
