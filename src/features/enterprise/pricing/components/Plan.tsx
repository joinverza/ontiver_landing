import { useId, useState } from "react";
import { ArrowUpRight, RotateCcw } from "lucide-react";
import {
  planInitialToggles,
  planInitialValues,
  planInputFields,
  planToggleItems,
  type PlanFieldKey,
  type PlanToggleKey,
  type PlanRecommendation,
} from "../data/plan";
import PlanRecommendationPanel from "./PlanRecommendationPanel";
import PlanToggle from "./PlanToggle";
import { scrollPageTo } from "../../../../shared/lib/scrollNavigation";
import type { BillingCycle } from "../data/pricing";
import { getPlanRecommendation } from "../lib/pricing";

type PlanProps = {
  billingCycle?: BillingCycle;
  onViewPlan?: () => void;
  onComparePlans?: () => void;
};

const Plan = ({ billingCycle = "monthly", onViewPlan, onComparePlans }: PlanProps) => {
  const id = useId();
  const [values, setValues] = useState<Record<PlanFieldKey, string>>(planInitialValues);
  const [toggles, setToggles] = useState<Record<PlanToggleKey, boolean>>(planInitialToggles);
  const [recommendation, setRecommendation] = useState<PlanRecommendation | null>(null);

  const checkBestPlan = () => setRecommendation(getPlanRecommendation(values, toggles));

  const viewPlan = () => {
    const card = recommendation?.plan
      ? document.querySelector<HTMLElement>(`[data-plan="${recommendation.plan.toLowerCase()}"]`)
      : null;
    if (card) scrollPageTo(card);
    else onViewPlan?.();
  };

  return (
    <section className="section-space bg-[#f7f8f5] text-[#002d0e]">
      <div className="site-container">
        <div data-scroll-reveal className="mb-12 max-w-[780px]">
          <p className="eyebrow">Explore your plan options</p>
          <h2 className="mt-5 text-section font-normal">A plan that fits the way you grow.</h2>
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          <form
            className="rounded-2xl border border-[#dde6dc] bg-white p-6 sm:p-9"
            onSubmit={(event) => {
              event.preventDefault();
              checkBestPlan();
            }}
          >
            <h3 className="text-card-title font-semibold">Plan guidance tool</h3>
            <div className="mt-8 space-y-5">
              {planInputFields.map((field) => (
                <div key={field.key}>
                  <label
                    htmlFor={`${id}-${field.key}`}
                    className="block text-body font-medium text-[#526052]"
                  >
                    {field.label}
                  </label>
                  <input
                    id={`${id}-${field.key}`}
                    type="number"
                    min="0"
                    step="1"
                    inputMode="numeric"
                    value={values[field.key]}
                    placeholder={field.placeholder}
                    onChange={(event) => {
                      setValues((current) => ({
                        ...current,
                        [field.key]: event.target.value.replace(/[^\d]/g, ""),
                      }));
                      setRecommendation(null);
                    }}
                    className="mt-2 h-13 w-full rounded-xl border border-[#dce5d8] bg-[#fbfcfa] px-4 text-body outline-none placeholder:text-[#8a9485] focus:border-[#009311] focus:ring-2 focus:ring-[#009311]/10"
                  />
                </div>
              ))}
            </div>
            <div className="mt-7 divide-y divide-[#e6ece2] border-y border-[#e6ece2] py-2">
              {planToggleItems.map((item) => (
                <PlanToggle
                  key={item.key}
                  label={item.label}
                  checked={toggles[item.key]}
                  onChange={() => {
                    setToggles((current) => ({ ...current, [item.key]: !current[item.key] }));
                    setRecommendation(null);
                  }}
                />
              ))}
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button type="submit" className="button-primary grow">
                Explore plan fit
                <ArrowUpRight size={18} />
              </button>
              <button
                type="button"
                className="button-secondary"
                onClick={() => {
                  setValues(planInitialValues);
                  setToggles(planInitialToggles);
                  setRecommendation(null);
                }}
              >
                <RotateCcw size={16} />
                Clear
              </button>
            </div>
          </form>
          <PlanRecommendationPanel
            billingCycle={billingCycle}
            monthlyVerifications={values.verifications ? Number(values.verifications) : undefined}
            recommendation={recommendation}
            onViewPlan={viewPlan}
            onComparePlans={
              onComparePlans ?? (() => scrollPageTo(document.getElementById("plan-comparison")))
            }
          />
        </div>
      </div>
    </section>
  );
};

export default Plan;
