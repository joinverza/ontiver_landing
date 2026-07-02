import LinkArrow from "../../ui/LinkArrow";

type ModulesPanelProps = {
  desktopBackground?: boolean;
};

export default function ModulesPanel({
  desktopBackground = false,
}: ModulesPanelProps) {
  return (
    <section
      id="modules"
      data-trust-panel
      className={
        desktopBackground
          ? "absolute inset-0 z-0 hidden h-screen w-screen items-center justify-center overflow-hidden bg-[#f7f7f5] px-12 py-0 text-[#06160f] md:flex lg:px-16"
          : "relative isolate flex min-h-screen w-full shrink-0 items-center justify-center overflow-hidden border-l border-black/15 bg-[#f7f7f5] px-5 py-16 text-[#06160f] sm:px-8 md:hidden"
      }
      aria-label="Ontiver service layer"
    >
      <div
        className="pointer-events-none absolute inset-y-0 left-0 w-px bg-black/10"
        aria-hidden="true"
      />
      <div className="relative z-10 flex h-full w-full flex-col items-center justify-center">
        <h2 className="text-center text-[clamp(4rem,7.4vw,11rem)] font-semibold uppercase leading-[0.9] tracking-normal text-[#06160f]">
          Identity
          <span className="block text-[#007d21]">Consent</span>
          <span className="block">Compliance</span>
        </h2>
        <p className="absolute bottom-[10vh] left-1/2 max-w-[28rem] -translate-x-1/2 text-center text-sm font-medium leading-relaxed text-[#5c6860]">
          Verify once, reuse securely, and keep every consent event tied to a
          trusted record.
        </p>
      </div>
      {desktopBackground ? (
        <LinkArrow
          href="#faq"
          className="absolute bottom-8 right-8 z-20 hidden md:inline-flex lg:bottom-10 lg:right-12"
        >
          Continue
        </LinkArrow>
      ) : null}
    </section>
  );
}
