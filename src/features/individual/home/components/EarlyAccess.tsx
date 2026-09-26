import { ArrowUpRight } from "lucide-react";

const EarlyAccess = () => (
  <section
    className="section-space section-compact border-t border-[#002d0e]/10"
    aria-labelledby="early-access-heading"
  >
    <div className="site-container flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
      <div className="max-w-[780px]">
        <h2 id="early-access-heading" className="section-heading">
          Be first to hold a reusable identity proof.
        </h2>
        <p className="mt-4 text-body text-[#526058]">
          We're onboarding early users as partner workflows go live.
        </p>
      </div>
      <a href="#join" className="button-primary shrink-0">
        Join the Waitlist
        <ArrowUpRight size={17} aria-hidden="true" />
      </a>
    </div>
  </section>
);

export default EarlyAccess;
