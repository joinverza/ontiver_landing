import ActionIcon from "../../../../shared/components/ui/ActionIcon";
import { useState } from "react";
import { Search } from "../../../../shared/components/ui/icons";
import BlogHero from "../components/BlogHero";
import PageFooter from "../../../../shared/components/layout/PageFooter";
import { useBlogLibrary } from "../hooks/useBlogContent";
import { ArticleGridCard } from "../components/BlogCards";
import SlidingPill from "../../../../shared/components/ui/SlidingPill";

const BlogPage = () => {
  const blogArticles = useBlogLibrary();
  const [visibleCount, setVisibleCount] = useState(6);
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");
  const categories = [...new Set(blogArticles.map((article) => article.category))];
  const searchTerm = search.trim().toLowerCase();
  const libraryArticles = blogArticles.filter(
    (article) =>
      (!category || article.category === category) &&
      (!searchTerm ||
        [article.title, article.excerpt, article.category, article.author].some((text) =>
          text.toLowerCase().includes(searchTerm),
        )),
  );
  const gridArticles = libraryArticles.slice(0, visibleCount);
  const canLoadMore = visibleCount < libraryArticles.length;

  const loadMore = () => {
    setVisibleCount((current) => Math.min(current + 6, libraryArticles.length));
  };

  return (
    <main id="main-content" tabIndex={-1} className="bg-surface text-[#002d0e]">
      <BlogHero />
      <section
        id="blog-library"
        data-section-divider="none"
        className="blog-library scroll-mt-24"
        aria-labelledby="blog-library-heading"
      >
        <div className="site-container">
          <h2 id="blog-library-heading" className="sr-only">
            Articles.
          </h2>
          <div className="blog-toolbar">
            <div className="blog-categories">
              <SlidingPill
                label="Article categories"
                value={category}
                options={["", ...categories].map((item) => ({
                  value: item,
                  label: item || "All articles",
                }))}
                onChange={(item) => {
                  setCategory(item);
                  setVisibleCount(6);
                }}
                layout="scroll"
                size="compact"
              />
            </div>
            <label className="blog-search">
              <Search size={19} aria-hidden="true" />
              <input
                type="search"
                aria-label="Search articles"
                placeholder="Search articles"
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value);
                  setVisibleCount(6);
                }}
              />
            </label>
          </div>
          <p className="blog-results-count text-meta text-[#526058]" role="status">
            {libraryArticles.length} articles
          </p>
          <div className="blog-article-grid">
            {gridArticles.map((article, index) => (
              <ArticleGridCard
                key={article.slug}
                article={article}
                index={index}
                priority={index === 0}
              />
            ))}
          </div>
          <div className="blog-load-more">
            <button
              type="button"
              className="button-secondary disabled:cursor-default disabled:opacity-50"
              onClick={loadMore}
              disabled={!canLoadMore}
            >
              {canLoadMore ? (
                <>
                  Load More Articles <ActionIcon direction="down" size={17} aria-hidden="true" />
                </>
              ) : (
                "All Articles Loaded"
              )}
            </button>
          </div>
        </div>
      </section>
      <PageFooter />
    </main>
  );
};

export default BlogPage;
