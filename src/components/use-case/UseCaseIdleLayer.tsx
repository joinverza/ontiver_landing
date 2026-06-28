import type { UseCaseCard } from "../../data/useCases";

export default function UseCaseIdleLayer({
  type,
}: {
  type: UseCaseCard["idle"];
}) {
  if (type === "fintech") {
    return (
      <div
        className="pointer-events-none absolute inset-0 z-[3]"
        aria-hidden="true"
      >
        <span className="use-case-dollar absolute left-[18%] top-[22%] font-sans text-[22px] font-extrabold text-[#70ff8a]/70 opacity-45">
          $
        </span>
        <span className="use-case-dollar absolute right-[22%] top-[34%] font-sans text-base font-extrabold text-[#70ff8a]/70 opacity-45">
          $
        </span>
        <span className="use-case-dollar absolute bottom-[32%] right-[36%] font-sans text-lg font-extrabold text-[#70ff8a]/70 opacity-45">
          $
        </span>
      </div>
    );
  }

  if (type === "lenders") {
    return (
      <div
        className="pointer-events-none absolute right-[15%] top-[21%] z-[3] h-[150px] w-[150px]"
        aria-hidden="true"
      >
        <span className="use-case-ring absolute inset-0 rounded-full border border-[#70ff8a]/25" />
        <span className="use-case-ring absolute inset-[19%] rounded-full border border-[#70ff8a]/25" />
        <span className="use-case-ring absolute inset-[36%] rounded-full border border-[#70ff8a]/25" />
      </div>
    );
  }

  if (type === "marketplaces") {
    return (
      <span
        className="pointer-events-none absolute left-1/2 top-[18%] z-[3] size-px origin-top"
        aria-hidden="true"
      />
    );
  }

  if (type === "platforms") {
    return (
      <div
        className="pointer-events-none absolute inset-0 z-[3]"
        aria-hidden="true"
      >
        <span className="use-case-network-line absolute left-[30%] top-[39%] h-px w-[27%] origin-left rotate-[12deg] bg-[#70ff8a]/20 opacity-20" />
        <span className="use-case-network-line absolute left-[43%] top-[57%] h-px w-[24%] origin-left rotate-[-18deg] bg-[#70ff8a]/20 opacity-20" />
        <span className="use-case-network-line absolute right-[18%] top-[47%] h-px w-[20%] origin-left rotate-[26deg] bg-[#70ff8a]/20 opacity-20" />
        <span className="use-case-central-figure absolute right-[31%] top-[32%] size-[34px] rounded-full bg-[radial-gradient(circle,rgba(112,255,138,0.5),rgba(0,147,17,0.08))] brightness-100" />
      </div>
    );
  }

  if (type === "schools") {
    return (
      <span
        className="use-case-scan-line pointer-events-none absolute left-0 right-0 top-0 z-[3] h-0.5 bg-[linear-gradient(90deg,transparent,rgba(112,255,138,0.8),transparent)]"
        aria-hidden="true"
      />
    );
  }

  return (
    <span
      className="use-case-screen-flicker pointer-events-none absolute right-[8%] top-[20%] z-[3] h-[42%] w-[38%] bg-[#70ff8a]/15 opacity-15 mix-blend-screen"
      aria-hidden="true"
    />
  );
}
