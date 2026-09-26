const revealMarker = "[data-scroll-reveal], [data-media-reveal]";
const revealSelector = `main > section, main > div, ${revealMarker}`;
const motionSelector = "[data-parallax], [data-word-reveal]";

type MotionTarget = {
  element: HTMLElement;
  words: HTMLElement[] | null;
};

const resetMotion = ({ element, words }: MotionTarget) => {
  element.style.removeProperty("--image-offset");
  words?.forEach((word) => word.style.removeProperty("opacity"));
};

export const observePageReveals = (shell: HTMLElement) => {
  const reveals = new Set<HTMLElement>();
  const motionTargets = new Map<HTMLElement, MotionTarget>();
  const activeTargets = new Set<HTMLElement>();
  let frame = 0;
  let listening = false;
  let revealIndex = 0;

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("ontiver-reveal-visible");
        revealObserver.unobserve(entry.target);
      });
    },
    { rootMargin: "0px 0px -4% 0px" },
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
          element.matches(revealSelector) &&
          !reveals.has(element) &&
          !element.querySelector(revealMarker),
      )
      .map((element) => ({
        element,
        inFirstPaint: element.getBoundingClientRect().top < window.innerHeight,
      }));

    newReveals.forEach(({ element, inFirstPaint }) => {
      reveals.add(element);
      // Already-painted SSR content must never flash from visible to hidden.
      if (inFirstPaint) element.classList.add("ontiver-reveal-visible");
      if (element.hasAttribute("data-scroll-reveal")) {
        element.style.setProperty("--reveal-delay", `${(revealIndex++ % 3) * 70}ms`);
      }
      element.classList.add("ontiver-reveal");
      if (!element.classList.contains("ontiver-reveal-visible")) revealObserver.observe(element);
    });

    // A lazy section can replace its skeleton with children that reveal on
    // their own. Its previously registered wrapper must remain visible.
    reveals.forEach((element) => {
      if (element.querySelector(revealMarker)) {
        element.classList.add("ontiver-reveal-visible");
        revealObserver.unobserve(element);
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

  return () => {
    mountObserver.disconnect();
    revealObserver.disconnect();
    motionObserver.disconnect();
    cancelAnimationFrame(frame);
    window.removeEventListener("scroll", queueFrame);
    window.removeEventListener("resize", queueFrame);
    document.removeEventListener("visibilitychange", updateListeners);
    reveals.forEach((element) => {
      element.classList.add("ontiver-reveal-visible");
      element.style.removeProperty("--reveal-delay");
    });
    motionTargets.forEach(resetMotion);
  };
};
