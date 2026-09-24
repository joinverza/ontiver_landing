import { ArrowUpRight, Check, Fingerprint, History, LockKeyhole, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import type { Audience } from "../../../lib/audience";

export default function TrustHorizontalTransition({ audience }: { audience: Audience }) {
  return (
    <section id="security" className="section-space bg-[#002d0e] text-white">
      <div className="site-container grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-20">
        <div data-scroll-reveal>
          <p className="eyebrow text-[#b7daa9]">For the person behind the proof</p>
          <h2 className="section-heading mt-5 max-w-[530px]">Your identity belongs in your hands.</h2>
          <p className="mt-6 max-w-[500px] text-subtitle text-white/65">{audience === "enterprise" ? "Better verification should work for the people being verified, too. Ontiver is designed to make requests clear and give individuals a say in how their identity proof is shared." : "You should know who is requesting your information, why they need it, and what you are agreeing to share. That is the idea behind Ontiver."}</p>
          <ul className="my-8 space-y-4 text-body text-white/80">{["Review the business and purpose of each request.", "Approve or decline the sharing of your proof.", "Keep a history of where your proof has been used."].map(item => <li key={item} className="flex items-start gap-3"><Check size={18} className="mt-1 shrink-0 text-[#b7daa9]" />{item}</li>)}</ul>
          <Link to="/security" className="button-secondary border-white/30 text-white hover:bg-white/10 hover:text-white">Explore privacy & control<ArrowUpRight size={17} /></Link>
        </div>
        <div data-scroll-reveal className="rounded-[28px] bg-[#e9f1e4] p-5 text-[#002d0e] sm:p-8">
          <div className="flex items-center justify-between gap-4 border-b border-[#002d0e]/10 pb-5"><img src="/assets/logo.svg" alt="Ontiver" className="h-6" /><span className="text-meta text-[#002d0e]/55">Illustrative sharing request</span></div>
          <div className="my-7 flex items-center gap-4"><span className="grid size-14 place-items-center rounded-2xl bg-white"><Fingerprint size={29} className="text-[#007d21]" strokeWidth={1.5} /></span><div><p className="text-card-title font-semibold">A request for your proof</p><p className="mt-1 text-sm text-[#002d0e]/60">You decide what happens next.</p></div></div>
          <dl className="space-y-4 rounded-2xl bg-white p-5 text-sm"><div className="flex justify-between gap-5"><dt className="text-[#002d0e]/60">Requested by</dt><dd className="font-medium">Example business</dd></div><div className="flex justify-between gap-5"><dt className="text-[#002d0e]/60">Purpose</dt><dd className="text-right font-medium">Account onboarding</dd></div><div className="flex justify-between gap-5 border-t border-[#002d0e]/10 pt-4"><dt className="text-[#002d0e]/60">Information</dt><dd className="flex items-center gap-1.5 text-right font-medium"><ShieldCheck size={16} className="shrink-0 text-[#007d21]" />Verification status</dd></div></dl>
          <p className="mt-5 flex items-start gap-2 text-sm leading-relaxed text-[#002d0e]/65"><LockKeyhole size={16} className="mt-1 shrink-0" />Only the approved information is included in the proposed sharing flow.</p>
          <div className="mt-6 grid grid-cols-2 gap-3" aria-label="Illustrative choices, not interactive controls"><span className="rounded-full border border-[#002d0e]/20 py-3 text-center text-sm font-semibold">Decline</span><span className="rounded-full bg-[#007d21] py-3 text-center text-sm font-semibold text-white">Approve share</span></div>
          <p className="mt-5 flex items-center justify-center gap-2 text-meta text-[#002d0e]/60"><History size={15} />Your sharing history stays visible.</p>
        </div>
      </div>
    </section>
  );
}
