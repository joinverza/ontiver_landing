import type { CSSProperties } from "react";
import Text from "../base/Text";
import type { UseCasePageDetail } from "../../data/useCases";

type UseCaseFlowProps = {
  workflow: UseCasePageDetail["workflow"];
};

function splitTitleLines(title: string) {
  const words = title.split(" ");
  if (words.length < 4) return [title];
  const midpoint = Math.ceil(words.length / 2);
  return [words.slice(0, midpoint).join(" "), words.slice(midpoint).join(" ")];
}

function getNodePositions(count: number) {
  const top = 10;
  const bottom = 740;
  if (count <= 1) return [top];

  return Array.from({ length: count }, (_, index) => {
    return top + index * ((bottom - top) / (count - 1));
  });
}

function getSignalPath(positions: number[]) {
  if (positions.length <= 1) return `M40 ${positions[0] ?? 10} L40 755`;

  return positions
    .slice(1)
    .reduce((path, y, index) => {
      const previousY = positions[index];
      const midpoint = previousY + (y - previousY) / 2;
      const direction = index % 2 === 0 ? 1 : -1;

      return `${path} C${40 + direction * 16} ${midpoint - 45} ${
        40 - direction * 16
      } ${midpoint + 45} 40 ${y}`;
    }, `M40 ${positions[0]}`)
    .concat(" L40 755");
}

export default function UseCaseFlow({ workflow }: UseCaseFlowProps) {
  const nodePositions = getNodePositions(workflow.length);
  const signalPath = getSignalPath(nodePositions);
  const flowStyle = {
    "--flow-height": `${Math.max(560, workflow.length * 190)}px`,
  } as CSSProperties;

  return (
    <section
      data-flow-section
      className="relative overflow-hidden px-5 py-16 sm:px-6 sm:py-24 lg:min-h-screen lg:py-12"
    >
      <div className="mx-auto w-[min(100%,1120px)]">
        <div data-flow-heading className="mb-10 max-w-[680px] lg:mb-8">
          <Text
            btext="How Ontiver solves it"
            heading="One continuous flow from first proof to future reuse."
            animate={false}
            containerClassName="items-start gap-4 pb-0"
            badgeWrapperClassName="mx-0"
            badgeTextClassName="border border-black/20 text-[var(--usecase-accent)]"
            headingClassName="mx-0 max-w-[680px] text-left text-[clamp(2rem,4vw,3.25rem)] font-bold leading-[1.08]"
          />
        </div>

        <div
          data-flow-workflow
          data-flow-pin-track
          className="relative lg:min-h-[var(--flow-height)]"
          style={flowStyle}
        >
          <svg
            className="absolute left-6 top-0 hidden h-full w-20 overflow-visible lg:left-1/2 lg:block lg:-translate-x-1/2"
            viewBox="0 0 80 760"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              d={signalPath}
              fill="none"
              stroke="rgba(0,0,0,0.1)"
              strokeWidth="1.5"
            />
            <path
              data-flow-path
              d={signalPath}
              fill="none"
              stroke="var(--usecase-accent)"
              strokeLinecap="round"
              strokeWidth="2"
              opacity="0.75"
            />
            {nodePositions.map((cy) => (
              <circle
                key={cy}
                data-flow-node-dot
                cx="40"
                cy={cy}
                r="7"
                fill="var(--usecase-accent)"
                stroke="var(--usecase-accent)"
                strokeWidth="2"
              />
            ))}
          </svg>

          <div className="space-y-8 lg:space-y-0">
            {workflow.map((step, index) => (
              <article
                key={step.title}
                data-flow-node
                className={`grid items-center gap-5 lg:min-h-[190px] lg:grid-cols-[1fr_88px_1fr] ${
                  index % 2 === 1 ? "lg:[&_.flow-copy]:col-start-3" : ""
                }`}
              >
                <div
                  className={`flow-copy ${
                    index % 2 === 1 ? "lg:col-start-3" : "lg:col-start-1"
                  }`}
                >
                  <div>
                    <p
                      data-flow-label
                      className="text-xs font-bold uppercase tracking-[0.22em] text-[var(--usecase-accent)]"
                    >
                      Step {index + 1}
                    </p>
                  </div>
                  <div>
                    <h3 className="mt-3 text-2xl font-semibold leading-tight">
                      {splitTitleLines(step.title).map((line) => (
                        <span key={line} className="block">
                          <span data-flow-title-line className="block">
                            {line}
                          </span>
                        </span>
                      ))}
                    </h3>
                  </div>
                  <div>
                    <p className="mt-3 text-sm leading-relaxed text-black/55">
                      {step.description.split(" ").map((word, wordIndex) => (
                        <span
                          key={`${word}-${wordIndex}`}
                          data-flow-word
                          className="mr-[0.24em] inline-block"
                        >
                          {word}
                        </span>
                      ))}
                    </p>
                  </div>
                </div>
                <div className="relative hidden justify-center lg:col-start-2 lg:flex">
                  <span className="grid h-12 w-12 place-items-center rounded-full border border-[var(--usecase-accent)] bg-white text-sm font-bold text-[#06160f]">
                    {index + 1}
                  </span>
                </div>
                <div
                  data-flow-visual
                  className={`relative overflow-hidden rounded-2xl border border-black/10 bg-white p-5 ${
                    index % 2 === 1 ? "lg:col-start-1 lg:row-start-1" : ""
                  }`}
                >
                  <svg
                    className="pointer-events-none absolute inset-0 h-full w-full"
                    viewBox="0 0 100 100"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                  >
                    <rect
                      data-flow-border
                      x="0.7"
                      y="0.7"
                      width="98.6"
                      height="98.6"
                      rx="8"
                      fill="none"
                      stroke="var(--usecase-accent)"
                      strokeWidth="0.8"
                      opacity="0.45"
                    />
                  </svg>
                  <span
                    data-flow-card-icon
                    className="grid h-11 w-11 place-items-center rounded-full bg-[var(--usecase-accent)]/10 text-[var(--usecase-accent)]"
                  >
                    <svg
                      className="h-7 w-7"
                      viewBox="0 0 24 24"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        data-flow-icon-path
                        d="M7 12.5 10.5 16 17.5 8M12 3.5l7 3v5.2c0 4.1-2.8 7.7-7 8.8-4.2-1.1-7-4.7-7-8.8V6.5l7-3Z"
                        stroke="currentColor"
                        strokeWidth="1.7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <p className="mt-5 text-sm leading-relaxed text-black/55">
                    Identity evidence stays connected to the workflow that
                    created it, so every reuse remains explainable.
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
