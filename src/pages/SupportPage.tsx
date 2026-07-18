import { FormEvent, useCallback, useEffect, useState } from "react";
import {
  CheckCircle2,
  Clock3,
  ExternalLink,
  LifeBuoy,
  LockKeyhole,
  Mail,
  MessageCircle,
  RefreshCw,
  Send,
  ShieldCheck,
} from "lucide-react";
import { Link } from "react-router-dom";
import CurtainFooter from "../components/sections/CurtainFooter/CurtainFooter";
import {
  createPublicSupportRequest,
  getPublicSupportConversation,
  sendPublicSupportMessage,
  type PublicSupportConversation,
  type PublicSupportSession,
} from "../lib/landingApi";

const STORAGE_KEY = "ontiver.publicSupportSession";
const topics = ["Account access", "Privacy and data", "Verification", "Credentials and sharing", "Billing", "Developer integration", "Other"];

type FormValues = {
  name: string;
  email: string;
  topic: string;
  subject: string;
  message: string;
  website: string;
};

const emptyForm: FormValues = {
  name: "",
  email: "",
  topic: "Account access",
  subject: "",
  message: "",
  website: "",
};

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

export default function SupportPage() {
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

  return (
    <>
      <main className="min-h-screen bg-[#f4f7f4] pb-24 pt-32 text-[#10231b] sm:pt-40">
        <section className="mx-auto max-w-[1180px] px-5 sm:px-8">
          <div className="overflow-hidden rounded-[2rem] bg-[#061b13] px-6 py-10 text-white sm:px-10 sm:py-14 lg:px-14">
            <div className="flex items-center gap-2 text-sm font-semibold text-emerald-300"><LifeBuoy className="h-4 w-4" /> Ontiver Support</div>
            <div className="mt-5 grid gap-8 lg:grid-cols-[1fr_320px] lg:items-end">
              <div>
                <h1 className="max-w-3xl text-4xl font-semibold tracking-[-.04em] sm:text-6xl">Clear help, with a secure conversation.</h1>
                <p className="mt-5 max-w-2xl text-base leading-7 text-white/70 sm:text-lg">Send a support request without signing in. Your message enters Ontiver's audited administrator queue, and replies arrive by email and in your secure website conversation.</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[.06] p-5">
                <div className="flex items-center gap-3"><Clock3 className="h-5 w-5 text-emerald-300" /><div><p className="font-semibold">Response target</p><p className="mt-1 text-sm text-white/60">Within two business days</p></div></div>
                <a href="mailto:support@ontiver.com" className="mt-5 flex items-center gap-3 border-t border-white/10 pt-5 text-sm font-semibold text-white"><Mail className="h-5 w-5 text-emerald-300" /> support@ontiver.com</a>
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              [ShieldCheck, "Private by design", "Do not send passwords, secret keys, full BVNs, or identity documents."],
              [MessageCircle, "One conversation", "Continue the same thread on this device and receive replies by email."],
              [LockKeyhole, "Secure access", "A private conversation token protects the messages associated with your request."],
            ].map(([Icon, title, copy]) => (
              <div key={String(title)} className="rounded-2xl border border-black/10 bg-white p-5">
                <Icon className="h-5 w-5 text-emerald-700" />
                <h2 className="mt-4 font-semibold">{String(title)}</h2>
                <p className="mt-2 text-sm leading-6 text-black/55">{String(copy)}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_380px]">
            <section className="rounded-[2rem] border border-black/10 bg-white p-6 sm:p-9">
              {session && conversation ? (
                <>
                  <div className="flex flex-wrap items-start justify-between gap-4 border-b border-black/10 pb-6">
                    <div><p className="text-xs font-bold uppercase tracking-[.16em] text-emerald-700">Request {conversation.requestId}</p><h2 className="mt-2 text-2xl font-semibold">{conversation.subject}</h2></div>
                    <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold capitalize text-emerald-800">{conversation.status}</span>
                  </div>
                  <div className="mt-6 min-h-72 space-y-4" aria-live="polite">
                    {conversation.messages.map((item) => (
                      <div key={item.messageId} className={`flex ${item.senderType === "admin" ? "justify-start" : "justify-end"}`}>
                        <div className={`max-w-[86%] rounded-2xl px-4 py-3 text-sm leading-6 ${item.senderType === "admin" ? "bg-[#eef4ef] text-[#10231b]" : "bg-[#08271b] text-white"}`}>
                          <p className="mb-1 text-[11px] font-semibold uppercase tracking-[.12em] opacity-60">{item.senderType === "admin" ? "Ontiver Support" : "You"}</p>
                          <p>{item.message}</p>
                          <time className="mt-2 block text-[11px] opacity-55">{new Date(item.createdAt).toLocaleString()}</time>
                        </div>
                      </div>
                    ))}
                  </div>
                  <form onSubmit={submitReply} className="mt-6 border-t border-black/10 pt-6">
                    <label htmlFor="support-reply" className="text-sm font-semibold">Continue the conversation</label>
                    <textarea id="support-reply" required minLength={1} maxLength={4000} value={reply} onChange={(event) => setReply(event.target.value)} className="mt-2 min-h-28 w-full resize-y rounded-xl border border-black/15 p-4 text-sm outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100" placeholder="Add information that will help our support team…" />
                    <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                      <button type="button" onClick={() => void loadConversation(session)} disabled={loadingConversation} className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-black/10 px-4 text-sm font-semibold text-black/65 hover:bg-black/[.03] disabled:opacity-60"><RefreshCw className={`h-4 w-4 ${loadingConversation ? "animate-spin" : ""}`} /> Refresh</button>
                      <button type="submit" disabled={busy || !reply.trim()} className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-[#08772a] px-5 text-sm font-semibold text-white hover:bg-[#066321] disabled:opacity-60"><Send className="h-4 w-4" /> {busy ? "Sending…" : "Send message"}</button>
                    </div>
                  </form>
                </>
              ) : (
                <form onSubmit={submitRequest}>
                  <p className="text-xs font-bold uppercase tracking-[.16em] text-emerald-700">Create a request</p>
                  <h2 className="mt-3 text-3xl font-semibold tracking-tight">How can we help?</h2>
                  <p className="mt-3 text-sm leading-6 text-black/55">Provide enough context for the right support specialist to respond. Required fields are marked.</p>
                  <div className="mt-7 grid gap-5 sm:grid-cols-2">
                    <label className="text-sm font-semibold">Full name *<input required minLength={2} autoComplete="name" value={form.name} onChange={(event) => setForm({...form, name: event.target.value})} className="mt-2 min-h-12 w-full rounded-xl border border-black/15 px-4 font-normal outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100" /></label>
                    <label className="text-sm font-semibold">Email address *<input required type="email" autoComplete="email" value={form.email} onChange={(event) => setForm({...form, email: event.target.value})} className="mt-2 min-h-12 w-full rounded-xl border border-black/15 px-4 font-normal outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100" /></label>
                    <label className="text-sm font-semibold">Topic *<select required value={form.topic} onChange={(event) => setForm({...form, topic: event.target.value})} className="mt-2 min-h-12 w-full rounded-xl border border-black/15 bg-white px-4 font-normal outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100">{topics.map((topic) => <option key={topic}>{topic}</option>)}</select></label>
                    <label className="text-sm font-semibold">Subject *<input required minLength={2} maxLength={160} value={form.subject} onChange={(event) => setForm({...form, subject: event.target.value})} className="mt-2 min-h-12 w-full rounded-xl border border-black/15 px-4 font-normal outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100" /></label>
                    <label className="text-sm font-semibold sm:col-span-2">Message *<textarea required minLength={10} maxLength={4000} value={form.message} onChange={(event) => setForm({...form, message: event.target.value})} className="mt-2 min-h-40 w-full resize-y rounded-xl border border-black/15 p-4 font-normal outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100" placeholder="Describe what happened, what you expected, and any non-sensitive error message." /></label>
                    <label className="sr-only" aria-hidden="true">Website<input tabIndex={-1} autoComplete="off" value={form.website} onChange={(event) => setForm({...form, website: event.target.value})} /></label>
                  </div>
                  <p className="mt-5 text-xs leading-5 text-black/50">By submitting, you agree that Ontiver may use this information to respond and operate support. See our <Link className="font-semibold text-emerald-800 underline" to="/privacy">Privacy Policy</Link>.</p>
                  <button type="submit" disabled={busy} className="mt-6 inline-flex min-h-12 items-center gap-2 rounded-xl bg-[#08772a] px-6 text-sm font-semibold text-white hover:bg-[#066321] disabled:opacity-60">{busy ? "Submitting…" : "Submit support request"}<Send className="h-4 w-4" /></button>
                </form>
              )}
              {error ? <p role="alert" className="mt-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">{error}</p> : null}
            </section>

            <aside className="space-y-5">
              <div className="rounded-[2rem] border border-black/10 bg-white p-6">
                <CheckCircle2 className="h-6 w-6 text-emerald-700" />
                <h2 className="mt-4 text-xl font-semibold">Other ways to get help</h2>
                <div className="mt-5 space-y-3 text-sm">
                  <a href="mailto:support@ontiver.com" className="flex min-h-12 items-center justify-between rounded-xl border border-black/10 px-4 font-semibold hover:bg-black/[.02]"><span className="flex items-center gap-2"><Mail className="h-4 w-4" /> Email support</span><ExternalLink className="h-4 w-4 text-black/35" /></a>
                  <a href="https://docs.ontiver.com/faq" className="flex min-h-12 items-center justify-between rounded-xl border border-black/10 px-4 font-semibold hover:bg-black/[.02]"><span className="flex items-center gap-2"><LifeBuoy className="h-4 w-4" /> Help and FAQs</span><ExternalLink className="h-4 w-4 text-black/35" /></a>
                </div>
              </div>
              <div className="rounded-[2rem] bg-[#e9f2eb] p-6">
                <ShieldCheck className="h-6 w-6 text-emerald-800" />
                <h2 className="mt-4 text-lg font-semibold">Security reminder</h2>
                <p className="mt-2 text-sm leading-6 text-black/60">Ontiver Support will never ask for your password, one-time code, complete identity number, card PIN, or API secret.</p>
              </div>
            </aside>
          </div>
        </section>
      </main>
      <CurtainFooter />
    </>
  );
}
