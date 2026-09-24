import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useJoinNavigation } from "../../../hooks/useJoinNavigation";
import type { Audience } from "../../../lib/audience";

export default function HeroActions({ audience, light = false, centered = false }: { audience: Audience; light?: boolean; centered?: boolean }) {
  const goToJoin = useJoinNavigation();
  const primary = `button-primary ${light ? "bg-white text-[#002d0e] hover:bg-[#d8edcf]" : ""}`;
  const secondary = `button-secondary ${light ? "border-white/30 text-white hover:bg-white/10 hover:text-white" : ""}`;
  return <div className={`flex flex-wrap items-center gap-3 ${centered ? "justify-center" : ""}`}>{audience === "enterprise" ? <><Link to="/enterprise/contact" className={primary}>Get a demo<ArrowUpRight size={17} /></Link><Link to="/enterprise/platform" className={secondary}>Explore the platform</Link></> : <><button type="button" onClick={goToJoin} className={primary}>Join Waitlist<ArrowUpRight size={17} /></button><Link to="/how-it-works" className={secondary}>See how it works</Link></>}</div>;
}
