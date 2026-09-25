import { pricingPlans, type Plan, type BillingCycle } from "../data/pricing";

export function formatPrice(value: number | null) {
  if (value === null) return "Custom";
  if (value === 0) return "$0";
  return `$${Math.round(value).toLocaleString()}`;
}

export function getRecommendedPricingPlan(monthlyVerifications: number): Plan {
  if (monthlyVerifications <= 0) return pricingPlans[0];
  if (monthlyVerifications <= 500) return pricingPlans[1];
  if (monthlyVerifications <= 1000) return pricingPlans[2];
  if (monthlyVerifications <= 3000) return pricingPlans[3];
  return pricingPlans[4];
}

export function getPricingInquiryUrl(planName: string | null, billingCycle: BillingCycle = "monthly", monthlyVerifications?: number) {
  const plan = planName?.toLowerCase();
  const params = new URLSearchParams({ plan: plan && ["launch", "growth", "compliance", "enterprise"].includes(plan) ? plan : "enterprise", billing: billingCycle });
  if (plan === "sandbox") params.set("request", "sandbox");
  if (monthlyVerifications !== undefined && Number.isFinite(monthlyVerifications) && monthlyVerifications >= 0) params.set("monthlyVerifications", String(monthlyVerifications));
  return "/enterprise/contact?" + params.toString();
}
