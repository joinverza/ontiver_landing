import { FormEvent, type ReactNode, useCallback, useEffect, useState } from "react";
import {
  CheckCircle2,
  ExternalLink,
  LifeBuoy,
  Mail,
  MessageCircle,
  Plus,
  RefreshCw,
  Send,
  ShieldCheck,
} from "lucide-react";
import { Link } from "react-router-dom";
import CurtainFooter from "../components/sections/CurtainFooter/CurtainFooter";
import type { Audience } from "../lib/audience";
import {
  createPublicSupportRequest,
  getPublicSupportConversation,
  sendPublicSupportMessage,
  type PublicSupportConversation,
  type PublicSupportSession,
} from "../lib/landingApi";

const STORAGE_KEY = "ontiver.publicSupportSession";
const topics = [
  "Account access",
  "Privacy and data",
  "Verification",
  "Credentials and sharing",
  "Billing",
  "Developer integration",
  "Other",
];

const controlClassName =
  "min-h-14 w-full rounded-xl border border-[#d7e2d4] bg-white px-4 text-body font-normal text-[#002d0e] outline-none transition-colors placeholder:text-[#647365]/65 focus:border-[#009311] focus:ring-2 focus:ring-[#009311]/10";

type FormValues = {
  name: string;
  email: string;
  topic: string;
  subject: string;
  message: string;
  website: string;
};

type SupportFieldProps = {
  children: ReactNode;
  className?: string;
  htmlFor: string;
  label: string;
  required?: boolean;
};

const emptyForm: FormValues = {
  name: "",
  email: "",
  topic: "Account access",
  subject: "",
  message: "",
  website: "",
};

function SupportField({ children, className = "", htmlFor, label, required = false }: SupportFieldProps) {
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className="text-body font-medium text-[#002d0e]">
        {label}
        {required ? <span className="ml-1 text-[#008f24]">*</span> : null}
      </label>
      <div className="mt-3">{children}</div>
    </div>
  );
}

function readStoredSession(): PublicSupportSession | null {
  if (typeof window === "undefined") return null;
  try {
    const fragment = new URLSearchParams(window.location.hash.replace(/^#/, ""));
    const shared = fragment.get("support");
    if (shared) {
      const separator = shared.indexOf(":");
      if (separator > 0) {
        const session: PublicSupportSession = {
          requestId: shared.slice(0, separator),
          accessToken: shared.slice(separator + 1),
          status: "open",
          createdAt: new Date().toISOString(),
        };
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
        window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}`);
        return session;
      }
    }
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored ? (JSON.parse(stored) as PublicSupportSession) : null;
  } catch {
    return null;
  }
}

export default function SupportPage({ audience = "individual" }: { audience?: Audience }) {
  const [form, setForm] = useState<FormValues>(emptyForm);
  const [session, setSession] = useState<PublicSupportSession | null>(() => readStoredSession());
  const [conversation, setConversation] = useState<PublicSupportConversation | null>(null);
  const [reply, setReply] = useState("");
  const [busy, setBusy] = useState(false);
  const [loadingConversation, setLoadingConversation] = useState(false);
  const [error, setError] = useState("");

  const loadConversation = useCallback(async (activeSession: PublicSupportSession) => {
    setLoadingConversation(true);
    setError("");
    try {
      setConversation(await getPublicSupportConversation(activeSession.requestId, activeSession.accessToken));
    } catch (value) {
      setError(value instanceof Error ? value.message : "We could not load this support conversation.");
    } finally {
      setLoadingConversation(false);
    }
  }, []);

  useEffect(() => {
    if (!session) return;
    const timer = window.setTimeout(() => void loadConversation(session), 0);
    return () => window.clearTimeout(timer);
  }, [loadConversation, session]);

  async function submitRequest(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;
    setBusy(true);
    setError("");
    try {
      const created = await createPublicSupportRequest(form);
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(created));
      setSession(created);
      setForm(emptyForm);
      await loadConversation(created);
    } catch (value) {
      setError(value instanceof Error ? value.message : "We could not submit your support request.");
    } finally {
      setBusy(false);
    }
  }

  async function submitReply(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!session || !reply.trim() || busy) return;
    setBusy(true);
    setError("");
    try {
      await sendPublicSupportMessage(session.requestId, session.accessToken, reply);
      setReply("");
      await loadConversation(session);
    } catch (value) {
      setError(value instanceof Error ? value.message : "We could not send this message.");
    } finally {
      setBusy(false);
    }
  }

  function startNewRequest() {
    window.localStorage.removeItem(STORAGE_KEY);
    setSession(null);
    setConversation(null);
    setReply("");
    setError("");
  }

  return (
    <>
      <main className="min-h-screen bg-white text-[#002d0e]">
        <section className="page-intro">
          <header className="site-container">
            <div>
              <p className="eyebrow">Ontiver Support</p>
              <h1 className="mt-5 max-w-[1060px] text-page-hero font-bold">
                How can we help?
              </h1>
              <p className="mt-7 max-w-[760px] text-subtitle text-[#526058]">
                Start a secure conversation with our support team. We will keep your request and every reply together in one place.
              </p>
            </div>

            <div className="mt-10 flex flex-col gap-6 sm:flex-row sm:flex-wrap sm:gap-10">
              <div className="flex items-center gap-4">
                <span className="grid size-12 shrink-0 place-items-center rounded-full bg-white text-[#007d21]">
                  <MessageCircle className="size-5" />
                </span>
                <div>
                  <p className="text-meta font-semibold uppercase text-[#06160f]/45">Your conversation</p>
                  <p className="mt-1 text-body font-semibold">Continue here after submitting</p>
                </div>
              </div>
              <a href="mailto:support@ontiver.com" className="group flex items-center gap-4">
                <span className="grid size-12 shrink-0 place-items-center rounded-full bg-white text-[#007d21]">
                  <Mail className="size-5" />
                </span>
                <div className="min-w-0">
                  <p className="text-meta font-semibold uppercase text-[#06160f]/45">Email support</p>
                  <p className="mt-1 truncate text-body font-semibold group-hover:text-[#007b20]">support@ontiver.com</p>
                </div>
              </a>
            </div>
          </header>
        </section>
        <section className="section-space site-container">
          <div className="grid items-start gap-7 lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-10">
            <section className="min-w-0 rounded-[28px] border border-[#e0e8dd] bg-[#f7f9f6] p-7 sm:p-10">
              {session && conversation ? (
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

                  <div className="mt-6 max-h-[520px] min-h-72 space-y-4 overflow-y-auto pr-1" aria-live="polite" data-lenis-prevent>
                    {conversation.messages.map((item) => (
                      <div key={item.messageId} className={`flex ${item.senderType === "admin" ? "justify-start" : "justify-end"}`}>
                        <div
                          className={`max-w-[90%] rounded-xl px-4 py-3 text-body sm:max-w-[78%] ${
                            item.senderType === "admin" ? "bg-[#edf5eb] text-[#002d0e]" : "bg-[#002d0e] text-white"
                          }`}
                        >
                          <p className="mb-1 text-meta font-semibold uppercase opacity-55">
                            {item.senderType === "admin" ? "Ontiver Support" : "You"}
                          </p>
                          <p className="whitespace-pre-wrap break-words">{item.message}</p>
                          <time dateTime={item.createdAt} className="mt-2 block text-meta opacity-70">{new Date(item.createdAt).toLocaleString()}</time>
                        </div>
                      </div>
                    ))}
                  </div>

                  <form onSubmit={submitReply} aria-busy={busy} className="mt-6 border-t border-[#dde6dc] pt-6">
                    <SupportField htmlFor="support-reply" label="Continue the conversation" required>
                      <textarea
                        id="support-reply"
                        required
                        minLength={1}
                        maxLength={4000}
                        value={reply}
                        onChange={(event) => setReply(event.target.value)}
                        className={`${controlClassName} min-h-32 resize-y py-3`}
                        placeholder="Add information that will help our support team..."
                      />
                    </SupportField>
                    <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                      <div className="flex flex-wrap gap-2">
                        <button
                          type="button"
                          onClick={() => void loadConversation(session)}
                          disabled={loadingConversation}
                          className="button-secondary"
                        >
                          <RefreshCw className="h-4 w-4" />
                          {loadingConversation ? "Refreshing..." : "Refresh"}
                        </button>
                        <button
                          type="button"
                          onClick={startNewRequest}
                          disabled={busy}
                          className="inline-flex min-h-14 items-center gap-2 rounded-full px-4 text-body font-medium text-[#526058] hover:text-[#007d21] disabled:opacity-50"
                        >
                          <Plus className="h-4 w-4" /> New request
                        </button>
                      </div>
                      <button
                        type="submit"
                        disabled={busy || !reply.trim()}
                        className="button-primary"
                      >
                        <Send className="h-4 w-4" />
                        {busy ? "Sending..." : "Send message"}
                      </button>
                    </div>
                  </form>
                </>
              ) : session ? (
                <div className="flex min-h-[420px] flex-col items-center justify-center text-center" aria-live="polite">
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
                      <button
                        type="button"
                        onClick={() => void loadConversation(session)}
                        className="button-primary"
                      >
                        <RefreshCw className="h-4 w-4" /> Try again
                      </button>
                      <button
                        type="button"
                        onClick={startNewRequest}
                        className="button-secondary"
                      >
                        <Plus className="h-4 w-4" /> New request
                      </button>
                    </div>
                  ) : null}
                </div>
              ) : (
                <form onSubmit={submitRequest} aria-busy={busy}>
                  <div className="eyebrow flex items-center gap-2">
                    <LifeBuoy className="h-4 w-4" />
                    Create a request
                  </div>
                  <h2 className="mt-4 text-section font-semibold">Tell us what you need</h2>

                  <div className="mt-9 grid gap-x-5 gap-y-7 sm:grid-cols-2">
                    <SupportField htmlFor="support-name" label="Full name" required>
                      <input
                        id="support-name"
                        required
                        minLength={2}
                        autoComplete="name"
                        value={form.name}
                        onChange={(event) => setForm({ ...form, name: event.target.value })}
                        className={controlClassName}
                      />
                    </SupportField>
                    <SupportField htmlFor="support-email" label="Email address" required>
                      <input
                        id="support-email"
                        required
                        type="email"
                        autoComplete="email"
                        value={form.email}
                        onChange={(event) => setForm({ ...form, email: event.target.value })}
                        className={controlClassName}
                      />
                    </SupportField>
                    <SupportField htmlFor="support-topic" label="Topic" required>
                      <select
                        id="support-topic"
                        required
                        value={form.topic}
                        onChange={(event) => setForm({ ...form, topic: event.target.value })}
                        className={controlClassName}
                      >
                        {topics.map((topic) => (
                          <option key={topic}>{topic}</option>
                        ))}
                      </select>
                    </SupportField>
                    <SupportField htmlFor="support-subject" label="Subject" required>
                      <input
                        id="support-subject"
                        required
                        minLength={2}
                        maxLength={160}
                        value={form.subject}
                        onChange={(event) => setForm({ ...form, subject: event.target.value })}
                        className={controlClassName}
                      />
                    </SupportField>
                    <SupportField htmlFor="support-message" label="Message" required className="sm:col-span-2">
                      <textarea
                        id="support-message"
                        required
                        minLength={10}
                        maxLength={4000}
                        value={form.message}
                        onChange={(event) => setForm({ ...form, message: event.target.value })}
                        className={`${controlClassName} min-h-40 resize-y py-3`}
                        placeholder="Describe what happened, what you expected, and any non-sensitive error message."
                      />
                    </SupportField>
                    <label className="sr-only" aria-hidden="true">
                      Website
                      <input
                        tabIndex={-1}
                        autoComplete="off"
                        value={form.website}
                        onChange={(event) => setForm({ ...form, website: event.target.value })}
                      />
                    </label>
                  </div>

                  <div className="mt-8 flex flex-col gap-5 border-t border-[#dde6dc] pt-7 sm:flex-row sm:items-center sm:justify-between">
                    <p className="max-w-xl text-meta text-[#526058]">
                      Ontiver uses this information to respond and operate support. See our{" "}
                      <Link className="font-semibold text-[#007b20] underline underline-offset-2" to="/privacy">
                        Privacy Policy
                      </Link>
                      .
                    </p>
                    <button
                      type="submit"
                      disabled={busy}
                      className="button-primary shrink-0"
                    >
                      {busy ? "Submitting..." : "Submit request"}
                      <Send className="h-4 w-4" />
                    </button>
                  </div>
                </form>
              )}

              {error ? (
                <p role="alert" className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-body text-red-800">
                  {error}
                </p>
              ) : null}
            </section>

            <aside className="rounded-[28px] bg-[#edf5eb] p-7 text-[#002d0e] sm:p-9">
              <div className="flex items-center gap-2 text-meta font-semibold uppercase text-[#007d21]">
                <ShieldCheck className="h-4 w-4" /> Before you send
              </div>
              <h2 className="mt-5 text-section font-bold">Keep sensitive details private.</h2>
              <p className="mt-5 text-body text-[#526058]">
                Ontiver Support will never ask for passwords, one-time codes, card PINs, complete identity numbers, or API secrets.
              </p>

              <div className="mt-8 divide-y divide-[#002d0e]/15 border-y border-[#002d0e]/15">
                <a href="mailto:support@ontiver.com" className="group flex min-h-16 items-center justify-between gap-4 py-4">
                  <span className="flex items-center gap-3 text-body font-semibold">
                    <Mail className="size-5 text-[#007d21]" /> Email support
                  </span>
                  <ExternalLink className="size-5 shrink-0 text-[#007d21]" />
                </a>
                <a
                  href="https://docs.ontiver.com/faq"
                  target="_blank"
                  rel="noreferrer"
                  className="group flex min-h-16 items-center justify-between gap-4 py-4"
                >
                  <span className="flex items-center gap-3 text-body font-semibold">
                    <LifeBuoy className="size-5 text-[#007d21]" /> Help and FAQs
                  </span>
                  <ExternalLink className="size-5 shrink-0 text-[#007d21]" />
                </a>
              </div>

              <div className="mt-8 flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-[#007d21]" />
                <div>
                  <p className="text-card-title font-semibold">Secure conversation</p>
                  <p className="mt-2 text-body text-[#526058]">Keep your conversation link private; it gives access to your request.</p>
                </div>
              </div>
            </aside>
          </div>
        </section>
      </main>
      <CurtainFooter audience={audience} />
    </>
  );
}
