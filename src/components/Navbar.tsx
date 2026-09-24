import { useState } from "react";
import { ArrowUpRight, Menu } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { enterpriseNavLinks, individualNavLinks } from "../data/navigation";
import { useJoinNavigation } from "../hooks/useJoinNavigation";
import { getAudienceFromPath, getAudienceHome } from "../lib/audience";
import MobileMenu from "./MobileMenu";
import AudienceToggle from "./AudienceToggle";

export default function Navbar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const goToJoin = useJoinNavigation();
  const [menuPath, setMenuPath] = useState<string | null>(null);
  const audience = getAudienceFromPath(pathname);
  const isEnterprise = audience === "enterprise";
  const navLinks = isEnterprise ? enterpriseNavLinks : individualNavLinks;
  const primaryAction = isEnterprise ? () => navigate("/enterprise/contact") : goToJoin;

  return (
    <>
      <header data-ontiver-navbar className="fixed inset-x-0 top-0 z-50 border-b border-[#002d0e]/10 bg-white/95 backdrop-blur-md">
        <Link to="/enterprise/contact" className="flex min-h-9 items-center justify-center gap-2 bg-[#002d0e] px-5 py-2 text-center text-meta text-white">Built in Africa. Preparing for our first pilots.<span className="hidden font-semibold text-[#b7daa9] sm:inline">Explore the programme</span><ArrowUpRight size={14} className="shrink-0" /></Link>
        <div data-mobile-nav-pill className="site-container flex h-[76px] items-center justify-between gap-5">
          <Link to={getAudienceHome(audience)} aria-label="Ontiver home" className="shrink-0">
            <img src="/assets/logo.svg" alt="Ontiver" className="h-7 w-auto sm:h-8" />
          </Link>
          <nav aria-label="Main navigation" className="hidden items-center gap-5 lgg:flex xl:gap-7">
            {navLinks.map(({ to, name }) => {
              const active = pathname === to || (to === "/blogs" && pathname.startsWith("/blogs/")) || (to === "/enterprise#features" && pathname.startsWith("/enterprise/platform/"));
              return <Link key={to} to={to} aria-current={active ? "page" : undefined} className={`py-3 text-sm font-medium transition-colors hover:text-[#009311] ${active ? "text-[#007d21]" : "text-[#002d0e]/70"}`}>{name}</Link>;
            })}
          </nav>
          <div className="hidden items-center gap-4 lgg:flex">
            <AudienceToggle compact />
            <button type="button" onClick={primaryAction} className="button-primary min-h-10 px-5 py-2.5">
              {isEnterprise ? "Get a demo" : "Join Waitlist"}<ArrowUpRight size={16} aria-hidden="true" />
            </button>
          </div>
          <button type="button" aria-label="Open menu" aria-haspopup="dialog" aria-expanded={menuPath === pathname} aria-controls="mobile-navigation" onClick={() => setMenuPath(pathname)} className="grid size-11 place-items-center rounded-full bg-[#edf5eb] lgg:hidden"><Menu size={21} /></button>
        </div>
      </header>
      <MobileMenu mobileMenuOpen={menuPath === pathname} setMobileMenuOpen={open => setMenuPath(open ? pathname : null)} onJoinClick={primaryAction} audience={audience} navLinks={navLinks} />
    </>
  );
}
