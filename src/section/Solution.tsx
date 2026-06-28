import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AuroraBadge from "../components/ui/AuroraBadge";

gsap.registerPlugin(ScrollTrigger);

interface SolutionStep {
  icon: string;
  title: string;
  para: string;
}

const solutionSteps: SolutionStep[] = [
  {
    icon: "./assets/verify.svg",
    title: "Verify",
    para: "User submits identity documents through a business's Ontiver-powered flow.",
  },
  {
    icon: "./assets/screen.svg",
    title: "Screen",
    para: "Ontiver runs AML checks, sanctions screening, and risk assessment automatically.",
  },
  {
    icon: "./assets/proof.svg",
    title: "Store Proof",
    para: "A verified identity proof is created and stored securely - tied to the user, not just the business.",
  },
  {
    icon: "./assets/consent.svg",
    title: "Consent Share",
    para: "When another business needs to verify the same user, the user approves with a single consent action.",
  },
  {
    icon: "./assets/reuse.svg",
    title: "Reuse",
    para: "The new business gets trusted verification proof instantly. No repeat document uploads. No delay.",
  },
];

const orbitalStarts = [
  { x: -74, y: -58, rotation: -25 },
  { x: 0, y: -68, rotation: 15 },
  { x: 74, y: -58, rotation: 25 },
  { x: -64, y: -56, rotation: -22 },
  { x: 64, y: -56, rotation: 22 },
];

function PipelineTrack() {
  return (
    <div className="solution-progress" aria-hidden="true">
      <div className="solution-progress-track">
        <div className="solution-progress-fill" />
        <div className="solution-progress-dot" />
      </div>

      {solutionSteps.map((step, index) => (
        <span
          key={step.title}
          className="solution-progress-tick"
          data-step={index}
          style={{ bottom: `${((index + 1) / solutionSteps.length) * 100}%` }}
        />
      ))}
    </div>
  );
}

function BentoGridLines() {
  return (
    <div className="solution-grid-lines" aria-hidden="true">
      <span className="solution-grid-line solution-grid-line-horizontal" />
      <span className="solution-grid-line solution-grid-line-top-left" />
      <span className="solution-grid-line solution-grid-line-top-right" />
      <span className="solution-grid-line solution-grid-line-bottom" />
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
      className={`solution-item solution-bento-cell solution-cell-${stepIndex} relative cursor-default`}
      data-step={stepIndex}
    >
      <div className="solution-cell-fill" />
      <div className="solution-cell-border" />

      <div className="solution-item-content relative z-10 flex h-full w-full flex-col items-center justify-center text-center">
        <div className="icon-box relative mb-5 flex h-16 w-16 items-center justify-center rounded-lg border border-white/15 bg-white">
          <span className="solution-icon-screen-glow" aria-hidden="true" />
          <span className="solution-icon-sheen" aria-hidden="true" />
          <div className="icon-settle-pulse" />
          <img
            src={item.icon}
            alt={`${item.title} icon`}
            className="solution-asset-icon relative z-10 h-9 w-9"
          />
        </div>

        <div className="w-full max-w-[300px]">
          <h6 className="item-title relative inline-block pb-2 text-xl font-semibold text-black">
            {item.title}
          </h6>

          <div className="item-desc text-base text-black/90 text-justify leading-relaxed">
            <span className="desc-line block text-center">
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

      if (
        !section ||
        !content ||
        !badge ||
        !heading ||
        !headingLeft ||
        !headingRight ||
        !underline
      ) {
        return;
      }

      const items = Array.from(
        section.querySelectorAll<HTMLElement>(".solution-item")
      );
      const gridLines = section.querySelector<HTMLElement>(".solution-grid-lines");
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
      gsap.set(content, { opacity: 1 });
      gsap.set(content, { y: 0 });
      if (gridLines) {
        gsap.set(gridLines, { autoAlpha: 0 });
      }

      items.forEach((item, index) => {
        const iconBox = item.querySelector<HTMLElement>(".icon-box");
        const title = item.querySelector<HTMLElement>(".item-title");
        const descLines = Array.from(
          item.querySelectorAll<HTMLElement>(".desc-line")
        );
        const assetIcon = item.querySelector<HTMLElement>(".solution-asset-icon");
        const pulse = item.querySelector<HTMLElement>(".icon-settle-pulse");
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
        if (pulse) {
          gsap.set(pulse, { scale: 0.45, autoAlpha: 0 });
        }
      });

      const setPinnedActive = (isActive: boolean, _fromEnd = false, resetClasses = false) => {
        section.classList.toggle("solution-is-pinned", isActive);
        section.classList.toggle("solution-completing", false);
        window.dispatchEvent(
          new CustomEvent("solution-pin-change", {
            detail: { isPinned: isActive },
          })
        );

        if (isActive) {
          gsap.set(content, { opacity: 1 });
          // Animate grid lines in first — independent of scrub
          if (gridLines) {
            gsap.fromTo(
              gridLines,
              { autoAlpha: 0, y: 8 },
              { autoAlpha: 1, y: 0, duration: 0.55, ease: "power2.out", overwrite: true }
            );
          }
          shimmerTl.play();
          return;
        }

        // Hide grid lines whenever leaving (they animate back in on re-entry)
        if (gridLines) {
          gsap.to(gridLines, {
            autoAlpha: 0,
            duration: 0.25,
            ease: "power1.out",
            overwrite: true,
          });
        }
        shimmerTl.pause(0);
        // Only reset item classes when scrolling back up (not when leaving forward)
        if (resetClasses) {
          items.forEach((item) => {
            item.classList.remove("is-revealed", "is-grid-ready");
          });
        }
      };

      const updateProgress = (progress: number, _isActive: boolean) => {
        section.style.setProperty("--solution-progress", `${progress}`);
        section.style.setProperty(
          "--solution-progress-y",
          `${progress * 100}%`
        );

        progressTicks.forEach((tick, index) => {
          const threshold = (index + 0.96) / progressTicks.length;
          tick.classList.toggle("is-active", progress >= threshold);
        });
      };

      const updateRevealedItems = (progress: number, isActive: boolean) => {
        updateProgress(progress, isActive);
        items.forEach((item, index) => {
          const cellReadyPoint = (index + 0.78) / items.length;
          const revealPoint = (index + 0.96) / items.length;
          const isGridReady = isActive && progress >= cellReadyPoint;
          const isRevealed = isActive && progress >= revealPoint;

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
        gsap.to(content, { opacity: 0.85, duration: 0.25, ease: "power1.out" });
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
          onEnterBack: () => setPinnedActive(true, true),
          onLeave: () => {
            playCompletionPulse();
            setPinnedActive(false, false, false); // keep is-revealed classes when scrolling forward
          },
          onLeaveBack: () => {
            updateProgress(0, false);
            setPinnedActive(false, false, true); // reset classes when scrolling back up
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
        const assetIcon = item.querySelector<HTMLElement>(".solution-asset-icon");
        const pulse = item.querySelector<HTMLElement>(".icon-settle-pulse");
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

        if (pulse) {
          tl.fromTo(
            pulse,
            { scale: 0.5, autoAlpha: 0.58 },
            {
              scale: 1.5,
              autoAlpha: 0,
              duration: 0.2,
              ease: "power1.out",
            },
            start + 0.8
          );
        }
      });

      // Pause at the end so the user can read all items before scrolling past
      tl.to({}, { duration: 2 });

      return () => {
        window.dispatchEvent(
          new CustomEvent("solution-pin-change", {
            detail: { isPinned: false },
          })
        );
        shimmerTl.kill();
      };
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="solution-section relative min-h-screen w-full overflow-hidden"
    >
      <PipelineTrack />

      <div className="solution-content-panel relative z-10 mx-auto flex min-h-screen w-full max-w-7xl flex-col justify-center px-6 py-14 md:px-10 lg:px-20">
        <div className="relative z-20 flex w-full flex-col items-center gap-2 pb-12">
          <div ref={badgeRef}>
            <AuroraBadge>The Solution</AuroraBadge>
          </div>

          <h2
            ref={headingRef}
            className="heading-split-container mx-auto flex flex-wrap justify-center gap-x-2 text-balance text-center text-[clamp(1.5rem,4vw,2.5rem)] font-medium leading-[120%] tracking-tight"
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

        <div ref={contentRef} className="solution-bento relative mx-auto w-full max-w-5xl">
          <BentoGridLines />
          {solutionSteps.map((solu, index) => (
            <SolutionItem key={solu.title} item={solu} stepIndex={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
