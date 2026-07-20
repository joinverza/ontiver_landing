import Text from "../../base/Text";
import LinkArrow from "../../ui/LinkArrow";
import type { Audience } from "../../../lib/audience";

export default function TrustIntroPanel({ audience }: { audience: Audience }) {
  const isEnterprise = audience === "enterprise";
  return (
    <section
      id="security"
      data-trust-panel
      className="relative flex min-h-[520px] w-full shrink-0 border-r border-black/15 bg-[#eeeeec] text-[#444] md:h-screen md:min-h-screen md:w-[50vw]"
      aria-label={isEnterprise ? "Enterprise security and trust" : "Identity privacy and control"}
    >
      <div className="pointer-events-none absolute inset-0 z-20 hidden md:block" aria-hidden="true">
        <span
          data-trust-top-guide
          className="absolute left-10 top-[18vh] h-px w-[calc(100vw-5rem)] bg-black/10"
        />
        <span className="absolute bottom-0 left-1/2 top-0 w-px bg-black/10 md:left-full" />
        <span
          data-trust-crosshair
          className="absolute left-1/2 top-[18vh] -translate-x-1/2 -translate-y-1/2 text-xl font-light leading-none text-black/70 md:left-full"
        >
          +
        </span>
      </div>

      <div className="relative z-10 flex h-full w-full flex-col justify-end px-[clamp(1.5rem,6vw,7rem)] pb-16 pt-28 md:pb-[20vh] md:pt-[20vh]">
        <Text
          btext={isEnterprise ? "Security & Trust" : "Privacy & Control"}
          heading={
            isEnterprise
              ? "Designed for sensitive identity operations."
              : "Designed to keep you in control."
          }
          animate={false}
          containerClassName="items-start gap-3 pb-0 md:gap-5"
          badgeWrapperClassName="!mx-0 self-start text-start"
          badgeTextClassName="border border-black/25 bg-white/70 text-[#009311]"
          headingClassName="!mx-0 max-w-[9ch] !text-left text-panel font-medium leading-[1.08] tracking-normal"
        />
        <LinkArrow href={isEnterprise ? "/enterprise/contact" : "/#join"} className="mt-8 w-fit md:mt-12">
          {isEnterprise ? "Request security documentation" : "Join the waitlist"}
        </LinkArrow>
      </div>
    </section>
  );
}
