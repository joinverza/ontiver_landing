import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import type { Audience } from "../../../lib/audience";

export default function HeroActions({ audience, light = false, centered = false }: { audience: Audience; light?: boolean; centered?: boolean }) {
  const primary = `button-primary ${light ? "bg-white text-[#002d0e] hover:bg-[#d8edcf]" : ""}`;
  const secondary = `button-secondary ${light ? "border-white/30 text-white hover:bg-white/10 hover:text-white" : ""}`;
  return <div className={`flex flex-wrap items-center gap-3 ${centered ? "justify-center" : ""}`}>{audience === "enterprise" ? <><Link to="/enterprise/contact" className={primary}>Get a Demo<ArrowUpRight size={17} /></Link><Link to="/enterprise/platform" className={secondary}>Explore Platform</Link></> : <><Link to="/waitlist" className={primary}>Join the Waitlist<ArrowUpRight size={17} /></Link><Link to="/how-it-works" className={secondary}>See How It Works</Link></>}</div>;
}
