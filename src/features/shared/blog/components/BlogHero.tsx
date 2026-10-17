import ActionIcon from "../../../../shared/components/ui/ActionIcon";
import ContextPhoto from "../../../../shared/components/ui/ContextPhoto";
import { imagery } from "../../../../shared/data/imagery";

const BlogHero = () => {
  return (
    <header className="page-intro blog-intro pt-32!">
      <div className="site-container split-hero-grid">
        <div className="page-hero-content">
          <p className="eyebrow">The Ontiver journal</p>
          <h1 className="mt-5 text-page-hero font-medium">
            Ideas on identity, verification, and trust.
          </h1>
          <p className="page-hero-description mt-6 text-subtitle text-[#002d0e]/65">
            Practical guides for the people building and using identity workflows.
          </p>
          <div className="blog-intro-action">
            <a
              href="#blog-library"
              className="inline-flex items-center gap-3 text-body font-medium text-accent"
            >
              Explore the journal <ActionIcon size={18} aria-hidden="true" />
            </a>
          </div>
        </div>
        <div className="page-hero-media hero-media-enter">
          <ContextPhoto
            image={imagery.education}
            priority
            sizes="(min-width: 1024px) 47vw, 100vw"
          />
        </div>
      </div>
    </header>
  );
};

export default BlogHero;
