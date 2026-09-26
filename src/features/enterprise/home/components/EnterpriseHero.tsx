import HeroActions from "../../../shared/home/components/HeroActions";
import ContextPhoto from "../../../../shared/components/ui/ContextPhoto";
import { imagery } from "../../../../shared/data/imagery";

const EnterpriseHero = () => (
  <section className="page-intro home-hero bg-white">
    <div className="site-container grid items-center gap-8 lg:grid-cols-[1.2fr_.8fr] lg:gap-12">
      <div className="hero-enter min-w-0">
        <p className="eyebrow">Identity verification & workflow infrastructure</p>
        <h1 className="mt-5 text-hero font-medium">
          Verify people.
          <br />
          <span className="text-[#007d21]">Connect every step.</span>
        </h1>
        <p className="mt-6 max-w-[790px] text-subtitle text-[#526058]">
          Ontiver helps you verify users and businesses, manage consent, and confirm reusable
          identity proof through a secure dashboard and API — without repeatedly collecting raw
          identity documents.
        </p>
        <div className="mt-7">
          <HeroActions audience="enterprise" />
        </div>
        <p className="mt-4 text-meta text-[#526058]">
          Preparing for focused pilots. Checks and integrations are agreed for each workflow.
        </p>
      </div>
      <div className="hero-media-enter min-w-0">
        <ContextPhoto image={imagery.candidateReview} priority />
      </div>
    </div>
  </section>
);

export default EnterpriseHero;
