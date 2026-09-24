import {blogArticles, getBlogArticleBySlug} from "./blog";
import {useCasePageDetails} from "./useCases";
import {platformLayers} from "./platform";

const SITE_URL = "https://ontiver.com";
const DEFAULT_IMAGE = `${SITE_URL}/assets/photos/individual-hero.webp`;
const ENTERPRISE_IMAGE = `${SITE_URL}/assets/photos/teamwork.webp`;

export type SeoMeta = {
  title: string;
  description: string;
  canonicalPath: string;
  image: string;
  type: "website" | "article";
  structuredData: Record<string, unknown>;
};

const baseOrganization = {
  "@type": "Organization",
  name: "Ontiver",
  url: SITE_URL,
  logo: `${SITE_URL}/assets/ontiver-icon.svg`,
};

function normalizePath(pathname: string) {
  const path = pathname.length > 1 ? pathname.replace(/\/+$/, "") : "/";
  if (path === "/blog" || path === "/resources/blogs") return "/blogs";
  if (path === "/pricing") return "/enterprise/pricing";
  const legacyUseCase = path.match(/^\/use-cases\/([^/]+)$/);
  if (legacyUseCase) return `/enterprise/use-cases/${legacyUseCase[1]}`;
  const articleAlias = path.match(/^\/(?:blog|resources\/blogs)\/([^/]+)$/);
  if (articleAlias) return `/blogs/${articleAlias[1]}`;
  return path;
}

export function getSeoMeta(pathname: string): SeoMeta {
  const path = normalizePath(pathname);
  const articleMatch = path.match(/^\/blogs\/([^/]+)$/);
  if (articleMatch) {
    const article = getBlogArticleBySlug(articleMatch[1]) ?? blogArticles[0];
    const canonicalPath = `/blogs/${article.slug}`;
    return {
      title: `${article.title} | Ontiver`,
      description: article.excerpt,
      canonicalPath,
      image: `${SITE_URL}${article.image}`,
      type: "article",
      structuredData: {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: article.title,
        description: article.excerpt,
        image: `${SITE_URL}${article.image}`,
        datePublished: new Date(article.date).toISOString(),
        author: {"@type": "Person", name: article.author},
        publisher: baseOrganization,
        mainEntityOfPage: `${SITE_URL}${canonicalPath}`,
      },
    };
  }

  const useCaseMatch = path.match(/^\/enterprise\/use-cases\/([^/]+)$/);
  if (useCaseMatch && useCasePageDetails[useCaseMatch[1]]) {
    const detail = useCasePageDetails[useCaseMatch[1]];
    return {
      title: `${detail.eyebrow} Identity Verification | Ontiver`,
      description: detail.intro,
      canonicalPath: path,
      image: `${SITE_URL}${detail.imageUrl}`,
      type: "website",
      structuredData: {
        "@context": "https://schema.org",
        "@type": "Service",
        name: `${detail.eyebrow} identity verification`,
        description: detail.intro,
        provider: baseOrganization,
        url: `${SITE_URL}${path}`,
      },
    };
  }

  const platformMatch = path.match(/^\/enterprise\/platform\/([^/]+)$/);
  const layer = platformMatch ? platformLayers.find(item => item.id === platformMatch[1]) : undefined;
  if (layer) {
    return {
      title: `${layer.title} | Ontiver Platform`,
      description: layer.description,
      canonicalPath: path,
      image: ENTERPRISE_IMAGE,
      type: "website",
      structuredData: {
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: `${layer.title} | Ontiver Platform`,
        description: layer.description,
        url: `${SITE_URL}${path}`,
        publisher: baseOrganization,
      },
    };
  }

  const staticMeta: Record<string, Omit<SeoMeta, "canonicalPath" | "structuredData">> = {
    "/identity": {
      title: "Reusable Identity and Sharing Controls | Ontiver",
      description: "Explore reusable identity proof designed around your permission, with fewer repeated document uploads across supported businesses.",
      image: DEFAULT_IMAGE,
      type: "website",
    },
    "/how-it-works": {
      title: "How Reusable Identity Works | Ontiver",
      description: "See the journey from verification to reusable proof, reviewing requests, and choosing what to share with supported services.",
      image: DEFAULT_IMAGE,
      type: "website",
    },
    "/use-cases": {
      title: "Everyday Identity Use Cases | Ontiver",
      description: "Explore how reusable identity can support banking, lending, marketplaces, work, education, and everyday services.",
      image: DEFAULT_IMAGE,
      type: "website",
    },
    "/waitlist": {
      title: "Join the Early Access Waitlist | Ontiver",
      description: "Join the Ontiver waitlist for early access updates about reusable identity and sharing on your terms.",
      image: DEFAULT_IMAGE,
      type: "website",
    },
    "/resources": {
      title: "Identity, Privacy and Sharing Resources | Ontiver",
      description: "Explore guides, privacy information, and support for understanding your identity proof and sharing choices.",
      image: `${SITE_URL}/assets/photos/education.webp`,
      type: "website",
    },
    "/enterprise/resources": {
      title: "Enterprise Verification Resources and Guides | Ontiver",
      description: "Find identity verification, KYC, consent, and integration guides for product, engineering, and compliance teams.",
      image: `${SITE_URL}/assets/photos/work.webp`,
      type: "website",
    },
    "/enterprise/platform": {
      title: "Identity Verification Platform | Ontiver",
      description: "Explore the six Ontiver platform layers connecting identity sources, verification, workflows, intelligence, consent, and reusable proof.",
      image: `${SITE_URL}/assets/photos/enterprise-hero.webp`,
      type: "website",
    },
    "/enterprise/use-cases": {
      title: "Identity Verification Use Cases for Businesses | Ontiver",
      description: "Explore identity workflows for fintechs, lenders, marketplaces, HR platforms, education, and compliance teams.",
      image: ENTERPRISE_IMAGE,
      type: "website",
    },
    "/enterprise/security": {
      title: "Enterprise Security and Privacy Review | Ontiver",
      description: "Explore consent controls, data handling, access, audit records, and security review topics for your Ontiver pilot.",
      image: ENTERPRISE_IMAGE,
      type: "website",
    },
    "/enterprise/support": {
      title: "Enterprise Support | Ontiver",
      description: "Contact Ontiver Support about verification, integration, billing, and other enterprise questions through a private support conversation.",
      image: ENTERPRISE_IMAGE,
      type: "website",
    },
    "/security": {
      title: "Privacy, Consent and Security | Ontiver",
      description: "Explore Ontiver's approach to consent, controlled identity sharing, data minimization, and enterprise security review.",
      image: DEFAULT_IMAGE,
      type: "website",
    },
    "/": {
      title: "Your Reusable Digital Identity | Ontiver",
      description:
        "Verify once, keep control of your trusted credentials, and approve identity reuse across supported services without repeated document uploads.",
      image: DEFAULT_IMAGE,
      type: "website",
    },
    "/enterprise": {
      title: "Enterprise Identity Verification Infrastructure | Ontiver",
      description:
        "Orchestrate identity verification, AML screening, consent, reusable credentials, and audit-ready compliance workflows with Ontiver.",
      image: ENTERPRISE_IMAGE,
      type: "website",
    },
    "/blogs": {
      title: "Identity, KYC and Compliance Insights | Ontiver",
      description:
        "Practical guides for product, engineering, and compliance teams building reusable identity, KYC, AML, and trusted onboarding workflows.",
      image: DEFAULT_IMAGE,
      type: "website",
    },
    "/enterprise/pricing": {
      title: "Enterprise Identity Verification Pricing | Ontiver",
      description:
        "Compare Ontiver plans for reusable identity verification, KYC workflows, developer integrations, and enterprise compliance operations.",
      image: ENTERPRISE_IMAGE,
      type: "website",
    },
    "/contact": {
      title: "Contact and Support for Individuals | Ontiver",
      description:
        "Ask Ontiver about individual early access, reusable identity, consent, privacy, and supported credential-sharing journeys.",
      image: DEFAULT_IMAGE,
      type: "website",
    },
    "/enterprise/contact": {
      title: "Request Enterprise Access | Ontiver",
      description:
        "Tell Ontiver about your identity verification volume, compliance requirements, use case, and rollout timeline.",
      image: ENTERPRISE_IMAGE,
      type: "website",
    },
    "/support": {
      title: "Support | Ontiver",
      description:
        "Contact Ontiver Support without signing in and continue through a secure website conversation or email.",
      image: DEFAULT_IMAGE,
      type: "website",
    },
    "/privacy": {
      title: "Privacy Policy | Ontiver",
      description: "How Ontiver Inc., Nigeria processes and safeguards personal information across its identity services.",
      image: DEFAULT_IMAGE,
      type: "website",
    },
    "/terms": {
      title: "Terms of Use | Ontiver",
      description: "Terms for Ontiver consumer, enterprise, developer, and identity verification services.",
      image: DEFAULT_IMAGE,
      type: "website",
    },
    "/cookies": {
      title: "Cookie Policy | Ontiver",
      description: "Ontiver's use of essential browser storage, preferences, analytics, and diagnostics.",
      image: DEFAULT_IMAGE,
      type: "website",
    },
    "/account-deletion": {
      title: "Account Deletion | Ontiver",
      description: "Initiate deletion of an Ontiver account through the app or a secure email-verified web flow.",
      image: DEFAULT_IMAGE,
      type: "website",
    },
    "/legal": {
      title: "Legal Centre | Ontiver",
      description: "Ontiver policies, terms, privacy choices, and account-deletion information.",
      image: DEFAULT_IMAGE,
      type: "website",
    },
  };
  const selected = staticMeta[path] ?? staticMeta["/"];
  return {
    ...selected,
    canonicalPath: staticMeta[path] ? path : "/",
    structuredData: {
      "@context": "https://schema.org",
      ...baseOrganization,
      description: selected.description,
    },
  };
}
