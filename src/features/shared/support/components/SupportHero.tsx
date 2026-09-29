import type { Audience } from "../../../../shared/lib/audience";
import { shortcutsByAudience } from "../support.config";
import ContextPhoto from "../../../../shared/components/ui/ContextPhoto";
import { editorialPhotos } from "../../../../shared/data/editorialPhotos";

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
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="min-w-0">
            <p className="eyebrow">Ontiver Support</p>
            <h1 className="mt-5 text-page-hero font-medium">
              {audience === "enterprise"
                ? "Get help with your Ontiver workflows."
                : "Get help with your Ontiver identity."}
            </h1>
            <p className="mt-7 max-w-[760px] text-subtitle text-[#526058]">
              {audience === "enterprise"
                ? "Get help with verification requests, dashboard reviews, API integrations, or consent records. Keep your request and replies together."
                : "Get help with a verification request, your proof wallet, consent, or account access. Keep your request and replies together."}
            </p>
            <a href="#support-request" className="button-primary mt-7">
              {hasSession ? "Continue your conversation" : "Tell us what you need"}
            </a>
          </div>
          <div data-scroll-reveal className="min-w-0">
            <ContextPhoto
              image={
                audience === "enterprise"
                  ? editorialPhotos.enterpriseSupport
                  : editorialPhotos.support
              }
              priority
            />
            <p className="mt-4 text-meta text-[#526058]">
              {audience === "enterprise"
                ? "A place for your workflow questions, integration details, and follow-up."
                : "Your request and replies, together in one conversation."}
            </p>
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
                  document.getElementById("support-topic")?.focus();
                }}
                className="flex items-center gap-3 rounded-2xl border border-transparent bg-[#f5f6f3] p-4 text-left transition-colors hover:border-[#007d21]/30 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#007d21]"
              >
                <Icon className="size-6 shrink-0 text-[#007d21]" aria-hidden="true" />
                <span className="text-body font-medium">{topic}</span>
              </button>
            ))}
          </div>
        )}
      </header>
    </section>
  );
};
