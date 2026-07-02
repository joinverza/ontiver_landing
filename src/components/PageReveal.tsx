import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const REVEAL_SELECTOR = "section, footer";
const SKIP_SELECTOR = "[data-reveal='off'], [data-section-reveal='off']";

function shouldSkipReveal(section: HTMLElement) {
  return (
    section.matches(SKIP_SELECTOR) ||
    Boolean(section.closest("[data-curtain-wrapper]")) ||
    Boolean(section.closest("[data-horizontal-transition]"))
  );
}

export default function PageReveal() {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    const page = document.querySelector<HTMLElement>("[data-page-shell]");

    if (!page) {
      return;
    }

    page.classList.remove("page-load-enter", "page-load-ready");
    page.classList.add("page-load-enter");

    const readyFrame = window.requestAnimationFrame(() => {
      page.classList.add("page-load-ready");
    });

    const cleanupTimer = window.setTimeout(() => {
      page.classList.remove("page-load-enter", "page-load-ready");
      ScrollTrigger.refresh();
    }, 850);

    return () => {
      window.cancelAnimationFrame(readyFrame);
      window.clearTimeout(cleanupTimer);
      page.classList.remove("page-load-enter", "page-load-ready");
    };
  }, [pathname]);

  useLayoutEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const allSections = Array.from(
      document.querySelectorAll<HTMLElement>(REVEAL_SELECTOR),
    );
    const sections = allSections.filter((section) => !shouldSkipReveal(section));

    allSections
      .filter((section) => shouldSkipReveal(section))
      .forEach((section) => {
        section.classList.remove(
          "section-scroll-reveal",
          "section-scroll-reveal-in",
        );
      });

    if (prefersReducedMotion) {
      sections.forEach((section) => {
        section.classList.add("section-scroll-reveal-in");
      });
      return;
    }

    let refreshTimer: number | undefined;

    const queueScrollRefresh = () => {
      if (refreshTimer) {
        window.clearTimeout(refreshTimer);
      }

      refreshTimer = window.setTimeout(() => {
        ScrollTrigger.refresh();
      }, 500);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          const section = entry.target as HTMLElement;
          section.classList.add("section-scroll-reveal-in");
          observer.unobserve(section);
          queueScrollRefresh();
        });
      },
      {
        rootMargin: "0px 0px -10% 0px",
        threshold: 0.12,
      },
    );

    sections.forEach((section) => {
      section.classList.add("section-scroll-reveal");
      observer.observe(section);
    });

    queueScrollRefresh();

    return () => {
      observer.disconnect();

      if (refreshTimer) {
        window.clearTimeout(refreshTimer);
      }

      sections.forEach((section) => {
        section.classList.remove(
          "section-scroll-reveal",
          "section-scroll-reveal-in",
        );
      });
    };
  }, [pathname]);

  return null;
}
