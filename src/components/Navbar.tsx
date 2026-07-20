import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { enterpriseNavLinks, individualNavLinks } from "../data/navigation";
import { useJoinNavigation } from "../hooks/useJoinNavigation";
import { getAudienceFromPath, getAudienceHome } from "../lib/audience";
import MobileMenu from "./MobileMenu";
import MagneticFillButton from "./ui/MagneticFillButton";
import AudienceToggle from "./AudienceToggle";

function isNavLinkActive(pathname: string, to: string) {
  if (to === "/") return pathname === "/";
  if (to === "/enterprise") return pathname === "/enterprise";
  if (to === "/blogs") {
    return (
      pathname === "/blogs" ||
      pathname.startsWith("/blogs/") ||
      pathname === "/blog" ||
      pathname.startsWith("/blog/") ||
      pathname.startsWith("/resources")
    );
  }

  return pathname === to || pathname.startsWith(`${to}/`);
}

function DesktopNavLink({
  to,
  name,
  active,
  isOpen,
  index,
}: {
  to: string;
  name: string;
  active: boolean;
  isOpen: boolean;
  index: number;
}) {
  return (
    <Link
      to={to}
      aria-current={active ? "page" : undefined}
      className={`group/navlink relative inline-flex h-8 cursor-pointer items-center overflow-hidden whitespace-nowrap px-1 text-[0.9rem] font-medium transition-colors duration-300 ${
        active ? "text-[#00710dfe] uppercase tracking-wider" : "text-black hover:text-[#003106]"
      }`}
      style={{
        opacity: isOpen ? 1 : 0,
        transform: isOpen ? "translateY(0)" : "translateY(7px)",
        transition:
          "opacity 200ms ease, transform 200ms ease, color 240ms ease",
        transitionDelay: isOpen ? `${400 + index * 60}ms` : "0ms",
      }}
    >
      <span className="relative block overflow-hidden leading-none">
        <span className="block transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/navlink:-translate-y-full">
          {name}
        </span>
        <span
          aria-hidden="true"
          className="absolute left-0 top-full block text-[#009311] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/navlink:-translate-y-full"
        >
          {name}
        </span>
      </span>
      <span
        aria-hidden="true"
        className={`absolute bottom-0 left-1/2 h-px -translate-x-1/2 bg-[#009311] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          active
            ? "w-[calc(100%-0.5rem)] opacity-100"
            : "w-0 opacity-0 group-hover/navlink:w-[calc(100%-0.5rem)] group-hover/navlink:opacity-100"
        }`}
      />
    </Link>
  );
}

export default function Navbar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const goToJoin = useJoinNavigation();
  const lastScrollYRef = useRef(0);
  const lastScrollTimeRef = useRef(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileNavHidden, setMobileNavHidden] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const audience = getAudienceFromPath(pathname);
  const isEnterprise = audience === "enterprise";
  const navLinks = isEnterprise ? enterpriseNavLinks : individualNavLinks;
  const isPricingPage = pathname === "/enterprise/pricing";
  const homePath = getAudienceHome(audience);
  const handlePrimaryAction = isEnterprise
    ? () => navigate("/enterprise/contact")
    : goToJoin;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    const syncMobileState = () => {
      setIsMobile(mediaQuery.matches);
      if (!mediaQuery.matches) {
        setMobileNavHidden(false);
        setMobileMenuOpen(false);
      }
    };

    syncMobileState();
    mediaQuery.addEventListener("change", syncMobileState);
    return () => mediaQuery.removeEventListener("change", syncMobileState);
  }, []);

  useEffect(() => {
    if (!isMobile) return;

    lastScrollYRef.current = window.scrollY;
    lastScrollTimeRef.current = performance.now();

    const handleMobileScroll = () => {
      if (mobileMenuOpen) return;

      const currentY = window.scrollY;
      const now = performance.now();
      const deltaY = currentY - lastScrollYRef.current;
      const deltaTime = Math.max(16, now - lastScrollTimeRef.current);
      const velocity = Math.abs(deltaY) / deltaTime;

      if (currentY <= 12 || deltaY < -2) {
        setMobileNavHidden(false);
      } else if (currentY > 80 && deltaY > 8 && velocity > 0.35) {
        setMobileNavHidden(true);
      }

      lastScrollYRef.current = currentY;
      lastScrollTimeRef.current = now;
    };

    window.addEventListener("scroll", handleMobileScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleMobileScroll);
  }, [isMobile, mobileMenuOpen]);

  const isOpen = true;

  return (
    <>
      <div
        data-ontiver-navbar
        className="pointer-events-none fixed left-0 top-3 z-[9999] flex w-full justify-center md:top-6"
        style={{
          opacity: 1,
          transform:
            isMobile && mobileNavHidden && !mobileMenuOpen
              ? "translateY(-140px)"
              : "translateY(0)",
          transition: isMobile
              ? "opacity 300ms ease-out, transform 360ms cubic-bezier(0.22,1,0.36,1)"
              : "opacity 300ms ease-out, transform 300ms ease-out",
        }}
      >
        <div
          data-mobile-nav-pill
          style={{
            width: isMobile
              ? "calc(100vw - 32px)"
              : isOpen
                ? "min(1180px, calc(100vw - 32px))"
                : "48px",
            height: isMobile ? "52px" : "76px",
            opacity: isOpen ? 1 : 0,
            transform: isOpen ? "scale(1)" : "scale(0.5)",
            borderRadius: isMobile ? "40px" : "25px",
            backgroundColor: isMobile
              ? isScrolled
                ? "rgba(255,255,255,0.95)"
                : "rgba(255,255,255,0.88)"
              : "white",
            backdropFilter: isMobile ? "blur(14px)" : undefined,
            boxShadow: isPricingPage
              ? "none"
              : "0 8px 30px rgba(0,0,0,0.08)",
            border: isMobile
              ? "1px solid rgba(0,0,0,0.08)"
              : "1px solid rgba(0,0,0,0.05)",
            overflow: "hidden",
            pointerEvents: isOpen ? "auto" : "none",
            transition: isOpen
              ? [
                  "opacity 200ms ease-in",
                  "transform 200ms ease-in",
                  "width 500ms cubic-bezier(0.4, 0, 0.2, 1) 150ms",
                ].join(", ")
              : [
                  "opacity 150ms ease-out 250ms",
                  "transform 150ms ease-out 250ms",
                  "width 300ms cubic-bezier(0.4, 0, 0.2, 1)",
                ].join(", "),
          }}
        >
          <div className="flex h-full items-center justify-between px-4 sm:px-6 md:px-8">
            <Link
              to={homePath}
              aria-label="Ontiver home"
              onClick={() => setMobileMenuOpen(false)}
              style={{
                opacity: isOpen ? 1 : 0,
                transform: isOpen ? "translateY(0)" : "translateY(7px)",
                transition: "opacity 200ms ease, transform 200ms ease",
                transitionDelay: isOpen ? "300ms" : "0ms",
                flexShrink: 0,
              }}
            >
              <img src="/assets/logo.svg" alt="Ontiver" className="h-7" />
            </Link>

            <div className="hidden shrink-0 gap-8 md:flex">
              {navLinks.map((link, idx) => (
                <DesktopNavLink
                  key={link.to}
                  to={link.to}
                  name={link.name}
                  active={isNavLinkActive(pathname, link.to)}
                  isOpen={isOpen}
                  index={idx}
                />
              ))}
            </div>

            <div className="hidden md:block">
              <AudienceToggle compact />
            </div>

            <div
              className="hidden lg:block"
              style={{
                opacity: isOpen ? 1 : 0,
                transform: isOpen ? "translateY(0)" : "translateY(7px)",
                transition: "opacity 200ms ease, transform 200ms ease",
                transitionDelay: isOpen ? "600ms" : "0ms",
                flexShrink: 0,
              }}
            >
              <MagneticFillButton
                variant="green"
                className="rounded-2xl px-6 py-2.5 text-[1rem] font-medium shadow-md"
                onClick={handlePrimaryAction}
              >
                {isEnterprise ? "Request Demo" : "Join Waitlist"}
              </MagneticFillButton>
            </div>

            <button
              type="button"
              className="group relative grid h-10 w-10 cursor-pointer place-items-center border-0 bg-transparent p-0 text-[#05150E] md:hidden"
              aria-label="Open menu"
              aria-expanded={mobileMenuOpen}
              aria-hidden={mobileMenuOpen}
              tabIndex={mobileMenuOpen ? -1 : 0}
              onClick={() => setMobileMenuOpen((open) => !open)}
              style={{
                opacity: isOpen ? 1 : 0,
                transform: isOpen ? "translateY(0)" : "translateY(7px)",
                transition: "opacity 200ms ease, transform 200ms ease",
                transitionDelay: isOpen ? "420ms" : "0ms",
              }}
            >
              <motion.span
                className="absolute h-[2px] w-5 rounded-[1px] bg-current"
                animate={{
                  y: mobileMenuOpen ? 0 : -4,
                  rotate: mobileMenuOpen ? 45 : 0,
                }}
                transition={{
                  duration: mobileMenuOpen ? 0.3 : 0.25,
                  ease: [0.4, 0, 0.2, 1],
                }}
              />
              <motion.span
                className="absolute h-[2px] rounded-[1px] bg-current"
                animate={{
                  y: mobileMenuOpen ? 0 : 4,
                  rotate: mobileMenuOpen ? -45 : 0,
                  width: mobileMenuOpen ? 20 : 13,
                }}
                whileHover={{ width: 20 }}
                whileTap={{ width: 20 }}
                transition={{
                  duration: mobileMenuOpen ? 0.3 : 0.25,
                  ease: [0.4, 0, 0.2, 1],
                }}
              />
            </button>
          </div>
        </div>
      </div>

      <MobileMenu
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        onJoinClick={handlePrimaryAction}
        audience={audience}
        navLinks={navLinks}
      />
    </>
  );
}
