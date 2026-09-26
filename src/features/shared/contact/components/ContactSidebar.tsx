import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import ContextPhoto from "../../../../shared/components/ui/ContextPhoto";
import { imagery } from "../../../../shared/data/imagery";
import { contactRows, contactSocialIcons } from "../data/contact";

export const ContactSidebar = () => (
  <aside className="order-2 min-w-0 text-[#002d0e]">
    <div data-scroll-reveal>
      <ContextPhoto image={imagery.mobileApplication} size="wide" />
    </div>
    <div className="mt-6 rounded-2xl bg-[#f5f6f3] p-6 sm:p-7">
      <div>
        <h2 className="text-card-title font-medium">Before you send</h2>
        <div className="mt-4 divide-y divide-[#002d0e]/10">
          {contactRows.map((row) => (
            <div key={row.label} className="flex items-start gap-4 py-4">
              <img src={row.icon} alt="" className="mt-1 size-5 shrink-0 brightness-0" />
              {row.label.includes("@") ? (
                <a
                  className="break-all text-body text-[#002d0e] underline-offset-4 hover:underline"
                  href={`mailto:${row.label}`}
                >
                  {row.label}
                </a>
              ) : (
                <p className="text-body text-[#526058]">{row.label}</p>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-5 flex gap-3">
        {contactSocialIcons.map((social) => (
          <a
            key={social.label}
            className="grid size-12 place-items-center rounded-full border border-[#002d0e]/20 transition-colors hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#007d21]"
            aria-label={social.label}
            href={social.href}
            rel="noreferrer"
            target="_blank"
          >
            <img src={social.icon} alt="" className="size-5 brightness-0" />
          </a>
        ))}
      </div>
    </div>
    <Link
      to="/support"
      className="mt-6 flex items-center justify-between gap-4 border-y border-[#dde6dc] py-5 text-body font-medium"
    >
      Continue an existing support request
      <ArrowUpRight size={20} aria-hidden="true" />
    </Link>
  </aside>
);
