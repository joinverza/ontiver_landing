import { useEffect, useRef } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { limitWheelDelta } from "../lib/scrollInput";
import { cancelScrollMomentum, isPageScrollLocked, setPageScrollController } from "../lib/scrollNavigation";

export function useLenis() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let dispose: (() => void) | undefined;

    const updatePreference = () => {
      dispose?.();
      dispose = undefined;
      if (preference.matches) return;

      const lenis: Lenis = new Lenis({
        content: document.body,
        lerp: 0.085,
        smoothWheel: true,
        wheelMultiplier: 0.58,
        touchMultiplier: 1,
        syncTouch: false,
        stopInertiaOnNavigate: true,
        autoRaf: false,
        // Support conversations, textareas, and menus retain native scrolling.
        allowNestedScroll: true,
        virtualScroll: (input) => {
          if (input.event.type === "wheel" && !input.event.ctrlKey && input.deltaY !== 0) {
            const delta = limitWheelDelta(input.deltaY, lenis.targetScroll - lenis.animatedScroll, window.innerHeight);
            // Keep Lenis's prevention active when its queued travel is full.
            input.deltaY = delta || Math.sign(input.deltaY) * Number.EPSILON;
          }
          return true;
        },
      });

      lenisRef.current = lenis;
      setPageScrollController(lenis);

      let frame = 0;
      let previousTime: number | undefined;
      let scrollTime = 0;
      const animate = (time: number) => {
        // Match Quickbite's clock cap without introducing a second animation loop.
        const elapsed = previousTime === undefined ? 1000 / 60 : time - previousTime;
        previousTime = time;
        scrollTime += Math.min(elapsed, 1000 / 30);
        lenis.raf(scrollTime);
        frame = requestAnimationFrame(animate);
      };
      frame = requestAnimationFrame(animate);

      const updateLock = () => {
        if (isPageScrollLocked()) lenis.stop();
        else lenis.start();
      };
      const lockObserver = new MutationObserver(updateLock);
      lockObserver.observe(document.body, { attributes: true, attributeFilter: ["style", "class"] });
      lockObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["style"] });
      updateLock();

      const handleKeyboard = (event: KeyboardEvent) => {
        if (event.defaultPrevented || lenis.isScrolling !== "smooth") return;
        const scrollKey = ["ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End", " "].includes(event.key);
        const editable = event.target instanceof Element && event.target.closest("input, textarea, select, button, [contenteditable]:not([contenteditable='false'])");
        if (event.key === "Tab" || (scrollKey && !editable)) cancelScrollMomentum();
      };
      document.addEventListener("keydown", handleKeyboard);
      window.addEventListener("popstate", cancelScrollMomentum);

      let disposed = false;
      void document.fonts?.ready.then(() => {
        if (!disposed) lenis.resize();
      });

      dispose = () => {
        disposed = true;
        cancelAnimationFrame(frame);
        lockObserver.disconnect();
        document.removeEventListener("keydown", handleKeyboard);
        window.removeEventListener("popstate", cancelScrollMomentum);
        setPageScrollController(null);
        lenis.destroy();
        lenisRef.current = null;
      };
    };

    updatePreference();
    preference.addEventListener("change", updatePreference);
    return () => {
      preference.removeEventListener("change", updatePreference);
      dispose?.();
    };
  }, []);

  return lenisRef;
}
