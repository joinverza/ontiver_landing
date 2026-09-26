import { useEffect, useState } from "react";
import { ArrowUpRight, Menu } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { enterpriseNavLinks, individualNavLinks } from "../../data/navigation";
import { getAudienceFromPath, getAudienceHome } from "../../lib/audience";
import AudienceToggle from "./AudienceToggle";
import MobileMenu from "./MobileMenu";
import DesktopNavigation from "./DesktopNavigation";
import "./navigation-motion.css";

const Navbar = () => {
  const { pathname, key: routeKey } = useLocation();
  const navigate = useNavigate();
  const [mobileMenu, setMobileMenu] = useState({ routeKey, open: false });
  const audience = getAudienceFromPath(pathname);
  const enterprise = audience === "enterprise";
  const navLinks = enterprise ? enterpriseNavLinks : individualNavLinks;
  const primaryPath = enterprise ? "/enterprise/contact" : "/waitlist";

  if (mobileMenu.routeKey !== routeKey) setMobileMenu({ routeKey, open: false });
  const mobileMenuOpen = mobileMenu.routeKey === routeKey && mobileMenu.open;

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1250px)");
    const onResize = () => {
      if (desktop.matches) setMobileMenu((current) => ({ ...current, open: false }));
    };
    desktop.addEventListener("change", onResize);
    return () => desktop.removeEventListener("change", onResize);
  }, []);

  return (
    <>
      <header
        data-ontiver-navbar
        className="fixed inset-x-0 top-0 z-50 border-b border-[#002d0e]/10 bg-white/97 backdrop-blur-md"
      >
        <div
          data-mobile-nav-pill
          className="site-container flex min-h-[76px] items-center justify-between gap-4 py-3 lg:min-h-20"
        >
          <div className="flex shrink-0 items-center gap-5">
            <Link to={getAudienceHome(audience)} aria-label="Ontiver home" className="shrink-0">
              <img src="/assets/logo.svg" alt="Ontiver" className="h-7 w-auto sm:h-8" />
            </Link>
            <div className="hidden lgg:block">
              <AudienceToggle compact />
            </div>
          </div>
          <DesktopNavigation
            audience={audience}
            items={navLinks}
            pathname={pathname}
            routeKey={routeKey}
          />
          <Link
            to={primaryPath}
            className="button-primary hidden min-h-10 px-5 py-2.5 lgg:inline-flex"
          >
            {enterprise ? "Get a demo" : "Join Waitlist"}
            <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
          <button
            type="button"
            aria-label="Open menu"
            aria-haspopup="dialog"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMobileMenu({ routeKey, open: true })}
            className="grid size-11 place-items-center rounded-full bg-[#edf5eb] lgg:hidden"
          >
            <Menu size={21} aria-hidden="true" />
          </button>
        </div>
      </header>
      <MobileMenu
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={(open) => setMobileMenu({ routeKey, open })}
        onJoinClick={() => navigate(primaryPath)}
        audience={audience}
        navLinks={navLinks}
      />
    </>
  );
};

export default Navbar;
