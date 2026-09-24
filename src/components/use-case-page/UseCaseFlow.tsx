import type { UseCasePageDetail } from "../../data/useCases";

export default function UseCaseFlow({ workflow }: { workflow: UseCasePageDetail["workflow"] }) {
  return (
    <section className="section-space bg-[#edf5eb]">
      <div className="site-container">
        <div data-scroll-reveal className="max-w-[680px]">
          <p className="eyebrow">Proposed workflow</p>
          <h2 className="mt-5 text-section font-semibold tracking-[-0.035em]">One continuous flow from first proof to future reuse.</h2>
        </div>
        <ol className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {workflow.map((step, index) => (
            <li data-scroll-reveal key={step.title} className="border-t border-[#c9dbc3] pt-7">
              <span className="text-meta font-semibold text-[#007d21]">0{index + 1}</span>
              <h3 className="mt-6 text-card-title font-semibold">{step.title}</h3>
              <p className="mt-4 text-body text-[#637060]">{step.description}</p>
            </li>
          ))}
        </ol>
        <p className="mt-12 max-w-[640px] text-body text-[#637060]">Identity evidence stays connected to the workflow that created it, so every reuse remains explainable.</p>
      </div>
    </section>
  );
}
