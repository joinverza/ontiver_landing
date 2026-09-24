import { ArrowRight, Check, Fingerprint, LockKeyhole, ShieldCheck } from "lucide-react";
import type { Audience } from "../../../lib/audience";
import HeroActions from "./HeroActions";

export default function Hero({ audience }: { audience: Audience }) {
  const enterprise = audience === "enterprise";
  return (
    <section className="bg-[#f7f9f5] pb-12 pt-44 sm:pb-16 sm:pt-48">
      <div className="site-container">
        <div className="mx-auto flex max-w-[850px] flex-col items-center text-center">
          <p className="eyebrow"><span className="size-2 rounded-full bg-[#007d21]" />{enterprise ? "Identity infrastructure, built in Africa" : "Your reusable digital identity"}</p>
          <h1 className="mt-6 text-hero font-semibold">{enterprise ? <>Verify once.<br /><span className="text-[#007d21]">Reuse with consent.</span></> : <>Your identity.<br /><span className="text-[#007d21]">Your permission.</span></>}</h1>
          <p className="mt-6 max-w-[650px] text-subtitle text-[#002d0e]/65">{enterprise ? "Connect verification, workflows, and reusable identity proof. Help your business onboard people with less repetition and more control over what is shared." : "Create a reusable proof of identity. Share it with supported businesses when you choose, with fewer repeated uploads of your private documents."}</p>
          <div className="mt-8"><HeroActions audience={audience} centered /></div>
          <p className="mt-4 text-meta text-[#002d0e]/55">{enterprise ? "Preparing for enterprise pilots. Let's explore your workflow." : "Join the waitlist for early access."}</p>
        </div>
        <div className="mt-12 grid gap-4 lg:mt-14 lg:grid-cols-[1.6fr_1fr]">
          <div className="relative flex min-h-[290px] items-center justify-center overflow-hidden rounded-3xl border border-[#002d0e]/10 bg-[#e4eddf] sm:min-h-[370px]">
            <span className="absolute left-5 top-5 z-10 rounded-full bg-white/85 px-3 py-2 text-meta font-medium">{enterprise ? "The enterprise workspace" : "The Ontiver identity wallet"} · Product preview</span>
            <img src={enterprise ? "/assets/ontiver-enterprise.png" : "/assets/hero-phone.png"} alt={enterprise ? "Preview of Ontiver's enterprise verification dashboard" : "Preview of the Ontiver app with identity status and activity"} fetchPriority="high" className={`h-[290px] w-full object-contain sm:h-[370px] ${enterprise ? "translate-y-4 scale-125 px-4 pt-9" : "translate-y-8 scale-110"}`} />
          </div>
          <div className="flex flex-col justify-between rounded-3xl bg-[#002d0e] p-6 text-white sm:p-8">
            <div className="flex items-center justify-between gap-4"><span className="text-meta font-semibold uppercase tracking-widest text-[#b7daa9]">Designed around consent</span><LockKeyhole size={19} className="text-[#b7daa9]" /></div>
            <div className="my-8 flex items-center gap-3"><span className="grid size-14 shrink-0 place-items-center rounded-2xl border border-white/20 bg-white/5"><Fingerprint size={30} strokeWidth={1.5} /></span><span className="h-px flex-1 bg-white/20" /><ArrowRight size={18} className="text-[#b7daa9]" /><span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-[#b7daa9] text-[#002d0e]"><ShieldCheck size={29} strokeWidth={1.5} /></span></div>
            <h2 className="text-card-title font-semibold">{enterprise ? "Request proof. Respect permission." : "Know who is asking. Choose what to share."}</h2>
            <p className="mt-3 text-body text-white/65">A request shows the business, the purpose, and the information needed before you decide.</p>
            <div className="mt-6 flex flex-wrap gap-x-5 gap-y-3 border-t border-white/15 pt-5 text-meta text-[#c6dfbd]"><span className="flex items-center gap-2"><Check size={14} />Clear purpose</span><span className="flex items-center gap-2"><Check size={14} />Your approval</span><span className="flex items-center gap-2"><Check size={14} />Sharing history</span></div>
          </div>
        </div>
      </div>
    </section>
  );
}
