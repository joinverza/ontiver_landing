import Hero from "../components/sections/Hero/Hero";
import Solution from "../components/sections/Solution/Solution";
import Modules from "../components/sections/Modules/Modules";
import UseCase from "../components/sections/UseCase/UseCase";
import PricingFAQ from "../components/faq";
import CurtainFooter from "../components/sections/CurtainFooter/CurtainFooter";
import TrustHorizontalTransition from "../components/sections/TrustHorizontalTransition/TrustHorizontalTransition";
import { CertificationStrip, EvidenceCards, PartnerStrip, PilotResults } from "../components/sections/Proof/Proof";
import type { Audience } from "../lib/audience";

export default function HomePage({ audience }: { audience: Audience }) {
  return (
    <main>
      <Hero audience={audience} />
      <PartnerStrip />
      <Modules audience={audience} />
      <Solution audience={audience} />
      <UseCase audience={audience} />
      <TrustHorizontalTransition audience={audience} />
      <CertificationStrip />
      <PilotResults />
      <EvidenceCards audience={audience} />
      <PricingFAQ variant={audience === "enterprise" ? "enterprise" : "individual"} />
      <CurtainFooter audience={audience} />
    </main>
  );
}
