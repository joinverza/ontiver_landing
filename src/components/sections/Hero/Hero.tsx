import { ArrowUpRight, Clock3, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import type { Audience } from "../../../lib/audience";
import ContextPhoto from "../../ui/ContextPhoto";
import { imagery } from "../../../data/imagery";
import { MotionToggle } from "../../MotionSettings";
import HeroActions from "./HeroActions";

export default function Hero({ audience }: { audience: Audience }) {
  const enterprise = audience === "enterprise";
  if (enterprise) return <section className="bg-white pb-10 pt-32 sm:pt-40">
    <div className="site-container">
      <div className="hero-enter mx-auto max-w-[1000px] text-center">
        <p className="eyebrow">Identity verification & workflow infrastructure</p>
        <h1 className="mt-5 text-hero font-medium">Verify people.<br /><span className="text-[#007d21]">Connect every step.</span></h1>
        <p className="mx-auto mt-7 max-w-[790px] text-subtitle text-[#526058]">Ontiver helps you verify users and businesses, manage consent, and confirm reusable identity proof through a secure dashboard and API — without repeatedly collecting raw identity documents.</p>
        <div className="mt-8"><HeroActions audience={audience} centered /></div>
        <p className="mt-4 text-meta text-[#526058]">Preparing for focused pilots. Checks and integrations are agreed for each workflow.</p>
      </div>
      <div className="hero-media-enter mt-9">
        <ContextPhoto image={imagery.candidateReview} size="wide" priority />
      </div>
      <div className="mt-5 flex flex-wrap items-center justify-between gap-4"><p className="text-meta text-[#526058]">Enterprise requests. User consents. Your team reviews.</p><MotionToggle /></div>
    </div>
  </section>;

  return <section className="bg-white pb-12 pt-32 sm:pt-36">
    <div className="site-container grid items-center gap-10 lg:grid-cols-[1.15fr_.85fr] lg:gap-16">
      <div className="hero-enter min-w-0">
        <p className="eyebrow">Your identity. Your credentials. Your choice.</p>
        <h1 className="mt-5 text-hero font-medium">Verify once.<br /><span className="text-[#007d21]">Approve every share.</span></h1>
        <p className="mt-7 max-w-[560px] text-subtitle text-[#526058]">Create one verified identity, then decide exactly what gets shared, with whom, and for how long — instead of uploading the same documents everywhere.</p>
        <div className="mt-8"><HeroActions audience={audience} /></div>
        <p className="mt-4 text-meta text-[#526058]">Join the waitlist for the planned identity wallet.</p>
        <Link to="/security" className="mt-10 inline-flex items-center gap-3 text-sm font-medium"><ShieldCheck size={21} className="shrink-0 text-[#007d21]" />You choose which claims to share.<ArrowUpRight size={16} className="shrink-0" /></Link>
      </div>
      <div className="hero-media-enter min-w-0">
        <figure className="relative isolate overflow-hidden rounded-[24px] bg-[#edf5eb] px-5 py-6 sm:px-8">
          <img src={imagery.mobileApplication.src} alt="" width={imagery.mobileApplication.width} height={imagery.mobileApplication.height} fetchPriority="high" className="absolute inset-0 -z-20 h-full w-full object-cover" style={{ objectPosition: imagery.mobileApplication.objectPosition }} />
          <div className="absolute inset-0 -z-10 bg-[#e8f2e4]/80" />
          <div className="mx-auto max-w-[310px] rounded-[30px] border-[5px] border-[#002d0e] bg-white p-5 shadow-xl">
            <div aria-hidden="true" className="mx-auto mb-5 h-1 w-12 rounded-full bg-[#002d0e]/20" />
            <img src="/assets/logo.svg" alt="Ontiver" className="h-5 w-auto" />
            <div className="mt-5 flex items-center gap-2 text-meta text-[#76551b]"><Clock3 size={16} aria-hidden="true" />Pending request</div>
            <p className="mt-3 text-card-title font-medium">You choose what to share.</p>
            <dl className="mt-4 space-y-3 text-meta"><div><dt className="text-[#526058]">Who is asking</dt><dd className="mt-1 font-medium">Example employer</dd></div><div><dt className="text-[#526058]">Purpose</dt><dd className="mt-1 font-medium">Confirm your identity for a new role</dd></div><div><dt className="text-[#526058]">Requested claims</dt><dd className="mt-1 font-medium">Name · Identity proof status</dd></div></dl>
            <div className="mt-5 rounded-full bg-[#002d0e] px-4 py-3 text-center text-meta font-semibold text-white">Review request</div>
          </div>
          <figcaption className="mt-4 text-center text-meta text-[#002d0e]">Planned app preview · Example request</figcaption>
        </figure>
        <div className="mt-4 flex justify-end"><MotionToggle /></div>
      </div>
    </div>
  </section>;
}
