import { createContext, useContext, useEffect, useState, useSyncExternalStore, type ReactNode } from "react";
import { Pause, Play } from "lucide-react";

const MotionContext = createContext({ paused: false, reduced: false, toggle: () => {} });
const mediaQuery = "(prefers-reduced-motion: reduce)";
function subscribe(callback: () => void) {
  const query = window.matchMedia(mediaQuery);
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
}

export function MotionSettings({ children }: { children: ReactNode }) {
  const reduced = useSyncExternalStore(subscribe, () => window.matchMedia(mediaQuery).matches, () => false);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    document.documentElement.dataset.motion = paused || reduced ? "paused" : "playing";
    return () => { delete document.documentElement.dataset.motion; };
  }, [paused, reduced]);
  return <MotionContext.Provider value={{ paused, reduced, toggle: () => setPaused(value => !value) }}>{children}</MotionContext.Provider>;
}

// The shared preference also keeps timed walkthroughs and the hero in sync.
// eslint-disable-next-line react-refresh/only-export-components
export function useMotionSettings() { return useContext(MotionContext); }

export function MotionToggle({ className = "" }: { className?: string }) {
  const { paused, reduced, toggle } = useMotionSettings();
  if (reduced) return null;
  return <button type="button" onClick={toggle} aria-label={paused ? "Play animations" : "Pause animations"} aria-pressed={paused} className={`motion-toggle ${className}`}>{paused ? <Play size={16} aria-hidden="true" /> : <Pause size={16} aria-hidden="true" />}<span>{paused ? "Play" : "Pause"}</span></button>;
}
