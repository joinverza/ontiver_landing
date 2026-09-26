import PageFooter from "../../../../shared/components/layout/PageFooter";
import { contactHeading } from "../data/contact";
import { ContactSidebar } from "../components/ContactSidebar";
import { ContactRequestForm } from "../components/ContactRequestForm";

const ContactPage = () => {
  return (
    <main id="main-content" tabIndex={-1} className="bg-white text-[#002d0e]">
      <section className="page-intro">
        <div className="site-container">
          <div className="max-w-[1060px]">
            <div>
              <p className="eyebrow">Get in touch</p>
              <h1 className="mt-5 text-page-hero font-medium">{contactHeading}</h1>
            </div>
            <p className="mt-7 max-w-[760px] text-subtitle text-[#526058]">
              Ask about early access, verification requests, your proof wallet, or how consent and
              sharing work.
            </p>
          </div>
        </div>
      </section>

      <section className="pb-20 lg:pb-32">
        <div className="site-container">
          <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)] lg:gap-16">
            <ContactSidebar />

            <ContactRequestForm />
          </div>
        </div>
      </section>
      <PageFooter />
    </main>
  );
};

export default ContactPage;
