import ActionIcon from "../../../../shared/components/ui/ActionIcon";
import { Check } from "lucide-react";
import {
  annualSavingPercent,
  formatPrice,
  monthlyPrice,
  type BillingCycle,
  type PricingCurrency,
  type PricingPlan,
} from "../data/pricing";

type PricingCardProps = {
  plan: PricingPlan;
  billingCycle: BillingCycle;
  currency: PricingCurrency;
  ctaHref: string;
  external?: boolean;
};

const PricingCard = ({
  plan,
  billingCycle,
  currency,
  ctaHref,
  external = false,
}: PricingCardProps) => {
  const formatUsd = (value: number, cents = false) => formatPrice(value, currency, cents);
  const highlighted = plan.recommended;
  const price = monthlyPrice(plan, billingCycle);
  const saving = annualSavingPercent(plan);
  const muted = highlighted ? "text-white/70" : "text-[#526058]";

  return (
    <article
      data-scroll-reveal
      data-plan={plan.id}
      aria-labelledby={`plan-${plan.id}-name`}
      className={`flex min-w-0 scroll-mt-28 flex-col rounded-2xl border p-5 sm:p-6 ${highlighted ? "border-[#002d0e] bg-[#002d0e] text-white" : "border-[#dce6d9] bg-surface-muted text-[#002d0e]"}`}
    >
      <div className="mb-3 flex min-h-6 items-center justify-between gap-2">
        <h2 id={`plan-${plan.id}-name`} className="text-card-title font-medium leading-tight">
          {plan.name}
        </h2>
        {highlighted ? (
          <span className="whitespace-nowrap rounded-full bg-[#c7edb3] px-2.5 py-1 text-xs font-semibold text-[#002d0e]">
            Popular
          </span>
        ) : plan.id === "sandbox" ? (
          <span className="rounded-full bg-[#edf5eb] px-2.5 py-1 text-xs font-semibold text-accent">
            Free
          </span>
        ) : null}
      </div>
      <p className={`text-body xl:min-h-[7.5rem] ${muted}`}>{plan.tagline}</p>

      <div className="my-5">
        {price === null ? (
          <p className="text-[2.5rem] font-medium leading-none tracking-[-0.04em]">Custom</p>
        ) : (
          <p className="flex items-baseline gap-1.5">
            <span className="text-[2.5rem] font-medium leading-none tracking-[-0.04em]">
              {formatUsd(price)}
            </span>
            <span className={`text-body ${muted}`}>/ month</span>
          </p>
        )}
        <p className={`mt-3 min-h-10 text-meta ${muted}`}>
          {price === null
            ? "Annual contract with volume pricing"
            : price === 0
              ? "No card required. Test data only."
              : billingCycle === "annual"
                ? `Billed ${formatUsd(price * 12)} yearly · save ${saving}%`
                : `Billed monthly · ${formatUsd(plan.overagePerVerification ?? 0, true)} per extra verification`}
        </p>
      </div>

      <a
        href={ctaHref}
        {...(external ? { rel: "noopener" } : {})}
        className={`button-primary mb-6 ${highlighted ? "button-on-dark" : ""}`}
      >
        {plan.cta}
        <ActionIcon size={18} aria-hidden="true" />
      </a>

      <div className={`border-t pt-5 ${highlighted ? "border-white/15" : "border-[#e4eae0]"}`}>
        <p className={`mb-3 text-sm font-medium ${highlighted ? "text-[#b8e5a7]" : "text-accent"}`}>
          {plan.audience}
        </p>
        <ul className="space-y-2.5">
          {plan.highlights.map((line) => (
            <li
              key={line}
              className={`flex gap-2.5 text-body ${highlighted ? "text-white/85" : "text-[#3f4d3f]"}`}
            >
              <Check
                size={17}
                aria-hidden="true"
                className={`mt-[3px] shrink-0 ${highlighted ? "text-[#b8e5a7]" : "text-[#009311]"}`}
              />
              {line}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
};

export default PricingCard;
