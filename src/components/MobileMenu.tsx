import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, ChevronDown, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import type { NavItem } from "../data/navigation";
import { getAudienceHome, type Audience } from "../lib/audience";
import AudienceToggle from "./AudienceToggle";

type MobileMenuProps = {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (value: boolean) => void;
  onJoinClick: () => void;
  audience: Audience;
  navLinks: NavItem[];
};

export default function MobileMenu({ mobileMenuOpen, setMobileMenuOpen, onJoinClick, audience, navLinks }: MobileMenuProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [expanded, setExpanded] = useState<string | null>(null);
  const { pathname } = useLocation();
  const close = () => setMobileMenuOpen(false);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (!mobileMenuOpen) { dialog.close(); return; }
    dialog.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { dialog.close(); document.body.style.overflow = previousOverflow; };
  }, [mobileMenuOpen]);

  return (
    <dialog ref={dialogRef} id="mobile-navigation" data-lenis-prevent aria-label="Main navigation" onCancel={close} className="fixed inset-0 m-0 h-dvh max-h-none w-full max-w-none overflow-y-auto overscroll-contain border-0 bg-[#edf5eb] p-6 text-[#002d0e] backdrop:bg-black/20 sm:p-10">
      <div className="flex min-h-full flex-col">
        <div className="flex items-center justify-between">
          <Link to={getAudienceHome(audience)} onClick={close} aria-label="Ontiver home"><img src="/assets/logo.svg" alt="Ontiver" className="h-8" /></Link>
          <button type="button" aria-label="Close menu" onClick={close} className="grid size-12 place-items-center rounded-full border border-[#002d0e]/15 bg-white"><X size={21} /></button>
        </div>
        <AudienceToggle className="mt-10 self-start" />
        <nav className="my-8 divide-y divide-[#002d0e]/10" aria-label="Mobile navigation">
          {navLinks.map(item => {
            const open = expanded === item.name;
            const id = `mobile-${item.name.toLowerCase().replaceAll(" ", "-")}`;
            return <div key={item.to}>
              <div className="flex items-center justify-between gap-4 py-4">
                <Link to={item.to} aria-current={pathname === item.to ? "page" : undefined} onClick={close} className="flex-1 py-2 text-card-title font-semibold">{item.name}</Link>
                {item.children ? <button type="button" aria-label={`${item.name} links`} aria-expanded={open} aria-controls={id} onClick={() => setExpanded(open ? null : item.name)} className="grid size-11 shrink-0 place-items-center rounded-full border border-[#002d0e]/15"><ChevronDown size={19} className={open ? "rotate-180" : ""} /></button> : <ArrowUpRight size={22} aria-hidden="true" />}
              </div>
              {item.children && <div id={id} hidden={!open} className="pb-5">
                <div className="space-y-1 rounded-2xl bg-white p-2">{item.children.map(child => {
                  const Icon = child.icon;
                  const content = <>{Icon && <Icon size={20} className="shrink-0 text-[#007d21]" aria-hidden="true" />}<span>{child.name}</span>{child.external && <ArrowUpRight size={15} className="ml-auto shrink-0" />}</>;
                  const className = "flex items-center gap-3 rounded-xl p-3 text-body hover:bg-[#edf5e7]";
                  return child.external ? <a key={child.to} href={child.to} target="_blank" rel="noreferrer" onClick={close} className={className}>{content}</a> : <Link key={child.to} to={child.to} aria-current={pathname === child.to ? "page" : undefined} onClick={close} className={className}>{content}</Link>;
                })}</div>
              </div>}
            </div>;
          })}
        </nav>
        <button type="button" className="button-primary mt-auto w-full" onClick={() => { close(); onJoinClick(); }}>{audience === "enterprise" ? "Request Demo" : "Join Waitlist"}<ArrowUpRight size={18} /></button>
        <p className="pt-7 text-center text-meta text-[#002d0e]/55">&copy; 2026 Ontiver. All rights reserved.</p>
      </div>
    </dialog>
  );
}
