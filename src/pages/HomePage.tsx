import Hero from "../components/sections/Hero/Hero";
import Solution from "../components/sections/Solution/Solution";
import Modules from "../components/sections/Modules/Modules";
import UseCase from "../components/sections/UseCase/UseCase";
import PricingFAQ from "../components/faq";
import CurtainFooter from "../components/sections/CurtainFooter/CurtainFooter";
import TrustHorizontalTransition from "../components/sections/TrustHorizontalTransition/TrustHorizontalTransition";
import { CertificationStrip, EvidenceCards, PartnerStrip, PilotResults } from "../components/sections/Proof/Proof";
import type { Audience } from "../lib/audience";
import IdentityMarquee from "../components/sections/Proof/IdentityMarquee";
import WordReveal from "../components/ui/WordReveal";
import { ArrowUpRight } from "lucide-react";

export default function HomePage({ audience }: { audience: Audience }) {
  return (
    <main>
      <Hero audience={audience} />
      <PartnerStrip audience={audience} />
      <IdentityMarquee audience={audience} />
      {audience === "enterprise" && <section className="section-space !pt-6"><div className="site-container"><WordReveal className="max-w-[1080px]">Verify the people and partners your operation depends on.</WordReveal></div></section>}
      <Modules audience={audience} />
      <Solution audience={audience} />
      <UseCase audience={audience} />
      <TrustHorizontalTransition audience={audience} />
      <CertificationStrip />
      <PilotResults />
      <EvidenceCards audience={audience} />
      <PricingFAQ variant={audience === "enterprise" ? "enterprise" : "individual"} />
      {audience === "individual" && <section className="section-space border-t border-[#002d0e]/10" aria-labelledby="early-access-heading"><div className="site-container flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center"><div className="max-w-[780px]"><h2 id="early-access-heading" className="section-heading">Be first to hold a reusable identity proof.</h2><p className="mt-4 text-body text-[#526058]">We're onboarding early users as partner workflows go live.</p></div><a href="#join" className="button-primary shrink-0">Join the Waitlist<ArrowUpRight size={17} aria-hidden="true" /></a></div></section>}
      <CurtainFooter audience={audience} />
    </main>
  );
}
