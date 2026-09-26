import type { SavingsResult } from "../data/calculator";

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
): SavingsResult {
  const volume = Math.max(0, Math.floor(monthlyVerifications));
  const rate = Math.min(100, Math.max(0, dropOffRate));
  return {
    monthlyVerifications: volume,
    currentKycCost: volume * Math.max(0, costPerVerification),
    lostUsers: Math.round((volume * rate) / 100),
    dropOffRate: rate,
    estimatedOntiverCost: null,
    directSavings: null,
    recommendedPlan: null,
  };
}
