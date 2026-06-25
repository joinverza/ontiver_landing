import {
  type CSSProperties,
  type ReactNode,
  type RefObject,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

function useElementWidth(ref: RefObject<HTMLElement | null>) {
  const [width, setWidth] = useState(0);

  const updateWidth = useCallback(() => {
    if (ref.current) {
      setWidth(ref.current.offsetWidth);
    }
  }, [ref]);

  useLayoutEffect(() => {
    updateWidth();
    window.addEventListener("resize", updateWidth);

    return () => window.removeEventListener("resize", updateWidth);
  }, [updateWidth]);

  return width;
}

type VelocityMapping = {
  input: number[];
  output: number[];
};

type VelocityTextProps = {
  children: ReactNode;
  baseVelocity?: number;
  scrollContainerRef?: RefObject<HTMLElement | null>;
  className?: string;
  damping?: number;
  stiffness?: number;
  numCopies?: number;
  velocityMapping?: VelocityMapping;
  parallaxClassName?: string;
  scrollerClassName?: string;
  parallaxStyle?: CSSProperties;
  scrollerStyle?: CSSProperties;
};

function wrap(min: number, max: number, value: number) {
  const range = max - min;
  const mod = (((value - min) % range) + range) % range;

  return mod + min;
}

function VelocityText({
  children,
  baseVelocity = 100,
  scrollContainerRef,
  className = "",
  damping = 50,
  stiffness = 400,
  numCopies = 6,
  velocityMapping = { input: [0, 1000], output: [0, 5] },
  parallaxClassName = "relative overflow-hidden",
  scrollerClassName = "flex whitespace-nowrap",
  parallaxStyle,
  scrollerStyle,
}: VelocityTextProps) {
  const [x, setX] = useState("0px");
  const copyRef = useRef<HTMLSpanElement>(null);
  const copyWidth = useElementWidth(copyRef);
  const baseX = useRef(0);
  const directionFactor = useRef(1);
  const targetVelocity = useRef(0);
  const smoothVelocity = useRef(0);

  useEffect(() => {
    const scrollTarget = scrollContainerRef?.current ?? window;
    const readScrollY = () =>
      scrollTarget instanceof Window ? scrollTarget.scrollY : scrollTarget.scrollTop;

    let lastScrollY = readScrollY();
    let lastScrollTime = performance.now();

    const handleScroll = () => {
      const now = performance.now();
      const scrollY = readScrollY();
      const elapsed = Math.max(now - lastScrollTime, 16);

      targetVelocity.current = ((scrollY - lastScrollY) / elapsed) * 1000;
      lastScrollY = scrollY;
      lastScrollTime = now;
    };

    scrollTarget.addEventListener("scroll", handleScroll, { passive: true });

    return () => scrollTarget.removeEventListener("scroll", handleScroll);
  }, [scrollContainerRef]);

  useEffect(() => {
    if (copyWidth === 0) return;

    let frameId = 0;
    let lastTime = performance.now();

    const animate = (time: number) => {
      const delta = time - lastTime;
      lastTime = time;

      const springStrength = Math.max(1, stiffness) / 400;
      const dampingStrength = Math.max(1, damping) / 50;
      const smoothing = Math.min(1, 0.12 * springStrength);

      smoothVelocity.current += (targetVelocity.current - smoothVelocity.current) * smoothing;
      targetVelocity.current *= Math.max(0.82, 0.94 - dampingStrength * 0.02);

      const [inputStart, inputEnd] = velocityMapping.input;
      const [outputStart, outputEnd] = velocityMapping.output;
      const inputRange = inputEnd - inputStart || 1;
      const velocityFactor =
        outputStart + ((smoothVelocity.current - inputStart) / inputRange) * (outputEnd - outputStart);

      if (velocityFactor < 0) {
        directionFactor.current = -1;
      } else if (velocityFactor > 0) {
        directionFactor.current = 1;
      }

      let moveBy = directionFactor.current * baseVelocity * (delta / 1000);
      moveBy += directionFactor.current * moveBy * velocityFactor;
      baseX.current += moveBy;

      setX(`${wrap(-copyWidth, 0, baseX.current)}px`);
      frameId = requestAnimationFrame(animate);
    };

    frameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(frameId);
  }, [baseVelocity, copyWidth, damping, stiffness, velocityMapping]);

  return (
    <div className={parallaxClassName} style={parallaxStyle}>
      <div
        className={scrollerClassName}
        style={{ transform: `translate3d(${x}, 0, 0)`, ...scrollerStyle }}
      >
        {Array.from({ length: numCopies }, (_, index) => (
          <span className={className} key={index} ref={index === 0 ? copyRef : null}>
            {children}&nbsp;
          </span>
        ))}
      </div>
    </div>
  );
}

type ScrollVelocityProps = {
  scrollContainerRef?: RefObject<HTMLElement | null>;
  texts?: ReactNode[];
  velocity?: number;
  className?: string;
  damping?: number;
  stiffness?: number;
  numCopies?: number;
  velocityMapping?: VelocityMapping;
  parallaxClassName?: string;
  scrollerClassName?: string;
  parallaxStyle?: CSSProperties;
  scrollerStyle?: CSSProperties;
};

export default function ScrollVelocity({
  scrollContainerRef,
  texts = [],
  velocity = 100,
  className = "",
  damping = 50,
  stiffness = 400,
  numCopies = 6,
  velocityMapping = { input: [0, 1000], output: [0, 5] },
  parallaxClassName,
  scrollerClassName,
  parallaxStyle,
  scrollerStyle,
}: ScrollVelocityProps) {
  return (
    <>
      {texts.map((text, index) => (
        <VelocityText
          key={index}
          baseVelocity={index % 2 !== 0 ? -velocity : velocity}
          className={className}
          scrollContainerRef={scrollContainerRef}
          damping={damping}
          stiffness={stiffness}
          numCopies={numCopies}
          velocityMapping={velocityMapping}
          parallaxClassName={parallaxClassName}
          scrollerClassName={scrollerClassName}
          parallaxStyle={parallaxStyle}
          scrollerStyle={scrollerStyle}
        >
          {text}
        </VelocityText>
      ))}
    </>
  );
}
