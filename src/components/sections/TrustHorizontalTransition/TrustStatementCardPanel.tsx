import LinkArrow from "../../ui/LinkArrow";
import type { Audience } from "../../../lib/audience";

export default function TrustStatementCardPanel({ audience }: { audience: Audience }) {
  const isEnterprise = audience === "enterprise";
  return (
    <section
      data-card-panel
      data-trust-panel
      className="relative flex min-h-[430px] w-full shrink-0 items-center justify-center border border-black/10 border-l-black/15 bg-[#eef2ec] px-5 py-8 text-[#06160f] sm:px-8 md:h-screen md:min-h-screen md:w-[50vw] md:px-[4vw] md:py-[10vh]"
      aria-label="Explore all Ontiver modules"
    >
      <article
        data-card-shell
        className="relative flex min-h-[340px] w-full max-w-[820px] flex-col items-center justify-center overflow-hidden bg-transparent px-4 text-center md:h-[min(76vh,720px)] md:w-[42vw] md:px-6"
      >
        <div className="relative z-10 flex w-full max-w-[560px] flex-col items-center">
          <p
            data-card-title
            className="text-balance text-[clamp(1.85rem,7vw,2.6rem)] font-semibold leading-[1.04] tracking-normal text-[#06160f] md:text-[clamp(2rem,2.6vw,4rem)]"
          >
            {isEnterprise ? "Bring every identity control" : "Carry trusted identity"}
            <span className="block text-[#007d21]">
              {isEnterprise ? "into one operating layer" : "with confidence and control"}
            </span>
            {isEnterprise ? "for every workflow." : "wherever it is supported."}
          </p>
          <p
            data-card-description
            className="mt-4 max-w-[34rem] text-sm leading-relaxed text-[#5c6860] md:mt-5"
          >
            {isEnterprise
              ? "Verification, consent, dashboards, API access, and risk checks designed to work as one trusted system."
              : "Verify once, review every request, and avoid repeating the same identity process across supported services."}
          </p>

          <div data-card-link className="mt-8 md:mt-12">
            <LinkArrow
              href="#features"
              className="[--link-arrow-min-width:210px] text-[#007d21] hover:text-[#06160f]"
            >
              {isEnterprise ? "View enterprise modules" : "Explore your benefits"}
            </LinkArrow>
          </div>
        </div>
        {/* <div
          data-card-frame
          className="pointer-events-none absolute left-1/2 top-[47%] hidden h-px w-[min(72%,360px)] -translate-x-1/2 bg-[#009311]/20 md:block"
          aria-hidden="true"
        />
        <div
          data-card-orbit
          className="pointer-events-none absolute left-[18%] top-[47%] hidden text-xl font-light text-[#007d21]/55 md:block"
          aria-hidden="true"
        >
          +
        </div> */}
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
