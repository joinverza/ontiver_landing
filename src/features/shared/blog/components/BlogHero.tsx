import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import type { BlogSummary } from "../data/summaries";
import { ArticleImage } from "./BlogCards";

const BlogHero = ({ featured }: { featured: BlogSummary }) => {
  return (
    <header className="page-intro">
      <div className="site-container grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
        <div className="min-w-0">
          <p className="eyebrow">The Ontiver journal</p>
          <h1 className="mt-5 max-w-[1100px] text-page-hero font-medium">
            Ideas on identity, verification, and trust.
          </h1>
          <p className="mt-6 max-w-[760px] text-subtitle text-[#002d0e]/65">
            Practical guides for the people building and using identity workflows.
          </p>
          <a href="#blog-library" className="button-primary mt-7">
            Explore the journal <ArrowUpRight size={18} aria-hidden="true" />
          </a>
        </div>
        <Link
          to={`/blogs/${featured.slug}`}
          className="group block min-w-0 rounded-2xl outline-offset-8"
          data-blog-card
        >
          <div data-scroll-reveal className="context-photo context-photo--hero">
            <ArticleImage article={featured} lazy={false} />
          </div>
          <p className="eyebrow mt-5">Featured / {featured.category}</p>
          <h2 className="mt-3 flex items-start gap-4 text-card-title font-medium transition-colors group-hover:text-[#007d21]">
            {featured.title}
            <ArrowUpRight size={24} className="mt-1 shrink-0" aria-hidden="true" />
          </h2>
          <p className="mt-2 text-meta text-[#526058]">
            {featured.readTime} / {featured.author}
          </p>
        </Link>
      </div>
    </header>
  );
};

export default BlogHero;
