import PricingFAQ from "../../../../shared/components/FAQ";
import PlanComparisonTable from "../components/PlanComparisonTable";
import PricingCard from "../components/PricingCard";
import PricingHero from "../components/PricingHero";
import PricingAddOns from "../components/PricingAddOns";
import PageFooter from "../../../../shared/components/layout/PageFooter";
import PlanSection from "../components/Plan";
import { usePricingCatalog } from "../hooks/usePricingCatalog";
import { scrollPageTo } from "../../../../shared/lib/scrollNavigation";
import { planCtaHref } from "../lib/pricing";

/** Plans and what they include. Only Sandbox shows a price (free); paid plans are quoted by sales. */
const PricingPage = () => {
  const catalog = usePricingCatalog();

  const scrollTo = (id: string) => {
    scrollPageTo(document.getElementById(id));
  };

  return (
    <main id="main-content" tabIndex={-1} className="bg-surface text-[#002d0e]">
      <PricingHero />
      <section
        id="pricing-plans"
        aria-label="Pricing plans"
        className="section-space scroll-mt-28 bg-surface"
      >
        <div className="site-container grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {catalog.plans.map((plan) => (
            <PricingCard
              key={plan.id}
              plan={plan}
              ctaHref={planCtaHref(plan)}
              external={plan.id === "sandbox"}
            />
          ))}
        </div>
        <p className="site-container mt-6 text-sm text-[#526058]">
          Paid plans include production API keys, live checks and a monthly verification allowance.
          Contact sales for pricing in naira or US dollars, on monthly or annual billing.
        </p>
      </section>
      <PlanComparisonTable catalog={catalog} />
      <PricingAddOns catalog={catalog} />
      <PlanSection
        catalog={catalog}
        onViewPlan={() => scrollTo("pricing-plans")}
        onComparePlans={() => scrollTo("plan-comparison")}
      />
      <PricingFAQ />
      <PageFooter audience="enterprise" />
    </main>
  );
};

export default PricingPage;
