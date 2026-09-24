import type { UseCasePageDetail } from "../../data/useCases";

export default function UseCasePilotFocus({ focus }: { focus: UseCasePageDetail["pilotFocus"] }) {
  return (
    <section className="section-space bg-[#edf5eb]">
      <div data-scroll-reveal className="site-container grid items-start gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
        <div><p className="eyebrow">Proposed pilot focus</p><p className="mt-5 max-w-[300px] text-body text-[#637060]">Scope, baseline, and evaluation criteria are agreed before a pilot begins.</p></div>
        <div className="max-w-[760px]"><h2 className="text-section font-semibold tracking-[-0.035em]">{focus.title}</h2><p className="mt-6 text-subtitle text-[#637060]">{focus.description}</p></div>
      </div>
    </section>
  );
}
