import ActionIcon from "../../../../shared/components/ui/ActionIcon";
import { useEffect, useState } from "react";
import { Pause, Play } from "lucide-react";
import { Link } from "react-router-dom";
import { solutionSteps } from "../../../../shared/data/solution";
import { individualSolutionSteps } from "../../../../shared/data/audienceContent";
import type { Audience } from "../../../../shared/lib/audience";
import { useMotionSettings } from "../../../../shared/components/motion/MotionSettings";
import { useDocumentVisible, useInViewport } from "../../../../shared/hooks/useVisibility";
import SolutionMedia from "./SolutionMedia";

const Solution = ({ audience }: { audience: Audience }) => {
  const enterprise = audience === "enterprise";
  const steps = enterprise ? solutionSteps : individualSolutionSteps;
  const [activeStep, setActiveStep] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const { ref: sectionRef, visible } = useInViewport<HTMLElement>();
  const documentVisible = useDocumentVisible();
  const { paused, reduced } = useMotionSettings();
  const selectedStep = activeStep % steps.length;
  const playing =
    autoplay && visible && documentVisible && !hovered && !focused && !paused && !reduced;

  useEffect(() => {
    if (!playing) return;
    const timer = window.setInterval(() => {
      setActiveStep((value) => (value + 1) % steps.length);
    }, 5000);
    return () => window.clearInterval(timer);
  }, [playing, steps.length]);

  return (
    <section ref={sectionRef} id="solution" className="section-space bg-surface-muted">
      <div className="site-container story-split">
        <div className="story-split-media">
          <SolutionMedia key={audience} steps={steps} selectedStep={selectedStep} />
        </div>
        <div data-scroll-reveal className="story-split-content">
          <div className="mb-5 flex items-center justify-between gap-3 text-meta text-[#526058]">
            <span>{enterprise ? "Enterprise + user journey" : "Planned user app"}</span>
            <span>
              0{selectedStep + 1} / 0{steps.length}
            </span>
          </div>
          <div className="mb-9 flex items-start justify-between gap-5">
            <h2 className="section-heading">
              {enterprise ? "Request. Review. Reuse." : "From a request to a reusable proof."}
            </h2>
            {!reduced && (
              <button
                type="button"
                onClick={() => setAutoplay((value) => !value)}
                aria-label={autoplay ? "Pause walkthrough" : "Play walkthrough"}
                aria-pressed={!autoplay}
                className="mt-2 grid size-11 shrink-0 place-items-center rounded-full border border-[#002d0e]/20"
              >
                {autoplay ? <Pause size={17} /> : <Play size={17} />}
              </button>
            )}
          </div>
          <div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onFocus={() => setFocused(true)}
            onBlur={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget as Node)) setFocused(false);
            }}
          >
            {steps.map((step, index) => (
              <div
                key={step.title}
                className="relative border-t border-l border-[#002d0e]/15 py-5 pl-5 last:border-b"
              >
                {selectedStep === index && (
                  <span
                    key={selectedStep}
                    className="workflow-progress absolute inset-y-0 -left-px w-[2px] bg-[#007d21]"
                    style={{ animationPlayState: playing ? "running" : "paused" }}
                  />
                )}
                <h3>
                  <button
                    type="button"
                    aria-expanded={selectedStep === index}
                    aria-controls={`workflow-step-${audience}-${index}`}
                    onClick={() => {
                      setActiveStep(index);
                      setAutoplay(false);
                    }}
                    className={`w-full text-left text-card-title font-medium transition-colors ${selectedStep === index ? "text-[#002d0e]" : "text-[#526058]"}`}
                  >
                    {index + 1}. {step.title}
                  </button>
                </h3>
                <div id={`workflow-step-${audience}-${index}`} hidden={selectedStep !== index}>
                  <p className="solution-description mt-3 text-body text-[#526058]">{step.para}</p>
                </div>
              </div>
            ))}
          </div>
          <p key={selectedStep} className="workflow-screen mt-5 text-card-title font-medium">
            {steps[selectedStep].title}
          </p>
          <Link
            to={enterprise ? "/enterprise/platform" : "/how-it-works"}
            className="mt-8 inline-flex items-center gap-3 text-body font-medium"
          >
            Explore the journey
            <ActionIcon size={19} className="text-accent" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Solution;
