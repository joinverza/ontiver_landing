import { blogArticles as summaries, type BlogSummary } from "./summaries";
import articleBodies from "./bodies.json";

export type BlogBodyBlock = {
  type: "paragraph" | "heading" | "quote";
  text: string;
  source?: { label: string; href: string };
};

export type BlogArticle = BlogSummary & { body: BlogBodyBlock[] };

const bodies = articleBodies as Record<string, BlogBodyBlock[]>;
export const blogArticles: BlogArticle[] = summaries.map((article) => ({
  ...article,
  body: bodies[article.slug],
}));
export const getBlogArticleBySlug = (slug: string | undefined) =>
  blogArticles.find((article) => article.slug === slug);
