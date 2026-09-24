import { ArrowUpRight, Check, Fingerprint, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import type { Audience } from "../../../lib/audience";

export default function TrustHorizontalTransition({ audience }: { audience: Audience }) {
  return (
    <section id="security" className="section-space bg-[#002d0e] text-white">
      <div className="site-container grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-20">
        <div data-scroll-reveal>
          <p className="eyebrow text-[#b7daa9]">{audience === "enterprise" ? "Trust starts with consent" : "Privacy and control"}</p>
          <h2 className="section-heading mt-5 max-w-[530px]">Your identity belongs in your hands.</h2>
          <ul className="my-8 space-y-4 text-body text-white/80">{["Know who is asking and why.", "Choose what proof to share.", "See your sharing history."].map(item => <li key={item} className="flex items-start gap-3"><Check size={18} className="mt-1 shrink-0 text-[#b7daa9]" />{item}</li>)}</ul>
          <Link to={audience === "enterprise" ? "/enterprise/security" : "/security"} className="button-secondary border-white/30 text-white hover:bg-white/10 hover:text-white">Explore privacy & control<ArrowUpRight size={17} /></Link>
        </div>
        <div data-scroll-reveal className="rounded-[28px] bg-[#e9f1e4] p-5 text-[#002d0e] sm:p-8">
          <div className="flex items-center justify-between gap-4 border-b border-[#002d0e]/10 pb-5"><img src="/assets/logo.svg" alt="Ontiver" className="h-6" /><span className="text-meta text-[#002d0e]/55">Illustrative sharing request</span></div>
          <div className="my-7 flex items-center gap-4"><span className="grid size-14 place-items-center rounded-2xl bg-white"><Fingerprint size={29} className="text-[#007d21]" strokeWidth={1.5} /></span><p className="text-card-title font-semibold">A request for your proof</p></div>
          <dl className="space-y-4 rounded-2xl bg-white p-5 text-sm"><div className="flex justify-between gap-5"><dt className="text-[#002d0e]/60">Requested by</dt><dd className="font-medium">Example business</dd></div><div className="flex justify-between gap-5"><dt className="text-[#002d0e]/60">Purpose</dt><dd className="text-right font-medium">Account onboarding</dd></div><div className="flex justify-between gap-5 border-t border-[#002d0e]/10 pt-4"><dt className="text-[#002d0e]/60">Information</dt><dd className="flex items-center gap-1.5 text-right font-medium"><ShieldCheck size={16} className="shrink-0 text-[#007d21]" />Verification status</dd></div></dl>
          <div className="mt-6 grid grid-cols-2 gap-3" aria-label="Illustrative choices, not interactive controls"><span className="rounded-full border border-[#002d0e]/20 py-3 text-center text-sm font-semibold">Decline</span><span className="rounded-full bg-[#007d21] py-3 text-center text-sm font-semibold text-white">Approve share</span></div>
        </div>
      </div>
    </section>
  );
}
