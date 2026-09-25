import { ArrowUpRight, BookOpen, LifeBuoy, LockKeyhole, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import CurtainFooter from "../components/sections/CurtainFooter/CurtainFooter";
import { blogArticles } from "../data/blog";
import ContextPhoto from "../components/ui/ContextPhoto";
import { imagery } from "../data/imagery";
import { ArticleImage } from "../components/blog/BlogCards";
import type { Audience } from "../lib/audience";

const resourceLinks = [
  { icon: BookOpen, title: "Insights and guides", to: "/blogs" },
  { icon: ShieldCheck, title: "Security and privacy", to: "/security" },
  { icon: LifeBuoy, title: "Help and support", to: "/support" },
  { icon: LockKeyhole, title: "Your privacy choices", to: "/legal" },
];

export default function ResourcesPage({ audience = "individual" }: { audience?: Audience }) {
  const enterprise = audience === "enterprise";
  const selected = blogArticles.filter(article => (enterprise ? ["KYC", "AML", "Developers"] : ["Identity", "Consent", "Marketplaces"]).includes(article.category)).slice(0, 3);
  const articles = selected.length ? selected : blogArticles.slice(0, 3);

  return <main className="bg-white text-[#002d0e]">
    <header className="page-intro">
      <div className="site-container">
        <p className="eyebrow">{enterprise ? "Resources for your team" : "Ontiver resources"}</p>
        <h1 className="mt-5 max-w-[1040px] text-page-hero font-medium">{enterprise ? "Understand identity infrastructure, your way." : "Understand your identity, your way."}</h1>
        <p className="mt-6 max-w-[680px] text-subtitle text-[#526058]">{enterprise ? "Explore source checks, review decisions, consent and reusable proof in Ontiver's planned workflows." : "Learn about organization requests, evidence, consent choices and proof reuse before joining early access."}</p>
      </div>
    </header>
    <section className="site-container pb-10 lg:pb-14" aria-label="Explore Ontiver resources">
      <div className="grid gap-5 md:grid-cols-3">
        <div data-scroll-reveal className="min-w-0 self-center md:col-start-2 md:row-span-2 md:row-start-1">
          <ContextPhoto image={enterprise ? imagery.candidateReview : imagery.studentAdmissions} size="wide" />
        </div>
        {resourceLinks.map(({ icon: Icon, title, to }, index) => <Link key={to} to={enterprise && ["/security", "/support"].includes(to) ? `/enterprise${to}` : to} className={`group flex flex-col justify-between rounded-2xl bg-[#f5f6f3] p-5 transition-colors hover:bg-[#edf5eb] ${index < 2 ? "md:col-start-1" : "md:col-start-3"} ${index % 2 === 0 ? "md:row-start-1" : "md:row-start-2"}`}>
          <Icon className="size-7 text-[#007d21]" aria-hidden="true" />
          <div className="mt-3 flex items-end justify-between gap-4"><h2 className="max-w-56 text-card-title font-medium">{title}</h2><span className="grid size-9 shrink-0 place-items-center rounded-full bg-white"><ArrowUpRight size={19} aria-hidden="true" /></span></div>
        </Link>)}
      </div>
    </section>
    <section className="section-space border-t border-[#e1e6df]">
      <div className="site-container">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-5"><h2 className="section-heading">The latest thinking.</h2><Link to="/blogs" className="button-secondary">All articles<ArrowUpRight size={18} aria-hidden="true" /></Link></div>
        <div className="grid gap-8 md:grid-cols-3">
          {articles.map(article => <Link key={article.slug} to={`/blogs/${article.slug}`} className="group min-w-0">
            <div data-scroll-reveal className="context-photo context-photo--card"><ArticleImage article={article} /></div>
            <p className="mt-5 text-meta text-[#526058]">{article.category} / {article.readTime}</p>
            <h3 className="mt-3 text-card-title font-medium group-hover:text-[#007d21]">{article.title}</h3>
          </Link>)}
        </div>
      </div>
    </section>
    <CurtainFooter audience={audience} />
  </main>;
}
