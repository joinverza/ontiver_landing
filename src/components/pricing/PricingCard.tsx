import { Check } from "lucide-react";
import { type BillingCycle, type Plan } from "../../data/pricing";
import { formatPrice } from "../../lib/pricing";

type PricingCardProps = {
  plan: Plan;
  billingCycle: BillingCycle;
  onPlanAction: () => void;
};

export default function PricingCard({ plan, billingCycle, onPlanAction }: PricingCardProps) {
  const price = billingCycle === "annual" ? plan.annual : plan.monthly;
  const highlighted = plan.highlighted;

  return (
    <article data-scroll-reveal data-plan={plan.name.toLowerCase()} className={`flex min-w-0 scroll-mt-28 flex-col rounded-[24px] border p-6 ${highlighted ? "border-[#002d0e] bg-[#002d0e] text-white" : "border-[#dce6d9] bg-white text-[#002d0e]"}`}>
      <div className="mb-5 flex min-h-6 items-center justify-between gap-2">
        <span className={`text-meta font-semibold uppercase tracking-[0.12em] ${highlighted ? "text-[#b8e5a7]" : "text-[#007d21]"}`}>{highlighted ? "Featured plan" : "Ontiver"}</span>
        {highlighted ? <span aria-hidden="true" className="size-2 rounded-full bg-[#b8e5a7]" /> : null}
      </div>
      <h2 className="text-card-title font-semibold">{plan.name}</h2>
      <p className={`mt-3 min-h-[84px] text-body ${highlighted ? "text-white/70" : "text-[#637060]"}`}>{plan.description}</p>
      <div className="my-7">
        <p className="text-[36px] font-semibold leading-none tracking-[-0.04em]">{formatPrice(price)}</p>
        <p className={`mt-3 text-meta ${highlighted ? "text-white/60" : "text-[#637060]"}`}>{plan.period}{billingCycle === "annual" && price !== null && price > 0 ? ", billed annually" : ""}</p>
      </div>
      <button type="button" onClick={onPlanAction} className={`mb-7 inline-flex min-h-12 cursor-pointer items-center justify-center whitespace-nowrap rounded-full px-3 text-body font-medium transition-colors ${highlighted ? "bg-[#c7edb3] text-[#002d0e] hover:bg-white" : "bg-[#edf5eb] text-[#002d0e] hover:bg-[#dfeeda]"}`}>
        {plan.cta}
      </button>
      <div className={`border-t pt-6 ${highlighted ? "border-white/15" : "border-[#e4eae0]"}`}>
        {plan.metric ? <p className="mb-5 text-body font-semibold">{plan.metric.value.toLocaleString()}{plan.metric.suffix}</p> : null}
        <ul className="space-y-3">
          {plan.features.map((feature) => (
            <li key={feature} className={`flex items-start gap-2 text-body ${highlighted ? "text-white/75" : "text-[#637060]"}`}><Check size={16} className={`mt-1 shrink-0 ${highlighted ? "text-[#b8e5a7]" : "text-[#009311]"}`} />{feature}</li>
          ))}
        </ul>
      </div>
    </article>
  );
}
