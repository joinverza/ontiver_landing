import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { imagery } from "../../../data/imagery";
import type { Audience } from "../../../lib/audience";
import IdentityPreview from "../../ui/IdentityPreview";
import HeroActions from "./HeroActions";

export default function Hero({ audience }: { audience: Audience }) {
  const enterprise = audience === "enterprise";
  const firstImage = enterprise ? imagery.enterpriseHero : imagery.individualHero;
  const secondImage = enterprise ? imagery.teamwork : imagery.marketplace;
  return (
    <section className="bg-[#edf5e7] pb-10 pt-40 sm:pb-14 sm:pt-48 lg:pt-56">
      <div className="site-container">
        <div className="grid items-end gap-8 lg:grid-cols-[1.7fr_1fr] lg:gap-12">
          <div>
            <p className="eyebrow"><span className="size-2 rounded-full bg-[#007d21]" />{enterprise ? "Identity infrastructure, built in Africa" : "Your reusable digital identity"}</p>
            <h1 className="mt-6 text-hero font-semibold">{enterprise ? <>Verify once.<br /><span className="text-[#007d21]">Reuse with consent.</span></> : <>Your identity.<br /><span className="text-[#007d21]">Your permission.</span></>}</h1>
          </div>
          <div className="lg:pb-2">
            <p className="max-w-[510px] text-subtitle text-[#002d0e]/70">{enterprise ? "Connect verification, workflows, and reusable proof. Help your business onboard people with less repetition and more control over what is shared." : "Create a reusable proof of identity. Share it with supported businesses when you choose, with fewer repeated uploads of your private documents."}</p>
            <div className="mt-7"><HeroActions audience={audience} /></div>
            <p className="mt-5 text-meta text-[#002d0e]/60">{enterprise ? "Preparing for enterprise pilots." : "Join the waitlist for early access."}</p>
          </div>
        </div>
      </div>
      <div tabIndex={0} aria-label="Ontiver in everyday life; scroll horizontally to explore" className="mx-auto mt-12 flex max-w-[1600px] snap-x gap-4 overflow-x-auto px-4 pb-3 sm:mt-16 sm:gap-5 sm:px-6 lg:grid lg:grid-cols-4 lg:overflow-visible lg:px-5">
        <figure className="relative min-h-[350px] w-[82%] shrink-0 snap-center overflow-hidden rounded-[28px] bg-[#d7e4cf] sm:w-[46%] lg:min-h-[390px] lg:w-auto">
          <img src={firstImage.src} alt={firstImage.alt} width={firstImage.width} height={firstImage.height} fetchPriority="high" className="absolute inset-0 h-full w-full object-cover" style={{ objectPosition: firstImage.objectPosition }} />
          <div className="absolute inset-0 bg-gradient-to-t from-[#002d0e]/65 via-transparent to-transparent" />
          <figcaption className="absolute inset-x-6 bottom-6 text-card-title font-semibold leading-tight text-white">{enterprise ? "Build trust into every first step." : "Life moves. Your proof should too."}</figcaption>
        </figure>
        <div className="w-[82%] shrink-0 snap-center sm:w-[46%] lg:w-auto"><IdentityPreview variant="proof" /></div>
        <figure className="relative min-h-[350px] w-[82%] shrink-0 snap-center overflow-hidden rounded-[28px] bg-[#d7e4cf] sm:w-[46%] lg:min-h-[390px] lg:w-auto">
          <img src={secondImage.src} alt={secondImage.alt} width={secondImage.width} height={secondImage.height} className="absolute inset-0 h-full w-full object-cover" style={{ objectPosition: secondImage.objectPosition }} />
          <div className="absolute inset-0 bg-gradient-to-t from-[#002d0e]/65 via-transparent to-transparent" />
          <figcaption className="absolute inset-x-6 bottom-6 text-card-title font-semibold leading-tight text-white">{enterprise ? "Made for people. Built for teams." : "More of the things that matter."}</figcaption>
        </figure>
        <div className="w-[82%] shrink-0 snap-center sm:w-[46%] lg:w-auto"><IdentityPreview variant="consent" /></div>
      </div>
      <div className="site-container mt-8 flex flex-wrap items-center justify-between gap-4">
        <p className="text-meta text-[#002d0e]/65">Verify once. Stay in control. Approve every share.</p>
        <Link to={enterprise ? "/enterprise/security" : "/security"} className="inline-flex items-center gap-2 text-sm font-medium text-[#007d21]">Our approach to trust<ArrowUpRight size={17} /></Link>
      </div>
    </section>
  );
}
