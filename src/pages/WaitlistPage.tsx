import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import WaitlistForm from "../components/WaitlistForm";
import Footer from "../components/sections/Footer/Footer";
import ContextPhoto from "../components/ui/ContextPhoto";
import { imagery } from "../data/imagery";

export default function WaitlistPage() {
  return <main>
    <section className="page-intro">
      <div className="site-container grid items-start gap-12 lg:grid-cols-[1.25fr_1fr] lg:gap-20">
        <div>
          <p className="eyebrow">Early access</p>
          <h1 className="mt-5 text-page-hero font-medium">Stop uploading the same documents <span className="text-[#007d21]">everywhere.</span></h1>
          <p className="mt-6 max-w-[560px] text-subtitle text-[#002d0e]/65">Join the waitlist to be among the first to hold a reusable Ontiver identity proof.</p>
          <WaitlistForm className="mt-9 max-w-[600px]" />
          <Link to="/how-it-works" className="mt-6 inline-flex items-center gap-2 text-body font-semibold text-[#007d21]">How It Works<ArrowUpRight size={17} /></Link>
        </div>
        <div className="min-w-0" data-scroll-reveal>
          <ContextPhoto image={imagery.mobileApplication} priority />
          <p className="mt-6 text-body text-[#526058]">Designed for pending requests, approved proofs and a clear record of sharing.</p>
        </div>
      </div>
    </section>
    <Footer />
  </main>;
}
