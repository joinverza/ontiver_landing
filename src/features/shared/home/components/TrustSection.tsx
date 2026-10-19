import ActionIcon from "../../../../shared/components/ui/ActionIcon";
import { ShieldCheck } from "../../../../shared/components/ui/icons";
import { Link } from "react-router-dom";
import type { Audience } from "../../../../shared/lib/audience";
import WordReveal from "../../../../shared/components/ui/WordReveal";
import ContextPhoto from "../../../../shared/components/ui/ContextPhoto";
import { imagery } from "../../../../shared/data/imagery";

const TrustSection = ({ audience }: { audience: Audience }) => {
  const enterprise = audience === "enterprise";
  return (
    <section id="security" className="section-space bg-surface">
      <div className="site-container story-split">
        <div className="story-split-media">
          <div data-media-reveal>
            <ContextPhoto image={enterprise ? imagery.developer : imagery.mobileDetail} />
          </div>
        </div>
        <div data-scroll-reveal className="story-split-content">
          <ShieldCheck size={40} strokeWidth={1.3} className="text-accent" aria-hidden="true" />
          <div className="mt-5">
            <WordReveal>
              {enterprise
                ? "Built for sensitive identity workflows."
                : "You decide what leaves your hands."}
            </WordReveal>
            <p className="mt-6 border-t border-[#002d0e]/15 pt-6 text-body text-[#526058]">
              {enterprise
                ? "Ontiver is designed around data minimization, consent-based sharing, auditability, and controlled business access — not raw document collection."
                : "Every request tells you who's asking, what they want, and why. Nothing is shared without your approval, and you can review or revoke access at any time."}
            </p>
            <Link
              to={enterprise ? "/enterprise/security" : "/security"}
              className="button-primary mt-8"
            >
              Explore consent & privacy
              <ActionIcon size={17} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
