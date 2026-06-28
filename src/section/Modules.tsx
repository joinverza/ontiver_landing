import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomEase } from "gsap/CustomEase";
import Text from "../components/base/Text";
import DirectionAwareHover from "../components/ui/DirectionAwareHover";

gsap.registerPlugin(ScrollTrigger, CustomEase);
CustomEase.create("moduleLand", "0.2,0,0,1");

type ModuleCard = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  className: string;
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
    className: "module-card-identity",
    depth: "top",
    entrance: { x: -60, y: 0 },
  },
  {
    id: "credentials",
    title: "Reusable Credentials",
    description:
      "Verified identity is stored as portable proof for returning users.",
    imageUrl: "./assets/portal.png",
    className: "module-card-credentials",
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
    className: "module-card-consent",
    depth: "top",
    entrance: { x: 0, y: 60 },
    visual: "share",
  },
  {
    id: "aml",
    title: "AML & Risk Checks",
    description: "Built-in AML, PEP, sanctions, and watchlist screening.",
    imageUrl: "./assets/matrix.png",
    className: "module-card-aml",
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
    className: "module-card-dashboard",
    depth: "bottom",
    entrance: { x: -40, y: 40 },
    visual: "dashboard",
  },
  {
    id: "api",
    title: "Developer API",
    description: "Sandbox, API, and webhooks for easy integration and testing.",
    imageUrl: "./assets/systems.png",
    className: "module-card-api",
    depth: "bottom",
    entrance: { x: 40, y: 40 },
    visual: "code",
  },
];

function ModuleVisual({ type }: { type?: ModuleCard["visual"] }) {
  if (type === "check") {
    return (
      <img
        className="module-visual module-visual-check"
        src="./assets/check.png"
        alt=""
        aria-hidden="true"
      />
    );
  }

  if (type === "share") {
    return (
      <div className="module-visual module-visual-share" aria-hidden="true">
        <img src="./assets/share.png" alt="" />
        <span className="share-dot share-dot-one" />
        <span className="share-dot share-dot-two" />
        <span className="share-dot share-dot-three" />
      </div>
    );
  }

  if (type === "radar") {
    return (
      <div className="module-visual module-visual-radar" aria-hidden="true">
        <img src="./assets/radar.png" alt="" />
        <span className="radar-sweep-line" />
        <span className="radar-ring radar-ring-one" />
        <span className="radar-ring radar-ring-two" />
        <span className="radar-ring radar-ring-three" />
      </div>
    );
  }

  if (type === "dashboard") {
    return <span className="module-visual module-visual-scan" aria-hidden="true" />;
  }

  if (type === "code") {
    return (
      <div className="module-visual module-visual-code" aria-hidden="true">
        <span>&lt;</span>
        <span>/&gt;</span>
      </div>
    );
  }

  return null;
}

function ModuleCardItem({ card }: { card: ModuleCard }) {
  return (
    <div
      className={`module-card-shell ${card.className}`}
      data-module={card.id}
      data-depth={card.depth}
      data-x={card.entrance.x}
      data-y={card.entrance.y}
    >
      <div className={`module-depth module-depth-${card.depth}`} data-depth={card.depth}>
        <DirectionAwareHover
          imageUrl={card.imageUrl}
          className="module-card"
          imageClassName={`module-card-image-${card.id}`}
        >
          <ModuleVisual type={card.visual} />
          <div className="module-card-copy">
            <h3 className="module-card-title">{card.title}</h3>
            <p className="module-card-description">{card.description}</p>
          </div>
        </DirectionAwareHover>
      </div>
      <span className="module-connection-line" aria-hidden="true" />
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
        section.querySelectorAll<HTMLElement>('.module-depth[data-depth="top"], .module-depth-top')
      );
      const bottomDepthCards = Array.from(
        section.querySelectorAll<HTMLElement>('.module-depth[data-depth="bottom"], .module-depth-bottom')
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
    <section ref={sectionRef} className="modules-section">
      <div className="modules-section-inner">
        <Text
          btext="Product Modules"
          heading="Everything your identity workflow needs."
          containerClassName="modules-text"
          className="modules-text-heading"
        />

        <div className="modules-bento-grid">
          {moduleCards.map((card) => (
            <ModuleCardItem key={card.id} card={card} />
          ))}
        </div>
      </div>
    </section>
  );
}
