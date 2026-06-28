export type PlanFieldKey = "verifications" | "amlScreens" | "apiRequests";
export type PlanToggleKey =
  | "auditLogs"
  | "amlMonitoring"
  | "sla"
  | "testingOnly";

export type PlanInputField = {
  key: PlanFieldKey;
  label: string;
  placeholder: string;
  threshold: number;
};

export type PlanToggleItem = {
  key: PlanToggleKey;
  label: string;
};

export const planInputFields: PlanInputField[] = [
  {
    key: "verifications",
    label: "Monthly production verifications",
    placeholder: "Enter volume",
    threshold: 3000,
  },
  {
    key: "amlScreens",
    label: "Monthly AML screens",
    placeholder: "Enter AML screens",
    threshold: 500,
  },
  {
    key: "apiRequests",
    label: "Monthly API requests",
    placeholder: "Enter API requests",
    threshold: 100000,
  },
];

export const planToggleItems: PlanToggleItem[] = [
  { key: "auditLogs", label: "Need audit logs?" },
  { key: "amlMonitoring", label: "Need AML monitoring?" },
  { key: "sla", label: "Need SLA or dedicated onboarding?" },
  { key: "testingOnly", label: "Testing only?" },
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
