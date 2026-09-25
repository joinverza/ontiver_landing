import { type BillingCycle, type Plan } from "../../data/pricing";

type PricingCardProps = {
  plan: Plan;
  billingCycle: BillingCycle;
  onPlanAction: () => void;
};

export default function PricingCard({ plan, billingCycle, onPlanAction }: PricingCardProps) {
  const highlighted = plan.highlighted;

  return (
    <article data-scroll-reveal data-plan={plan.name.toLowerCase()} className={`flex min-w-0 scroll-mt-28 flex-col rounded-2xl border p-5 ${highlighted ? "border-[#002d0e] bg-[#002d0e] text-white" : "border-[#dce6d9] bg-[#f7f8f5] text-[#002d0e]"}`}>
      <div className="mb-3 flex items-center justify-between gap-2">
        <span className={`text-meta font-semibold uppercase tracking-[0.12em] ${highlighted ? "text-[#b8e5a7]" : "text-[#007d21]"}`}>{highlighted ? "Featured plan" : "Ontiver"}</span>
        {highlighted ? <span aria-hidden="true" className="size-2 rounded-full bg-[#b8e5a7]" /> : null}
      </div>
      <h2 className="text-card-title font-medium">{plan.name}</h2>
      <p className={`mt-2 text-body ${highlighted ? "text-white/70" : "text-[#637060]"}`}>{plan.description}</p>
      <div className="my-5">
        <p className="text-card-title font-medium">{plan.name === "Enterprise" ? "Custom pricing" : "Price to be confirmed"}</p>
        <p className={`mt-3 text-meta ${highlighted ? "text-white/60" : "text-[#637060]"}`}>{billingCycle === "annual" ? "Annual" : "Monthly"} quote requested · Terms to be agreed</p>
      </div>
      <button type="button" onClick={onPlanAction} className={`mb-5 inline-flex min-h-12 cursor-pointer items-center justify-center whitespace-nowrap rounded-full px-3 text-body font-medium transition-colors ${highlighted ? "bg-[#c7edb3] text-[#002d0e] hover:bg-white" : "bg-[#edf5eb] text-[#002d0e] hover:bg-[#dfeeda]"}`}>
        {plan.cta}
      </button>
      <div className={`border-t pt-4 ${highlighted ? "border-white/15" : "border-[#e4eae0]"}`}>
        <ul className="space-y-2">
          {plan.features.map((feature) => (
            <li key={feature} className={`text-body ${highlighted ? "text-white/75" : "text-[#637060]"}`}>{feature}</li>
          ))}
        </ul>
      </div>
    </article>
  );
}
