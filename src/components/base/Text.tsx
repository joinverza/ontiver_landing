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
  badgeWrapperClassName?: string;
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
  badgeWrapperClassName = "",
  headingClassName = "",
  containerClassName = "",
  color,
  animate = true,
}: TextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLHeadingElement>(null);
  const hasBadge = btext !== null && btext !== undefined && btext !== "";

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
    if (badgeRef.current) {
      tl.fromTo(
        badgeRef.current,
        { y: 30, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: "power3.out" }
      );
    }

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
        badgeRef.current ? "-=0.3" : 0
      );
    }
  }, { scope: containerRef });

  // Split heading string into words at render time
  const words = heading.split(/(\s+)/);

  return (
    <div
      ref={containerRef}
      className={`flex flex-col gap-2 pb-15 w-full ${containerClassName}`}
    >
      {hasBadge ? (
        <div
          ref={badgeRef as React.RefObject<HTMLDivElement>}
          className={`mx-auto w-fit ${badgeWrapperClassName}`}
          style={{ opacity: animate ? 0 : 1 }}
        >
          <AuroraBadge
            className={`${className} ${badgeClassName}`}
            spanClassName={badgeTextClassName}
          >
            {btext}
          </AuroraBadge>
        </div>
      ) : null}
      <h2
        className={`mx-auto w-full max-w-[600px] text-section text-balance font-medium tracking-normal ${className} ${headingClassName}`}
        style={color ? ({ "--heading-color": color } as CSSProperties) : undefined}
      >
        {words.map((word, wordIndex) => {
          if (word.trim() === "") return <span key={wordIndex}>{word}</span>;

          return (
            <span
              key={wordIndex}
              className="inline-block align-bottom"
            >
              <span
                className="heading-word inline-block"
                style={{
                  transform: animate ? "translateY(100%)" : "translateY(0)",
                  opacity: animate ? 0 : 1,
                }}
              >
                <span className="text-[var(--heading-color,#111)]">{word}</span>
              </span>
            </span>
          );
        })}
      </h2>
    </div>
  );
}
