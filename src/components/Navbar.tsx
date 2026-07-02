import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { navLinks } from "../data/navigation";
import { useJoinNavigation } from "../hooks/useJoinNavigation";
import MobileMenu from "./MobileMenu";
import MagneticFillButton from "./ui/MagneticFillButton";

function isNavLinkActive(pathname: string, to: string) {
  if (to === "/") return pathname === "/";
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
        transform: isOpen ? "translateY(0)" : "translateY(6px)",
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
  const goToJoin = useJoinNavigation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSolutionPinned, setIsSolutionPinned] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isPricingPage = pathname === "/pricing";

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
    const syncMobileState = () => setIsMobile(mediaQuery.matches);

    syncMobileState();
    mediaQuery.addEventListener("change", syncMobileState);
    return () => mediaQuery.removeEventListener("change", syncMobileState);
  }, []);

  useEffect(() => {
    const handleSolutionPinChange = (event: Event) => {
      const { isPinned } = (event as CustomEvent<{ isPinned: boolean }>).detail;
      setIsSolutionPinned(isPinned);
    };

    window.addEventListener("solution-pin-change", handleSolutionPinChange);
    return () =>
      window.removeEventListener("solution-pin-change", handleSolutionPinChange);
  }, []);

  const shouldHideForSolution = isSolutionPinned && !isMobile && !isPricingPage;
  const isOpen = isMobile || isPricingPage || (isScrolled && !isSolutionPinned);

  return (
    <>
      <div
        data-ontiver-navbar
        className="pointer-events-none fixed left-0 top-5 z-[9999] flex w-full justify-center md:top-6"
        style={{
          opacity: shouldHideForSolution ? 0 : 1,
          transform: shouldHideForSolution ? "translateY(-140px)" : "translateY(0)",
          transition: shouldHideForSolution
            ? "opacity 300ms ease-in, transform 300ms ease-in"
            : "opacity 300ms ease-out, transform 300ms ease-out",
        }}
      >
        <div
          style={{
            width: isOpen ? "min(1000px, calc(100vw - 32px))" : "48px",
            height: isMobile ? "58px" : "76px",
            opacity: isOpen ? 1 : 0,
            transform: isOpen ? "scale(1)" : "scale(0.5)",
            borderRadius: isMobile ? "20px" : "25px",
            backgroundColor: "white",
            boxShadow: isPricingPage
              ? "none"
              : "0 8px 30px rgba(0,0,0,0.08)",
            border: "1px solid rgba(0,0,0,0.05)",
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
              to="/"
              aria-label="Ontiver home"
              onClick={() => setMobileMenuOpen(false)}
              style={{
                opacity: isOpen ? 1 : 0,
                transform: isOpen ? "translateY(0)" : "translateY(6px)",
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
                  onClick={() => setMobileMenuOpen(false)}
                  className="whitespace-nowrap text-sm font-medium text-black/80 hover:text-[#009311]"
                  style={{
                    opacity: isOpen ? 1 : 0,
                    transform: isOpen ? "translateY(0)" : "translateY(6px)",
                    transition:
                      "opacity 200ms ease, transform 200ms ease, color 200ms ease",
                    transitionDelay: isOpen ? `${400 + idx * 60}ms` : "0ms",
                  }}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <div
              className="hidden md:block"
              style={{
                opacity: isOpen ? 1 : 0,
                transform: isOpen ? "translateY(0)" : "translateY(6px)",
                transition: "opacity 200ms ease, transform 200ms ease",
                transitionDelay: isOpen ? "600ms" : "0ms",
                flexShrink: 0,
              }}
            >
              <MagneticFillButton
                variant="green"
                className="rounded-2xl px-6 py-2.5 text-[1rem] font-medium shadow-md"
                onClick={goToJoin}
              >
                Join Waitlist
              </MagneticFillButton>
            </div>

            <button
              type="button"
              className="group relative grid h-10 w-10 cursor-pointer place-items-center rounded-full border border-black/10 bg-[#f7fff7] text-[#05150E] transition-colors duration-200 hover:border-[#009311]/35 md:hidden"
              aria-label="Open menu"
              onClick={() => setMobileMenuOpen(true)}
              style={{
                opacity: isOpen ? 1 : 0,
                transform: isOpen ? "translateY(0)" : "translateY(6px)",
                transition: "opacity 200ms ease, transform 200ms ease",
                transitionDelay: isOpen ? "420ms" : "0ms",
              }}
            >
              <motion.span
                className="absolute h-[2px] w-4 rounded-full bg-current"
                animate={{
                  y: mobileMenuOpen ? 0 : -5,
                  rotate: mobileMenuOpen ? 45 : 0,
                }}
                transition={{ duration: 0.22, ease: "easeOut" }}
              />
              <motion.span
                className="absolute h-[2px] w-5 rounded-full bg-current"
                animate={{
                  opacity: mobileMenuOpen ? 0 : 1,
                  scaleX: mobileMenuOpen ? 0.4 : 1,
                }}
                transition={{ duration: 0.18, ease: "easeOut" }}
              />
              <motion.span
                className="absolute h-[2px] w-4 rounded-full bg-current"
                animate={{
                  y: mobileMenuOpen ? 0 : 5,
                  rotate: mobileMenuOpen ? -45 : 0,
                }}
                transition={{ duration: 0.22, ease: "easeOut" }}
              />
            </button>
          </div>
        </div>
      </div>

      <MobileMenu
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        onJoinClick={goToJoin}
      />
    </>
  );
}
