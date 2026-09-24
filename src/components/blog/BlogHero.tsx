import { ArrowDown, ArrowUpRight } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export default function BlogHero() {
  const { pathname } = useLocation();
  const basePath = pathname.startsWith("/resources") ? "/resources/blogs" : "/blogs";

  return (
    <section className="page-intro overflow-hidden">
      <div className="site-container grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
        <div>
          <p className="eyebrow">The Ontiver journal</p>
          <h1 className="mt-5 max-w-[800px] text-page-hero font-semibold tracking-[-0.045em] text-[#002d0e]">
            Insights on Identity, Compliance, and Trust Infrastructure
          </h1>
          <p className="mt-6 max-w-[560px] text-subtitle text-[#002d0e]/65">
            Explore practical guides, compliance insights, developer resources,
            and research on reusable identity, KYC optimization, AML, and
            digital trust systems.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a className="button-primary" href="#blog-library">
              Explore Resources <ArrowDown size={17} aria-hidden="true" />
            </a>
            <Link className="button-secondary" to={`${basePath}/developer-guide-to-verification-webhooks`}>
              Read Integration Guide <ArrowUpRight size={17} aria-hidden="true" />
            </Link>
          </div>
        </div>
        <div className="relative flex aspect-[1.08] items-center justify-center overflow-hidden rounded-[32px] bg-[#dcebd7] p-5 sm:p-8">
          <img src="/assets/hero-blog.png" alt="Illustration of identity and trust resources" className="h-full w-full object-contain" />
        </div>
      </div>
    </section>
  );
}
