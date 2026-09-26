import type { Audience } from "../../lib/audience";
import { imagery } from "../../data/imagery";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

const Join = ({ audience }: { audience: Audience }) => {
  const enterprise = audience === "enterprise";
  const photo = enterprise ? imagery.candidateReview : imagery.mobileApplication;
  return (
    <section id="join" className="bg-white py-10 sm:py-14">
      <div className="site-container">
        <div className="relative overflow-hidden rounded-[24px] bg-[#002d0e]">
          {photo && (
            <img
              src={photo.src}
              alt={photo.alt}
              width={photo.width}
              height={photo.height}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover"
              style={{ objectPosition: photo.objectPosition }}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-[#002d0e]/95 via-[#002d0e]/85 to-[#002d0e]/20" />
          <div className="relative max-w-[760px] p-6 text-white sm:p-10">
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
        </div>
      </div>
    </section>
  );
};

export default Join;
