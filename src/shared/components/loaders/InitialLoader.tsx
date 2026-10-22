import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import InitialLoaderVisual from "./InitialLoaderVisual";
import "./initial-loader.css";

const StartupContext = createContext({ pending: false, routeReady: () => {} });
const subscribeToHydration = () => () => {};
const clientSnapshot = () => true;
const serverSnapshot = () => false;
const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// The dashboard's opening animation, adapted to a public, prerendered site.
const InitialLoader = ({ children }: { children: ReactNode }) => {
  const [phase, setPhase] = useState<"loading" | "leaving" | "complete">("loading");
  const [ready, setReady] = useState(false);
  const startedAt = useRef(0);
  const hydrated = useSyncExternalStore(subscribeToHydration, clientSnapshot, serverSnapshot);
  const pending = phase !== "complete";
  const routeReady = useCallback(() => setReady(true), []);
  const leave = useCallback(() => {
    setPhase((current) => (current === "loading" ? "leaving" : current));
  }, []);

  useLayoutEffect(() => {
    if (!hydrated || !pending) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [hydrated, pending]);

  useEffect(() => {
    const expire = () => setPhase("complete");
    document.addEventListener("ontiver-startup-expired", expire);
    // The bootstrap fallback may have expired before hydration began.
    const timeout = !document.documentElement.hasAttribute("data-initial-loading")
      ? window.setTimeout(expire, 0)
      : undefined;
    return () => {
      document.removeEventListener("ontiver-startup-expired", expire);
      window.clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    if (!pending) document.dispatchEvent(new Event("ontiver-startup-complete"));
  }, [pending]);

  useEffect(() => {
    if (!pending) return;
    startedAt.current = performance.now();
    // A failed route, font or image must never leave the page behind an overlay.
    const timeout = window.setTimeout(leave, 6000);
    return () => window.clearTimeout(timeout);
  }, [leave, pending]);

  useEffect(() => {
    if (!ready || phase !== "loading") return;
    let cancelled = false;
    let timer = 0;
    const images = Array.from(
      document.querySelectorAll<HTMLImageElement>('[data-page-shell] img[fetchpriority="high"]'),
    ).filter((image) => image.getBoundingClientRect().top < window.innerHeight);

    // Only await the first screen. Lazy media and video load independently.
    void Promise.all([
      document.fonts.ready.catch(() => undefined),
      ...images.map((image) => image.decode().catch(() => undefined)),
    ]).then(() => {
      if (cancelled) return;
      const minimum = prefersReducedMotion() ? 0 : 1600;
      timer = window.setTimeout(
        leave,
        Math.max(0, minimum - (performance.now() - startedAt.current)),
      );
    });
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [leave, phase, ready]);

  useEffect(() => {
    if (phase !== "leaving") return;
    const timeout = window.setTimeout(() => setPhase("complete"), prefersReducedMotion() ? 0 : 450);
    return () => window.clearTimeout(timeout);
  }, [phase]);

  return (
    <StartupContext.Provider value={{ pending, routeReady }}>
      <div
        className="initial-app"
        data-initial-loading={pending || undefined}
        inert={hydrated && pending ? true : undefined}
      >
        {children}
      </div>
      {pending && <InitialLoaderVisual leaving={phase === "leaving"} />}
    </StartupContext.Provider>
  );
};

// This commits only after the initial route's Suspense boundary resolves.
export const InitialRouteReady = () => {
  const { routeReady } = useContext(StartupContext);
  useEffect(routeReady, [routeReady]);
  return null;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useInitialLoading = () => useContext(StartupContext).pending;

export default InitialLoader;
