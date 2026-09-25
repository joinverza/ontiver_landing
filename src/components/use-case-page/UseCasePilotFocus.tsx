import { Plus } from "lucide-react";
import type { UseCasePageDetail } from "../../data/useCases";

export default function UseCasePilotFocus({ focus, measures }: { focus: UseCasePageDetail["pilotFocus"]; measures: UseCasePageDetail["evaluationMeasures"] }) {
  return (
    <section className="section-space bg-[#f7f8f5]">
      <div className="site-container grid gap-8 lg:grid-cols-2 lg:gap-16">
        <div data-scroll-reveal><p className="eyebrow">Proposed pilot</p><h2 className="mt-4 text-section font-normal">{focus.title}</h2><p className="mt-5 text-body text-[#526058]">{focus.description}</p></div>
        <div data-scroll-reveal><p className="text-body text-[#526058]">Agree the selected checks, consent, review process, and success criteria before the pilot starts.</p><details className="group mt-6 border-y border-[#d6dfd1] py-4"><summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-card-title font-medium [&::-webkit-details-marker]:hidden">Evaluation measures<Plus size={20} className="shrink-0 transition-transform group-open:rotate-45" /></summary><p className="mt-4 text-sm text-[#637060]">Pilot results are pending. Baselines and success criteria are agreed before starting.</p><dl className="mt-4 space-y-4">{measures.map(measure => <div key={measure.label}><dt className="text-body font-medium">{measure.label}</dt><dd className="mt-1 text-sm text-[#526058]">{measure.description}</dd></div>)}</dl></details></div>
      </div>
    </section>
  );
}
