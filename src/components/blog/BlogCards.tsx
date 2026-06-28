import { Link, useLocation } from "react-router-dom";
import type { CSSProperties, MouseEvent } from "react";
import type { BlogArticle } from "../../data/blog";

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
    <span
      className={`blog-read-more relative inline-flex items-center gap-1 text-sm font-bold ${
        light ? "text-[#5ff57a]" : "text-[#009311]"
      } after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-200 group-hover:after:scale-x-100`}
    >
      Read more
      <span aria-hidden="true">+</span>
    </span>
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
      className={`blog-grid-card blog-card group relative overflow-hidden rounded-2xl border border-[#00291b]/15 bg-white ${className}`}
      onMouseMove={updateReadingLight}
      style={{ "--x": "50%", "--y": "50%" } as CSSProperties}
    >
      <span className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-200 group-hover:opacity-100 [background:radial-gradient(circle_150px_at_var(--x)_var(--y),rgba(0,147,17,0.1),transparent_72%)]" />
      <span className="pointer-events-none absolute inset-x-0 top-0 z-10 h-px origin-left scale-x-0 bg-[linear-gradient(90deg,transparent,#009311,transparent)] transition-transform duration-500 group-hover:scale-x-100" />
      <Link to={articleHref} className="relative z-20 block h-full">
        <div className="blog-card-media aspect-[16/10] overflow-hidden bg-[#f1f4ef] sm:aspect-video">
          <img
            src={article.image}
            alt={article.title}
            className="blog-card-image h-full w-full object-cover"
          />
        </div>
        <div className="blog-card-content flex min-h-[210px] flex-col p-5 sm:min-h-[250px]">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#009311]">
            {article.category}
          </p>
          <h3 className="mt-3 text-lg font-bold leading-snug text-[#05150E] transition-colors duration-150 group-hover:text-[#009311]">
            {article.title}
          </h3>
          <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-black/60">
            {article.excerpt}
          </p>
          <div className="mt-auto flex items-center justify-between pt-6">
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
      className="blog-feature-card blog-card group rounded-2xl border border-[#00291b]/15 bg-white p-4 md:p-8"
      onMouseMove={updateReadingLight}
      style={{ "--x": "50%", "--y": "50%" } as CSSProperties}
    >
      <Link to={articleHref} className="grid gap-5 md:gap-7 lg:grid-cols-[1.08fr_0.92fr]">
        <div className="blog-card-media aspect-[16/10] overflow-hidden rounded-xl bg-[#f1f4ef] lg:min-h-[320px] lg:aspect-auto">
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
          <h2 className="mt-4 text-2xl font-bold leading-[1.3] text-[#05150E]">
            {article.title}
          </h2>
          <p className="mt-4 line-clamp-3 text-[15px] leading-relaxed text-black/60">
            {article.excerpt}
          </p>
          <div className="mt-auto flex items-center justify-between pt-8">
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
      className="blog-cover-card blog-card group overflow-hidden rounded-2xl bg-[#0F1A13]"
      onMouseMove={updateReadingLight}
      style={{ "--x": "50%", "--y": "50%" } as CSSProperties}
    >
      <Link to={articleHref} className="grid lg:min-h-[360px] lg:grid-cols-[1.05fr_0.95fr]">
        <div className="blog-card-media relative aspect-[16/10] overflow-hidden lg:min-h-[280px] lg:aspect-auto">
          <img
            src={article.image}
            alt={article.title}
            className="blog-card-image h-full w-full object-cover"
          />
          <span className="absolute inset-0 bg-[linear-gradient(to_right,transparent_60%,#0F1A13)] opacity-80 transition-opacity duration-300 group-hover:opacity-50" />
        </div>
        <div className="blog-card-content flex flex-col p-6 sm:p-8 lg:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#5ff57a]">
            Cover Story
          </p>
          <h2 className="mt-4 text-2xl font-bold leading-[1.3] text-white">
            {article.title}
          </h2>
          <p className="mt-4 line-clamp-4 text-[15px] leading-relaxed text-white/65">
            {article.excerpt}
          </p>
          <div className="mt-auto flex items-center justify-between pt-8">
            <span className="text-sm font-medium text-white/35">{article.date}</span>
            <ReadMoreLink light />
          </div>
        </div>
      </Link>
    </article>
  );
}
