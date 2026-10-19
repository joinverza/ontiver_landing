import ActionIcon from "../../../../shared/components/ui/ActionIcon";
import {
  BookOpen,
  LifeBuoy,
  LockKeyhole,
  ShieldCheck,
} from "../../../../shared/components/ui/icons";
import { Link } from "react-router-dom";
import PageFooter from "../../../../shared/components/layout/PageFooter";
import { useBlogLibrary } from "../../blog/hooks/useBlogContent";
import ContextPhoto from "../../../../shared/components/ui/ContextPhoto";
import { editorialPhotos } from "../../../../shared/data/editorialPhotos";
import { ArticleImage } from "../../blog/components/BlogCards";
import type { Audience } from "../../../../shared/lib/audience";
import "./resource-cards.css";

const resourceLinks = [
  {
    icon: BookOpen,
    title: "Insights and guides",
    description: "Practical explainers on identity, consent, and verification workflows.",
    action: "Explore guides",
    to: "/blogs",
  },
  {
    icon: ShieldCheck,
    title: "Security and privacy",
    description: "Understand access, data handling, and review responsibilities.",
    action: "Explore security",
    to: "/security",
  },
  {
    icon: LifeBuoy,
    title: "Help and support",
    description: "Find answers or contact the team about a request.",
    action: "Get support",
    to: "/support",
  },
  {
    icon: LockKeyhole,
    title: "Your privacy choices",
    description: "Review privacy information and account rights requests.",
    action: "View your choices",
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
    <main id="main-content" tabIndex={-1} className="bg-surface text-[#002d0e]">
      <header className="page-intro">
        <div
          className={`site-container split-hero-grid ${enterprise ? "split-hero-grid--image-left" : ""}`}
        >
          <div className="page-hero-content">
            <p className="eyebrow">
              {enterprise ? "Resources for your team" : "Ontiver resources"}
            </p>
            <h1 className="mt-5 text-page-hero font-medium">
              {enterprise
                ? "Understand identity infrastructure, your way."
                : "Understand your identity, your way."}
            </h1>
            <p className="page-hero-description mt-6 text-subtitle text-[#526058]">
              {enterprise
                ? "Explore source checks, review decisions, consent and reusable proof in Ontiver's planned workflows."
                : "Learn about organization requests, evidence, consent choices and proof reuse before joining early access."}
            </p>
            <div className="page-hero-actions">
              <a href="#resource-topics" className="button-primary">
                Explore the guides <ActionIcon size={18} aria-hidden="true" />
              </a>
            </div>
          </div>
          <div className="page-hero-media hero-media-enter">
            <ContextPhoto
              image={enterprise ? editorialPhotos.enterpriseResources : editorialPhotos.resources}
              priority
              sizes="(min-width: 1024px) 47vw, 100vw"
              caption={
                enterprise
                  ? "From source checks to decisions your team can explain."
                  : "Clearer answers about the information you share."
              }
            />
          </div>
        </div>
      </header>
      <section
        id="resource-topics"
        className="section-space site-container scroll-mt-28"
        aria-label="Explore Ontiver resources"
      >
        <div className="resource-tiles">
          {resourceLinks.map(({ icon: Icon, title, description, action, to }) => (
            <Link
              key={to}
              to={enterprise && ["/security", "/support"].includes(to) ? `/enterprise${to}` : to}
              className="surface-card resource-tile"
              aria-labelledby={`resource-${to.slice(1)}-title`}
              aria-describedby={`resource-${to.slice(1)}-description`}
            >
              <Icon className="resource-tile-icon" size={32} aria-hidden="true" />
              <h2 id={`resource-${to.slice(1)}-title`} className="resource-tile-title">
                {title}
              </h2>
              <p id={`resource-${to.slice(1)}-description`} className="resource-tile-description">
                {description}
              </p>
              <span className="resource-tile-action" aria-hidden="true">
                <span>{action}</span>
                <ActionIcon size={24} />
              </span>
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
              <ActionIcon size={18} aria-hidden="true" />
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
                <h3 className="mt-3 text-card-title font-medium group-hover:text-accent">
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
