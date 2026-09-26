import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PricingFAQ from "../../../../shared/components/FAQ";
import PlanComparisonTable from "../components/PlanComparisonTable";
import PricingCard from "../components/PricingCard";
import PricingHero from "../components/PricingHero";
import Calculator from "../components/Calculator";
import PageFooter from "../../../../shared/components/layout/PageFooter";
import PlanSection from "../components/Plan";
import { pricingPlans, type BillingCycle } from "../data/pricing";
import { scrollPageTo } from "../../../../shared/lib/scrollNavigation";
import { getPricingInquiryUrl } from "../lib/pricing";

const PricingPage = () => {
  const navigate = useNavigate();
  const [billingCycle, setBillingCycle] = useState<BillingCycle>("monthly");

  const scrollTo = (id: string) => {
    scrollPageTo(document.getElementById(id));
  };

  const handlePlanAction = (planName: string) => {
    navigate(getPricingInquiryUrl(planName, billingCycle));
  };

  return (
    <main id="main-content" tabIndex={-1} className="bg-white text-[#002d0e]">
      <PricingHero billingCycle={billingCycle} onBillingChange={setBillingCycle} />
      <section
        id="pricing-plans"
        aria-label="Pricing plans"
        className="scroll-mt-28 bg-white pb-10 pt-4 lg:pb-14"
      >
        <div className="site-container grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {pricingPlans.map((plan) => (
            <PricingCard
              key={plan.name}
              plan={plan}
              billingCycle={billingCycle}
              onPlanAction={() => handlePlanAction(plan.name)}
            />
          ))}
        </div>
      </section>
      <PlanComparisonTable />
      <PlanSection
        billingCycle={billingCycle}
        onViewPlan={() => scrollTo("pricing-plans")}
        onComparePlans={() => scrollTo("plan-comparison")}
      />
      <Calculator billingCycle={billingCycle} />
      <PricingFAQ />
      <PageFooter audience="enterprise" />
    </main>
  );
};

export default PricingPage;
