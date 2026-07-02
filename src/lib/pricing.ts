import { pricingPlans, type Plan } from "../data/pricing";

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
