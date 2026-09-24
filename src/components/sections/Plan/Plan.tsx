import { useId, useState } from "react";
import { ArrowUpRight, RotateCcw } from "lucide-react";
import { planInitialToggles, planInitialValues, planInputFields, planToggleItems, type PlanFieldKey, type PlanToggleKey } from "../../../data/plan";
import PlanOrbitPanel from "../../plan/PlanOrbitPanel";
import PlanToggle from "../../plan/PlanToggle";
import { scrollPageTo } from "../../../lib/scrollNavigation";

type PlanProps = { onViewPlan?: () => void; onComparePlans?: () => void };
type Recommendation = { plan: string; reason: string };

export default function Plan({ onViewPlan, onComparePlans }: PlanProps) {
  const id = useId();
  const [values, setValues] = useState<Record<PlanFieldKey, string>>(planInitialValues);
  const [toggles, setToggles] = useState<Record<PlanToggleKey, boolean>>(planInitialToggles);
  const [recommendation, setRecommendation] = useState<Recommendation | null>(null);

  const checkBestPlan = () => {
    const verifications = Number(values.verifications) || 0;
    const aml = Number(values.amlScreens) || 0;
    const api = Number(values.apiRequests) || 0;
    if (toggles.testingOnly && verifications === 0 && aml === 0 && api === 0) {
      setRecommendation({ plan: "Sandbox", reason: "Best fit for integration testing before production volume." });
    } else if (toggles.sla || verifications > 3000 || api > 100000) {
      setRecommendation({ plan: "Enterprise", reason: "Best fit for custom volume, SLAs, and dedicated onboarding." });
    } else if (toggles.auditLogs || toggles.amlMonitoring || aml > 500 || verifications > 1000) {
      setRecommendation({ plan: "Compliance", reason: "Best fit for audit-ready workflows and risk coverage." });
    } else if (verifications > 500 || aml > 0 || api > 5000) {
      setRecommendation({ plan: "Growth", reason: "Best fit for your verification volume and AML requirements." });
    } else {
      setRecommendation({ plan: "Launch", reason: "Best fit for early production pilots and small compliance teams." });
    }
  };

  const viewPlan = () => {
    const card = recommendation ? document.querySelector<HTMLElement>(`[data-plan="${recommendation.plan.toLowerCase()}"]`) : null;
    if (card) scrollPageTo(card);
    else onViewPlan?.();
  };

  return (
    <section className="section-space bg-[#edf5eb] text-[#002d0e]">
      <div className="site-container">
        <div data-scroll-reveal className="mb-12 max-w-[680px]"><p className="eyebrow">Find your ideal plan</p><h2 className="mt-5 text-section font-semibold tracking-[-0.035em]">A plan that fits the way you grow.</h2></div>
        <div className="grid gap-6 lg:grid-cols-2">
          <form className="rounded-[28px] border border-[#dde6dc] bg-white p-6 sm:p-9" onSubmit={(event) => { event.preventDefault(); checkBestPlan(); }}>
            <h3 className="text-card-title font-semibold">Plan recommendation tool</h3>
            <div className="mt-8 space-y-5">
              {planInputFields.map((field) => (
                <div key={field.key}>
                  <label htmlFor={`${id}-${field.key}`} className="block text-body font-medium text-[#526052]">{field.label}</label>
                  <input id={`${id}-${field.key}`} type="number" min="0" step="1" inputMode="numeric" value={values[field.key]} placeholder={field.placeholder} onChange={(event) => { setValues((current) => ({ ...current, [field.key]: event.target.value.replace(/[^\d]/g, "") })); setRecommendation(null); }} className="mt-2 h-13 w-full rounded-xl border border-[#dce5d8] bg-[#fbfcfa] px-4 text-body outline-none placeholder:text-[#8a9485] focus:border-[#009311] focus:ring-2 focus:ring-[#009311]/10" />
                </div>
              ))}
            </div>
            <div className="mt-7 divide-y divide-[#e6ece2] border-y border-[#e6ece2] py-2">
              {planToggleItems.map((item) => <PlanToggle key={item.key} label={item.label} checked={toggles[item.key]} onChange={() => { setToggles((current) => ({ ...current, [item.key]: !current[item.key] })); setRecommendation(null); }} />)}
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row"><button type="submit" className="button-primary grow">Check best plan<ArrowUpRight size={18} /></button><button type="button" className="button-secondary" onClick={() => { setValues(planInitialValues); setToggles(planInitialToggles); setRecommendation(null); }}><RotateCcw size={16} />Clear</button></div>
          </form>
          <PlanOrbitPanel recommendation={recommendation} onViewPlan={viewPlan} onComparePlans={onComparePlans ?? (() => scrollPageTo(document.getElementById("plan-comparison")))} />
        </div>
      </div>
    </section>
  );
}
