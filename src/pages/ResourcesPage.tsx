import { ArrowUpRight, BookOpen, LifeBuoy, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import StandalonePage, { EditorialPhoto } from "../components/ui/StandalonePage";
import { blogArticles } from "../data/blog";
import { getImageAlt, getImagePosition, imagery } from "../data/imagery";
import type { Audience } from "../lib/audience";

const resourceLinks = [
  { icon: BookOpen, title: "Insights and guides", description: "Ideas for understanding and building with reusable identity.", to: "/blogs" },
  { icon: ShieldCheck, title: "Security and privacy", description: "Explore the principles behind permission and proof.", to: "/security" },
  { icon: LifeBuoy, title: "Help and support", description: "Get help with a question or an existing request.", to: "/support" },
];

export default function ResourcesPage({ audience = "individual" }: { audience?: Audience }) {
  const enterprise = audience === "enterprise";
  const featured = enterprise
    ? blogArticles.filter(article => ["KYC", "AML", "Developers"].includes(article.category)).slice(0, 3)
    : blogArticles.filter(article => ["Identity", "Consent", "Marketplaces"].includes(article.category)).slice(0, 3);
  const articles = featured.length ? featured : blogArticles.slice(0, 3);

  return (
    <StandalonePage
      audience={audience}
      eyebrow={enterprise ? "Resources for your team" : "Ontiver resources"}
      title={enterprise ? <>Build with<br /><span className="text-[#007d21]">better context.</span></> : <>A clearer view<br /><span className="text-[#007d21]">of your identity.</span></>}
      description={enterprise ? "Explore verification, consent, and the ideas behind reusable trust." : "Get to know your proof, your privacy, and your sharing choices."}
      visual={<div className="aspect-[1.3] overflow-hidden rounded-[28px]"><EditorialPhoto image={enterprise ? imagery.work : imagery.education} /></div>}
      secondaryAction={{ label: "Browse all articles", to: "/blogs" }}
      finalTitle={enterprise ? "Have a workflow in mind?" : "Your identity journey starts here."}
    >
      <section className="section-space" aria-label="Resource categories">
        <div className="site-container grid gap-8 md:grid-cols-3 lg:gap-12">
          {resourceLinks.map(({ icon: Icon, title, description, to }) => (
            <Link key={to} to={enterprise && to !== "/blogs" ? `/enterprise${to}` : to} className="group border-t border-[#d7e3d2] pt-7">
              <Icon className="mb-7 size-8 text-[#007d21]" aria-hidden="true" />
              <div className="flex items-start justify-between gap-4"><h2 className="text-card-title font-semibold group-hover:text-[#007d21]">{title}</h2><ArrowUpRight className="mt-1 size-5 shrink-0 text-[#007d21]" aria-hidden="true" /></div>
              <p className="mt-4 text-body text-[#526058]">{description}</p>
            </Link>
          ))}
        </div>
      </section>
      <section className="section-space bg-[#f7f9f6]">
        <div className="site-container">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-5"><h2 className="section-heading">Worth a closer look.</h2><Link to="/blogs" className="inline-flex items-center gap-2 text-body font-semibold text-[#007d21]">All articles<ArrowUpRight size={18} aria-hidden="true" /></Link></div>
          <div className="grid gap-8 md:grid-cols-3">
            {articles.map(article => (
              <Link key={article.slug} to={`/blogs/${article.slug}`} className="group rounded-[28px]">
                <div className="aspect-[1.35] overflow-hidden rounded-[28px] bg-[#edf5e7]"><img src={article.image} alt={getImageAlt(article.image)} loading="lazy" className="h-full w-full object-cover" style={{ objectPosition: getImagePosition(article.image) }} /></div>
                <p className="mt-5 text-meta font-medium text-[#007d21]">{article.category} / {article.readTime}</p>
                <h3 className="mt-3 text-card-title font-semibold group-hover:text-[#007d21]">{article.title}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </StandalonePage>
  );
}
