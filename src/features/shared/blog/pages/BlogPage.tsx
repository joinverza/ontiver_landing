import { useState } from "react";
import { ArrowDown } from "lucide-react";
import BlogHero from "../components/BlogHero";
import PageFooter from "../../../../shared/components/layout/PageFooter";
import { blogArticles } from "../data/summaries";
import {
  ArticleGridCard,
  DarkFeaturedArticleCard,
  FeaturedArticleCard,
} from "../components/BlogCards";

const BlogPage = () => {
  const [visibleCount, setVisibleCount] = useState(3);
  const featured = blogArticles[0];
  const darkFeature = blogArticles[4];
  const libraryArticles = blogArticles.filter(
    (article) => article !== featured && article !== darkFeature,
  );
  const gridArticles = libraryArticles.slice(0, visibleCount);
  const canLoadMore = visibleCount < libraryArticles.length;

  const loadMore = () => {
    setVisibleCount((current) => Math.min(current + 3, libraryArticles.length));
  };

  return (
    <main id="main-content" tabIndex={-1} className="bg-white text-[#002d0e]">
      <BlogHero />
      <section id="blog-library" className="scroll-mt-24 pb-16 lg:pb-28">
        <div className="site-container">
          <h2 className="section-heading mb-10">Featured.</h2>
          <FeaturedArticleCard article={featured} />
        </div>
      </section>
      <section className="section-space border-t border-[#e1e6df]">
        <div className="site-container">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4 border-b border-[#dde6dc] pb-7">
            <div>
              <h2 className="section-heading">Articles.</h2>
            </div>
            <p className="text-meta font-medium text-[#002d0e]/55">
              {blogArticles.length} articles
            </p>
          </div>
          <div className="grid gap-x-7 gap-y-12 md:grid-cols-2 lg:grid-cols-3" aria-live="polite">
            {gridArticles.map((article, index) => (
              <ArticleGridCard key={article.slug} article={article} index={index} />
            ))}
          </div>
          <div className="mt-12 text-center">
            <button
              type="button"
              className="button-secondary disabled:cursor-default disabled:opacity-50"
              onClick={loadMore}
              disabled={!canLoadMore}
            >
              {canLoadMore ? (
                <>
                  Load More Articles <ArrowDown size={17} aria-hidden="true" />
                </>
              ) : (
                "All Articles Loaded"
              )}
            </button>
          </div>
        </div>
      </section>
      {darkFeature && (
        <section className="section-space">
          <div className="site-container">
            <DarkFeaturedArticleCard article={darkFeature} />
          </div>
        </section>
      )}
      <PageFooter />
    </main>
  );
};

export default BlogPage;
