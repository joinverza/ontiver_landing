import { ArrowUpRight, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import type { Audience } from "../../../../shared/lib/audience";
import WordReveal from "../../../../shared/components/ui/WordReveal";
import ContextPhoto from "../../../../shared/components/ui/ContextPhoto";
import { imagery } from "../../../../shared/data/imagery";

const TrustSection = ({ audience }: { audience: Audience }) => {
  const enterprise = audience === "enterprise";
  return (
    <section id="security" className="section-space bg-white">
      <div className="site-container">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div data-scroll-reveal className="flex flex-col items-start justify-between">
            <ShieldCheck
              size={50}
              strokeWidth={1.3}
              className="self-end text-[#007d21]"
              aria-hidden="true"
            />
            <div className="mt-10">
              <WordReveal>
                {enterprise
                  ? "Built for sensitive identity workflows."
                  : "You decide what leaves your hands."}
              </WordReveal>
              <p className="mt-6 text-body text-[#526058]">
                {enterprise
                  ? "Ontiver is designed around data minimization, consent-based sharing, auditability, and controlled business access — not raw document collection."
                  : "Every request tells you who's asking, what they want, and why. Nothing is shared without your approval, and you can review or revoke access at any time."}
              </p>
              <Link
                to={enterprise ? "/enterprise/security" : "/security"}
                className="button-primary mt-8"
              >
                Explore consent & privacy
                <ArrowUpRight size={17} />
              </Link>
            </div>
          </div>
          <div data-media-reveal>
            <ContextPhoto image={imagery.mobileApplication} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
