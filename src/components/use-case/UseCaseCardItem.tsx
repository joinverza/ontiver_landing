import type { MouseEvent as ReactMouseEvent } from "react";
import gsap from "gsap";
import { Link } from "react-router-dom";
import { directionOffsets, type UseCaseCard } from "../../data/useCases";
import DirectionAwareHover, { type Direction } from "../ui/DirectionAwareHover";
import UseCaseIdleLayer from "./UseCaseIdleLayer";

export default function UseCaseCardItem({
  card,
  linkTo,
}: {
  card: UseCaseCard;
  linkTo?: string;
}) {
  const handleEnter = (
    direction: Direction,
    event: ReactMouseEvent<HTMLElement>
  ) => {
    const offset = directionOffsets[direction];
    const cardEl = event.currentTarget;
    const shellEl = cardEl.closest<HTMLElement>("[data-use-case-card]");
    const imageEl = cardEl.querySelector<HTMLElement>(
      ".direction-aware-hover__image"
    );
    const contentEl = cardEl.querySelector<HTMLElement>(
      ".use-case-card-content"
    );
    const lineEl = shellEl?.querySelector<HTMLElement>(
      ".use-case-connection-line"
    );
    gsap.to(cardEl, {
      y: -6,
      scale: 1.02,
      rotateX: 0,
      rotateY: 0,
      borderColor: "rgba(34, 197, 94, 0.45)",
      duration: 0.3,
      ease: "power2.out",
      overwrite: "auto",
      transformPerspective: 800,
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

  };

  const handleLeave = (
    _direction: Direction,
    event: ReactMouseEvent<HTMLElement>
  ) => {
    const cardEl = event.currentTarget;
    const shellEl = cardEl.closest<HTMLElement>("[data-use-case-card]");
    const imageEl = cardEl.querySelector<HTMLElement>(
      ".direction-aware-hover__image"
    );
    const contentEl = cardEl.querySelector<HTMLElement>(
      ".use-case-card-content"
    );
    const lineEl = shellEl?.querySelector<HTMLElement>(
      ".use-case-connection-line"
    );
    gsap.to(cardEl, {
      y: 0,
      scale: 1,
      rotateX: 0,
      rotateY: 0,
      borderColor: "rgba(255, 255, 255, 0.08)",
      duration: 0.4,
      ease: "power2.inOut",
      overwrite: "auto",
      transformPerspective: 800,
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

  };

  const content = (
    <DirectionAwareHover
      imageUrl={card.imageUrl}
      className={`use-case-card-surface h-full w-full min-h-[220px] origin-center rounded-2xl border-white/10 bg-[#06160f] sm:min-h-[250px] md:rounded-3xl md:min-h-[276px] ${card.cardClassName ?? ""}`}
      imageClassName="opacity-[0.86] brightness-[0.92] saturate-[1.05]"
      showOverlay={false}
      onDirectionEnter={handleEnter}
      onDirectionLeave={handleLeave}
    >
      <UseCaseIdleLayer type={card.idle} />
      <div
        className={`absolute bottom-[34px] left-6 right-6 z-[50] overflow-visible max-[640px]:bottom-5 max-[640px]:left-5 max-[640px]:right-5 md:bottom-[42px] md:left-8 md:right-8 ${card.contentClassName ?? ""}`}
      >
        <div className="use-case-card-content relative z-[50] max-w-[210px] opacity-100 will-change-transform md:max-w-[228px]">
          <h3 className="font-sans text-card-title font-bold tracking-normal text-white">
            {card.title}
          </h3>
          <p className="mt-1.5 font-body text-body text-white/80 md:mt-2">
            {card.description}
          </p>
        </div>
      </div>
    </DirectionAwareHover>
  );

  return (
    <div
      className={`relative min-h-0 min-w-0 max-[640px]:mx-auto max-[640px]:w-full max-[640px]:max-w-[410px] ${card.className}`}
      data-use-case-card
    >
      {linkTo ? (
        <Link
          to={linkTo}
          className="block h-full cursor-pointer no-underline"
          aria-label={`Open ${card.title} use case`}
        >
          {content}
        </Link>
      ) : (
        <div className="block h-full">{content}</div>
      )}
      <span
        className={`use-case-connection-line pointer-events-none absolute z-[8] block bg-[#22c55e]/10 opacity-0 max-[640px]:hidden ${card.lineClassName}`}
        aria-hidden="true"
      />
    </div>
  );
}
