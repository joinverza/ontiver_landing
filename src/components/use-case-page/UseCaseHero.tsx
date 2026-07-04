import { ArrowLeft } from "lucide-react";
import MagneticFillButton from "../ui/MagneticFillButton";
import type { UseCasePageDetail } from "../../data/useCases";

type UseCaseHeroProps = {
  detail: UseCasePageDetail;
  onBack: () => void;
};

function renderChars(text: string) {
  return Array.from(text).map((char, index) => (
    <span
      key={`${char}-${index}`}
      data-hero-char
      className="inline-block will-change-transform"
    >
      {char === " " ? "\u00a0" : char}
    </span>
  ));
}

export default function UseCaseHero({ detail, onBack }: UseCaseHeroProps) {
  return (
    <section
      data-hero-section
      className="relative isolate overflow-hidden bg-[#f3f3f1] px-5 pb-14 pt-28 text-[#06160f] sm:px-8 sm:pb-20 sm:pt-32 lg:px-10 lg:pb-24 lg:pt-40"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.2] [background-image:linear-gradient(to_right,rgba(0,45,14,0.055)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,45,14,0.055)_1px,transparent_1px)] [background-size:92px_92px]"
        aria-hidden="true"
      />
      <div className="relative z-10 mx-auto grid w-full max-w-[1320px] items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
        <div data-hero-text>
          <MagneticFillButton
            variant="light"
            onClick={onBack}
            className="group mb-8 inline-flex h-11 cursor-pointer items-center gap-2 rounded-full border border-black/15 bg-white px-4 text-sm font-semibold text-[#06160f] transition duration-200 hover:border-black/30"
          >
            <ArrowLeft className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-1" />
            Back
          </MagneticFillButton>
          <p
            data-hero-label
            className="mb-4 text-[10px] font-bold uppercase tracking-[0.4em] text-[var(--usecase-accent)]"
          >
            {detail.eyebrow}
          </p>
          <h1 className="max-w-[9ch] text-[clamp(3.7rem,7vw,6.5rem)] font-extrabold leading-[0.92] tracking-tight">
            {renderChars(detail.heroTitle)}
          </h1>
          <p
            data-hero-tagline
            className="mt-6 max-w-[560px] text-base leading-relaxed text-black/58 sm:text-lg"
          >
            {detail.tagline}
          </p>
        </div>

        <div className="relative flex min-h-[340px] items-center justify-center sm:min-h-[430px] lg:min-h-[560px]">
          <img
            data-hero-image
            src={detail.imageUrl}
            alt={`${detail.eyebrow} identity verification illustration`}
            className="h-auto w-full max-w-[680px] object-contain drop-shadow-[0_28px_44px_rgba(0,41,27,0.1)]"
          />
        </div>
      </div>
    </section>
  );
}
