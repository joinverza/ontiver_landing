import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import type { LegalDocument } from "../data/legalDocuments";

const LegalDocumentContent = ({ document }: { document: LegalDocument }) => (
  <div className="max-w-[900px] space-y-10">
    {document.sections.map((section, index) => (
      <section id={`legal-section-${index + 1}`} key={section.heading} className="scroll-mt-28">
        <div className="flex items-baseline gap-4">
          <span className="text-meta font-medium tabular-nums text-[#007d21]">
            {String(index + 1).padStart(2, "0")}
          </span>
          <h2 className="text-card-title font-semibold tracking-[-0.02em]">{section.heading}</h2>
        </div>
        {section.paragraphs.map((paragraph) => (
          <p key={paragraph} className="mt-4 text-body leading-[1.85] text-[#002d0e]/65">
            {paragraph}
          </p>
        ))}
        {section.bullets && (
          <ul className="mt-5 space-y-3">
            {section.bullets.map((item) => (
              <li key={item} className="flex gap-3 text-body text-[#002d0e]/65">
                <span
                  className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#009311]"
                  aria-hidden="true"
                />
                {item}
              </li>
            ))}
          </ul>
        )}
      </section>
    ))}
    <div className="rounded-[24px] bg-[#edf5eb] p-6 sm:p-8">
      <p className="text-card-title font-semibold tracking-[-0.02em]">
        Questions or rights requests?
      </p>
      <Link
        to="/support"
        className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#007d21]"
      >
        Open support <ArrowUpRight size={17} aria-hidden="true" />
      </Link>
    </div>
  </div>
);

export default LegalDocumentContent;
