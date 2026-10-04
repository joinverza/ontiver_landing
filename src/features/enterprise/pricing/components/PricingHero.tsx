import { annualSavingPercent, type BillingCycle, type PricingCatalog } from "../data/pricing";
import ContextPhoto from "../../../../shared/components/ui/ContextPhoto";
import { editorialPhotos } from "../../../../shared/data/editorialPhotos";

type PricingHeroProps = {
  billingCycle: BillingCycle;
  onBillingChange: (cycle: BillingCycle) => void;
  catalog: PricingCatalog;
};

const PricingHero = ({ billingCycle, onBillingChange, catalog }: PricingHeroProps) => {
  const saving = Math.max(0, ...catalog.plans.map(annualSavingPercent));
  return (
    <section className="page-intro">
      <div className="site-container grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
        <div data-scroll-reveal className="min-w-0">
          <p className="eyebrow">Pricing</p>
          <h1 className="mt-6 text-page-hero font-normal">
            Start free. Pay for verification as you grow.
          </h1>
          <p className="mt-6 max-w-[560px] text-subtitle text-[#526052]">
            Build in Sandbox at no cost, then choose a plan with the checks, controls and volume you
            need. Every plan comes with the full dashboard, API and SDKs.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <div
              className="inline-flex rounded-full border border-[#d9e5d6] bg-white p-1"
              role="group"
              aria-label="Billing cycle"
            >
              {(["monthly", "annual"] as const).map((cycle) => (
                <button
                  key={cycle}
                  type="button"
                  aria-pressed={billingCycle === cycle}
                  onClick={() => onBillingChange(cycle)}
                  className={`min-h-11 cursor-pointer rounded-full px-7 text-body font-medium transition-colors ${billingCycle === cycle ? "bg-[#002d0e] text-white" : "text-[#526052] hover:bg-[#edf5eb]"}`}
                >
                  {cycle === "monthly" ? "Monthly" : "Annual"}
                </button>
              ))}
            </div>
            {saving ? (
              <span aria-live="polite" className="text-meta font-medium text-[#007d21]">
                {billingCycle === "annual" ? `You're saving ${saving}%` : `Save ${saving}% with annual billing`}
              </span>
            ) : null}
          </div>
        </div>
        <div data-scroll-reveal className="min-w-0">
          <ContextPhoto image={editorialPhotos.pricing} priority />
          <div className="mt-4 rounded-2xl bg-[#edf5eb] p-5 sm:p-6">
            <h2 className="text-card-title font-medium">Your dashboard matches your plan.</h2>
            <p className="mt-2 text-body text-[#526058]">
              The features and allowances on this page are the ones switched on in your workspace,
              with usage shown live on your billing page.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingHero;
