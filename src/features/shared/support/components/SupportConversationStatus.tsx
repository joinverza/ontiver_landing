import { MessageCircle, Plus, RefreshCw } from "lucide-react";

type SupportConversationStatusProps = {
  loadingConversation: boolean;
  onRetry: () => void;
  onStartNewRequest: () => void;
};

export const SupportConversationStatus = ({
  loadingConversation,
  onRetry,
  onStartNewRequest,
}: SupportConversationStatusProps) => (
  <div
    className="flex min-h-[280px] flex-col items-center justify-center text-center"
    aria-live="polite"
  >
    <span className="grid h-14 w-14 place-items-center rounded-full bg-[#e9f6ec] text-[#008b24]">
      <MessageCircle className="h-6 w-6" />
    </span>
    <h2 className="mt-5 text-section font-semibold tracking-normal">
      {loadingConversation ? "Opening your conversation" : "Conversation unavailable"}
    </h2>
    <p className="mt-3 max-w-md text-body text-[#06160f]/55">
      {loadingConversation
        ? "We are securely loading the messages connected to this request."
        : "Try loading the request again, or start a new support request."}
    </p>
    {!loadingConversation ? (
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <button type="button" onClick={onRetry} className="button-primary">
          <RefreshCw className="h-4 w-4" /> Try again
        </button>
        <button type="button" onClick={onStartNewRequest} className="button-secondary">
          <Plus className="h-4 w-4" /> Start a new request
        </button>
      </div>
    ) : null}
  </div>
);
