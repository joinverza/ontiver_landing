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
      className="relative min-h-screen overflow-hidden bg-black text-white"
    >
      <img
        data-hero-image
        src={detail.imageUrl}
        alt=""
        className="absolute inset-0 h-[120%] w-full object-cover"
      />
      <div
        data-hero-overlay
        className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.2)_0%,rgba(0,0,0,0.75)_60%,rgba(0,0,0,0.92)_100%)] opacity-90"
      />
      <MagneticFillButton
        variant="dark"
        onClick={onBack}
        className="group absolute left-5 top-24 z-20 inline-flex h-11 cursor-pointer items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 text-sm font-semibold text-white backdrop-blur-md transition duration-200 hover:border-[var(--usecase-accent)] hover:bg-white hover:text-[#06160f] sm:left-10 lg:left-20"
      >
        <ArrowLeft className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-1" />
        Back
      </MagneticFillButton>
      <div
        data-hero-text
        className="absolute bottom-[72px] left-5 z-10 max-w-[760px] sm:bottom-[80px] sm:left-10 lg:left-20"
      >
        <p
          data-hero-label
        className="mb-4 text-meta font-bold uppercase tracking-[0.28em] text-[var(--usecase-accent)]"
        >
          {detail.eyebrow}
        </p>
        <h1 className="text-page-hero font-extrabold tracking-normal">
          {renderChars(detail.heroTitle)}
        </h1>
        <p
          data-hero-tagline
          className="mt-6 max-w-[560px] text-subtitle text-white/70"
        >
          {detail.tagline}
        </p>
      </div>
      <div
        data-scroll-indicator
        className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-white/35"
      >
        <span className="relative h-10 w-px bg-white/35">
          <span
            data-scroll-dot
            className="absolute left-1/2 top-0 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-white/60"
          />
        </span>
        <span className="text-[9px] font-semibold uppercase tracking-[0.3em]">
          Scroll
        </span>
      </div>
    </section>
  );
}
