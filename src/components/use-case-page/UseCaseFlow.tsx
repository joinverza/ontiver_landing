import type { UseCasePageDetail } from "../../data/useCases";

export default function UseCaseFlow({ workflow }: { workflow: UseCasePageDetail["workflow"] }) {
  return (
    <section className="section-space bg-[#edf5e7]">
      <div className="site-container">
        <div data-scroll-reveal className="grid gap-5 lg:grid-cols-2 lg:gap-16">
          <div><p className="eyebrow">Proposed workflow</p><h2 className="mt-4 text-section font-normal">The steps behind the decision.</h2></div>
          <p className="self-end text-body text-[#526058]">Configure the sequence around your operation. Confirm selected checks, providers, review rules, and release readiness before starting.</p>
        </div>
        <ol className="mt-8 grid gap-x-8 sm:grid-cols-2 lg:grid-cols-3" aria-label="Ordered industry workflow">
          {workflow.map((step, index) => <li data-scroll-reveal key={step.title} className="flex min-w-0 items-start gap-3 border-t border-[#c8d8c2] py-4"><span className="mt-1 text-meta tabular-nums text-[#007d21]">{String(index + 1).padStart(2, "0")}</span><div className="min-w-0"><h3 className="text-body font-medium [overflow-wrap:anywhere]">{step.title}</h3>{step.description && <p className="mt-2 text-sm text-[#526058]">{step.description}</p>}</div></li>)}
        </ol>
      </div>
    </section>
  );
}
