import FilmPlayer from "../../../../shared/components/media/FilmPlayer";

const sources = [{ src: "/assets/film/enterprise-hero.mp4", type: "video/mp4" }];

const EnterpriseFilm = () => (
  <FilmPlayer
    sources={sources}
    poster="/assets/film/enterprise-hero-poster.webp"
    label="Ontiver enterprise film"
    width={1280}
    height={720}
    className="enterprise-hero-film"
  />
);

export default EnterpriseFilm;
