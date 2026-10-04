import { editorialPhotos } from "../../../../shared/data/editorialPhotos";
import {
  resolveApiAssetUrl,
  type LandingContentEntry,
} from "../../../../shared/lib/landingApi";
import type { BlogSummary } from "./summaries";

export type BlogBodyBlock = {
  type: "paragraph" | "heading" | "quote";
  text: string;
  source?: { label: string; href: string };
};

/** A blog post from either the bundled library or the admin-managed CMS. */
export type LibraryArticle = BlogSummary & {
  origin: "bundled" | "cms";
  featured?: boolean;
  seoDescription?: string;
  publishedAt?: string | null;
};

export type CmsArticle = LibraryArticle & { body: BlogBodyBlock[] };

// Posts published without an image borrow the photograph of the matching topic.
const TOPIC_PHOTOS: [RegExp, keyof typeof editorialPhotos][] = [
  [/aml|sanction|screen/i, "blogAml"],
  [/kyc|cost|onboard/i, "blogKyc"],
  [/consent|privacy/i, "blogConsent"],
  [/developer|api|webhook|engineering/i, "blogWebhooks"],
  [/risk|fraud/i, "blogRisk"],
  [/compliance|audit|regulat/i, "blogAudit"],
  [/marketplace|commerce/i, "blogMarketplace"],
];

const photoFor = (entry: LandingContentEntry) => {
  const topic = `${entry.category} ${entry.title}`;
  const key = TOPIC_PHOTOS.find(([pattern]) => pattern.test(topic))?.[1] ?? "blogIdentity";
  return editorialPhotos[key];
};

const READING_WORDS_PER_MINUTE = 220;

const estimateReadTime = (entry: LandingContentEntry) => {
  const words = [entry.excerpt, ...entry.body, ...entry.sections.flatMap((section) => section.body)]
    .join(" ")
    .split(/\s+/)
    .filter(Boolean).length;
  return `${Math.max(1, Math.round(words / READING_WORDS_PER_MINUTE))} min read`;
};

const dateLabel = (entry: LandingContentEntry) => {
  if (entry.dateLabel) return entry.dateLabel;
  if (!entry.publishedAt) return undefined;
  const date = new Date(entry.publishedAt);
  return Number.isNaN(date.getTime())
    ? undefined
    : date.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
};

// The editor uses these placeholder headings when a post has no sections of its own.
const GENERIC_HEADINGS = new Set(["details", "announcement"]);

const bodyBlocks = (entry: LandingContentEntry): BlogBodyBlock[] => {
  if (entry.sections.length) {
    return entry.sections.flatMap((section) => [
      ...(section.heading && !GENERIC_HEADINGS.has(section.heading.toLowerCase())
        ? [{ type: "heading" as const, text: section.heading }]
        : []),
      ...section.body.map((text) => ({ type: "paragraph" as const, text })),
    ]);
  }
  return entry.body.map((text) => ({ type: "paragraph" as const, text }));
};

export const cmsEntryToArticle = (entry: LandingContentEntry, index: number): CmsArticle => {
  const fallback = photoFor(entry);
  const uploaded = Boolean(entry.imageUrl);
  return {
    id: 10_000 + index,
    origin: "cms",
    slug: entry.slug,
    title: entry.title,
    excerpt: entry.excerpt,
    category: entry.category || "Insights",
    readTime: entry.readTime || estimateReadTime(entry),
    date: dateLabel(entry),
    author: entry.author || "Ontiver editorial",
    image: uploaded ? resolveApiAssetUrl(entry.imageUrl) : fallback.src,
    imageAlt: uploaded ? entry.metadata.imageAlt || "" : fallback.alt,
    imagePosition: uploaded ? "50% 50%" : fallback.objectPosition,
    imageWidth: uploaded ? 1600 : fallback.width,
    imageHeight: uploaded ? 1000 : fallback.height,
    featured: entry.featured,
    seoDescription: entry.metadata.seoDescription,
    publishedAt: entry.publishedAt,
    body: bodyBlocks(entry),
  };
};

/**
 * CMS posts lead, newest first; a CMS post with a bundled article's slug replaces it,
 * which lets the team edit launch articles from the admin dashboard.
 */
export const mergeLibrary = (cms: LibraryArticle[], bundled: BlogSummary[]): LibraryArticle[] => {
  const replaced = new Map(cms.map((article) => [article.slug, article]));
  const bundledSlugs = new Set(bundled.map((article) => article.slug));
  const bundledInOrder = bundled.map(
    (article) => replaced.get(article.slug) ?? ({ ...article, origin: "bundled" } as LibraryArticle),
  );
  const fresh = cms
    .filter((article) => !bundledSlugs.has(article.slug))
    .sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)));
  return [...fresh, ...bundledInOrder];
};
