import ActionIcon from "../../../../shared/components/ui/ActionIcon";
import { Code2, LayoutDashboard, Smartphone } from "lucide-react";
import { Link } from "react-router-dom";
import StandalonePage from "../../../../shared/components/ui/StandalonePage";
import WorkflowVisual from "../../../../shared/components/ui/WorkflowVisual";
import { imagery } from "../../../../shared/data/imagery";
import { editorialPhotos } from "../../../../shared/data/editorialPhotos";
import { platformLayers } from "../data/platform";

const PlatformOverviewPage = () => {
  return (
    <StandalonePage
      audience="enterprise"
      eyebrow="The Ontiver platform"
      title={
        <>
          Identity checks.
          <br />
          <span className="text-accent">Connected workflows.</span>
        </>
      }
      description="Request evidence, record consent, run selected checks, and review the results. Turn approved claims into reusable proof, with the person in control of each share."
      visual={
        <div className="min-w-0">
          <WorkflowVisual
            variant="workflow"
            photo={editorialPhotos.platformOverview}
            title="Connected verification workflows"
            compact
            priority
            className="hero-workflow-visual"
          />
        </div>
      }
      secondaryAction={{ label: "Explore Use Cases", to: "/enterprise/use-cases" }}
      finalTitle="Build your first workflow with us."
      finalImage={imagery.enterpriseHero}
    >
      <section className="section-space">
        <div className="site-container">
          <h2 data-scroll-reveal className="section-heading max-w-4xl">
            Six layers.
            <br />
            One verification journey.
          </h2>
          <p className="mt-6 max-w-2xl text-body text-[#526058]">
            Start with the checks your pilot needs. Additional sources and capabilities are scoped
            with your team.
          </p>
          <div className="editorial-links mt-9">
            {platformLayers.map((layer) => {
              return (
                <Link
                  data-scroll-reveal
                  key={layer.id}
                  to={`/enterprise/platform/${layer.id}`}
                  className="editorial-link group"
                >
                  <h3 className="text-card-title font-medium group-hover:text-accent">
                    {layer.title}
                  </h3>
                  <p className="mt-3 max-w-sm text-body text-[#526058]">{layer.description}</p>
                  <ActionIcon className="editorial-link-arrow size-6" aria-hidden="true" />
                </Link>
              );
            })}
          </div>
        </div>
      </section>
      <section className="section-space bg-surface-muted">
        <div className="site-container">
          <h2 data-scroll-reveal className="section-heading max-w-4xl">
            Built for both sides
            <br />
            of a request.
          </h2>
          <div className="mt-8 grid gap-7 md:grid-cols-3">
            {[
              {
                icon: LayoutDashboard,
                title: "Enterprise dashboard",
                copy: "Manage requests, review queues, reports, and team access in one place.",
              },
              {
                icon: Code2,
                title: "APIs and webhooks",
                copy: "Integrate verification and proof status directly into your own product.",
              },
              {
                icon: Smartphone,
                title: "User mobile app",
                copy: "Give your users a clear, consent-first experience on their side of every request.",
              },
            ].map(({ icon: Icon, title, copy }) => (
              <article data-scroll-reveal key={title} className="border-t border-[#cfdacb] pt-5">
                <Icon className="size-7 text-accent" aria-hidden="true" />
                <h3 className="mt-4 text-card-title font-medium">{title}</h3>
                <p className="mt-3 text-body text-[#526058]">{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </StandalonePage>
  );
};

export default PlatformOverviewPage;
