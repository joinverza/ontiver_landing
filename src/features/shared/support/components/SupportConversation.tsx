import type { FormEvent } from "react";
import { CheckCircle2, Plus, RefreshCw, Send } from "lucide-react";
import type { PublicSupportConversation } from "../../../../shared/lib/landingApi";
import { controlClassName } from "../support.config";
import { SupportField } from "./SupportField";

type SupportConversationProps = {
  conversation: PublicSupportConversation;
  reply: string;
  busy: boolean;
  loadingConversation: boolean;
  onReplyChange: (value: string) => void;
  onSubmitReply: (event: FormEvent<HTMLFormElement>) => void;
  onRefresh: () => void;
  onStartNewRequest: () => void;
};

export const SupportConversation = ({
  conversation,
  reply,
  busy,
  loadingConversation,
  onReplyChange,
  onSubmitReply,
  onRefresh,
  onStartNewRequest,
}: SupportConversationProps) => (
  <>
    <div className="flex flex-wrap items-start justify-between gap-5 border-b border-[#06160f]/10 pb-6">
      <div className="min-w-0">
        <div className="flex items-center gap-2 text-meta font-semibold uppercase text-[#008b24]">
          <CheckCircle2 className="h-4 w-4" />
          Request {conversation.requestId}
        </div>
        <h2 className="mt-3 break-words text-section font-semibold">{conversation.subject}</h2>
      </div>
      <span className="inline-flex items-center gap-2 rounded-full bg-[#e9f6ec] px-3 py-1.5 text-meta font-semibold capitalize text-[#006d1d]">
        <span className="h-1.5 w-1.5 rounded-full bg-[#009311]" />
        {conversation.status}
      </span>
    </div>

    <div
      className="mt-6 max-h-[520px] min-h-72 space-y-4 overflow-y-auto pr-1"
      aria-live="polite"
      data-lenis-prevent
    >
      {conversation.messages.map((item) => (
        <div
          key={item.messageId}
          className={`flex ${item.senderType === "admin" ? "justify-start" : "justify-end"}`}
        >
          <div
            className={`max-w-[90%] rounded-xl px-4 py-3 text-body sm:max-w-[78%] ${
              item.senderType === "admin"
                ? "bg-[#edf5eb] text-[#002d0e]"
                : "bg-[#002d0e] text-white"
            }`}
          >
            <p className="mb-1 text-meta font-semibold uppercase opacity-55">
              {item.senderType === "admin" ? "Ontiver Support" : "You"}
            </p>
            <p className="whitespace-pre-wrap break-words">{item.message}</p>
            <time dateTime={item.createdAt} className="mt-2 block text-meta opacity-70">
              {new Date(item.createdAt).toLocaleString()}
            </time>
          </div>
        </div>
      ))}
    </div>

    <form onSubmit={onSubmitReply} aria-busy={busy} className="mt-6 border-t border-[#dde6dc] pt-6">
      <SupportField htmlFor="support-reply" label="Continue the conversation" required>
        <textarea
          id="support-reply"
          required
          minLength={1}
          maxLength={4000}
          value={reply}
          onChange={(event) => onReplyChange(event.target.value)}
          className={`${controlClassName} min-h-32 resize-y py-3`}
          placeholder="Add information that will help our support team..."
        />
      </SupportField>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={onRefresh}
            disabled={loadingConversation}
            className="button-secondary"
          >
            <RefreshCw className="h-4 w-4" />
            {loadingConversation ? "Refreshing..." : "Refresh"}
          </button>
          <button
            type="button"
            onClick={onStartNewRequest}
            disabled={busy}
            className="inline-flex min-h-14 items-center gap-2 rounded-full px-4 text-body font-medium text-[#526058] hover:text-[#007d21] disabled:opacity-50"
          >
            <Plus className="h-4 w-4" /> Start a new request
          </button>
        </div>
        <button type="submit" disabled={busy || !reply.trim()} className="button-primary">
          <Send className="h-4 w-4" />
          {busy ? "Sending..." : "Send message"}
        </button>
      </div>
    </form>
  </>
);
