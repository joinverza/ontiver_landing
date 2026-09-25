import type { BillingCycle } from "../../data/pricing";
import { BusinessPhoto } from "../business/BusinessPhoto";
import { imagery } from "../../data/imagery";

type PricingHeroProps = {
  billingCycle: BillingCycle;
  onBillingChange: (cycle: BillingCycle) => void;
};

export default function PricingHero({ billingCycle, onBillingChange }: PricingHeroProps) {
  return (
    <section className="page-intro">
      <div className="site-container grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
        <div data-scroll-reveal className="min-w-0">
        <p className="eyebrow">Plan your verification workflow</p>
        <h1 className="mt-6 text-page-hero font-normal">
          Simple plans for every stage of verification.
        </h1>
        <p className="mt-6 max-w-[560px] text-subtitle text-[#526052]">
          Choose a starting point for your workflow. Prices, allowances, and service terms are confirmed with your team.
        </p>
        <div className="mt-9 flex flex-wrap items-center gap-4">
          <div className="inline-flex rounded-full border border-[#d9e5d6] bg-white p-1" role="group" aria-label="Billing cycle">
            {(["monthly", "annual"] as const).map((cycle) => (
              <button key={cycle} type="button" aria-pressed={billingCycle === cycle} onClick={() => onBillingChange(cycle)} className={`min-h-11 cursor-pointer rounded-full px-7 text-body font-medium transition-colors ${billingCycle === cycle ? "bg-[#002d0e] text-white" : "text-[#526052] hover:bg-[#edf5eb]"}`}>
                {cycle === "monthly" ? "Monthly" : "Annual"}
              </button>
            ))}
          </div>
          <span aria-live="polite" className="text-meta font-medium text-[#007d21]">Request a {billingCycle === "annual" ? "yearly" : "monthly"} quote</span>
        </div>
        <p className="mt-6 max-w-[560px] text-sm text-[#637060]">Your billing preference is included when you request a quote. No rates or annual discounts have been confirmed.</p>
        </div>
        <div data-scroll-reveal className="h-[260px] overflow-hidden rounded-2xl sm:h-[340px] lg:h-[380px]"><BusinessPhoto image={imagery.finance} priority /></div>
      </div>
    </section>
  );
}
