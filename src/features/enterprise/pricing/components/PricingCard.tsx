import ActionIcon from "../../../../shared/components/ui/ActionIcon";
import { Check } from "../../../../shared/components/ui/icons";
import { isPriceLine, type PricingPlan } from "../data/pricing";
import "./pricing-card.css";

type PricingCardProps = {
  plan: PricingPlan;
  ctaHref: string;
  external?: boolean;
};

/** A plan and what it includes. Only Sandbox shows a price (free); paid plans are quoted by sales. */
const PricingCard = ({ plan, ctaHref, external = false }: PricingCardProps) => {
  const highlighted = plan.recommended;
  const free = plan.id === "sandbox";
  const muted = highlighted ? "text-white/70" : "text-[#526058]";

  return (
    <article
      data-scroll-reveal
      data-plan={plan.id}
      aria-labelledby={`plan-${plan.id}-name`}
      className={`pricing-card flex min-w-0 scroll-mt-28 flex-col rounded-2xl border p-5 sm:p-6 ${highlighted ? "border-[#002d0e] bg-[#002d0e] text-white" : "border-[#dce6d9] bg-surface-muted text-[#002d0e]"}`}
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
      <p className={`pricing-card-copy xl:min-h-24 ${muted}`}>{plan.tagline}</p>

      <div className="my-5">
        <p className="pricing-card-price font-medium leading-none tracking-[-0.04em]">
          {free ? "Free" : "Contact sales"}
        </p>
        <p className={`mt-3 min-h-10 text-[0.8125rem] leading-relaxed ${muted}`}>
          {free
            ? "No card required. Test data only."
            : plan.requiresContact
              ? "Annual contract with volume pricing"
              : "Pricing for your volume, monthly or yearly"}
        </p>
      </div>

      <a
        href={ctaHref}
        {...(external ? { rel: "noopener" } : {})}
        className={`button-primary mb-6 ${highlighted ? "button-on-dark" : ""}`}
      >
        {free ? plan.cta : "Contact sales"}
        <ActionIcon size={18} aria-hidden="true" />
      </a>

      <div className={`border-t pt-5 ${highlighted ? "border-white/15" : "border-[#e4eae0]"}`}>
        <p
          className={`mb-3 text-[0.875rem] font-medium leading-relaxed ${highlighted ? "text-[#b8e5a7]" : "text-accent"}`}
        >
          {plan.audience}
        </p>
        <ul className="space-y-2.5">
          {plan.highlights
            .filter((line) => !isPriceLine(line))
            .map((line) => (
              <li
                key={line}
                className={`pricing-card-copy flex gap-2.5 ${highlighted ? "text-white/85" : "text-[#3f4d3f]"}`}
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
