export type ContactFormField =
  | "firstName"
  | "email"
  | "subject"
  | "message";

export type ContactFieldConfig = {
  key: ContactFormField;
  label: string;
  placeholder: string;
  type?: "text" | "email" | "textarea";
  wide?: boolean;
};

export const contactHeading = "How Can We Help?";

export const contactFields: ContactFieldConfig[] = [
  { key: "firstName", label: "First Name", placeholder: "Ada" },
  {
    key: "email",
    label: "Email",
    placeholder: "ada@example.com",
    type: "email",
  },
  {
    key: "subject",
    label: "What do you need help with?",
    placeholder: "Early access, privacy, or general support",
  },
  {
    key: "message",
    label: "Message",
    placeholder: "Tell us how we can help",
    type: "textarea",
    wide: true,
  },
];

export const contactInitialValues: Record<ContactFormField, string> = {
  firstName: "",
  email: "",
  subject: "",
  message: "",
};

export const contactRows = [
  { icon: "/assets/sms.svg", label: "hello@ontiver.com" },
  { icon: "/assets/clock-circle.svg", label: "We usually reply within two business days." },
  { icon: "/assets/consent.svg", label: "Never include passwords or sensitive identity documents." },
];

export const contactSocialIcons = [
  {
    icon: "/assets/twitter.svg",
    label: "X",
    color: "#111111",
    href: "https://x.com/Ontiverhq",
  },
  {
    icon: "/assets/instagram.svg",
    label: "Instagram",
    color: "#E1306C",
    href: "https://www.instagram.com/ontiverhq/",
  },
  {
    icon: "/assets/linkedin.svg",
    label: "LinkedIn",
    color: "#0A66C2",
    href: "https://www.linkedin.com/company/ontiverhq",
  },
];
