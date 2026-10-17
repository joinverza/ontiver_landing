const mediaSelector = "[data-media-reveal], .page-hero-media, .story-split-media, .direction-photo";
const cardSelector =
  "article[data-scroll-reveal], .surface-card, .spotlight-cell, .workflow-win, .faq-item, .editorial-link, .case-study-slide, .image-hover-panel";
const actionSelector =
  ".button-primary, .button-secondary, a.inline-flex, .faq-support-link, .individual-hero-security";
const textSelector = "h1, h2, h3, p, li, dt, dd, .eyebrow, .aurora-badge";
const atomicSelector = `${mediaSelector}, ${cardSelector}`;
const itemSelector = `${atomicSelector}, ${actionSelector}, ${textSelector}`;
const revealSelector = `[data-scroll-reveal], ${itemSelector}`;
// These regions already choreograph their own motion or contain interactive
// content. Keep the film's layered entrance independent from section reveals.
const independentMotionSelector = [
  "nav",
  "footer",
  "form",
  "[hidden]",
  '[aria-hidden="true"]',
  "[inert]",
  '[role="dialog"]',
  '[role="tablist"]',
  '[role="tabpanel"]',
  ".sr-only",
  ".hero-enter",
  ".hero-media-enter",
  ".individual-film-stage",
  ".hero-film",
  ".enterprise-hero-media",
  ".workflow-screen",
  ".trust-marquee",
  ".image-timeline",
  "[data-word-reveal]",
].join(", ");
const motionSelector = "[data-parallax], [data-word-reveal]";

const isRevealItem = (element: HTMLElement) => {
  if (!element.closest("main") || element.closest(independentMotionSelector)) return false;
  // A card or photo enters as one item; its hover details keep their own motion.
  if (element.parentElement?.closest(atomicSelector)) return false;
  if (element.parentElement?.closest(`${textSelector}, ${actionSelector}`)) return false;
  return (
    element.matches(itemSelector) ||
    (element.matches("[data-scroll-reveal]") && !element.querySelector(itemSelector))
  );
};

const revealKind = (element: HTMLElement) => {
  if (element.matches(cardSelector)) return "card";
  if (element.matches(mediaSelector)) return "media";
  if (element.matches("h1, h2, h3")) return "heading";
  if (element.matches(actionSelector)) return "action";
  return "text";
};

type MotionTarget = {
  element: HTMLElement;
  words: HTMLElement[] | null;
};

const resetMotion = ({ element, words }: MotionTarget) => {
  element.style.removeProperty("--image-offset");
  words?.forEach((word) => word.style.removeProperty("opacity"));
};

export const observePageReveals = (shell: HTMLElement) => {
  if (!("IntersectionObserver" in window)) return;
  const reveals = new Set<HTMLElement>();
  const staggerGroups = new WeakMap<Element, number>();
  const motionTargets = new Map<HTMLElement, MotionTarget>();
  const activeTargets = new Set<HTMLElement>();
  let frame = 0;
  let listening = false;

  const showReveal = (element: Element) => {
    if (!element.classList.contains("ontiver-reveal-visible")) {
      element.classList.add("ontiver-reveal-animate");
    }
    element.classList.add("ontiver-reveal-visible");
    revealObserver.unobserve(element);
  };

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        showReveal(entry.target);
      });
    },
    { rootMargin: "0px 0px -24px 0px" },
  );

  const renderMotion = (elements: Iterable<HTMLElement>) => {
    // Read every active target before writing styles. Word children are cached
    // when their content mounts, rather than queried on every scroll frame.
    const updates = Array.from(elements, (element) => {
      const target = motionTargets.get(element);
      const box = (target?.words ? element : element.parentElement)?.getBoundingClientRect();
      return target && box ? { target, box } : null;
    });
    const viewport = window.innerHeight;
    updates.forEach((update) => {
      if (!update) return;
      const {
        target: { element, words },
        box,
      } = update;
      if (words) {
        const progress = Math.max(0, Math.min(1, (viewport * 0.88 - box.top) / (viewport * 0.48)));
        words.forEach((word, index) => {
          const opacity = String(
            0.25 + 0.75 * Math.max(0, Math.min(1, progress * (words.length + 3) - index)),
          );
          if (word.style.opacity !== opacity) word.style.opacity = opacity;
        });
      } else {
        const progress = (viewport / 2 - box.top - box.height / 2) / viewport;
        const offset = `${Math.max(-22, Math.min(22, progress * 36))}px`;
        if (element.style.getPropertyValue("--image-offset") !== offset) {
          element.style.setProperty("--image-offset", offset);
        }
      }
    });
  };

  const renderFrame = () => {
    frame = 0;
    renderMotion(activeTargets);
  };
  const queueFrame = () => {
    if (!frame && !document.hidden && activeTargets.size)
      frame = requestAnimationFrame(renderFrame);
  };
  const updateListeners = () => {
    const shouldListen = activeTargets.size > 0 && !document.hidden;
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
  const motionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const element = entry.target as HTMLElement;
        if (entry.isIntersecting) activeTargets.add(element);
        else activeTargets.delete(element);
      });
      updateListeners();
      queueFrame();
    },
    { rootMargin: "60px" },
  );

  const register = (root: Element) => {
    const selector = `${revealSelector}, ${motionSelector}`;
    const candidates = Array.from(root.querySelectorAll<HTMLElement>(selector));
    if (root instanceof HTMLElement && root.matches(selector)) candidates.unshift(root);
    if (!candidates.length) return;

    const newReveals = candidates
      .filter(
        (element) =>
          element.matches(revealSelector) && !reveals.has(element) && isRevealItem(element),
      )
      .map((element) => ({
        element,
        box: element.getBoundingClientRect(),
      }));

    newReveals.forEach(({ element, box }) => {
      reveals.add(element);
      const group = element.parentElement ?? shell;
      const index = staggerGroups.get(group) ?? 0;
      staggerGroups.set(group, index + 1);
      element.style.setProperty("--reveal-delay", `${Math.min(index, 4) * 65}ms`);
      element.dataset.revealKind = revealKind(element);

      // Prerendered content is visible without JS. Items already on screen get
      // a gentle lift, never a visible-to-hidden hydration flash.
      if (box.top < window.innerHeight && box.bottom > 0) {
        if (!element.classList.contains("ontiver-reveal-visible")) {
          element.classList.add("ontiver-load-enter");
        }
        element.classList.add("ontiver-reveal-visible");
      } else if (box.bottom <= 0) {
        element.classList.add("ontiver-reveal-visible");
      }
      element.classList.add("ontiver-reveal");
      if (!element.classList.contains("ontiver-reveal-visible")) revealObserver.observe(element);
    });

    // A lazy section can replace its skeleton with children that reveal on
    // their own. Its previously registered wrapper must remain visible.
    reveals.forEach((element) => {
      if (
        element.matches("[data-scroll-reveal]") &&
        !element.matches(itemSelector) &&
        element.querySelector(itemSelector)
      ) {
        revealObserver.unobserve(element);
        element.classList.remove("ontiver-reveal", "ontiver-reveal-animate", "ontiver-load-enter");
        element.style.removeProperty("--reveal-delay");
        delete element.dataset.revealKind;
        reveals.delete(element);
      }
    });

    const addedMotion: HTMLElement[] = [];
    candidates.forEach((element) => {
      if (!element.matches(motionSelector) || motionTargets.has(element)) return;
      const words = element.hasAttribute("data-word-reveal")
        ? (Array.from(element.children) as HTMLElement[])
        : null;
      motionTargets.set(element, { element, words });
      addedMotion.push(element);
      motionObserver.observe(element);
    });
    renderMotion(addedMotion);
  };

  const pruneDetached = () => {
    reveals.forEach((element) => {
      if (shell.contains(element)) return;
      revealObserver.unobserve(element);
      reveals.delete(element);
    });
    motionTargets.forEach((target, element) => {
      if (shell.contains(element)) return;
      motionObserver.unobserve(element);
      resetMotion(target);
      motionTargets.delete(element);
      activeTargets.delete(element);
    });
    updateListeners();
  };
  const mountObserver = new MutationObserver((records) => {
    const added = new Set<Element>();
    let removed = false;
    records.forEach((record) => {
      record.addedNodes.forEach((node) => {
        if (node instanceof Element && shell.contains(node)) added.add(node);
      });
      removed ||= Array.from(record.removedNodes).some((node) => node instanceof Element);
    });
    if (removed) pruneDetached();
    added.forEach((node) => {
      if (![...added].some((parent) => parent !== node && parent.contains(node))) register(node);
    });
  });

  register(shell);
  mountObserver.observe(shell, { childList: true, subtree: true });
  document.addEventListener("visibilitychange", updateListeners);
  const onFocus = (event: FocusEvent) => {
    if (!(event.target instanceof Element)) return;
    const item = event.target.closest(".ontiver-reveal");
    if (!item) return;
    // Keyboard navigation must not land on a delayed, invisible action.
    showReveal(item);
    item.classList.remove("ontiver-reveal-animate", "ontiver-load-enter");
    item.classList.add("ontiver-reveal-focused");
  };
  const onAnimationEnd = (event: AnimationEvent) => {
    if (
      !(event.target instanceof HTMLElement) ||
      !event.animationName.startsWith("ontiver-item-")
    ) {
      return;
    }
    event.target.classList.remove("ontiver-reveal-animate", "ontiver-load-enter");
  };
  shell.addEventListener("focusin", onFocus);
  shell.addEventListener("animationend", onAnimationEnd);

  return () => {
    mountObserver.disconnect();
    revealObserver.disconnect();
    motionObserver.disconnect();
    cancelAnimationFrame(frame);
    window.removeEventListener("scroll", queueFrame);
    window.removeEventListener("resize", queueFrame);
    document.removeEventListener("visibilitychange", updateListeners);
    shell.removeEventListener("focusin", onFocus);
    shell.removeEventListener("animationend", onAnimationEnd);
    reveals.forEach((element) => {
      // Restore the visible baseline without marking unseen content as revealed.
      // StrictMode can initialize the same mounted elements again immediately.
      if (element.matches(".ontiver-load-enter, .ontiver-reveal-animate")) {
        element.classList.remove("ontiver-reveal-visible");
      }
      element.classList.remove(
        "ontiver-reveal",
        "ontiver-reveal-animate",
        "ontiver-load-enter",
        "ontiver-reveal-focused",
      );
      element.style.removeProperty("--reveal-delay");
      delete element.dataset.revealKind;
    });
    motionTargets.forEach(resetMotion);
  };
};
