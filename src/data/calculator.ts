export type CalculatorFieldKey =
  | "monthlyVerifications"
  | "costPerVerification"
  | "averageRevenue"
  | "manualReviewLoss";

export type CalculatorField = {
  key: CalculatorFieldKey;
  label: string;
  placeholder: string;
  prefix?: string;
};

export type CalculatorStatus = "idle" | "updating" | "calculating" | "result";

export type SavingsResult = {
  monthlySavings: number;
  annualSavings: number;
  recoveryRate: number;
  recommendedPlan: string;
  monthlyPlanCost: number | null;
};

export const calculatorFields: CalculatorField[] = [
  {
    key: "monthlyVerifications",
    label: "Monthly Verifications",
    placeholder: "1,000",
  },
  {
    key: "costPerVerification",
    label: "Current Cost Per Verification",
    placeholder: "0.50",
    prefix: "$",
  },
  {
    key: "averageRevenue",
    label: "Average Revenue Per User",
    placeholder: "150",
    prefix: "$",
  },
  {
    key: "manualReviewLoss",
    label: "Monthly Fraud / Manual Review Loss",
    placeholder: "150",
    prefix: "$",
  },
];

export const calculatorInitialValues: Record<CalculatorFieldKey, string> = {
  monthlyVerifications: "",
  costPerVerification: "",
  averageRevenue: "",
  manualReviewLoss: "",
};
