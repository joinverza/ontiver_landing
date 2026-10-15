import { Play } from "lucide-react";
import { useVideoPlayback } from "../../hooks/useVideoPlayback";
import FilmControls from "./FilmControls";

type FilmSource = { src: string; type: string; media?: string };
type FilmPlayerProps = {
  sources: FilmSource[];
  poster: string;
  label: string;
  description?: string;
  captions?: string;
  width?: number;
  height?: number;
  className?: string;
};

const FilmPlayer = ({
  sources,
  poster,
  label,
  description,
  captions,
  width = 1920,
  height = 1080,
  className = "",
}: FilmPlayerProps) => {
  const playback = useVideoPlayback();
  const {
    videoRef,
    frameRef,
    playing,
    muted,
    buffering,
    setPlaying,
    setBuffering,
    togglePlay,
    syncCaptions,
  } = playback;
  return (
    <figure className={`hero-film ${className}`} aria-label={label}>
      <div ref={frameRef} className="hero-film__frame">
        <video
          ref={videoRef}
          className="hero-film__video"
          aria-label={label}
          poster={poster}
          width={width}
          height={height}
          muted={muted}
          loop
          playsInline
          preload="none"
          disablePictureInPicture
          onPlay={() => setPlaying(true)}
          onPause={() => {
            setPlaying(false);
            setBuffering(false);
          }}
          onWaiting={() => setBuffering(true)}
          onPlaying={() => setBuffering(false)}
          onCanPlay={() => setBuffering(false)}
          onLoadedMetadata={syncCaptions}
          onClick={togglePlay}
        >
          {sources.map((source) => (
            <source key={source.src} {...source} />
          ))}
          {captions ? (
            <track
              kind="captions"
              src={captions}
              srcLang="en"
              label="English"
              default
              onLoad={syncCaptions}
            />
          ) : null}
        </video>
        {!playing && !buffering ? (
          <button
            type="button"
            className="hero-film__play"
            onClick={togglePlay}
            aria-label="Play the film"
          >
            <Play size={26} aria-hidden="true" fill="currentColor" />
          </button>
        ) : null}
        {buffering && playing ? (
          <span className="hero-film__spinner" role="status" aria-label="Loading film" />
        ) : null}
        <FilmControls {...playback} />
      </div>
      {description ? <figcaption className="sr-only">{description}</figcaption> : null}
    </figure>
  );
};

export default FilmPlayer;
