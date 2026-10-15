import ActionIcon from "../ui/ActionIcon";
import NavigationIcon from "../ui/NavigationIcon";
import { useEffect, useState } from "react";
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
        className="fixed inset-x-0 top-0 z-50 border-b border-[#002d0e]/10 bg-surface/97 backdrop-blur-md"
      >
        <div
          data-mobile-nav-pill
          className="site-container navbar-rail flex items-center justify-between gap-4"
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
          <Link to={primaryPath} className="button-primary navbar-action hidden lgg:inline-flex">
            {enterprise ? "Get a demo" : "Join Waitlist"}
            <ActionIcon size={16} aria-hidden="true" />
          </Link>
          <button
            type="button"
            aria-label="Open menu"
            aria-haspopup="dialog"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMobileMenu({ routeKey, open: true })}
            className="navigation-control navigation-control--icon inline-flex lgg:hidden"
          >
            <NavigationIcon variant="menu" size={24} />
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
