import {
  useCallback,
  useEffect,
  useRef,
  type ReactNode,
} from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";

type LinkArrowVariant = "light" | "dark";

type LinkArrowProps = {
  href?: string;
  children: ReactNode;
  variant?: LinkArrowVariant;
  className?: string;
  textClassName?: string;
  ariaLabel?: string;
};

const variantClasses = {
  light: "border-black/25 text-[#444] hover:border-[#009311] hover:text-[#009311]",
  dark: "border-white/30 text-white/75 hover:border-[#22C55E] hover:text-[#22C55E]",
};

function isExternalHref(href: string) {
  return /^https?:\/\//.test(href);
}

function getRightEdgeShift(text: HTMLElement) {
  const root = text.closest<HTMLElement>("[data-link-arrow-root]");
  if (!root) return 18;

  const currentLetterSpacing = text.style.letterSpacing;
  text.style.letterSpacing = "0.18em";

  const rootWidth = root.offsetWidth;
  const textWidth = text.offsetWidth;

  text.style.letterSpacing = currentLetterSpacing;

  return Math.max(0, rootWidth - textWidth);
}

export default function LinkArrow({
  href,
  children,
  variant = "light",
  className = "",
  textClassName = "",
  ariaLabel,
}: LinkArrowProps) {
  const textRef = useRef<HTMLSpanElement>(null);
  const arrowRightRef = useRef<HTMLSpanElement>(null);
  const arrowLeftRef = useRef<HTMLSpanElement>(null);
  const activeTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const labelText = typeof children === "string" ? children : null;
  const resolvedAriaLabel = ariaLabel ?? labelText ?? undefined;

  const stopActiveTimeline = useCallback(() => {
    activeTimelineRef.current?.kill();
    activeTimelineRef.current = null;
  }, []);

  useEffect(() => stopActiveTimeline, [stopActiveTimeline]);

  const handleMouseEnter = useCallback(() => {
    const text = textRef.current;
    const arrowRight = arrowRightRef.current;
    const arrowLeft = arrowLeftRef.current;

    if (!text || !arrowRight || !arrowLeft) return;

    const chars = gsap.utils.toArray<HTMLElement>(
      text.querySelectorAll("[data-link-char]"),
    );

    stopActiveTimeline();
    gsap.killTweensOf([text, arrowRight, arrowLeft, ...chars]);
    const targetX = getRightEdgeShift(text);
    gsap.set(chars, {
      transformOrigin: "center center",
    });

    const timeline = gsap.timeline({
      defaults: { overwrite: "auto" },
      onComplete: () => {
        gsap.set(text, {
          letterSpacing: "0.18em",
          x: chars.length ? 0 : targetX,
        });
        if (chars.length) {
          gsap.set(chars, { x: targetX, scale: 1 });
        }
        gsap.set(arrowLeft, { opacity: 1, x: 0 });
        gsap.set(arrowRight, { opacity: 0, x: 8 });
      },
    });
    activeTimelineRef.current = timeline;

    timeline
      .to(text, {
        letterSpacing: "0.55em",
        duration: 0.26,
        ease: "power2.out",
      }, 0)
      .to(text, {
        letterSpacing: "0.18em",
        duration: 0.42,
        ease: "power2.inOut",
      }, 0.36)
      .to(arrowRight, {
        opacity: 0,
        x: 10,
        duration: 0.42,
        ease: "power2.inOut",
      }, 0.18)
      .fromTo(
        arrowLeft,
        { opacity: 0, x: -14 },
        {
          opacity: 1,
          x: 0,
          duration: 0.52,
          ease: "power3.out",
        },
        0.42,
      );

    if (chars.length) {
      timeline.to(
        chars,
        {
          keyframes: [
            {
              x: targetX,
              scale: 1.12,
              duration: 0.52,
              ease: "power3.inOut",
            },
            {
              x: targetX,
              scale: 1,
              duration: 0.28,
              ease: "power2.out",
            },
          ],
          stagger: {
            each: 0.04,
            from: "end",
          },
        },
        0.08,
      );
    } else {
      timeline.to(text, {
        x: targetX,
        duration: 0.62,
        ease: "power3.inOut",
      }, 0.08);
    }
  }, [stopActiveTimeline]);

  const handleMouseLeave = useCallback(() => {
    const text = textRef.current;
    const arrowRight = arrowRightRef.current;
    const arrowLeft = arrowLeftRef.current;

    if (!text || !arrowRight || !arrowLeft) return;

    const chars = gsap.utils.toArray<HTMLElement>(
      text.querySelectorAll("[data-link-char]"),
    );

    stopActiveTimeline();
    gsap.killTweensOf([text, arrowRight, arrowLeft, ...chars]);
    gsap.set(chars, {
      transformOrigin: "center center",
    });

    const timeline = gsap.timeline({
      defaults: { overwrite: "auto" },
      onComplete: () => {
        gsap.set(text, { letterSpacing: "0.18em", x: 0 });
        gsap.set(chars, { x: 0, scale: 1 });
        gsap.set(arrowLeft, { opacity: 0, x: -8 });
        gsap.set(arrowRight, { opacity: 1, x: 0 });
      },
    });
    activeTimelineRef.current = timeline;

    timeline.to(text, {
      letterSpacing: "0.18em",
      duration: 0.42,
      ease: "power2.inOut",
    }, 0);

    if (chars.length) {
      timeline.to(
        chars,
        {
          keyframes: [
            {
              x: 0,
              scale: 1.08,
              duration: 0.42,
              ease: "power3.inOut",
            },
            {
              x: 0,
              scale: 1,
              duration: 0.22,
              ease: "power2.out",
            },
          ],
          stagger: {
            each: 0.026,
            from: "start",
          },
        },
        0,
      );
    } else {
      timeline.to(text, {
        x: 0,
        duration: 0.48,
        ease: "power3.inOut",
      }, 0);
    }
    timeline.to(arrowLeft, {
      opacity: 0,
      x: -14,
      duration: 0.38,
      ease: "power2.inOut",
    }, 0.12);
    timeline.fromTo(
      arrowRight,
      { opacity: 0, x: 10 },
      {
        opacity: 1,
        x: 0,
        duration: 0.46,
        ease: "power3.out",
      },
      0.34,
    );
  }, [stopActiveTimeline]);

  const sharedClassName = `relative inline-flex min-w-[var(--link-arrow-min-width,190px)] cursor-pointer items-center gap-6 overflow-hidden border-b pb-[6px] text-[11px] font-semibold uppercase no-underline transition-colors duration-200 ${variantClasses[variant]} ${className}`;

  const content = (
    <>
      <span
        ref={arrowLeftRef}
        className="pointer-events-none absolute left-0 top-0 flex h-full items-center"
        style={{ opacity: 0, transform: "translateX(-8px)" }}
        aria-hidden="true"
      >
        -&gt;
      </span>
      <span
        ref={textRef}
        className={`min-w-0 shrink-0 whitespace-nowrap ${textClassName}`}
        style={{ letterSpacing: "0.18em" }}
        aria-hidden={labelText ? "true" : undefined}
      >
        {labelText
          ? labelText.split("").map((char, index) => (
              <span
                data-link-char
                className="inline-block will-change-transform"
                key={`${char}-${index}`}
              >
                {char === " " ? "\u00a0" : char}
              </span>
            ))
          : children}
      </span>
      <span
        ref={arrowRightRef}
        className="pointer-events-none ml-auto shrink-0"
        aria-hidden="true"
      >
        -&gt;
      </span>
    </>
  );

  if (!href) {
    return (
      <span
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={sharedClassName}
        aria-label={resolvedAriaLabel}
        data-link-arrow-root
      >
        {content}
      </span>
    );
  }

  if (isExternalHref(href) || href.startsWith("#")) {
    return (
      <a
        href={href}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={sharedClassName}
        aria-label={resolvedAriaLabel}
        data-link-arrow-root
        target={isExternalHref(href) ? "_blank" : undefined}
        rel={isExternalHref(href) ? "noreferrer" : undefined}
      >
        {content}
      </a>
    );
  }

  return (
    <Link
      to={href}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={sharedClassName}
      aria-label={resolvedAriaLabel}
      data-link-arrow-root
    >
      {content}
    </Link>
  );
}
