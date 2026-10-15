import {
  annualSavingPercent,
  type BillingCycle,
  type PricingCatalog,
  type PricingCurrency,
} from "../data/pricing";
import ContextPhoto from "../../../../shared/components/ui/ContextPhoto";
import { editorialPhotos } from "../../../../shared/data/editorialPhotos";
import SlidingPill from "../../../../shared/components/ui/SlidingPill";

type PricingHeroProps = {
  billingCycle: BillingCycle;
  onBillingChange: (cycle: BillingCycle) => void;
  currency: PricingCurrency;
  onCurrencyChange: (currency: PricingCurrency) => void;
  catalog: PricingCatalog;
};

const PricingHero = ({
  billingCycle,
  onBillingChange,
  currency,
  onCurrencyChange,
  catalog,
}: PricingHeroProps) => {
  const currencies = catalog.currencies ?? [];
  const saving = Math.max(0, ...catalog.plans.map(annualSavingPercent));
  return (
    <section className="page-intro">
      <div className="site-container split-hero-grid">
        <div data-scroll-reveal className="page-hero-content">
          <p className="eyebrow">Pricing</p>
          <h1 className="page-hero-heading text-page-hero font-normal">
            Start free. Pay for verification as you grow.
          </h1>
          <p className="page-hero-description text-subtitle text-[#526052]">
            Build in Sandbox at no cost, then choose a plan with the checks, controls and volume you
            need. Every plan comes with the full dashboard, API and SDKs.
          </p>
          <div className="page-hero-actions items-center">
            <SlidingPill
              label="Billing cycle"
              value={billingCycle}
              onChange={onBillingChange}
              options={[
                { value: "monthly", label: "Monthly" },
                { value: "annual", label: "Annual" },
              ]}
            />
            {currencies.length > 1 ? (
              <SlidingPill
                label="Currency"
                value={currency}
                onChange={onCurrencyChange}
                options={currencies.map((value) => ({
                  value,
                  label: value === "NGN" ? "₦ NGN" : "$ USD",
                }))}
              />
            ) : null}
            {saving ? (
              <span aria-live="polite" className="text-meta font-medium text-accent">
                {billingCycle === "annual"
                  ? `You're saving ${saving}%`
                  : `Save ${saving}% with annual billing`}
              </span>
            ) : null}
          </div>
          <div className="mt-8 border-t border-[#cbd5c7] pt-6">
            <h2 className="text-card-title font-medium">Your dashboard matches your plan.</h2>
            <p className="mt-2 text-body text-[#526058]">
              The features and allowances on this page are the ones switched on in your workspace,
              with usage shown live on your billing page.
            </p>
          </div>
        </div>
        <div data-scroll-reveal className="page-hero-media">
          <ContextPhoto
            image={editorialPhotos.pricing}
            priority
            sizes="(min-width: 2400px) 1150px, (min-width: 1024px) 47vw, 100vw"
          />
        </div>
      </div>
    </section>
  );
};

export default PricingHero;
