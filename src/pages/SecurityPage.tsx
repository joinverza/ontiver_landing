import { ArrowUpRight, BadgeCheck, Check, Eye, FileCheck2, Fingerprint, History, KeyRound, LockKeyhole, ShieldCheck, SlidersHorizontal, Users } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "../components/sections/Footer/Footer";

const principles = [
  { icon: Fingerprint, title: "Less repeated exposure", copy: "Ontiver is designed to reduce repeated collection and movement of raw identity documents by helping supported businesses work with relevant verification proof." },
  { icon: ShieldCheck, title: "A clear sharing decision", copy: "A proof request should explain who is asking, why the information is needed, and which claims are involved before you approve or decline." },
  { icon: BadgeCheck, title: "Evidence with context", copy: "Verification providers perform the selected checks. Ontiver connects the outcomes to consent, review, and proof reuse within the supported workflow." },
];

const reviewAreas = [
  { icon: LockKeyhole, title: "Data protection", copy: "Review encryption, data flows, and the handling of sensitive information across the agreed deployment and its providers." },
  { icon: KeyRound, title: "Access and approvals", copy: "Define reviewer roles, access scope, and the approvals needed for sensitive actions and production access." },
  { icon: History, title: "Logs and monitoring", copy: "Confirm the events, audit records, and monitoring needed to investigate activity and support your review process." },
  { icon: SlidersHorizontal, title: "Retention and lifecycle", copy: "Agree how retention, proof expiry, revocation, and deletion requests apply to each type of record." },
];

const sharingSteps = [
  { title: "A business requests", copy: "The request identifies a purpose and the claims it needs." },
  { title: "You decide", copy: "Review the request and approve or decline the proposed sharing." },
  { title: "The proof is checked", copy: "The supported workflow checks the relevant proof and its validity." },
  { title: "Sharing stays in scope", copy: "Approved claims and sharing activity stay connected to the request." },
];

export default function SecurityPage() {
  return (
    <main className="bg-white text-[#002d0e]">
      <section className="page-intro">
        <div className="site-container grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
          <div>
            <p className="eyebrow">Security and trust</p>
            <h1 className="mt-5 max-w-[16ch] text-page-hero font-semibold">Security and privacy by design.</h1>
            <p className="mt-6 max-w-xl text-subtitle text-[#526058]">Ontiver is designed to help businesses verify people while reducing unnecessary handling of sensitive identity documents.</p>
            <div className="mt-8 flex flex-wrap gap-3"><a href="#your-controls" className="button-primary">Explore your controls <ArrowUpRight size={17} aria-hidden="true" /></a><Link to="/privacy" className="button-secondary">Read our Privacy Policy</Link></div>
          </div>
          <div className="rounded-[28px] border border-[#d8e4d5] bg-white p-7 sm:p-9">
            <span className="mb-7 grid size-14 place-items-center rounded-2xl bg-[#edf5eb] text-[#007d21]"><ShieldCheck size={27} aria-hidden="true" /></span>
            <h2 className="text-card-title font-semibold">Consent comes first.</h2>
            <p className="mt-3 text-body text-[#526058]">The information a proof-sharing request should make clear.</p>
            <dl className="mt-6 divide-y divide-[#e2e9df] border-y border-[#e2e9df]">
              {[["Who is requesting", "The supported business"], ["Why they need it", "The purpose of verification"], ["What will be shared", "The relevant approved claims"], ["Your choice", "Approve or decline"]].map(([label, value]) => <div key={label} className="py-4"><dt className="text-meta text-[#526058]">{label}</dt><dd className="mt-1 text-body font-medium">{value}</dd></div>)}
            </dl>
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="site-container">
          <div className="max-w-2xl"><p className="eyebrow">The approach</p><h2 className="section-heading mt-4">Built around consent, control, and reduced exposure.</h2></div>
          <div className="mt-12 grid gap-8 md:grid-cols-3 lg:gap-12">
            {principles.map(({ icon: Icon, title, copy }) => <article key={title}><span className="mb-6 grid size-12 place-items-center rounded-2xl bg-[#edf5eb] text-[#007d21]"><Icon size={23} aria-hidden="true" /></span><h3 className="text-card-title font-semibold">{title}</h3><p className="mt-4 text-body text-[#526058]">{copy}</p></article>)}
          </div>
        </div>
      </section>

      <section id="your-controls" className="section-space bg-[#f7f9f6]">
        <div className="site-container">
          <div className="mb-12 max-w-2xl"><p className="eyebrow">For people. For teams.</p><h2 className="section-heading mt-4">Trust works both ways.</h2><p className="mt-5 text-subtitle text-[#526058]">The platform is designed to give people a clear sharing choice and organizations a reviewable verification process.</p></div>
          <div className="grid gap-6 lg:grid-cols-2">
            <article className="rounded-[28px] bg-[#002d0e] p-7 text-white sm:p-10">
              <Users className="mb-7 size-7 text-[#98dda1]" aria-hidden="true" /><p className="text-meta font-semibold uppercase tracking-[0.1em] text-[#98dda1]">For individuals</p><h3 className="mt-3 text-card-title font-semibold">Your identity. Your sharing choices.</h3>
              <ul className="mt-7 space-y-5">{["See who is requesting your proof and why.", "Approve or decline access on supported platforms.", "Review sharing records and connected businesses.", "Use activity history and notifications to understand account changes."].map(item => <li key={item} className="flex gap-3 text-body text-white/80"><Check className="mt-1 size-4 shrink-0 text-[#98dda1]" aria-hidden="true" />{item}</li>)}</ul>
              <Link to="/#join" className="mt-9 inline-flex items-center gap-2 text-sm font-semibold text-white">Join the user waitlist <ArrowUpRight size={17} aria-hidden="true" /></Link>
            </article>
            <article className="surface-card !rounded-[28px]">
              <FileCheck2 className="mb-7 size-7 text-[#007d21]" aria-hidden="true" /><p className="eyebrow">For businesses</p><h3 className="mt-3 text-card-title font-semibold">A clearer basis for every review.</h3>
              <ul className="mt-7 space-y-5">{["Connect proof requests to purpose and consent.", "Give authorized reviewers the relevant evidence.", "Keep decisions, case history, and audit records together.", "Define access, retention, and escalation requirements for your workflow."].map(item => <li key={item} className="flex gap-3 text-body text-[#526058]"><Check className="mt-1 size-4 shrink-0 text-[#007d21]" aria-hidden="true" />{item}</li>)}</ul>
              <Link to="/enterprise/contact" className="mt-9 inline-flex items-center gap-2 text-sm font-semibold text-[#007d21]">Request security documentation <ArrowUpRight size={17} aria-hidden="true" /></Link>
            </article>
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="site-container">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-16"><div><p className="eyebrow">The sharing journey</p><h2 className="section-heading mt-4">A purpose for each request.</h2></div><p className="text-subtitle text-[#526058] lg:pt-9">A reusable proof is designed to reduce repeated document sharing. Reuse still depends on your approval, the proof's validity, and the receiving business's requirements.</p></div>
          <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">{sharingSteps.map((step, index) => <li key={step.title} className="border-t border-[#d8e4d5] pt-6"><span className="text-meta font-semibold text-[#007d21]">0{index + 1}</span><h3 className="mt-4 text-card-title font-semibold">{step.title}</h3><p className="mt-3 text-body text-[#526058]">{step.copy}</p></li>)}</ol>
          <Link to="/enterprise/platform/consent-and-privacy" className="mt-9 inline-flex items-center gap-2 text-sm font-semibold text-[#007d21]">Explore consent and privacy <ArrowUpRight size={17} aria-hidden="true" /></Link>
        </div>
      </section>

      <section id="compliance" className="section-space bg-[#edf5eb]">
        <div className="site-container">
          <div className="max-w-2xl"><p className="eyebrow">Enterprise security review</p><h2 className="section-heading mt-4">Define the controls before rollout.</h2><p className="mt-5 text-subtitle text-[#526058]">These are areas of Ontiver's security design to review with our team. Confirm the implementation, provider responsibilities, and requirements for your proposed deployment.</p></div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2">{reviewAreas.map(({ icon: Icon, title, copy }) => <article key={title} className="surface-card"><Icon className="mb-6 size-6 text-[#007d21]" aria-hidden="true" /><h3 className="text-card-title font-semibold">{title}</h3><p className="mt-3 text-body text-[#526058]">{copy}</p></article>)}</div>
          <div className="mt-8 flex items-start gap-3"><Eye className="mt-1 size-5 shrink-0 text-[#007d21]" aria-hidden="true" /><p className="max-w-3xl text-body text-[#526058]">Verification evidence and risk indicators support your team's review. They do not guarantee fraud prevention or replace your organization's decisions and obligations.</p></div>
          <Link to="/enterprise/contact" className="button-primary mt-8">Request a security review <ArrowUpRight size={17} aria-hidden="true" /></Link>
        </div>
      </section>

      <section className="section-space">
        <div className="site-container grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-20">
          <div><p className="eyebrow">Clear information</p><h2 className="section-heading mt-4">Questions about your data?</h2><p className="mt-5 max-w-xl text-subtitle text-[#526058]">Our Privacy Policy explains data processing, retention, sharing, and your choices. For a question about your account or a specific request, contact Ontiver Support.</p></div>
          <div className="flex flex-wrap gap-3 lg:justify-end"><Link to="/privacy" className="button-primary">Privacy Policy <ArrowUpRight size={17} aria-hidden="true" /></Link><Link to="/support" className="button-secondary">Contact support</Link></div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
