import type {
  PricingCatalog,
  PricingCurrency,
  PricingPlan,
} from "../../../../shared/lib/landingApi";
import catalogSnapshot from "./catalog.json";

export type BillingCycle = "monthly" | "annual";
export type { PricingCatalog, PricingCurrency, PricingPlan };

/**
 * Snapshot of the API's plan catalog (banking/plans.py), used for the first paint and the
 * prerendered page. A backend test fails if this file and the catalog disagree.
 */
export const bundledCatalog = catalogSnapshot as PricingCatalog;

export const PORTAL_SIGNUP_URL = `${(import.meta.env.VITE_ONTIVER_PORTAL_URL || "https://portal.ontiver.com").replace(/\/+$/, "")}/portal/signup`;

export const CURRENCY_NAMES: Record<PricingCurrency, string> = { USD: "US dollars", NGN: "naira" };

/**
 * The catalog with every price in one currency. Naira prices are fixed local prices published by
 * the API, not converted at today's exchange rate.
 */
export function localizeCatalog(
  catalog: PricingCatalog,
  currency: PricingCurrency,
): PricingCatalog {
  const prices = catalog.prices?.[currency];
  if (!prices) return catalog;
  return {
    ...catalog,
    currency,
    plans: catalog.plans.map((plan) => {
      const local = prices[plan.id];
      return local
        ? {
            ...plan,
            monthly: local.monthly,
            annualMonthly: local.annualMonthly,
            overagePerVerification: local.overage,
            amlScreenOverage: local.amlScreenOverage,
            monitoringOverage: local.monitoringOverage,
            highlights: local.highlights,
          }
        : plan;
    }),
    addons: catalog.addons.map((addon) => {
      const local = addon.prices?.[currency];
      return local ? { ...addon, ...local, monthly: local.monthly ?? null } : addon;
    }),
  };
}

export const DEVELOPER_SIGNUP_URL = `${(import.meta.env.VITE_ONTIVER_DEVELOPER_URL || "https://dev.ontiver.com").replace(/\/+$/, "")}/signup`;

export const annualSavingPercent = (plan: PricingPlan) =>
  plan.monthly && plan.annualMonthly
    ? Math.round((1 - plan.annualMonthly / plan.monthly) * 100)
    : 0;

/** A line that states a price (the website shows plans without amounts). */
export const isPriceLine = (line: string) => /[$₦]s?d|per additional|per extra/i.test(line);

export const monthlyPrice = (plan: PricingPlan, cycle: BillingCycle) =>
  cycle === "annual" ? (plan.annualMonthly ?? plan.monthly) : plan.monthly;

/** $499, ₦749,000, $0.45. Naira amounts never show kobo. */
export const formatPrice = (value: number, currency: string, cents = false) => {
  const fraction = cents && !Number.isInteger(value) && currency !== "NGN" ? 2 : 0;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    currencyDisplay: "narrowSymbol",
    minimumFractionDigits: fraction,
    maximumFractionDigits: fraction,
  }).format(value);
};

const count = (value: number | null, custom = "Custom") =>
  value === null ? custom : value.toLocaleString("en-US");

export type ComparisonCell = string | boolean;
export type ComparisonGroup = {
  title: string;
  rows: { label: string; hint?: string; values: ComparisonCell[] }[];
};

/** Rows for the comparison table, all derived from the catalog. */
export const comparisonGroups = (catalog: PricingCatalog): ComparisonGroup[] => {
  const { plans, features } = catalog;
  const featureCell = (plan: PricingPlan, key: string): ComparisonCell => {
    if (plan.features.includes(key))
      return plan.id === "sandbox" && key !== "webhooks" ? "Test data" : true;
    // Add-on ids match the feature they unlock (AML screening, AML monitoring).
    return plan.addons.includes(key) ? "Add-on" : false;
  };
  return [
    {
      title: "Usage",
      rows: [
        {
          label: "Verifications included each month",
          values: plans.map((plan) =>
            plan.id === "sandbox"
              ? `${count(plan.includedVerifications)} test`
              : count(plan.includedVerifications),
          ),
        },
        {
          label: "Additional verifications",
          values: plans.map((plan) =>
            plan.id === "sandbox"
              ? "Not available"
              : plan.requiresContact
                ? "Volume pricing"
                : "Billed monthly",
          ),
        },
        { label: "API requests each month", values: plans.map((plan) => count(plan.apiRequests)) },
        {
          label: "AML screens included",
          values: plans.map((plan) =>
            plan.amlScreens
              ? count(plan.amlScreens)
              : plan.addons.includes("aml_screening")
                ? "With add-on"
                : plan.amlScreens === null
                  ? "Custom"
                  : false,
          ),
        },
        {
          label: "Monitored customer profiles",
          values: plans.map((plan) =>
            plan.monitoringProfiles
              ? count(plan.monitoringProfiles)
              : plan.addons.includes("aml_monitoring")
                ? "With add-on"
                : plan.monitoringProfiles === null
                  ? "Custom"
                  : false,
          ),
        },
        { label: "Team seats", values: plans.map((plan) => count(plan.teamSeats, "Unlimited")) },
      ],
    },
    {
      title: "Platform",
      rows: features.map((feature) => ({
        label: feature.label,
        hint: feature.description,
        values: plans.map((plan) => featureCell(plan, feature.key)),
      })),
    },
    {
      title: "Service",
      rows: [
        { label: "Uptime target", values: plans.map((plan) => plan.uptimeTarget ?? "Best effort") },
        { label: "Support", values: plans.map((plan) => plan.support) },
        { label: "Onboarding", values: plans.map((plan) => plan.onboarding) },
      ],
    },
  ];
};
