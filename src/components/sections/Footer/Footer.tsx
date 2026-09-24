import { Link } from "react-router-dom";
import { enterpriseFooterGroups, footerIcons, individualFooterGroups, type FooterLink } from "../../../data/footer";
import { getAudienceHome, type Audience } from "../../../lib/audience";

function FooterNavLink({ item }: { item: FooterLink }) {
  const className = "inline-flex py-1.5 text-sm text-[#002d0e]/65 transition-colors hover:text-[#007d21]";
  return item.external ? <a className={className} href={item.href} target="_blank" rel="noreferrer">{item.label}</a> : <Link className={className} to={item.href}>{item.label}</Link>;
}

export default function Footer({ audience = "individual" }: { audience?: Audience }) {
  const groups = audience === "enterprise" ? enterpriseFooterGroups : individualFooterGroups;
  return (
    <footer className="bg-[#edf5eb] pb-6 pt-16 text-[#002d0e] sm:pt-20">
      <div className="site-container">
        <div className="grid gap-10 pb-14 lg:grid-cols-[1.1fr_3fr] lg:gap-20">
          <div>
            <Link to={getAudienceHome(audience)} aria-label="Ontiver home"><img src="/assets/logo.svg" alt="Ontiver" className="h-9 w-auto" /></Link>
            <p className="mt-5 max-w-[270px] text-body text-[#002d0e]/65">{audience === "enterprise" ? "Identity infrastructure for trusted growth." : "Your identity. Verified once. Ready when you are."}</p>
            <div className="mt-6 flex gap-2">{footerIcons.map(icon => <a key={icon.alt} href={icon.href} target="_blank" rel="noreferrer" aria-label={`Follow Ontiver on ${icon.alt}`} className="grid size-10 place-items-center rounded-full border border-[#002d0e]/15 hover:bg-white"><img src={icon.icon} alt="" className="size-4 brightness-0" /></a>)}</div>
          </div>
          <div className="grid grid-cols-2 gap-x-6 gap-y-9 md:grid-cols-4">
            {groups.map(group => <nav key={group.category} aria-label={`Footer ${group.category}`}><h3 className="mb-4 text-sm font-semibold">{group.category}</h3><ul>{group.list.map(item => <li key={item.label}><FooterNavLink item={item} /></li>)}</ul></nav>)}
          </div>
        </div>
        <div className="flex flex-col justify-between gap-3 border-t border-[#002d0e]/15 py-6 text-meta text-[#002d0e]/55 sm:flex-row"><p>&copy; 2026 Ontiver. All rights reserved.</p><Link to="/privacy" className="hover:text-[#007d21]">Your identity. Your control.</Link></div>
      </div>
    </footer>
  );
}
