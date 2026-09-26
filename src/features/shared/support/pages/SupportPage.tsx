import PageFooter from "../../../../shared/components/layout/PageFooter";
import type { Audience } from "../../../../shared/lib/audience";
import { SupportConversation } from "../components/SupportConversation";
import { SupportConversationStatus } from "../components/SupportConversationStatus";
import { SupportHero } from "../components/SupportHero";
import { SupportRequestForm } from "../components/SupportRequestForm";
import { SupportSidebar } from "../components/SupportSidebar";
import { useSupportRequest } from "../hooks/useSupportRequest";

const SupportPage = ({ audience = "individual" }: { audience?: Audience }) => {
  const support = useSupportRequest(audience);

  return (
    <>
      <main id="main-content" tabIndex={-1} className="min-h-screen bg-white text-[#002d0e]">
        <SupportHero
          audience={audience}
          hasSession={Boolean(support.session)}
          onTopicSelect={(topic) => support.updateForm("topic", topic)}
        />
        <section className="site-container pb-20 lg:pb-32">
          <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)] lg:gap-16">
            <section className="min-w-0 bg-white">
              {support.session && support.conversation ? (
                <SupportConversation
                  conversation={support.conversation}
                  reply={support.reply}
                  busy={support.busy}
                  loadingConversation={support.loadingConversation}
                  onReplyChange={support.setReply}
                  onSubmitReply={support.submitReply}
                  onRefresh={support.refreshConversation}
                  onStartNewRequest={support.startNewRequest}
                />
              ) : support.session ? (
                <SupportConversationStatus
                  loadingConversation={support.loadingConversation}
                  onRetry={support.refreshConversation}
                  onStartNewRequest={support.startNewRequest}
                />
              ) : (
                <SupportRequestForm
                  form={support.form}
                  selectedTopic={support.selectedTopic}
                  topics={support.topics}
                  busy={support.busy}
                  onChange={support.updateForm}
                  onSubmit={support.submitRequest}
                />
              )}
              {support.error ? (
                <p
                  role="alert"
                  className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-body text-red-800"
                >
                  {support.error}
                </p>
              ) : null}
            </section>
            <SupportSidebar audience={audience} hasSession={Boolean(support.session)} />
          </div>
        </section>
      </main>
      <PageFooter audience={audience} />
    </>
  );
};

export default SupportPage;
