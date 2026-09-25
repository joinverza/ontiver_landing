import { Link } from "react-router-dom";
import { enterpriseFooterGroups, footerIcons, individualFooterGroups, type FooterLink } from "../../../data/footer";
import { getAudienceHome, type Audience } from "../../../lib/audience";
import { MotionToggle } from "../../MotionSettings";

function FooterNavLink({ item }: { item: FooterLink }) {
  const className = "inline-flex py-1.5 text-sm text-[#526058] transition-colors hover:text-[#007d21]";
  return item.external ? <a className={className} href={item.href} target="_blank" rel="noreferrer">{item.label}</a> : <Link className={className} to={item.href}>{item.label}</Link>;
}

export default function Footer({ audience = "individual" }: { audience?: Audience }) {
  const groups = audience === "enterprise" ? enterpriseFooterGroups : individualFooterGroups;
  return <footer className="bg-[#f4f6f1] pb-7 pt-16 text-[#002d0e] sm:pt-20">
    <div className="site-container">
      <div className="grid gap-12 pb-14 lg:grid-cols-[.9fr_1.6fr] lg:gap-20">
        <div>
          <p className="section-heading max-w-[430px]">{audience === "enterprise" ? "Trust for every next step." : "Your identity. Your control."}</p>
          <div className="mt-9 flex gap-4">{footerIcons.map(icon => <a key={icon.alt} href={icon.href} target="_blank" rel="noreferrer" aria-label={`Follow Ontiver on ${icon.alt}`} className="grid size-10 place-items-center rounded-full border border-[#002d0e]/15 hover:bg-white"><img src={icon.icon} alt="" className="size-4 brightness-0" /></a>)}</div>
        </div>
        <div className="grid grid-cols-2 gap-x-7 gap-y-9 md:grid-cols-4">
          {groups.map(group => <nav key={group.category} aria-label={`Footer ${group.category}`}><h2 className="mb-4 border-b border-[#002d0e]/15 pb-3 text-meta font-medium text-[#526058]">{group.category}</h2><ul>{group.list.map(item => <li key={item.label}><FooterNavLink item={item} /></li>)}</ul></nav>)}
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-5 border-t border-[#002d0e]/20 pt-7">
        <Link to={getAudienceHome(audience)} aria-label="Ontiver home"><img src="/assets/logo.svg" alt="Ontiver" className="h-7 w-auto" /></Link>
        <div className="flex flex-wrap items-center gap-5"><MotionToggle className="text-[#526058]" /><p className="text-meta text-[#526058]">&copy; 2026 Ontiver. All rights reserved.</p></div>
      </div>
    </div>
  </footer>;
}
