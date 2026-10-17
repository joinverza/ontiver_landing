import { useEffect, useState } from "react";

/** Track the last heading to reach the page's anchor landing position. */
export const useActiveSection = (sectionIds: readonly string[]) => {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null);
    if (!sections.length) return;

    let frame = 0;
    let disposed = false;
    let previousId = "";
    let anchorOffset = 0;
    const update = () => {
      frame = 0;
      let current = sections[0];
      for (const section of sections) {
        if (section.getBoundingClientRect().top > anchorOffset + 2) break;
        current = section;
      }
      if (current.id !== previousId) {
        previousId = current.id;
        setActiveId(current.id);
      }
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const measure = () => {
      // Match native anchors and the shared scroll controller, including the navbar gap.
      const pagePadding = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop);
      const sectionMargin = parseFloat(getComputedStyle(sections[0]).scrollMarginTop);
      anchorOffset = (pagePadding || 0) + (sectionMargin || 0);
      schedule();
    };

    measure();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", measure);
    window.addEventListener("hashchange", schedule);
    const observer = new ResizeObserver(measure);
    sections.forEach((section) => observer.observe(section));
    void document.fonts?.ready.then(() => {
      if (!disposed) measure();
    });

    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", measure);
      window.removeEventListener("hashchange", schedule);
    };
  }, [sectionIds]);

  return activeId && sectionIds.includes(activeId) ? activeId : (sectionIds[0] ?? null);
};
