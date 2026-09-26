import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { Pause, Play } from "lucide-react";

const MotionContext = createContext({ paused: false, reduced: false, toggle: () => {} });
const mediaQuery = "(prefers-reduced-motion: reduce)";
const subscribe = (callback: () => void) => {
  const query = window.matchMedia(mediaQuery);
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
};
const getReducedMotion = () => window.matchMedia(mediaQuery).matches;
const getServerReducedMotion = () => false;

export const MotionSettings = ({ children }: { children: ReactNode }) => {
  const reduced = useSyncExternalStore(subscribe, getReducedMotion, getServerReducedMotion);
  const [paused, setPaused] = useState(false);
  const toggle = useCallback(() => setPaused((value) => !value), []);
  const value = useMemo(() => ({ paused, reduced, toggle }), [paused, reduced, toggle]);
  useEffect(() => {
    document.documentElement.dataset.motion = paused || reduced ? "paused" : "playing";
    return () => {
      delete document.documentElement.dataset.motion;
    };
  }, [paused, reduced]);
  return <MotionContext.Provider value={value}>{children}</MotionContext.Provider>;
};

// The shared preference also keeps timed walkthroughs and the hero in sync.
// eslint-disable-next-line react-refresh/only-export-components
export const useMotionSettings = () => useContext(MotionContext);

export const MotionToggle = ({ className = "" }: { className?: string }) => {
  const { paused, reduced, toggle } = useMotionSettings();
  if (reduced) return null;
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={paused ? "Play animations" : "Pause animations"}
      aria-pressed={paused}
      className={`motion-toggle ${className}`}
    >
      {paused ? <Play size={16} aria-hidden="true" /> : <Pause size={16} aria-hidden="true" />}
      <span>{paused ? "Play" : "Pause"}</span>
    </button>
  );
};
