import { imagery } from "../../../../shared/data/imagery";

export type BlogSummary = {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  date?: string;
  author: string;
  readTime: string;
  category: string;
};

const summaries = [
  {
    id: 1,
    slug: "why-identity-verification-should-be-reusable",
    title: "Why Identity Verification Should Be Reusable",
    excerpt: "Every platform asks for the same documents. It doesn't have to be that way.",
    category: "Identity",
    readTime: "3 min read",
  },
  {
    id: 2,
    slug: "cutting-kyc-costs-without-cutting-assurance",
    title: "Cutting KYC Costs Without Cutting Assurance",
    excerpt:
      "Repeated verification is expensive for businesses and frustrating for users. Reusable proof addresses both.",
    category: "KYC",
    readTime: "3 min read",
  },
  {
    id: 3,
    slug: "aml-screening-for-product-teams",
    title: "AML Screening for Product Teams",
    excerpt:
      "AML doesn't have to live only in a compliance team's spreadsheet — here's how it fits into a product workflow.",
    category: "AML",
    readTime: "3 min read",
  },
  {
    id: 4,
    slug: "building-consent-into-identity-flows",
    title: "Building Consent Into Identity Flows",
    excerpt:
      "Consent isn't a checkbox at signup — it's a decision made at the moment of every request.",
    category: "Consent",
    readTime: "3 min read",
  },
  {
    id: 5,
    slug: "developer-guide-to-verification-webhooks",
    title: "A Developer Guide to Verification Webhooks",
    excerpt:
      "What to expect, what to listen for, and how to build reliable integrations around verification events.",
    category: "Developers",
    readTime: "3 min read",
  },
  {
    id: 6,
    slug: "risk-signals-that-matter-in-onboarding",
    title: "Risk Signals That Matter in Onboarding",
    excerpt:
      "Not every flagged case is fraud. Here's how to read verification signals without over-trusting them.",
    category: "Risk",
    readTime: "3 min read",
  },
  {
    id: 7,
    slug: "what-audit-ready-identity-logs-need",
    title: "What Audit-Ready Identity Logs Need",
    excerpt:
      'When a regulator or auditor asks "how do you know," this is what your logs need to answer.',
    category: "Compliance",
    readTime: "3 min read",
  },
  {
    id: 8,
    slug: "reusable-identity-for-marketplaces",
    title: "Reusable Identity for Marketplaces",
    excerpt:
      "Buyers and sellers both benefit from trust that doesn't need to be rebuilt on every platform.",
    category: "Marketplaces",
    readTime: "3 min read",
  },
];

const articleImages = [
  imagery.mobileApplication.src,
  imagery.finance.src,
  imagery.candidateReview.src,
  imagery.mobileApplication.src,
  imagery.developer.src,
  imagery.courierOnboarding.src,
  imagery.candidateReview.src,
  imagery.merchantOrders.src,
];

// Full article bodies are loaded only with an article page.
export const blogArticles: BlogSummary[] = summaries.map((article, index) => ({
  ...article,
  image: articleImages[index],
  author: "Ontiver editorial",
}));

export const getBlogArticleBySlug = (slug: string | undefined) =>
  blogArticles.find((article) => article.slug === slug);
