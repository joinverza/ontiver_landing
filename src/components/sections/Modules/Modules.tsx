import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomEase } from "gsap/CustomEase";
import { moduleCards, type ModuleCard } from "../../../data/modules";
import Text from "../../base/Text";
import DirectionAwareHover from "../../ui/DirectionAwareHover";
import SignalFlowBackground from "../../ui/SignalFlowBackground";

gsap.registerPlugin(ScrollTrigger, CustomEase);
CustomEase.create("moduleLand", "0.2,0,0,1");

function ModuleVisual({ type }: { type?: ModuleCard["visual"] }) {
  if (type === "check") {
    return (
      <img
        className="module-visual-check pointer-events-none absolute top-1 right-[18px] z-[3] w-[112px] origin-[50%_82%] opacity-[0.95] sm:w-[150px] lg:w-[190px]"
        src="./assets/check.png"
        alt=""
        aria-hidden="true"
      />
    );
  }

  if (type === "share") {
    return (
      <div
        className="module-visual-share pointer-events-none absolute top-[18px] right-3.5 z-[3] h-[112px] w-[112px] sm:h-[150px] sm:w-[150px] lg:h-[190px] lg:w-[190px]"
        aria-hidden="true"
      >
        <img className="h-full w-full object-contain opacity-[0.74]" src="./assets/share.png" alt="" />
        <span className="share-dot absolute top-[24%] left-[22%] size-[7px] rounded-full bg-[#70ff8a]" />
        <span className="share-dot absolute top-[48%] right-[19%] size-[7px] rounded-full bg-[#70ff8a] [animation-delay:0.32s]" />
        <span className="share-dot absolute right-[34%] bottom-[18%] size-[7px] rounded-full bg-[#70ff8a] [animation-delay:0.64s]" />
      </div>
    );
  }

  if (type === "radar") {
    return (
      <div
        className="pointer-events-none absolute top-1/2 right-[-36px] z-[3] h-[180px] w-[180px] -translate-y-1/2 sm:h-[230px] sm:w-[230px] lg:right-[-54px] lg:h-[315px] lg:w-[315px] max-[900px]:right-[-38px] max-[900px]:h-[205px] max-[900px]:w-[205px]"
        aria-hidden="true"
      >
        <img className="absolute top-1/2 left-1/2 h-[82%] w-[82%] -translate-x-1/2 -translate-y-1/2 object-contain opacity-[0.58] brightness-[0.72] contrast-[1.22] saturate-[0.95]" src="./assets/radar.png" alt="" />
        {/* <span className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(90deg,#05150E_0%,#05150E00_64%)]" /> */}
        <span className="radar-sweep-line absolute top-1/2 left-1/2 h-px w-[38%] origin-left bg-gradient-to-r from-[#70ff8a]/90 to-transparent" />
        <span className="radar-ring absolute inset-[19%] rounded-full border border-[#70ff8a]/20" />
        <span className="radar-ring absolute inset-[30%] rounded-full border border-[#70ff8a]/20 [animation-delay:0.5s]" />
        <span className="radar-ring absolute inset-[41%] rounded-full border border-[#70ff8a]/20 [animation-delay:1s]" />
      </div>
    );
  }

  if (type === "dashboard") {
    return null;
  }

  if (type === "code") {
    return (
      <div
        className="module-visual-code pointer-events-none absolute right-[18px] bottom-[18px] z-[3] flex h-10 w-16 items-center justify-center rounded-br-[14px] bg-[#0bc43a] font-mono text-[22px] font-extrabold text-[#05150e] sm:right-[26px] sm:bottom-[23px] sm:h-[50px] sm:w-[78px] sm:rounded-br-[18px] sm:text-[26px]"
        aria-hidden="true"
      >
        <span className="inline-block">&lt;</span>
        <span className="inline-block">/&gt;</span>
      </div>
    );
  }

  return null;
}

function ModuleCardItem({ card }: { card: ModuleCard }) {
  return (
    <div
      className={`module-card-shell group relative min-h-0 min-w-0 isolate opacity-0 [--module-idle-speed:1] hover:z-[5] hover:[--module-idle-speed:1.5] ${card.className}`}
      data-module={card.id}
      data-x={card.entrance.x}
      data-y={card.entrance.y}
    >
      <div className="h-full w-full" data-depth={card.depth}>
        <DirectionAwareHover
          imageUrl={card.imageUrl}
          className="h-full w-full rounded-[18px] group-hover:scale-[1.015] group-hover:border-light-primary/40"
          imageClassName={`${card.id === "identity" ? "module-card-image-identity" : ""} ${card.imageClassName ?? ""}`}
          overlayClassName={card.overlayClassName ?? "bg-[linear-gradient(135deg,rgba(0,147,17,0.24),rgba(0,0,0,0.25)),rgba(0,0,0,0.25)]"}
        >
          <ModuleVisual type={card.visual} />
          <span
            className={`pointer-events-none absolute inset-0 z-[1] ${card.shadeClassName ?? "bg-[linear-gradient(180deg,transparent_0%,rgba(0,0,0,0.26)_48%,rgba(0,0,0,0.78)_100%),radial-gradient(circle_at_18%_16%,rgba(255,255,255,0.18),transparent_30%)]"}`}
            aria-hidden="true"
          />
          <div className={`absolute right-5 bottom-8 left-5 z-[4] transition-transform duration-[260ms] sm:right-[22px] sm:bottom-12 sm:left-7 lg:bottom-16 ${card.copyClassName ?? ""}`}>
            <h3 className={`max-w-full font-sans text-[17px] font-medium leading-[1.06] tracking-[0] text-white sm:text-[20px] lg:text-[26px] ${card.titleClassName ?? ""}`}>
              {card.title}
            </h3>
            <p className={`mt-1.5 max-w-[220px] font-body text-xs leading-[1.18] text-white/80 sm:text-sm lg:max-w-[238px] lg:text-[13px] ${card.descriptionClassName ?? ""}`}>
              {card.description}
            </p>
          </div>
        </DirectionAwareHover>
      </div>
      <span
        className={`pointer-events-none absolute z-[6] block bg-[#009311]/10 opacity-0 transition-opacity duration-180 group-hover:opacity-100 max-[640px]:hidden ${card.lineClassName}`}
        aria-hidden="true"
      />
    </div>
  );
}

export default function Modules() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;

      if (!section) return;

      const cardShells = Array.from(
        section.querySelectorAll<HTMLElement>(".module-card-shell")
      );
      const topDepthCards = Array.from(
        section.querySelectorAll<HTMLElement>('[data-depth="top"]')
      );
      const bottomDepthCards = Array.from(
        section.querySelectorAll<HTMLElement>('[data-depth="bottom"]')
      );

      cardShells.forEach((card) => {
        gsap.set(card, {
          x: Number(card.dataset.x || 0),
          y: Number(card.dataset.y || 0),
          scale: 0.97,
          autoAlpha: 0,
          transformOrigin: "center center",
        });
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 85%",
          once: true,
        },
      });

      tl.to(
        cardShells,
        {
          x: 0,
          y: 0,
          scale: 1,
          autoAlpha: 1,
          duration: 0.5,
          ease: "moduleLand",
        },
        1.15
      );

      gsap.to(topDepthCards, {
        y: -16,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to(bottomDepthCards, {
        y: -10,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="features"
      ref={sectionRef}
      data-section-reveal="off"
      className="relative overflow-hidden bg-bg-light px-6 py-[150px] max-[900px]:px-[18px] max-[900px]:pt-14 max-[900px]:pb-[68px] max-[640px]:py-14"
    >
      <div className="absolute inset-0 z-0 opacity-40">
        <SignalFlowBackground />
      </div>
      <div className="mx-auto w-[min(100%,1197px)]">
        <Text
          btext="Product Modules"
          heading="Everything your identity workflow needs."
          containerClassName="gap-2 pb-[6rem] max-[640px]:pb-[30px]"
          badgeTextClassName="border border-black"
          headingClassName=""
        />

        <div className="grid grid-cols-[minmax(0,349fr)_minmax(0,408fr)_minmax(0,43fr)_minmax(0,349fr)] grid-rows-[clamp(176px,19.4vw,243px)_clamp(184px,20.2vw,253px)_clamp(176px,19.4vw,243px)] gap-[clamp(2px,0.6vw,8px)] text-white max-[900px]:grid-cols-2 max-[900px]:grid-rows-none max-[900px]:auto-rows-[minmax(190px,auto)] max-[900px]:gap-2 max-[640px]:grid-cols-1 max-[640px]:auto-rows-auto max-[640px]:gap-3">
          {moduleCards.map((card) => (
            <ModuleCardItem key={card.id} card={card} />
          ))}
        </div>
      </div>
    </section>
  );
}
