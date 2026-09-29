import PageFooter from "../../../../shared/components/layout/PageFooter";
import { EnterpriseContactSidebar } from "../components/EnterpriseContactSidebar";
import { EnterpriseInquiryForm } from "../components/EnterpriseInquiryForm";
import ContextPhoto from "../../../../shared/components/ui/ContextPhoto";
import { editorialPhotos } from "../../../../shared/data/editorialPhotos";

const EnterpriseContactPage = () => {
  return (
    <main id="main-content" tabIndex={-1} className="bg-white text-[#002d0e]">
      <section className="page-intro">
        <div className="site-container grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <p className="eyebrow">Enterprise access</p>
            <h1 className="mt-5 max-w-[1100px] text-page-hero font-medium">
              Talk to the Ontiver team.
            </h1>
            <p className="mt-7 max-w-[800px] text-subtitle text-[#526058]">
              Tell us who you need to verify, which checks matter, and who reviews the results. We
              will scope a pilot around consent, evidence, your dashboard or API integration, and
              measurable outcomes.
            </p>
            <a href="#enterprise-inquiry" className="button-primary mt-7">
              Plan your pilot
            </a>
          </div>
          <div data-scroll-reveal className="min-w-0">
            <ContextPhoto image={editorialPhotos.enterpriseContact} priority />
            <p className="mt-4 text-meta text-[#526058]">
              One workflow. The right evidence. Clear responsibilities for your team.
            </p>
          </div>
        </div>
      </section>
      <section id="enterprise-inquiry" className="section-space scroll-mt-28">
        <div className="site-container">
          <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)] lg:gap-16">
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
