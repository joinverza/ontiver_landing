import { useState } from "react";
import { ArrowUpRight, Minus, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { solutionSteps } from "../../../data/solution";
import { individualSolutionSteps } from "../../../data/audienceContent";
import type { Audience } from "../../../lib/audience";
import IdentityPreview from "../../ui/IdentityPreview";

export default function Solution({ audience }: { audience: Audience }) {
  const enterprise = audience === "enterprise";
  const steps = enterprise ? solutionSteps : individualSolutionSteps;
  const [activeStep, setActiveStep] = useState(0);
  return (
    <section id="solution" className="section-space bg-[#f3f8ee]">
      <div className="site-container">
        <div data-scroll-reveal className="mx-auto mb-12 max-w-[900px] text-center lg:mb-16">
          <p className="eyebrow">{enterprise ? "One connected workflow" : "How Ontiver works"}</p>
          <h2 className="section-heading mt-5">{enterprise ? "From verification to reusable proof." : "Less repetition. More possibilities."}</h2>
          <p className="mx-auto mt-6 max-w-[650px] text-subtitle text-[#002d0e]/65">{enterprise ? "Connect your checks, consent, and review." : "Verify, keep your proof, and choose when to share."}</p>
        </div>
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div data-scroll-reveal>
            <div className="divide-y divide-[#002d0e]/15 border-y border-[#002d0e]/15">
              {steps.map((step, index) => <div key={step.title} className="py-5 sm:py-6">
                <h3><button type="button" aria-expanded={activeStep === index} aria-controls={`workflow-step-${audience}-${index}`} onClick={() => setActiveStep(index)} className="flex w-full items-center gap-5 text-left text-card-title font-semibold"><span className={`text-meta ${activeStep === index ? "text-[#007d21]" : "text-[#002d0e]/40"}`}>0{index + 1}</span><span className="flex-1">{step.title}</span>{activeStep === index ? <Minus size={21} className="shrink-0 text-[#007d21]" /> : <Plus size={21} className="shrink-0" />}</button></h3>
                <div id={`workflow-step-${audience}-${index}`} hidden={activeStep !== index}><p className="ml-10 mt-4 max-w-[440px] text-body text-[#002d0e]/65">{step.para}</p></div>
              </div>)}
            </div>
            <Link to={enterprise ? "/enterprise/platform" : "/how-it-works"} className="button-primary mt-8">{enterprise ? "Explore the platform" : "See how it works"}<ArrowUpRight size={18} /></Link>
          </div>
          <div data-scroll-reveal className="relative overflow-hidden rounded-[32px] bg-[#dcebd1] px-5 pb-0 pt-8 sm:px-10 sm:pt-10">
            <div className="mb-7 flex items-center justify-between gap-4"><span className="text-meta font-semibold text-[#002d0e]/60">THE ONTIVER WALLET</span><span className="rounded-full bg-white/70 px-3 py-1.5 text-meta text-[#007d21]">Product preview</span></div>
            <div className="translate-y-5"><IdentityPreview /></div>
          </div>
        </div>
      </div>
    </section>
  );
}
