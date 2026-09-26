import { useEffect, useRef, type RefObject } from "react";

type ReadingProgressProps = { targetRef: RefObject<HTMLElement | null> };

const ReadingProgress = ({ targetRef }: ReadingProgressProps) => {
  const progressRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const article = targetRef.current;
    const bar = progressRef.current;
    if (!article || !bar) return;
    let frame = 0;
    let visible = false;
    let listening = false;

    const render = () => {
      frame = 0;
      const rect = article.getBoundingClientRect();
      const viewport = window.innerHeight;
      const total = rect.height - viewport * 0.45;
      const progress = total <= 0 ? 0 : Math.min(1, Math.max(0, -rect.top) / total);
      const opacity = rect.top < 12 && rect.bottom > viewport * 0.25 ? "1" : "0";
      bar.style.transform = `scaleX(${progress})`;
      if (bar.style.opacity !== opacity) bar.style.opacity = opacity;
    };
    const queueFrame = () => {
      if (!frame && visible && !document.hidden) frame = requestAnimationFrame(render);
    };
    const updateListeners = () => {
      const shouldListen = visible && !document.hidden;
      if (shouldListen === listening) return;
      listening = shouldListen;
      if (listening) {
        window.addEventListener("scroll", queueFrame, { passive: true });
        window.addEventListener("resize", queueFrame);
        queueFrame();
      } else {
        window.removeEventListener("scroll", queueFrame);
        window.removeEventListener("resize", queueFrame);
        cancelAnimationFrame(frame);
        frame = 0;
      }
    };
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (!visible) bar.style.opacity = "0";
      updateListeners();
    });
    const resizeObserver = new ResizeObserver(queueFrame);
    intersectionObserver.observe(article);
    resizeObserver.observe(article);
    document.addEventListener("visibilitychange", updateListeners);

    return () => {
      intersectionObserver.disconnect();
      resizeObserver.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", queueFrame);
      window.removeEventListener("resize", queueFrame);
      document.removeEventListener("visibilitychange", updateListeners);
    };
  }, [targetRef]);

  return (
    <span
      ref={progressRef}
      aria-hidden="true"
      className="fixed left-0 top-0 z-[200] h-0.5 w-full origin-left bg-[#009311]"
      style={{ transform: "scaleX(0)", opacity: 0 }}
    />
  );
};

export default ReadingProgress;
