import { useRef, type MouseEvent } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Text from "../components/base/Text";
import DirectionAwareHover, {
  type Direction,
} from "../components/ui/DirectionAwareHover";

gsap.registerPlugin(ScrollTrigger);

type UseCaseCard = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  className: string;
  contentClassName?: string;
  cardClassName?: string;
  lineClassName: string;
  idle: "fintech" | "lenders" | "marketplaces" | "platforms" | "schools" | "teams";
};

const directionOffsets: Record<Direction, { x: number; y: number }> = {
  top: { x: 0, y: -20 },
  right: { x: 20, y: 0 },
  bottom: { x: 0, y: 20 },
  left: { x: -20, y: 0 },
};

const useCaseCards: UseCaseCard[] = [
  {
    id: "fintechs",
    title: "Fintechs",
    description: "Reduce KYC friction during onboarding.",
    imageUrl: "./assets/fintech.png",
    className:
      "use-case-card-fintechs col-[1/3] row-[1/3] max-[1024px]:col-auto max-[1024px]:row-auto",
    lineClassName: "top-4 -right-2 bottom-4 w-px",
    idle: "fintech",
  },
  {
    id: "lenders",
    title: "Digital Lenders",
    description: "Verify borrowers before approval.",
    imageUrl: "./assets/lenders.png",
    className:
      "use-case-card-lenders col-[3/5] row-[1/3] max-[1024px]:col-auto max-[1024px]:row-auto",
    lineClassName: "top-4 -right-2 bottom-4 w-px",
    idle: "lenders",
  },
  {
    id: "marketplaces",
    title: "Marketplaces",
    description: "Build trust across buyers, sellers, and vendors.",
    imageUrl: "./assets/marketplaces.png",
    className:
      "use-case-card-marketplaces col-[5/7] row-[1/5] max-[1024px]:col-auto max-[1024px]:row-span-2 max-[640px]:row-auto",
    cardClassName: "min-h-[568px] max-[640px]:min-h-[260px]",
    contentClassName: "top-12 bottom-auto max-[640px]:top-auto max-[640px]:bottom-[30px]",
    lineClassName: "right-4 -bottom-2 left-4 h-px",
    idle: "marketplaces",
  },
  {
    id: "platforms",
    title: "HR Platforms",
    description: "Verify candidates before onboarding.",
    imageUrl: "./assets/platforms.png",
    className:
      "use-case-card-platforms col-[1/5] row-[3/5] max-[1024px]:col-span-full max-[1024px]:row-auto",
    cardClassName: "min-h-[252px] max-[640px]:min-h-[260px]",
    contentClassName:
      "top-1/2 bottom-auto -translate-y-1/2 max-[640px]:top-auto max-[640px]:bottom-[30px] max-[640px]:translate-y-0",
    lineClassName: "top-4 -right-2 bottom-4 w-px",
    idle: "platforms",
  },
  {
    id: "schools",
    title: "Schools",
    description: "Verify students, applicants, and credential holders.",
    imageUrl: "./assets/schools.png",
    className:
      "use-case-card-schools col-[1/4] row-[5/7] max-[1024px]:col-span-full max-[1024px]:row-auto",
    cardClassName: "min-h-[252px] max-[640px]:min-h-[260px]",
    contentClassName:
      "top-1/2 bottom-auto -translate-y-1/2 max-[640px]:top-auto max-[640px]:bottom-[30px] max-[640px]:translate-y-0",
    lineClassName: "right-4 -bottom-2 left-4 h-px",
    idle: "schools",
  },
  {
    id: "teams",
    title: "Compliance Teams",
    description: "Build a defensible verification workflow.",
    imageUrl: "./assets/teams.png",
    className:
      "use-case-card-teams col-[4/7] row-[5/7] max-[1024px]:col-span-full max-[1024px]:row-auto",
    cardClassName: "min-h-[252px] max-[640px]:min-h-[260px]",
    contentClassName:
      "top-1/2 bottom-auto -translate-y-1/2 max-[640px]:top-auto max-[640px]:bottom-[30px] max-[640px]:translate-y-0",
    lineClassName: "right-4 -bottom-2 left-4 h-px",
    idle: "teams",
  },
];

function UseCaseIdleLayer({ type }: { type: UseCaseCard["idle"] }) {
  if (type === "fintech") {
    return (
      <div
        className="use-case-idle-layer use-case-fintech-layer pointer-events-none absolute inset-0 z-[3]"
        aria-hidden="true"
      >
        <span className="use-case-dollar absolute top-[22%] left-[18%] font-sans text-[22px] font-extrabold text-[#70ff8a]/70 opacity-45">
          $
        </span>
        <span className="use-case-dollar absolute top-[34%] right-[22%] font-sans text-base font-extrabold text-[#70ff8a]/70 opacity-45">
          $
        </span>
        <span className="use-case-dollar absolute right-[36%] bottom-[32%] font-sans text-lg font-extrabold text-[#70ff8a]/70 opacity-45">
          $
        </span>
      </div>
    );
  }

  if (type === "lenders") {
    return (
      <div
        className="use-case-idle-layer use-case-lender-layer pointer-events-none absolute top-[21%] right-[15%] z-[3] h-[150px] w-[150px]"
        aria-hidden="true"
      >
        <span className="use-case-ring use-case-ring-one absolute inset-0 rounded-full border border-[#70ff8a]/25" />
        <span className="use-case-ring use-case-ring-two absolute inset-[19%] rounded-full border border-[#70ff8a]/25" />
        <span className="use-case-ring use-case-ring-three absolute inset-[36%] rounded-full border border-[#70ff8a]/25" />
      </div>
    );
  }

  if (type === "marketplaces") {
    return (
      <span
        className="use-case-idle-layer use-case-bag-anchor pointer-events-none absolute top-[18%] left-1/2 z-[3] size-px origin-top"
        aria-hidden="true"
      />
    );
  }

  if (type === "platforms") {
    return (
      <div
        className="use-case-idle-layer use-case-network-layer pointer-events-none absolute inset-0 z-[3]"
        aria-hidden="true"
      >
        <span className="use-case-network-line absolute top-[39%] left-[30%] h-px w-[27%] origin-left rotate-[12deg] bg-[#70ff8a]/20 opacity-20" />
        <span className="use-case-network-line absolute top-[57%] left-[43%] h-px w-[24%] origin-left rotate-[-18deg] bg-[#70ff8a]/20 opacity-20" />
        <span className="use-case-network-line absolute top-[47%] right-[18%] h-px w-[20%] origin-left rotate-[26deg] bg-[#70ff8a]/20 opacity-20" />
        <span className="use-case-central-figure absolute top-[32%] right-[31%] size-[34px] rounded-full bg-[radial-gradient(circle,rgba(112,255,138,0.5),rgba(0,147,17,0.08))] brightness-100" />
      </div>
    );
  }

  if (type === "schools") {
    return (
      <span
        className="use-case-idle-layer use-case-scan-line pointer-events-none absolute top-0 right-0 left-0 z-[3] h-0.5 bg-[linear-gradient(90deg,transparent,rgba(112,255,138,0.8),transparent)]"
        aria-hidden="true"
      />
    );
  }

  return (
    <span
      className="use-case-idle-layer use-case-screen-flicker pointer-events-none absolute top-[20%] right-[8%] z-[3] h-[42%] w-[38%] bg-[#70ff8a]/15 opacity-15 mix-blend-screen"
      aria-hidden="true"
    />
  );
}

function UseCaseCardItem({ card }: { card: UseCaseCard }) {
  const handleEnter = (
    direction: Direction,
    event: MouseEvent<HTMLElement>
  ) => {
    const offset = directionOffsets[direction];
    const cardEl = event.currentTarget;
    const shellEl = cardEl.closest<HTMLElement>("[data-use-case-card]");
    const imageEl = cardEl.querySelector<HTMLElement>(
      ".direction-aware-hover__image"
    );
    const contentEl = cardEl.querySelector<HTMLElement>(".use-case-card-content");
    const lineEl = shellEl?.querySelector<HTMLElement>(".use-case-connection-line");
    const idleTween = (
      shellEl as
        | (HTMLElement & {
            _useCaseIdleTween?: gsap.core.Tween | gsap.core.Timeline;
          })
        | null
    )?._useCaseIdleTween;

    gsap.to(cardEl, {
      y: -6,
      scale: 1.02,
      borderColor: "rgba(34, 197, 94, 0.45)",
      duration: 0.3,
      ease: "power2.out",
      overwrite: "auto",
    });
    if (imageEl) {
      gsap.to(imageEl, {
        x: offset.x * -0.3,
        y: offset.y * -0.3,
        scale: 1.06,
        duration: 0.4,
        ease: "power2.out",
        overwrite: "auto",
      });
    }
    if (contentEl) {
      gsap.to(contentEl, {
        x: offset.x * 0.4,
        y: offset.y * 0.4,
        duration: 0.3,
        ease: "power2.out",
        overwrite: "auto",
      });
    }
    if (lineEl) {
      gsap.to(lineEl, { opacity: 1, duration: 0.2, overwrite: "auto" });
    }

    idleTween?.timeScale(2);
  };

  const handleLeave = (_direction: Direction, event: MouseEvent<HTMLElement>) => {
    const cardEl = event.currentTarget;
    const shellEl = cardEl.closest<HTMLElement>("[data-use-case-card]");
    const imageEl = cardEl.querySelector<HTMLElement>(
      ".direction-aware-hover__image"
    );
    const contentEl = cardEl.querySelector<HTMLElement>(".use-case-card-content");
    const lineEl = shellEl?.querySelector<HTMLElement>(".use-case-connection-line");
    const idleTween = (
      shellEl as
        | (HTMLElement & {
            _useCaseIdleTween?: gsap.core.Tween | gsap.core.Timeline;
          })
        | null
    )?._useCaseIdleTween;

    gsap.to(cardEl, {
      y: 0,
      scale: 1,
      borderColor: "rgba(255, 255, 255, 0.08)",
      duration: 0.4,
      ease: "power2.inOut",
      overwrite: "auto",
    });
    if (imageEl) {
      gsap.to(imageEl, {
        x: 0,
        y: 0,
        scale: 1.04,
        duration: 0.5,
        ease: "power2.inOut",
        overwrite: "auto",
      });
    }
    if (contentEl) {
      gsap.to(contentEl, {
        x: 0,
        y: 0,
        duration: 0.4,
        ease: "power2.inOut",
        overwrite: "auto",
      });
    }
    if (lineEl) {
      gsap.to(lineEl, { opacity: 0, duration: 0.3, overwrite: "auto" });
    }

    if (idleTween) gsap.to(idleTween, { timeScale: 1, duration: 0.8 });
  };

  return (
    <div
      className={`use-case-card-shell relative min-h-0 min-w-0 [transform-style:preserve-3d] will-change-[transform,opacity] ${card.className}`}
      data-idle={card.idle}
      data-use-case-card
    >
      <DirectionAwareHover
        imageUrl={card.imageUrl}
        className={`use-case-card h-full w-full min-h-[276px] origin-center rounded-3xl border-white/10 bg-[#06160f] ${card.cardClassName ?? ""}`}
        imageClassName="use-case-card-image opacity-[0.86] brightness-[0.92] saturate-[1.05]"
        overlayClassName="bg-[linear-gradient(135deg,rgba(34,197,94,0.18),rgba(0,0,0,0.25)),rgba(0,0,0,0.25)]"
        onDirectionEnter={handleEnter}
        onDirectionLeave={handleLeave}
      >
        <UseCaseIdleLayer type={card.idle} />
        <span
          className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(180deg,rgba(6,22,15,0.04)_0%,rgba(6,22,15,0.42)_55%,rgba(1,11,7,0.88)_100%),rgba(22,58,42,0.3)]"
          aria-hidden="true"
        />
        <div
          className={`use-case-card-content-clip absolute right-8 bottom-[42px] left-8 z-[4] overflow-hidden max-[640px]:right-6 max-[640px]:bottom-[30px] max-[640px]:left-6 ${card.contentClassName ?? ""}`}
        >
          <div className="use-case-card-content max-w-[228px] will-change-transform">
            <h3 className="use-case-card-title font-sans text-xl leading-[1.1] font-medium tracking-[0] text-white">
              {card.title}
            </h3>
            <p className="use-case-card-description mt-2 font-body text-sm leading-[1.28] text-white/80">
              {card.description}
            </p>
          </div>
        </div>
      </DirectionAwareHover>
      <span
        className={`use-case-connection-line pointer-events-none absolute z-[8] block bg-[#22c55e]/10 opacity-0 max-[640px]:hidden ${card.lineClassName}`}
        aria-hidden="true"
      />
    </div>
  );
}

function createIdleTween(card: HTMLElement) {
  const type = card.dataset.idle;
  const image = card.querySelector<HTMLElement>(".direction-aware-hover__image");

  if (type === "fintech") {
    const dollars = card.querySelectorAll<HTMLElement>(".use-case-dollar");
    const tl = gsap.timeline({ repeat: -1, yoyo: true });
    tl.to(image, {
      filter: "brightness(1.15)",
      duration: 2.5,
      ease: "sine.inOut",
    }, 0);
    tl.to(dollars, {
      y: -4,
      duration: 3,
      stagger: 0.4,
      ease: "sine.inOut",
    }, 0);
    return tl;
  }

  if (type === "lenders") {
    return gsap.fromTo(
      card.querySelectorAll<HTMLElement>(".use-case-ring"),
      { scale: 0.95, opacity: 0.6 },
      {
        scale: 1.05,
        opacity: 1,
        duration: 2,
        repeat: -1,
        yoyo: true,
        stagger: 0.3,
        ease: "sine.inOut",
      }
    );
  }

  if (type === "marketplaces") {
    return gsap.to(image, {
      rotation: 1.5,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      transformOrigin: "top center",
    });
  }

  if (type === "platforms") {
    const tl = gsap.timeline({ repeat: -1, yoyo: true });
    tl.to(card.querySelectorAll<HTMLElement>(".use-case-network-line"), {
      opacity: 0.4,
      duration: 1.8,
      stagger: 0.2,
      ease: "sine.inOut",
    }, 0);
    tl.to(card.querySelector<HTMLElement>(".use-case-central-figure"), {
      filter: "brightness(1.3)",
      duration: 2,
      ease: "sine.inOut",
    }, 0);
    return tl;
  }

  if (type === "schools") {
    return gsap.fromTo(
      card.querySelector<HTMLElement>(".use-case-scan-line"),
      { yPercent: -100 },
      { yPercent: 200, duration: 3.5, repeat: -1, ease: "none" }
    );
  }

  return gsap.to(card.querySelector<HTMLElement>(".use-case-screen-flicker"), {
    opacity: 0.7,
    duration: 0.08,
    repeat: -1,
    repeatDelay: 3.5,
    yoyo: true,
    ease: "none",
  });
}

export default function UseCase() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const grid = gridRef.current;

      if (!section || !grid) return;

      const cards = gsap.utils.toArray<HTMLElement>("[data-use-case-card]");
      const badge = section.querySelector<HTMLElement>(".use-case-text > div");
      const headingWords = gsap.utils.toArray<HTMLElement>(
        ".use-case-text .heading-word"
      );
      const contents = cards.map((card) =>
        card.querySelector<HTMLElement>(".use-case-card-content")
      );
      const visibleContents = contents.filter(Boolean) as HTMLElement[];
      const connectionLines = gsap.utils.toArray<HTMLElement>(
        ".use-case-connection-line"
      );

      gsap.set(cards, {
        opacity: 0,
        scale: 0.82,
        z: -120,
        rotateX: 12,
        transformPerspective: 900,
        transformOrigin: "center bottom",
      });
      gsap.set(visibleContents, { yPercent: 100 });
      gsap.set(connectionLines, { opacity: 0 });
      gsap.set(badge, { opacity: 0, y: -16, scale: 0.88 });
      gsap.set(headingWords, { opacity: 0, y: 20 });

      const gridDrift = gsap.to(grid, {
        "--use-case-grid-drift": "-60px",
        duration: 3,
        ease: "none",
        repeat: -1,
      });

      gsap.to(grid, {
        rotateX: 48,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        },
      });

      const entrance = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          once: true,
        },
      });
      const staggerStep = cards.length > 1 ? 0.4 / (cards.length - 1) : 0;

      entrance.to(badge, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.4,
        ease: "power2.out",
      });
      entrance.to(
        headingWords,
        {
          opacity: 1,
          y: 0,
          duration: 0.45,
          stagger: 0.05,
          ease: "power3.out",
        },
        0.15
      );
      entrance.to(cards, {
        opacity: 1,
        scale: 1,
        z: 0,
        rotateX: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: {
          amount: 0.4,
          from: "start",
          grid: "auto",
        },
      }, 0.85);
      entrance.to(
        visibleContents,
        {
          yPercent: 0,
          duration: 0.5,
          ease: "power2.out",
          stagger: {
            amount: 0.4,
            from: "start",
            grid: "auto",
          },
        },
        1.85
      );

      cards.forEach((card, index) => {
        entrance.call(
          () => {
            const idleTween = createIdleTween(card);
            card.dataset.idleActive = "true";
            (card as HTMLElement & {
              _useCaseIdleTween?: gsap.core.Tween | gsap.core.Timeline;
            })._useCaseIdleTween = idleTween;
          },
          undefined,
          1.85 + index * staggerStep
        );
      });

      return () => {
        gridDrift.kill();
        cards.forEach((card) => {
          (card as HTMLElement & {
            _useCaseIdleTween?: gsap.core.Tween | gsap.core.Timeline;
          })._useCaseIdleTween?.kill();
        });
      };
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="cases"
      className="use-case-section relative isolate overflow-hidden bg-[#06160f] px-[clamp(18px,5vw,80px)] py-[clamp(76px,9vw,118px)] text-white [background-image:radial-gradient(circle_at_50%_42%,rgba(0,147,17,0.08),transparent_28%)] max-[640px]:px-[18px] max-[640px]:py-[68px]"
    >
      <div
        ref={gridRef}
        className="use-case-perspective-grid pointer-events-none absolute -top-[10%] -right-[10%] -bottom-[25%] -left-[10%] z-0 origin-center [--use-case-grid-drift:0px] [background-image:linear-gradient(rgba(34,197,94,0.065)_0.5px,transparent_0.5px),linear-gradient(90deg,rgba(34,197,94,0.055)_0.5px,transparent_0.5px)] [background-position:0_var(--use-case-grid-drift),0_var(--use-case-grid-drift)] [background-size:60px_60px] [transform:perspective(800px)_rotateX(55deg)] will-change-[transform,background-position]"
        aria-hidden="true"
      />
      <div
        className="use-case-radial-mask pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(circle_at_50%_56%,rgba(1,11,7,0.9)_0%,rgba(1,11,7,0.56)_38%,transparent_78%)]"
        aria-hidden="true"
      />

      <div className="relative z-[2] mx-auto w-[min(100%,1180px)]">
        <Text
          className="use-case-heading"
          containerClassName="use-case-text pb-[clamp(36px,5vw,54px)]"
          badgeClassName="use-case-heading"
          badgeTextClassName="border border-white/80 bg-[#06160f]/70 text-white"
          color="white"
          btext="Use Cases"
          heading="Built for the teams that need verified trust most."
          animate={false}
        />

        <div className="use-case-bento-grid relative grid grid-cols-6 auto-rows-[minmax(128px,auto)] gap-4 [perspective:900px] max-[1024px]:grid-cols-2 max-[1024px]:auto-rows-auto max-[640px]:grid-cols-1 max-[640px]:gap-3.5">
          {useCaseCards.map((card) => (
            <UseCaseCardItem key={card.id} card={card} />
          ))}
        </div>
      </div>
    </section>
  );
}
