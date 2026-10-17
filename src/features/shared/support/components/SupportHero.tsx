import type { Audience } from "../../../../shared/lib/audience";
import { shortcutsByAudience } from "../support.config";
import ContextPhoto from "../../../../shared/components/ui/ContextPhoto";
import { editorialPhotos } from "../../../../shared/data/editorialPhotos";
import { scrollPageTo } from "../../../../shared/lib/scrollNavigation";

type SupportHeroProps = {
  audience: Audience;
  hasSession: boolean;
  onTopicSelect: (topic: string) => void;
};

export const SupportHero = ({ audience, hasSession, onTopicSelect }: SupportHeroProps) => {
  const topicShortcuts = shortcutsByAudience[audience];

  return (
    <section className="page-intro">
      <header className="site-container">
        <div
          className={`split-hero-grid ${audience === "individual" ? "split-hero-grid--image-left" : ""}`}
        >
          <div className="page-hero-content">
            <p className="eyebrow">Ontiver Support</p>
            <h1 className="mt-5 text-page-hero font-medium">
              {audience === "enterprise"
                ? "Get help with your Ontiver workflows."
                : "Get help with your Ontiver identity."}
            </h1>
            <p className="page-hero-description mt-7 text-subtitle text-[#526058]">
              {audience === "enterprise"
                ? "Get help with verification requests, dashboard reviews, API integrations, or consent records. Keep your request and replies together."
                : "Get help with a verification request, your proof wallet, consent, or account access. Keep your request and replies together."}
            </p>
            <div className="page-hero-actions">
              <a href="#support-request" className="button-primary">
                {hasSession ? "Continue your conversation" : "Tell us what you need"}
              </a>
            </div>
          </div>
          <div data-scroll-reveal className="page-hero-media">
            <ContextPhoto
              priority
              sizes="(min-width: 2400px) 1150px, (min-width: 1024px) 47vw, 100vw"
              image={
                audience === "enterprise"
                  ? editorialPhotos.enterpriseSupport
                  : editorialPhotos.support
              }
              size="wide"
              caption={
                audience === "enterprise"
                  ? "A place for your workflow questions, integration details, and follow-up."
                  : "Your request and replies, together in one conversation."
              }
            />
          </div>
        </div>

        {!hasSession && (
          <div
            className={`mt-10 grid gap-3 text-left sm:grid-cols-2 ${audience === "enterprise" ? "lg:grid-cols-5" : "lg:grid-cols-4"}`}
          >
            {topicShortcuts.map(({ topic, icon: Icon }) => (
              <button
                key={topic}
                type="button"
                onClick={() => {
                  onTopicSelect(topic);
                  document.getElementById("support-topic")?.focus({ preventScroll: true });
                  scrollPageTo(document.getElementById("support-request-form"));
                }}
                className="flex items-center gap-3 rounded-2xl border border-transparent bg-surface-muted p-4 text-left transition-colors hover:border-[#007d21]/30 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#007d21]"
              >
                <Icon className="size-6 shrink-0 text-accent" aria-hidden="true" />
                <span className="text-body font-medium">{topic}</span>
              </button>
            ))}
          </div>
        )}
      </header>
    </section>
  );
};
