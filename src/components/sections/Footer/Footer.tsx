import { Link } from "../../../lib/router";
import {
  enterpriseFooterGroups,
  footerIcons,
  individualFooterGroups,
  type FooterLink,
} from "../../../data/footer";
import { getAudienceHome, type Audience } from "../../../lib/audience";
import LinkArrow from "../../ui/LinkArrow";

function FooterNavLink({ item }: { item: FooterLink }) {
  return (
    <LinkArrow
      href={item.href}
      variant="dark"
      className="w-full border-white/15 text-white/60 [--link-arrow-min-width:min(220px,100%)]"
    >
      {item.label}
    </LinkArrow>
  );
}

export default function Footer({ audience = "individual" }: { audience?: Audience }) {
  const footerGroups =
    audience === "enterprise" ? enterpriseFooterGroups : individualFooterGroups;
  return (
    <footer
      data-curtain-footer
      className="bg-[#000a03]! px-5 py-12 text-white sm:px-6 md:px-10 lg:px-20 lg:py-16"
    >
      <div className="mx-auto max-w-[1320px]">
        <div className="grid gap-10 lg:grid-cols-[minmax(220px,0.65fr)_minmax(0,2.7fr)] lg:gap-20">
          <div data-curtain-footer-logo className="max-w-[240px]">
            <Link to={getAudienceHome(audience)} aria-label="Ontiver home" className="inline-flex">
              <img
                src="/assets/green-logo.svg"
                alt="Ontiver"
                className="curtain-footer-logo-image h-14 w-auto"
                data-curtain-footer-logo-mark
              />
            </Link>
            <p
              data-curtain-footer-tagline
              className="mt-4 text-body text-white/65"
            >
              {audience === "enterprise"
                ? "Identity infrastructure for trusted growth."
                : "Your identity. Verified once. Ready when you are."}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {footerGroups.map((group) => (
              <div
                data-curtain-footer-column
                key={group.category}
                className="min-w-[220px]"
              >
                <h5 className="pb-4 text-card-title font-bold text-white sm:pb-5">
                  {group.category}
                </h5>
                <ul className="space-y-3">
                  {group.list.map((item) => (
                    <li data-curtain-footer-link key={item.label}>
                      <FooterNavLink item={item} />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div
          data-curtain-footer-divider
          className="relative my-8 flex h-px items-center overflow-hidden"
          aria-hidden="true"
        >
          <span
            data-curtain-footer-divider-left
            className="h-px flex-1 origin-right bg-white/15"
          />
          <span
            data-curtain-footer-divider-right
            className="h-px flex-1 origin-left bg-white/15"
          />
          <span
            data-curtain-footer-divider-flash
            className="pointer-events-none absolute left-0 top-0 h-px w-full bg-[linear-gradient(to_right,transparent,#22C55E,transparent)]"
          />
        </div>

        <div
          data-curtain-footer-bottom
          className="flex flex-col gap-5 text-body text-white/60 sm:flex-row sm:items-center sm:justify-between"
        >
          <p data-curtain-footer-copyright>
            &copy; 2026 Ontiver. All rights reserved.
          </p>
          <div className="flex gap-3">
            {footerIcons.map((icon) => (
              <a
                data-curtain-footer-social
                key={icon.alt}
                href={icon.href}
                target="_blank"
                rel="noreferrer"
                aria-label={`Follow Ontiver on ${icon.alt}`}
                className="inline-grid h-9 w-9 place-items-center rounded-full border border-white/10 opacity-75 transition-[opacity,transform,border-color] duration-150 ease-out hover:scale-[1.08] hover:border-[#22C55E]/60 hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22C55E]"
              >
                <img
                  src={icon.icon}
                  alt=""
                  className="h-5 w-5 transition-[filter] duration-150 hover:[filter:brightness(0)_saturate(100%)_invert(63%)_sepia(77%)_saturate(536%)_hue-rotate(89deg)_brightness(93%)_contrast(88%)]"
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
