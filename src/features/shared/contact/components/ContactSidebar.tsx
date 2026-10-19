import ActionIcon from "../../../../shared/components/ui/ActionIcon";
import { Link } from "react-router-dom";
import { contactRows, contactSocialIcons } from "../data/contact";

export const ContactSidebar = () => (
  <aside className="order-2 flex min-w-0 flex-col bg-surface-muted p-6 text-[#002d0e] sm:p-9">
    <div>
      <div>
        <h2 className="text-card-title font-medium">Before you send</h2>
        <div className="mt-4 divide-y divide-[#002d0e]/10">
          {contactRows.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-start gap-4 py-4">
              <Icon size={20} className="mt-1 shrink-0 text-accent" aria-hidden="true" />
              {label.includes("@") ? (
                <a
                  className="break-all text-body text-[#002d0e] underline-offset-4 hover:underline"
                  href={`mailto:${label}`}
                >
                  {label}
                </a>
              ) : (
                <p className="text-body text-[#526058]">{label}</p>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-5 flex gap-3">
        {contactSocialIcons.map((social) => (
          <a
            key={social.label}
            className="grid size-12 place-items-center rounded-full border border-[#002d0e]/20 transition-colors hover:bg-surface focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#007d21]"
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
      className="mt-auto flex items-center justify-between gap-4 border-b border-[#cbd5c7] pb-5 pt-8 text-body font-medium"
    >
      Continue an existing support request
      <ActionIcon size={20} aria-hidden="true" />
    </Link>
  </aside>
);
