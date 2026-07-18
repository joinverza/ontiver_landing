import { FormEvent, useMemo, useState } from "react";
import { CheckCircle2, ChevronRight, Mail, ShieldCheck } from "lucide-react";
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
    event.preventDefault(); setBusy(true); setError("");
    try {
      if (step === "request") {
        const result = await requestAccountDeletionCode(email);
        setMessage(result.message); setStep("confirm");
      } else {
        const result = await confirmAccountDeletion(email, code);
        setMessage(`${result.message} Reference: ${result.requestId}`); setStep("done");
      }
    } catch (value) { setError(value instanceof Error ? value.message : "We could not submit this request."); }
    finally { setBusy(false); }
  }

  if (step === "done") return <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-6 text-emerald-950"><CheckCircle2 className="mb-3 h-7 w-7"/><h3 className="font-bold">Request verified</h3><p className="mt-2 text-sm leading-6">{message}</p></div>;
  return <form onSubmit={submit} className="rounded-3xl border border-black/10 bg-white p-6 shadow-[0_20px_70px_rgba(4,26,16,.08)] sm:p-8">
    <h2 className="text-xl font-semibold text-[#061b13]">{step === "request" ? "Verify your email" : "Enter your verification code"}</h2>
    <p className="mt-2 text-sm leading-6 text-black/60">{step === "request" ? "We will send a six-digit code if an eligible Ontiver account uses this address." : message}</p>
    <label className="mt-6 block text-sm font-semibold" htmlFor="deletion-email">Account email</label>
    <input id="deletion-email" type="email" required autoComplete="email" value={email} disabled={step === "confirm"} onChange={(e)=>setEmail(e.target.value)} className="mt-2 min-h-12 w-full rounded-xl border border-black/15 px-4 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 disabled:bg-black/5"/>
    {step === "confirm" && <><label className="mt-5 block text-sm font-semibold" htmlFor="deletion-code">Six-digit code</label><input id="deletion-code" required inputMode="numeric" pattern="[0-9]{6}" maxLength={6} value={code} onChange={(e)=>setCode(e.target.value.replace(/\D/g,""))} className="mt-2 min-h-12 w-full rounded-xl border border-black/15 px-4 tracking-[.35em] outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"/></>}
    <input name="website" tabIndex={-1} autoComplete="off" className="hidden" />
    {error && <p role="alert" className="mt-4 rounded-xl bg-red-50 p-3 text-sm text-red-800">{error}</p>}
    <button disabled={busy} className="mt-6 min-h-12 w-full rounded-xl bg-[#061b13] px-5 font-semibold text-white transition hover:bg-emerald-900 disabled:opacity-60">{busy ? "Submitting…" : step === "request" ? "Send verification code" : "Confirm deletion request"}</button>
    <p className="mt-4 text-xs leading-5 text-black/50">You can also initiate deletion inside the Ontiver app. We may retain limited records where law, fraud prevention, security, or dispute resolution requires it.</p>
  </form>;
}

export default function LegalPage() {
  const { pathname } = useLocation();
  const isDeletion = pathname === "/account-deletion";
  const isCentre = pathname === "/legal";
  const document = useMemo(() => documents[pathname] ?? documents["/privacy"], [pathname]);
  const title = isDeletion ? "Account Deletion" : isCentre ? "Legal Centre" : document.title;
  const summary = isDeletion ? "Delete an Ontiver account from the app or through this email-verified request." : isCentre ? "Policies, terms, privacy choices, and contact information for Ontiver services." : document.summary;

  return <>
    <main className="min-h-screen bg-[#f5f8f5] pb-24 pt-32 text-[#10231b] sm:pt-40">
      <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
        <div className="rounded-[2rem] bg-[#061b13] px-6 py-10 text-white sm:px-10 sm:py-14">
          <div className="flex items-center gap-2 text-sm font-semibold text-emerald-300"><ShieldCheck className="h-4 w-4"/> Ontiver Trust & Legal</div>
          <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight sm:text-6xl">{title}</h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-white/70 sm:text-lg">{summary}</p>
          <p className="mt-6 text-xs uppercase tracking-[.16em] text-white/45">Effective and last updated {updated}</p>
        </div>
        <div className="mt-8 grid gap-8 lg:grid-cols-[250px_minmax(0,1fr)]">
          <aside className="h-fit rounded-2xl border border-black/10 bg-white p-3 lg:sticky lg:top-28" aria-label="Legal navigation">
            {legalLinks.map(([label, href]) => <Link key={href} to={href} className={`flex min-h-11 items-center justify-between rounded-xl px-3 text-sm font-medium ${pathname===href ? "bg-emerald-50 text-emerald-900" : "text-black/60 hover:bg-black/[.03] hover:text-black"}`}>{label}<ChevronRight className="h-4 w-4"/></Link>)}
          </aside>
          <article className="min-w-0 rounded-[2rem] border border-black/10 bg-white p-6 sm:p-10">
            {isCentre ? <><div className="grid gap-4 sm:grid-cols-2">{legalLinks.slice(0,4).map(([label,href])=><Link key={href} to={href} className="group rounded-2xl border border-black/10 p-5 transition hover:border-emerald-500 hover:bg-emerald-50/40"><h2 className="font-semibold">{label}</h2><p className="mt-2 text-sm leading-6 text-black/55">Review {label.toLowerCase()} and the choices available to you.</p><span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-emerald-800">Open <ChevronRight className="h-4 w-4 transition group-hover:translate-x-1"/></span></Link>)}</div><div className="mt-8 rounded-2xl bg-[#eef5ef] p-6"><h2 className="text-xl font-semibold">Questions or rights requests?</h2><p className="mt-2 text-sm leading-6 text-black/60">Contact Ontiver Support without signing in. Your request enters our audited administrator queue and can continue securely on the website or by email.</p><Link to="/support" className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-xl bg-[#08772a] px-5 text-sm font-semibold text-white">Open support <ChevronRight className="h-4 w-4" /></Link></div></> : isDeletion ? <div className="grid gap-10 xl:grid-cols-[minmax(0,1fr)_380px]"><div className="space-y-7"><section><h2 className="text-2xl font-semibold">Before you begin</h2><p className="mt-3 leading-7 text-black/65">Deleting your account removes access to your Ontiver wallet and starts controlled deletion of eligible profile, credential, consent, sharing, support, and activity data. Active Apple or Google grants are revoked. The process cannot be undone after completion.</p></section><section><h2 className="text-2xl font-semibold">Fastest option: use the app</h2><p className="mt-3 leading-7 text-black/65">Open Settings → Privacy & data → Delete account. The app requires step-up authentication and displays your request reference.</p></section><section><h2 className="text-2xl font-semibold">What happens next</h2><ul className="mt-3 space-y-3 text-black/65"><li>1. We verify that you control the account email.</li><li>2. The request enters a privacy and retention review.</li><li>3. Eligible data is removed and linked sign-in grants are revoked.</li><li>4. Limited evidence may remain only where law or security requires it.</li></ul></section><p className="flex items-center gap-2 text-sm text-black/55"><Mail className="h-4 w-4"/> Need help? <Link className="font-semibold text-emerald-800 underline" to="/support">Open support</Link></p></div><DeletionPanel/></div> : <div className="space-y-9">{document.sections.map(section=><section key={section.heading}><h2 className="text-2xl font-semibold tracking-tight">{section.heading}</h2>{section.paragraphs.map(p=><p key={p} className="mt-3 leading-7 text-black/65">{p}</p>)}{section.bullets && <ul className="mt-4 space-y-3">{section.bullets.map(item=><li key={item} className="flex gap-3 leading-7 text-black/65"><span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-600"/>{item}</li>)}</ul>}</section>)}</div>}
          </article>
        </div>
      </div>
    </main>
    <CurtainFooter />
  </>;
}
