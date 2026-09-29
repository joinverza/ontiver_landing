import type { Audience } from "../../lib/audience";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

const Join = ({ audience }: { audience: Audience }) => {
  const enterprise = audience === "enterprise";
  return (
    <section id="join" className="section-space bg-white">
      <div className="site-container">
        <div className="grid items-center gap-8 rounded-[24px] bg-[#002d0e] p-6 text-white sm:p-10 lg:grid-cols-[1.4fr_.6fr] lg:gap-12">
          <div className="min-w-0">
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
                <Link
                  to="/enterprise/contact"
                  className="button-primary bg-white text-[#002d0e] hover:bg-[#d8edcf]"
                >
                  Request Enterprise Demo
                  <ArrowUpRight size={17} aria-hidden="true" />
                </Link>
                <Link
                  to="/enterprise/contact?request=sandbox"
                  className="button-secondary border-white/30 text-white hover:bg-white/10 hover:text-white"
                >
                  Start Sandbox
                </Link>
              </div>
            ) : (
              <Link
                to="/waitlist"
                className="button-primary mt-8 !bg-white !text-[#002d0e] hover:!bg-[#d8edcf]"
              >
                Join the User Waitlist
                <ArrowUpRight size={17} aria-hidden="true" />
              </Link>
            )}
          </div>
          <ol className="border-t border-white/20 pt-2 lg:border-t-0 lg:border-l lg:pl-8">
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
      </div>
    </section>
  );
};

export default Join;
