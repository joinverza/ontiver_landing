import { FormEvent, useMemo, useState } from "react";
import { ArrowUpRight, CheckCircle2, ChevronRight, FileText, Mail, ShieldCheck } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import CurtainFooter from "../components/sections/CurtainFooter/CurtainFooter";
import {
  confirmAccountDeletion,
  requestAccountDeletionCode,
} from "../lib/landingApi";

type LegalSection = { heading: string; paragraphs: string[]; bullets?: string[] };

const updated = "17 July 2026";
const documents: Record<string, { title: string; summary: string; sections: LegalSection[] }> = {
  "/privacy": {
    title: "Privacy Policy",
    summary: "How Ontiver collects, uses, shares, safeguards, and deletes personal information.",
    sections: [
      { heading: "Who we are", paragraphs: ["Ontiver Inc., Nigeria (\"Ontiver\", \"we\", \"us\") provides reusable digital identity, verification, credential, consent, and account services. This policy applies to Ontiver's website, mobile applications, dashboards, APIs, and support services. Our Nigeria-first consumer launch is intended for people aged 18 and over."] },
      { heading: "Information we process", paragraphs: ["Depending on the service you use, we process account and contact details, profile information, device and session data, credentials and verification results, consent and sharing history, support communications, security events, and billing or enterprise workspace information."], bullets: ["Google or Apple sign-in may provide a stable provider identifier, verified email status, name, and authorization metadata.", "Push notification tokens, crash diagnostics, and limited product analytics are processed only for delivery, security, reliability, and product improvement.", "We do not sell personal information or use identity documents for advertising."] },
      { heading: "SmileID verification", paragraphs: ["SmileID is Ontiver's exclusive provider for selfie, face, liveness, document, and identity verification. Ontiver does not run independent face matching or liveness models. Verification captures and results are sent to SmileID under our instructions and handled according to the applicable verification flow, contract, and law."] },
      { heading: "Why we use information", paragraphs: ["We use information to create and secure accounts, deliver verification and reusable credentials, record consent, prevent fraud, support users, meet legal and compliance obligations, operate enterprise integrations, improve reliability, and communicate service or security notices. Where consent is the legal basis, it can be withdrawn without affecting earlier lawful processing."] },
      { heading: "Sharing and international processing", paragraphs: ["We disclose only what is needed to service providers such as SmileID, cloud hosting, email, monitoring, push notification, analytics, and social sign-in providers; to an organization you explicitly authorize; or when law and safety require it. Providers must protect information and process it for defined purposes. Some processing may occur outside Nigeria with contractual and technical safeguards."] },
      { heading: "Retention and security", paragraphs: ["We retain information only for the service, security, fraud-prevention, audit, contractual, and legal periods that apply. Retention varies by record type and verification obligation. We use encryption in transit and at rest where appropriate, access controls, audit logs, token rotation, and restricted production access. No system can guarantee absolute security."] },
      { heading: "Your choices and rights", paragraphs: ["You can review account data, change privacy and notification preferences, revoke active sharing, request an export, correct information, or initiate deletion from the Ontiver app. An external deletion flow is also available on our Account Deletion page. Some records may be retained where law, fraud prevention, disputes, or security require it."], bullets: ["Email privacy or rights requests to support@ontiver.com.", "We may verify identity before fulfilling a request.", "You may escalate an unresolved concern to the Nigeria Data Protection Commission where applicable."] },
      { heading: "Contact and changes", paragraphs: ["Questions can be sent to support@ontiver.com. We may update this policy as the service or law changes. Material changes will be communicated through the app, website, or email where appropriate."] },
    ],
  },
  "/terms": {
    title: "Terms of Use",
    summary: "The rules for accessing Ontiver's consumer, enterprise, developer, and verification services.",
    sections: [
      { heading: "Agreement and eligibility", paragraphs: ["These Terms form an agreement between you and Ontiver Inc., Nigeria. You must be at least 18 years old, have legal capacity, and provide accurate information. If you use Ontiver for an organization, you confirm that you are authorized to bind it."] },
      { heading: "Accounts and sign-in", paragraphs: ["Keep your devices, credentials, recovery methods, and linked Apple or Google accounts secure. You are responsible for activity through your account unless you notify us promptly of unauthorized use. Social sign-in is optional; email and password remain available where enabled."] },
      { heading: "Verification and credentials", paragraphs: ["Ontiver coordinates verification through SmileID and may issue or display credentials based on provider results. A credential is not a guarantee of identity, creditworthiness, legality, or future conduct. Organizations remain responsible for their own risk, compliance, and onboarding decisions."] },
      { heading: "Acceptable use", paragraphs: ["Do not impersonate others, submit unlawful or misleading data, bypass controls, scrape or reverse engineer protected services, disrupt availability, misuse API credentials, probe without authorization, or use Ontiver to violate law or another person's rights."] },
      { heading: "Availability, changes, and third parties", paragraphs: ["We may change, suspend, or discontinue features for security, legal, technical, or operational reasons. Provider services, including SmileID, Apple, Google, hosting, and communications platforms, have their own availability and terms."] },
      { heading: "Fees, ownership, and feedback", paragraphs: ["Enterprise or paid services are governed by the applicable order or plan. Ontiver and its licensors own the platform, branding, software, and documentation. You retain rights in your content and grant us the limited rights needed to operate the service. Feedback may be used without restriction or compensation."] },
      { heading: "Liability and termination", paragraphs: ["To the maximum extent permitted by law, the service is provided without implied warranties and Ontiver is not liable for indirect, special, or consequential loss. Any aggregate liability is limited by the applicable agreement and law. We may restrict or terminate misuse; you may stop using Ontiver and request deletion at any time."] },
      { heading: "Governing law and contact", paragraphs: ["These Terms are governed by the laws of the Federal Republic of Nigeria, without limiting mandatory consumer rights. Contact support@ontiver.com before commencing a dispute so we can try to resolve it promptly."] },
    ],
  },
  "/cookies": {
    title: "Cookie Policy",
    summary: "How the Ontiver website uses cookies and similar browser storage.",
    sections: [
      { heading: "What we use", paragraphs: ["Ontiver uses essential cookies or local storage for security, session continuity, language or theme preferences, consent choices, and reliable site operation. Optional analytics may help us understand aggregate usage and diagnose performance."] },
      { heading: "Cookie categories", paragraphs: [], bullets: ["Strictly necessary: authentication, security, fraud prevention, routing, and consent storage.", "Preferences: interface choices such as theme or locale.", "Analytics and diagnostics: limited product usage, errors, performance, and device context with unnecessary personal data disabled."] },
      { heading: "Managing choices", paragraphs: ["You can use available consent controls and browser settings to block or remove cookies. Blocking essential storage can prevent sign-in or other protected features from working. Ontiver does not use identity verification data for behavioral advertising."] },
      { heading: "Contact", paragraphs: ["For questions about cookies or tracking technologies, email support@ontiver.com."] },
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

  async function submit(event: FormEvent) {
    event.preventDefault();
    if (busy) return;
    setBusy(true);
    setError("");
    try {
      if (step === "request") {
        const result = await requestAccountDeletionCode(email);
        setMessage(result.message);
        setStep("confirm");
      } else {
        const result = await confirmAccountDeletion(email, code);
        setMessage(`${result.message} Reference: ${result.requestId}`);
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
        <h3 className="text-card-title font-semibold text-[#002d0e]">Request verified</h3>
        <p className="mt-3 text-body text-[#002d0e]/65">{message}</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="h-fit rounded-[24px] bg-[#edf5eb] p-6 sm:p-8">
      <ShieldCheck className="h-7 w-7 text-[#007d21]" aria-hidden="true" />
      <p className="eyebrow mt-5">Step {step === "request" ? "01" : "02"} / 02</p>
      <h2 className="mt-3 text-card-title font-semibold tracking-[-0.02em] text-[#002d0e]">{step === "request" ? "Verify your email" : "Enter your verification code"}</h2>
      <p className="mt-3 text-body text-[#002d0e]/65">{step === "request" ? "We will send a six-digit code if an eligible Ontiver account uses this address." : message}</p>
      <label className="mt-6 block text-sm font-medium" htmlFor="deletion-email">Account email</label>
      <input id="deletion-email" type="email" required autoComplete="email" value={email} disabled={step === "confirm"} onChange={(event) => setEmail(event.target.value)} className="mt-2 min-h-12 w-full rounded-xl border border-[#dde6dc] bg-white px-4 text-body outline-none focus:border-[#009311] focus:ring-2 focus:ring-[#009311]/10 disabled:bg-white/60 disabled:text-[#002d0e]/50" />
      {step === "confirm" && (
        <>
          <label className="mt-5 block text-sm font-medium" htmlFor="deletion-code">Six-digit code</label>
          <input id="deletion-code" required inputMode="numeric" autoComplete="one-time-code" pattern="[0-9]{6}" maxLength={6} value={code} onChange={(event) => setCode(event.target.value.replace(/\D/g, ""))} className="mt-2 min-h-12 w-full rounded-xl border border-[#dde6dc] bg-white px-4 text-body tracking-[.35em] outline-none focus:border-[#009311] focus:ring-2 focus:ring-[#009311]/10" />
        </>
      )}
      <input name="website" tabIndex={-1} autoComplete="off" className="hidden" />
      {error && <p role="alert" className="mt-4 rounded-xl bg-red-50 p-3 text-sm text-red-800">{error}</p>}
      <button type="submit" disabled={busy} className="button-primary mt-6 w-full disabled:cursor-wait disabled:opacity-60">{busy ? "Submitting..." : step === "request" ? "Send verification code" : "Confirm deletion request"}</button>
      <p className="mt-4 text-meta text-[#002d0e]/55">You can also initiate deletion inside the Ontiver app. We may retain limited records where law, fraud prevention, security, or dispute resolution requires it.</p>
    </form>
  );
}

export default function LegalPage() {
  const { pathname } = useLocation();
  const isDeletion = pathname === "/account-deletion";
  const isCentre = pathname === "/legal";
  const document = useMemo(() => documents[pathname] ?? documents["/privacy"], [pathname]);
  const title = isDeletion ? "Account Deletion" : isCentre ? "Legal Centre" : document.title;
  const summary = isDeletion ? "Delete an Ontiver account from the app or through this email-verified request." : isCentre ? "Policies, terms, privacy choices, and contact information for Ontiver services." : document.summary;

  return (
    <>
      <main className="min-h-screen bg-white text-[#002d0e]">
        <header className="page-intro">
          <div className="site-container">
            <p className="eyebrow inline-flex items-center gap-2"><ShieldCheck size={16} aria-hidden="true" /> Ontiver Trust &amp; Legal</p>
            <h1 className="mt-5 max-w-[900px] text-page-hero font-semibold tracking-[-0.045em]">{title}</h1>
            <p className="mt-6 max-w-[640px] text-subtitle text-[#002d0e]/65">{summary}</p>
            <p className="mt-7 inline-flex items-center gap-2 text-meta text-[#002d0e]/55"><span className="h-1.5 w-1.5 rounded-full bg-[#009311]" aria-hidden="true" /> Effective and last updated {updated}</p>
          </div>
        </header>
        <section className="section-space">
          <div className="site-container grid items-start gap-10 lg:grid-cols-[230px_minmax(0,1fr)] lg:gap-14">
            <aside className="min-w-0 lg:sticky lg:top-32">
              <p className="eyebrow mb-4">Trust &amp; transparency</p>
              <nav className="flex gap-2 overflow-x-auto pb-2 lg:block lg:space-y-1 lg:pb-0" aria-label="Legal navigation">
                {legalLinks.map(([label, href]) => (
                  <Link key={href} to={href} aria-current={pathname === href ? "page" : undefined} className={`flex min-h-12 shrink-0 items-center justify-between gap-3 whitespace-nowrap rounded-xl px-4 text-sm font-medium transition-colors ${pathname === href ? "bg-[#edf5eb] text-[#007d21]" : "text-[#002d0e]/60 hover:bg-[#f7f7f7] hover:text-[#002d0e]"}`}>{label}<ChevronRight size={16} className="hidden lg:block" aria-hidden="true" /></Link>
                ))}
              </nav>
              {!isCentre && !isDeletion && (
                <nav className="mt-8 hidden border-t border-[#dde6dc] pt-7 lg:block" aria-label="On this page">
                  <p className="eyebrow mb-3">On this page</p>
                  <ol className="space-y-3">
                    {document.sections.map((section, index) => <li key={section.heading}><a className="flex gap-3 text-sm leading-6 text-[#002d0e]/55 transition-colors hover:text-[#007d21]" href={`#legal-section-${index + 1}`}><span className="text-meta tabular-nums text-[#007d21]">{String(index + 1).padStart(2, "0")}</span>{section.heading}</a></li>)}
                  </ol>
                </nav>
              )}
            </aside>
            <article className="legal-content min-w-0">
              {isCentre ? (
                <>
                  <div className="grid gap-5 sm:grid-cols-2">
                    {legalLinks.slice(0, 4).map(([label, href]) => (
                      <Link key={href} to={href} className="surface-card group flex flex-col items-start transition-colors hover:border-[#009311]/40 hover:bg-[#edf5eb]/40">
                        <FileText size={24} className="text-[#007d21]" aria-hidden="true" />
                        <h2 className="mt-6 text-card-title font-semibold tracking-[-0.02em]">{label}</h2>
                        <p className="mt-3 text-body text-[#002d0e]/60">Review {label.toLowerCase()} and the choices available to you.</p>
                        <span className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-[#007d21]">Open <ArrowUpRight size={17} aria-hidden="true" /></span>
                      </Link>
                    ))}
                  </div>
                  <div className="mt-8 rounded-[24px] bg-[#002d0e] p-7 text-white sm:p-10">
                    <h2 className="text-card-title font-semibold tracking-[-0.02em]">Questions or rights requests?</h2>
                    <p className="mt-4 max-w-[600px] text-body text-white/65">Contact Ontiver Support without signing in. Your request enters our audited administrator queue and can continue securely on the website or by email.</p>
                    <Link to="/support" className="mt-7 inline-flex min-h-12 items-center gap-3 rounded-full bg-white px-6 text-sm font-semibold text-[#002d0e]">Open support <ArrowUpRight size={17} aria-hidden="true" /></Link>
                  </div>
                </>
              ) : isDeletion ? (
                <div className="grid items-start gap-10 xl:grid-cols-[minmax(0,1fr)_340px]">
                  <div className="space-y-8">
                    <section>
                      <p className="eyebrow mb-3">Account &amp; data</p>
                      <h2 className="text-card-title font-semibold tracking-[-0.02em]">Before you begin</h2>
                      <p className="mt-4 text-body text-[#002d0e]/65">Deleting your account removes access to your Ontiver wallet and starts controlled deletion of eligible profile, credential, consent, sharing, support, and activity data. Active Apple or Google grants are revoked. The process cannot be undone after completion.</p>
                    </section>
                    <section className="border-t border-[#dde6dc] pt-8">
                      <h2 className="text-card-title font-semibold tracking-[-0.02em]">Fastest option: use the app</h2>
                      <p className="mt-4 text-body text-[#002d0e]/65">Open Settings → Privacy &amp; data → Delete account. The app requires step-up authentication and displays your request reference.</p>
                    </section>
                    <section className="border-t border-[#dde6dc] pt-8">
                      <h2 className="text-card-title font-semibold tracking-[-0.02em]">What happens next</h2>
                      <ol className="mt-5 space-y-4">
                        {["We verify that you control the account email.", "The request enters a privacy and retention review.", "Eligible data is removed and linked sign-in grants are revoked.", "Limited evidence may remain only where law or security requires it."].map((item, index) => <li key={item} className="flex gap-3 text-body text-[#002d0e]/65"><span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#edf5eb] text-meta font-semibold text-[#007d21]">{index + 1}</span>{item}</li>)}
                      </ol>
                    </section>
                    <p className="flex flex-wrap items-center gap-2 border-t border-[#dde6dc] pt-6 text-sm text-[#002d0e]/55"><Mail size={16} aria-hidden="true" /> Need help? <Link className="font-semibold text-[#007d21] underline underline-offset-4" to="/support">Open support</Link></p>
                  </div>
                  <DeletionPanel />
                </div>
              ) : (
                <div className="max-w-[800px] space-y-9">
                  {document.sections.map((section, index) => (
                    <section id={`legal-section-${index + 1}`} key={section.heading} className="scroll-mt-32 border-b border-[#dde6dc] pb-9 last:border-b-0 last:pb-0">
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
