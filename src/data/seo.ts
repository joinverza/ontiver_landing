import {blogArticles, getBlogArticleBySlug} from "./blog";
import {useCasePageDetails} from "./useCases";

const SITE_URL = "https://ontiver.com";
const DEFAULT_IMAGE = `${SITE_URL}/assets/hero-blog.png`;

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
  if (pathname === "/blogs" || pathname === "/resources" || pathname === "/resources/blogs") return "/blog";
  const articleAlias = pathname.match(/^\/(?:blogs|resources\/blogs)\/([^/]+)$/);
  if (articleAlias) return `/blog/${articleAlias[1]}`;
  return pathname.length > 1 ? pathname.replace(/\/+$/, "") : "/";
}

export function getSeoMeta(pathname: string): SeoMeta {
  const path = normalizePath(pathname);
  const articleMatch = path.match(/^\/blog\/([^/]+)$/);
  if (articleMatch) {
    const article = getBlogArticleBySlug(articleMatch[1]) ?? blogArticles[0];
    const canonicalPath = `/blog/${article.slug}`;
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

  const useCaseMatch = path.match(/^\/use-cases\/([^/]+)$/);
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
      title: "Reusable Identity Verification Infrastructure | Ontiver",
      description:
        "Ontiver helps businesses verify identity once, reuse trusted proofs with consent, and maintain audit-ready KYC and compliance workflows.",
      image: DEFAULT_IMAGE,
      type: "website",
    },
    "/blog": {
      title: "Identity, KYC and Compliance Insights | Ontiver",
      description:
        "Practical guides for product, engineering, and compliance teams building reusable identity, KYC, AML, and trusted onboarding workflows.",
      image: DEFAULT_IMAGE,
      type: "website",
    },
    "/pricing": {
      title: "Identity Verification Pricing and Plans | Ontiver",
      description:
        "Compare Ontiver plans for reusable identity verification, KYC workflows, developer integrations, and enterprise compliance operations.",
      image: DEFAULT_IMAGE,
      type: "website",
    },
    "/contact": {
      title: "Contact Ontiver | Build Trusted Identity Workflows",
      description:
        "Talk with Ontiver about reusable identity verification, KYC infrastructure, enterprise onboarding, partnerships, and developer integration.",
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
