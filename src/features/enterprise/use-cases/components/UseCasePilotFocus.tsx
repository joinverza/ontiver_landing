import { Plus } from "lucide-react";
import type { UseCasePageDetail } from "../data/useCases";
import "../../../../shared/components/ui/cta-band.css";

const UseCasePilotFocus = ({
  focus,
  measures,
}: {
  focus: UseCasePageDetail["pilotFocus"];
  measures: UseCasePageDetail["evaluationMeasures"];
}) => {
  return (
    <section className="section-space section-compact cta-band py-24!">
      <div className="site-container cta-band-layout" data-scroll-reveal>
        <div className="cta-band-primary">
          <p className="eyebrow !text-[#c7e6b5]">Proposed pilot</p>
          <h2 className="mt-4 text-section font-normal">{focus.title}</h2>
          <p className="mt-5 text-body text-white/80">{focus.description}</p>
        </div>
        <div className="cta-band-details">
          <p className="text-body text-white/80">
            Agree the selected checks, consent, review process, and success criteria before the
            pilot starts.
          </p>
          <details className="group mt-6 border-y border-white/25 py-4">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-card-title font-medium [&::-webkit-details-marker]:hidden">
              Evaluation measures
              <Plus size={20} className="shrink-0 transition-transform group-open:rotate-45" />
            </summary>
            <p className="mt-4 text-sm text-white/75">
              Baselines and success criteria are agreed before starting, and each measure is tracked
              in your dashboard from the first request.
            </p>
            <dl className="cta-band-measures mt-5">
              {measures.map((measure) => (
                <div key={measure.label}>
                  <dt className="text-body font-medium">{measure.label}</dt>
                  <dd className="mt-1 text-sm text-white/75">{measure.description}</dd>
                </div>
              ))}
            </dl>
          </details>
        </div>
      </div>
    </section>
  );
};

export default UseCasePilotFocus;
