import { comparisonRows, pricingPlans } from "../../data/pricing";
import Text from "../base/Text";
import FeatureValue from "./FeatureValue";

export default function PlanComparisonTable({
  tableRef,
}: {
  tableRef: React.RefObject<HTMLDivElement | null>;
}) {
  return (
    <section ref={tableRef} className="px-5 py-16 opacity-0 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-[1180px]">
        <Text
          btext="Plan Comparison"
          heading="Compare every plan."
          animate={false}
          containerClassName="pb-8"
          headingClassName="[--heading-color:#06160f]"
          badgeTextClassName="border border-[#009311]/40! bg-[#f1f4ef]! text-[#005e19]!"
        />
        <div className="overflow-x-auto rounded-3xl border border-[#00291b]/15 bg-white">
          <table className="w-full min-w-[900px] border-collapse text-sm">
            <thead>
              <tr className="bg-[#F8FFF8] text-left">
                <th className="sticky left-0 z-10 bg-[#F8FFF8] px-5 py-4 font-semibold">
                  Feature
                </th>
                {pricingPlans.map((plan) => (
                  <th
                    key={plan.name}
                    className="px-5 py-4 text-center font-semibold"
                  >
                    {plan.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map(([feature, ...values], index) => (
                <tr
                  key={String(feature)}
                  data-comparison-row
                  className={index % 2 === 0 ? "bg-white" : "bg-[#FBFFFB]"}
                >
                  <td
                    className={`sticky left-0 z-10 px-5 py-4 font-medium ${
                      index % 2 === 0 ? "bg-white" : "bg-[#FBFFFB]"
                    }`}
                  >
                    {feature}
                  </td>
                  {values.map((value, valueIndex) => (
                    <td
                      key={`${feature}-${valueIndex}`}
                      className="px-5 py-4 text-center text-black/70"
                    >
                      <span
                        data-comparison-check
                        className="inline-flex min-h-4 items-center justify-center"
                      >
                        <FeatureValue value={value} />
                      </span>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
