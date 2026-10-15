import { Link } from "react-router-dom";
import {
  enterpriseFooterGroups,
  footerIcons,
  individualFooterGroups,
  type FooterLink,
} from "../../data/footer";
import { getAudienceHome, type Audience } from "../../lib/audience";
import "./footer.css";

const FooterNavLink = ({ item }: { item: FooterLink }) => {
  const className = "footer-link inline-flex text-[#526058] transition-colors hover:text-accent";
  return item.external ? (
    <a className={className} href={item.href} target="_blank" rel="noreferrer">
      {item.label}
    </a>
  ) : (
    <Link className={className} to={item.href}>
      {item.label}
    </Link>
  );
};

const Footer = ({ audience = "individual" }: { audience?: Audience }) => {
  const groups = audience === "enterprise" ? enterpriseFooterGroups : individualFooterGroups;
  return (
    <footer className="site-footer bg-surface-muted text-[#002d0e]">
      <div className="site-container">
        <div className="footer-main">
          <div className="footer-intro">
            <p className="footer-statement">
              {audience === "enterprise"
                ? "Trust for every next step."
                : "Your identity. Your control."}
            </p>
            <nav className="footer-social" aria-label="Ontiver social channels">
              {footerIcons.map((icon) => (
                <a
                  key={icon.alt}
                  href={icon.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Follow Ontiver on ${icon.alt}`}
                  className="footer-social-link"
                >
                  <img
                    src={icon.icon}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="footer-social-icon"
                  />
                  <span className="footer-social-label">{icon.alt}</span>
                </a>
              ))}
            </nav>
          </div>
          <div className="footer-navigation">
            {groups.map((group) => (
              <nav key={group.category} aria-label={`Footer ${group.category}`}>
                <h2 className="footer-category text-meta font-semibold text-[#526058]">
                  {group.category}
                </h2>
                <ul>
                  {group.list.map((item) => (
                    <li key={item.label}>
                      <FooterNavLink item={item} />
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>
        <div className="footer-bottom">
          <Link to={getAudienceHome(audience)} aria-label="Ontiver home">
            <img
              src="/assets/logo.svg"
              alt="Ontiver"
              loading="lazy"
              decoding="async"
              className="footer-logo"
            />
          </Link>
          <Link
            to={`${audience === "enterprise" ? "/enterprise" : ""}/security#regulatory-standing`}
            className="footer-credentials text-meta text-[#526058] hover:text-[#002d0e]"
          >
            <img
              src="/assets/certifications/ndpc-logo.png"
              alt=""
              loading="lazy"
              decoding="async"
              className="h-6 w-auto bg-surface"
            />
            <span>NDPC registered (NDPC/DCP/14404)</span>
            <span aria-hidden="true">·</span>
            <img
              src="/assets/certifications/nimc-logo.png"
              alt=""
              loading="lazy"
              decoding="async"
              className="h-6 w-auto bg-surface"
            />
            <span>NIMC-approved NINAuth Enterprise</span>
          </Link>
          <div className="footer-legal">
            <p className="text-meta text-[#526058]">
              &copy; 2026 Ontiver, operated by Qynara Technologies Limited (RC 9436348). All rights
              reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
