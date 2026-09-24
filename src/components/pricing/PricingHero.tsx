import type { BillingCycle } from "../../data/pricing";

type PricingHeroProps = {
  billingCycle: BillingCycle;
  onBillingChange: (cycle: BillingCycle) => void;
};

export default function PricingHero({ billingCycle, onBillingChange }: PricingHeroProps) {
  return (
    <section className="page-intro text-center">
      <div className="site-container">
        <p className="eyebrow justify-center">Plan your verification workflow</p>
        <h1 className="mx-auto mt-6 max-w-[900px] text-balance text-page-hero font-semibold tracking-[-0.045em]">
          Plans for <span className="text-[#009311]">verified trust.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-[600px] text-subtitle text-[#526052]">
          Compare plans by verification volume and the controls your team needs. Scope the right starting point with us.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <div className="inline-flex rounded-full border border-[#d9e5d6] bg-white p-1" role="group" aria-label="Billing cycle">
            {(["monthly", "annual"] as const).map((cycle) => (
              <button key={cycle} type="button" aria-pressed={billingCycle === cycle} onClick={() => onBillingChange(cycle)} className={`min-h-11 cursor-pointer rounded-full px-7 text-body font-medium transition-colors ${billingCycle === cycle ? "bg-[#002d0e] text-white" : "text-[#526052] hover:bg-[#edf5eb]"}`}>
                {cycle === "monthly" ? "Monthly" : "Annual"}
              </button>
            ))}
          </div>
          <span className="text-meta font-semibold text-[#007d21]">Save with annual billing</span>
        </div>
        <p className="mx-auto mt-7 max-w-[650px] text-body text-[#637060]">Ontiver is pre-pilot. Listed plans are a starting point for discussion; live access, feature availability, support, and service terms are confirmed during scoping.</p>
      </div>
    </section>
  );
}
