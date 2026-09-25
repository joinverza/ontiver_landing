import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PricingFAQ from "../components/faq";
import PlanComparisonTable from "../components/pricing/PlanComparisonTable";
import PricingCard from "../components/pricing/PricingCard";
import PricingHero from "../components/pricing/PricingHero";
import Calculator from "../components/sections/Calculator/Calculator";
import CurtainFooter from "../components/sections/CurtainFooter/CurtainFooter";
import PlanSection from "../components/sections/Plan/Plan";
import { pricingPlans, type BillingCycle } from "../data/pricing";
import { scrollPageTo } from "../lib/scrollNavigation";
import { getPricingInquiryUrl } from "../lib/pricing";

export default function PricingPage() {
  const navigate = useNavigate();
  const [billingCycle, setBillingCycle] = useState<BillingCycle>("monthly");

  const scrollTo = (id: string) => {
    scrollPageTo(document.getElementById(id));
  };

  const handlePlanAction = (planName: string) => {
    navigate(getPricingInquiryUrl(planName, billingCycle));
  };

  return (
    <main className="bg-white text-[#002d0e]">
      <PricingHero billingCycle={billingCycle} onBillingChange={setBillingCycle} />
      <section id="pricing-plans" aria-label="Pricing plans" className="scroll-mt-28 bg-white pb-10 pt-4 lg:pb-14">
        <div className="site-container grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {pricingPlans.map((plan) => (
            <PricingCard key={plan.name} plan={plan} billingCycle={billingCycle} onPlanAction={() => handlePlanAction(plan.name)} />
          ))}
        </div>
      </section>
      <PlanComparisonTable />
      <PlanSection billingCycle={billingCycle} onViewPlan={() => scrollTo("pricing-plans")} onComparePlans={() => scrollTo("plan-comparison")} />
      <Calculator billingCycle={billingCycle} />
      <PricingFAQ />
      <CurtainFooter audience="enterprise" />
    </main>
  );
}
