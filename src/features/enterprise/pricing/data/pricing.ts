export type BillingCycle = "monthly" | "annual";

export type Plan = {
  name: string;
  description: string;
  cta: string;
  features: string[];
  highlighted?: boolean;
};

export type ComparisonValue = string | boolean;
export type ComparisonRow = [string, ...ComparisonValue[]];

export const pricingPlans: Plan[] = [
  {
    name: "Sandbox",
    description: "For developers testing the API and workflow before production.",
    cta: "Start Sandbox",
    features: ["API access: sandbox only", "Verification allowance to be confirmed"],
  },
  {
    name: "Launch",
    description: "For early teams validating Ontiver with low verification volume.",
    cta: "Start Launch",
    features: ["Verification allowance to be confirmed", "API request allowance to be confirmed"],
  },
  {
    name: "Growth",
    description: "For fintechs, lenders, marketplaces, schools, and platforms scaling onboarding.",
    cta: "Choose Growth",
    highlighted: true,
    features: ["Verification allowance to be confirmed", "AML screening inclusion to be confirmed"],
  },
  {
    name: "Compliance",
    description:
      "For regulated teams needing audit logs, AML/risk support, and compliance exports.",
    cta: "Choose Compliance",
    features: [
      "Audit logs included",
      "Compliance exports included",
      "AML/risk support to be scoped",
    ],
  },
  {
    name: "Enterprise",
    description:
      "For high-volume teams needing custom workflows, SLA, security review, and dedicated onboarding.",
    cta: "Contact Sales",
    features: [
      "Custom workflows to be scoped",
      "SLA availability to be agreed",
      "Security review and onboarding to be scoped",
    ],
  },
];

const pending = "To be confirmed";
export const comparisonRows: ComparisonRow[] = [
  ["Verification allowance", pending, pending, pending, pending, pending],
  ["API request allowance", "To confirm · sandbox only", pending, pending, pending, pending],
  ["AML screening", pending, pending, pending, pending, pending],
  ["Monitoring profiles", pending, pending, pending, pending, pending],
  ["Reusable credentials", pending, pending, pending, pending, pending],
  ["Dashboard access", pending, pending, pending, pending, pending],
  ["Audit logs", pending, pending, pending, "Included", pending],
  ["Compliance exports", pending, pending, pending, "Included", pending],
  ["Support level", pending, pending, pending, pending, pending],
  ["SLA availability", pending, pending, pending, pending, "To be agreed"],
];
