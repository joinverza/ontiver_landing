import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { securityFeatures } from "../../../data/trust";
import { individualSecurityFeatures } from "../../../data/audienceContent";
import type { Audience } from "../../../lib/audience";
import ModulesPanel from "./ModulesPanel";
import TrustCardPanel from "./TrustCardPanel";
import TrustIntroPanel from "./TrustIntroPanel";
import TrustStatementCardPanel from "./TrustStatementCardPanel";

gsap.registerPlugin(ScrollTrigger);

export default function TrustHorizontalTransition({ audience }: { audience: Audience }) {
  const features =
    audience === "enterprise" ? securityFeatures : individualSecurityFeatures;
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
      <ModulesPanel audience={audience} desktopBackground />
      <div
        ref={trackRef}
        className="relative z-20 flex w-full flex-col md:absolute md:left-0 md:top-0 md:h-full md:w-max md:flex-row md:will-change-transform"
      >
        <TrustIntroPanel audience={audience} />
        {features.map((item) => (
          <TrustCardPanel key={item.title} {...item} />
        ))}
        <TrustStatementCardPanel audience={audience} />
      </div>
      <ModulesPanel audience={audience} />
    </section>
  );
}
