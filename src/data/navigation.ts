export type NavLink = {
  name: string;
  to: string;
  description: string;
};

export const navLinks: NavLink[] = [
  {
    name: "Home",
    to: "/",
    description: "Back to the landing page",
  },
  {
    name: "Pricing",
    to: "/pricing",
    description: "Plans and calculators",
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
