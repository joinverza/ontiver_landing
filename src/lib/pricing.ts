import type { BillingCycle } from "../data/pricing";
import type { PlanFieldKey, PlanRecommendation, PlanToggleKey } from "../data/plan";

export function getPricingInquiryUrl(planName: string | null, billingCycle: BillingCycle = "monthly", monthlyVerifications?: number) {
  const plan = planName?.toLowerCase();
  const params = new URLSearchParams({ plan: plan && ["launch", "growth", "compliance", "enterprise"].includes(plan) ? plan : "enterprise", billing: billingCycle });
  if (plan === "sandbox") params.set("request", "sandbox");
  if (monthlyVerifications !== undefined && Number.isFinite(monthlyVerifications) && monthlyVerifications >= 0) params.set("monthlyVerifications", String(monthlyVerifications));
  return "/enterprise/contact?" + params.toString();
}

export function getPlanRecommendation(values: Record<PlanFieldKey, string>, toggles: Record<PlanToggleKey, boolean>): PlanRecommendation {
  if (toggles.testingOnly) return { plan: "Sandbox", reason: "Start with API and workflow testing before production. Sandbox pricing and allowances are still to be confirmed." };
  if (toggles.sla) return { plan: "Enterprise", reason: "Discuss your SLA and onboarding requirements with the team. Availability, scope, and service terms need agreement." };
  if (toggles.auditLogs || toggles.amlMonitoring || Number(values.amlScreens) > 0) return { plan: "Compliance", reason: "Discuss the Compliance plan for audit or risk requirements. Audit logs and exports are included; AML coverage and allowances still need confirmation." };
  return { plan: null, reason: "Plan allowances are not finalized, so volume alone cannot select a plan. Share your expected usage with the team for a recommendation and quote." };
}
