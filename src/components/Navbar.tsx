import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, ChevronDown, Menu } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { enterpriseNavLinks, individualNavLinks, type NavLink } from "../data/navigation";
import { imagery } from "../data/imagery";
import { getAudienceFromPath, getAudienceHome } from "../lib/audience";
import MobileMenu from "./MobileMenu";
import AudienceToggle from "./AudienceToggle";

function DropdownLink({ item, close }: { item: NavLink; close: () => void }) {
  const Icon = item.icon;
  const content = <><span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-[#edf5e7] text-[#007d21]">{Icon && <Icon size={21} aria-hidden="true" />}</span><span className="min-w-0"><span className="block text-body font-semibold">{item.name}</span><span className="mt-1 block text-sm leading-snug text-[#002d0e]/60">{item.description}</span></span>{item.external && <ArrowUpRight size={16} className="ml-auto shrink-0" aria-hidden="true" />}</>;
  const className = "flex items-start gap-3 rounded-2xl p-3 transition-colors hover:bg-[#f3f8ee] focus-visible:bg-[#f3f8ee]";
  return item.external ? <a href={item.to} target="_blank" rel="noreferrer" className={className} onClick={close}>{content}</a> : <Link to={item.to} className={className} onClick={close}>{content}</Link>;
}

export default function Navbar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const headerRef = useRef<HTMLElement>(null);
  const clickedDropdown = useRef<string | null>(null);
  const [menuPath, setMenuPath] = useState<string | null>(null);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const audience = getAudienceFromPath(pathname);
  const isEnterprise = audience === "enterprise";
  const navLinks = isEnterprise ? enterpriseNavLinks : individualNavLinks;
  const primaryPath = isEnterprise ? "/enterprise/contact" : "/waitlist";
  const menuImage = isEnterprise ? imagery.teamwork : imagery.individualHero;

  useEffect(() => {
    if (!openDropdown) return;
    const closeOutside = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) setOpenDropdown(null);
    };
    document.addEventListener("pointerdown", closeOutside);
    return () => document.removeEventListener("pointerdown", closeOutside);
  }, [openDropdown]);

  function focusDropdown(name: string) {
    setOpenDropdown(name);
    requestAnimationFrame(() => headerRef.current?.querySelector<HTMLElement>("[data-nav-dropdown] a")?.focus());
  }

  return (
    <>
      <header ref={headerRef} data-ontiver-navbar className="fixed inset-x-4 top-4 z-50 sm:inset-x-7 sm:top-7 lg:top-9" onKeyDown={event => {
        if (event.key !== "Escape" || !openDropdown) return;
        event.preventDefault();
        const trigger = headerRef.current?.querySelector<HTMLButtonElement>('button[aria-expanded="true"]');
        setOpenDropdown(null);
        trigger?.focus();
      }}>
        <div data-mobile-nav-pill className="relative mx-auto flex min-h-[76px] max-w-[1296px] items-center justify-between gap-4 rounded-full border border-[#002d0e]/[.06] bg-white/95 px-5 py-3 shadow-[0_4px_24px_rgba(0,45,14,.025)] backdrop-blur-md sm:px-7 lg:min-h-20">
          <Link to={getAudienceHome(audience)} aria-label="Ontiver home" className="shrink-0"><img src="/assets/logo.svg" alt="Ontiver" className="h-8 w-auto sm:h-9" /></Link>
          <nav aria-label="Main navigation" className="hidden items-center gap-3 lgg:flex xl:gap-4">
            {navLinks.map(item => {
              const active = pathname === item.to || pathname.startsWith(item.to + "/");
              const open = openDropdown === item.name;
              const panelId = `nav-${item.name.toLowerCase().replaceAll(" ", "-")}`;
              return <div key={item.to} className="-my-4 py-4" onMouseEnter={() => { clickedDropdown.current = null; setOpenDropdown(item.children ? item.name : null); }} onMouseLeave={() => setOpenDropdown(null)} onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget as Node)) setOpenDropdown(null); }}>
                <div className="flex items-center">
                  <Link to={item.to} aria-current={pathname === item.to ? "page" : undefined} onClick={() => setOpenDropdown(null)} onKeyDown={event => { if (item.children && event.key === "ArrowDown") { event.preventDefault(); focusDropdown(item.name); } }} className={`py-3 text-sm font-medium transition-colors hover:text-[#007d21] ${active || open ? "text-[#007d21]" : "text-[#002d0e]/75"}`}>{item.name}</Link>
                  {item.children && <button type="button" aria-label={`${item.name} links`} aria-expanded={open} aria-controls={open ? panelId : undefined} onClick={() => { const next = open && clickedDropdown.current === item.name ? null : item.name; clickedDropdown.current = next; setOpenDropdown(next); }} onKeyDown={event => { if (event.key === "ArrowDown") { event.preventDefault(); focusDropdown(item.name); } }} className="grid size-7 place-items-center rounded-full text-[#002d0e]/70 hover:bg-[#edf5e7]"><ChevronDown size={14} className={open ? "rotate-180" : ""} aria-hidden="true" /></button>}
                </div>
                {item.children && open && <div id={panelId} data-nav-dropdown className="absolute left-1/2 top-full w-[min(960px,calc(100vw-64px))] -translate-x-1/2 pt-3">
                  <div className="max-h-[calc(100dvh-160px)] overflow-y-auto rounded-[28px] border border-[#002d0e]/10 bg-white shadow-[0_20px_60px_rgba(0,45,14,.12)]" data-lenis-prevent>
                    <div className="grid grid-cols-[1fr_230px] gap-5 p-5">
                      <div className={`grid content-start gap-1 ${item.children.length > 3 ? "grid-cols-2" : "grid-cols-1"}`}>{item.children.map(child => <DropdownLink key={child.to} item={child} close={() => setOpenDropdown(null)} />)}</div>
                      <div className="relative min-h-[240px] overflow-hidden rounded-[20px] bg-[#002d0e]">
                        <img src={menuImage.src} alt="" className="absolute inset-0 h-full w-full object-cover" style={{ objectPosition: menuImage.objectPosition }} />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#002d0e]/95 via-[#002d0e]/10 to-transparent" />
                        <p className="relative flex min-h-full items-end p-5 pt-32 text-card-title font-semibold leading-tight text-white">{item.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between gap-5 bg-[#edf5e7] px-7 py-5"><p className="text-body font-medium">{isEnterprise ? "Build your next workflow on trust." : "Your identity. Your permission."}</p><Link to={item.to} onClick={() => setOpenDropdown(null)} className="button-primary min-h-11 px-5 py-2.5">Explore {item.name.toLowerCase()}<ArrowUpRight size={17} aria-hidden="true" /></Link></div>
                  </div>
                </div>}
              </div>;
            })}
          </nav>
          <div className="hidden items-center gap-3 lgg:flex">
            <AudienceToggle compact />
            <Link to={primaryPath} className="button-primary min-h-10 px-5 py-2.5">{isEnterprise ? "Get a demo" : "Join Waitlist"}<ArrowUpRight size={16} aria-hidden="true" /></Link>
          </div>
          <button type="button" aria-label="Open menu" aria-haspopup="dialog" aria-expanded={menuPath === pathname} aria-controls="mobile-navigation" onClick={() => setMenuPath(pathname)} className="grid size-11 place-items-center rounded-full bg-[#edf5eb] lgg:hidden"><Menu size={21} /></button>
        </div>
      </header>
      <MobileMenu mobileMenuOpen={menuPath === pathname} setMobileMenuOpen={open => setMenuPath(open ? pathname : null)} onJoinClick={() => navigate(primaryPath)} audience={audience} navLinks={navLinks} />
    </>
  );
}
