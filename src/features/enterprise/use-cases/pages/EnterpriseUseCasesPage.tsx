import ActionIcon from "../../../../shared/components/ui/ActionIcon";
import { useState } from "react";
import { Search } from "../../../../shared/components/ui/icons";
import { Link } from "react-router-dom";
import StandalonePage from "../../../../shared/components/ui/StandalonePage";
import ImageHoverPanels from "../../../../shared/components/media/ImageHoverPanels";
import { getIndustryImage } from "../../../../shared/components/media/businessImages";
import WorkflowVisual from "../../../../shared/components/ui/WorkflowVisual";
import { imagery } from "../../../../shared/data/imagery";
import { editorialPhotos } from "../../../../shared/data/editorialPhotos";
import { priorityUseCases, useCasePageDetails, type IndustryCategory } from "../data/useCases";
import SlidingPill from "../../../../shared/components/ui/SlidingPill";

const categories: Array<"All workflows" | IndustryCategory> = [
  "All workflows",
  "Finance",
  "People and work",
  "Operations and commerce",
  "Public and community",
  "Cross-industry",
];

const EnterpriseUseCasesPage = () => {
  const [category, setCategory] = useState<(typeof categories)[number]>("All workflows");
  const [search, setSearch] = useState("");
  const allTemplates = Object.values(useCasePageDetails);
  const filtered = allTemplates.filter(
    (item) =>
      (category === "All workflows" || item.category === category) &&
      [item.title, item.purpose, ...item.claims]
        .join(" ")
        .toLowerCase()
        .includes(search.trim().toLowerCase()),
  );

  return (
    <StandalonePage
      audience="enterprise"
      eyebrow="Enterprise use cases"
      title={
        <>
          One platform.
          <br />
          <span className="text-accent">Your industry's workflow.</span>
        </>
      }
      description="Connect identity, evidence, consent, and enterprise review across 21 industry templates. Start with one operational journey."
      visual={
        <div className="min-w-0">
          <WorkflowVisual
            variant="workflow"
            photo={editorialPhotos.industryOverview}
            title="One platform. Your industry's workflow."
            compact
            priority
            className="hero-workflow-visual"
          />
        </div>
      }
      secondaryAction={{ label: "Explore the platform", to: "/enterprise/platform" }}
      finalTitle="Start with one workflow."
      finalImage={imagery.smallBusiness}
    >
      <section className="section-space" aria-labelledby="priority-workflows">
        <div className="site-container">
          <div data-scroll-reveal className="mb-8 max-w-[760px]">
            <p className="eyebrow">Start with a focused pilot</p>
            <h2 id="priority-workflows" className="mt-5 text-section font-normal">
              Built around an operational need.
            </h2>
            <p className="mt-6 text-body text-[#526058]">
              Digital lenders, banking and fintech, recruitment and HR, logistics and delivery,
              marketplaces and sellers, construction and contractors.
            </p>
          </div>
          <ImageHoverPanels
            label="Priority industry cards"
            items={priorityUseCases.map((item) => ({
              id: item.id,
              title: item.heroTitle,
              description: item.purpose,
              image: getIndustryImage(item.id),
              to: `/enterprise/use-cases/${item.id}`,
            }))}
          />
          <div
            data-scroll-reveal
            className="mt-9 grid gap-6 rounded-xl bg-surface-raised p-6 lg:grid-cols-[0.8fr_1.2fr]"
          >
            <h3 className="text-card-title font-medium">Start with a focused pilot.</h3>
            <div>
              <p className="text-body text-[#526058]">
                {priorityUseCases[0].pilotFocus.description}
              </p>
              <Link
                to="/enterprise/contact"
                className="mt-5 inline-flex items-center gap-2 text-body font-medium text-accent"
              >
                Discuss a Pilot
                <ActionIcon size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section
        id="industry-directory"
        className="section-space bg-surface-muted"
        aria-labelledby="directory-heading"
      >
        <div className="site-container">
          <div data-scroll-reveal className="flex flex-wrap items-end justify-between gap-8">
            <div>
              <p className="eyebrow">Industry directory</p>
              <h2 id="directory-heading" className="mt-5 text-section font-normal">
                Find your workflow.
              </h2>
            </div>
            <label className="flex w-full items-center gap-3 rounded-full border border-[#cfddc9] bg-surface-raised px-5 py-3 sm:w-[340px]">
              <Search size={19} className="shrink-0 text-[#526058]" aria-hidden="true" />
              <span className="sr-only">Search industry workflows</span>
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search industries or checks"
                className="min-w-0 w-full bg-transparent text-sm outline-none"
              />
            </label>
          </div>
          <SlidingPill
            label="Filter industry workflows"
            value={category}
            onChange={setCategory}
            options={categories.map((item) => ({ value: item, label: item }))}
            layout="wrap"
            size="compact"
            className="mt-10"
          />
          <p className="mt-6 text-sm text-[#526058]" aria-live="polite">
            {filtered.length} {filtered.length === 1 ? "workflow" : "workflows"} · 21 industry
            templates and one cross-industry review role.
          </p>
          <div className="mt-6 grid gap-x-10 md:grid-cols-2">
            {filtered.map((item) => (
              <Link
                key={item.id}
                to={`/enterprise/use-cases/${item.id}`}
                className="group grid grid-cols-[1fr_auto] items-start gap-4 border-t border-[#d6dfd1] py-4"
              >
                <div className="min-w-0">
                  <p className="text-meta text-[#526058]">{item.category}</p>
                  <h3 className="mt-2 text-card-title font-medium group-hover:text-accent">
                    {item.title}
                  </h3>
                </div>
                <ActionIcon size={22} className="mt-1 shrink-0 text-accent" aria-hidden="true" />
              </Link>
            ))}
            {filtered.length === 0 && (
              <p className="py-10 text-body text-[#526058]">
                No matching workflows. Try another industry, check, or category.
              </p>
            )}
          </div>
        </div>
      </section>
    </StandalonePage>
  );
};

export default EnterpriseUseCasesPage;
