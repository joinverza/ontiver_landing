import { ArrowUpRight, BookOpen, LifeBuoy, LockKeyhole, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import PageFooter from "../../../../shared/components/layout/PageFooter";
import { useBlogLibrary } from "../../blog/hooks/useBlogContent";
import ContextPhoto from "../../../../shared/components/ui/ContextPhoto";
import { editorialPhotos } from "../../../../shared/data/editorialPhotos";
import { ArticleImage } from "../../blog/components/BlogCards";
import type { Audience } from "../../../../shared/lib/audience";

const resourceLinks = [
  {
    icon: BookOpen,
    title: "Insights and guides",
    description: "Practical explainers on identity, consent, and verification workflows.",
    to: "/blogs",
  },
  {
    icon: ShieldCheck,
    title: "Security and privacy",
    description: "Understand access, data handling, and review responsibilities.",
    to: "/security",
  },
  {
    icon: LifeBuoy,
    title: "Help and support",
    description: "Find answers or contact the team about a request.",
    to: "/support",
  },
  {
    icon: LockKeyhole,
    title: "Your privacy choices",
    description: "Review privacy information and account rights requests.",
    to: "/legal",
  },
];

const ResourcesPage = ({ audience = "individual" }: { audience?: Audience }) => {
  const enterprise = audience === "enterprise";
  const blogArticles = useBlogLibrary();
  const selected = blogArticles
    .filter((article) =>
      (enterprise
        ? ["KYC", "AML", "Developers"]
        : ["Identity", "Consent", "Marketplaces"]
      ).includes(article.category),
    )
    .slice(0, 3);
  const articles = selected.length ? selected : blogArticles.slice(0, 3);

  return (
    <main id="main-content" tabIndex={-1} className="bg-white text-[#002d0e]">
      <header className="page-intro">
        <div className="site-container grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="min-w-0">
            <p className="eyebrow">
              {enterprise ? "Resources for your team" : "Ontiver resources"}
            </p>
            <h1 className="mt-5 max-w-[1040px] text-page-hero font-medium">
              {enterprise
                ? "Understand identity infrastructure, your way."
                : "Understand your identity, your way."}
            </h1>
            <p className="mt-6 max-w-[680px] text-subtitle text-[#526058]">
              {enterprise
                ? "Explore source checks, review decisions, consent and reusable proof in Ontiver's planned workflows."
                : "Learn about organization requests, evidence, consent choices and proof reuse before joining early access."}
            </p>
            <a href="#resource-topics" className="button-primary mt-7">
              Explore the guides <ArrowUpRight size={18} aria-hidden="true" />
            </a>
          </div>
          <div data-scroll-reveal className="min-w-0">
            <ContextPhoto
              image={enterprise ? editorialPhotos.enterpriseResources : editorialPhotos.resources}
              priority
            />
            <p className="mt-4 text-meta text-[#526058]">
              {enterprise
                ? "From source checks to decisions your team can explain."
                : "Clearer answers about the information you share."}
            </p>
          </div>
        </div>
      </header>
      <section
        id="resource-topics"
        className="section-space site-container scroll-mt-28"
        aria-label="Explore Ontiver resources"
      >
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {resourceLinks.map(({ icon: Icon, title, description, to }) => (
            <Link
              key={to}
              to={enterprise && ["/security", "/support"].includes(to) ? `/enterprise${to}` : to}
              className="group flex flex-col justify-between rounded-2xl bg-[#f5f6f3] p-5 transition-colors hover:bg-[#edf5eb]"
            >
              <Icon className="size-7 text-[#007d21]" aria-hidden="true" />
              <div className="mt-3 flex items-end justify-between gap-4">
                <div>
                  <h2 className="max-w-56 text-card-title font-medium">{title}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-[#526058]">{description}</p>
                </div>
                <span className="grid size-9 shrink-0 place-items-center rounded-full bg-white">
                  <ArrowUpRight size={19} aria-hidden="true" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <section className="section-space section-flow border-t border-[#e1e6df]">
        <div className="site-container">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-5">
            <div>
              <p className="eyebrow">From the Ontiver team</p>
              <h2 className="section-heading mt-3">The latest thinking.</h2>
              <p className="mt-4 max-w-2xl text-body text-[#526058]">
                Explore practical perspectives on verification, privacy, and workflows. Product
                availability and provider checks are confirmed for each pilot.
              </p>
            </div>
            <Link to="/blogs" className="button-secondary">
              All articles
              <ArrowUpRight size={18} aria-hidden="true" />
            </Link>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {articles.map((article) => (
              <Link key={article.slug} to={`/blogs/${article.slug}`} className="group min-w-0">
                <div data-scroll-reveal className="context-photo context-photo--card">
                  <ArticleImage article={article} />
                </div>
                <p className="mt-5 text-meta text-[#526058]">
                  {article.category} / {article.readTime}
                </p>
                <h3 className="mt-3 text-card-title font-medium group-hover:text-[#007d21]">
                  {article.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#526058]">{article.excerpt}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <PageFooter audience={audience} />
    </main>
  );
};

export default ResourcesPage;
