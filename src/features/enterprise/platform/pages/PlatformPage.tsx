import ActionIcon from "../../../../shared/components/ui/ActionIcon";
import { Plus } from "lucide-react";
import { Link, Navigate, useParams } from "react-router-dom";
import Footer from "../../../../shared/components/layout/Footer";
import WorkflowVisual from "../../../../shared/components/ui/WorkflowVisual";
import { platformLayers } from "../data/platform";
import "./platform-capabilities.css";

const PlatformPage = () => {
  const { id } = useParams();
  const layer = platformLayers.find((item) => item.id === id);
  if (!layer) return <Navigate to="/enterprise/platform" replace />;
  const relatedLayers = platformLayers.filter((item) => layer.relatedIds.includes(item.id));

  return (
    <main id="main-content" tabIndex={-1} className="bg-surface text-[#002d0e]">
      <section className="page-intro pt-32!">
        <div
          className={`site-container split-hero-grid ${platformLayers.indexOf(layer) % 2 ? "split-hero-grid--image-left" : ""}`}
        >
          <Link
            to="/enterprise/platform"
            className="mb-8 inline-flex items-center gap-2 text-sm text-[#526058] hover:text-accent"
          >
            <ActionIcon direction="back" size={16} aria-hidden="true" /> Explore the platform
          </Link>
          <div data-scroll-reveal className="page-hero-content">
            <p className="eyebrow">Ontiver {layer.title}</p>
            <h1 className="page-hero-heading text-page-hero font-normal">{layer.headline}</h1>
            <p className="page-hero-description text-subtitle text-[#526058]">
              {layer.description}
            </p>
            <div className="page-hero-actions">
              <Link to="/enterprise/contact" className="button-primary">
                See This Layer in a Demo <ActionIcon size={17} aria-hidden="true" />
              </Link>
              <a href="#capabilities" className="button-secondary">
                Explore capabilities
              </a>
            </div>
          </div>
          <div data-scroll-reveal className="page-hero-media">
            <WorkflowVisual
              variant={layer.visualVariant}
              title={layer.visualTitle}
              purpose={layer.description}
              claims={layer.visualClaims}
              steps={layer.workflow}
              compact
              priority
              className="hero-workflow-visual"
            />
          </div>
        </div>
      </section>

      <nav aria-label="Platform layers" className="border-y border-[#e2e9df] bg-surface">
        <div className="site-container flex flex-wrap gap-x-6 gap-y-1 py-5">
          {platformLayers.map((item) => (
            <Link
              key={item.id}
              to={`/enterprise/platform/${item.id}`}
              aria-current={item.id === layer.id ? "page" : undefined}
              className={`rounded-full px-5 py-2 text-lg font-medium transition-colors ${item.id === layer.id ? "bg-[#a9fb94] text-accent" : "text-[#526058] hover:bg-surface-muted hover:text-accent"}`}
            >
              {item.title}
            </Link>
          ))}
        </div>
      </nav>

      <section id="capabilities" className="section-space scroll-mt-28">
        <div className="site-container equal-columns grid gap-8 lg:grid-cols-2 lg:gap-16">
          <div data-scroll-reveal>
            <p className="eyebrow">The building blocks</p>
            <h2 className="section-heading mt-5">
              What this layer
              <br />
              connects.
            </h2>
            <p className="mt-6 text-body text-[#526058]">{layer.overview}</p>
          </div>
          <div data-scroll-reveal className="platform-capabilities">
            {layer.capabilities.map((capability) => (
              <details key={capability.title} className="platform-capability">
                <summary className="platform-capability-trigger text-card-title font-medium">
                  <span className="platform-capability-title">{capability.title}</span>
                  <span className="platform-capability-icon" aria-hidden="true">
                    <Plus size={20} />
                  </span>
                </summary>
                <p className="platform-capability-description text-body">
                  {capability.description}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space bg-surface-muted">
        <div className="site-container">
          <h2 data-scroll-reveal className="section-heading max-w-3xl">
            How it comes together.
          </h2>
          <ol
            className={`mt-8 grid gap-x-8 gap-y-6 sm:grid-cols-2 ${layer.workflow.length === 3 ? "lg:grid-cols-3" : "lg:grid-cols-4"}`}
          >
            {layer.workflow.map((step, index) => (
              <li
                data-scroll-reveal
                key={step.title}
                className="min-w-0 border-t border-[#cfdacb] pt-4"
              >
                <span className="text-meta font-medium text-accent">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 text-card-title font-medium">{step.title}</h3>
                <p className="mt-3 text-body text-[#526058]">{step.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section-space section-compact bg-[#002d0e] py-24!">
        <div className="site-container">
          <div
            data-scroll-reveal
            className="equal-columns grid gap-8 text-white sm:p-9 lg:grid-cols-[1.05fr_.95fr] lg:gap-12"
          >
            <div>
              <p className="text-meta font-semibold uppercase text-[#c7e6b5]">Before your pilot</p>
              <h2 className="section-heading mt-3 max-w-[730px]">
                Build your verification journey.
              </h2>
              <p className="mt-4 max-w-xl text-body text-white/75">{layer.boundary}</p>
              <Link to="/enterprise/contact" className="button-primary button-on-dark mt-6">
                See This Layer in a Demo <ActionIcon size={18} aria-hidden="true" />
              </Link>
            </div>
            <ol className="border-t border-white/20 lg:border-t-0 lg:border-l lg:pl-8">
              {[
                {
                  title: "Choose one request",
                  description: "Define the people, purpose, and evidence your pilot needs.",
                },
                {
                  title: "Agree access and review",
                  description: "Set consent, retention, and the team responsible for decisions.",
                },
                {
                  title: "Measure the complete journey",
                  description: "Track completion, review effort, and the quality of the evidence.",
                },
              ].map((step, index) => (
                <li
                  key={step.title}
                  className="grid grid-cols-[2rem_1fr] gap-x-3 border-b border-white/20 py-4 first:pt-0 last:border-0 last:pb-0 lg:first:pt-1"
                >
                  <span className="text-meta text-[#c7e6b5]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-body font-semibold">{step.title}</h3>
                    <p className="mt-1 text-sm text-white/70">{step.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <nav
            aria-label="Related platform layers"
            className="mt-7 mx-10 flex flex-wrap items-center gap-x-7 gap-y-4"
          >
            {relatedLayers.map((item) => (
              <Link
                key={item.id}
                to={`/enterprise/platform/${item.id}`}
                className="inline-flex items-center gap-2 text-sm font-semibold text-white"
              >
                {item.title}
                <ActionIcon size={17} aria-hidden="true" />
              </Link>
            ))}
            <Link
              to="/enterprise/security"
              className="inline-flex items-center gap-2 text-sm font-semibold text-white"
            >
              Security and trust
              <ActionIcon size={17} aria-hidden="true" />
            </Link>
          </nav>
        </div>
      </section>
      <Footer audience="enterprise" />
    </main>
  );
};

export default PlatformPage;
