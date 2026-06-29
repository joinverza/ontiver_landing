export type FooterGroup = {
  category: string;
  list: string[];
};

export type FooterIcon = {
  icon: string;
  alt: string;
};

export const footerGroups: FooterGroup[] = [
  {
    category: "Product",
    list: ["Features", "Pricing", "Developers", "Trusted", "Use Cases"],
  },
  {
    category: "Use Cases",
    list: ["Fintechs", "Lenders", "Marketplaces", "HR Platforms", "Schools"],
  },
  {
    category: "Company",
    list: ["About", "Resources", "Blog", "Contact", "Careers"],
  },
  {
    category: "Legal",
    list: [
      "Privacy Policy",
      "Terms of Service",
      "Data protection",
      "Cookie Policy",
    ],
  },
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
