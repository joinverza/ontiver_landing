import { useEffect, useRef, type RefObject } from "react";

/** Update the native progress element without rerendering the film on every time update. */
const FilmProgress = ({ videoRef }: { videoRef: RefObject<HTMLVideoElement | null> }) => {
  const progressRef = useRef<HTMLProgressElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    const progress = progressRef.current;
    if (!video || !progress) return;
    const update = () => {
      progress.value =
        Number.isFinite(video.duration) && video.duration > 0
          ? Math.max(0, Math.min(1, video.currentTime / video.duration))
          : 0;
    };
    const events = ["timeupdate", "loadedmetadata", "durationchange", "seeked", "emptied"];
    events.forEach((event) => video.addEventListener(event, update));
    update();
    return () => events.forEach((event) => video.removeEventListener(event, update));
  }, [videoRef]);

  return (
    <progress
      ref={progressRef}
      className="hero-film__progress"
      max={1}
      value={0}
      aria-label="Video playback progress"
    />
  );
};

export default FilmProgress;
