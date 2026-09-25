import { ArrowUpRight, Code2, LayoutDashboard, Smartphone } from "lucide-react";
import { Link } from "react-router-dom";
import StandalonePage from "../components/ui/StandalonePage";
import { BusinessPhoto } from "../components/business/BusinessPhoto";
import { imagery } from "../data/imagery";
import { platformLayers } from "../data/platform";

export default function PlatformOverviewPage() {
  return (
    <StandalonePage
      audience="enterprise"
      eyebrow="The Ontiver platform"
      title={<>Identity checks.<br /><span className="text-[#007d21]">Connected workflows.</span></>}
      description="Request evidence, record consent, run selected checks, and review the results. Turn approved claims into reusable proof, with the person in control of each share."
      visual={<div className="h-[260px] overflow-hidden rounded-2xl sm:h-[340px] lg:h-[380px]"><BusinessPhoto image={imagery.candidateReview} priority /></div>}
      secondaryAction={{ label: "Explore Use Cases", to: "/enterprise/use-cases" }}
      finalTitle="Build your first workflow with us."
    >
      <section className="section-space">
        <div className="site-container">
          <h2 data-scroll-reveal className="section-heading mx-auto max-w-4xl text-center">Six layers.<br />One verification journey.</h2>
          <p className="mx-auto mt-6 max-w-2xl text-center text-body text-[#526058]">Start with the checks your pilot needs. Additional sources and capabilities are scoped with your team.</p>
          <div className="mt-9 grid gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
            {platformLayers.map((layer) => {
              return (
                <Link data-scroll-reveal key={layer.id} to={`/enterprise/platform/${layer.id}`} className="group block min-w-0 border-t border-[#d6dfd1] py-6">
                  <div className="flex items-start justify-between gap-4"><h3 className="text-card-title font-medium group-hover:text-[#007d21]">{layer.title}</h3><ArrowUpRight className="mt-1 size-5 shrink-0 text-[#007d21]" aria-hidden="true" /></div>
                  <p className="mt-3 max-w-sm text-body text-[#526058]">{layer.description}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
      <section className="section-space bg-[#f7f8f5]">
        <div className="site-container">
          <h2 data-scroll-reveal className="section-heading max-w-4xl">Built for both sides<br />of a request.</h2>
          <div className="mt-8 grid gap-7 md:grid-cols-3">
            {[
              { icon: LayoutDashboard, title: "Enterprise dashboard", copy: "Manage requests, review queues, reports, and team access in one place." },
              { icon: Code2, title: "APIs and webhooks", copy: "Integrate verification and proof status directly into your own product." },
              { icon: Smartphone, title: "User mobile app", copy: "Give your users a clear, consent-first experience on their side of every request." },
            ].map(({ icon: Icon, title, copy }) => <article data-scroll-reveal key={title} className="border-t border-[#cfdacb] pt-5"><Icon className="size-7 text-[#007d21]" aria-hidden="true" /><h3 className="mt-4 text-card-title font-medium">{title}</h3><p className="mt-3 text-body text-[#526058]">{copy}</p></article>)}
          </div>
        </div>
      </section>
    </StandalonePage>
  );
}
