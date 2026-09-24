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

export default function PricingPage() {
  const navigate = useNavigate();
  const [billingCycle, setBillingCycle] = useState<BillingCycle>("monthly");

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
      block: "start",
    });
  };

  const handlePlanAction = (planName: string) => {
    if (planName === "Sandbox") {
      window.location.assign("https://docs.ontiver.com/");
      return;
    }
    navigate(`/enterprise/contact?plan=${planName.toLowerCase()}`);
  };

  return (
    <main className="bg-white text-[#002d0e]">
      <PricingHero billingCycle={billingCycle} onBillingChange={setBillingCycle} />
      <section id="pricing-plans" aria-label="Pricing plans" className="scroll-mt-28 bg-[#edf5eb] pb-20 lg:pb-28">
        <div className="site-container grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {pricingPlans.map((plan) => (
            <PricingCard key={plan.name} plan={plan} billingCycle={billingCycle} onPlanAction={() => handlePlanAction(plan.name)} />
          ))}
        </div>
      </section>
      <PlanComparisonTable />
      <PlanSection onViewPlan={() => scrollTo("pricing-plans")} onComparePlans={() => scrollTo("plan-comparison")} />
      <Calculator />
      <PricingFAQ />
      <CurtainFooter audience="enterprise" />
    </main>
  );
}
