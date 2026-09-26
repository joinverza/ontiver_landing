import type { Audience } from "../../../../shared/lib/audience";
import { shortcutsByAudience } from "../support.config";

type SupportHeroProps = {
  audience: Audience;
  hasSession: boolean;
  onTopicSelect: (topic: string) => void;
};

export const SupportHero = ({ audience, hasSession, onTopicSelect }: SupportHeroProps) => {
  const topicShortcuts = shortcutsByAudience[audience];

  return (
    <section className="page-intro">
      <header className="site-container text-center">
        <div>
          <p className="eyebrow">Ontiver Support</p>
          <h1 className="mx-auto mt-5 max-w-[1060px] text-page-hero font-medium">
            {audience === "enterprise"
              ? "Get help with your Ontiver workflows."
              : "Get help with your Ontiver identity."}
          </h1>
          <p className="mx-auto mt-7 max-w-[760px] text-subtitle text-[#526058]">
            {audience === "enterprise"
              ? "Get help with verification requests, dashboard reviews, API integrations, or consent records. Keep your request and replies together."
              : "Get help with a verification request, your proof wallet, consent, or account access. Keep your request and replies together."}
          </p>
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
