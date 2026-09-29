import PageFooter from "../../../../shared/components/layout/PageFooter";
import { contactHeading } from "../data/contact";
import { ContactSidebar } from "../components/ContactSidebar";
import { ContactRequestForm } from "../components/ContactRequestForm";
import ContextPhoto from "../../../../shared/components/ui/ContextPhoto";
import { editorialPhotos } from "../../../../shared/data/editorialPhotos";

const ContactPage = () => {
  return (
    <main id="main-content" tabIndex={-1} className="bg-white text-[#002d0e]">
      <section className="page-intro">
        <div className="site-container grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="min-w-0">
            <div>
              <p className="eyebrow">Get in touch</p>
              <h1 className="mt-5 text-page-hero font-medium">{contactHeading}</h1>
            </div>
            <p className="mt-7 max-w-[760px] text-subtitle text-[#526058]">
              Ask about early access, verification requests, your proof wallet, or how consent and
              sharing work.
            </p>
            <a href="#contact-form" className="button-primary mt-7">
              Send the team a message
            </a>
          </div>
          <div data-scroll-reveal className="min-w-0">
            <ContextPhoto image={editorialPhotos.contact} priority />
            <p className="mt-4 text-meta text-[#526058]">
              From your first question to your next verification request.
            </p>
          </div>
        </div>
      </section>

      <section id="contact-form" className="section-space scroll-mt-28">
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
