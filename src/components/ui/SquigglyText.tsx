import {
  type CSSProperties,
  type ElementType,
  type ReactNode,
  useEffect,
  useId,
  useMemo,
  useState,
} from "react";

type SquigglyTextProps = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  steps?: number;
  stepDuration?: number;
  scale?: number | [number, number];
  baseFrequency?: number;
  numOctaves?: number;
  as?: "span" | "div";
};

export default function SquigglyText({
  children,
  steps = 5,
  stepDuration = 80,
  scale = [6, 8],
  baseFrequency = 0.03,
  numOctaves = 3,
  as = "span",
  className = "",
  style,
}: SquigglyTextProps) {
  const reactId = useId();
  const safeId = reactId.replace(/[:_]/g, "");
  const [step, setStep] = useState(0);

  const filters = useMemo(
    () => Array.from({ length: steps }, (_, index) => `url(#squiggly-${safeId}-${index})`),
    [safeId, steps],
  );

  useEffect(() => {
    const interval = window.setInterval(() => {
      setStep((currentStep) => (currentStep + 1) % steps);
    }, stepDuration);

    return () => window.clearInterval(interval);
  }, [stepDuration, steps]);

  const scaleAt = (index: number) => (Array.isArray(scale) ? scale[index % scale.length] : scale);
  const Wrapper = as as ElementType;

  return (
    <Wrapper
      className={`inline-block ${className}`}
      style={{ filter: filters[step], ...style }}
    >
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute h-0 w-0 overflow-hidden"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {Array.from({ length: steps }, (_, index) => (
            <filter id={`squiggly-${safeId}-${index}`} key={index}>
              <feTurbulence
                baseFrequency={baseFrequency}
                numOctaves={numOctaves}
                result="noise"
                seed={index}
              />
              <feDisplacementMap in="SourceGraphic" in2="noise" scale={scaleAt(index)} />
            </filter>
          ))}
        </defs>
      </svg>
      {children}
    </Wrapper>
  );
}
