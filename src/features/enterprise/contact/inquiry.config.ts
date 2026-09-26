export const planOptions = {
  launch: "Launch",
  growth: "Growth",
  compliance: "Compliance",
  enterprise: "Enterprise",
} as const;

export type PlanKey = keyof typeof planOptions;
export type EnterpriseInquiryValues = {
  planKey: PlanKey;
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  role: string;
  country: string;
  monthlyVerifications: string;
  useCase: string;
  complianceNeeds: string;
  timeline: string;
  meetingPreference: string;
  website: string;
};
