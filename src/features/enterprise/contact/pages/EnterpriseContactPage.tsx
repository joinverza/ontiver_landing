import PageFooter from "../../../../shared/components/layout/PageFooter";
import { EnterpriseContactSidebar } from "../components/EnterpriseContactSidebar";
import { EnterpriseInquiryForm } from "../components/EnterpriseInquiryForm";

const EnterpriseContactPage = () => {
  return (
    <main id="main-content" tabIndex={-1} className="bg-white text-[#002d0e]">
      <section className="page-intro">
        <div className="site-container">
          <div>
            <p className="eyebrow">Enterprise access</p>
            <h1 className="mt-5 max-w-[1100px] text-page-hero font-medium">
              Talk to the Ontiver team.
            </h1>
          </div>
          <p className="mt-7 max-w-[800px] text-subtitle text-[#526058]">
            Tell us who you need to verify, which checks matter, and who reviews the results. We
            will scope a pilot around consent, evidence, your dashboard or API integration, and
            measurable outcomes.
          </p>
        </div>
      </section>
      <section className="pb-20 lg:pb-32">
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
