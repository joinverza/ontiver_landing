export type FooterGroup = {
  category: string;
  list: FooterLink[];
};

export type FooterLink = {
  label: string;
  href: string;
  external?: boolean;
};

export type FooterIcon = {
  icon: string;
  alt: string;
};

export const footerGroups: FooterGroup[] = [
  {
    category: "Product",
    list: [
      { label: "Features", href: "/#features" },
      { label: "Pricing", href: "/pricing" },
      { label: "Developers", href: "https://docs.ontiver.com/", external: true },
      { label: "Security & Trust", href: "/#security" },
      { label: "Use Cases", href: "/#cases" },
    ],
  },
  {
    category: "Use Cases",
    list: [
      { label: "Fintechs", href: "/#cases" },
      { label: "Lenders", href: "/#cases" },
      { label: "Marketplaces", href: "/#cases" },
      { label: "HR Platforms", href: "/#cases" },
      { label: "Schools", href: "/#cases" },
    ],
  },
  {
    category: "Company",
    list: [
      // { label: "About", href: "/about" },
      { label: "Resources", href: "/blogs" },
      { label: "Blog", href: "/blogs" },
      { label: "Contact", href: "/contact" },
      // { label: "Careers", href: "/careers" },
    ],
  },
  // {
  //   category: "Legal",
  //   list: [
  //     { label: "Privacy Policy", href: "/privacy" },
  //     { label: "Terms of Service", href: "/terms" },
  //     { label: "Data protection", href: "/data-protection" },
  //     { label: "Cookie Policy", href: "/cookies" },
  //   ],
  // },
];

export const footerIcons: FooterIcon[] = [
  {
    icon: "./assets/linkedin.svg",
    alt: "linkedin-icon",
  },
  {
    icon: "./assets/instagram.svg",
    alt: "instagram-icon",
  },
  {
    icon: "./assets/facebook.svg",
    alt: "facebook-icon",
  },
  {
    icon: "./assets/twitter.svg",
    alt: "twitter-icon",
  },
];
