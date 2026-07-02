import { useRef, type PointerEvent } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { securityFeatures } from "../../../data/trust";
import type { SecurityFeature } from "../../../data/trust";
import Text from "../../base/Text";
import LinkArrow from "../../ui/LinkArrow";

gsap.registerPlugin(ScrollTrigger);

const updateHoverVars = (event: PointerEvent<HTMLElement>) => {
  const target = event.currentTarget;
  const rect = target.getBoundingClientRect();
  const x = (event.clientX - rect.left) / rect.width;
  const y = (event.clientY - rect.top) / rect.height;

  target.style.setProperty("--mx", `${x * 100}%`);
  target.style.setProperty("--my", `${y * 100}%`);
  target.style.setProperty("--tx", `${(0.5 - x) * 8}px`);
  target.style.setProperty("--ty", `${(0.5 - y) * 8}px`);
};

const resetHoverVars = (event: PointerEvent<HTMLElement>) => {
  const target = event.currentTarget;

  target.style.setProperty("--mx", "50%");
  target.style.setProperty("--my", "50%");
  target.style.setProperty("--tx", "0px");
  target.style.setProperty("--ty", "0px");
};

function TrustIntroPanel() {
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
        <LinkArrow
          href="/contact"
          className="mt-12 w-fit"
        >
          Request documentation
        </LinkArrow>
      </div>
    </section>
  );
}

function TrustCardPanel({
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
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 bg-[radial-gradient(circle_at_var(--mx)_var(--my),transparent_0_38px,rgba(0,147,17,0.42)_39px_40px,transparent_41px),linear-gradient(90deg,transparent_calc(var(--mx)_-_0.5px),rgba(0,147,17,0.45)_var(--mx),transparent_calc(var(--mx)_+_0.5px)),linear-gradient(0deg,transparent_calc(var(--my)_-_0.5px),rgba(0,147,17,0.45)_var(--my),transparent_calc(var(--my)_+_0.5px))] group-hover:animate-[problem-target-pulse_1.4s_ease-in-out_infinite] group-hover:opacity-100"
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

function TrustStatementCardPanel() {
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
        {/* <div
          data-card-image
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(0,147,17,0.1),transparent_34%),linear-gradient(135deg,rgba(255,255,255,0.72),rgba(230,237,229,0.86))]"
          aria-hidden="true"
        /> */}

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

function ModulesPanel({
  desktopBackground = false,
}: {
  desktopBackground?: boolean;
}) {
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
        <h2
          className="text-center text-[clamp(4rem,7.4vw,11rem)] font-semibold uppercase leading-[0.9] tracking-normal text-[#06160f]"
        >
          Identity
          <span className="block text-[#007d21]">Consent</span>
          <span className="block">Compliance</span>
        </h2>
        <p
          className="absolute bottom-[10vh] left-1/2 max-w-[28rem] -translate-x-1/2 text-center text-sm font-medium leading-relaxed text-[#5c6860]"
        >
          Verify once, reuse securely, and keep every consent event tied to a
          trusted record.
        </p>
      </div>
      <LinkArrow
        href="#faq"
        className="absolute bottom-8 right-8 z-20 hidden md:inline-flex lg:bottom-10 lg:right-12"
      >
        Continue
      </LinkArrow>
    </section>
  );
}

export default function TrustHorizontalTransition() {
  const wrapperRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const wrapper = wrapperRef.current;
      const track = trackRef.current;

      if (!wrapper || !track) return;

      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (reduceMotion) return;

      const media = gsap.matchMedia();

      media.add("(min-width: 768px)", () => {
        const totalScroll = () => Math.max(1, track.scrollWidth);
        const navbar = document.querySelector<HTMLElement>(
          "[data-ontiver-navbar]",
        );

        const scrollTween = gsap.to(track, {
          x: () => -totalScroll(),
          ease: "none",
          scrollTrigger: {
            trigger: wrapper,
            start: "top top",
            end: () => `+=${totalScroll()}`,
            scrub: 1.15,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        const navTrigger = ScrollTrigger.create({
          trigger: wrapper,
          start: "top top",
          end: () => `+=${totalScroll()}`,
          onEnter: () => {
            if (!navbar) return;
            gsap.to(navbar, {
              y: -120,
              opacity: 0,
              duration: 0.3,
              ease: "power2.in",
              overwrite: "auto",
            });
          },
          onLeave: () => {
            if (!navbar) return;
            gsap.to(navbar, {
              y: 0,
              opacity: 1,
              duration: 0.4,
              ease: "power2.out",
              overwrite: "auto",
              onComplete: () => ScrollTrigger.refresh(),
            });
          },
          onEnterBack: () => {
            if (!navbar) return;
            gsap.to(navbar, {
              y: -120,
              opacity: 0,
              duration: 0.3,
              ease: "power2.in",
              overwrite: "auto",
            });
          },
          onLeaveBack: () => {
            if (!navbar) return;
            gsap.to(navbar, {
              y: 0,
              opacity: 1,
              duration: 0.4,
              ease: "power2.out",
              overwrite: "auto",
            });
          },
        });

        const guideLine = wrapper.querySelector<HTMLElement>(
          "[data-trust-top-guide]",
        );
        const crosshair = wrapper.querySelector<HTMLElement>(
          "[data-trust-crosshair]",
        );

        gsap.to([guideLine, crosshair].filter(Boolean), {
          y: () => -(window.innerHeight * 0.18),
          ease: "power2.out",
          scrollTrigger: {
            trigger: wrapper,
            start: "top bottom",
            end: "top top",
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });

        const cardPanels = gsap.utils.toArray<HTMLElement>(
          wrapper.querySelectorAll("[data-card-panel]"),
        );

        cardPanels.forEach((panel, index) => {
          const shell = panel.querySelector<HTMLElement>("[data-card-shell]");
          const image = panel.querySelector<HTMLElement>("[data-card-image]");
          const orbit = panel.querySelector<HTMLElement>("[data-card-orbit]");
          const metric = panel.querySelector<HTMLElement>("[data-card-metric]");
          const title = panel.querySelector<HTMLElement>("[data-card-title]");
          const description = panel.querySelector<HTMLElement>(
            "[data-card-description]",
          );
          const link = panel.querySelector<HTMLElement>("[data-card-link]");
          const label = panel.querySelector<HTMLElement>("[data-card-label]");
          const frame = panel.querySelector<HTMLElement>("[data-card-frame]");
          const flowItems = gsap.utils.toArray<HTMLElement>(
            panel.querySelectorAll("[data-card-flow] > *"),
          );
          const chips = gsap.utils.toArray<HTMLElement>(
            panel.querySelectorAll("[data-card-chips] > *"),
          );
          const entryStart = index === 0 ? "left 96%" : "left 88%";

          if (!shell) return;

          const textItems = [title, description, link].filter(
            (item): item is HTMLElement => Boolean(item),
          );

          gsap.set(shell, {
            opacity: 0,
            x: 92,
            y: 112,
            scale: 0.92,
            transformOrigin: "bottom right",
          });

          gsap.set(image, {
            opacity: 0,
            x: 34,
            y: 34,
            scale: 0.98,
            transformOrigin: "bottom right",
          });

          gsap.set(label, {
            opacity: 0,
            x: 18,
            y: 18,
          });

          gsap.set(metric, {
            opacity: 0,
            x: -18,
            y: 18,
          });

          gsap.set(orbit, {
            opacity: 0,
            rotate: -28,
            scale: 0.82,
          });

          gsap.set([flowItems, chips, textItems].flat(), {
            opacity: 0,
            x: 24,
            y: 32,
          });

          if (frame) {
            gsap.set(frame, {
              clipPath: "inset(0 100% 0 0)",
            });
          }

          const cardTl = gsap.timeline({
            scrollTrigger: {
              trigger: panel,
              containerAnimation: scrollTween,
              start: entryStart,
              end: "right 8%",
              scrub: 0.75,
            },
          });

          cardTl
            .to(shell, {
              opacity: 1,
              x: 0,
              y: 0,
              scale: 1,
              duration: 0.28,
              ease: "power3.out",
            })
            .to(
              image,
              {
                opacity: 1,
                x: 0,
                y: 0,
                scale: 1,
                duration: 0.26,
                ease: "power3.out",
              },
              "<",
            )
            .to(
              label,
              {
                opacity: 1,
                x: 0,
                y: 0,
                duration: 0.2,
                ease: "power2.out",
              },
              "<0.06",
            );

          cardTl.to(
            [metric, orbit].filter(Boolean),
            {
              opacity: 1,
              x: 0,
              y: 0,
              rotate: 0,
              scale: 1,
              duration: 0.22,
              stagger: 0.04,
              ease: "power2.out",
            },
            "<0.04",
          );

          if (frame) {
            cardTl.to(
              frame,
              {
                clipPath: "inset(0 0% 0 0)",
                duration: 0.22,
                ease: "power2.out",
              },
              "<",
            );
          }

          cardTl
            .to(
              flowItems,
              {
                opacity: 1,
                x: 0,
                y: 0,
                duration: 0.2,
                stagger: 0.025,
                ease: "power2.out",
              },
              "<0.08",
            )
            .to(
              [title, description].filter(Boolean),
              {
                opacity: 1,
                x: 0,
                y: 0,
                duration: 0.24,
                stagger: 0.035,
                ease: "power2.out",
              },
              "<0.06",
            )
            .to(
              chips,
              {
                opacity: 1,
                x: 0,
                y: 0,
                duration: 0.18,
                stagger: 0.025,
                ease: "power2.out",
              },
              "<0.06",
            )
            .to(
              [link].filter(Boolean),
              {
                opacity: 1,
                x: 0,
                y: 0,
                duration: 0.2,
                stagger: 0.035,
                ease: "power2.out",
              },
              "<0.06",
            )
            .to(
              shell,
              {
                opacity: 0.58,
                x: -34,
                y: -24,
                scale: 0.965,
                duration: 0.2,
                ease: "power2.in",
              },
              0.82,
            )
            .to(
              [flowItems, chips, textItems].flat(),
              {
                opacity: 0.4,
                x: -8,
                y: -12,
                duration: 0.14,
                ease: "power2.in",
              },
              0.86,
            );
        });

        const refreshTimer = window.setTimeout(() => {
          ScrollTrigger.refresh();
        }, 120);

        return () => {
          window.clearTimeout(refreshTimer);
          navTrigger.kill();
          scrollTween.kill();
          gsap.set([track, navbar].filter(Boolean), { clearProps: "all" });
        };
      });

      return () => {
        media.revert();
      };
    },
    { scope: wrapperRef },
  );

  return (
    <section
      ref={wrapperRef}
      data-horizontal-transition
      data-section-reveal="off"
      className="relative h-auto w-full overflow-hidden bg-[#eeeeec] md:ml-[calc(-50vw+50%)] md:h-screen md:w-screen"
    >
      <ModulesPanel desktopBackground />
      <div
        ref={trackRef}
        className="relative z-20 flex w-full flex-col md:absolute md:left-0 md:top-0 md:h-full md:w-max md:flex-row md:will-change-transform"
      >
        <TrustIntroPanel />
        {securityFeatures.map((item) => (
          <TrustCardPanel key={item.title} {...item} />
        ))}
        <TrustStatementCardPanel />
      </div>
      <ModulesPanel />
    </section>
  );
}
