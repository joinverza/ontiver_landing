import ActionIcon from "../ui/ActionIcon";
import type { Audience } from "../../lib/audience";
import { Link } from "react-router-dom";
import "../ui/cta-band.css";
import { PORTAL_SIGNUP_URL } from "../../../features/enterprise/pricing/data/pricing";

const Join = ({ audience }: { audience: Audience }) => {
  const enterprise = audience === "enterprise";
  return (
    <section id="join" className="section-space section-compact cta-band py-24!">
      <div className="site-container cta-band-layout" data-scroll-reveal>
        <div className="cta-band-primary">
          <h2 className="section-heading">
            {enterprise
              ? "Build reusable trust with Ontiver."
              : "Ready to verify once and stay in control?"}
          </h2>
          <p className="mt-5 max-w-[540px] text-body text-white/85">
            {enterprise
              ? "Scope the people, checks, reviewers and success measures for a focused pilot."
              : "We're onboarding early users as partner workflows go live."}
          </p>
          {enterprise ? (
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/enterprise/contact" className="button-primary button-on-dark">
                Request Enterprise Demo
                <ActionIcon size={17} aria-hidden="true" />
              </Link>
              <a
                href={PORTAL_SIGNUP_URL}
                rel="noopener"
                className="button-secondary button-quiet-on-dark"
              >
                Start Sandbox
              </a>
            </div>
          ) : (
            <Link to="/waitlist" className="button-primary button-on-dark mt-8">
              Join the User Waitlist
              <ActionIcon size={17} aria-hidden="true" />
            </Link>
          )}
        </div>
        <ol className="cta-band-details">
          {(enterprise
            ? ["Choose one workflow", "Agree consent and checks", "Review the evidence together"]
            : ["Understand the request", "Choose what to share", "Approve each new use"]
          ).map((step, index) => (
            <li
              key={step}
              className="flex items-baseline gap-4 border-b border-white/20 py-4 last:border-0"
            >
              <span className="text-meta text-[#c7e6b5]">0{index + 1}</span>
              <span className="text-body">{step}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default Join;
