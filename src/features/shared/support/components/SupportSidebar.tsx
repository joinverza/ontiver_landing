import { ExternalLink, LifeBuoy, Mail, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import type { Audience } from "../../../../shared/lib/audience";

type SupportSidebarProps = { audience: Audience; hasSession: boolean };

export const SupportSidebar = ({ audience, hasSession }: SupportSidebarProps) => (
  <aside className="min-w-0 text-[#002d0e]">
    <div className="rounded-2xl bg-[#edf5eb] p-6">
      <h2 className="text-card-title font-medium">Help us understand the request.</h2>
      <p className="mt-3 text-body text-[#526058]">
        {audience === "enterprise"
          ? "Include the workflow, the step that needs attention, and any non-sensitive error message. Tell us whether you are using the dashboard or API."
          : "Tell us what you were trying to do and where you got stuck. Include the request reference if you have one, without sending identity documents."}
      </p>
    </div>
    <div className="mt-6 rounded-2xl bg-[#f5f6f3] px-6 py-2">
      <div className="divide-y divide-[#002d0e]/15">
        <Link
          to={audience === "enterprise" ? "/enterprise/contact" : "/contact"}
          className="group flex min-h-16 items-center justify-between gap-4 py-4"
        >
          <span className="flex items-center gap-3 text-body font-semibold">
            <Mail className="size-5 text-[#007d21]" /> Contact the team
          </span>
          <ExternalLink className="size-5 shrink-0 text-[#007d21]" />
        </Link>
        <a
          href="https://docs.ontiver.com/faq"
          target="_blank"
          rel="noreferrer"
          className="group flex min-h-16 items-center justify-between gap-4 py-4"
        >
          <span className="flex items-center gap-3 text-body font-semibold">
            <LifeBuoy className="size-5 text-[#007d21]" /> Help and FAQs
          </span>
          <ExternalLink className="size-5 shrink-0 text-[#007d21]" />
        </a>
      </div>
    </div>
    <div className="mt-7 border-t border-[#dde6dc] pt-6">
      <h2 className="flex items-center gap-2 text-body font-medium">
        <ShieldCheck className="size-5 text-[#007d21]" aria-hidden="true" /> Keep sensitive details
        private.
      </h2>
      <p className="mt-3 text-meta leading-relaxed text-[#526058]">
        Never share passwords, one-time codes, card PINs, complete identity numbers, or API secrets.
      </p>
      {hasSession && (
        <p className="mt-3 text-meta leading-relaxed text-[#526058]">
          Keep your conversation link private; it gives access to your request.
        </p>
      )}
    </div>
  </aside>
);
