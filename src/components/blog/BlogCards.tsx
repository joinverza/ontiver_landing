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
      <Link to={articleHref} className="flex h-full flex-col rounded-[24px] outline-offset-8">
        <div className="aspect-[1.4] overflow-hidden rounded-[24px] bg-[#edf5eb]">
          <ArticleImage article={article} />
        </div>
        <div className="flex flex-1 flex-col px-1 pb-2 pt-6">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-meta text-[#002d0e]/55">
            <span className="font-semibold uppercase tracking-[0.1em] text-[#007d21]">{article.category}</span>
            <span aria-hidden="true">/</span>
            <span>{article.readTime}</span>
          </div>
          <h3 className="mt-3 text-card-title font-semibold tracking-[-0.025em] text-[#002d0e] transition-colors group-hover:text-[#007d21]">{article.title}</h3>
          <p className="mt-3 line-clamp-3 text-body text-[#002d0e]/60">{article.excerpt}</p>
          <div className="mt-auto flex items-center justify-between gap-3 border-b border-[#dde6dc] pb-5 pt-6">
            <span className="text-meta text-[#002d0e]/50">{article.date}</span>
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#007d21]">Read more <ArrowUpRight size={17} aria-hidden="true" /></span>
          </div>
        </div>
      </Link>
    </article>
  );
}

export function FeaturedArticleCard({ article }: { article: BlogArticle }) {
  const articleHref = useArticleHref(article.slug);

  return (
    <article data-blog-card className="group overflow-hidden rounded-[32px] bg-[#edf5eb]">
      <Link to={articleHref} className="grid outline-offset-[-4px] lg:min-h-[460px] lg:grid-cols-2">
        <div className="aspect-[1.4] overflow-hidden bg-[#dcebd7] lg:aspect-auto">
          <ArticleImage article={article} lazy={false} />
        </div>
        <div className="flex flex-col items-start justify-center p-6 sm:p-10 lg:p-12">
          <p className="eyebrow">Featured / {article.category}</p>
          <h3 className="mt-5 text-section font-semibold tracking-[-0.035em] text-[#002d0e]">{article.title}</h3>
          <p className="mt-5 text-body text-[#002d0e]/65">{article.excerpt}</p>
          <div className="mt-6 flex flex-wrap items-center gap-4 text-meta text-[#002d0e]/55">
            <span>{article.date}</span>
            <span className="inline-flex items-center gap-1.5"><Clock3 size={14} aria-hidden="true" />{article.readTime}</span>
          </div>
          <span className="button-primary mt-8">Read more <ArrowUpRight size={17} aria-hidden="true" /></span>
        </div>
      </Link>
    </article>
  );
}

export function DarkFeaturedArticleCard({ article }: { article: BlogArticle }) {
  const articleHref = useArticleHref(article.slug);

  return (
    <article data-blog-card className="group overflow-hidden rounded-[32px] bg-[#002d0e]">
      <Link to={articleHref} className="grid outline-offset-[-4px] lg:min-h-[460px] lg:grid-cols-[1.05fr_0.95fr]">
        <div className="flex flex-col items-start justify-center p-6 sm:p-10 lg:p-14">
          <p className="text-meta font-semibold uppercase tracking-[0.14em] text-[#bbecaa]">Cover Story / {article.category}</p>
          <h2 className="mt-5 text-section font-semibold tracking-[-0.035em] text-white">{article.title}</h2>
          <p className="mt-5 text-body text-white/65">{article.excerpt}</p>
          <p className="mt-6 text-meta text-white/50">{article.date} <span className="mx-2" aria-hidden="true">/</span> {article.readTime}</p>
          <span className="mt-8 inline-flex min-h-12 items-center gap-3 rounded-full bg-white px-6 text-sm font-semibold text-[#002d0e]">Read more <ArrowUpRight size={17} aria-hidden="true" /></span>
        </div>
        <div className="aspect-[1.4] overflow-hidden bg-[#061b13] lg:aspect-auto">
          <ArticleImage article={article} />
        </div>
      </Link>
    </article>
  );
}
