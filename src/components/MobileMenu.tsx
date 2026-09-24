import { useEffect, useRef } from "react";
import { ArrowUpRight, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import type { NavLink } from "../data/navigation";
import { getAudienceHome, type Audience } from "../lib/audience";
import AudienceToggle from "./AudienceToggle";

type MobileMenuProps = {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (value: boolean) => void;
  onJoinClick: () => void;
  audience: Audience;
  navLinks: NavLink[];
};

export default function MobileMenu({ mobileMenuOpen, setMobileMenuOpen, onJoinClick, audience, navLinks }: MobileMenuProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const { pathname } = useLocation();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (!mobileMenuOpen) {
      dialog.close();
      return;
    }
    dialog.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
    };
  }, [mobileMenuOpen]);

  return (
    <dialog ref={dialogRef} id="mobile-navigation" aria-label="Main navigation" onCancel={() => setMobileMenuOpen(false)} className="fixed inset-0 m-0 h-dvh max-h-none w-full max-w-none border-0 bg-[#edf5eb] p-6 text-[#002d0e] backdrop:bg-black/20 sm:p-10">
      <div className="flex min-h-full flex-col">
        <div className="flex items-center justify-between">
          <Link to={getAudienceHome(audience)} onClick={() => setMobileMenuOpen(false)} aria-label="Ontiver home"><img src="/assets/logo.svg" alt="Ontiver" className="h-8" /></Link>
          <button type="button" aria-label="Close menu" onClick={() => setMobileMenuOpen(false)} className="grid size-12 place-items-center rounded-full border border-[#002d0e]/15 bg-white"><X size={21} /></button>
        </div>
        <AudienceToggle className="mt-10 self-start" />
        <nav className="my-8 divide-y divide-[#002d0e]/10" aria-label="Mobile navigation">
          {navLinks.map(item => <Link key={item.to} to={item.to} aria-current={pathname === item.to ? "page" : undefined} onClick={() => setMobileMenuOpen(false)} className="flex items-center justify-between gap-5 py-6 text-card-title font-semibold"><span>{item.name}</span><ArrowUpRight size={22} className="shrink-0" /></Link>)}
        </nav>
        <button type="button" className="button-primary mt-auto w-full" onClick={() => { setMobileMenuOpen(false); onJoinClick(); }}>{audience === "enterprise" ? "Request Demo" : "Join Waitlist"}<ArrowUpRight size={18} /></button>
        <p className="pt-7 text-center text-meta text-[#002d0e]/55">&copy; 2026 Ontiver. All rights reserved.</p>
      </div>
    </dialog>
  );
}
