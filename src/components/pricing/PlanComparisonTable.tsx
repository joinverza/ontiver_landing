import { comparisonRows, pricingPlans } from "../../data/pricing";
import FeatureValue from "./FeatureValue";

export default function PlanComparisonTable() {
  return (
    <section id="plan-comparison" className="section-space scroll-mt-24 bg-white">
      <div className="site-container">
        <div data-scroll-reveal className="mb-10 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div><p className="eyebrow">The details, made simple</p><h2 className="mt-5 text-section font-semibold tracking-[-0.035em]">Compare every plan.</h2></div>
          <p className="max-w-[380px] text-body text-[#637060]">Compare the proposed plan scope. Confirm feature availability, support, and service terms when planning your pilot.</p>
        </div>
        <div className="overflow-x-auto rounded-[24px] border border-[#dde6dc]" role="region" aria-label="Plan comparison" tabIndex={0}>
          <table className="w-full min-w-[850px] border-collapse text-body">
            <caption className="sr-only">Ontiver plan features and included monthly usage</caption>
            <thead><tr className="bg-[#edf5eb] text-left"><th scope="col" className="sticky left-0 z-10 bg-[#edf5eb] px-6 py-6 font-semibold">Feature</th>{pricingPlans.map((plan) => <th key={plan.name} scope="col" className={`px-5 py-6 text-center font-semibold ${plan.highlighted ? "text-[#007d21]" : ""}`}>{plan.name}</th>)}</tr></thead>
            <tbody>{comparisonRows.map(([feature, ...values]) => (
              <tr key={String(feature)} className="border-t border-[#e8eee4]">
                <th scope="row" className="sticky left-0 z-10 bg-white px-6 py-5 text-left font-medium">{feature}</th>
                {values.map((value, index) => <td key={`${feature}-${index}`} className={`px-5 py-5 text-center text-[#637060] ${index === 2 ? "bg-[#f6faf3]" : ""}`}><FeatureValue value={value} /></td>)}
              </tr>
            ))}</tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
