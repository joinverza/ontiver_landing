import { ArrowUpRight, BadgeCheck, Fingerprint, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import IdentityPreview from "../components/ui/IdentityPreview";
import StandalonePage from "../components/ui/StandalonePage";

const benefits = [
  { icon: Fingerprint, title: "One identity proof", copy: "Keep approved identity claims connected to you." },
  { icon: BadgeCheck, title: "Less repetition", copy: "Reuse relevant proof where a supported business accepts it." },
  { icon: ShieldCheck, title: "Your permission", copy: "Review who is asking before you choose what to share." },
];

export default function IndividualProductPage() {
  return (
    <StandalonePage
      eyebrow="Your reusable digital identity"
      title={<>Your identity.<br /><span className="text-[#007d21]">Your permission.</span></>}
      description="Create a reusable proof of identity. Share it with supported businesses when you choose, with fewer repeated uploads of your private documents."
      visual={<IdentityPreview />}
      secondaryAction={{ label: "See how it works", to: "/how-it-works" }}
      finalTitle="Your next step starts with you."
    >
      <section className="section-space">
        <div className="site-container">
          <h2 className="section-heading mx-auto max-w-3xl text-center">Built around you.</h2>
          <div className="mt-12 grid gap-8 md:grid-cols-3 lg:gap-12">
            {benefits.map(({ icon: Icon, title, copy }) => (
              <article key={title} className="border-t border-[#d7e3d2] pt-7">
                <Icon className="mb-6 size-8 text-[#007d21]" aria-hidden="true" />
                <h3 className="text-card-title font-semibold">{title}</h3>
                <p className="mt-4 text-body text-[#526058]">{copy}</p>
              </article>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap justify-center gap-x-8 gap-y-4">
            <Link to="/use-cases" className="inline-flex items-center gap-2 text-body font-semibold text-[#007d21]">See where it helps<ArrowUpRight size={18} aria-hidden="true" /></Link>
            <Link to="/security" className="inline-flex items-center gap-2 text-body font-semibold text-[#007d21]">Explore privacy and trust<ArrowUpRight size={18} aria-hidden="true" /></Link>
          </div>
        </div>
      </section>
    </StandalonePage>
  );
}
