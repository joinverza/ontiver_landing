import { useEffect, useRef, useState } from "react";
import { ArrowRight, Pause, Play } from "lucide-react";
import { Link } from "react-router-dom";
import { solutionSteps } from "../../../data/solution";
import { individualSolutionSteps } from "../../../data/audienceContent";
import type { Audience } from "../../../lib/audience";
import { useMotionSettings } from "../../MotionSettings";
import ContextPhoto from "../../ui/ContextPhoto";
import { imagery } from "../../../data/imagery";

export default function Solution({ audience }: { audience: Audience }) {
  const enterprise = audience === "enterprise";
  const steps = enterprise ? solutionSteps : individualSolutionSteps;
  const [activeStep, setActiveStep] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const { paused, reduced } = useMotionSettings();
  const playing = autoplay && visible && !hovered && !focused && !paused && !reduced;
  useEffect(() => {
    const observer = new IntersectionObserver(entries => setVisible(entries[0].isIntersecting), { threshold: .3 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (!playing) return;
    const timer = window.setInterval(() => {
      if (!document.hidden) setActiveStep(value => (value + 1) % steps.length);
    }, 5000);
    return () => window.clearInterval(timer);
  }, [playing, steps.length]);
  return <section ref={sectionRef} id="solution" className="section-space bg-[#f4f6f1]">
    <div className="site-container grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
      <div data-scroll-reveal>
        <div className="mb-9 flex items-start justify-between gap-5"><h2 className="section-heading">{enterprise ? "Request. Review. Reuse." : "From a request to a reusable proof."}</h2>{!reduced && <button type="button" onClick={() => setAutoplay(value => !value)} aria-label={autoplay ? "Pause walkthrough" : "Play walkthrough"} aria-pressed={!autoplay} className="mt-2 grid size-11 shrink-0 place-items-center rounded-full border border-[#002d0e]/20">{autoplay ? <Pause size={17} /> : <Play size={17} />}</button>}</div>
        <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} onFocus={() => setFocused(true)} onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget as Node)) setFocused(false); }}>
          {steps.map((step, index) => <div key={step.title} className="relative border-l border-[#002d0e]/15 py-2.5 pl-5">
            {activeStep === index && <span key={activeStep} className="workflow-progress absolute inset-y-0 -left-px w-[2px] bg-[#007d21]" style={{ animationPlayState: playing ? "running" : "paused" }} />}
            <h3><button type="button" aria-expanded={activeStep === index} aria-controls={`workflow-step-${audience}-${index}`} onClick={() => { setActiveStep(index); setAutoplay(false); }} className={`w-full text-left text-card-title font-medium transition-colors ${activeStep === index ? "text-[#002d0e]" : "text-[#526058]"}`}>{index + 1}. {step.title}</button></h3>
            <div id={`workflow-step-${audience}-${index}`} hidden={activeStep !== index}><p className="mt-3 text-body text-[#526058]">{step.para}</p></div>
          </div>)}
        </div>
        <Link to={enterprise ? "/enterprise/platform" : "/how-it-works"} className="mt-8 inline-flex items-center gap-3 text-body font-medium">Explore the journey<ArrowRight size={19} className="text-[#007d21]" /></Link>
      </div>
      <div data-media-reveal className="min-w-0">
        <div className="mb-4 flex items-center justify-between gap-3 text-meta text-[#526058]"><span>{enterprise ? "Enterprise + user journey" : "Planned user app"}</span><span>0{activeStep + 1} / 0{steps.length}</span></div>
        <ContextPhoto image={enterprise ? imagery.candidateReview : imagery.mobileApplication} />
        <p key={activeStep} className="workflow-screen mt-4 text-card-title font-medium">{steps[activeStep].title}</p>
      </div>
    </div>
  </section>;
}
