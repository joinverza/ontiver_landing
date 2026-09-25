import { FormEvent, useMemo, useState } from "react";
import { ArrowUpRight, CheckCircle2, ChevronDown, ChevronRight, FileText, Mail, ShieldCheck } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import CurtainFooter from "../components/sections/CurtainFooter/CurtainFooter";
import { imagery } from "../data/imagery";
import ContextPhoto from "../components/ui/ContextPhoto";
import {
  confirmAccountDeletion,
  requestAccountDeletionCode,
} from "../lib/landingApi";

type LegalSection = { heading: string; paragraphs: string[]; bullets?: string[] };

const documents: Record<string, { title: string; summary: string; sections: LegalSection[] }> = {
  "/privacy": {
    title: "Privacy Policy",
    summary: "Our privacy policy is awaiting qualified legal review. The sections below show what the reviewed document will cover.",
    sections: [
      { heading: "Who we are", paragraphs: ["Entity and contact details awaiting confirmation."] },
      { heading: "Information we process", paragraphs: ["Information categories and processing details awaiting review."] },
      { heading: "Verification providers", paragraphs: ["Provider relationships and verification processing details awaiting confirmation."] },
      { heading: "Why we use information", paragraphs: ["Purposes and applicable legal bases awaiting review."] },
      { heading: "Sharing and international processing", paragraphs: ["Recipients, processing locations, and safeguards awaiting review."] },
      { heading: "Retention and security", paragraphs: ["Retention periods and security disclosures awaiting review."] },
      { heading: "Your choices and rights", paragraphs: ["Applicable choices, rights, and request procedures awaiting review."] },
      { heading: "Contact and changes", paragraphs: ["Policy contact details and update procedures awaiting review."] },
    ],
  },
  "/terms": {
    title: "Terms of Use",
    summary: "Our terms are awaiting qualified legal review. These headings are a document outline, not published terms.",
    sections: [
      { heading: "Agreement and eligibility", paragraphs: ["Contracting entity and eligibility requirements awaiting review."] },
      { heading: "Accounts and sign-in", paragraphs: ["Account responsibilities and sign-in terms awaiting review."] },
      { heading: "Verification and credentials", paragraphs: ["Verification scope and credential terms awaiting review."] },
      { heading: "Acceptable use", paragraphs: ["Acceptable-use requirements awaiting review."] },
      { heading: "Availability and third parties", paragraphs: ["Service availability and third-party terms awaiting review."] },
      { heading: "Fees, ownership, and feedback", paragraphs: ["Commercial and intellectual-property terms awaiting review."] },
      { heading: "Liability and termination", paragraphs: ["Liability and termination provisions awaiting review."] },
      { heading: "Governing law and contact", paragraphs: ["Applicable law, dispute procedures, and contact details awaiting review."] },
    ],
  },
  "/cookies": {
    title: "Cookie Policy",
    summary: "Our cookie policy is awaiting a confirmed storage inventory and qualified legal review.",
    sections: [
      { heading: "What we use", paragraphs: ["Cookies and similar browser storage awaiting inventory confirmation."] },
      { heading: "Cookie categories", paragraphs: ["Categories, purposes, providers, and durations awaiting review."] },
      { heading: "Managing choices", paragraphs: ["Available controls and their effects awaiting review."] },
      { heading: "Contact", paragraphs: ["Policy contact information awaiting review."] },
    ],
  },
};

const legalLinks = [
  ["Privacy Policy", "/privacy"], ["Terms of Use", "/terms"], ["Cookie Policy", "/cookies"],
  ["Account Deletion", "/account-deletion"], ["Legal Centre", "/legal"],
];

function DeletionPanel() {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [step, setStep] = useState<"request" | "confirm" | "done">("request");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [confirmed, setConfirmed] = useState(false);

  async function submit(event: FormEvent) {
    event.preventDefault();
    if (busy || (step === "confirm" && !confirmed)) return;
    setBusy(true);
    setError("");
    try {
      if (step === "request") {
        const result = await requestAccountDeletionCode(email);
        setMessage(result?.message || "If this email is eligible, a six-digit verification code will be sent. Enter it below to continue.");
        setStep("confirm");
      } else {
        const result = await confirmAccountDeletion(email, code);
        if (!result?.requestId) throw new Error("We could not confirm a request reference. Please contact support before trying again.");
        setMessage(`${result.message || "Your deletion request has been received."} Reference: ${result.requestId}`);
        setStep("done");
      }
    } catch (value) {
      setError(value instanceof Error ? value.message : "We could not submit this request.");
    } finally {
      setBusy(false);
    }
  }

  if (step === "done") {
    return (
      <div role="status" className="h-fit rounded-[24px] border border-[#c7dfc4] bg-[#edf5eb] p-6 sm:p-8">
        <CheckCircle2 className="mb-5 h-8 w-8 text-[#009311]" aria-hidden="true" />
        <h3 className="text-card-title font-semibold text-[#002d0e]">Deletion request received</h3>
        <p className="mt-3 text-body text-[#002d0e]/65">{message}</p>
        <p className="mt-3 text-body text-[#002d0e]/65">This acknowledges your request; it does not confirm that account deletion has finished. If you did not make this request, contact support immediately.</p>
        <Link to="/support" className="mt-5 inline-flex text-body font-medium text-[#007d21] underline underline-offset-4">Contact support</Link>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="h-fit rounded-[24px] bg-[#edf5eb] p-6 sm:p-8">
      <ShieldCheck className="h-7 w-7 text-[#007d21]" aria-hidden="true" />
      <p className="eyebrow mt-5">Step {step === "request" ? "01" : "02"} / 02</p>
      <h2 className="mt-3 text-card-title font-semibold tracking-[-0.02em] text-[#002d0e]">{step === "request" ? "Verify your email" : "Enter your verification code"}</h2>
      <p className="mt-3 text-body text-[#002d0e]/65">{step === "request" ? "Enter your email to start the account deletion process." : message}</p>
      {step === "request" && <p className="mt-3 text-meta text-[#002d0e]/55">A six-digit code is sent only if the email is eligible.</p>}
      <label className="mt-6 block text-sm font-medium" htmlFor="deletion-email">Account email</label>
      <input id="deletion-email" type="email" required autoComplete="email" value={email} disabled={step === "confirm"} onChange={(event) => setEmail(event.target.value)} className="mt-2 min-h-12 w-full rounded-xl border border-[#dde6dc] bg-white px-4 text-body outline-none focus:border-[#009311] focus:ring-2 focus:ring-[#009311]/10 disabled:bg-white/60 disabled:text-[#002d0e]/50" />
      {step === "confirm" && (
        <>
          <label className="mt-5 block text-sm font-medium" htmlFor="deletion-code">Six-digit code</label>
          <input id="deletion-code" required inputMode="numeric" autoComplete="one-time-code" pattern="[0-9]{6}" maxLength={6} value={code} onChange={(event) => setCode(event.target.value.replace(/\D/g, ""))} className="mt-2 min-h-12 w-full rounded-xl border border-[#dde6dc] bg-white px-4 text-body tracking-[.35em] outline-none focus:border-[#009311] focus:ring-2 focus:ring-[#009311]/10" />
          <label className="mt-5 flex items-start gap-3 text-sm leading-relaxed"><input type="checkbox" required checked={confirmed} onChange={(event) => setConfirmed(event.target.checked)} className="mt-1 h-4 w-4 shrink-0 accent-[#009311]" /><span>I want to request permanent account deletion. I understand that submitting this request does not confirm completion.</span></label>
        </>
      )}
      <input name="website" tabIndex={-1} autoComplete="off" className="hidden" />
      {error && <p role="alert" className="mt-4 rounded-xl bg-red-50 p-3 text-sm text-red-800">{error}</p>}
      <button type="submit" disabled={busy} className="button-primary mt-6 w-full disabled:cursor-wait disabled:opacity-60">{busy ? "Submitting..." : step === "request" ? "Send verification code" : "Confirm deletion request"}</button>
      {step === "confirm" && <button type="button" disabled={busy} onClick={() => { setStep("request"); setCode(""); setConfirmed(false); setMessage(""); setError(""); }} className="mt-4 text-sm font-medium text-[#007d21] underline underline-offset-4">Use another email or request a new code</button>}
    </form>
  );
}

export default function LegalPage() {
  const { pathname } = useLocation();
  const isDeletion = pathname === "/account-deletion";
  const isCentre = pathname === "/legal";
  const document = useMemo(() => documents[pathname] ?? documents["/privacy"], [pathname]);
  const title = isDeletion ? "Account Deletion" : isCentre ? "Legal Centre" : document.title;
  const summary = isDeletion ? "Enter your email to start the account deletion process." : isCentre ? "Legal documents, privacy questions, and account deletion requests." : document.summary;

  return (
    <>
      <main className="min-h-screen bg-white text-[#002d0e]">
        <header className="page-intro">
          <div className={`site-container ${isCentre ? "grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20" : ""}`}>
            <div>
            <p className="eyebrow inline-flex items-center gap-2"><ShieldCheck size={16} aria-hidden="true" /> Ontiver Trust &amp; Legal</p>
            <h1 className="mt-5 max-w-[1100px] text-page-hero font-medium">{title}</h1>
            <p className="mt-6 max-w-[640px] text-subtitle text-[#002d0e]/65">{summary}</p>
            {!isDeletion && <p className="mt-7 inline-flex items-center gap-2 text-meta font-medium text-[#526058]"><span className="h-1.5 w-1.5 rounded-full bg-[#009311]" aria-hidden="true" /> Awaiting qualified legal review</p>}
            </div>
            {isCentre && <div data-scroll-reveal><ContextPhoto image={imagery.candidateReview} size="wide" /></div>}
          </div>
        </header>
        <section className="pb-20 lg:pb-32">
          <div className="site-container grid items-start gap-10 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-14">
            <aside className="min-w-0 lg:sticky lg:top-28">
              {!isCentre && !isDeletion && (
                <>
                <details className="group mb-5 border-b border-[#dde6dc] pb-5 lg:hidden">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-body font-medium [&::-webkit-details-marker]:hidden">Table of contents<ChevronDown size={20} className="transition-transform group-open:rotate-180" aria-hidden="true" /></summary>
                  <nav aria-label="Mobile table of contents" className="mt-5"><ol className="space-y-3">{document.sections.map((section, index) => <li key={section.heading}><a href={`#legal-section-${index + 1}`} className="block text-sm leading-relaxed text-[#526058] hover:text-[#007d21]">{index + 1}. {section.heading}</a></li>)}</ol></nav>
                </details>
                <nav className="hidden lg:block" aria-label="On this page">
                  <p className="mb-5 border-b border-[#dde6dc] pb-4 text-body font-medium">Table of contents</p>
                  <ol className="space-y-4">
                    {document.sections.map((section, index) => <li key={section.heading}><a className="flex gap-3 text-sm leading-6 text-[#002d0e]/55 transition-colors hover:text-[#007d21]" href={`#legal-section-${index + 1}`}><span className="text-meta tabular-nums text-[#007d21]">{String(index + 1).padStart(2, "0")}</span>{section.heading}</a></li>)}
                  </ol>
                </nav>
                </>
              )}
              <details className="group lg:hidden">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-3 rounded-full border border-[#cbd5c7] px-5 py-3 text-body font-medium [&::-webkit-details-marker]:hidden">Legal documents<ChevronDown size={20} className="transition-transform group-open:rotate-180" aria-hidden="true" /></summary>
                <nav className="mt-3 space-y-1" aria-label="Mobile legal navigation">{legalLinks.map(([label, href]) => <Link key={href} to={href} aria-current={pathname === href ? "page" : undefined} className="block rounded-lg px-4 py-3 text-body text-[#526058] hover:bg-[#edf5eb]">{label}</Link>)}</nav>
              </details>
              <nav className={`${!isCentre && !isDeletion ? "mt-8 border-t border-[#dde6dc] pt-6" : ""} hidden space-y-1 lg:block`} aria-label="Legal navigation">
                {legalLinks.map(([label, href]) => <Link key={href} to={href} aria-current={pathname === href ? "page" : undefined} className={`flex min-h-12 items-center justify-between gap-3 rounded-xl px-3 text-sm transition-colors ${pathname === href ? "bg-[#edf5eb] text-[#007d21]" : "text-[#002d0e]/60 hover:bg-[#f5f6f3] hover:text-[#002d0e]"}`}>{label}<ChevronRight size={16} aria-hidden="true" /></Link>)}
              </nav>
            </aside>
            <article className="legal-content min-w-0">
              {isCentre ? (
                <>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {legalLinks.slice(0, 4).map(([label, href]) => (
                      <Link key={href} to={href} className="group flex flex-col items-start rounded-2xl bg-[#f5f6f3] p-5 transition-colors hover:bg-[#edf5eb]">
                        <FileText size={24} className="text-[#007d21]" aria-hidden="true" />
                        <h2 className="mt-6 text-card-title font-medium">{label}</h2>
                        <p className="mt-3 text-meta text-[#526058]">{href === "/account-deletion" ? "Email-verified request form" : "Review pending"}</p>
                        <span className="mt-5 grid size-10 self-end place-items-center rounded-full bg-white"><ArrowUpRight size={20} aria-hidden="true" /></span>
                      </Link>
                    ))}
                  </div>
                  <div className="mt-10 flex flex-wrap items-center justify-between gap-6 border-t border-[#dde6dc] pt-8">
                    <h2 className="text-card-title font-medium">Questions or rights requests?</h2>
                    <Link to="/support" className="button-secondary">Open support <ArrowUpRight size={17} aria-hidden="true" /></Link>
                  </div>
                </>
              ) : isDeletion ? (
                <div className="grid items-start gap-10 xl:grid-cols-[minmax(0,1fr)_340px]">
                  <div className="space-y-8">
                    <section>
                      <p className="eyebrow mb-3">Account &amp; data</p>
                      <h2 className="text-card-title font-semibold tracking-[-0.02em]">Before you begin</h2>
                      <p className="mt-4 text-body text-[#002d0e]/65">This form verifies your email and submits a deletion request. Keep the request reference so support can help you check its progress.</p>
                    </section>
                    <section className="border-t border-[#dde6dc] pt-8">
                      <h2 className="text-card-title font-semibold tracking-[-0.02em]">Before confirming</h2>
                      <p className="mt-4 text-body text-[#002d0e]/65">You are asking to permanently delete your account. Contact support if you need to clarify the scope of deletion, data retention, or the status of an existing request.</p>
                    </section>
                    <section className="border-t border-[#dde6dc] pt-8">
                      <h2 className="text-card-title font-semibold tracking-[-0.02em]">What happens next</h2>
                      <ol className="mt-5 space-y-4">
                        {["Request a code for your account email.", "Enter the six-digit code and confirm your deletion request.", "Save the request reference and any response shown."].map((item, index) => <li key={item} className="flex gap-3 text-body text-[#002d0e]/65"><span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#edf5eb] text-meta font-semibold text-[#007d21]">{index + 1}</span>{item}</li>)}
                      </ol>
                    </section>
                    <p className="flex flex-wrap items-center gap-2 border-t border-[#dde6dc] pt-6 text-sm text-[#002d0e]/55"><Mail size={16} aria-hidden="true" /> Need help? <Link className="font-semibold text-[#007d21] underline underline-offset-4" to="/support">Open support</Link></p>
                  </div>
                  <DeletionPanel />
                </div>
              ) : (
                <div className="max-w-[900px] space-y-10">
                  {document.sections.map((section, index) => (
                    <section id={`legal-section-${index + 1}`} key={section.heading} className="scroll-mt-28">
                      <div className="flex items-baseline gap-4">
                        <span className="text-meta font-medium tabular-nums text-[#007d21]">{String(index + 1).padStart(2, "0")}</span>
                        <h2 className="text-card-title font-semibold tracking-[-0.02em]">{section.heading}</h2>
                      </div>
                      {section.paragraphs.map((paragraph) => <p key={paragraph} className="mt-4 text-body leading-[1.85] text-[#002d0e]/65">{paragraph}</p>)}
                      {section.bullets && <ul className="mt-5 space-y-3">{section.bullets.map((item) => <li key={item} className="flex gap-3 text-body text-[#002d0e]/65"><span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#009311]" aria-hidden="true" />{item}</li>)}</ul>}
                    </section>
                  ))}
                  <div className="rounded-[24px] bg-[#edf5eb] p-6 sm:p-8">
                    <p className="text-card-title font-semibold tracking-[-0.02em]">Questions or rights requests?</p>
                    <Link to="/support" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#007d21]">Open support <ArrowUpRight size={17} aria-hidden="true" /></Link>
                  </div>
                </div>
              )}
            </article>
          </div>
        </section>
      </main>
      <CurtainFooter />
    </>
  );
}
