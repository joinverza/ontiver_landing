import { useId, useRef, useState, type CSSProperties, type KeyboardEvent } from "react";
import type { OntiverIcon } from "../ui/icons";
import type { EditorialImage } from "../../data/imagery";
import { SiteImage } from "./SiteImage";
import "./image-timeline.css";

export type ImageTimelineStep = {
  title: string;
  description: string;
  image: EditorialImage;
  icon?: OntiverIcon;
};

type ImageTimelineProps = {
  steps: readonly ImageTimelineStep[];
  labelledBy: string;
  className?: string;
};

export const ImageTimeline = ({ steps, labelledBy, className = "" }: ImageTimelineProps) => {
  const id = useId();
  const [selected, setSelected] = useState(0);
  const [displayed, setDisplayed] = useState(0);
  const [visited, setVisited] = useState([0]);
  const loaded = useRef(new Set<number>());
  const buttons = useRef<Array<HTMLButtonElement | null>>([]);

  const select = (index: number) => {
    setSelected(index);
    setVisited((current) => (current.includes(index) ? current : [...current, index]));
    if (loaded.current.has(index)) setDisplayed(index);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let next: number;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") next = (index + 1) % steps.length;
    else if (event.key === "ArrowLeft" || event.key === "ArrowUp")
      next = (index - 1 + steps.length) % steps.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = steps.length - 1;
    else return;
    event.preventDefault();
    buttons.current[next]?.focus();
  };

  return (
    <div
      className={`image-timeline ${className}`}
      style={
        {
          "--timeline-columns": steps.length,
          "--timeline-compact-columns": Math.min(steps.length, 3),
        } as CSSProperties
      }
      data-selected-step={selected}
      role="group"
      aria-labelledby={labelledBy}
    >
      <div className="image-timeline-backdrop" aria-hidden="true" data-media-reveal>
        {visited.map((index) => {
          const { image } = steps[index];
          return (
            <div
              key={image.src}
              className="image-timeline-image"
              data-active={displayed === index || undefined}
              style={
                {
                  "--timeline-photo": `url("${image.src}")`,
                  "--timeline-focus": image.objectPosition,
                  "--timeline-photo-position": `${(index / Math.max(steps.length - 1, 1)) * 100}%`,
                } as CSSProperties
              }
            >
              <SiteImage
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                reveal={false}
                onLoad={() => {
                  loaded.current.add(index);
                  if (selected === index) setDisplayed(index);
                }}
              />
            </div>
          );
        })}
      </div>
      <ol className="image-timeline-columns">
        {steps.map(({ title, description, icon: Icon }, index) => (
          <li
            key={title}
            className="image-timeline-column"
            data-active={selected === index || undefined}
            onMouseEnter={() => select(index)}
          >
            <h3 className="text-card-title font-medium">
              <button
                ref={(element) => {
                  buttons.current[index] = element;
                }}
                type="button"
                className="image-timeline-trigger"
                aria-pressed={selected === index}
                aria-describedby={`${id}-description-${index}`}
                onFocus={() => select(index)}
                onClick={() => select(index)}
                onKeyDown={(event) => handleKeyDown(event, index)}
              >
                <span className="image-timeline-marker" aria-hidden="true">
                  {Icon && <Icon size={24} strokeWidth={1.6} />}
                  <span>{String(index + 1).padStart(2, "0")}</span>
                </span>
                <span>{title}</span>
              </button>
            </h3>
            <p id={`${id}-description-${index}`} className="image-timeline-description text-body">
              {description}
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
};
