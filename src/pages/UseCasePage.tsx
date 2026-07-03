import { useMemo, useRef, type CSSProperties } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CurtainFooter from "../components/sections/CurtainFooter/CurtainFooter";
import {
  RelatedUseCases,
  UseCaseCapabilities,
  UseCaseChallenge,
  UseCaseFlow,
  UseCaseHero,
  UseCaseQuote,
  UseCaseStatsStrip,
} from "../components/use-case-page";
import { useCasePageDetails } from "../data/useCases";

gsap.registerPlugin(ScrollTrigger);

export default function UseCasePage() {
  const rootRef = useRef<HTMLElement>(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const detail = id ? useCasePageDetails[id] : undefined;

  const relatedItems = useMemo(
    () =>
      detail
        ? Object.values(useCasePageDetails).filter((item) => item.id !== detail.id)
        : [],
    [detail],
  );

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

      const heroImage = root.querySelector<HTMLElement>("[data-hero-image]");
      const heroOverlay = root.querySelector<HTMLElement>("[data-hero-overlay]");
      const heroText = root.querySelector<HTMLElement>("[data-hero-text]");
      const heroChars = gsap.utils.toArray<HTMLElement>("[data-hero-char]");
      const label = root.querySelector<HTMLElement>("[data-hero-label]");
      const tagline = root.querySelector<HTMLElement>("[data-hero-tagline]");
      const scrollIndicator = root.querySelector<HTMLElement>(
        "[data-scroll-indicator]",
      );

      const heroTl = gsap.timeline({ delay: 0.08 });
      heroTl
        .fromTo(
          heroImage,
          { scale: 1.12, filter: "brightness(0.8)" },
          {
            scale: 1,
            filter: "brightness(1)",
            duration: 1.1,
            ease: "power3.out",
          },
        )
        .fromTo(
          label,
          { opacity: 0, y: 12, letterSpacing: "0.8em" },
          {
            opacity: 1,
            y: 0,
            letterSpacing: "0.4em",
            duration: 0.5,
            ease: "power2.out",
          },
          0.35,
        )
        .fromTo(
          heroChars,
          { opacity: 0, y: 40, rotateX: 20 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 0.7,
            stagger: 0.025,
            ease: "power3.out",
            transformPerspective: 800,
          },
          0.48,
        )
        .fromTo(
          tagline,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
          "-=0.3",
        )
        .fromTo(
          scrollIndicator,
          { opacity: 0 },
          { opacity: 1, duration: 0.4, ease: "none" },
          "-=0.1",
        );

      gsap.to("[data-scroll-dot]", {
        y: 40,
        duration: 1.2,
        ease: "power1.inOut",
        repeat: -1,
        yoyo: true,
      });

      gsap.to(heroImage, {
        yPercent: 18,
        ease: "none",
        scrollTrigger: {
          trigger: root.querySelector("[data-hero-section]"),
          start: "top top",
          end: "bottom top",
          scrub: 1.2,
        },
      });

      gsap.to(heroText, {
        yPercent: -18,
        ease: "none",
        scrollTrigger: {
          trigger: root.querySelector("[data-hero-section]"),
          start: "top top",
          end: "bottom top",
          scrub: 1.4,
        },
      });

      gsap.to(heroOverlay, {
        opacity: 1,
        ease: "none",
        scrollTrigger: {
          trigger: root.querySelector("[data-hero-section]"),
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      const stats = gsap.utils.toArray<HTMLElement>("[data-stat-card]");
      gsap.fromTo(
        stats,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: root.querySelector("[data-stats-strip]"),
            start: "top 82%",
            once: true,
          },
        },
      );

      gsap.fromTo(
        "[data-challenge-line]",
        { yPercent: 100, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.65,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: root.querySelector("[data-challenge-section]"),
            start: "top 74%",
            once: true,
          },
        },
      );

      gsap.to("[data-word-reveal]", {
        opacity: 1,
        duration: 0.25,
        stagger: 0.025,
        ease: "none",
        scrollTrigger: {
          trigger: root.querySelector("[data-challenge-copy]"),
          start: "top 82%",
          once: true,
        },
      });

      gsap.fromTo(
        "[data-challenge-panel]",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: root.querySelector("[data-challenge-panel]"),
            start: "top 84%",
            once: true,
          },
        },
      );

      gsap.to("[data-challenge-panel] img", {
        scale: 1.08,
        xPercent: -2,
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.fromTo(
        "[data-quote-mark]",
        { opacity: 0, scale: 0.5 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.45,
          ease: "back.out(1.5)",
          scrollTrigger: {
            trigger: root.querySelector("[data-quote-section]"),
            start: "top 72%",
            once: true,
          },
        },
      );

      gsap.fromTo(
        "[data-quote-word]",
        { yPercent: 100, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.4,
          stagger: 0.03,
          ease: "power2.out",
          scrollTrigger: {
            trigger: root.querySelector("[data-quote-section]"),
            start: "top 72%",
            once: true,
            onEnter: () => {
              const attribution = root.querySelector<HTMLElement>(
                "[data-quote-attribution]",
              );
              if (!attribution) return;

              const text = attribution.dataset.text || "";
              attribution.textContent = "";
              gsap.delayedCall(0.9, () => {
                const proxy = { value: 0 };
                gsap.to(proxy, {
                  value: text.length,
                  duration: Math.max(0.8, text.length * 0.03),
                  ease: "none",
                  onUpdate: () => {
                    attribution.textContent = text.slice(0, Math.floor(proxy.value));
                  },
                  onComplete: () => {
                    attribution.textContent = text;
                  },
                });
              });
            },
          },
        },
      );

      gsap.fromTo(
        "[data-related-card]",
        { opacity: 0, x: 40 },
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: root.querySelector("[data-related-section]"),
            start: "top 82%",
            once: true,
          },
        },
      );

    },
    { scope: rootRef, dependencies: [id] },
  );

  if (!detail) {
    return <Navigate to="/" replace />;
  }

  return (
    <main
      ref={rootRef}
      className="bg-bg-light text-[#06160f]"
      style={{ "--usecase-accent": detail.accent } as CSSProperties}
    >
      <UseCaseHero detail={detail} onBack={() => navigate(-1)} />
      <UseCaseStatsStrip accent={detail.accent} stats={detail.stats} />
      <UseCaseChallenge detail={detail} />
      <UseCaseFlow workflow={detail.workflow} />
      <UseCaseCapabilities capabilities={detail.capabilities} />
      <UseCaseQuote quote={detail.quote} />
      <RelatedUseCases items={relatedItems} />
      <CurtainFooter />
    </main>
  );
}
