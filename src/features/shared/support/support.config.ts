import { CheckCircle2, Code2, LifeBuoy, MessageCircle, ShieldCheck } from "lucide-react";

export const shortcutsByAudience = {
  individual: [
    { topic: "Account access", icon: MessageCircle },
    { topic: "Privacy and data", icon: ShieldCheck },
    { topic: "Verification", icon: CheckCircle2 },
    { topic: "Developer integration", icon: Code2 },
  ],
  enterprise: [
    { topic: "Verification requests", icon: CheckCircle2 },
    { topic: "Dashboard reviews", icon: MessageCircle },
    { topic: "API integration", icon: Code2 },
    { topic: "Consent records", icon: ShieldCheck },
    { topic: "Workflow support", icon: LifeBuoy },
  ],
};

export const controlClassName =
  "min-h-14 w-full rounded-[10px] border border-[#d7e2d4] bg-white px-4 text-body font-normal text-[#002d0e] outline-none transition-colors placeholder:text-[#647365]/65 focus:border-[#009311] focus:ring-2 focus:ring-[#009311]/10";

export type SupportFormValues = {
  name: string;
  email: string;
  topic: string;
  subject: string;
  message: string;
  website: string;
};

export const emptyForm: SupportFormValues = {
  name: "",
  email: "",
  topic: "",
  subject: "",
  message: "",
  website: "",
};
