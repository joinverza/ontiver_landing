import FilmPlayer from "../../../../shared/components/media/FilmPlayer";

const FILM = "/assets/film/verify-once";
const sources = [
  {
    src: `${FILM}-720.mp4`,
    type: 'video/mp4; codecs="avc1.640028, mp4a.40.2"',
    media: "(max-width: 767px)",
  },
  { src: `${FILM}-1080-av1.mp4`, type: 'video/mp4; codecs="av01.0.08M.08, mp4a.40.2"' },
  { src: `${FILM}-1080.mp4`, type: 'video/mp4; codecs="avc1.640029, mp4a.40.2"' },
];

const HeroFilm = () => (
  <FilmPlayer
    sources={sources}
    poster={`${FILM}-poster.webp`}
    captions={`${FILM}.en.vtt`}
    label="Ontiver film: Verify once, approve every share"
    description="A 46-second film showing how Ontiver lets you verify your identity once and approve exactly what you share."
  />
);

export default HeroFilm;
