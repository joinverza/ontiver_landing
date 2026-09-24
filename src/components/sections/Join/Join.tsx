import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import WaitlistForm from "../../WaitlistForm";
import type { Audience } from "../../../lib/audience";
import HeroActions from "../Hero/HeroActions";
import { imagery } from "../../../data/imagery";

export default function Join({ audience }: { audience: Audience }) {
  const enterprise = audience === "enterprise";
  return (
    <section id="join" className="bg-[#edf5e7] pt-16 sm:pt-24">
      <div className="site-container">
        <div className="mx-auto max-w-[860px] text-center">
          <p className="eyebrow">{enterprise ? "Let's build reusable trust" : "Your invitation to what's next"}</p>
          <h2 className="section-heading mt-5">{enterprise ? "Build your next workflow on trust." : "Your next chapter starts with you."}</h2>
          <p className="mx-auto mt-6 max-w-[650px] text-subtitle text-[#002d0e]/65">{enterprise ? "Let's find the right starting point for your team." : "Join the waitlist for early access to identity on your terms."}</p>
          {enterprise ? <div className="mt-8"><HeroActions audience={audience} centered /></div> : <>
            <WaitlistForm className="mx-auto mt-8 max-w-[530px]" />
            <div className="mt-5 text-center"><Link to="/how-it-works" className="inline-flex items-center gap-2 text-sm font-semibold text-[#007d21]">See how it works<ArrowUpRight size={17} /></Link></div>
          </>}
        </div>
        <div className="mt-14 grid overflow-hidden rounded-[32px] bg-[#002d0e] text-white sm:mt-16 md:grid-cols-[1.35fr_1fr]">
          <div className="flex flex-col justify-between gap-12 p-8 sm:p-12 lg:p-14"><img src="/assets/logo.svg" alt="Ontiver" className="w-full max-w-[430px] brightness-0 invert" /><p className="max-w-[420px] text-card-title font-medium text-[#c6e5b4]">Verify once. Stay in control.<br />Approve every share.</p></div>
          <img src={imagery.individualHero.src} alt={imagery.individualHero.alt} loading="lazy" width={imagery.individualHero.width} height={imagery.individualHero.height} className="h-72 w-full object-cover md:h-full md:max-h-[390px]" style={{ objectPosition: imagery.individualHero.objectPosition }} />
        </div>
      </div>
    </section>
  );
}
