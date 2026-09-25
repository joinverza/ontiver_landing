import { useEffect, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useIsPresent } from "framer-motion";
import { ArrowUpRight, ChevronDown, Menu } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { enterpriseNavLinks, individualNavLinks, type NavLink } from "../data/navigation";
import { imagery } from "../data/imagery";
import { getAudienceFromPath, getAudienceHome } from "../lib/audience";
import MobileMenu from "./MobileMenu";
import AudienceToggle from "./AudienceToggle";
import { useMotionSettings } from "./MotionSettings";
import "./navigation-motion.css";

const platformMenuDescriptions: Record<string, string> = {
  "/enterprise/platform/identity-sources": "NIN/BVN, documents, and trusted confirmations.",
  "/enterprise/platform/verification-engine": "Identity, document, face, and credential checks.",
  "/enterprise/platform/workflow-engine": "Ordered checks, retries, approvals, and expiry.",
  "/enterprise/platform/intelligence": "OCR, inconsistencies, and duplicate signals.",
  "/enterprise/platform/consent-and-privacy": "Purpose, approval, and sharing history.",
  "/enterprise/platform/identity-proofs": "Approved claims, validation, and controlled reuse.",
};

function DropdownPanel({ id, onEnter, children }: { id: string; onEnter: () => void; children: ReactNode }) {
  const present = useIsPresent();
  const { paused, reduced } = useMotionSettings();
  const motionDisabled = paused || reduced;
  return <motion.div
    id={id}
    data-dropdown-panel
    data-nav-dropdown={present ? "" : undefined}
    data-lenis-prevent
    aria-hidden={!present}
    inert={!present}
    onMouseEnter={present ? onEnter : undefined}
    initial={motionDisabled ? false : { opacity: 0, y: -8 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: motionDisabled ? 0 : -6 }}
    transition={{ duration: motionDisabled ? 0 : present ? 0.2 : 0.14, ease: [0.2, 0.8, 0.2, 1] }}
    style={{ pointerEvents: present ? "auto" : "none" }}
    className="nav-popup-panel absolute left-1/2 top-full max-h-[calc(100dvh-80px)] w-screen -translate-x-1/2 overflow-y-auto border-b border-[#002d0e]/10 bg-white shadow-[0_20px_30px_rgba(0,45,14,.035)]"
  >{children}</motion.div>;
}

function DropdownLink({ item, close }: { item: NavLink; close: () => void }) {
  const content = <><span className="min-w-0"><span className="block text-body font-medium">{item.name}</span><span className="mt-1.5 block text-sm leading-snug text-[#526058]">{platformMenuDescriptions[item.to] ?? item.description}</span></span>{item.external && <ArrowUpRight size={16} className="ml-auto shrink-0" aria-hidden="true" />}</>;
  const className = "flex items-start gap-3 rounded-lg border border-[#002d0e]/15 px-4 py-3 transition-colors hover:border-[#007d21] hover:bg-[#f4f6f1] focus-visible:bg-[#f4f6f1]";
  return item.external ? <a href={item.to} target="_blank" rel="noreferrer" className={className} onClick={close}>{content}</a> : <Link to={item.to} className={className} onClick={close}>{content}</Link>;
}

export default function Navbar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const headerRef = useRef<HTMLElement>(null);
  const clickedDropdown = useRef<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const openTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [menuPath, setMenuPath] = useState<string | null>(null);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const audience = getAudienceFromPath(pathname);
  const isEnterprise = audience === "enterprise";
  const navLinks = isEnterprise ? enterpriseNavLinks : individualNavLinks;
  const primaryPath = isEnterprise ? "/enterprise/contact" : "/waitlist";
  const menuImage = imagery.candidateReview;

  function cancelClose() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    if (openTimer.current) clearTimeout(openTimer.current);
    closeTimer.current = null;
    openTimer.current = null;
  }

  function closeDropdown() {
    cancelClose();
    setOpenDropdown(null);
  }

  useEffect(() => () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    if (openTimer.current) clearTimeout(openTimer.current);
  }, []);

  useEffect(() => {
    if (!openDropdown) return;
    const closeOutside = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) {
        cancelClose();
        setOpenDropdown(null);
      }
    };
    document.addEventListener("pointerdown", closeOutside);
    return () => document.removeEventListener("pointerdown", closeOutside);
  }, [openDropdown]);

  function focusDropdown(name: string) {
    cancelClose();
    setOpenDropdown(name);
    requestAnimationFrame(() => headerRef.current?.querySelector<HTMLElement>("[data-nav-dropdown] a")?.focus());
  }

  return (
    <>
      <header ref={headerRef} data-ontiver-navbar className="fixed inset-x-0 top-0 z-50 border-b border-[#002d0e]/10 bg-white/97 backdrop-blur-md" onKeyDown={event => {
        if (event.key !== "Escape" || !openDropdown) return;
        event.preventDefault();
        cancelClose();
        const trigger = headerRef.current?.querySelector<HTMLButtonElement>('button[aria-expanded="true"]');
        setOpenDropdown(null);
        trigger?.focus();
      }}>
        <div data-mobile-nav-pill className="site-container relative flex min-h-[76px] items-center justify-between gap-4 py-3 lg:min-h-20">
          <div className="flex shrink-0 items-center gap-5"><Link to={getAudienceHome(audience)} aria-label="Ontiver home" className="shrink-0"><img src="/assets/logo.svg" alt="Ontiver" className="h-7 w-auto sm:h-8" /></Link><div className="hidden lgg:block"><AudienceToggle compact /></div></div>
          <nav aria-label="Main navigation" className="hidden items-center gap-3 lgg:flex xl:gap-4">
            {navLinks.map(item => {
              const active = pathname === item.to || pathname.startsWith(item.to + "/");
              const open = openDropdown === item.name;
              const panelId = `nav-${item.name.toLowerCase().replaceAll(" ", "-")}`;
              return <div key={item.to} className="-my-4 py-4" onMouseEnter={() => {
                cancelClose();
                clickedDropdown.current = null;
                const next = item.children ? item.name : null;
                // Allow diagonal travel into the open panel without switching menus en route.
                if (openDropdown && openDropdown !== next) openTimer.current = setTimeout(() => setOpenDropdown(next), 180);
                else setOpenDropdown(next);
              }} onMouseLeave={() => { cancelClose(); closeTimer.current = setTimeout(() => setOpenDropdown(current => current === item.name ? null : current), 220); }} onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget as Node)) { cancelClose(); setOpenDropdown(current => current === item.name ? null : current); } }}>
                <div className="flex items-center">
                  <Link to={item.to} aria-current={pathname === item.to ? "page" : undefined} onClick={closeDropdown} onKeyDown={event => { if (item.children && event.key === "ArrowDown") { event.preventDefault(); focusDropdown(item.name); } }} className={`py-3 text-sm font-medium transition-colors hover:text-[#007d21] ${active || open ? "text-[#007d21]" : "text-[#002d0e]/75"}`}>{item.name}</Link>
                  {item.children && <button type="button" aria-label={`${item.name} links`} aria-expanded={open} aria-controls={open ? panelId : undefined} onClick={() => { cancelClose(); const next = open && clickedDropdown.current === item.name ? null : item.name; clickedDropdown.current = next; setOpenDropdown(next); }} onKeyDown={event => { if (event.key === "ArrowDown") { event.preventDefault(); focusDropdown(item.name); } }} className="grid size-7 place-items-center rounded-full text-[#002d0e]/70 hover:bg-[#edf5e7]"><ChevronDown size={14} className={`nav-chevron ${open ? "rotate-180" : ""}`} aria-hidden="true" /></button>}
                </div>
                <AnimatePresence initial={false}>{item.children && open && <DropdownPanel key={panelId} id={panelId} onEnter={cancelClose}>
                  <div className="site-container grid grid-cols-[.8fr_1.7fr_.85fr] gap-6 py-6">
                    <div className="flex flex-col items-start justify-between rounded-lg bg-[#f4f6f1] p-5"><div><p className="text-card-title font-medium">{item.name}</p><p className="mt-3 text-sm text-[#526058]">{item.description}</p></div><Link to={item.to} onClick={closeDropdown} className="mt-6 inline-flex items-center gap-2 text-sm font-medium">Explore {item.name.toLowerCase()}<ArrowUpRight size={16} /></Link></div>
                    <div className={`grid content-start gap-2.5 ${item.children.length > 3 ? "grid-cols-2" : "grid-cols-1"}`}>{item.children.map(child => <DropdownLink key={child.to} item={child} close={closeDropdown} />)}</div>
                    <Link to={isEnterprise ? "/enterprise/resources" : "/resources"} onClick={closeDropdown} className="group self-start">
                      <div className="image-card aspect-[1.65] overflow-hidden rounded-lg bg-[#edf5e7]"><img src={menuImage.src} alt={menuImage.alt} width={menuImage.width} height={menuImage.height} className="h-full w-full object-cover" style={{ objectPosition: menuImage.objectPosition }} /><span className="absolute bottom-3 right-3 grid size-9 place-items-center rounded-full bg-white"><ArrowUpRight size={18} aria-hidden="true" /></span></div>
                      <p className="mt-4 text-body font-medium">{isEnterprise ? "Plan your workflow." : "Understand requests and sharing."}</p>
                    </Link>
                    </div>
                </DropdownPanel>}</AnimatePresence>
              </div>;
            })}
          </nav>
          <div className="hidden items-center gap-3 lgg:flex">
            <Link to={primaryPath} className="button-primary min-h-10 px-5 py-2.5">{isEnterprise ? "Get a demo" : "Join Waitlist"}<ArrowUpRight size={16} aria-hidden="true" /></Link>
          </div>
          <button type="button" aria-label="Open menu" aria-haspopup="dialog" aria-expanded={menuPath === pathname} aria-controls="mobile-navigation" onClick={() => setMenuPath(pathname)} className="grid size-11 place-items-center rounded-full bg-[#edf5eb] lgg:hidden"><Menu size={21} /></button>
        </div>
      </header>
      <MobileMenu mobileMenuOpen={menuPath === pathname} setMobileMenuOpen={open => setMenuPath(open ? pathname : null)} onJoinClick={() => navigate(primaryPath)} audience={audience} navLinks={navLinks} />
    </>
  );
}
