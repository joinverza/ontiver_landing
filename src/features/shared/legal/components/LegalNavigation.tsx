import ActionIcon from "../../../../shared/components/ui/ActionIcon";
import { useEffect, useMemo, useRef } from "react";
import { Link } from "react-router-dom";
import { useActiveSection } from "../../../../shared/hooks/useActiveSection";
import { legalLinks, type LegalDocument } from "../data/legalDocuments";
import "./legal-navigation.css";

type LegalNavigationProps = {
  pathname: string;
  document: LegalDocument;
  showContents: boolean;
};

const LegalNavigation = ({
  pathname,
  document: legalDocument,
  showContents,
}: LegalNavigationProps) => {
  const sidebarRef = useRef<HTMLElement>(null);
  const sectionIds = useMemo(
    () =>
      showContents ? legalDocument.sections.map((_, index) => `legal-section-${index + 1}`) : [],
    [legalDocument, showContents],
  );
  const activeId = useActiveSection(sectionIds);

  useEffect(() => {
    const sidebar = sidebarRef.current;
    if (!sidebar || getComputedStyle(sidebar).overflowY !== "auto") return;
    // Keep the current entry visible without moving the page or stealing keyboard focus.
    if (sidebar.contains(document.activeElement)) return;
    const link = sidebar.querySelector<HTMLElement>(
      '.legal-contents-desktop [aria-current="location"]',
    );
    if (!link) return;
    const bounds = sidebar.getBoundingClientRect();
    const item = link.getBoundingClientRect();
    if (item.top < bounds.top + 8) sidebar.scrollTop -= bounds.top + 8 - item.top;
    else if (item.bottom > bounds.bottom - 8) sidebar.scrollTop += item.bottom - bounds.bottom + 8;
  }, [activeId]);

  const contents = legalDocument.sections.map((section, index) => {
    const id = `legal-section-${index + 1}`;
    return (
      <li key={id}>
        <a
          href={`#${id}`}
          className="legal-contents-link"
          aria-current={activeId === id ? "location" : undefined}
        >
          <span className="legal-contents-number">{String(index + 1).padStart(2, "0")}</span>
          <span>{section.heading}</span>
        </a>
      </li>
    );
  });

  return (
    <aside ref={sidebarRef} className="legal-navigation min-w-0">
      {showContents && (
        <>
          <details className="group mb-5 border-b border-[#dde6dc] pb-5 lg:hidden">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-body font-medium [&::-webkit-details-marker]:hidden">
              Table of contents
              <ActionIcon
                direction="down"
                size={20}
                className="transition-transform group-open:rotate-180"
                aria-hidden="true"
              />
            </summary>
            <nav aria-label="Mobile table of contents" className="mt-5">
              <ol className="space-y-1">{contents}</ol>
            </nav>
          </details>
          <nav className="legal-contents-desktop hidden lg:block" aria-label="On this page">
            <p className="mb-5 border-b border-[#dde6dc] pb-4 text-body font-medium">
              Table of contents
            </p>
            <ol className="space-y-1">{contents}</ol>
          </nav>
        </>
      )}
      <details className="group lg:hidden">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-3 rounded-full border border-[#cbd5c7] px-5 py-3 text-body font-medium [&::-webkit-details-marker]:hidden">
          Legal documents
          <ActionIcon
            direction="down"
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
            className={`flex min-h-12 items-center justify-between gap-3 rounded-xl px-3 text-sm transition-colors ${pathname === href ? "bg-[#edf5eb] text-accent" : "text-[#002d0e]/60 hover:bg-surface-muted hover:text-[#002d0e]"}`}
          >
            {label}
            <ActionIcon size={16} aria-hidden="true" />
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default LegalNavigation;
