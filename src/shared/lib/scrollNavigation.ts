import type Lenis from "lenis";

let controller: Lenis | null = null;
let restoreFocusTarget: (() => void) | undefined;

export function setPageScrollController(value: Lenis | null) {
  controller = value;
  if (!value) {
    restoreFocusTarget?.();
    restoreFocusTarget = undefined;
  }
}

export function isPageScrollLocked() {
  const body = getComputedStyle(document.body);
  return (
    body.overflowY === "hidden" ||
    body.overflowY === "clip" ||
    body.position === "fixed" ||
    ["hidden", "clip"].includes(document.documentElement.style.overflow) ||
    ["hidden", "clip"].includes(document.documentElement.style.overflowY)
  );
}

export function cancelScrollMomentum() {
  if (!controller || controller.isStopped || controller.isScrolling !== "smooth") return;
  controller.stop();
  controller.start();
}

export function getHashTarget(hash: string) {
  if (!hash || hash === "#") return null;
  try {
    return document.getElementById(decodeURIComponent(hash.slice(1)));
  } catch {
    return null;
  }
}

function focusTarget(target: HTMLElement) {
  restoreFocusTarget?.();
  if (!target.hasAttribute("tabindex")) {
    target.setAttribute("tabindex", "-1");
    const restore = () => {
      target.removeEventListener("blur", restore);
      target.removeAttribute("tabindex");
      restoreFocusTarget = undefined;
    };
    restoreFocusTarget = restore;
    target.addEventListener("blur", restore, { once: true });
  }
  target.focus({ preventScroll: true });
}

/** One scroll owner for links, routes, and programmatic section navigation. */
export function scrollPageTo(
  target: HTMLElement | number | null,
  { immediate = false, focus = false }: { immediate?: boolean; focus?: boolean } = {},
) {
  if (
    target === null ||
    (target instanceof HTMLElement && !target.isConnected) ||
    isPageScrollLocked()
  )
    return;
  const complete = () => {
    if (focus && target instanceof HTMLElement && target.isConnected) focusTarget(target);
  };
  if (controller && !controller.isStopped) {
    cancelScrollMomentum();
    controller.resize();
    controller.scrollTo(target, { immediate, duration: 0.9, onComplete: complete });
    return;
  }

  const behavior =
    immediate || window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? "instant"
      : "smooth";
  if (typeof target === "number") window.scrollTo({ top: target, behavior });
  else target.scrollIntoView({ behavior, block: "start" });
  complete();
}
