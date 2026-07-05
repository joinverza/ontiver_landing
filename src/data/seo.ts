import {blogArticles, getBlogArticleBySlug} from "./blog";
import {useCasePageDetails} from "./useCases";

const SITE_URL = "https://ontiver.com";
const DEFAULT_IMAGE = `${SITE_URL}/assets/hero-blog.png`;
const ENTERPRISE_IMAGE = `${SITE_URL}/assets/ontiver-enterprise.png`;

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
  if (pathname === "/blog" || pathname === "/resources" || pathname === "/resources/blogs") return "/blogs";
  if (pathname === "/pricing") return "/enterprise/pricing";
  const legacyUseCase = pathname.match(/^\/use-cases\/([^/]+)$/);
  if (legacyUseCase) return `/enterprise/use-cases/${legacyUseCase[1]}`;
  const articleAlias = pathname.match(/^\/(?:blog|resources\/blogs)\/([^/]+)$/);
  if (articleAlias) return `/blogs/${articleAlias[1]}`;
  return pathname.length > 1 ? pathname.replace(/\/+$/, "") : "/";
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

  const staticMeta: Record<string, Omit<SeoMeta, "canonicalPath" | "structuredData">> = {
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
