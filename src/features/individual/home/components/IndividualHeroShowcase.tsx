import { useEffect, useRef } from "react";
import { useMotionSettings } from "../../../../shared/components/motion/MotionSettings";
import HeroFilm from "./HeroFilm";

/** Scroll unfolds the film and its layered frame without reserving a pinned viewport. */
const IndividualHeroShowcase = () => {
  const stageRef = useRef<HTMLDivElement>(null);
  const { paused, reduced } = useMotionSettings();

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage || paused || reduced || typeof IntersectionObserver === "undefined") return;
    let frame = 0;
    let visible = false;
    let listening = false;
    const render = () => {
      frame = 0;
      const top = stage.getBoundingClientRect().top;
      const viewport = window.innerHeight;
      const progress = Math.max(0, Math.min(1, (viewport * 0.96 - top) / (viewport * 0.65)));
      stage.style.setProperty("--film-unfold", progress.toFixed(4));
    };
    const schedule = () => {
      if (!frame && visible && !document.hidden) frame = requestAnimationFrame(render);
    };
    const sync = () => {
      const nextListening = visible && !document.hidden;
      if (nextListening === listening) return;
      listening = nextListening;
      if (listening) {
        window.addEventListener("scroll", schedule, { passive: true });
        window.addEventListener("resize", schedule);
        schedule();
      } else {
        window.removeEventListener("scroll", schedule);
        window.removeEventListener("resize", schedule);
        cancelAnimationFrame(frame);
        frame = 0;
      }
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) stage.dataset.revealed = "true";
        sync();
      },
      { rootMargin: "40px" },
    );
    render();
    stage.dataset.animated = "true";
    observer.observe(stage);
    document.addEventListener("visibilitychange", sync);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      document.removeEventListener("visibilitychange", sync);
      delete stage.dataset.animated;
      delete stage.dataset.revealed;
      stage.style.removeProperty("--film-unfold");
    };
  }, [paused, reduced]);

  return (
    <div ref={stageRef} className="individual-film-stage">
      <div className="individual-film-depth individual-film-depth--back" aria-hidden="true" />
      <div className="individual-film-depth individual-film-depth--front" aria-hidden="true" />
      <div className="individual-film-screen">
        <div className="individual-film-aperture">
          <HeroFilm />
          <span className="individual-film-glint" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
};

export default IndividualHeroShowcase;
