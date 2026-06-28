import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomEase } from "gsap/CustomEase";
import Text from "../components/base/Text";
import DirectionAwareHover from "../components/ui/DirectionAwareHover";
import SignalFlowBackground from "../components/ui/SignalFlowBackground";

gsap.registerPlugin(ScrollTrigger, CustomEase);
CustomEase.create("moduleLand", "0.2,0,0,1");

type ModuleCard = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  className: string;
  copyClassName?: string;
  titleClassName?: string;
  lineClassName: string;
  depth: "top" | "bottom";
  entrance: { x: number; y: number };
  visual?: "check" | "share" | "radar" | "dashboard" | "code";
};

const moduleCards: ModuleCard[] = [
  {
    id: "identity",
    title: "Identity Verification",
    description:
      "Supports document, biometric, and MFA verification with audit logs.",
    imageUrl: "./assets/fingerprint.png",
    className:
      "col-[1/2] row-[1/3] max-[900px]:col-span-full max-[900px]:row-auto max-[900px]:min-h-[300px] max-[640px]:col-span-full max-[640px]:min-h-[260px]",
    lineClassName: "top-2.5 -right-2 bottom-2.5 w-px",
    depth: "top",
    entrance: { x: -60, y: 0 },
  },
  {
    id: "credentials",
    title: "Reusable Credentials",
    description:
      "Verified identity is stored as portable proof for returning users.",
    imageUrl: "./assets/portal.png",
    className:
      "col-[2/5] row-[1/2] max-[900px]:col-span-full max-[900px]:row-auto max-[900px]:min-h-[300px] max-[640px]:col-span-full max-[640px]:min-h-[260px]",
    copyClassName: "top-[100px] bottom-auto left-7 max-w-[284px]",
    titleClassName: "max-w-[16ch]",
    lineClassName: "right-2.5 -bottom-2 left-2.5 h-px",
    depth: "top",
    entrance: { x: 40, y: -40 },
    visual: "check",
  },
  {
    id: "consent",
    title: "Consent Management",
    description:
      "All identity sharing requires user consent with full control and history.",
    imageUrl: "./assets/quadrant.png",
    className:
      "col-[2/3] row-[2/3] max-[900px]:col-auto max-[900px]:row-auto max-[900px]:min-h-[240px] max-[640px]:col-span-full max-[640px]:min-h-[260px]",
    copyClassName: "top-[22px] bottom-auto left-7 max-w-[178px]",
    lineClassName: "top-2.5 -right-2 bottom-2.5 w-px",
    depth: "top",
    entrance: { x: 0, y: 60 },
    visual: "share",
  },
  {
    id: "aml",
    title: "AML & Risk Checks",
    description: "Built-in AML, PEP, sanctions, and watchlist screening.",
    imageUrl: "./assets/matrix.png",
    className:
      "col-[3/5] row-[2/3] max-[900px]:col-auto max-[900px]:row-auto max-[900px]:min-h-[240px] max-[640px]:col-span-full max-[640px]:min-h-[260px]",
    copyClassName: "bottom-[42px] left-6 max-w-[194px]",
    lineClassName: "-top-2 right-2.5 left-2.5 h-px",
    depth: "top",
    entrance: { x: 60, y: 0 },
    visual: "radar",
  },
  {
    id: "dashboard",
    title: "Business Dashboard",
    description:
      "Central dashboard for verification logs, consent, and compliance reports.",
    imageUrl: "./assets/chips.png",
    className:
      "col-[1/4] row-[3/4] max-[900px]:col-span-full max-[900px]:row-auto max-[900px]:min-h-[300px] max-[640px]:col-span-full max-[640px]:min-h-[260px]",
    copyClassName: "bottom-7 left-7 max-w-[254px]",
    titleClassName: "max-w-[16ch]",
    lineClassName: "right-2.5 -bottom-2 left-2.5 h-px",
    depth: "bottom",
    entrance: { x: -40, y: 40 },
    visual: "dashboard",
  },
  {
    id: "api",
    title: "Developer API",
    description: "Sandbox, API, and webhooks for easy integration and testing.",
    imageUrl: "./assets/systems.png",
    className:
      "col-[4/5] row-[3/4] max-[900px]:col-auto max-[900px]:row-auto max-[900px]:min-h-[240px] max-[640px]:col-span-full max-[640px]:min-h-[260px]",
    copyClassName: "top-[18px] bottom-auto left-[25px] max-w-[245px]",
    lineClassName: "right-2.5 -bottom-2 left-2.5 h-px",
    depth: "bottom",
    entrance: { x: 40, y: 40 },
    visual: "code",
  },
];

function ModuleVisual({ type }: { type?: ModuleCard["visual"] }) {
  if (type === "check") {
    return (
      <img
        className="module-visual-check pointer-events-none absolute top-1 right-[18px] z-[3] w-[190px] origin-[50%_82%] opacity-[0.95]"
        src="./assets/check.png"
        alt=""
        aria-hidden="true"
      />
    );
  }

  if (type === "share") {
    return (
      <div
        className="module-visual-share pointer-events-none absolute top-[18px] right-3.5 z-[3] h-[190px] w-[190px]"
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
        className="pointer-events-none absolute top-[21px] -right-[5px] z-[3] h-[199px] w-[199px]"
        aria-hidden="true"
      >
        <img className="h-full w-full object-contain opacity-[0.68]" src="./assets/radar.png" alt="" />
        <span className="radar-sweep-line absolute inset-[50%_50%_auto_auto] h-px w-[46%] origin-left bg-gradient-to-r from-[#70ff8a]/90 to-transparent" />
        <span className="radar-ring absolute inset-[19%] rounded-full border border-[#70ff8a]/20" />
        <span className="radar-ring absolute inset-[30%] rounded-full border border-[#70ff8a]/20 [animation-delay:0.5s]" />
        <span className="radar-ring absolute inset-[41%] rounded-full border border-[#70ff8a]/20 [animation-delay:1s]" />
      </div>
    );
  }

  if (type === "dashboard") {
    return (
      <span
        className="module-visual-scan pointer-events-none absolute top-0 right-0 left-0 z-[3] h-0.5 bg-[linear-gradient(90deg,transparent,rgba(112,255,138,0.84),transparent)]"
        aria-hidden="true"
      />
    );
  }

  if (type === "code") {
    return (
      <div
        className="module-visual-code pointer-events-none absolute right-[26px] bottom-[23px] z-[3] flex h-[50px] w-[78px] items-center justify-center rounded-br-[18px] bg-[#0bc43a] font-mono text-[26px] font-extrabold text-[#05150e]"
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
          imageClassName={card.id === "identity" ? "module-card-image-identity" : ""}
          overlayClassName="bg-[linear-gradient(135deg,rgba(0,147,17,0.24),rgba(0,0,0,0.25)),rgba(0,0,0,0.25)]"
        >
          <ModuleVisual type={card.visual} />
          <span
            className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(180deg,transparent_0%,rgba(0,0,0,0.26)_48%,rgba(0,0,0,0.78)_100%),radial-gradient(circle_at_18%_16%,rgba(255,255,255,0.18),transparent_30%)]"
            aria-hidden="true"
          />
          <div className={`absolute right-[22px] bottom-16 left-7 z-[4] transition-transform duration-[260ms] ${card.copyClassName ?? ""}`}>
            <h3 className={`max-w-full font-sans lg:text-[26px] leading-[1.08] font-medium tracking-[0] text-white text-[20px] ${card.titleClassName ?? ""}`}>
              {card.title}
            </h3>
            <p className="mt-2 max-w-[238px] font-body lg:text-[13px] text-sm leading-[1.15] text-white/80">
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
      ref={sectionRef}
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

        <div className="grid grid-cols-[minmax(0,349fr)_minmax(0,408fr)_minmax(0,43fr)_minmax(0,349fr)] grid-rows-[clamp(176px,19.4vw,243px)_clamp(184px,20.2vw,253px)_clamp(176px,19.4vw,243px)] gap-[clamp(2px,0.6vw,8px)] text-white max-[900px]:grid-cols-2 max-[900px]:grid-rows-none max-[900px]:auto-rows-[minmax(220px,auto)] max-[900px]:gap-2 max-[640px]:grid-cols-1 max-[640px]:auto-rows-auto max-[640px]:gap-3.5">
          {moduleCards.map((card) => (
            <ModuleCardItem key={card.id} card={card} />
          ))}
        </div>
      </div>
    </section>
  );
}
