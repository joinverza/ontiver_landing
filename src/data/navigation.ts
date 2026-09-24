export type NavLink = {
  name: string;
  to: string;
  description: string;
};

export const individualNavLinks: NavLink[] = [
  {
    name: "How it works",
    to: "/#solution",
    description: "Your verification and sharing journey",
  },
  {
    name: "Resources",
    to: "/blogs",
    description: "Guides and identity insights",
  },
  {
    name: "Trust",
    to: "/security",
    description: "Privacy, permission, and your proof",
  },
  {
    name: "Support",
    to: "/support",
    description: "Get help from the Ontiver team",
  },
];

export const enterpriseNavLinks: NavLink[] = [
  {
    name: "Platform",
    to: "/enterprise#features",
    description: "Explore the six layers of identity infrastructure",
  },
  {
    name: "Pricing",
    to: "/enterprise/pricing",
    description: "Plans and savings calculator",
  },
  {
    name: "Resources",
    to: "/blogs",
    description: "Identity and compliance insights",
  },
  {
    name: "Trust",
    to: "/security",
    description: "Consent, data handling, and security review",
  },
  {
    name: "Support",
    to: "/support",
    description: "Get implementation and account help",
  },
];

export const navLinks = individualNavLinks;
