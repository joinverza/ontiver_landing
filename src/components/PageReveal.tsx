import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";
import { useMotionSettings } from "./MotionSettings";

export default function PageReveal() {
  const { pathname } = useLocation();
  const { paused, reduced } = useMotionSettings();
  useLayoutEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>("main > section, main > div, [data-scroll-reveal], [data-media-reveal]"))
      .filter(element => !element.querySelector("[data-scroll-reveal], [data-media-reveal]"));
    if (paused || reduced) {
      elements.forEach(element => element.classList.add("ontiver-reveal-visible"));
      return;
    }
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("ontiver-reveal-visible");
        observer.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -4% 0px", threshold: 0 });
    elements.forEach((element, index) => {
      element.classList.add("ontiver-reveal");
      if (element.hasAttribute("data-scroll-reveal")) element.style.setProperty("--reveal-delay", `${index % 3 * 70}ms`);
      if (element.getBoundingClientRect().top < window.innerHeight * .92) element.classList.add("ontiver-reveal-visible");
      else observer.observe(element);
    });

    const images = Array.from(document.querySelectorAll<HTMLElement>("[data-parallax]"));
    const statements = Array.from(document.querySelectorAll<HTMLElement>("[data-word-reveal]"));
    let frame = 0;
    function renderScroll() {
      frame = 0;
      images.forEach(element => {
        const box = element.parentElement?.getBoundingClientRect();
        if (!box || box.bottom < 0 || box.top > innerHeight) return;
        const progress = (innerHeight / 2 - box.top - box.height / 2) / innerHeight;
        element.style.setProperty("--image-offset", `${Math.max(-22, Math.min(22, progress * 36))}px`);
      });
      statements.forEach(element => {
        const box = element.getBoundingClientRect();
        const progress = Math.max(0, Math.min(1, (innerHeight * .88 - box.top) / (innerHeight * .48)));
        const words = Array.from(element.children) as HTMLElement[];
        words.forEach((word, index) => { word.style.opacity = String(.25 + .75 * Math.max(0, Math.min(1, progress * (words.length + 3) - index))); });
      });
    }
    function queueScroll() { if (!frame) frame = requestAnimationFrame(renderScroll); }
    renderScroll();
    window.addEventListener("scroll", queueScroll, { passive: true });
    window.addEventListener("resize", queueScroll);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", queueScroll);
      window.removeEventListener("resize", queueScroll);
      images.forEach(element => element.style.removeProperty("--image-offset"));
      statements.forEach(element => Array.from(element.children).forEach(word => (word as HTMLElement).style.removeProperty("opacity")));
    };
  }, [pathname, paused, reduced]);
  return null;
}
