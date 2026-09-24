import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import StandalonePage, { EditorialPhoto } from "../components/ui/StandalonePage";
import { imagery } from "../data/imagery";
import { platformLayers } from "../data/platform";

export default function PlatformOverviewPage() {
  return (
    <StandalonePage
      audience="enterprise"
      eyebrow="The Ontiver platform"
      title={<>Verify once.<br /><span className="text-[#007d21]">Reuse with consent.</span></>}
      description="Connect verification, workflows, and reusable proof. Help your business onboard people with less repetition and more control over what is shared."
      visual={<div className="aspect-[1.15] overflow-hidden rounded-[28px]"><EditorialPhoto image={imagery.enterpriseHero} /></div>}
      secondaryAction={{ label: "Explore use cases", to: "/enterprise/use-cases" }}
      finalTitle="Build your first workflow with us."
    >
      <section className="section-space">
        <div className="site-container">
          <h2 className="section-heading mx-auto max-w-3xl text-center">One platform. Connected building blocks.</h2>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {platformLayers.map((layer) => {
              const Icon = layer.icon;
              return (
                <Link key={layer.id} to={`/enterprise/platform/${layer.id}`} className="surface-card group block transition-colors hover:border-[#9bbb99]">
                  <Icon className="mb-8 size-8 text-[#007d21]" aria-hidden="true" />
                  <div className="flex items-start justify-between gap-4"><h3 className="text-card-title font-semibold">{layer.title}</h3><ArrowUpRight className="mt-1 size-5 shrink-0 text-[#007d21]" aria-hidden="true" /></div>
                  <p className="mt-4 text-body text-[#526058]">{layer.description}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </StandalonePage>
  );
}
