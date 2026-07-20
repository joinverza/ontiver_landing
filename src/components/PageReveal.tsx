import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

const REVEAL_SELECTOR =
  "main > section, main > div, [data-scroll-reveal]";

export default function PageReveal() {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>(REVEAL_SELECTOR));
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      elements.forEach((element) => element.classList.add("ontiver-reveal-visible"));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("ontiver-reveal-visible");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -6% 0px", threshold: 0.08 },
    );

    elements.forEach((element, index) => {
      element.classList.add("ontiver-reveal");
      const startsAtPageTop =
        index === 0 && element.getBoundingClientRect().top <= 1;

      if (startsAtPageTop) element.classList.add("ontiver-reveal-visible");
      else observer.observe(element);
    });

    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
