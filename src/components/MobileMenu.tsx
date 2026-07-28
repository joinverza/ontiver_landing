import { useCallback, useEffect, useRef } from "react";
import gsap from "gsap";
import { X } from "lucide-react";
import { Link, useLocation } from "../lib/router";
import type { NavLink } from "../data/navigation";
import { footerIcons } from "../data/footer";
import { getAudienceHome, type Audience } from "../lib/audience";
import MagneticFillButton from "./ui/MagneticFillButton";
import AudienceToggle from "./AudienceToggle";

type MobileMenuProps = {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (value: boolean) => void;
  onJoinClick: () => void;
  audience: Audience;
  navLinks: NavLink[];
};

function getPillClipPath() {
  const pill = document.querySelector<HTMLElement>("[data-mobile-nav-pill]");
  const rect = pill?.getBoundingClientRect();
  const vw = window.innerWidth;
  const vh = window.innerHeight;

  if (!rect) {
    return "inset(12px 16px calc(100% - 64px) 16px round 40px)";
  }

  return `inset(${rect.top}px ${vw - rect.right}px ${vh - rect.bottom}px ${rect.left}px round 40px)`;
}

function isActivePath(pathname: string, to: string) {
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

export default function MobileMenu({
  mobileMenuOpen,
  setMobileMenuOpen,
  onJoinClick,
  audience,
  navLinks,
}: MobileMenuProps) {
  const { pathname } = useLocation();
  const menuRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const previousOverflowRef = useRef("");
  const hasOpenedRef = useRef(false);

  const closeMenu = useCallback(() => {
    setMobileMenuOpen(false);
  }, [setMobileMenuOpen]);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname, setMobileMenuOpen]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMenu();
    };

    if (mobileMenuOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [closeMenu, mobileMenuOpen]);

  useEffect(() => {
    const menu = menuRef.current;
    const content = contentRef.current;
    const pill = document.querySelector<HTMLElement>("[data-mobile-nav-pill]");

    if (!menu || !content) return;

    const logo = menu.querySelector<HTMLElement>("[data-mobile-menu-logo]");
    const links = gsap.utils.toArray<HTMLElement>("[data-mobile-menu-link]", menu);
    const indexes = gsap.utils.toArray<HTMLElement>(
      "[data-mobile-menu-index]",
      menu,
    );
    const join = menu.querySelector<HTMLElement>("[data-mobile-menu-join]");
    const socials = gsap.utils.toArray<HTMLElement>(
      "[data-mobile-menu-social]",
      menu,
    );
    const footer = menu.querySelector<HTMLElement>("[data-mobile-menu-footer]");
    const animatedItems = [
      logo,
      ...links,
      ...indexes,
      join,
      ...socials,
      footer,
    ].filter(Boolean) as HTMLElement[];

    timelineRef.current?.kill();

    if (mobileMenuOpen) {
      hasOpenedRef.current = true;
      previousOverflowRef.current = document.body.style.overflow;
      document.body.style.overflow = "hidden";

      gsap.set(menu, {
        display: "flex",
        pointerEvents: "auto",
        clipPath: getPillClipPath(),
      });
      gsap.set(content, { opacity: 1 });
      gsap.set(pill, { opacity: 1 });
      gsap.set(logo, { opacity: 0, x: -12 });
      gsap.set(links, { opacity: 0, y: 28 });
      gsap.set(indexes, { opacity: 0 });
      gsap.set(join, { opacity: 0, y: 20 });
      gsap.set(socials, { scale: 0, opacity: 0 });
      gsap.set(footer, { opacity: 0 });

      const tl = gsap.timeline();
      timelineRef.current = tl;

      tl.to(
        pill,
        {
          opacity: 0,
          duration: 0.2,
          ease: "power2.out",
        },
        0,
      )
        .to(
          menu,
          {
            clipPath: "inset(0px 0px 0px 0px round 24px)",
            duration: 0.55,
            ease: "power3.inOut",
          },
          0,
        )
        .to(
          logo,
          { opacity: 1, x: 0, duration: 0.3, ease: "power2.out" },
          0.6,
        )
        .to(
          links,
          {
            opacity: 1,
            y: 0,
            duration: 0.45,
            ease: "power3.out",
            stagger: 0.07,
          },
          0.65,
        )
        .to(
          indexes,
          {
            opacity: 1,
            duration: 0.3,
            ease: "none",
            stagger: 0.07,
          },
          0.75,
        )
        .to(
          join,
          { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" },
          1.05,
        )
        .to(
          socials,
          {
            scale: 1,
            opacity: 0.5,
            duration: 0.3,
            ease: "back.out(2)",
            stagger: 0.05,
          },
          1.15,
        )
        .to(footer, { opacity: 1, duration: 0.25, ease: "none" }, 1.25);

      return;
    }

    if (!hasOpenedRef.current) return;

    const collapseClip = () => {
      gsap.to(menu, {
        clipPath: getPillClipPath(),
        duration: 0.4,
        ease: "power3.inOut",
        onComplete: () => {
          gsap.set(menu, {
            display: "none",
            pointerEvents: "none",
            clipPath: "",
          });
          gsap.set(animatedItems, { clearProps: "all" });
          gsap.set(pill, { clearProps: "opacity" });
          document.body.style.overflow = previousOverflowRef.current;
          hasOpenedRef.current = false;
        },
      });

      gsap.to(pill, {
        opacity: 1,
        duration: 0.2,
        delay: 0.15,
        ease: "power2.out",
      });
    };

    const exitTl = gsap.timeline({ onComplete: collapseClip });
    timelineRef.current = exitTl;

    exitTl
      .to(
        [links, indexes, join, socials, footer].flat(),
        {
          opacity: 0,
          y: -16,
          duration: 0.2,
          ease: "power2.in",
          stagger: 0.03,
        },
        0,
      )
      .to(
        logo,
        {
          opacity: 0,
          x: -8,
          duration: 0.15,
          ease: "power2.in",
        },
        0,
      );
  }, [mobileMenuOpen]);

  return (
    <div
      ref={menuRef}
      className="fixed inset-0 z-[9998] hidden flex-col overflow-hidden rounded-[24px] bg-white text-[#05150E] md:hidden"
      aria-hidden={!mobileMenuOpen}
    >
      <div
        ref={contentRef}
        className="flex min-h-dvh flex-col overflow-hidden bg-white"
      >
        <div className="relative z-10 grid h-16 shrink-0 grid-cols-[1fr_auto_1fr] items-center border-b border-black/[0.08] px-5">
          <Link
            to={getAudienceHome(audience)}
            data-mobile-menu-logo
            aria-label="Ontiver home"
            onClick={closeMenu}
          >
            <img src="/assets/logo.svg" alt="Ontiver" className="h-7" />
          </Link>
          <AudienceToggle compact />
          <button
            type="button"
            className="ml-auto grid h-10 w-10 cursor-pointer place-items-center rounded-full text-[#05150E] transition-colors hover:bg-black/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#009311]"
            aria-label="Close menu"
            onClick={closeMenu}
          >
            <X className="size-5" aria-hidden="true" />
          </button>
        </div>

        <nav className="relative z-10 flex-1 overflow-y-auto pt-5">
          {navLinks.map((item, index) => {
            const isActive = isActivePath(pathname, item.to);
            const number = String(index + 1).padStart(2, "0");

            return (
              <Link
                key={item.to}
                to={item.to}
                data-mobile-menu-link
                className={`group relative flex min-h-[82px] cursor-pointer items-center border-b border-black/[0.08] px-6 pr-7 no-underline transition-colors duration-200 ${
                  isActive ? "text-[#009311]" : "text-[#05150E]"
                }`}
                onClick={closeMenu}
              >
                <span
                  className={`absolute left-0 top-0 h-full w-0.5 origin-top bg-[#009311] transition-transform duration-200 ${
                    isActive
                      ? "scale-y-100"
                      : "scale-y-0 group-hover:scale-y-100"
                  }`}
                  aria-hidden="true"
                />
                <span className="text-[clamp(2rem,8vw,3.2rem)] font-semibold leading-none tracking-[0.02em] transition-[letter-spacing,color] duration-250 ease-out group-hover:tracking-[0.12em]">
                  {item.name}
                </span>
                <span
                  data-mobile-menu-index
                  className={`ml-auto text-[11px] font-normal transition-colors duration-150 ${
                    isActive
                      ? "text-[#009311]"
                      : "text-black/35 group-hover:text-[#009311]"
                  }`}
                >
                  {number}
                </span>
              </Link>
            );
          })}
        </nav>

        <div className="relative z-10 shrink-0 px-6 pb-5 pt-7">
          <div data-mobile-menu-join>
            <MagneticFillButton
              type="button"
              variant="green"
              className="h-[52px] w-full rounded-xl text-sm font-bold"
              onClick={() => {
                closeMenu();
                window.setTimeout(onJoinClick, 420);
              }}
            >
              {audience === "enterprise" ? "Request Demo" : "Join Waitlist"}
            </MagneticFillButton>
          </div>

          <div className="mt-5 flex justify-center gap-5">
            {footerIcons.map((icon) => (
              <a
                key={icon.alt}
                data-mobile-menu-social
                href={icon.href}
                target="_blank"
                rel="noreferrer"
                aria-label={`Follow Ontiver on ${icon.alt}`}
                className="grid h-10 w-10 place-items-center rounded-full border border-black/10 opacity-60 transition hover:border-[#009311]/40 hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#009311]"
              >
                <img src={icon.icon} alt="" className="h-5 w-5 brightness-0" />
              </a>
            ))}
          </div>
        </div>

        <p
          data-mobile-menu-footer
          className="shrink-0 pb-4 text-center text-[11px] text-black/40"
        >
          &copy; 2026 Ontiver. All rights reserved.
        </p>
      </div>
    </div>
  );
}
