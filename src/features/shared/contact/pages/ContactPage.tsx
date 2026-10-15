import PageFooter from "../../../../shared/components/layout/PageFooter";
import { contactHeading } from "../data/contact";
import { ContactSidebar } from "../components/ContactSidebar";
import { ContactRequestForm } from "../components/ContactRequestForm";
import ContextPhoto from "../../../../shared/components/ui/ContextPhoto";
import { editorialPhotos } from "../../../../shared/data/editorialPhotos";

const ContactPage = () => {
  return (
    <main id="main-content" tabIndex={-1} className="bg-surface text-[#002d0e]">
      <section className="page-intro">
        <div className="site-container split-hero-grid">
          <div className="page-hero-content">
            <div>
              <p className="eyebrow">Get in touch</p>
              <h1 className="mt-5 text-page-hero font-medium">{contactHeading}</h1>
            </div>
            <p className="page-hero-description mt-7 text-subtitle text-[#526058]">
              Ask about early access, verification requests, your proof wallet, or how consent and
              sharing work.
            </p>
            <div className="page-hero-actions">
              <a href="#contact-form" className="button-primary">
                Send the team a message
              </a>
            </div>
          </div>
          <div data-scroll-reveal className="page-hero-media">
            <ContextPhoto
              priority
              sizes="(min-width: 2400px) 1150px, (min-width: 1024px) 47vw, 100vw"
              image={editorialPhotos.contact}
              size="wide"
              caption="From your first question to your next verification request."
            />
          </div>
        </div>
      </section>

      <section id="contact-form" className="section-space scroll-mt-28">
        <div className="site-container">
          <div className="equal-columns grid gap-6 lg:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)] lg:gap-8">
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
