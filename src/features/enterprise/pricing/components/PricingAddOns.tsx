import { formatUsd, type PricingCatalog } from "../data/pricing";

const planNames = (catalog: PricingCatalog, ids: string[]) =>
  ids.map((id) => catalog.plans.find((plan) => plan.id === id)?.name ?? id).join(", ");

/** Optional extras, with the plans they can be added to. */
const PricingAddOns = ({ catalog }: { catalog: PricingCatalog }) => (
  <section aria-labelledby="pricing-addons" className="section-space bg-[#f7f8f5]">
    <div className="site-container">
      <div data-scroll-reveal className="mb-10 max-w-[760px]">
        <p className="eyebrow">Add-ons</p>
        <h2 id="pricing-addons" className="mt-5 text-section font-normal">
          Add screening when you need it.
        </h2>
        <p className="mt-5 text-body text-[#526052]">
          Growth and Compliance include AML screening, and Compliance adds ongoing monitoring. On
          Launch, both are available as monthly add-ons.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {catalog.addons.map((addon) => (
          <article key={addon.id} data-scroll-reveal className="rounded-2xl border border-[#dce6d9] bg-white p-6">
            <h3 className="text-card-title font-medium">{addon.name}</h3>
            <p className="mt-2 text-[1.5rem] font-medium tracking-[-0.02em]">
              {addon.monthly === null ? "Priced in contract" : `${formatUsd(addon.monthly)}/month`}
            </p>
            <p className="mt-4 text-body text-[#526052]">{addon.summary}</p>
            <dl className="mt-5 space-y-2 border-t border-[#e4eae0] pt-4 text-meta text-[#637060]">
              {addon.includedScreens ? (
                <div className="flex justify-between gap-4">
                  <dt>Screens included</dt>
                  <dd className="font-medium text-[#002d0e]">{addon.includedScreens.toLocaleString("en-US")}</dd>
                </div>
              ) : null}
              {addon.screenOverage ? (
                <div className="flex justify-between gap-4">
                  <dt>Each additional screen</dt>
                  <dd className="font-medium text-[#002d0e]">{formatUsd(addon.screenOverage, true)}</dd>
                </div>
              ) : null}
              {addon.includedProfiles ? (
                <div className="flex justify-between gap-4">
                  <dt>Monitored profiles included</dt>
                  <dd className="font-medium text-[#002d0e]">{addon.includedProfiles.toLocaleString("en-US")}</dd>
                </div>
              ) : null}
              {addon.profileOverage ? (
                <div className="flex justify-between gap-4">
                  <dt>Each additional profile</dt>
                  <dd className="font-medium text-[#002d0e]">{formatUsd(addon.profileOverage, true)}/month</dd>
                </div>
              ) : null}
              <div className="flex justify-between gap-4">
                <dt>Available on</dt>
                <dd className="font-medium text-[#002d0e]">{planNames(catalog, addon.availableOn)}</dd>
              </div>
            </dl>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default PricingAddOns;
