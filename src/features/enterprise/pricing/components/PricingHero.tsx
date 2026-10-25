import { Link } from "react-router-dom";
import { DEVELOPER_SIGNUP_URL, PORTAL_SIGNUP_URL } from "../data/pricing";
import ContextPhoto from "../../../../shared/components/ui/ContextPhoto";
import { editorialPhotos } from "../../../../shared/data/editorialPhotos";
import ActionIcon from "../../../../shared/components/ui/ActionIcon";

const PricingHero = () => {
  return (
    <section className="page-intro">
      <div className="site-container split-hero-grid">
        <div data-scroll-reveal className="page-hero-content">
          <p className="eyebrow">Pricing</p>
          <h1 className="page-hero-heading text-page-hero font-normal">
            Start free. Talk to us when you go live.
          </h1>
          <p className="page-hero-description text-subtitle text-[#526052]">
            Build in Sandbox at no cost. When you're ready for real checks, our team quotes a plan
            for your volume, priced to stay affordable as you grow. Every plan comes with the full
            dashboard, API and SDKs.
          </p>
          <div className="page-hero-actions items-center">
            <a href={PORTAL_SIGNUP_URL} rel="noopener" className="button-primary">
              Start free in Sandbox
              <ActionIcon size={18} aria-hidden="true" />
            </a>
            <Link to="/enterprise/contact?plan=growth" className="button-secondary">
              Contact sales
            </Link>
          </div>
          <p className="mt-4 text-body text-[#526058]">
            Building on your own?{" "}
            <a
              href={DEVELOPER_SIGNUP_URL}
              rel="noopener"
              className="font-medium text-accent underline underline-offset-4"
            >
              Create a developer account
            </a>
          </p>
          <div className="mt-8 border-t border-[#cbd5c7] pt-6">
            <h2 className="text-card-title font-medium">Your dashboard matches your plan.</h2>
            <p className="mt-2 text-body text-[#526058]">
              The features and allowances on this page are the ones switched on in your workspace,
              with usage shown live on your billing page.
            </p>
          </div>
        </div>
        <div data-scroll-reveal className="page-hero-media">
          <ContextPhoto
            image={editorialPhotos.pricing}
            priority
            sizes="(min-width: 2400px) 1150px, (min-width: 1024px) 47vw, 100vw"
          />
        </div>
      </div>
    </section>
  );
};

export default PricingHero;
