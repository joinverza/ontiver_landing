import Text from "../../base/Text";
import LinkArrow from "../../ui/LinkArrow";

export default function TrustIntroPanel() {
  return (
    <section
      id="security"
      data-trust-panel
      className="relative flex min-h-screen w-full shrink-0 border-r border-black/15 bg-[#eeeeec] text-[#444] md:h-screen md:w-[50vw]"
      aria-label="Security and trust introduction"
    >
      <div className="pointer-events-none absolute inset-0 z-20" aria-hidden="true">
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

      <div className="relative z-10 flex h-full w-full flex-col justify-end px-[clamp(1.5rem,6vw,7rem)] pb-[20vh] pt-[20vh]">
        <Text
          btext="Security & Trust"
          heading="Designed for sensitive identity data."
          animate={false}
          containerClassName="items-start gap-5 pb-0"
          badgeWrapperClassName="!mx-0 self-start text-start"
          badgeTextClassName="border border-black/25 bg-white/70 text-[#009311]"
          headingClassName="!mx-0 max-w-[9ch] !text-left text-[clamp(3rem,3.8vw,4.8rem)] font-medium leading-[1.2]! tracking-wide"
        />
        <LinkArrow href="/contact" className="mt-12 w-fit">
          Request documentation
        </LinkArrow>
      </div>
    </section>
  );
}
