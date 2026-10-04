import { useEffect, useMemo, useState } from "react";
import { getPublishedContent, listPublishedContent } from "../../../../shared/lib/landingApi";
import { blogArticles as bundledSummaries } from "../data/summaries";
import { cmsEntryToArticle, mergeLibrary, type CmsArticle, type LibraryArticle } from "../data/cmsArticles";

// One request per page load, shared by the blog index, article pages and resources.
let libraryRequest: Promise<CmsArticle[]> | null = null;

const loadCmsLibrary = () => {
  libraryRequest ??= listPublishedContent("blog", 50)
    .then((result) => result.items.map(cmsEntryToArticle))
    .catch(() => {
      libraryRequest = null; // Retry on the next page; the bundled library stays visible meanwhile.
      return [];
    });
  return libraryRequest;
};

/** Bundled articles render immediately (and in prerendered HTML); published CMS posts merge in. */
export const useBlogLibrary = () => {
  const [cms, setCms] = useState<CmsArticle[]>([]);
  useEffect(() => {
    let active = true;
    void loadCmsLibrary().then((items) => {
      if (active) setCms(items);
    });
    return () => {
      active = false;
    };
  }, []);
  return useMemo<LibraryArticle[]>(() => mergeLibrary(cms, bundledSummaries), [cms]);
};

export type ArticleState<T> =
  | { status: "ready"; article: T }
  | { status: "loading" }
  | { status: "missing" };

/**
 * A single article: the CMS version wins when published, otherwise the bundled article.
 * Unknown slugs resolve to "missing" instead of silently showing a different post.
 */
export const useBlogArticle = <T extends { slug: string }>(slug: string | undefined, bundled: T | undefined) => {
  const [cms, setCms] = useState<{ slug: string; article: CmsArticle | null } | null>(null);

  useEffect(() => {
    if (!slug) return;
    let active = true;
    getPublishedContent("blog", slug)
      .then((entry) => {
        if (active) setCms({ slug, article: cmsEntryToArticle(entry, 0) });
      })
      .catch(() => {
        if (active) setCms({ slug, article: null });
      });
    return () => {
      active = false;
    };
  }, [slug]);

  const settled = cms?.slug === slug ? cms : null;
  if (settled?.article) return { status: "ready", article: settled.article } as const;
  if (bundled) return { status: "ready", article: bundled } as const;
  return settled ? ({ status: "missing" } as const) : ({ status: "loading" } as const);
};
