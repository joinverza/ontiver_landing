import { useEffect, useRef, useState } from "react";
import { ArrowDown } from "lucide-react";
import BlogHero from "../components/blog/BlogHero";
import LoadingDots from "../components/blog/LoadingDots";
import CurtainFooter from "../components/sections/CurtainFooter/CurtainFooter";
import { blogArticles } from "../data/blog";
import { ArticleGridCard, DarkFeaturedArticleCard, FeaturedArticleCard } from "../components/blog/BlogCards";

export default function BlogPage() {
  const [visibleCount, setVisibleCount] = useState(3);
  const [loading, setLoading] = useState(false);
  const loadTimer = useRef<number | undefined>(undefined);
  const featured = blogArticles[0];
  const darkFeature = blogArticles[4];
  const libraryArticles = blogArticles.filter((article) => article !== featured && article !== darkFeature);
  const gridArticles = libraryArticles.slice(0, visibleCount);
  const canLoadMore = visibleCount < libraryArticles.length;

  useEffect(() => () => window.clearTimeout(loadTimer.current), []);

  const loadMore = () => {
    if (!canLoadMore || loading) return;
    setLoading(true);
    loadTimer.current = window.setTimeout(() => {
      setVisibleCount((current) => Math.min(current + 3, libraryArticles.length));
      setLoading(false);
    }, 450);
  };

  return (
    <main id="blog" className="bg-white text-[#002d0e]">
      <BlogHero />
      <section id="blog-library" className="section-space scroll-mt-24">
        <div className="site-container">
          <div className="mb-8 grid gap-4 md:grid-cols-[1fr_330px] md:items-end">
            <div>
              <p className="eyebrow">Featured Insight</p>
              <h2 className="section-heading mt-3">Start with the core story.</h2>
            </div>
            <p className="text-body text-[#002d0e]/60">The latest selected article from the active resource view.</p>
          </div>
          <FeaturedArticleCard article={featured} />
        </div>
      </section>
      <section className="section-space bg-[#f7f7f7]">
        <div className="site-container">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4 border-b border-[#dde6dc] pb-7">
            <div>
              <p className="eyebrow">Resource Library</p>
              <h2 className="section-heading mt-3">Browse practical playbooks.</h2>
            </div>
            <p className="text-meta font-medium text-[#002d0e]/55">{blogArticles.length} articles</p>
          </div>
          <div className="grid gap-x-7 gap-y-12 md:grid-cols-2 lg:grid-cols-3" aria-live="polite" aria-busy={loading}>
            {gridArticles.map((article, index) => <ArticleGridCard key={article.slug} article={article} index={index} />)}
          </div>
          <div className="mt-12 text-center">
            <button type="button" className="button-secondary disabled:cursor-default disabled:opacity-50" onClick={loadMore} disabled={loading || !canLoadMore}>
              {loading ? <span className="inline-flex items-center">Loading<LoadingDots /></span> : canLoadMore ? <>Load More Articles <ArrowDown size={17} aria-hidden="true" /></> : "All Articles Loaded"}
            </button>
          </div>
        </div>
      </section>
      {darkFeature && <section className="section-space"><div className="site-container"><DarkFeaturedArticleCard article={darkFeature} /></div></section>}
      <CurtainFooter />
    </main>
  );
}
