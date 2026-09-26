import EnterpriseHero from "../components/EnterpriseHero";
import Solution from "../../../shared/home/components/Solution";
import Modules from "../../../shared/home/components/Modules";
import UseCase from "../../../shared/home/components/UseCase";
import PricingFAQ from "../../../../shared/components/FAQ";
import PageFooter from "../../../../shared/components/layout/PageFooter";
import TrustSection from "../../../shared/home/components/TrustSection";
import {
  CertificationStrip,
  EvidenceCards,
  PartnerStrip,
  PilotResults,
} from "../../../shared/home/components/Proof";
import IdentityMarquee from "../../../shared/home/components/IdentityMarquee";
import WordReveal from "../../../../shared/components/ui/WordReveal";

const EnterpriseHomePage = () => (
  <main id="main-content" tabIndex={-1}>
    <EnterpriseHero />
    <IdentityMarquee audience="enterprise" />
    <PartnerStrip audience="enterprise" />
    <section className="section-space section-compact">
      <div className="site-container">
        <WordReveal className="max-w-[1080px]">
          Verify the people and partners your operation depends on.
        </WordReveal>
      </div>
    </section>
    <Modules audience="enterprise" />
    <Solution audience="enterprise" />
    <UseCase audience="enterprise" />
    <TrustSection audience="enterprise" />
    <CertificationStrip />
    <PilotResults />
    <EvidenceCards audience="enterprise" />
    <PricingFAQ variant="enterprise" />
    <PageFooter audience="enterprise" />
  </main>
);

export default EnterpriseHomePage;
