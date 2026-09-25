export type CalculatorFieldKey = "monthlyVerifications" | "costPerVerification";
export type CalculatorField = { key: CalculatorFieldKey; label: string; placeholder: string; prefix?: string };
export type SavingsResult = {
  monthlyVerifications: number;
  currentKycCost: number;
  lostUsers: number;
  dropOffRate: number;
  estimatedOntiverCost: null;
  directSavings: null;
  recommendedPlan: null;
};
export const calculatorFields: CalculatorField[] = [
  { key: "monthlyVerifications", label: "Monthly verifications", placeholder: "Enter your monthly volume" },
  { key: "costPerVerification", label: "Current cost per verification (USD)", placeholder: "Enter your current cost", prefix: "$" },
];
export const calculatorInitialValues: Record<CalculatorFieldKey, string> = { monthlyVerifications: "", costPerVerification: "" };
