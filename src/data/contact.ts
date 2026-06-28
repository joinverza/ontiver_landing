export type ContactFormField =
  | "firstName"
  | "email"
  | "companyName"
  | "companySize"
  | "message";

export type ContactFieldConfig = {
  key: ContactFormField;
  label: string;
  placeholder: string;
  type?: "text" | "email" | "textarea";
  wide?: boolean;
};

export const contactHeading = "Let's Build Trust Infrastructure Together";

export const contactFields: ContactFieldConfig[] = [
  { key: "firstName", label: "First Name", placeholder: "Ada" },
  {
    key: "email",
    label: "Work Email",
    placeholder: "ada@company.com",
    type: "email",
  },
  {
    key: "companyName",
    label: "Company Name",
    placeholder: "Company Inc.",
  },
  { key: "companySize", label: "Company Size", placeholder: "10-50" },
  {
    key: "message",
    label: "Message",
    placeholder: "Tell us about your identity workflow",
    type: "textarea",
    wide: true,
  },
];

export const contactInitialValues: Record<ContactFormField, string> = {
  firstName: "",
  email: "",
  companyName: "",
  companySize: "",
  message: "",
};

export const contactRows = [
  { icon: "/assets/call.svg", label: "+1012 3456 789" },
  { icon: "/assets/sms.svg", label: "hello@ontiver.com" },
  {
    icon: "/assets/location.svg",
    label: "132 Dartmouth Street, Boston, Massachusetts 02156",
  },
];

export const contactSocialIcons = [
  { icon: "/assets/X.svg", label: "X", color: "#1DA1F2" },
  { icon: "/assets/insta.svg", label: "Instagram", color: "#E1306C" },
  { icon: "/assets/discord.svg", label: "Discord", color: "#5865F2" },
];
