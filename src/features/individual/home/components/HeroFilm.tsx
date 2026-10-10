import { useCallback, useEffect, useRef, useState } from "react";
import { Maximize2, Pause, Play, Volume2, VolumeX } from "lucide-react";
import { useMotionSettings } from "../../../../shared/components/motion/MotionSettings";

const FILM = "/assets/film/verify-once";

type FullscreenVideo = HTMLVideoElement & { webkitEnterFullscreen?: () => void };

const prefersSavingData = () =>
  typeof navigator !== "undefined" &&
  Boolean((navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData);

/**
 * The "Verify once" film. It plays muted and looped while it is on screen, and
 * pauses when scrolled away or when the tab is hidden, so it never competes for
 * CPU or bandwidth. Reduced-motion, the site's motion toggle and Save-Data all
 * leave it on its poster until the visitor presses play. "Watch with sound"
 * restarts it from the beginning with audio and captions.
 */
const HeroFilm = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const { paused: motionPaused, reduced } = useMotionSettings();
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [heardSound, setHeardSound] = useState(false);
  const [buffering, setBuffering] = useState(false);
  const [inView, setInView] = useState(false);
  // An explicit play or pause from the visitor overrides automatic behaviour.
  const userChoice = useRef<"play" | "pause" | null>(null);

  const autoplayAllowed = !motionPaused && !reduced && !prefersSavingData();

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.35 });
    observer.observe(frame);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const shouldPlay =
      inView && (userChoice.current === "play" || (userChoice.current === null && autoplayAllowed));
    if (shouldPlay && video.paused) {
      video.play().catch(() => setPlaying(false));
    } else if (!shouldPlay && !video.paused) {
      video.pause();
    }
  }, [inView, autoplayAllowed]);

  useEffect(() => {
    const onVisibility = () => {
      const video = videoRef.current;
      if (!video) return;
      if (document.hidden) video.pause();
      else if (inView && (userChoice.current === "play" || (userChoice.current === null && autoplayAllowed))) {
        video.play().catch(() => undefined);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, [inView, autoplayAllowed]);

  const togglePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      userChoice.current = "play";
      video.play().catch(() => undefined);
    } else {
      userChoice.current = "pause";
      video.pause();
    }
  }, []);

  const toggleSound = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    if (!heardSound) {
      // First time with sound: start the story from the beginning.
      video.currentTime = 0;
      setHeardSound(true);
    }
    video.muted = !video.muted;
    setMuted(video.muted);
    userChoice.current = "play";
    video.play().catch(() => undefined);
  }, [heardSound]);

  const enterFullscreen = useCallback(() => {
    const video = videoRef.current as FullscreenVideo | null;
    if (!video) return;
    if (video.requestFullscreen) video.requestFullscreen().catch(() => undefined);
    else video.webkitEnterFullscreen?.();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    // Captions stay on while the film has sound; muted playback relies on the on-screen type.
    const track = video.textTracks[0];
    if (track) track.mode = muted ? "hidden" : "showing";
  }, [muted]);

  return (
    <figure className="hero-film" aria-label="Ontiver film: Verify once, approve every share">
      <div ref={frameRef} className="hero-film__frame">
        <video
          ref={videoRef}
          className="hero-film__video"
          poster={`${FILM}-poster.webp`}
          width={1920}
          height={1080}
          muted={muted}
          loop
          playsInline
          preload="none"
          disablePictureInPicture
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onWaiting={() => setBuffering(true)}
          onPlaying={() => setBuffering(false)}
          onCanPlay={() => setBuffering(false)}
          onClick={togglePlay}
        >
          <source src={`${FILM}-720.mp4`} type='video/mp4; codecs="avc1.640028, mp4a.40.2"' media="(max-width: 767px)" />
          <source src={`${FILM}-1080-av1.mp4`} type='video/mp4; codecs="av01.0.08M.08, mp4a.40.2"' />
          <source src={`${FILM}-1080.mp4`} type='video/mp4; codecs="avc1.640029, mp4a.40.2"' />
          <track kind="captions" src={`${FILM}.en.vtt`} srcLang="en" label="English" default />
        </video>

        {!playing && !buffering ? (
          <button type="button" className="hero-film__play" onClick={togglePlay} aria-label="Play the film">
            <Play size={26} aria-hidden="true" fill="currentColor" />
          </button>
        ) : null}

        {buffering && playing ? <span className="hero-film__spinner" role="status" aria-label="Loading film" /> : null}

        <div className="hero-film__controls">
          <button type="button" onClick={togglePlay} aria-label={playing ? "Pause film" : "Play film"} className="hero-film__control">
            {playing ? <Pause size={16} aria-hidden="true" fill="currentColor" /> : <Play size={16} aria-hidden="true" fill="currentColor" />}
          </button>
          <button
            type="button"
            onClick={toggleSound}
            aria-pressed={!muted}
            className="hero-film__control hero-film__control--label"
          >
            {muted ? <VolumeX size={16} aria-hidden="true" /> : <Volume2 size={16} aria-hidden="true" />}
            <span>{muted ? (heardSound ? "Sound off" : "Watch with sound") : "Sound on"}</span>
          </button>
          <button type="button" onClick={enterFullscreen} aria-label="Watch full screen" className="hero-film__control hero-film__control--end">
            <Maximize2 size={16} aria-hidden="true" />
          </button>
        </div>
      </div>
      <figcaption className="sr-only">
        A 46-second film showing how Ontiver lets you verify your identity once and approve exactly what you share.
      </figcaption>
    </figure>
  );
};

export default HeroFilm;
