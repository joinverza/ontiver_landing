import ActionIcon from "../../../../shared/components/ui/ActionIcon";
import { ShieldCheck } from "../../../../shared/components/ui/icons";
import { Link } from "react-router-dom";
import HeroActions from "../../../shared/home/components/HeroActions";

const IndividualHeroCopy = () => (
  <div className="individual-hero-copy">
    <div className="individual-hero-heading hero-enter">
      <p className="eyebrow">Your identity. Your credentials. Your choice.</p>
      <h1 id="individual-hero-title" className="text-hero font-medium">
        <span className="individual-hero-line">Verify once.</span>
        <span className="individual-hero-line text-accent">Approve every share.</span>
      </h1>
      <HeroActions audience="individual" />
    </div>
    <div className="individual-hero-introduction hero-enter">
      <p className="text-subtitle text-[#526058]">
        Create one verified identity, then decide exactly what gets shared, with whom, and for how
        long — instead of uploading the same documents everywhere.
      </p>
      <div className="individual-hero-assurance">
        <p className="text-meta text-[#526058]">
          Join the waitlist for the planned identity wallet.
        </p>
        <Link to="/security" className="individual-hero-security">
          <ShieldCheck size={20} aria-hidden="true" />
          <span>You choose which claims to share.</span>
          <ActionIcon size={17} aria-hidden="true" />
        </Link>
      </div>
    </div>
  </div>
);

export default IndividualHeroCopy;
