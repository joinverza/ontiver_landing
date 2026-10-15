import { useEffect, useRef, useState } from "react";
import { SiteImage } from "../../../../shared/components/media/SiteImage";
import type { SolutionStep } from "../../../../shared/data/solution";
import "./solution.css";

const SolutionMedia = ({
  steps,
  selectedStep,
}: {
  steps: SolutionStep[];
  selectedStep: number;
}) => {
  const images = useRef<Array<HTMLImageElement | null>>([]);
  const [displayedStep, setDisplayedStep] = useState(selectedStep);

  useEffect(() => {
    const image = images.current[selectedStep];
    if (!image) return;
    let cancelled = false;

    // Keep the previous photograph visible until the incoming image can be painted.
    void image
      .decode()
      .then(() => {
        if (!cancelled) setDisplayedStep(selectedStep);
      })
      .catch(() => {
        // A failed image must not replace the last successfully displayed photograph.
      });

    return () => {
      cancelled = true;
    };
  }, [selectedStep]);

  return (
    <div className="solution-photos" data-media-reveal>
      {steps.map(({ image }, index) => (
        <SiteImage
          key={image.src}
          ref={(node) => {
            images.current[index] = node;
          }}
          className="solution-photo"
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          sizes="(min-width: 1024px) 48vw, 100vw"
          style={{ objectPosition: image.objectPosition }}
          data-active={displayedStep === index}
          aria-hidden={displayedStep !== index}
          reveal={false}
        />
      ))}
    </div>
  );
};

export default SolutionMedia;
