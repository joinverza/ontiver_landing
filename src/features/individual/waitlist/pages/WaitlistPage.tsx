import ActionIcon from "../../../../shared/components/ui/ActionIcon";
import { Link } from "react-router-dom";
import WaitlistForm from "../components/WaitlistForm";
import Footer from "../../../../shared/components/layout/Footer";
import ContextPhoto from "../../../../shared/components/ui/ContextPhoto";
import { editorialPhotos } from "../../../../shared/data/editorialPhotos";

const WaitlistPage = () => {
  return (
    <main id="main-content" tabIndex={-1}>
      <section className="page-intro">
        <div className="site-container split-hero-grid split-hero-grid--image-left">
          <div className="page-hero-content pt-10!">
            <p className="eyebrow">Early access</p>
            <h1 className="mt-5 text-page-hero font-medium">
              Stop uploading the same documents <span className="text-accent">everywhere.</span>
            </h1>
            <p className="page-hero-description mt-6 text-subtitle text-[#002d0e]/65">
              Join the waitlist to be among the first to hold a reusable Ontiver identity proof.
            </p>
            <WaitlistForm className="mt-9 border border-[#dde6dc] bg-surface-raised p-6 sm:p-8" />
            <Link
              to="/how-it-works"
              className="mt-6 inline-flex items-center gap-2 text-body font-semibold text-accent"
            >
              How It Works
              <ActionIcon size={17} />
            </Link>
          </div>
          <div className="page-hero-media" data-scroll-reveal>
            <ContextPhoto
              priority
              sizes="(min-width: 2400px) 1150px, (min-width: 1024px) 47vw, 100vw"
              image={editorialPhotos.waitlist}
              size="wide"
              caption="Designed for pending requests, approved proofs and a clear record of sharing."
            />
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default WaitlistPage;
