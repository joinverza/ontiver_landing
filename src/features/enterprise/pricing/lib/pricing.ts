import {
  DEVELOPER_SIGNUP_URL,
  monthlyPrice,
  type BillingCycle,
  type PricingCatalog,
  type PricingPlan,
} from "../data/pricing";
import type { PlanFieldKey, PlanRecommendation, PlanToggleKey } from "../data/plan";

const SELF_SERVE_LIMIT = 25_000; // Above this monthly volume, contract pricing is cheaper.

export function getPricingInquiryUrl(
  planName: string | null,
  billingCycle: BillingCycle = "monthly",
  monthlyVerifications?: number,
) {
  const plan = planName?.toLowerCase();
  const params = new URLSearchParams({
    plan: plan && ["launch", "growth", "compliance", "enterprise"].includes(plan) ? plan : "enterprise",
    billing: billingCycle,
  });
  if (
    monthlyVerifications !== undefined &&
    Number.isFinite(monthlyVerifications) &&
    monthlyVerifications >= 0
  )
    params.set("monthlyVerifications", String(monthlyVerifications));
  return "/enterprise/contact?" + params.toString();
}

/** Where a plan's call to action leads: Sandbox is self-serve, paid plans start with our team. */
export const planCtaHref = (plan: PricingPlan, billingCycle: BillingCycle) =>
  plan.id === "sandbox" ? DEVELOPER_SIGNUP_URL : getPricingInquiryUrl(plan.id, billingCycle);

export type CostEstimate = {
  plan: PricingPlan;
  base: number;
  extraVerifications: number;
  extraVerificationCost: number;
  amlCost: number;
  total: number;
};

/** Monthly cost of a published plan for a given usage; null for contract plans. */
export function estimatePlanCost(
  plan: PricingPlan,
  usage: { verifications: number; amlScreens?: number },
  billingCycle: BillingCycle = "monthly",
  catalog?: PricingCatalog,
): CostEstimate | null {
  const base = monthlyPrice(plan, billingCycle);
  if (base === null || plan.id === "sandbox") return null;
  const included = plan.includedVerifications ?? 0;
  const extraVerifications = Math.max(0, usage.verifications - included);
  const extraVerificationCost = extraVerifications * (plan.overagePerVerification ?? 0);
  const screens = usage.amlScreens ?? 0;
  let amlCost = 0;
  if (screens > 0) {
    if (plan.amlScreens) {
      amlCost = Math.max(0, screens - plan.amlScreens) * (plan.amlScreenOverage ?? 0);
    } else if (plan.addons.includes("aml_screening")) {
      const addon = catalog?.addons.find((item) => item.id === "aml_screening");
      amlCost = (addon?.monthly ?? 0) + Math.max(0, screens - (addon?.includedScreens ?? 0)) * (addon?.screenOverage ?? 0);
    } else {
      return null;
    }
  }
  return {
    plan,
    base,
    extraVerifications,
    extraVerificationCost,
    amlCost,
    total: base + extraVerificationCost + amlCost,
  };
}

/** Cheapest published plan that covers the usage and required features. */
export function cheapestPlan(
  catalog: PricingCatalog,
  usage: { verifications: number; amlScreens?: number },
  requiredFeatures: string[] = [],
  billingCycle: BillingCycle = "monthly",
): CostEstimate | null {
  return catalog.plans
    .filter((plan) => requiredFeatures.every((feature) => plan.features.includes(feature)))
    .map((plan) => estimatePlanCost(plan, usage, billingCycle, catalog))
    .filter((estimate): estimate is CostEstimate => estimate !== null)
    .sort((a, b) => a.total - b.total)[0] ?? null;
}

const planByName = (catalog: PricingCatalog, id: string) => catalog.plans.find((plan) => plan.id === id)?.name ?? null;

export function getPlanRecommendation(
  values: Record<PlanFieldKey, string>,
  toggles: Record<PlanToggleKey, boolean>,
  catalog: PricingCatalog,
  billingCycle: BillingCycle = "monthly",
): PlanRecommendation {
  const verifications = Number(values.verifications) || 0;
  const amlScreens = Number(values.amlScreens) || 0;
  if (toggles.testingOnly)
    return {
      plan: planByName(catalog, "sandbox"),
      reason: "Build and test your integration free in Sandbox with 100 test verifications a month. Move to a paid plan when you go live.",
    };
  if (toggles.sla || verifications > SELF_SERVE_LIMIT)
    return {
      plan: planByName(catalog, "enterprise"),
      reason:
        verifications > SELF_SERVE_LIMIT
          ? `At ${verifications.toLocaleString("en-US")} verifications a month, volume pricing on an annual contract costs less than published plans.`
          : "A contractual SLA, security review and dedicated onboarding come with Enterprise.",
    };
  const required = [
    ...(toggles.auditLogs ? ["compliance_exports"] : []),
    ...(toggles.amlMonitoring ? ["aml_monitoring"] : []),
  ];
  const best = cheapestPlan(catalog, { verifications, amlScreens }, required, billingCycle);
  if (!best)
    return {
      plan: planByName(catalog, "enterprise"),
      reason: "Your mix of needs is best priced as a contract. Tell us about your volume and we'll send a quote.",
    };
  const extras = [
    best.extraVerifications ? `${best.extraVerifications.toLocaleString("en-US")} verifications above the allowance` : "",
    best.amlCost ? "AML screening" : "",
  ].filter(Boolean);
  return {
    plan: best.plan.name,
    estimate: best.total,
    reason: `${best.plan.name} is the lowest-cost plan for this usage: about $${Math.round(best.total).toLocaleString("en-US")} a month${extras.length ? `, including ${extras.join(" and ")}` : ""}.`,
  };
}
