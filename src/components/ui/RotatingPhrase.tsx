import { useEffect, useState } from "react";
import { useMotionSettings } from "../MotionSettings";

export default function RotatingPhrase({ phrases }: { phrases: string[] }) {
  const { paused, reduced } = useMotionSettings();
  const [index, setIndex] = useState(0);
  useEffect(() => {
    if (paused || reduced) return;
    const timer = window.setInterval(() => {
      if (!document.hidden) setIndex(value => (value + 1) % phrases.length);
    }, 4200);
    return () => window.clearInterval(timer);
  }, [paused, reduced, phrases.length]);
  return <span className="rotating-phrase"><span className="sr-only">{phrases[0]}</span><span aria-hidden="true" key={reduced ? 0 : index} className="phrase-enter">{phrases[reduced ? 0 : index]}</span></span>;
}
