import type { UseCasePageDetail } from "../../data/useCases";

export default function UseCaseEvaluation({ measures }: { measures: UseCasePageDetail["evaluationMeasures"] }) {
  return (
    <section aria-labelledby="evaluation-heading" className="section-space border-b border-[#e4ebe0] bg-white">
      <div className="site-container">
        <div data-scroll-reveal className="mb-12 grid gap-6 lg:grid-cols-2 lg:gap-16">
          <div><p className="eyebrow">Proposed evaluation measures</p><h2 id="evaluation-heading" className="mt-5 text-section font-semibold tracking-[-0.035em]">What a pilot could measure.</h2></div>
          <p className="max-w-[490px] text-subtitle text-[#637060]">Ontiver is pre-pilot. These are proposed measures, with baselines and success criteria to be agreed. Results are pending.</p>
        </div>
        <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {measures.map((measure) => (
            <div data-scroll-reveal key={measure.label} className="border-t border-[#d5e8cd] pt-7">
              <p aria-label="Result pending" className="text-[44px] font-medium leading-none text-[#007d21]">—</p>
              <h3 className="mt-5 text-card-title font-semibold">{measure.label}</h3>
              <p className="mt-3 text-body text-[#637060]">{measure.description}</p>
              <p className="mt-5 text-meta font-medium text-[#637060]">Results pending</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
