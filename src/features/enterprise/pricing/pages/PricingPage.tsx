import { useState } from "react";
import PricingFAQ from "../../../../shared/components/FAQ";
import PlanComparisonTable from "../components/PlanComparisonTable";
import PricingCard from "../components/PricingCard";
import PricingHero from "../components/PricingHero";
import PricingAddOns from "../components/PricingAddOns";
import Calculator from "../components/Calculator";
import PageFooter from "../../../../shared/components/layout/PageFooter";
import PlanSection from "../components/Plan";
import type { BillingCycle } from "../data/pricing";
import { usePricingCatalog } from "../hooks/usePricingCatalog";
import { scrollPageTo } from "../../../../shared/lib/scrollNavigation";
import { planCtaHref } from "../lib/pricing";

const PricingPage = () => {
  const [billingCycle, setBillingCycle] = useState<BillingCycle>("monthly");
  const catalog = usePricingCatalog();

  const scrollTo = (id: string) => {
    scrollPageTo(document.getElementById(id));
  };

  return (
    <main id="main-content" tabIndex={-1} className="bg-white text-[#002d0e]">
      <PricingHero billingCycle={billingCycle} onBillingChange={setBillingCycle} catalog={catalog} />
      <section id="pricing-plans" aria-label="Pricing plans" className="section-space scroll-mt-28 bg-white">
        <div className="site-container grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {catalog.plans.map((plan) => (
            <PricingCard
              key={plan.id}
              plan={plan}
              billingCycle={billingCycle}
              ctaHref={planCtaHref(plan, billingCycle)}
              external={plan.id === "sandbox"}
            />
          ))}
        </div>
        <p className="site-container mt-6 text-sm text-[#637060]">
          Prices in US dollars, excluding applicable taxes. Paid plans include production API keys and
          bill extra verifications at the rate shown; unused allowance does not roll over.
        </p>
      </section>
      <PlanComparisonTable catalog={catalog} billingCycle={billingCycle} />
      <PricingAddOns catalog={catalog} />
      <PlanSection
        catalog={catalog}
        billingCycle={billingCycle}
        onViewPlan={() => scrollTo("pricing-plans")}
        onComparePlans={() => scrollTo("plan-comparison")}
      />
      <Calculator billingCycle={billingCycle} catalog={catalog} />
      <PricingFAQ />
      <PageFooter audience="enterprise" />
    </main>
  );
};

export default PricingPage;
