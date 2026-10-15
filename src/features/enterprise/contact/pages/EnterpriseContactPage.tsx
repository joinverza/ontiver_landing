import PageFooter from "../../../../shared/components/layout/PageFooter";
import { EnterpriseContactSidebar } from "../components/EnterpriseContactSidebar";
import { EnterpriseInquiryForm } from "../components/EnterpriseInquiryForm";
import ContextPhoto from "../../../../shared/components/ui/ContextPhoto";
import { editorialPhotos } from "../../../../shared/data/editorialPhotos";

const EnterpriseContactPage = () => {
  return (
    <main id="main-content" tabIndex={-1} className="bg-surface text-[#002d0e]">
      <section className="page-intro">
        <div className="site-container split-hero-grid split-hero-grid--image-left">
          <div className="page-hero-content">
            <p className="eyebrow">Enterprise access</p>
            <h1 className="mt-5 text-page-hero font-medium">Talk to the Ontiver team.</h1>
            <p className="page-hero-description mt-7 text-subtitle text-[#526058]">
              Tell us who you need to verify, which checks matter, and who reviews the results. We
              will scope a pilot around consent, evidence, your dashboard or API integration, and
              measurable outcomes.
            </p>
            <div className="page-hero-actions">
              <a href="#enterprise-inquiry" className="button-primary">
                Plan your pilot
              </a>
            </div>
          </div>
          <div data-scroll-reveal className="page-hero-media">
            <ContextPhoto
              priority
              sizes="(min-width: 2400px) 1150px, (min-width: 1024px) 47vw, 100vw"
              image={editorialPhotos.enterpriseContact}
              size="wide"
              caption="One workflow. The right evidence. Clear responsibilities for your team."
            />
          </div>
        </div>
      </section>
      <section id="enterprise-inquiry" className="section-space scroll-mt-28">
        <div className="site-container">
          <div className="equal-columns grid gap-6 lg:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)] lg:gap-8">
            <EnterpriseContactSidebar />

            <EnterpriseInquiryForm />
          </div>
        </div>
      </section>
      <PageFooter audience="enterprise" />
    </main>
  );
};

export default EnterpriseContactPage;
