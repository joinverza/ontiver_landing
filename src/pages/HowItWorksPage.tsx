import IdentityPreview from "../components/ui/IdentityPreview";
import StandalonePage from "../components/ui/StandalonePage";
import { individualSolutionSteps } from "../data/audienceContent";

export default function HowItWorksPage() {
  return (
    <StandalonePage
      eyebrow="How Ontiver works"
      title={<>Verify once.<br /><span className="text-[#007d21]">Share when you choose.</span></>}
      description="From your first verification to your next sharing request, your permission stays part of the journey."
      visual={<div className="mx-auto max-w-[450px]"><IdentityPreview variant="proof" /></div>}
      secondaryAction={{ label: "Explore your identity", to: "/identity" }}
      finalTitle="Take the first step."
    >
      <section className="section-space">
        <div className="site-container">
          <h2 className="section-heading mx-auto max-w-3xl text-center">A clear path to reusable proof.</h2>
          <ol className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-5 lg:gap-6">
            {individualSolutionSteps.map((step, index) => (
              <li key={step.title} className="border-t border-[#cadcc5] pt-6">
                <span className="mb-6 grid size-12 place-items-center rounded-full bg-[#edf5e7] text-body font-semibold text-[#007d21]">{index + 1}</span>
                <h3 className="text-card-title font-semibold">{step.title}</h3>
                <p className="mt-4 text-body text-[#526058]">{step.para}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </StandalonePage>
  );
}
