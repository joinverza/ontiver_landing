import IndividualHero from "../components/IndividualHero";
import AboutTheApp from "../components/AboutTheApp";
import { HowItWorks, InYourControl } from "../components/HowItWorks";
import PricingFAQ from "../../../../shared/components/FAQ";
import PageFooter from "../../../../shared/components/layout/PageFooter";

// The home page explains one idea: verify once, then approve each share. Deeper detail (use cases,
// certifications, the pilot) lives on its own pages so the first visit stays easy to follow.
const IndividualHomePage = () => (
  <main id="main-content" tabIndex={-1}>
    <IndividualHero />
    <HowItWorks />
    <InYourControl />
    <AboutTheApp />
    <PricingFAQ variant="individual" />
    <PageFooter audience="individual" />
  </main>
);

export default IndividualHomePage;
