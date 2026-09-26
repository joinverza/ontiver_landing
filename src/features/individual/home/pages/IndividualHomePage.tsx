import IndividualHero from "../components/IndividualHero";
import EarlyAccess from "../components/EarlyAccess";
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

const IndividualHomePage = () => (
  <main id="main-content" tabIndex={-1}>
    <IndividualHero />
    <IdentityMarquee audience="individual" />
    <PartnerStrip audience="individual" />
    <Modules audience="individual" />
    <Solution audience="individual" />
    <UseCase audience="individual" />
    <TrustSection audience="individual" />
    <CertificationStrip />
    <PilotResults />
    <EvidenceCards audience="individual" />
    <PricingFAQ variant="individual" />
    <EarlyAccess />
    <PageFooter audience="individual" />
  </main>
);

export default IndividualHomePage;
