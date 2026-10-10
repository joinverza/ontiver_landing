import { ArrowUpRight, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import HeroActions from "../../../shared/home/components/HeroActions";
import HeroFilm from "./HeroFilm";

const IndividualHero = () => (
  <section className="page-intro home-hero home-hero--film bg-white">
    <div className="site-container">
      <div className="grid items-end gap-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-14">
        <div className="hero-enter min-w-0">
          <p className="eyebrow">Your identity. Your credentials. Your choice.</p>
          <h1 className="mt-5 text-hero font-medium">
            Verify once.
            <br />
            <span className="text-[#007d21]">Approve every share.</span>
          </h1>
        </div>
        <div className="hero-enter min-w-0 lg:pb-2">
          <p className="max-w-[560px] text-subtitle text-[#526058]">
            Create one verified identity, then decide exactly what gets shared, with whom, and for how
            long — instead of uploading the same documents everywhere.
          </p>
          <div className="mt-6">
            <HeroActions audience="individual" />
          </div>
          <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2">
            <p className="text-meta text-[#526058]">Join the waitlist for the planned identity wallet.</p>
            <Link to="/security" className="inline-flex items-center gap-2 text-sm font-medium">
              <ShieldCheck size={18} className="shrink-0 text-[#007d21]" />
              You choose which claims to share.
              <ArrowUpRight size={15} className="shrink-0" />
            </Link>
          </div>
        </div>
      </div>
      <div className="hero-media-enter mt-10 lg:mt-14">
        <HeroFilm />
      </div>
    </div>
  </section>
);

export default IndividualHero;
