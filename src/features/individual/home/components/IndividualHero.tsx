import { ArrowUpRight, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import HeroActions from "../../../shared/home/components/HeroActions";
import IdentityRequestPreview from "./IdentityRequestPreview";

const IndividualHero = () => (
  <section className="page-intro home-hero bg-white">
    <div className="site-container grid items-center gap-8 lg:grid-cols-[1.15fr_.85fr] lg:gap-12">
      <div className="hero-enter min-w-0">
        <p className="eyebrow">Your identity. Your credentials. Your choice.</p>
        <h1 className="mt-5 text-hero font-medium">
          Verify once.
          <br />
          <span className="text-[#007d21]">Approve every share.</span>
        </h1>
        <p className="mt-6 max-w-[560px] text-subtitle text-[#526058]">
          Create one verified identity, then decide exactly what gets shared, with whom, and for how
          long — instead of uploading the same documents everywhere.
        </p>
        <div className="mt-7">
          <HeroActions audience="individual" />
        </div>
        <p className="mt-4 text-meta text-[#526058]">
          Join the waitlist for the planned identity wallet.
        </p>
        <Link to="/security" className="mt-7 inline-flex items-center gap-3 text-sm font-medium">
          <ShieldCheck size={21} className="shrink-0 text-[#007d21]" />
          You choose which claims to share.
          <ArrowUpRight size={16} className="shrink-0" />
        </Link>
      </div>
      <div className="hero-media-enter min-w-0">
        <IdentityRequestPreview />
      </div>
    </div>
  </section>
);

export default IndividualHero;
