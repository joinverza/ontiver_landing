import { Fragment } from "react";
import type { UseCasePageDetail } from "../data/useCases";
import "./use-case-flow.css";

const UseCaseFlow = ({ workflow }: { workflow: UseCasePageDetail["workflow"] }) => {
  return (
    <section className="section-space bg-surface">
      <div className="site-container">
        <div data-scroll-reveal className="grid gap-5 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="eyebrow">Proposed workflow</p>
            <h2 className="mt-4 text-section font-normal">The steps behind the decision.</h2>
          </div>
          <p className="self-end text-body text-[#526058]">
            Configure the sequence around your operation. Confirm selected checks, providers, review
            rules, and release readiness before starting.
          </p>
        </div>
        <ol
          className={`workflow-wins mt-8 ${workflow.length > 6 ? "workflow-wins--wide" : ""}`}
          aria-label="Ordered industry workflow"
        >
          {workflow.map((step, index) => (
            <li data-scroll-reveal key={step.title} className="workflow-win" tabIndex={0}>
              <span className="workflow-win-number tabular-nums" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="min-w-0">
                <h3 className="text-card-title font-medium [overflow-wrap:anywhere]">
                  {step.title.split("/").map((part, partIndex) => (
                    <Fragment key={`${partIndex}-${part}`}>
                      {partIndex > 0 && (
                        <>
                          /<wbr />
                        </>
                      )}
                      {part}
                    </Fragment>
                  ))}
                </h3>
                {step.description && <p className="mt-3 text-sm opacity-80">{step.description}</p>}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default UseCaseFlow;
