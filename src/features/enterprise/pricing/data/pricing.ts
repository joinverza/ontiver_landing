import type { PricingCatalog, PricingPlan } from "../../../../shared/lib/landingApi";
import catalogSnapshot from "./catalog.json";

export type BillingCycle = "monthly" | "annual";
export type { PricingCatalog, PricingPlan };

/**
 * Snapshot of the API's plan catalog (banking/plans.py), used for the first paint and the
 * prerendered page. A backend test fails if this file and the catalog disagree.
 */
export const bundledCatalog = catalogSnapshot as PricingCatalog;

export const DEVELOPER_SIGNUP_URL = `${(import.meta.env.VITE_ONTIVER_DEVELOPER_URL || "https://dev.ontiver.com").replace(/\/+$/, "")}/signup`;

export const annualSavingPercent = (plan: PricingPlan) =>
  plan.monthly && plan.annualMonthly ? Math.round((1 - plan.annualMonthly / plan.monthly) * 100) : 0;

export const monthlyPrice = (plan: PricingPlan, cycle: BillingCycle) =>
  cycle === "annual" ? (plan.annualMonthly ?? plan.monthly) : plan.monthly;

export const formatUsd = (value: number, cents = false) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: cents ? 2 : 0,
    maximumFractionDigits: cents ? 2 : 0,
  }).format(value);

const count = (value: number | null, custom = "Custom") => (value === null ? custom : value.toLocaleString("en-US"));

export type ComparisonCell = string | boolean;
export type ComparisonGroup = { title: string; rows: { label: string; hint?: string; values: ComparisonCell[] }[] };

/** Rows for the comparison table, all derived from the catalog. */
export const comparisonGroups = (catalog: PricingCatalog): ComparisonGroup[] => {
  const { plans, features, addons } = catalog;
  const featureCell = (plan: PricingPlan, key: string): ComparisonCell => {
    if (plan.features.includes(key)) return plan.id === "sandbox" && key !== "webhooks" ? "Test data" : true;
    // Add-on ids match the feature they unlock (AML screening, AML monitoring).
    return plan.addons.includes(key) ? `Add-on from ${formatUsd(addons.find((addon) => addon.id === key)?.monthly ?? 0)}/mo` : false;
  };
  return [
    {
      title: "Usage",
      rows: [
        { label: "Verifications included each month", values: plans.map((plan) => (plan.id === "sandbox" ? `${count(plan.includedVerifications)} test` : count(plan.includedVerifications))) },
        {
          label: "Each additional verification",
          values: plans.map((plan) =>
            plan.overagePerVerification !== null ? formatUsd(plan.overagePerVerification, true) : plan.id === "sandbox" ? "Not available" : "Volume pricing",
          ),
        },
        { label: "API requests each month", values: plans.map((plan) => count(plan.apiRequests)) },
        {
          label: "AML screens included",
          values: plans.map((plan) =>
            plan.amlScreens ? `${count(plan.amlScreens)} · then ${formatUsd(plan.amlScreenOverage ?? 0, true)}` : plan.addons.includes("aml_screening") ? "With add-on" : plan.amlScreens === null ? "Custom" : false,
          ),
        },
        {
          label: "Monitored customer profiles",
          values: plans.map((plan) =>
            plan.monitoringProfiles ? `${count(plan.monitoringProfiles)} · then ${formatUsd(plan.monitoringOverage ?? 0, true)}` : plan.addons.includes("aml_monitoring") ? "With add-on" : plan.monitoringProfiles === null ? "Custom" : false,
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
