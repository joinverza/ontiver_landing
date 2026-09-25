import type { UseCasePageDetail } from "../../data/useCases";

export default function UseCaseEvaluation({ measures }: { measures: UseCasePageDetail["evaluationMeasures"] }) {
  return (
    <section aria-labelledby="evaluation-heading" className="section-space bg-[#edf5e7]">
      <div className="site-container grid gap-12 lg:grid-cols-2 lg:gap-20">
        <div data-scroll-reveal>
          <p className="eyebrow">Proposed evaluation measures</p><h2 id="evaluation-heading" className="mt-5 text-section font-normal">What a pilot could measure.</h2>
          <p className="mt-7 max-w-[490px] text-body text-[#526058]">Ontiver is pre-pilot. These are proposed measures, with baselines and success criteria to be agreed. Results are pending.</p>
        </div>
        <dl className="border-t border-[#c9dbc3]">
          {measures.map((measure) => (
            <div data-scroll-reveal key={measure.label} className="border-b border-[#c9dbc3] py-6">
              <dt className="text-card-title font-medium">{measure.label}</dt>
              <dd className="mt-2 text-body text-[#526058]">{measure.description}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
