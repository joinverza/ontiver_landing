import { ArrowUpRight, Check, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import ContextPhoto from "../../../../shared/components/ui/ContextPhoto";
import { imagery } from "../../../../shared/data/imagery";

export const EnterpriseContactSidebar = () => (
  <aside className="order-2 min-w-0 text-[#002d0e]">
    <div data-scroll-reveal>
      <ContextPhoto image={imagery.candidateReview} size="wide" />
    </div>
    <div className="mt-6 rounded-2xl bg-[#f5f6f3] p-6 sm:p-7">
      <div className="divide-y divide-[#002d0e]/15 text-body text-[#526058]">
        {[
          "Confirm sources and checks",
          "Define consent, reviewers, and evidence",
          "Measure completion, review time, and reuse",
        ].map((item) => (
          <span key={item} className="flex items-start gap-3 py-5">
            <Check className="mt-1 size-5 shrink-0 text-[#007d21]" aria-hidden="true" />
            {item}
          </span>
        ))}
      </div>
      <div className="mt-5 flex items-start gap-3 border-t border-[#002d0e]/15 pt-5 text-meta text-[#526058]">
        <ShieldCheck className="mt-1 size-5 shrink-0 text-[#007d21]" aria-hidden="true" />
        Please don't include sensitive documents or identification numbers in this form — we'll
        request evidence securely through the platform if needed.
      </div>
    </div>
    <Link
      to="/enterprise/support"
      className="mt-6 flex items-center justify-between gap-4 border-y border-[#dde6dc] py-5 text-body font-medium"
    >
      Enterprise Support
      <ArrowUpRight size={20} aria-hidden="true" />
    </Link>
  </aside>
);
