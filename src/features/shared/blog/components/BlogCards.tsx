import ActionIcon from "../../../../shared/components/ui/ActionIcon";
import { Link, useLocation } from "react-router-dom";
import type { BlogSummary } from "../data/summaries";
import { SiteImage } from "../../../../shared/components/media/SiteImage";
import "../blog.css";

function useArticleHref(slug: string) {
  const { pathname } = useLocation();
  const basePath = pathname.startsWith("/resources") ? "/resources/blogs" : "/blogs";
  return `${basePath}/${slug}`;
}

export const ArticleImage = ({
  article,
  lazy = true,
  sizes,
}: {
  article: BlogSummary;
  lazy?: boolean;
  sizes?: string;
}) => {
  if (article.image.endsWith(".svg")) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-[#dcebd7] p-8">
        <div className="grid h-36 w-36 place-items-center rounded-full border border-[#c7dfc4] bg-[#edf5eb] sm:h-44 sm:w-44">
          <img
            src={article.image}
            alt={article.title}
            loading={lazy ? "lazy" : undefined}
            className="h-20 w-20 object-contain"
          />
        </div>
      </div>
    );
  }

  return (
    <SiteImage
      src={article.image}
      alt={article.imageAlt}
      width={article.imageWidth}
      height={article.imageHeight}
      priority={!lazy}
      sizes={sizes}
      className="h-full w-full object-cover"
      style={{ objectPosition: article.imagePosition }}
    />
  );
};

export const ArticleGridCard = ({
  article,
  index = 0,
  className = "",
  priority = false,
}: {
  article: BlogSummary;
  index?: number;
  className?: string;
  priority?: boolean;
}) => {
  const articleHref = useArticleHref(article.slug);

  return (
    <article
      data-blog-card
      data-blog-card-index={index}
      className={`blog-card group min-w-0 ${className}`}
    >
      <Link to={articleHref} className="flex h-full flex-col rounded-2xl outline-offset-8">
        <div className="blog-card-media context-photo context-photo--card relative [&>img]:transition-transform [&>img]:duration-500 motion-safe:group-hover:[&>img]:scale-[1.03]">
          <ArticleImage
            article={article}
            lazy={!priority}
            sizes="(min-width: 2400px) 1200px, (min-width: 768px) 50vw, 100vw"
          />
          <span className="absolute bottom-4 right-4 grid size-11 place-items-center rounded-full bg-surface text-[#002d0e]">
            <ActionIcon size={22} aria-hidden="true" />
          </span>
        </div>
        <div className="blog-card-content flex flex-1 flex-col pb-2 pt-5">
          <div className="blog-card-meta flex flex-wrap items-center justify-between gap-x-3 gap-y-2 text-meta text-[#526058]">
            <span className="font-medium text-[#002d0e]">{article.author}</span>
            <span className="flex flex-wrap gap-x-4 gap-y-1">
              {article.date && <span>{article.date}</span>}
              <span>{article.readTime}</span>
            </span>
          </div>
          <h3 className="blog-card-title mt-4 text-card-title font-medium text-[#002d0e] transition-colors group-hover:text-accent">
            {article.title}
          </h3>
          <p className="mt-3 text-body text-[#002d0e]/65">{article.excerpt}</p>
          <div className="blog-card-tags mt-auto flex items-center gap-3 pt-6">
            <span className="blog-category-chip">{article.category}</span>
          </div>
        </div>
      </Link>
    </article>
  );
};

export const DarkFeaturedArticleCard = ({ article }: { article: BlogSummary }) => {
  const articleHref = useArticleHref(article.slug);

  return (
    <article
      data-blog-card
      data-scroll-reveal
      className="group relative overflow-hidden rounded-2xl bg-[#002d0e]"
    >
      <Link
        to={articleHref}
        className="relative flex min-h-[300px] items-end outline-offset-[-4px] sm:min-h-[360px]"
      >
        <div className="absolute inset-0">
          <ArticleImage article={article} />
          <div className="absolute inset-0 bg-gradient-to-r from-[#002d0e]/95 via-[#002d0e]/75 to-[#002d0e]/10" />
        </div>
        <div className="relative max-w-[860px] p-6 sm:p-8">
          <p className="text-meta font-semibold uppercase tracking-[0.14em] text-[#bbecaa]">
            Cover Story / {article.category}
          </p>
          <h2 className="mt-5 text-section font-medium text-white">{article.title}</h2>
          <p className="mt-5 max-w-[650px] text-body text-white/80">{article.excerpt}</p>
          <p className="mt-6 text-meta text-white/65">
            {article.date && (
              <>
                {article.date}{" "}
                <span className="mx-2" aria-hidden="true">
                  /
                </span>
              </>
            )}
            {article.readTime}
          </p>
          <span className="mt-8 inline-flex min-h-12 items-center gap-3 rounded-full bg-surface px-6 text-sm font-semibold text-[#002d0e]">
            Read more <ActionIcon size={17} aria-hidden="true" />
          </span>
        </div>
      </Link>
    </article>
  );
};
