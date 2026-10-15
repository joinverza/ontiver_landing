import { Maximize2, Minimize2, Pause, Play, Volume2, VolumeX } from "lucide-react";

type FilmControlsProps = {
  playing: boolean;
  muted: boolean;
  heardSound: boolean;
  fullscreen: boolean;
  togglePlay: () => void;
  toggleSound: () => void;
  enterFullscreen: () => void;
};

const FilmControls = ({
  playing,
  muted,
  heardSound,
  fullscreen,
  togglePlay,
  toggleSound,
  enterFullscreen,
}: FilmControlsProps) => {
  const soundLabel = muted ? (heardSound ? "Sound off" : "Watch with sound") : "Sound on";
  return (
    <div className="hero-film__controls">
      <button
        type="button"
        onClick={togglePlay}
        aria-label={playing ? "Pause film" : "Play film"}
        className="hero-film__control"
      >
        {playing ? (
          <Pause size={16} aria-hidden="true" fill="currentColor" />
        ) : (
          <Play size={16} aria-hidden="true" fill="currentColor" />
        )}
      </button>
      <button
        type="button"
        onClick={toggleSound}
        aria-label={soundLabel}
        aria-pressed={!muted}
        className="hero-film__control hero-film__control--label"
      >
        {muted ? (
          <VolumeX size={16} aria-hidden="true" />
        ) : (
          <Volume2 size={16} aria-hidden="true" />
        )}
        <span>{soundLabel}</span>
      </button>
      <button
        type="button"
        onClick={enterFullscreen}
        aria-label={fullscreen ? "Exit full screen" : "Watch full screen"}
        className="hero-film__control hero-film__control--end"
      >
        {fullscreen ? (
          <Minimize2 size={16} aria-hidden="true" />
        ) : (
          <Maximize2 size={16} aria-hidden="true" />
        )}
      </button>
    </div>
  );
};

export default FilmControls;
