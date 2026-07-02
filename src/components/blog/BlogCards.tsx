import { Link, useLocation } from "react-router-dom";
import type { CSSProperties, MouseEvent } from "react";
import type { BlogArticle } from "../../data/blog";
import LinkArrow from "../ui/LinkArrow";

function useArticleHref(slug: string) {
  const { pathname } = useLocation();
  const basePath = pathname.startsWith("/resources") ? "/resources/blogs" : "/blogs";
  return `${basePath}/${slug}`;
}

function updateReadingLight(event: MouseEvent<HTMLElement>) {
  const rect = event.currentTarget.getBoundingClientRect();
  event.currentTarget.style.setProperty("--x", `${event.clientX - rect.left}px`);
  event.currentTarget.style.setProperty("--y", `${event.clientY - rect.top}px`);
}

function ReadMoreLink({ light = false }: { light?: boolean }) {
  return (
    <LinkArrow
      variant={light ? "dark" : "light"}
      className={`blog-read-more [--link-arrow-min-width:140px] ${
        light
          ? "border-white/25 text-[#5ff57a]"
          : "border-[#009311]/35 text-[#009311]"
      }`}
    >
      Read more
    </LinkArrow>
  );
}

export function ArticleGridCard({
  article,
  index = 0,
  className = "",
}: {
  article: BlogArticle;
  index?: number;
  className?: string;
}) {
  const articleHref = useArticleHref(article.slug);

  return (
    <article
      data-blog-card
      data-blog-card-index={index}
      className={`blog-grid-card blog-card group relative overflow-hidden rounded-2xl border border-[#00291b]/15 bg-white max-[640px]:mx-auto max-[640px]:w-[min(82vw,300px)] ${className}`}
      onMouseMove={updateReadingLight}
      style={{ "--x": "50%", "--y": "50%" } as CSSProperties}
    >
      <span className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-200 group-hover:opacity-100 [background:radial-gradient(circle_150px_at_var(--x)_var(--y),rgba(0,147,17,0.1),transparent_72%)]" />
      <span className="pointer-events-none absolute inset-x-0 top-0 z-10 h-px origin-left scale-x-0 bg-[linear-gradient(90deg,transparent,#009311,transparent)] transition-transform duration-500 group-hover:scale-x-100" />
      <Link to={articleHref} className="relative z-20 block h-full">
        <div className="blog-card-media aspect-[16/8.5] overflow-hidden bg-[#f1f4ef] sm:aspect-video">
          <img
            src={article.image}
            alt={article.title}
            className="blog-card-image h-full w-full object-cover"
          />
        </div>
        <div className="blog-card-content flex min-h-[170px] flex-col p-4 sm:min-h-[220px] sm:p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#009311]">
            {article.category}
          </p>
          <h3 className="mt-2.5 text-base font-bold leading-snug text-[#05150E] transition-colors duration-150 group-hover:text-[#009311] sm:text-lg">
            {article.title}
          </h3>
          <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-black/60 sm:mt-3 sm:line-clamp-3 sm:text-sm">
            {article.excerpt}
          </p>
          <div className="mt-auto flex items-center justify-between gap-3 pt-4 sm:pt-6">
            <span className="text-xs font-medium text-black/35">{article.date}</span>
            <ReadMoreLink />
          </div>
        </div>
      </Link>
    </article>
  );
}

export function FeaturedArticleCard({ article }: { article: BlogArticle }) {
  const articleHref = useArticleHref(article.slug);

  return (
    <article
      data-blog-card
      className="blog-feature-card blog-card group rounded-2xl border border-[#00291b]/15 bg-white p-3 sm:p-4 md:p-8 max-[640px]:mx-auto max-[640px]:w-[min(82vw,300px)]"
      onMouseMove={updateReadingLight}
      style={{ "--x": "50%", "--y": "50%" } as CSSProperties}
    >
      <Link to={articleHref} className="grid gap-4 md:gap-7 lg:grid-cols-[1.08fr_0.92fr]">
        <div className="blog-card-media aspect-[16/8.5] overflow-hidden rounded-xl bg-[#f1f4ef] sm:aspect-[16/10] lg:min-h-[320px] lg:aspect-auto">
          <img
            src={article.image}
            alt={article.title}
            className="blog-card-image h-full w-full object-cover"
          />
        </div>
        <div className="blog-card-content flex flex-col py-1">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#009311]">
            Featured
          </p>
          <h2 className="mt-3 text-xl font-bold leading-[1.2] text-[#05150E] sm:mt-4 sm:text-2xl sm:leading-[1.3]">
            {article.title}
          </h2>
          <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-black/60 sm:mt-4 sm:line-clamp-3 sm:text-[15px]">
            {article.excerpt}
          </p>
          <div className="mt-auto flex items-center justify-between gap-3 pt-5 sm:pt-8">
            <span className="text-sm font-medium text-black/35">{article.date}</span>
            <ReadMoreLink />
          </div>
        </div>
      </Link>
    </article>
  );
}

export function DarkFeaturedArticleCard({ article }: { article: BlogArticle }) {
  const articleHref = useArticleHref(article.slug);

  return (
    <article
      data-blog-card
      className="blog-cover-card blog-card group overflow-hidden rounded-2xl bg-[#0F1A13] max-[640px]:mx-auto max-[640px]:w-[min(82vw,300px)]"
      onMouseMove={updateReadingLight}
      style={{ "--x": "50%", "--y": "50%" } as CSSProperties}
    >
      <Link to={articleHref} className="grid lg:min-h-[360px] lg:grid-cols-[1.05fr_0.95fr]">
        <div className="blog-card-media relative aspect-[16/8.5] overflow-hidden sm:aspect-[16/10] lg:min-h-[280px] lg:aspect-auto">
          <img
            src={article.image}
            alt={article.title}
            className="blog-card-image h-full w-full object-cover"
          />
          <span className="absolute inset-0 bg-[linear-gradient(to_right,transparent_60%,#0F1A13)] opacity-80 transition-opacity duration-300 group-hover:opacity-50" />
        </div>
        <div className="blog-card-content flex flex-col p-4 sm:p-8 lg:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#5ff57a]">
            Cover Story
          </p>
          <h2 className="mt-3 text-xl font-bold leading-[1.2] text-white sm:mt-4 sm:text-2xl sm:leading-[1.3]">
            {article.title}
          </h2>
          <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-white/65 sm:mt-4 sm:line-clamp-4 sm:text-[15px]">
            {article.excerpt}
          </p>
          <div className="mt-auto flex items-center justify-between gap-3 pt-5 sm:pt-8">
            <span className="text-sm font-medium text-white/35">{article.date}</span>
            <ReadMoreLink light />
          </div>
        </div>
      </Link>
    </article>
  );
}
