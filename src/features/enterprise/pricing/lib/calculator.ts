import type { SavingsResult } from "../data/calculator";
import type { BillingCycle, PricingCatalog } from "../data/pricing";
import { cheapestPlan } from "./pricing";

export function parseAmount(value: string) {
  const amount = Number(value);
  return Number.isFinite(amount) && amount >= 0 ? amount : 0;
}

export function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

export function calculateKycBaseline(
  monthlyVerifications: number,
  costPerVerification: number,
  dropOffRate: number,
  catalog?: PricingCatalog,
  billingCycle: BillingCycle = "monthly",
): SavingsResult {
  const volume = Math.max(0, Math.floor(monthlyVerifications));
  const rate = Math.min(100, Math.max(0, dropOffRate));
  const currentKycCost = volume * Math.max(0, costPerVerification);
  // Published plans only; very high volumes are quoted as contracts.
  const best = catalog && volume > 0 && volume <= 25_000 ? cheapestPlan(catalog, { verifications: volume }, [], billingCycle) : null;
  return {
    monthlyVerifications: volume,
    currentKycCost,
    lostUsers: Math.round((volume * rate) / 100),
    dropOffRate: rate,
    estimatedOntiverCost: best ? best.total : null,
    directSavings: best ? currentKycCost - best.total : null,
    recommendedPlan: best ? best.plan.name : volume > 25_000 ? "Enterprise" : null,
  };
}
