import gsap from "gsap";

export type UseCaseAnimatedCard = HTMLElement & {
  _useCaseIdleTween?: gsap.core.Tween | gsap.core.Timeline;
  _useCaseBreathingTween?: gsap.core.Tween;
};

export function createIdleTween(card: HTMLElement) {
  const type = card.dataset.idle;
  const image = card.querySelector<HTMLElement>(".direction-aware-hover__image");

  if (type === "fintech") {
    const dollars = card.querySelectorAll<HTMLElement>(".use-case-dollar");
    const timeline = gsap.timeline({ repeat: -1, yoyo: true });
    timeline.to(
      image,
      {
        filter: "brightness(1.15)",
        duration: 2.5,
        ease: "sine.inOut",
      },
      0
    );
    timeline.to(
      dollars,
      {
        y: -4,
        duration: 3,
        stagger: 0.4,
        ease: "sine.inOut",
      },
      0
    );
    return timeline;
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
    const timeline = gsap.timeline({ repeat: -1, yoyo: true });
    timeline.to(
      card.querySelectorAll<HTMLElement>(".use-case-network-line"),
      {
        opacity: 0.4,
        duration: 1.8,
        stagger: 0.2,
        ease: "sine.inOut",
      },
      0
    );
    timeline.to(
      card.querySelector<HTMLElement>(".use-case-central-figure"),
      {
        filter: "brightness(1.3)",
        duration: 2,
        ease: "sine.inOut",
      },
      0
    );
    return timeline;
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
