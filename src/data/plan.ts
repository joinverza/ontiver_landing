export type PlanFieldKey = "verifications" | "amlScreens" | "apiRequests";
export type PlanToggleKey = "auditLogs" | "amlMonitoring" | "sla" | "testingOnly";
export type PlanRecommendation = { plan: string | null; reason: string };
export const planInputFields: Array<{key: PlanFieldKey; label: string; placeholder: string}> = [
  { key: "verifications", label: "Monthly verifications", placeholder: "Enter expected volume" },
  { key: "amlScreens", label: "Requested monthly AML screens", placeholder: "Enter requested volume" },
  { key: "apiRequests", label: "Monthly API requests", placeholder: "Enter expected requests" },
];
export const planToggleItems: Array<{key: PlanToggleKey; label: string}> = [
  { key: "auditLogs", label: "Need audit logs?" },
  { key: "amlMonitoring", label: "Need AML monitoring?" },
  { key: "sla", label: "Need SLA or dedicated onboarding?" },
  { key: "testingOnly", label: "Testing only?" },
];
export const planInitialValues: Record<PlanFieldKey, string> = { verifications: "", amlScreens: "", apiRequests: "" };
export const planInitialToggles: Record<PlanToggleKey, boolean> = { auditLogs: false, amlMonitoring: false, sla: false, testingOnly: false };
