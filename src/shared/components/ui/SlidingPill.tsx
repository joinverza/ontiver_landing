import { useEffect, useLayoutEffect, useRef, type KeyboardEvent } from "react";
import "./sliding-pill.css";

type PillValue = string | number;

type SlidingPillProps<T extends PillValue> = {
  label: string;
  value: T;
  options: ReadonlyArray<{ value: T; label: string }>;
  onChange: (value: T) => void;
  onReselect?: (value: T) => void;
  tone?: "dark" | "soft";
  size?: "regular" | "compact";
  layout?: "single" | "wrap" | "scroll";
  className?: string;
};

const usePillLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

/** One measured background follows the selected button, including wrapped rows. */
const SlidingPill = <T extends PillValue>({
  label,
  value,
  options,
  onChange,
  onReselect,
  tone = "dark",
  size = "regular",
  layout = "single",
  className = "",
}: SlidingPillProps<T>) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const optionsKey = options.map((option) => `${option.value}:${option.label}`).join("\n");

  usePillLayoutEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const measure = () => {
      const selected = track.querySelector<HTMLButtonElement>('[aria-pressed="true"]');
      if (!selected || !selected.offsetWidth) return;
      track.style.setProperty("--pill-x", `${selected.offsetLeft}px`);
      track.style.setProperty("--pill-y", `${selected.offsetTop}px`);
      track.style.setProperty("--pill-width", `${selected.offsetWidth}px`);
      track.style.setProperty("--pill-height", `${selected.offsetHeight}px`);
      track.dataset.ready = "true";
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(track);
    track.querySelectorAll("button").forEach((button) => observer.observe(button));
    return () => observer.disconnect();
  }, [value, optionsKey]);

  const moveSelection = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const direction = ["ArrowRight", "ArrowDown"].includes(event.key)
      ? 1
      : ["ArrowLeft", "ArrowUp"].includes(event.key)
        ? -1
        : 0;
    if (!direction && !["Home", "End"].includes(event.key)) return;
    event.preventDefault();
    const next =
      event.key === "Home"
        ? 0
        : event.key === "End"
          ? options.length - 1
          : (index + direction + options.length) % options.length;
    const button = trackRef.current?.querySelectorAll("button")[next];
    button?.focus({ preventScroll: true });
    if (layout === "scroll" && button) {
      const rail = trackRef.current?.parentElement;
      if (rail) {
        const left = button.offsetLeft;
        const right = left + button.offsetWidth;
        if (left < rail.scrollLeft) rail.scrollTo({ left, behavior: "instant" });
        else if (right > rail.scrollLeft + rail.clientWidth) {
          rail.scrollTo({ left: right - rail.clientWidth, behavior: "instant" });
        }
      }
    }
    if (options[next].value !== value) onChange(options[next].value);
  };

  return (
    <div
      className={`sliding-pill sliding-pill--${tone} sliding-pill--${size} sliding-pill--${layout} ${className}`}
    >
      <div ref={trackRef} className="sliding-pill-track" role="group" aria-label={label}>
        <span className="sliding-pill-indicator" aria-hidden="true" />
        {options.map((option, index) => (
          <button
            key={option.value}
            type="button"
            className="sliding-pill-option"
            aria-pressed={option.value === value}
            onClick={() => {
              if (option.value !== value) onChange(option.value);
              else onReselect?.(option.value);
            }}
            onKeyDown={(event) => moveSelection(event, index)}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SlidingPill;
