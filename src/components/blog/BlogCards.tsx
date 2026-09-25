import { ArrowUpRight, Clock3 } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import type { BlogArticle } from "../../data/blog";
import { getImageAlt, getImagePosition } from "../../data/imagery";

function useArticleHref(slug: string) {
  const { pathname } = useLocation();
  const basePath = pathname.startsWith("/resources") ? "/resources/blogs" : "/blogs";
  return `${basePath}/${slug}`;
}

export function ArticleImage({ article, lazy = true }: { article: BlogArticle; lazy?: boolean }) {
  if (article.image.endsWith(".svg")) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-[#dcebd7] p-8">
        <div className="grid h-36 w-36 place-items-center rounded-full border border-[#c7dfc4] bg-[#edf5eb] sm:h-44 sm:w-44">
          <img src={article.image} alt={article.title} loading={lazy ? "lazy" : undefined} className="h-20 w-20 object-contain" />
        </div>
      </div>
    );
  }

  return <img src={article.image} alt={getImageAlt(article.image) || article.title} loading={lazy ? "lazy" : undefined} className="h-full w-full object-cover" style={{ objectPosition: getImagePosition(article.image) }} />;
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
    <article data-blog-card data-blog-card-index={index} className={`group min-w-0 ${className}`}>
      <Link to={articleHref} className="flex h-full flex-col rounded-2xl outline-offset-8">
        <div data-scroll-reveal className="context-photo context-photo--card relative [&>img]:transition-transform [&>img]:duration-500 motion-safe:group-hover:[&>img]:scale-[1.03]">
          <ArticleImage article={article} />
          <span className="absolute bottom-4 right-4 grid size-11 place-items-center rounded-full bg-white text-[#002d0e]"><ArrowUpRight size={22} aria-hidden="true" /></span>
        </div>
        <div className="flex flex-1 flex-col px-1 pb-2 pt-4">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-meta text-[#002d0e]/55">
            <span className="font-semibold uppercase tracking-[0.1em] text-[#007d21]">{article.category}</span>
            <span aria-hidden="true">/</span>
            <span>{article.readTime}</span>
          </div>
          <h3 className="mt-3 text-card-title font-medium text-[#002d0e] transition-colors group-hover:text-[#007d21]">{article.title}</h3>
          <p className="mt-4 text-body text-[#002d0e]/65">{article.excerpt}</p>
          <div className="mt-auto flex items-center justify-between gap-3 border-b border-[#dde6dc] pb-5 pt-6">
            <span className="text-meta text-[#002d0e]/50">{article.date || article.author}</span>
          </div>
        </div>
      </Link>
    </article>
  );
}

export function FeaturedArticleCard({ article }: { article: BlogArticle }) {
  const articleHref = useArticleHref(article.slug);

  return (
    <article data-blog-card className="group overflow-hidden rounded-2xl bg-[#f5f6f3] p-5 sm:p-8">
      <Link to={articleHref} className="grid gap-6 outline-offset-8 lg:grid-cols-2 lg:gap-10">
        <div data-scroll-reveal className="context-photo context-photo--wide relative lg:order-2">
          <ArticleImage article={article} lazy={false} />
          <span className="absolute bottom-4 right-4 grid size-12 place-items-center rounded-full bg-white"><ArrowUpRight size={24} aria-hidden="true" /></span>
        </div>
        <div className="flex flex-col items-start justify-center py-4 lg:order-1">
          <p className="eyebrow">Featured / {article.category}</p>
          <h3 className="mt-5 text-card-title font-medium text-[#002d0e]">{article.title}</h3>
          <p className="mt-5 text-body text-[#002d0e]/65">{article.excerpt}</p>
          <div className="mt-6 flex flex-wrap items-center gap-4 text-meta text-[#002d0e]/55">
            {article.date && <span>{article.date}</span>}
            <span className="inline-flex items-center gap-1.5"><Clock3 size={14} aria-hidden="true" />{article.readTime}</span>
          </div>
          <span className="mt-8 inline-flex items-center gap-2 text-body font-medium">Read article <ArrowUpRight size={19} aria-hidden="true" /></span>
        </div>
      </Link>
    </article>
  );
}

export function DarkFeaturedArticleCard({ article }: { article: BlogArticle }) {
  const articleHref = useArticleHref(article.slug);

  return (
    <article data-blog-card data-scroll-reveal className="group relative overflow-hidden rounded-2xl bg-[#002d0e]">
      <Link to={articleHref} className="relative flex min-h-[300px] items-end outline-offset-[-4px] sm:min-h-[360px]">
        <div className="absolute inset-0"><ArticleImage article={article} /><div className="absolute inset-0 bg-gradient-to-r from-[#002d0e]/95 via-[#002d0e]/75 to-[#002d0e]/10" /></div>
        <div className="relative max-w-[860px] p-6 sm:p-8">
          <p className="text-meta font-semibold uppercase tracking-[0.14em] text-[#bbecaa]">Cover Story / {article.category}</p>
          <h2 className="mt-5 text-section font-medium text-white">{article.title}</h2>
          <p className="mt-5 max-w-[650px] text-body text-white/80">{article.excerpt}</p>
          <p className="mt-6 text-meta text-white/65">{article.date && <>{article.date} <span className="mx-2" aria-hidden="true">/</span></>}{article.readTime}</p>
          <span className="mt-8 inline-flex min-h-12 items-center gap-3 rounded-full bg-white px-6 text-sm font-semibold text-[#002d0e]">Read more <ArrowUpRight size={17} aria-hidden="true" /></span>
        </div>
      </Link>
    </article>
  );
}
