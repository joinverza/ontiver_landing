import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Check, Minus } from "lucide-react";
import Text from "../components/base/Text";
import PricingFAQ from "../components/faq";
import AuroraBadge from "../components/ui/AuroraBadge";
import MagneticFillButton from "../components/ui/MagneticFillButton";
import Calculator from "../section/Calculator";
import Footer from "../section/Footer";
import PlanSection from "../section/Plan";

gsap.registerPlugin(ScrollTrigger);

type BillingCycle = "monthly" | "annual";

type Plan = {
  name: string;
  monthly: number | null;
  annual: number | null;
  period: string;
  description: string;
  cta: string;
  features: string[];
  metric?: { value: number; suffix: string };
  highlighted?: boolean;
};

const plans: Plan[] = [
  {
    name: "Sandbox",
    monthly: 0,
    annual: 0,
    period: "forever",
    description: "Teams testing API flows before production.",
    cta: "Start Sandbox",
    metric: { value: 100, suffix: " test verifications" },
    features: ["Test environment", "Sandbox keys", "Sample responses", "API docs", "No production checks"],
  },
  {
    name: "Launch",
    monthly: 199,
    annual: 159,
    period: "per month",
    description: "Early production pilots and small compliance teams.",
    cta: "Start Launch",
    metric: { value: 500, suffix: " verifications" },
    features: ["500 verifications", "5,000 API requests", "Optional AML add-on", "Basic dashboard", "Email support"],
  },
  {
    name: "Growth",
    monthly: 499,
    annual: 399,
    period: "per month",
    description: "Growing teams that need reusable verification at scale.",
    cta: "Choose Growth",
    metric: { value: 1000, suffix: " verifications" },
    highlighted: true,
    features: ["1,000 verifications", "50,000 API requests", "250 AML screens", "Reusable credentials", "Priority email support"],
  },
  {
    name: "Compliance",
    monthly: 999,
    annual: 799,
    period: "per month",
    description: "Regulated teams needing proof, audit, and risk coverage.",
    cta: "Choose Compliance",
    metric: { value: 3000, suffix: " verifications" },
    features: ["3,000 verifications", "100,000 API requests", "500 AML screens", "1,000 monitoring profiles", "Audit exports"],
  },
  {
    name: "Enterprise",
    monthly: null,
    annual: null,
    period: "custom pricing",
    description: "High-volume teams with custom workflows, SLAs, and reviews.",
    cta: "Contact Sales",
    metric: { value: 10000, suffix: "+ verifications" },
    features: ["Custom volume", "Dedicated onboarding", "Security review", "SLA", "Account manager"],
  },
];

const comparisonRows = [
  ["Verification volume", "100 test", "500", "1,000", "3,000", "Custom"],
  ["API requests", "Sandbox", "5,000", "50,000", "100,000", "Custom"],
  ["Reusable credentials", false, false, true, true, true],
  ["AML screening", false, "Add-on", "250", "500", "Custom"],
  ["Monitoring profiles", false, false, false, "1,000", "Custom"],
  ["Dashboard access", true, true, true, true, true],
  ["Audit logs", false, false, true, true, true],
  ["Compliance export", false, false, false, true, true],
  ["Support", "Docs", "Email", "Priority email", "Priority", "Dedicated"],
  ["SLA", false, false, false, false, true],
];

const pricingCardTones = ["bg-[#FDFFFD]", "bg-[#FBFFFB]", "bg-[#F8FFF8]", "bg-[#F5FFF5]", "bg-[#FDFFFD]"];

function formatPrice(value: number | null) {
  if (value === null) return "Custom";
  if (value === 0) return "$0";
  return `$${Math.round(value).toLocaleString()}`;
}

function PricingCard({
  plan,
  index,
  billingCycle,
}: {
  plan: Plan;
  index: number;
  billingCycle: BillingCycle;
}) {
  const price = billingCycle === "annual" ? plan.annual : plan.monthly;
  const isDark = plan.highlighted;

  return (
    <article
      className={`pricing-card relative flex h-full min-w-0 snap-start flex-col rounded-2xl border border-[#00291b]/15 px-7 py-8 opacity-0 lg:px-8 lg:py-9 ${isDark
          ? "pricing-card-growth border-light-primary/40 bg-[#F8FFF8] pt-10 text-[#00291B] lg:mt-3 lg:pt-12"
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
          className={`text-xl font-bold leading-tight tracking-[0] ${isDark ? "text-[#00291B]" : index === 1 ? "bg-gradient-to-r from-dark-primary to-light-primary bg-clip-text text-transparent" : "text-black"
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
            className="pricing-price text-[44px] font-bold leading-none tracking-[0] text-black"
            data-monthly={plan.monthly ?? ""}
            data-annual={plan.annual ?? ""}
            data-custom={plan.monthly === null ? "true" : "false"}
          >
            {formatPrice(price)}
          </span>
          {plan.monthly !== null ? (
            <span className="text-sm font-medium text-black/55">
              /mo
            </span>
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
              <span className="feature-count" data-value={plan.metric.value}>0</span>
              {plan.metric.suffix}
            </span>
          </div>
        ) : null}
        {plan.features.map((feature) => (
          <div key={feature} className="pricing-feature flex min-h-7 translate-y-full items-start gap-3 opacity-0">
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

function FeatureValue({ value }: { value: string | boolean }) {
  if (value === true) {
    return <Check className="mx-auto size-4 text-light-primary" />;
  }

  if (value === false) {
    return <Minus className="mx-auto size-4 text-black/25" />;
  }

  return <span>{value}</span>;
}

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<BillingCycle>("monthly");
  const pageRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const tableRef = useRef<HTMLDivElement>(null);
  const saveBadgeRef = useRef<HTMLSpanElement>(null);

  const setBilling = (next: BillingCycle) => {
    if (next === billingCycle) return;
    const root = pageRef.current;
    if (!root) {
      setBillingCycle(next);
      return;
    }

    root.querySelectorAll<HTMLElement>(".pricing-price").forEach((priceEl) => {
      if (priceEl.dataset.custom === "true") return;

      const from = Number(priceEl.textContent?.replace(/[$,]/g, "") || 0);
      const to = Number(next === "annual" ? priceEl.dataset.annual : priceEl.dataset.monthly);
      const counter = { val: from };

      gsap.to(counter, {
        val: to,
        duration: 0.6,
        ease: "power2.out",
        onUpdate: () => {
          priceEl.textContent = formatPrice(counter.val);
        },
      });
    });

    if (next === "annual" && saveBadgeRef.current) {
      gsap.fromTo(
        saveBadgeRef.current,
        { scale: 0.82, opacity: 0.5 },
        { scale: 1, opacity: 1, duration: 0.28, ease: "back.out(2)" }
      );
    }

    setBillingCycle(next);
  };

  useGSAP(
    () => {
      const cardsRoot = cardsRef.current;
      const table = tableRef.current;
      if (!cardsRoot || !table) return;

      const cards = gsap.utils.toArray<HTMLElement>(".pricing-card");
      const growthCard = cards.find((card) => card.dataset.highlighted === "true");
      const orderedCards = [...cards.filter((card) => card !== growthCard), growthCard].filter(Boolean) as HTMLElement[];
      const priceEls = gsap.utils.toArray<HTMLElement>(".pricing-price");
      const hoverCleanups: Array<() => void> = [];

      gsap.set(cards, { opacity: 0, y: 40, scale: 0.96 });
      gsap.set(".pricing-feature", { opacity: 0, yPercent: 100 });

      const cardTl = gsap.timeline({
        scrollTrigger: {
          trigger: cardsRoot,
          start: "top 75%",
          once: true,
        },
      });

      cardTl.to(orderedCards, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        ease: "power3.out",
        stagger: 0.1,
      });

      if (growthCard) {
        cardTl.fromTo(
          growthCard.querySelector(".growth-ring"),
          { scale: 1, opacity: 0.5 },
          { scale: 1.04, opacity: 0, duration: 0.8, ease: "power2.out" },
          ">-0.1"
        );
      }

      cards.forEach((card) => {
        cardTl.to(
          card.querySelectorAll(".pricing-feature"),
          {
            opacity: 1,
            yPercent: 0,
            duration: 0.35,
            stagger: 0.03,
            ease: "power2.out",
          },
          "<0.2"
        );

        card.querySelectorAll<HTMLElement>(".feature-count").forEach((el) => {
          const target = Number(el.dataset.value || 0);
          const counter = { val: 0 };
          cardTl.to(
            counter,
            {
              val: target,
              duration: 1.2,
              ease: "power2.out",
              onUpdate: () => {
                el.textContent = Math.round(counter.val).toLocaleString();
              },
            },
            "<"
          );
        });
      });

      const priceBreathing = gsap.to(priceEls, {
        opacity: 0.85,
        duration: 2,
        repeat: -1,
        yoyo: true,
        stagger: 0.8,
        ease: "sine.inOut",
      });

      cards.forEach((card) => {
        const isGrowth = card.dataset.highlighted === "true";
        const ctaText = card.querySelector(".pricing-cta-text");
        const price = card.querySelector(".pricing-price");

        const onEnter = () => {
          gsap.to(card, {
            y: -8,
            borderColor: isGrowth ? "rgba(0,147,17,0.45)" : "rgba(0,147,17,0.3)",
            boxShadow: isGrowth ? "0 0 0 1.5px rgba(0,147,17,0.32)" : "none",
            duration: 0.3,
            ease: "power2.out",
          });
          gsap.to(price, { opacity: 1, duration: 0.12, overwrite: "auto" });
          gsap.to(ctaText, { x: 2, duration: 0.15, ease: "power2.out" });
        };

        const onLeave = () => {
          gsap.to(card, {
            y: 0,
            borderColor: isGrowth ? "rgba(0,147,17,0.4)" : "rgba(0,41,27,0.15)",
            boxShadow: "none",
            duration: 0.3,
            ease: "power2.out",
          });
          gsap.to(ctaText, { x: 0, duration: 0.15, ease: "power2.out" });
        };

        card.addEventListener("mouseenter", onEnter);
        card.addEventListener("mouseleave", onLeave);
        hoverCleanups.push(() => {
          card.removeEventListener("mouseenter", onEnter);
          card.removeEventListener("mouseleave", onLeave);
        });
      });

      gsap.fromTo(
        table,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.5,
          scrollTrigger: {
            trigger: table,
            start: "top 82%",
            once: true,
          },
        }
      );

      table.querySelectorAll<HTMLElement>("[data-comparison-row]").forEach((row) => {
        gsap.fromTo(
          row,
          { opacity: 0, x: -12 },
          {
            opacity: 1,
            x: 0,
            duration: 0.4,
            ease: "power2.out",
            scrollTrigger: {
              trigger: row,
              start: "top 90%",
              once: true,
            },
            onComplete: () => {
              gsap.fromTo(
                row.querySelectorAll("[data-comparison-check]"),
                { scale: 0 },
                { scale: 1, duration: 0.32, ease: "back.out(2)", stagger: 0.03 }
              );
            },
          }
        );
      });

      return () => {
        hoverCleanups.forEach((cleanup) => cleanup());
        priceBreathing.kill();
      };
    },
    { scope: pageRef }
  );

  return (
    <div ref={pageRef} className="bg-bg-light text-black">
      <main>
        <section className="relative overflow-hidden bg-[#f1f4ef] px-6 pt-[150px] pb-16 text-center">
          {/* Animated Background Grid Pattern */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.03] animate-grid-move"
            style={{
              backgroundImage: `linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)`,
              backgroundSize: '100px 100px'
            }}
          ></div>
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.03] animate-grid-move"
            style={{
              backgroundImage:
                "linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)",
              backgroundSize: "100px 100px",
            }}
            aria-hidden="true"
          />
          <div className="relative z-10">
            <AuroraBadge spanClassName="text-[13px]!">
              Identity Infrastructure That Pays for Itself
            </AuroraBadge>
            <h1 className="mx-auto mt-8 max-w-[980px] text-balance text-[clamp(3rem,6vw,5rem)] font-bold leading-[1.05] tracking-tight text-black">
              Pay for <span className="text-[#007D21]">Trust.</span> Not Repeated Verification.
            </h1>
            <p className="mx-auto mt-6 max-w-[680px] text-lg leading-relaxed text-black">
              Simple, transparent pricing that scales with your verification volume. No hidden fees. No re-verification costs.
            </p>

            <div className="mt-9 flex justify-center">
              <div className="relative inline-grid h-12 grid-cols-2 items-center rounded-full bg-white p-1 [box-shadow:0_0_0_1px_rgba(0,147,17,0.16)]">
                <span
                  className={`absolute top-1 bottom-1 left-1 w-[calc(50%-4px)] rounded-full bg-gradient-to-r from-dark-primary to-light-primary transition-transform duration-300 ease-out ${billingCycle === "annual" ? "translate-x-full" : "translate-x-0"
                    }`}
                />
                <button
                  className={`relative z-10 h-10 rounded-full px-7 text-base font-semibold transition-colors duration-200 ${billingCycle === "monthly" ? "text-white" : "text-black hover:text-[#009311]"
                    }`}
                  type="button"
                  onClick={() => setBilling("monthly")}
                >
                  Monthly
                </button>
                <button
                  className={`relative z-10 h-10 rounded-full px-7 text-base font-semibold transition-colors duration-200 ${billingCycle === "annual" ? "text-white" : "text-black hover:text-[#009311]"
                    }`}
                  type="button"
                  onClick={() => setBilling("annual")}
                >
                  Annual
                </button>
                <div
                  className="pointer-events-none absolute left-full top-3 hidden translate-x-6 sm:block"
                  aria-hidden="true"
                >
                  <svg
                    className="h-10 w-16 text-[#009311]"
                    viewBox="0 0 68 42"
                    fill="none"
                  >
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
                  className={`absolute left-full top-[58px] hidden translate-x-12 rotate-[-4deg] animate-[pricing-save-float_2.8s_ease-in-out_infinite] rounded-md bg-gradient-to-r from-dark-primary to-light-primary px-2.5 py-1 text-center text-xs font-semibold leading-tight text-white transition-opacity duration-200 sm:inline-flex ${billingCycle === "annual" ? "opacity-100" : "opacity-75"
                    }`}
                >
                  Save<br />$$$
                </span>
              </div>
            </div>
          </div>
        </section>

        <section ref={cardsRef} className="px-6 py-24">
          <div className="mx-auto grid max-w-[1440px] snap-x grid-flow-col auto-cols-[minmax(min(86vw,360px),1fr)] gap-4 overflow-x-auto pb-4 [scrollbar-width:none] md:auto-cols-[calc((100%-32px)/3)] lg:grid-flow-row lg:grid-cols-5 lg:overflow-visible lg:pb-0 xl:gap-5">
            {plans.map((plan, index) => (
              <PricingCard
                key={plan.name}
                plan={plan}
                index={index}
                billingCycle={billingCycle}
              />
            ))}
          </div>
        </section>

        <PlanSection />

        <section ref={tableRef} className="px-6 py-24 opacity-0">
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
                    <th className="sticky left-0 z-10 bg-[#F8FFF8] px-5 py-4 font-semibold">Feature</th>
                    {plans.map((plan) => (
                      <th key={plan.name} className="px-5 py-4 text-center font-semibold">
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
                      <td className={`sticky left-0 z-10 px-5 py-4 font-medium ${index % 2 === 0 ? "bg-white" : "bg-[#FBFFFB]"}`}>
                        {feature}
                      </td>
                      {values.map((value, valueIndex) => (
                        <td key={`${feature}-${valueIndex}`} className="px-5 py-4 text-center text-black/70">
                          <span data-comparison-check className="inline-flex min-h-4 items-center justify-center">
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

        <Calculator />
        <PricingFAQ />
        {/* <Join /> */}
      </main>
      <Footer />
    </div>
  );
}
