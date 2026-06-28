import { Check } from "lucide-react";
import {
  pricingCardTones,
  type BillingCycle,
  type Plan,
} from "../../data/pricing";
import { formatPrice } from "../../lib/pricing";
import MagneticFillButton from "../ui/MagneticFillButton";

type PricingCardProps = {
  plan: Plan;
  index: number;
  billingCycle: BillingCycle;
};

export default function PricingCard({
  plan,
  index,
  billingCycle,
}: PricingCardProps) {
  const price = billingCycle === "annual" ? plan.annual : plan.monthly;
  const isDark = plan.highlighted;

  return (
    <article
      className={`pricing-card relative flex h-full min-w-0 snap-start flex-col rounded-2xl border border-[#00291b]/15 px-6 py-7 opacity-0 sm:px-7 sm:py-8 lg:px-8 lg:py-9 ${
        isDark
          ? "pricing-card-growth border-light-primary/40 bg-[#F8FFF8] pt-8 text-[#00291B] sm:pt-10 lg:mt-3 lg:pt-12"
          : `${pricingCardTones[index]} text-black`
      }`}
      data-card-index={index}
      data-highlighted={isDark ? "true" : "false"}
    >
      {isDark ? (
        <span
          className="growth-ring pointer-events-none absolute inset-0 rounded-lg border border-light-primary/40 opacity-0"
          aria-hidden="true"
        />
      ) : null}

      <div>
        <h2
          className={`text-xl font-bold leading-tight tracking-[0] ${
            isDark
              ? "text-[#00291B]"
              : index === 1
                ? "bg-gradient-to-r from-dark-primary to-light-primary bg-clip-text text-transparent"
                : "text-black"
          }`}
        >
          {plan.name}
        </h2>
        <p className="mt-1.5 text-sm leading-snug text-black/55">
          {plan.description}
        </p>
      </div>

      <div className="mt-6">
        <div className="flex items-baseline gap-1.5">
          <span
            className="pricing-price text-[38px] font-bold leading-none tracking-[0] text-black sm:text-[44px]"
            data-monthly={plan.monthly ?? ""}
            data-annual={plan.annual ?? ""}
            data-custom={plan.monthly === null ? "true" : "false"}
          >
            {formatPrice(price)}
          </span>
          {plan.monthly !== null ? (
            <span className="text-sm font-medium text-black/55">/mo</span>
          ) : null}
        </div>
        <p className="mt-2 text-sm font-medium text-black/45">
          {plan.period}
        </p>
      </div>

      <div className="mb-5 space-y-2">
        {plan.metric ? (
          <div className="pricing-feature flex min-h-7 translate-y-full items-start gap-3 opacity-0">
            <Check className="mt-0.5 size-4 shrink-0 text-[#009311]" />
            <span className="text-xs leading-6 text-black/75">
              <span className="feature-count" data-value={plan.metric.value}>
                0
              </span>
              {plan.metric.suffix}
            </span>
          </div>
        ) : null}
        {plan.features.map((feature) => (
          <div
            key={feature}
            className="pricing-feature flex min-h-7 translate-y-full items-start gap-3 opacity-0"
          >
            <Check className="mt-0.5 size-4 shrink-0 text-[#009311]" />
            <span className="text-xs leading-6 text-black/72">
              {feature}
            </span>
          </div>
        ))}
      </div>

      <MagneticFillButton
        variant={isDark ? "green" : "light"}
        className="pricing-cta mt-7 h-12 w-full rounded-lg px-5 text-sm font-semibold"
      >
        <span className="pricing-cta-text">{plan.cta}</span>
      </MagneticFillButton>
    </article>
  );
}
