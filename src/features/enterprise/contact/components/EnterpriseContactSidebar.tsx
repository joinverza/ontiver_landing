import ActionIcon from "../../../../shared/components/ui/ActionIcon";
import { Check, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";

export const EnterpriseContactSidebar = () => (
  <aside className="order-2 flex min-w-0 flex-col bg-surface-muted p-6 text-[#002d0e] sm:p-9">
    <div>
      <h2 className="text-card-title font-medium">What we will work through</h2>
      <div className="divide-y divide-[#002d0e]/15 text-body text-[#526058]">
        {[
          "Confirm sources and checks",
          "Define consent, reviewers, and evidence",
          "Measure completion, review time, and reuse",
        ].map((item) => (
          <span key={item} className="flex items-start gap-3 py-5">
            <Check className="mt-1 size-5 shrink-0 text-accent" aria-hidden="true" />
            {item}
          </span>
        ))}
      </div>
      <div className="mt-5 flex items-start gap-3 border-t border-[#002d0e]/15 pt-5 text-meta text-[#526058]">
        <ShieldCheck className="mt-1 size-5 shrink-0 text-accent" aria-hidden="true" />
        Please don't include sensitive documents or identification numbers in this form — we'll
        request evidence securely through the platform if needed.
      </div>
    </div>
    <Link
      to="/enterprise/support"
      className="mt-auto flex items-center justify-between gap-4 border-b border-[#cbd5c7] pb-5 pt-8 text-body font-medium"
    >
      Enterprise Support
      <ActionIcon size={20} aria-hidden="true" />
    </Link>
  </aside>
);
