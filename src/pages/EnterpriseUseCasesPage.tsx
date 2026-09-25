import { useState } from "react";
import { ArrowUpRight, Search } from "lucide-react";
import { Link } from "react-router-dom";
import StandalonePage from "../components/ui/StandalonePage";
import { BusinessPhoto } from "../components/business/BusinessPhoto";
import { getIndustryImage } from "../components/business/businessImages";
import { priorityUseCases, useCasePageDetails, type IndustryCategory } from "../data/useCases";

const categories: Array<"All workflows" | IndustryCategory> = ["All workflows", "Finance", "People and work", "Operations and commerce", "Public and community", "Cross-industry"];

export default function EnterpriseUseCasesPage() {
  const [category, setCategory] = useState<(typeof categories)[number]>("All workflows");
  const [search, setSearch] = useState("");
  const allTemplates = Object.values(useCasePageDetails);
  const filtered = allTemplates.filter(item => (category === "All workflows" || item.category === category) && [item.title, item.purpose, ...item.claims].join(" ").toLowerCase().includes(search.trim().toLowerCase()));

  return (
    <StandalonePage
      audience="enterprise"
      eyebrow="Enterprise use cases"
      title={<>One platform.<br /><span className="text-[#007d21]">Your industry's workflow.</span></>}
      description="Connect identity, evidence, consent, and enterprise review across 21 industry templates. Start with one operational journey."
      visual={<div className="h-[260px] overflow-hidden rounded-2xl sm:h-[340px] lg:h-[380px]"><BusinessPhoto image={getIndustryImage("hr-platforms")} priority /></div>}
      secondaryAction={{ label: "Explore the platform", to: "/enterprise/platform" }}
      finalTitle="Start with one workflow."
    >
      <section className="section-space" aria-labelledby="priority-workflows">
        <div className="site-container">
          <div data-scroll-reveal className="mb-8 max-w-[760px]">
            <p className="eyebrow">Start with a focused pilot</p>
            <h2 id="priority-workflows" className="mt-5 text-section font-normal">Built around an operational need.</h2>
            <p className="mt-6 text-body text-[#526058]">Digital lenders, banking and fintech, recruitment and HR, logistics and delivery, marketplaces and sellers, construction and contractors.</p>
          </div>
          <div data-horizontal-cards data-lenis-prevent tabIndex={0} role="region" aria-label="Priority industry cards" className="flex items-start gap-5 overflow-x-auto pb-3 md:grid md:grid-cols-2 md:gap-x-7 md:gap-y-8 md:overflow-visible lg:grid-cols-3">
            {priorityUseCases.map(item => (
              <Link data-scroll-reveal key={item.id} to={`/enterprise/use-cases/${item.id}`} className="group w-[85%] min-w-0 shrink-0 md:w-auto">
                <div className="h-[170px] overflow-hidden rounded-xl sm:h-[200px]"><BusinessPhoto image={getIndustryImage(item.id)} /></div>
                <div className="mt-4 flex items-start justify-between gap-4"><h3 className="text-card-title font-medium group-hover:text-[#007d21]">{item.heroTitle}</h3><ArrowUpRight className="mt-1 size-5 shrink-0 text-[#007d21]" aria-hidden="true" /></div>
                <p className="mt-2 text-sm text-[#526058]">{item.purpose}</p>
              </Link>
            ))}
          </div>
          <div data-scroll-reveal className="mt-9 grid gap-6 rounded-xl bg-[#edf5e7] p-6 lg:grid-cols-[0.8fr_1.2fr]">
            <h3 className="text-card-title font-medium">Start with a focused pilot.</h3>
            <div><p className="text-body text-[#526058]">{priorityUseCases[0].pilotFocus.description}</p><Link to="/enterprise/contact" className="mt-5 inline-flex items-center gap-2 text-body font-medium text-[#007d21]">Discuss a Pilot<ArrowUpRight size={18} /></Link></div>
          </div>
        </div>
      </section>
      <section id="industry-directory" className="section-space bg-[#f7f8f5]" aria-labelledby="directory-heading">
        <div className="site-container">
          <div data-scroll-reveal className="flex flex-wrap items-end justify-between gap-8">
            <div><p className="eyebrow">Industry directory</p><h2 id="directory-heading" className="mt-5 text-section font-normal">Find your workflow.</h2></div>
            <label className="flex w-full items-center gap-3 rounded-full border border-[#cfddc9] bg-white px-5 py-3 sm:w-[340px]">
              <Search size={19} className="shrink-0 text-[#637060]" aria-hidden="true" />
              <span className="sr-only">Search industry workflows</span>
              <input type="search" value={search} onChange={event => setSearch(event.target.value)} placeholder="Search industries or checks" className="min-w-0 w-full bg-transparent text-sm outline-none" />
            </label>
          </div>
          <div className="mt-10 flex flex-wrap gap-2" aria-label="Filter industry workflows">
            {categories.map(item => <button key={item} type="button" aria-pressed={category === item} onClick={() => setCategory(item)} className={`max-w-full rounded-full border px-4 py-2 text-sm transition-colors ${category === item ? "border-[#002d0e] bg-[#002d0e] text-white" : "border-[#cfddc9] bg-white text-[#526058] hover:border-[#007d21]"}`}>{item}</button>)}
          </div>
          <p className="mt-6 text-sm text-[#637060]" aria-live="polite">{filtered.length} {filtered.length === 1 ? "workflow" : "workflows"} · 21 industry templates and one cross-industry review role.</p>
          <div className="mt-6 grid gap-x-10 md:grid-cols-2">
            {filtered.map(item => (
              <Link key={item.id} to={`/enterprise/use-cases/${item.id}`} className="group grid grid-cols-[1fr_auto] items-start gap-4 border-t border-[#d6dfd1] py-4">
                <div className="min-w-0"><p className="text-meta text-[#637060]">{item.category}</p><h3 className="mt-2 text-card-title font-medium group-hover:text-[#007d21]">{item.title}</h3></div>
                <ArrowUpRight size={22} className="mt-1 shrink-0 text-[#007d21]" aria-hidden="true" />
              </Link>
            ))}
            {filtered.length === 0 && <p className="py-10 text-body text-[#526058]">No matching workflows. Try another industry, check, or category.</p>}
          </div>
        </div>
      </section>
    </StandalonePage>
  );
}
