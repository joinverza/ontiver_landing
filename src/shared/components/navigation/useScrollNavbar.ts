import { useEffect, useRef } from "react";
import { navbarSurfaceIsDark } from "./navbarSurface";

/** Hide desktop navigation on downward travel while its primary action stays in place. */
export const useScrollNavbar = (routeKey: string) => {
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;
    const root = document.documentElement;
    const desktop = window.matchMedia("(min-width: 1250px)");
    const chrome = Array.from(header.querySelectorAll<HTMLElement>("[data-navbar-chrome]"));
    const action = header.querySelector<HTMLElement>(".navbar-action");
    let previousY = Math.max(0, window.scrollY);
    let direction = 0;
    let travel = 0;
    let frame = 0;
    let compact = false;
    let headerHeight = header.offsetHeight;
    let disposed = false;

    const updateActionTone = () => {
      const light = compact && desktop.matches && action && navbarSurfaceIsDark(header, action);
      const tone = light ? "light" : "dark";
      if (header.dataset.ctaTone !== tone) header.dataset.ctaTone = tone;
    };

    const showCompact = (next: boolean) => {
      if (next === compact) return;
      compact = next;
      header.dataset.compact = String(next);
      root.dataset.navbarCompact = String(next);
      chrome.forEach((element) => {
        element.inert = next;
        if (next) element.setAttribute("aria-hidden", "true");
        else element.removeAttribute("aria-hidden");
      });
      updateActionTone();
    };
    const reset = () => {
      previousY = Math.max(0, window.scrollY);
      direction = 0;
      travel = 0;
      showCompact(false);
      updateActionTone();
    };
    const measure = () => {
      headerHeight = header.offsetHeight;
      header.style.setProperty("--navbar-collapse-distance", `${headerHeight}px`);
      reset();
    };
    const update = () => {
      frame = 0;
      const currentY = Math.max(0, window.scrollY);
      const delta = currentY - previousY;
      previousY = currentY;
      // Pointer-clicked audience buttons retain focus across route changes.
      // Only visible keyboard focus should hold the navigation open.
      const focused = document.activeElement;
      const focusedChrome =
        focused?.matches(":focus-visible") && chrome.some((element) => element.contains(focused));
      if (
        !desktop.matches ||
        currentY <= headerHeight ||
        focusedChrome ||
        header.querySelector("[data-nav-dropdown]")
      ) {
        showCompact(false);
        travel = 0;
        direction = 0;
        return;
      }
      updateActionTone();
      if (Math.abs(delta) < 0.5) return;
      const nextDirection = Math.sign(delta);
      if (nextDirection !== direction) travel = 0;
      direction = nextDirection;
      travel += Math.abs(delta);
      if (direction > 0 && travel >= 20) showCompact(true);
      else if (direction < 0 && travel >= 8) showCompact(false);
    };
    const schedule = () => {
      if (!frame && !document.hidden) frame = requestAnimationFrame(update);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      // Restore keyboard access before the browser chooses the next Tab target.
      if (event.key === "Tab") reset();
    };
    const onFocus = (event: FocusEvent) => {
      if (
        event.target instanceof Element &&
        event.target.matches(":focus-visible") &&
        chrome.some((element) => element.contains(event.target as Node))
      ) {
        reset();
      }
    };

    header.dataset.compact = "false";
    root.dataset.navbarCompact = "false";
    measure();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", measure);
    // Lazy route content can finish loading while the page is stationary.
    const contentObserver = new MutationObserver(schedule);
    const shell = document.querySelector("[data-page-shell]");
    if (shell) contentObserver.observe(shell, { childList: true, subtree: true });
    document.addEventListener("keydown", onKeyDown, true);
    header.addEventListener("focusin", onFocus);
    desktop.addEventListener("change", measure);
    void document.fonts?.ready.then(() => {
      if (!disposed) measure();
    });

    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", measure);
      contentObserver.disconnect();
      document.removeEventListener("keydown", onKeyDown, true);
      header.removeEventListener("focusin", onFocus);
      desktop.removeEventListener("change", measure);
      showCompact(false);
      delete header.dataset.compact;
      delete root.dataset.navbarCompact;
      delete header.dataset.ctaTone;
      header.style.removeProperty("--navbar-collapse-distance");
    };
  }, [routeKey]);

  return headerRef;
};
