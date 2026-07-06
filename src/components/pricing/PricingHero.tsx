import type { RefObject } from "react";
import type { BillingCycle } from "../../data/pricing";
import AuroraBadge from "../ui/AuroraBadge";

type PricingHeroProps = {
  billingCycle: BillingCycle;
  saveBadgeRef: RefObject<HTMLSpanElement | null>;
  onBillingChange: (cycle: BillingCycle) => void;
};

export default function PricingHero({
  billingCycle,
  saveBadgeRef,
  onBillingChange,
}: PricingHeroProps) {
  return (
    <section className="relative overflow-hidden bg-[#f1f4ef] px-5 pb-14 pt-[120px] text-center sm:px-6 sm:pb-16 sm:pt-[150px]">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03] animate-grid-move [background-image:linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] [background-size:100px_100px]"
        aria-hidden="true"
      />
      <div className="relative z-10">
        <AuroraBadge spanClassName="text-[13px]!">
          Identity Infrastructure That Pays for Itself
        </AuroraBadge>
        <h1 className="mx-auto mt-7 max-w-[980px] text-balance text-[clamp(2.35rem,10vw,5rem)] font-bold leading-[1.05] tracking-tight text-black sm:mt-8">
          Pay for <span className="text-[#007D21]">Trust.</span> Not Repeated
          Verification.
        </h1>
        <p className="mx-auto mt-5 max-w-[680px] text-base leading-relaxed text-black sm:mt-6 sm:text-lg">
          Simple, transparent pricing that scales with your verification volume.
          No hidden fees. No re-verification costs.
        </p>

        <div className="mt-9 flex justify-center">
          <div className="relative inline-grid h-12 grid-cols-2 items-center rounded-full bg-white p-1 [box-shadow:0_0_0_1px_rgba(0,147,17,0.16)]">
            <span
              className={`absolute bottom-1 left-1 top-1 w-[calc(50%-4px)] rounded-full bg-gradient-to-r from-dark-primary to-light-primary transition-transform duration-300 ease-out ${
                billingCycle === "annual" ? "translate-x-full" : "translate-x-0"
              }`}
            />
            <button
              className={`relative z-10 h-10 cursor-pointer rounded-full px-7 text-base font-semibold transition-colors duration-200 ${
                billingCycle === "monthly"
                  ? "text-white"
                  : "text-black hover:text-[#009311]"
              }`}
              type="button"
              onClick={() => onBillingChange("monthly")}
            >
              Monthly
            </button>
            <button
              className={`relative z-10 h-10 cursor-pointer rounded-full px-7 text-base font-semibold transition-colors duration-200 ${
                billingCycle === "annual"
                  ? "text-white"
                  : "text-black hover:text-[#009311]"
              }`}
              type="button"
              onClick={() => onBillingChange("annual")}
            >
              Annual
            </button>
            <div
              className="pointer-events-none absolute left-full top-3 hidden translate-x-6 sm:block"
              aria-hidden="true"
            >
              <svg className="h-10 w-16 text-[#009311]" viewBox="0 0 68 42" fill="none">
                <path
                  d="M52 34C47 16 29 6 9 10"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeDasharray="4 4"
                />
                <path
                  d="M14 5L8 10.5L15 15"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <span
              ref={saveBadgeRef}
              className={`absolute left-1/2 top-[58px] inline-flex -translate-x-1/2 translate-y-3 rotate-[-4deg] animate-[pricing-save-float_2.8s_ease-in-out_infinite] rounded-md bg-gradient-to-r from-dark-primary to-light-primary px-2.5 py-1 text-center text-xs font-semibold leading-tight text-white transition-opacity duration-200 sm:left-full sm:translate-x-12 sm:translate-y-0 ${
                billingCycle === "annual" ? "opacity-100" : "opacity-75"
              }`}
            >
              Save
              <br />
              $$$
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
