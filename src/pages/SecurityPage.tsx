import { ArrowUpRight, Check, FileCheck2, History, KeyRound, LockKeyhole, ShieldCheck, SlidersHorizontal, Users } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "../components/sections/Footer/Footer";
import type { Audience } from "../lib/audience";

const reviewAreas = [
  { icon: LockKeyhole, title: "Data protection", copy: "Review encryption and sensitive data flows." },
  { icon: KeyRound, title: "Access and approvals", copy: "Define roles, permissions, and approval requirements." },
  { icon: History, title: "Logs and monitoring", copy: "Confirm the evidence your review process needs." },
  { icon: SlidersHorizontal, title: "Retention and lifecycle", copy: "Agree retention, expiry, revocation, and deletion rules." },
];

export default function SecurityPage({ audience = "individual" }: { audience?: Audience }) {
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

      <section id="your-controls" className="section-space bg-[#f7f9f6]">
        <div className="site-container">
          <div className="mb-10 max-w-2xl"><p className="eyebrow">For people. For teams.</p><h2 className="section-heading mt-4">Trust works both ways.</h2></div>
          <div className="grid gap-6 lg:grid-cols-2">
            <article className="rounded-[28px] bg-[#002d0e] p-7 text-white sm:p-10">
              <Users className="mb-7 size-7 text-[#98dda1]" aria-hidden="true" /><p className="text-meta font-semibold uppercase tracking-[0.1em] text-[#98dda1]">For individuals</p><h3 className="mt-3 text-card-title font-semibold">Your identity. Your sharing choices.</h3>
              <ul className="mt-6 space-y-4">{["Know who is asking and why.", "Approve or decline proof sharing.", "Review your sharing history."].map(item => <li key={item} className="flex gap-3 text-body text-white/80"><Check className="mt-1 size-4 shrink-0 text-[#98dda1]" aria-hidden="true" />{item}</li>)}</ul>
              <Link to="/waitlist" className="mt-9 inline-flex items-center gap-2 text-sm font-semibold text-white">Join the user waitlist <ArrowUpRight size={17} aria-hidden="true" /></Link>
            </article>
            <article className="surface-card !rounded-[28px]">
              <FileCheck2 className="mb-7 size-7 text-[#007d21]" aria-hidden="true" /><p className="eyebrow">For businesses</p><h3 className="mt-3 text-card-title font-semibold">A clearer basis for every review.</h3>
              <ul className="mt-6 space-y-4">{["Connect each request to purpose and consent.", "Give reviewers the relevant evidence.", "Keep decisions and audit records together."].map(item => <li key={item} className="flex gap-3 text-body text-[#526058]"><Check className="mt-1 size-4 shrink-0 text-[#007d21]" aria-hidden="true" />{item}</li>)}</ul>
              <Link to="/enterprise/contact" className="mt-9 inline-flex items-center gap-2 text-sm font-semibold text-[#007d21]">Request security documentation <ArrowUpRight size={17} aria-hidden="true" /></Link>
            </article>
          </div>
        </div>
      </section>

      <section id="compliance" className="section-space bg-[#edf5eb]">
        <div className="site-container grid gap-10 lg:grid-cols-2 lg:gap-20">
          <div><p className="eyebrow">Enterprise security review</p><h2 className="section-heading mt-4">Define the controls before rollout.</h2><p className="mt-5 text-body text-[#526058]">Confirm implementation and provider responsibilities for your pilot.</p><Link to="/enterprise/contact" className="button-primary mt-7">Request a security review <ArrowUpRight size={17} aria-hidden="true" /></Link></div>
          <div className="divide-y divide-[#002d0e]/15">{reviewAreas.map(({ icon: Icon, title, copy }) => <article key={title} className="flex gap-4 py-5 first:pt-0 last:pb-0"><Icon className="mt-1 size-5 shrink-0 text-[#007d21]" aria-hidden="true" /><div><h3 className="text-card-title font-semibold">{title}</h3><p className="mt-2 text-body text-[#526058]">{copy}</p></div></article>)}</div>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="site-container grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-20">
          <h2 className="section-heading">Questions about your data?</h2>
          <div className="flex flex-wrap gap-3 lg:justify-end"><Link to="/privacy" className="button-primary">Privacy Policy <ArrowUpRight size={17} aria-hidden="true" /></Link><Link to={audience === "enterprise" ? "/enterprise/support" : "/support"} className="button-secondary">Contact support</Link></div>
        </div>
      </section>
      <Footer audience={audience} />
    </main>
  );
}
