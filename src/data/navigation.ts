export type NavLink = {
  name: string;
  to: string;
  description: string;
};

export const individualNavLinks: NavLink[] = [
  {
    name: "Home",
    to: "/",
    description: "Back to the landing page",
  },
  {
    name: "Resources/Blogs",
    to: "/blogs",
    description: "Guides and identity insights",
  },
  {
    name: "Support",
    to: "/support",
    description: "Get help from the Ontiver team",
  },
];

export const enterpriseNavLinks: NavLink[] = [
  {
    name: "Enterprise",
    to: "/enterprise",
    description: "Enterprise identity infrastructure",
  },
  {
    name: "Pricing",
    to: "/enterprise/pricing",
    description: "Plans and savings calculator",
  },
  {
    name: "Resources/Blogs",
    to: "/blogs",
    description: "Identity and compliance insights",
  },
  {
    name: "Support",
    to: "/support",
    description: "Get implementation and account help",
  },
];

export const navLinks = individualNavLinks;
