import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  orbitalStarts,
  solutionCellClasses,
  solutionSteps,
  type SolutionStep,
} from "../../../data/solution";
import AuroraBadge from "../../ui/AuroraBadge";

gsap.registerPlugin(ScrollTrigger);

function PipelineTrack() {
  return (
    <div
      className="solution-progress pointer-events-none fixed top-0 right-[clamp(18px,3vw,44px)] z-[80] hidden h-screen w-7 translate-x-2.5 opacity-0 transition-[opacity,transform] duration-300 ease-in-out [.solution-is-pinned_&]:translate-x-0 [.solution-is-pinned_&]:opacity-100 md:block"
      aria-hidden="true"
    >
      <div className="absolute top-0 bottom-0 left-1/2 w-0.5 -translate-x-1/2 bg-dark-primary/15">
        <div className="absolute right-0 bottom-0 left-0 bg-[linear-gradient(180deg,#20d236,#009311),radial-gradient(circle_at_50%_0,rgba(0,147,17,0.5),transparent_44%)] [height:var(--solution-progress-y)]" />
        <div className="solution-progress-dot absolute left-1/2 bottom-[var(--solution-progress-y)] size-3 -translate-x-1/2 translate-y-1/2 rounded-full [transform-origin:center]">
          <div className="solution-progress-dot-core absolute inset-0 rounded-full bg-[#009311] [transform-origin:center] animate-[solution-progress-dot-pulse_1.6s_ease-in-out_infinite] [.solution-completing_&]:animate-none">
            <div className="absolute inset-[2px] rounded-full bg-[#70ff8a]" />
          </div>
        </div>
      </div>

      {solutionSteps.map((step, index) => (
        <span
          key={step.title}
          className="solution-progress-tick absolute left-1/2 h-0.5 w-3 -translate-x-1/2 translate-y-1/2 rounded-full bg-dark-primary/20 transition-[background-color,opacity,width] duration-180 ease-in-out [&.is-active]:w-[18px] [&.is-active]:bg-light-primary [&.is-active]:opacity-100"
          data-step={index}
          style={{ bottom: `${((index + 1) / solutionSteps.length) * 100}%` }}
        />
      ))}
    </div>
  );
}

function BentoGridLines() {
  return (
    <div
      className="solution-grid-lines pointer-events-none absolute inset-0 z-[2] opacity-0 max-md:hidden"
      aria-hidden="true"
    >
      <span className="absolute top-1/2 right-0 left-0 block h-px -translate-y-0.5 bg-light-primary/20" />
      <span className="absolute top-0 bottom-1/2 left-[33.333%] block w-px -translate-x-0.5 bg-light-primary/20" />
      <span className="absolute top-0 bottom-1/2 left-[66.666%] block w-px -translate-x-0.5 bg-light-primary/20" />
      <span className="absolute top-1/2 bottom-0 left-1/2 block w-px -translate-x-0.5 bg-light-primary/20" />
    </div>
  );
}

function SolutionItem({
  item,
  stepIndex,
}: {
  item: SolutionStep;
  stepIndex: number;
}) {
  return (
    <div
      className={`solution-item group/solutionitem relative min-h-[170px] cursor-default overflow-hidden rounded-none p-[clamp(20px,3.1vw,38px)] transition-[background-color,transform] duration-300 ease-out [transform:translateZ(0)] pointer-events-none [&.is-revealed.is-grid-ready]:pointer-events-auto [&.is-revealed.is-grid-ready:hover]:[transform:translateY(-4px)_translateZ(0)] [&.is-revealed.is-grid-ready:hover]:bg-[#009311]/[0.055] md:min-h-[190px] max-md:border-t-[1.5px] max-md:border-light-primary/60 max-md:last:border-b-[1.5px] ${solutionCellClasses[stepIndex] ?? ""}`}
      data-step={stepIndex}
    >
      <div className="pointer-events-none absolute inset-0 z-[3] border border-[#009311]/55 opacity-0 transition-opacity duration-200 group-[.is-revealed.is-grid-ready]/solutionitem:hover:opacity-100 group-[.is-revealed.is-grid-ready]/solutionitem:hover:duration-150" />
      <span className="pointer-events-none absolute top-0 left-0 z-[4] h-3 w-3 border-t-2 border-l-2 border-[#009311] opacity-0 transition-opacity duration-200 group-[.is-revealed.is-grid-ready]/solutionitem:hover:opacity-100" />
      <span className="pointer-events-none absolute right-0 bottom-0 z-[4] h-3 w-3 border-b-2 border-r-2 border-[#009311] opacity-0 transition-opacity duration-200 group-[.is-revealed.is-grid-ready]/solutionitem:hover:opacity-100" />

      <div className="relative z-10 flex h-full w-full flex-col items-center justify-center text-center">
        <div className="icon-box relative mb-4 flex h-14 w-14 origin-center items-center justify-center rounded-lg border border-black/5 bg-white transition-all duration-200 ease-out group-[.is-revealed.is-grid-ready]/solutionitem:hover:border-[#009311]/30 md:mb-5 md:h-16 md:w-16">
          <span
            className="solution-icon-sheen pointer-events-none absolute inset-[13px] overflow-hidden rounded-md opacity-0 before:absolute before:top-[-18%] before:bottom-[-18%] before:left-[-42%] before:w-[34%] before:bg-[linear-gradient(110deg,transparent,rgba(0,147,17,0.34),transparent)] before:[transform:translateX(-160%)_skewX(-18deg)] before:content-[''] [.is-revealed[data-step='2']_&]:opacity-100"
            aria-hidden="true"
          />
          <img
            src={item.icon}
            alt={`${item.title} icon`}
            className="solution-asset-icon relative z-10 h-8 w-8 [clip-path:inset(0_100%_0_0)] md:h-9 md:w-9"
          />
        </div>

        <div className="w-full max-w-[300px]">
          <h6 className="item-title relative inline-block pb-2 text-lg font-semibold text-black transition-colors duration-150 [clip-path:inset(0_100%_0_0)] group-[.is-revealed.is-grid-ready]/solutionitem:hover:text-[#009311] md:text-xl">
            {item.title}
          </h6>

          <div className="text-sm leading-relaxed text-black/90 md:text-base">
            <span className="desc-line block text-center transition-colors duration-150 group-[.is-revealed.is-grid-ready]/solutionitem:hover:text-black/75">
              {item.para}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Solution() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const headingLeftRef = useRef<HTMLSpanElement>(null);
  const headingRightRef = useRef<HTMLSpanElement>(null);
  const underlineRef = useRef<HTMLSpanElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const content = contentRef.current;
      const badge = badgeRef.current;
      const heading = headingRef.current;
      const headingLeft = headingLeftRef.current;
      const headingRight = headingRightRef.current;
      const underline = underlineRef.current;

      if (!section || !content || !badge || !heading || !headingLeft || !headingRight || !underline) {
        return;
      }

      const items = Array.from(section.querySelectorAll<HTMLElement>(".solution-item"));
      const gridLines = section.querySelector<HTMLElement>(".solution-grid-lines");
      const mm = gsap.matchMedia();
      const progressTicks = Array.from(
        section.querySelectorAll<HTMLElement>(".solution-progress-tick")
      );
      const progressDot = section.querySelector<HTMLElement>(
        ".solution-progress-dot"
      );

      section.style.setProperty("--solution-progress", "0");
      section.style.setProperty("--solution-progress-y", "0%");

      const shimmerTl = gsap.timeline({ paused: true, repeat: -1 });
      shimmerTl
        .to({}, { duration: 10 })
        .fromTo(
          heading,
          { backgroundPosition: "-200% 0" },
          { backgroundPosition: "200% 0", duration: 0.6, ease: "none" }
        );

      gsap.set(badge, { scale: 0.85, autoAlpha: 0 });
      gsap.set(headingLeft, { x: -30, autoAlpha: 0 });
      gsap.set(headingRight, { x: 30, autoAlpha: 0 });
      gsap.set(underline, {
        scaleX: 0,
        autoAlpha: 1,
        transformOrigin: "left center",
      });
      if (gridLines) gsap.set(gridLines, { autoAlpha: 0, y: 8 });

      items.forEach((item, index) => {
        const iconBox = item.querySelector<HTMLElement>(".icon-box");
        const title = item.querySelector<HTMLElement>(".item-title");
        const descLines = Array.from(item.querySelectorAll<HTMLElement>(".desc-line"));
        const assetIcon = item.querySelector<HTMLElement>(".solution-asset-icon");
        const start = orbitalStarts[index] || orbitalStarts[1];

        gsap.set(item, { autoAlpha: 0 });
        if (iconBox) {
          gsap.set(iconBox, {
            x: start.x,
            y: start.y,
            rotation: start.rotation,
            autoAlpha: 0,
            scale: 0.82,
            transformOrigin: "center center",
          });
        }
        if (assetIcon) {
          gsap.set(assetIcon, {
            clipPath: "inset(0 100% 0 0)",
            opacity: 1,
            filter: "brightness(1.4) saturate(1.4)",
          });
        }
        if (title) {
          gsap.set(title, {
            clipPath: "inset(0 100% 0 0)",
            autoAlpha: 1,
          });
        }
        if (descLines.length) {
          gsap.set(descLines, {
            clipPath: "inset(0 100% 0 0)",
            autoAlpha: 1,
          });
        }
      });

      mm.add("(min-width: 768px)", () => {
        gsap.set(content, { opacity: 1, y: 0 });

        const setPinnedActive = (
          isActive: boolean,
          resetClasses = false
        ) => {
          section.classList.toggle("solution-is-pinned", isActive);
          section.classList.remove("solution-completing");
          window.dispatchEvent(
            new CustomEvent("solution-pin-change", {
              detail: { isPinned: isActive },
            })
          );

          if (isActive) {
            gsap.set(content, { opacity: 1 });
            if (gridLines) {
              gsap.fromTo(
                gridLines,
                { autoAlpha: 0, y: 8 },
                {
                  autoAlpha: 1,
                  y: 0,
                  duration: 0.55,
                  ease: "power2.out",
                  overwrite: true,
                }
              );
            }
            shimmerTl.play();
            return;
          }

          if (gridLines) {
            gsap.to(gridLines, {
              autoAlpha: 0,
              duration: 0.25,
              ease: "power1.out",
              overwrite: true,
            });
          }
          shimmerTl.pause(0);

          if (resetClasses) {
            items.forEach((item) => {
              item.classList.remove("is-revealed", "is-grid-ready");
            });
          }
        };

        const updateProgress = (progress: number, isActive: boolean) => {
          section.style.setProperty("--solution-progress", `${progress}`);
          section.style.setProperty(
            "--solution-progress-y",
            `${progress * 100}%`
          );

          progressTicks.forEach((tick, index) => {
            const threshold = (index + 0.96) / progressTicks.length;
            tick.classList.toggle("is-active", isActive && progress >= threshold);
          });
        };

        const updateRevealedItems = (progress: number, isActive: boolean) => {
          updateProgress(progress, isActive);
          items.forEach((item, index) => {
            const cellReadyPoint = (index + 0.78) / items.length;
            const revealPoint = (index + 0.96) / items.length;
            const alreadyGridReady = item.classList.contains("is-grid-ready");
            const alreadyRevealed = item.classList.contains("is-revealed");
            const isGridReady =
              (isActive && progress >= cellReadyPoint) || alreadyGridReady;
            const isRevealed =
              (isActive && progress >= revealPoint) || alreadyRevealed;

            item.classList.toggle("is-grid-ready", isGridReady);
            item.classList.toggle("is-revealed", isRevealed);
          });
        };

        const playCompletionPulse = () => {
          if (!progressDot) return;

          section.classList.add("solution-completing");
          gsap.fromTo(
            progressDot,
            { scale: 1 },
            {
              scale: 1.8,
              duration: 0.12,
              repeat: 3,
              yoyo: true,
              ease: "power2.out",
            }
          );
          gsap.to(content, {
            opacity: 0.85,
            duration: 0.25,
            ease: "power1.out",
          });
          gsap.delayedCall(0.45, () => {
            section.classList.remove("solution-completing");
          });
        };

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=4600",
            pin: true,
            scrub: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onEnter: () => setPinnedActive(true),
            onEnterBack: () => setPinnedActive(true),
            onLeave: () => {
              playCompletionPulse();
              setPinnedActive(false, false);
            },
            onLeaveBack: () => {
              updateProgress(0, false);
              setPinnedActive(false, true);
            },
            onUpdate: (self) => updateRevealedItems(self.progress, self.isActive),
          },
        });

        tl.to(content, { y: -8, duration: 5 }, 0);
        tl.to(
          badge,
          { scale: 1, autoAlpha: 1, duration: 0.3, ease: "power2.out" },
          0.4
        );
        tl.to(
          [headingLeft, headingRight],
          { x: 0, autoAlpha: 1, duration: 0.45, ease: "power2.out" },
          0.6
        );
        tl.to(
          underline,
          { scaleX: 1, duration: 0.3, ease: "power2.inOut" },
          1.1
        );
        tl.to(underline, { autoAlpha: 0, duration: 0.25 }, 2.1);

        items.forEach((item, index) => {
          const iconBox = item.querySelector<HTMLElement>(".icon-box");
          const title = item.querySelector<HTMLElement>(".item-title");
          const descLines = Array.from(
            item.querySelectorAll<HTMLElement>(".desc-line")
          );
          const assetIcon =
            item.querySelector<HTMLElement>(".solution-asset-icon");
          const start = index + 2.22;

          tl.set(item, { autoAlpha: 1 }, start);

          if (iconBox) {
            tl.to(
              iconBox,
              {
                x: 0,
                y: 0,
                rotation: 0,
                scale: 1,
                autoAlpha: 1,
                duration: 0.3,
                ease: "back.out(1.56)",
              },
              start
            );
          }

          if (assetIcon) {
            tl.to(
              assetIcon,
              {
                clipPath: "inset(0 0% 0 0)",
                duration: 0.25,
                ease: "power1.inOut",
              },
              start + 0.3
            );
            tl.to(
              assetIcon,
              {
                filter: "brightness(1) saturate(1)",
                duration: 0.18,
                ease: "power1.out",
              },
              start + 0.5
            );
          }

          if (title) {
            tl.to(
              title,
              {
                clipPath: "inset(0 0% 0 0)",
                duration: 0.25,
                ease: "power1.inOut",
              },
              start + 0.55
            );
          }

          if (descLines.length) {
            tl.to(
              descLines,
              {
                clipPath: "inset(0 0% 0 0)",
                duration: 0.2,
                stagger: 0.04,
                ease: "power1.inOut",
              },
              start + 0.63
            );
          }
        });

        tl.to({}, { duration: 2 });

        return () => {
          tl.kill();
          section.classList.remove("solution-is-pinned", "solution-completing");
          window.dispatchEvent(
            new CustomEvent("solution-pin-change", {
              detail: { isPinned: false },
            })
          );
        };
      });

      mm.add("(max-width: 767px)", () => {
        const tl = gsap.timeline({
          defaults: { ease: "power2.out" },
          scrollTrigger: {
            trigger: section,
            start: "top 72%",
            once: true,
            invalidateOnRefresh: true,
            onEnter: () => shimmerTl.play(),
          },
        });

        tl.to(badge, { scale: 1, autoAlpha: 1, duration: 0.4 }, 0);
        tl.to(
          [headingLeft, headingRight],
          { x: 0, autoAlpha: 1, duration: 0.55, stagger: 0.06 },
          0.15
        );
        tl.to(underline, { scaleX: 1, duration: 0.36 }, 0.55);
        tl.to(underline, { autoAlpha: 0, duration: 0.25 }, 1.1);

        items.forEach((item, index) => {
          const iconBox = item.querySelector<HTMLElement>(".icon-box");
          const title = item.querySelector<HTMLElement>(".item-title");
          const descLines = Array.from(
            item.querySelectorAll<HTMLElement>(".desc-line")
          );
          const assetIcon =
            item.querySelector<HTMLElement>(".solution-asset-icon");
          const start = 0.85 + index * 0.18;

          tl.set(item, { autoAlpha: 1 }, start);

          if (iconBox) {
            tl.to(
              iconBox,
              {
                x: 0,
                y: 0,
                rotation: 0,
                scale: 1,
                autoAlpha: 1,
                duration: 0.42,
                ease: "back.out(1.56)",
              },
              start
            );
          }

          if (assetIcon) {
            tl.to(
              assetIcon,
              {
                clipPath: "inset(0 0% 0 0)",
                duration: 0.26,
                ease: "power1.inOut",
              },
              start + 0.2
            );
            tl.to(
              assetIcon,
              {
                filter: "brightness(1) saturate(1)",
                duration: 0.18,
                ease: "power1.out",
              },
              start + 0.38
            );
          }

          if (title) {
            tl.to(
              title,
              {
                clipPath: "inset(0 0% 0 0)",
                duration: 0.25,
                ease: "power1.inOut",
              },
              start + 0.32
            );
          }

          if (descLines.length) {
            tl.to(
              descLines,
              {
                clipPath: "inset(0 0% 0 0)",
                duration: 0.2,
                stagger: 0.04,
                ease: "power1.inOut",
              },
              start + 0.43
            );
          }
        });

        tl.call(() => {
          items.forEach((item) => {
            item.classList.add("is-revealed", "is-grid-ready");
          });
        });

        return () => {
          tl.kill();
        };
      });

      return () => {
        shimmerTl.kill();
        mm.revert();
      };
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="solution"
      data-section-reveal="off"
      ref={sectionRef}
      className="relative isolate w-full overflow-hidden bg-cover bg-center antialiased [--solution-progress:0] [--solution-progress-y:0%] [background-attachment:fixed] [background-image:linear-gradient(180deg,rgba(247,247,247,0.82),rgba(247,247,247,0.2)_20%,rgba(247,247,247,0.28)_78%,rgba(247,247,247,0.86)),url('/assets/solution-building-bg.svg')] md:min-h-screen max-md:[background-attachment:scroll]"
    >
      <PipelineTrack />

      <div className="relative z-10 mx-auto flex w-full max-w-none flex-col justify-center bg-white/[0.72] px-5 py-16 backdrop-blur-[2px] sm:px-6 md:min-h-screen md:px-10 md:py-14 lg:px-20">
        <div className="relative z-20 flex w-full flex-col items-center gap-2 pb-10 md:pb-12">
          <div ref={badgeRef}>
            <AuroraBadge>The Solution</AuroraBadge>
          </div>

          <h2
            ref={headingRef}
            className="heading-split-container mx-auto flex flex-wrap justify-center gap-x-2 text-balance text-center text-[clamp(1.5rem,6vw,2.5rem)] font-medium leading-[120%] tracking-tight"
            style={{
              backgroundImage:
                "linear-gradient(90deg, currentColor 0%, currentColor 45%, #009311 50%, currentColor 55%, currentColor 100%)",
              backgroundSize: "200% 100%",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "inherit",
              backgroundPosition: "-200% 0",
            }}
          >
            <span ref={headingLeftRef} className="inline-block">
              One verification.
            </span>
            <span ref={headingRightRef} className="inline-block">
              <span className="relative inline-block">
                Trusted
                <span
                  ref={underlineRef}
                  className="absolute bottom-0 left-0 h-[3px] w-full rounded-full bg-[#009311]"
                />
              </span>{" "}
              everywhere.
            </span>
          </h2>
        </div>

        <div
          ref={contentRef}
          className="relative mx-auto grid w-full max-w-5xl grid-cols-6 grid-rows-[repeat(2,minmax(190px,1fr))] md:min-h-[clamp(400px,54vh,520px)] max-md:flex max-md:min-h-0 max-md:flex-col"
        >
          <BentoGridLines />
          {solutionSteps.map((solu, index) => (
            <SolutionItem key={solu.title} item={solu} stepIndex={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
