import {
  solutionCellClasses,
  solutionSteps,
  type SolutionStep,
} from "../../../data/solution";
import { individualSolutionSteps } from "../../../data/audienceContent";
import type { Audience } from "../../../lib/audience";
import AuroraBadge from "../../ui/AuroraBadge";

function BentoGridLines() {
  return (
    <div
      className="solution-grid-lines pointer-events-none absolute inset-0 z-[2] max-md:hidden"
      aria-hidden="true"
    >
      <span className="absolute top-1/2 right-0 left-0 block h-px -translate-y-0.5 bg-light-primary/20" />
      <span className="absolute top-0 bottom-1/2 left-[33.333%] block w-px -translate-x-0.5 bg-light-primary/20" />
      <span className="absolute top-0 bottom-1/2 left-[66.666%] block w-px -translate-x-0.5 bg-light-primary/20" />
      <span className="absolute top-1/2 bottom-0 left-1/2 block w-px -translate-x-0.5 bg-light-primary/20" />
    </div>
  );
}

function SolutionItem({
  item,
  stepIndex,
}: {
  item: SolutionStep;
  stepIndex: number;
}) {
  return (
    <div
      className={`solution-item group/solutionitem relative min-h-[170px] cursor-default overflow-hidden rounded-none p-[clamp(20px,3.1vw,38px)] transition-[background-color,transform] duration-300 ease-out [transform:translateZ(0)] hover:[transform:translateY(-4px)_translateZ(0)] hover:bg-[#009311]/[0.055] md:min-h-[190px] max-md:border-t-[1.5px] max-md:border-light-primary/60 max-md:last:border-b-[1.5px] ${solutionCellClasses[stepIndex] ?? ""}`}
    >
      <div className="pointer-events-none absolute inset-0 z-[3] border border-[#009311]/55 opacity-0 transition-opacity duration-200 group-hover/solutionitem:opacity-100" />
      <span className="pointer-events-none absolute top-0 left-0 z-[4] h-3 w-3 border-t-2 border-l-2 border-[#009311] opacity-0 transition-opacity duration-200 group-hover/solutionitem:opacity-100" />
      <span className="pointer-events-none absolute right-0 bottom-0 z-[4] h-3 w-3 border-r-2 border-b-2 border-[#009311] opacity-0 transition-opacity duration-200 group-hover/solutionitem:opacity-100" />

      <div className="relative z-10 flex h-full w-full flex-col items-center justify-center text-center">
        <div className="icon-box relative mb-4 flex h-14 w-14 origin-center items-center justify-center rounded-lg border border-black/5 bg-white transition-all duration-200 ease-out group-hover/solutionitem:border-[#009311]/30 md:mb-5 md:h-16 md:w-16">
          <img
            src={item.icon}
            alt={`${item.title} icon`}
            className="relative z-10 h-8 w-8 md:h-9 md:w-9"
          />
        </div>

        <div className="w-full max-w-[300px]">
          <h6 className="relative inline-block pb-2 text-card-title font-semibold text-black transition-colors duration-150 group-hover/solutionitem:text-[#009311]">
            {item.title}
          </h6>

          <p className="text-body text-center text-black/90 transition-colors duration-150 group-hover/solutionitem:text-black/75">
            {item.para}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Solution({ audience }: { audience: Audience }) {
  const steps =
    audience === "enterprise" ? solutionSteps : individualSolutionSteps;

  return (
    <section
      id="solution"
      data-scroll-reveal
      className="relative isolate w-full overflow-hidden bg-cover bg-center antialiased [background-image:linear-gradient(180deg,rgba(247,247,247,0.82),rgba(247,247,247,0.2)_20%,rgba(247,247,247,0.28)_78%,rgba(247,247,247,0.86)),url('/assets/solution-building-bg.svg')] md:min-h-screen"
    >
      <div className="relative z-10 mx-auto flex w-full max-w-none flex-col justify-center bg-white/[0.72] px-5 py-16 backdrop-blur-[2px] sm:px-6 md:min-h-screen md:px-10 md:py-14 lg:px-20">
        <div className="relative z-20 flex w-full flex-col items-center gap-2 pb-10 md:pb-12">
          <AuroraBadge>
            {audience === "enterprise" ? "Enterprise Workflow" : "How Ontiver Works"}
          </AuroraBadge>

          <h2 className="mx-auto flex flex-wrap justify-center gap-x-2 text-section text-balance text-center font-medium tracking-normal">
            <span className="inline-block">
              {audience === "enterprise" ? "One identity layer." : "Verify once."}
            </span>
            <span className="inline-block">
              <span className="relative inline-block">
                {audience === "enterprise" ? "Trusted" : "Use it"}
                <span className="absolute bottom-0 left-0 h-[3px] w-full rounded-full bg-[#009311]" />
              </span>{" "}
              {audience === "enterprise" ? "across every workflow." : "with your permission."}
            </span>
          </h2>
        </div>

        <div className="relative mx-auto grid w-full max-w-5xl grid-cols-6 grid-rows-[repeat(2,minmax(190px,1fr))] md:min-h-[clamp(400px,54vh,520px)] max-md:flex max-md:min-h-0 max-md:flex-col">
          <BentoGridLines />
          {steps.map((step, index) => (
            <SolutionItem key={step.title} item={step} stepIndex={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
