import IndividualHeroCopy from "./IndividualHeroCopy";
import IndividualHeroShowcase from "./IndividualHeroShowcase";
import "./individual-hero.css";

const IndividualHero = () => (
  <section
    className="page-intro home-hero individual-hero bg-surface"
    aria-labelledby="individual-hero-title"
  >
    <div className="site-container">
      <IndividualHeroCopy />
      <IndividualHeroShowcase />
    </div>
  </section>
);

export default IndividualHero;
