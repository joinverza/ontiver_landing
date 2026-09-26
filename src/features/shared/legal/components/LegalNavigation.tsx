import { ChevronDown, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { legalLinks, type LegalDocument } from "../data/legalDocuments";

type LegalNavigationProps = {
  pathname: string;
  document: LegalDocument;
  showContents: boolean;
};

const LegalNavigation = ({ pathname, document, showContents }: LegalNavigationProps) => (
  <aside className="min-w-0 lg:sticky lg:top-28">
    {showContents && (
      <>
        <details className="group mb-5 border-b border-[#dde6dc] pb-5 lg:hidden">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-body font-medium [&::-webkit-details-marker]:hidden">
            Table of contents
            <ChevronDown
              size={20}
              className="transition-transform group-open:rotate-180"
              aria-hidden="true"
            />
          </summary>
          <nav aria-label="Mobile table of contents" className="mt-5">
            <ol className="space-y-3">
              {document.sections.map((section, index) => (
                <li key={section.heading}>
                  <a
                    href={`#legal-section-${index + 1}`}
                    className="block text-sm leading-relaxed text-[#526058] hover:text-[#007d21]"
                  >
                    {index + 1}. {section.heading}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </details>
        <nav className="hidden lg:block" aria-label="On this page">
          <p className="mb-5 border-b border-[#dde6dc] pb-4 text-body font-medium">
            Table of contents
          </p>
          <ol className="space-y-4">
            {document.sections.map((section, index) => (
              <li key={section.heading}>
                <a
                  className="flex gap-3 text-sm leading-6 text-[#002d0e]/55 transition-colors hover:text-[#007d21]"
                  href={`#legal-section-${index + 1}`}
                >
                  <span className="text-meta tabular-nums text-[#007d21]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {section.heading}
                </a>
              </li>
            ))}
          </ol>
        </nav>
      </>
    )}
    <details className="group lg:hidden">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 rounded-full border border-[#cbd5c7] px-5 py-3 text-body font-medium [&::-webkit-details-marker]:hidden">
        Legal documents
        <ChevronDown
          size={20}
          className="transition-transform group-open:rotate-180"
          aria-hidden="true"
        />
      </summary>
      <nav className="mt-3 space-y-1" aria-label="Mobile legal navigation">
        {legalLinks.map(([label, href]) => (
          <Link
            key={href}
            to={href}
            aria-current={pathname === href ? "page" : undefined}
            className="block rounded-lg px-4 py-3 text-body text-[#526058] hover:bg-[#edf5eb]"
          >
            {label}
          </Link>
        ))}
      </nav>
    </details>
    <nav
      className={`${showContents ? "mt-8 border-t border-[#dde6dc] pt-6" : ""} hidden space-y-1 lg:block`}
      aria-label="Legal navigation"
    >
      {legalLinks.map(([label, href]) => (
        <Link
          key={href}
          to={href}
          aria-current={pathname === href ? "page" : undefined}
          className={`flex min-h-12 items-center justify-between gap-3 rounded-xl px-3 text-sm transition-colors ${pathname === href ? "bg-[#edf5eb] text-[#007d21]" : "text-[#002d0e]/60 hover:bg-[#f5f6f3] hover:text-[#002d0e]"}`}
        >
          {label}
          <ChevronRight size={16} aria-hidden="true" />
        </Link>
      ))}
    </nav>
  </aside>
);

export default LegalNavigation;
