import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { breathingDepthConfigs, useCaseCards } from "../../../data/useCases";
import Text from "../../base/Text";
import UseCaseCardItem from "../../use-case/UseCaseCardItem";
import {
  createIdleTween,
  type UseCaseAnimatedCard,
} from "../../use-case/useCaseAnimation";

gsap.registerPlugin(ScrollTrigger);

export default function UseCase() {
  const sectionRef = useRef<HTMLElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const frame = frameRef.current;
      const grid = gridRef.current;

      if (!section || !frame || !grid) return;

      const cards = gsap.utils.toArray<HTMLElement>(
        section.querySelectorAll("[data-use-case-card]"),
      );
      const badge = frame.querySelector<HTMLElement>(".use-case-text > div");
      const headingWords = gsap.utils.toArray<HTMLElement>(
        frame.querySelectorAll(".use-case-text .heading-word"),
      );
      const contents = cards.map((card) =>
        card.querySelector<HTMLElement>(".use-case-card-content"),
      );
      const visibleContents = contents.filter(Boolean) as HTMLElement[];
      const connectionLines = gsap.utils.toArray<HTMLElement>(
        section.querySelectorAll(".use-case-connection-line"),
      );
      const breathingTweens: gsap.core.Tween[] = [];

      gsap.set(frame, {
        width: "calc(100vw - clamp(2rem, 8vw, 10rem))",
        borderRadius: 48,
        transformOrigin: "center center",
      });

      gsap.to(frame, {
        width: "100vw",
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top 82%",
          end: "top 20%",
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      gsap.set(cards, {
        opacity: 0,
        scale: 0.82,
        z: -120,
        rotateX: 12,
        transformPerspective: 900,
        transformOrigin: "center bottom",
      });
      gsap.set(visibleContents, { y: 12, opacity: 1 });
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
      entrance.to(
        cards,
        {
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
        },
        0.85
      );
      entrance.to(
        visibleContents,
        {
          y: 0,
          opacity: 1,
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
            const breathingConfig =
              breathingDepthConfigs[index % breathingDepthConfigs.length];
            const breathingTween = gsap.to(card, {
              rotateX: breathingConfig.rotateX,
              rotateY: breathingConfig.rotateY,
              duration: breathingConfig.duration,
              repeat: -1,
              yoyo: true,
              ease: "sine.inOut",
              transformPerspective: 800,
              transformOrigin: "center center",
              overwrite: false,
            });
            card.dataset.idleActive = "true";
            card.dataset.hovered = "false";
            (card as UseCaseAnimatedCard)._useCaseIdleTween = idleTween;
            (card as UseCaseAnimatedCard)._useCaseBreathingTween = breathingTween;
            breathingTweens.push(breathingTween);
          },
          undefined,
          1.85 + index * staggerStep
        );
      });

      const getDistanceFromCursor = (card: HTMLElement, event: MouseEvent) => {
        const rect = card.getBoundingClientRect();
        const cardX = rect.left + rect.width / 2;
        const cardY = rect.top + rect.height / 2;

        return Math.hypot(cardX - event.clientX, cardY - event.clientY);
      };

      const handleMouseMove = (event: MouseEvent) => {
        const rect = section.getBoundingClientRect();
        const cx = (event.clientX - rect.left - rect.width / 2) / rect.width;
        const cy = (event.clientY - rect.top - rect.height / 2) / rect.height;

        cards.forEach((card) => {
          if (card.dataset.hovered === "true") return;

          const surface = card.querySelector<HTMLElement>(
            ".use-case-card-surface"
          );
          if (!surface) return;

          const distance = getDistanceFromCursor(card, event);
          const influence = Math.max(0, 1 - distance / 600);

          gsap.to(surface, {
            rotateY: cx * influence * 3,
            rotateX: cy * influence * -2,
            duration: 0.8,
            ease: "power1.out",
            overwrite: "auto",
            transformPerspective: 800,
          });
        });
      };

      const handleMouseLeave = () => {
        const nonHoveredSurfaces = cards
          .filter((card) => card.dataset.hovered !== "true")
          .map((card) =>
            card.querySelector<HTMLElement>(".use-case-card-surface")
          )
          .filter(Boolean) as HTMLElement[];

        gsap.to(nonHoveredSurfaces, {
          rotateX: 0,
          rotateY: 0,
          duration: 1,
          ease: "power2.inOut",
          overwrite: "auto",
          transformPerspective: 800,
        });
      };

      section.addEventListener("mousemove", handleMouseMove);
      section.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        section.removeEventListener("mousemove", handleMouseMove);
        section.removeEventListener("mouseleave", handleMouseLeave);
        gridDrift.kill();
        breathingTweens.forEach((tween) => tween.kill());
        cards.forEach((card) => {
          (card as UseCaseAnimatedCard)._useCaseIdleTween?.kill();
          (card as UseCaseAnimatedCard)._useCaseBreathingTween?.kill();
        });
      };
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="cases"
      className="relative isolate flex justify-center overflow-hidden bg-bg-light  text-white max-[640px]:py-[68px]"
    >
      <div
        ref={frameRef}
        className="relative isolate min-w-0 overflow-hidden rounded-t-[28px] bg-[#06160f] px-[clamp(18px,5vw,80px)] py-[clamp(76px,9vw,118px)] [background-image:radial-gradient(circle_at_50%_42%,rgba(0,147,17,0.08),transparent_28%)] sm:rounded-t-[36px] lg:rounded-t-[48px] max-[640px]:px-[18px] max-[640px]:py-[68px]"
      >
        <div
          ref={gridRef}
          className="pointer-events-none absolute -bottom-[25%] -left-[10%] -right-[10%] -top-[10%] z-0 origin-center [--use-case-grid-drift:0px] [background-image:linear-gradient(rgba(34,197,94,0.065)_0.5px,transparent_0.5px),linear-gradient(90deg,rgba(34,197,94,0.055)_0.5px,transparent_0.5px)] [background-position:0_var(--use-case-grid-drift),0_var(--use-case-grid-drift)] [background-size:60px_60px] [transform:perspective(800px)_rotateX(55deg)] will-change-[transform,background-position]"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(circle_at_50%_56%,rgba(1,11,7,0.9)_0%,rgba(1,11,7,0.56)_38%,transparent_78%)]"
          aria-hidden="true"
        />

        <div className="relative z-[2] mx-auto w-[min(100%,1180px)]">
          <Text
            containerClassName="use-case-text pb-[clamp(36px,5vw,54px)]"
            badgeTextClassName="border border-light-primary/60! bg-[#06160f]/85! text-[#eaffef]!"
            color="white"
            btext="Use Cases"
            heading="Built for the teams that need verified trust most."
            animate={false}
          />

          <div className="relative grid auto-rows-[minmax(128px,auto)] grid-cols-6 gap-4 [perspective:900px] max-[1024px]:grid-cols-2 max-[1024px]:auto-rows-auto max-[640px]:grid-cols-1 max-[640px]:gap-3.5">
            {useCaseCards.map((card) => (
              <UseCaseCardItem key={card.id} card={card} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
