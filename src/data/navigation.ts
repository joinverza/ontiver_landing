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
    name: "Contact",
    to: "/contact",
    description: "Talk to the Ontiver team",
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
    name: "Contact",
    to: "/enterprise/contact",
    description: "Request enterprise access",
  },
];

export const navLinks = individualNavLinks;
