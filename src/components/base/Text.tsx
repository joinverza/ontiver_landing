import { useRef, type ReactNode, type CSSProperties } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AuroraBadge from "../ui/AuroraBadge";

gsap.registerPlugin(ScrollTrigger);

type TextProps = {
  btext: ReactNode;
  heading: string;
  className?: string;
  badgeClassName?: string;
  badgeTextClassName?: string;
  headingClassName?: string;
  containerClassName?: string;
  color?: string;
  animate?: boolean;
};

export default function Text({
  btext,
  heading,
  className = "",
  badgeClassName = "",
  badgeTextClassName = "",
  headingClassName = "",
  containerClassName = "",
  color,
  animate = true,
}: TextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    if (!animate) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 85%",
        once: true,
      },
    });

    // Badge slides up and fades in
    tl.fromTo(
      badgeRef.current,
      { y: 30, opacity: 0, scale: 0.95 },
      { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: "power3.out" }
    );

    // Animate heading words
    const wordEls = containerRef.current?.querySelectorAll(".heading-word");
    if (wordEls && wordEls.length > 0) {
      tl.to(
        wordEls,
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: "power3.out",
          stagger: 0.06,
        },
        "-=0.3"
      );
    }
  }, { scope: containerRef });

  // Split heading string into words at render time
  const words = heading.split(/(\s+)/);
  let shimmerCharIndex = 0;

  return (
    <div
      ref={containerRef}
      className={`flex flex-col gap-2 pb-15 w-full ${containerClassName}`}
    >
      <div
        ref={badgeRef as React.RefObject<HTMLDivElement>}
        className="mx-auto w-fit"
        style={{ opacity: 0 }}
      >
        <AuroraBadge
          className={`${className} ${badgeClassName}`}
          spanClassName={badgeTextClassName}
        >
          {btext}
        </AuroraBadge>
      </div>
      <h2
        className={`shimmer-heading ${className} ${headingClassName} w-full max-w-[600px] text-balance text-[clamp(1.5rem,4vw,2.5rem)] font-medium leading-[120%] tracking-tight mx-auto text-center`}
        style={color ? ({ "--heading-color": color } as CSSProperties) : undefined}
      >
        {words.map((word, wordIndex) => {
          if (word.trim() === "") return <span key={wordIndex}>{word}</span>;

          const chars = Array.from(word);

          return (
            <span
              key={wordIndex}
              className="inline-block align-bottom"
            >
              <span
                className="heading-word inline-block"
                style={{ transform: "translateY(100%)", opacity: 0 }}
              >
                {chars.map((char, charIndex) => {
                  const charStyle = {
                    "--char-index": shimmerCharIndex++,
                  } as CSSProperties;

                  return (
                    <span
                      key={`${wordIndex}-${charIndex}`}
                      className="heading-char inline-block text-[var(--heading-color,#111)] will-change-[color,text-shadow] animate-[problem-char-shimmer_8s_ease-in-out_infinite] [animation-delay:calc(3s_+_(var(--char-index)*35ms))]"
                      style={charStyle}
                    >
                      {char}
                    </span>
                  );
                })}
              </span>
            </span>
          );
        })}
      </h2>
    </div>
  );
}
