export type PlanFieldKey = "verifications" | "amlScreens" | "apiRequests";
export type PlanToggleKey = "auditLogs" | "amlMonitoring" | "sla" | "testingOnly";
export type PlanRecommendation = { plan: string | null; reason: string; estimate?: number };
export const planInputFields: Array<{ key: PlanFieldKey; label: string; placeholder: string }> = [
  { key: "verifications", label: "Monthly verifications", placeholder: "Enter expected volume" },
  {
    key: "amlScreens",
    label: "Requested monthly AML screens",
    placeholder: "Enter requested volume",
  },
  { key: "apiRequests", label: "Monthly API requests", placeholder: "Enter expected requests" },
];
export const planToggleItems: Array<{ key: PlanToggleKey; label: string }> = [
  { key: "auditLogs", label: "Need signed audit exports and compliance reports?" },
  { key: "amlMonitoring", label: "Need ongoing AML monitoring of customers?" },
  { key: "sla", label: "Need a contractual SLA or security review?" },
  { key: "testingOnly", label: "Only testing for now?" },
];
export const planInitialValues: Record<PlanFieldKey, string> = {
  verifications: "",
  amlScreens: "",
  apiRequests: "",
};
export const planInitialToggles: Record<PlanToggleKey, boolean> = {
  auditLogs: false,
  amlMonitoring: false,
  sla: false,
  testingOnly: false,
};
