import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import WaitlistForm from "../components/WaitlistForm";
import Footer from "../components/sections/Footer/Footer";
import { imagery } from "../data/imagery";

export default function WaitlistPage() {
  return <main>
    <section className="page-intro">
      <div className="site-container grid items-center gap-10 lg:grid-cols-[1.25fr_1fr] lg:gap-16">
        <div>
          <p className="eyebrow">Early access</p>
          <h1 className="mt-5 text-page-hero font-semibold">Your next chapter starts with you.</h1>
          <p className="mt-6 max-w-[560px] text-subtitle text-[#002d0e]/65">Join the Ontiver waitlist for early access to reusable identity and sharing on your terms.</p>
          <WaitlistForm className="mt-9 max-w-[600px]" />
          <Link to="/how-it-works" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#007d21]">See how it works<ArrowUpRight size={17} /></Link>
        </div>
        <img src={imagery.individualHero.src} alt={imagery.individualHero.alt} width={imagery.individualHero.width} height={imagery.individualHero.height} fetchPriority="high" className="aspect-[4/5] max-h-[620px] w-full rounded-[32px] object-cover" style={{ objectPosition: imagery.individualHero.objectPosition }} />
      </div>
    </section>
    <Footer />
  </main>;
}
