import LinkArrow from "../../ui/LinkArrow";

export default function TrustStatementCardPanel() {
  return (
    <section
      data-card-panel
      data-trust-panel
      className="relative flex min-h-screen w-full shrink-0 items-center justify-center border border-black/10 border-l-black/15 bg-[#eef2ec] px-5 py-14 text-[#06160f] sm:px-8 md:h-screen md:w-[50vw] md:px-[4vw] md:py-[10vh]"
      aria-label="Explore all Ontiver modules"
    >
      <article
        data-card-shell
        className="relative flex h-[min(76vh,720px)] w-full max-w-[820px] flex-col items-center justify-center overflow-hidden bg-transparent px-6 text-center md:w-[42vw]"
      >
        <div className="relative z-10 flex w-full max-w-[560px] flex-col items-center">
          <p
            data-card-title
            className="text-balance text-[clamp(2rem,2.6vw,4rem)] font-semibold leading-[1.02] tracking-normal text-[#06160f]"
          >
            Discover our complete collection
            <span className="block text-[#007d21]">
              of reusable identity modules
            </span>
            for every workflow.
          </p>
          <p
            data-card-description
            className="mt-5 max-w-[34rem] text-sm leading-relaxed text-[#5c6860]"
          >
            Verification, consent, dashboarding, API access, and risk checks
            designed to work as one trusted system.
          </p>

          <div data-card-link className="mt-12">
            <LinkArrow
              href="#modules"
              className="[--link-arrow-min-width:210px] text-[#007d21] hover:text-[#06160f]"
            >
              View all modules
            </LinkArrow>
          </div>
        </div>
        <div
          data-card-frame
          className="pointer-events-none absolute left-1/2 top-[47%] h-px w-[min(72%,360px)] -translate-x-1/2 bg-[#009311]/20"
          aria-hidden="true"
        />
        <div
          data-card-orbit
          className="pointer-events-none absolute left-[18%] top-[47%] hidden text-xl font-light text-[#007d21]/55 md:block"
          aria-hidden="true"
        >
          +
        </div>
        <div
          data-card-metric
          className="pointer-events-none absolute inset-0 opacity-0"
          aria-hidden="true"
        />
        <div
          data-card-secondary-link
          className="pointer-events-none absolute inset-0 opacity-0"
          aria-hidden="true"
        />
      </article>
    </section>
  );
}
