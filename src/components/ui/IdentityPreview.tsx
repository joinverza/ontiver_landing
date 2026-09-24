import { ArrowUpRight, BadgeCheck, Check, Fingerprint, LockKeyhole, ShieldCheck } from "lucide-react";

export default function IdentityPreview({ variant = "wallet" }: { variant?: "wallet" | "proof" | "consent" }) {
  if (variant === "proof") {
    return <div className="relative flex h-full min-h-64 flex-col justify-between overflow-hidden rounded-[28px] bg-[#bce6a0] p-6 sm:p-8">
      <div className="flex items-center justify-between text-[#002d0e]"><span className="text-meta font-medium">One identity. Yours.</span><Fingerprint size={24} /></div>
      <div className="relative my-8 -rotate-6 rounded-2xl border border-[#002d0e]/10 bg-[#f9fff5] p-5 shadow-[8px_12px_0_rgba(0,45,14,.12)] sm:p-6">
        <div className="flex items-center justify-between gap-3"><img src="/assets/logo.svg" alt="Ontiver" className="h-5" /><BadgeCheck className="shrink-0 text-[#007d21]" size={23} /></div>
        <Fingerprint className="my-5 text-[#007d21]" size={48} strokeWidth={1.1} />
        <p className="text-card-title font-semibold leading-tight">Your identity proof</p><p className="mt-2 text-meta text-[#002d0e]/65">Designed to travel with your permission.</p>
      </div>
      <p className="flex items-center justify-between gap-3 text-meta font-medium">Reusable by design<span className="grid size-9 place-items-center rounded-full bg-[#002d0e] text-white"><ArrowUpRight size={18} /></span></p>
    </div>;
  }

  if (variant === "consent") {
    return <div className="flex h-full min-h-64 flex-col justify-between rounded-[28px] bg-[#002d0e] p-6 text-white sm:p-8">
      <div className="flex items-center justify-between gap-3"><span className="text-meta text-white/70">Your permission comes first</span><LockKeyhole size={21} className="shrink-0 text-[#bce6a0]" /></div>
      <div className="py-7"><ShieldCheck size={54} strokeWidth={1.2} className="mb-6 text-[#bce6a0]" /><p className="text-card-title font-semibold">A clear choice.<br />Every time.</p><p className="mt-4 text-body text-white/70">Know who is asking, why, and what you choose to share.</p></div>
      <div className="flex items-center gap-2 border-t border-white/20 pt-5 text-meta text-[#bce6a0]"><Check size={17} className="shrink-0" />Consent built into the journey</div>
    </div>;
  }

  return <div className="mx-auto w-full max-w-[370px] rounded-[38px] border-[7px] border-[#002d0e] bg-[#f7faf3] p-5 shadow-[16px_20px_0_rgba(0,45,14,.08)] sm:p-7">
    <div aria-hidden="true" className="mx-auto mb-6 h-1.5 w-16 rounded-full bg-[#002d0e]/20" />
    <div className="flex items-center justify-between gap-3"><img src="/assets/logo.svg" alt="Ontiver" className="h-6" /><span className="grid size-10 shrink-0 place-items-center rounded-full bg-[#e4f0da]"><Fingerprint size={23} className="text-[#007d21]" /></span></div>
    <p className="mt-8 text-card-title font-semibold">Your identity.<br />All together.</p><p className="mt-2 text-meta text-[#002d0e]/60">An illustration of the Ontiver wallet</p>
    <div className="mt-6 rounded-2xl bg-[#002d0e] p-5 text-white"><div className="flex items-center justify-between gap-3"><span className="text-meta text-[#bce6a0]">Identity proof</span><BadgeCheck size={22} /></div><Fingerprint className="my-5 text-[#bce6a0]" size={44} strokeWidth={1.25} /><p className="text-body font-semibold">Ready when you choose.</p><p className="mt-2 text-meta text-white/65">Share relevant proof with supported businesses.</p></div>
    <div className="mt-4 rounded-2xl border border-[#d7e3ce] bg-white p-4"><p className="text-body font-semibold">A new sharing request</p><p className="mt-2 text-meta text-[#002d0e]/65">Review the business, purpose, and requested information.</p><span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#007d21]">Review request<ArrowUpRight size={17} /></span></div>
    <div className="mt-5 flex items-center gap-2 text-meta text-[#002d0e]/60"><ShieldCheck size={16} className="shrink-0" />You stay in the sharing decision.</div>
  </div>;
}
