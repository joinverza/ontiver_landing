import EnterpriseHero from "../components/EnterpriseHero";
import Solution from "../../../shared/home/components/Solution";
import Modules from "../../../shared/home/components/Modules";
import UseCase from "../../../shared/home/components/UseCase";
import PricingFAQ from "../../../../shared/components/FAQ";
import PageFooter from "../../../../shared/components/layout/PageFooter";
import TrustSection from "../../../shared/home/components/TrustSection";
import {
  CertificationStrip,
  RegulatoryCredentials,
  EvidenceCards,
  PilotResults,
} from "../../../shared/home/components/Proof";

const EnterpriseHomePage = () => (
  <main id="main-content" tabIndex={-1}>
    <EnterpriseHero />
    <Modules audience="enterprise" />
    <Solution audience="enterprise" />
    <UseCase audience="enterprise" />
    <TrustSection audience="enterprise" />
    <CertificationStrip />
    <RegulatoryCredentials />
    <PilotResults />
    <EvidenceCards audience="enterprise" />
    <PricingFAQ variant="enterprise" />
    <PageFooter audience="enterprise" />
  </main>
);

export default EnterpriseHomePage;
