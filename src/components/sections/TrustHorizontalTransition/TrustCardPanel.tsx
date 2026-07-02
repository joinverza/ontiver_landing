import type { SecurityFeature } from "../../../data/trust";
import LinkArrow from "../../ui/LinkArrow";
import { resetHoverVars, updateHoverVars } from "./hoverUtils";

export default function TrustCardPanel({
  image,
  title,
  description,
  eyebrow,
  metric,
  signal,
  primaryAction,
}: SecurityFeature) {
  return (
    <section
      data-card-panel
      data-trust-panel
      className="relative flex min-h-screen w-full shrink-0 items-center justify-center border-l border-black/10 border-l-black/15 bg-[#eeeeec] px-5 py-14 text-[#202020] sm:px-8 md:h-screen md:w-[50vw] md:px-[4vw] md:py-[10vh]"
      aria-label={title}
    >
      <article
        data-card-shell
        className="group flex h-[min(80vh,740px)] w-full max-w-[840px] flex-col overflow-hidden transition-colors duration-300 not-[]:md:w-[42vw]"
      >
        <div
          data-card-image
          className="relative h-[75%] overflow-hidden rounded-lg bg-[#d9ddd8] [--mx:50%] [--my:50%] [--tx:0px] [--ty:0px]"
          onPointerMove={updateHoverVars}
          onPointerLeave={resetHoverVars}
        >
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover saturate-[0.82] contrast-[1.06] transition-[filter,transform] duration-[360ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:[filter:saturate(1.18)_contrast(1.08)_brightness(1.04)] group-hover:[transform:scale(1.075)_translate3d(var(--tx),var(--ty),0)]"
          />
          <div
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(245,247,242,0.04)_0%,rgba(5,21,14,0.1)_48%,rgba(5,21,14,0.48)_100%)]"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_var(--mx)_var(--my),transparent_0_38px,rgba(0,147,17,0.42)_39px_40px,transparent_41px),linear-gradient(90deg,transparent_calc(var(--mx)_-_0.5px),rgba(0,147,17,0.45)_var(--mx),transparent_calc(var(--mx)_+_0.5px)),linear-gradient(0deg,transparent_calc(var(--my)_-_0.5px),rgba(0,147,17,0.45)_var(--my),transparent_calc(var(--my)_+_0.5px))] opacity-0 transition-opacity duration-300 group-hover:animate-[problem-target-pulse_1.4s_ease-in-out_infinite] group-hover:opacity-100"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute left-[18px] top-[24%] h-0.5 w-[42px] rounded-full bg-[linear-gradient(90deg,#009311,transparent)] opacity-0 group-hover:animate-[problem-data-travel_1.05s_ease-in-out_infinite]"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute left-[18px] top-1/2 h-0.5 w-16 rounded-full bg-[linear-gradient(90deg,#009311,transparent)] opacity-0 group-hover:animate-[problem-data-travel_1.05s_ease-in-out_infinite] group-hover:[animation-delay:0.18s]"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute left-[18px] top-[76%] h-0.5 w-[34px] rounded-full bg-[linear-gradient(90deg,#009311,transparent)] opacity-0 group-hover:animate-[problem-data-travel_1.05s_ease-in-out_infinite] group-hover:[animation-delay:0.36s]"
            aria-hidden="true"
          />
          <div
            data-card-orbit
            className="pointer-events-none absolute right-7 top-7 size-24 rounded-full border border-white/25"
            aria-hidden="true"
          >
            <span className="absolute left-1/2 top-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#22c55e]" />
            <span className="absolute left-1/2 top-0 h-1/2 w-px -translate-x-1/2 origin-bottom bg-white/45" />
            <span className="absolute inset-3 rounded-full border border-dashed border-white/20" />
          </div>
          <p
            data-card-label
            className="absolute left-8 top-8 text-[10px] font-semibold uppercase leading-tight tracking-[0.22em] text-white/85"
          >
            {eyebrow}
            <span className="block text-white/60">{signal}</span>
          </p>
          <div
            data-card-metric
            className="absolute bottom-7 left-8 flex items-end gap-3 text-white"
          >
            <span className="text-[clamp(2.3rem,4vw,4.8rem)] font-semibold leading-none">
              {metric}
            </span>
            <span className="mb-1 max-w-[12ch] text-[10px] font-semibold uppercase tracking-[0.18em] text-white/65">
              Trust signal
            </span>
          </div>
          <div
            data-card-frame
            className="pointer-events-none absolute inset-3 border border-white/25"
            aria-hidden="true"
          />
        </div>

        <div className="flex min-h-0 flex-col bg-[#eeeeec] py-7">
          <h3
            data-card-title
            className="max-w-[33ch] text-[clamp(1.7rem,2.4vw,1.1rem)] font-semibold leading-none tracking-normal"
          >
            {title}
          </h3>
          <div
            data-card-actions
            className="mt-auto grid grid-cols-1 items-end justify-between gap-5 pt-5 sm:grid-cols-[minmax(0,1fr)_auto]"
          >
            <p
              data-card-description
              className="max-w-[34ch] text-[13px] leading-relaxed text-[#555]/80"
            >
              {description}
            </p>
            <div data-card-link className="sm:justify-self-end">
              <LinkArrow
                href={primaryAction.href}
                className="[--link-arrow-min-width:150px]"
              >
                {primaryAction.label}
              </LinkArrow>
            </div>
          </div>
        </div>
      </article>
    </section>
  );
}
