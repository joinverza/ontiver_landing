import { useState } from "react";
import { ArrowUpRight, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import type { NavItem } from "../../data/navigation";
import { getAudienceHome, type Audience } from "../../lib/audience";
import AudienceToggle from "./AudienceToggle";
import { useMotionSettings } from "../motion/MotionSettings";
import MobileNavigationItem from "./MobileNavigationItem";
import { keepDialogFocus, useMobileDialog } from "./useMobileDialog";
import "./navigation-motion.css";

type MobileMenuProps = {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (value: boolean) => void;
  onJoinClick: () => void;
  audience: Audience;
  navLinks: NavItem[];
};

const MobileMenu = ({
  mobileMenuOpen,
  setMobileMenuOpen,
  onJoinClick,
  audience,
  navLinks,
}: MobileMenuProps) => {
  const { pathname, key: routeKey } = useLocation();
  const { paused, reduced } = useMotionSettings();
  const dialogRef = useMobileDialog({
    open: mobileMenuOpen,
    routeKey,
    motionDisabled: paused || reduced,
  });
  const [group, setGroup] = useState({
    routeKey,
    menuOpen: mobileMenuOpen,
    name: null as string | null,
  });
  const close = () => setMobileMenuOpen(false);

  if (group.routeKey !== routeKey || group.menuOpen !== mobileMenuOpen) {
    setGroup({ routeKey, menuOpen: mobileMenuOpen, name: null });
  }
  const expanded =
    group.routeKey === routeKey && group.menuOpen === mobileMenuOpen ? group.name : null;

  return (
    <dialog
      ref={dialogRef}
      id="mobile-navigation"
      data-lenis-prevent
      aria-label="Main navigation"
      onKeyDown={keepDialogFocus}
      onCancel={(event) => {
        event.preventDefault();
        close();
      }}
      onAnimationEnd={(event) => {
        if (
          event.target === event.currentTarget &&
          event.animationName === "ontiver-menu-enter" &&
          mobileMenuOpen
        ) {
          event.currentTarget.dataset.state = "entered";
        }
      }}
      className="ontiver-mobile-menu fixed inset-0 m-0 h-dvh max-h-none w-full max-w-none overflow-y-auto overscroll-contain border-0 bg-white p-6 text-[#002d0e] backdrop:bg-black/20 sm:p-10"
    >
      <div className="flex min-h-full flex-col">
        <div className="flex items-center justify-between">
          <Link to={getAudienceHome(audience)} onClick={close} aria-label="Ontiver home">
            <img src="/assets/logo.svg" alt="Ontiver" className="h-8" />
          </Link>
          <button
            type="button"
            aria-label="Close menu"
            onClick={close}
            className="grid size-12 place-items-center rounded-full border border-[#002d0e]/15 bg-white"
          >
            <X size={21} aria-hidden="true" />
          </button>
        </div>
        <AudienceToggle className="mt-10 self-start" />
        <nav className="my-8 divide-y divide-[#002d0e]/10" aria-label="Mobile navigation">
          {navLinks.map((item) => (
            <MobileNavigationItem
              key={item.to}
              item={item}
              pathname={pathname}
              expanded={expanded === item.name}
              onToggle={() =>
                setGroup({
                  routeKey,
                  menuOpen: mobileMenuOpen,
                  name: expanded === item.name ? null : item.name,
                })
              }
              onNavigate={close}
            />
          ))}
        </nav>
        <button
          type="button"
          className="button-primary mt-auto w-full"
          onClick={() => {
            close();
            onJoinClick();
          }}
        >
          {audience === "enterprise" ? "Request Demo" : "Join Waitlist"}
          <ArrowUpRight size={18} aria-hidden="true" />
        </button>
        <p className="pt-7 text-center text-meta text-[#002d0e]/55">
          &copy; 2026 Ontiver. All rights reserved.
        </p>
      </div>
    </dialog>
  );
};

export default MobileMenu;
