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
  href: string;
};

export const enterpriseFooterGroups: FooterGroup[] = [
  {
    category: "Product",
    list: [
      { label: "Features", href: "/enterprise#features" },
      { label: "Pricing", href: "/enterprise/pricing" },
      { label: "Developers", href: "https://docs.ontiver.com/", external: true },
      { label: "Security & Trust", href: "/enterprise#security" },
      { label: "Use Cases", href: "/enterprise#cases" },
    ],
  },
  {
    category: "Use Cases",
    list: [
      { label: "Fintechs", href: "/enterprise/use-cases/fintechs" },
      { label: "Lenders", href: "/enterprise/use-cases/digital-lenders" },
      { label: "Marketplaces", href: "/enterprise/use-cases/marketplaces" },
      { label: "HR Platforms", href: "/enterprise/use-cases/hr-platforms" },
      { label: "Schools", href: "/enterprise/use-cases/schools" },
    ],
  },
  {
    category: "Company",
    list: [
      // { label: "About", href: "/about" },
      { label: "Resources", href: "/blogs" },
      { label: "Blog", href: "/blogs" },
      { label: "Contact", href: "/enterprise/contact" },
      // { label: "Careers", href: "/careers" },
    ],
  },
  {
    category: "Legal",
    list: [
      { label: "Legal Centre", href: "/legal" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Use", href: "/terms" },
      { label: "Cookie Policy", href: "/cookies" },
      { label: "Account Deletion", href: "/account-deletion" },
    ],
  },
];

export const individualFooterGroups: FooterGroup[] = [
  {
    category: "For Individuals",
    list: [
      { label: "How It Works", href: "/#solution" },
      { label: "Identity Benefits", href: "/#features" },
      { label: "Where It Helps", href: "/#cases" },
      { label: "Security & Privacy", href: "/#security" },
    ],
  },
  {
    category: "Resources",
    list: [
      { label: "Resources", href: "/blogs" },
      { label: "Blog", href: "/blogs" },
      { label: "Frequently Asked Questions", href: "/#faq" },
    ],
  },
  {
    category: "Company",
    list: [
      { label: "Enterprise", href: "/enterprise" },
      { label: "Contact & Support", href: "/contact" },
    ],
  },
  {
    category: "Legal",
    list: [
      { label: "Legal Centre", href: "/legal" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Use", href: "/terms" },
      { label: "Cookie Policy", href: "/cookies" },
      { label: "Account Deletion", href: "/account-deletion" },
    ],
  },
];

export const footerGroups = individualFooterGroups;

export const footerIcons: FooterIcon[] = [
  {
    icon: "/assets/twitter.svg",
    alt: "X",
    href: "https://x.com/Ontiverhq",
  },
  {
    icon: "/assets/instagram.svg",
    alt: "Instagram",
    href: "https://www.instagram.com/ontiverhq/",
  },
  {
    icon: "/assets/linkedin.svg",
    alt: "LinkedIn",
    href: "https://www.linkedin.com/company/ontiverhq",
  },
];
