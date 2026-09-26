import { ArrowUpRight, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import { legalLinks } from "../data/legalDocuments";

const LegalCentreContent = () => (
  <>
    <div className="grid gap-4 sm:grid-cols-2">
      {legalLinks.slice(0, 4).map(([label, href]) => (
        <Link
          key={href}
          to={href}
          className="group flex flex-col items-start rounded-2xl bg-[#f5f6f3] p-5 transition-colors hover:bg-[#edf5eb]"
        >
          <FileText size={24} className="text-[#007d21]" aria-hidden="true" />
          <h2 className="mt-6 text-card-title font-medium">{label}</h2>
          <p className="mt-3 text-meta text-[#526058]">
            {href === "/account-deletion" ? "Email-verified request form" : "Review pending"}
          </p>
          <span className="mt-5 grid size-10 self-end place-items-center rounded-full bg-white">
            <ArrowUpRight size={20} aria-hidden="true" />
          </span>
        </Link>
      ))}
    </div>
    <div className="mt-10 flex flex-wrap items-center justify-between gap-6 border-t border-[#dde6dc] pt-8">
      <h2 className="text-card-title font-medium">Questions or rights requests?</h2>
      <Link to="/support" className="button-secondary">
        Open support <ArrowUpRight size={17} aria-hidden="true" />
      </Link>
    </div>
  </>
);

export default LegalCentreContent;
