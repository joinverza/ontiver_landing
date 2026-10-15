import HeroActions from "../../../shared/home/components/HeroActions";
import EnterpriseFilm from "./EnterpriseFilm";
import WordReveal from "../../../../shared/components/ui/WordReveal";
import IdentityMarquee from "../../../shared/home/components/IdentityMarquee";
import { PartnerStrip } from "../../../shared/home/components/Proof";
import "./enterprise-hero.css";

const EnterpriseHero = () => (
  <section className="page-intro home-hero enterprise-hero" aria-labelledby="enterprise-hero-title">
    <div className="site-container">
      <div className="page-hero-content hero-enter">
        <p className="eyebrow">Identity verification & workflow infrastructure</p>
        <h1 id="enterprise-hero-title" className="page-hero-heading text-hero font-medium">
          Verify people.
          <br />
          <span className="enterprise-hero-accent">Connect every step.</span>
        </h1>
        <div className="page-hero-actions">
          <HeroActions audience="enterprise" />
        </div>
      </div>
      <div className="enterprise-hero-story">
        <div className="enterprise-hero-media">
          <EnterpriseFilm />
        </div>
        <div className="enterprise-hero-story-content">
          <p className="enterprise-hero-introduction">
            Ontiver helps you verify users and businesses, manage consent, and confirm reusable
            identity proof through a secure dashboard and API — without repeatedly collecting raw
            identity documents.
          </p>
          <p className="mt-6 text-meta text-[#526058]">
            Preparing for focused pilots. Checks and integrations are agreed for each workflow.
          </p>
          <div className="enterprise-hero-journey">
            <IdentityMarquee audience="enterprise" />
            <PartnerStrip audience="enterprise" />
            <div className="enterprise-hero-statement">
              <WordReveal>Verify the people and partners your operation depends on.</WordReveal>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default EnterpriseHero;
