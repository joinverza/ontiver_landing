import { useCallback, useEffect, useRef, useState } from "react";
import { useMotionSettings } from "../components/motion/MotionSettings";

type FullscreenVideo = HTMLVideoElement & { webkitEnterFullscreen?: () => void };
const updateCaptions = (video: HTMLVideoElement | null, muted: boolean) => {
  const track = video?.textTracks[0];
  if (track) track.mode = muted ? "hidden" : "showing";
};
const savesData = () =>
  typeof navigator !== "undefined" &&
  Boolean((navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData);

/** Visible films play automatically; an explicit play remains available with motion disabled. */
export const useVideoPlayback = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const choice = useRef<"play" | "pause" | null>(null);
  const { paused, reduced } = useMotionSettings();
  const [inView, setInView] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [heardSound, setHeardSound] = useState(false);
  const [buffering, setBuffering] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const autoplayAllowed = !paused && !reduced && !savesData();

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold: 0.15,
    });
    observer.observe(frame);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const syncPlayback = () => {
      const video = videoRef.current;
      if (!video) return;
      const shouldPlay =
        !document.hidden &&
        inView &&
        (choice.current === "play" || (choice.current === null && autoplayAllowed));
      if (shouldPlay) video.play().catch(() => setPlaying(false));
      else video.pause();
    };
    syncPlayback();
    document.addEventListener("visibilitychange", syncPlayback);
    return () => document.removeEventListener("visibilitychange", syncPlayback);
  }, [inView, autoplayAllowed]);

  const togglePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    choice.current = video.paused ? "play" : "pause";
    if (video.paused) video.play().catch(() => setPlaying(false));
    else video.pause();
  }, []);

  const toggleSound = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    if (!heardSound) {
      video.currentTime = 0;
      setHeardSound(true);
    }
    video.muted = !video.muted;
    setMuted(video.muted);
    choice.current = "play";
    video.play().catch(() => setPlaying(false));
  }, [heardSound]);

  const enterFullscreen = useCallback(() => {
    const video = videoRef.current as FullscreenVideo | null;
    if (document.fullscreenElement) document.exitFullscreen().catch(() => undefined);
    else if (frameRef.current?.requestFullscreen)
      frameRef.current.requestFullscreen().catch(() => undefined);
    else video?.webkitEnterFullscreen?.();
  }, []);

  useEffect(() => {
    const syncFullscreen = () => setFullscreen(document.fullscreenElement === frameRef.current);
    document.addEventListener("fullscreenchange", syncFullscreen);
    return () => document.removeEventListener("fullscreenchange", syncFullscreen);
  }, []);

  const syncCaptions = useCallback(() => {
    updateCaptions(videoRef.current, muted);
  }, [muted]);
  useEffect(() => {
    syncCaptions();
  }, [syncCaptions]);

  return {
    videoRef,
    frameRef,
    playing,
    muted,
    heardSound,
    buffering,
    fullscreen,
    setPlaying,
    setBuffering,
    togglePlay,
    toggleSound,
    enterFullscreen,
    syncCaptions,
  };
};
