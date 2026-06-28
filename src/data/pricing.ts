export type BillingCycle = "monthly" | "annual";

export type Plan = {
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

export type ComparisonValue = string | boolean;
export type ComparisonRow = [string, ...ComparisonValue[]];

export const pricingPlans: Plan[] = [
  {
    name: "Sandbox",
    monthly: 0,
    annual: 0,
    period: "forever",
    description: "Teams testing API flows before production.",
    cta: "Start Sandbox",
    metric: { value: 100, suffix: " test verifications" },
    features: [
      "Test environment",
      "Sandbox keys",
      "Sample responses",
      "API docs",
      "No production checks",
    ],
  },
  {
    name: "Launch",
    monthly: 199,
    annual: 159,
    period: "per month",
    description: "Early production pilots and small compliance teams.",
    cta: "Start Launch",
    metric: { value: 500, suffix: " verifications" },
    features: [
      "500 verifications",
      "5,000 API requests",
      "Optional AML add-on",
      "Basic dashboard",
      "Email support",
    ],
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
    features: [
      "1,000 verifications",
      "50,000 API requests",
      "250 AML screens",
      "Reusable credentials",
      "Priority email support",
    ],
  },
  {
    name: "Compliance",
    monthly: 999,
    annual: 799,
    period: "per month",
    description: "Regulated teams needing proof, audit, and risk coverage.",
    cta: "Choose Compliance",
    metric: { value: 3000, suffix: " verifications" },
    features: [
      "3,000 verifications",
      "100,000 API requests",
      "500 AML screens",
      "1,000 monitoring profiles",
      "Audit exports",
    ],
  },
  {
    name: "Enterprise",
    monthly: null,
    annual: null,
    period: "custom pricing",
    description: "High-volume teams with custom workflows, SLAs, and reviews.",
    cta: "Contact Sales",
    metric: { value: 10000, suffix: "+ verifications" },
    features: [
      "Custom volume",
      "Dedicated onboarding",
      "Security review",
      "SLA",
      "Account manager",
    ],
  },
];

export const comparisonRows: ComparisonRow[] = [
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

export const pricingCardTones = [
  "bg-[#FDFFFD]",
  "bg-[#FBFFFB]",
  "bg-[#F8FFF8]",
  "bg-[#F5FFF5]",
  "bg-[#FDFFFD]",
];
