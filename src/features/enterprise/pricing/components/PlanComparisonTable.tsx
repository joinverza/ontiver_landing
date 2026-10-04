import { Fragment } from "react";
import { comparisonGroups, formatUsd, monthlyPrice, type BillingCycle, type PricingCatalog } from "../data/pricing";
import FeatureValue from "./FeatureValue";

type Props = { catalog: PricingCatalog; billingCycle: BillingCycle };

const PlanComparisonTable = ({ catalog, billingCycle }: Props) => {
  const groups = comparisonGroups(catalog);
  const highlightIndex = catalog.plans.findIndex((plan) => plan.recommended);

  return (
    <section id="plan-comparison" className="section-space scroll-mt-24 bg-white">
      <div className="site-container">
        <div data-scroll-reveal className="mb-10 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <p className="eyebrow">The details, side by side</p>
            <h2 className="mt-5 text-section font-normal">Compare every plan.</h2>
          </div>
          <p className="max-w-[380px] text-body text-[#637060]">
            Every plan includes the full dashboard, audit log, SDKs and API documentation. Prices are
            in US dollars and exclude applicable taxes.
          </p>
        </div>
        <div
          className="overflow-x-auto rounded-2xl border border-[#dde6dc]"
          role="region"
          aria-label="Plan comparison"
          tabIndex={0}
          data-lenis-prevent
        >
          <table className="w-full min-w-[960px] border-collapse text-body">
            <caption className="sr-only">Ontiver plans compared by usage, features and service</caption>
            <thead>
              <tr className="bg-[#edf5eb] text-left">
                <th scope="col" className="sticky left-0 z-10 w-[26%] bg-[#edf5eb] px-6 py-6 font-semibold">
                  Plan
                </th>
                {catalog.plans.map((plan, index) => {
                  const price = monthlyPrice(plan, billingCycle);
                  return (
                    <th
                      key={plan.id}
                      scope="col"
                      className={`px-4 py-6 text-center align-bottom ${index === highlightIndex ? "text-[#007d21]" : ""}`}
                    >
                      <span className="block font-semibold">{plan.name}</span>
                      <span className="mt-1 block text-meta font-normal text-[#637060]">
                        {price === null ? "Custom" : price === 0 ? "Free" : `${formatUsd(price)}/mo`}
                      </span>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {groups.map((group) => (
                <Fragment key={group.title}>
                  <tr className="border-t border-[#dde6dc] bg-[#f7f8f5]">
                    <th
                      scope="colgroup"
                      colSpan={catalog.plans.length + 1}
                      className="sticky left-0 px-6 py-3 text-left text-meta font-semibold uppercase tracking-[0.12em] text-[#007d21]"
                    >
                      {group.title}
                    </th>
                  </tr>
                  {group.rows.map((row) => (
                    <tr key={row.label} className="border-t border-[#e8eee4]">
                      <th scope="row" className="sticky left-0 z-10 bg-white px-6 py-4 text-left font-medium">
                        {row.label}
                        {row.hint ? <span className="mt-1 block text-sm font-normal text-[#637060]">{row.hint}</span> : null}
                      </th>
                      {row.values.map((value, index) => (
                        <td
                          key={`${row.label}-${catalog.plans[index].id}`}
                          className={`px-4 py-4 text-center text-[#526052] ${index === highlightIndex ? "bg-[#f6faf3]" : ""}`}
                        >
                          <FeatureValue value={value} />
                        </td>
                      ))}
                    </tr>
                  ))}
                </Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default PlanComparisonTable;
