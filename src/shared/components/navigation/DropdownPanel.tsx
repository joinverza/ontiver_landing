import ActionIcon from "../ui/ActionIcon";
import NavigationIcon from "../ui/NavigationIcon";
import { editorialPhotos } from "../../data/editorialPhotos";
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  isNavigationLinkActive,
  navigationImages,
  type NavItem,
  type NavLink,
} from "../../data/navigation";
import type { Audience } from "../../lib/audience";
import DropdownPhoto from "./DropdownPhoto";

const platformDescriptions: Record<string, string> = {
  "/enterprise/platform/identity-sources": "NIN/BVN, documents, and trusted confirmations.",
  "/enterprise/platform/verification-engine": "Identity, document, face, and credential checks.",
  "/enterprise/platform/workflow-engine": "Ordered checks, retries, approvals, and expiry.",
  "/enterprise/platform/intelligence": "OCR, inconsistencies, and duplicate signals.",
  "/enterprise/platform/consent-and-privacy": "Purpose, approval, and sharing history.",
  "/enterprise/platform/identity-proofs": "Approved claims, validation, and controlled reuse.",
};

type DropdownLinkProps = {
  item: NavLink;
  pathname: string;
  onNavigate: () => void;
  onPreview: () => void;
};

const DropdownLink = ({ item, pathname, onNavigate, onPreview }: DropdownLinkProps) => {
  const className =
    "nav-dropdown-link flex items-start gap-3 border-b border-[#002d0e]/15 py-3 transition-colors hover:text-accent focus-visible:text-accent";
  const content = (
    <>
      <span className="min-w-0">
        <span className="block text-body font-medium">{item.name}</span>
        <span className="mt-1.5 block text-sm leading-snug text-[#526058]">
          {platformDescriptions[item.to] ?? item.description}
        </span>
      </span>
      {item.external && <ActionIcon size={16} className="ml-auto shrink-0" aria-hidden="true" />}
    </>
  );

  return item.external ? (
    <a
      href={item.to}
      target="_blank"
      rel="noreferrer"
      className={className}
      onClick={onNavigate}
      onMouseEnter={onPreview}
      onFocus={onPreview}
    >
      {content}
    </a>
  ) : (
    <Link
      to={item.to}
      className={className}
      onClick={onNavigate}
      onMouseEnter={onPreview}
      onFocus={onPreview}
      data-active={isNavigationLinkActive(item, pathname)}
      aria-current={
        pathname === item.to
          ? "page"
          : isNavigationLinkActive(item, pathname)
            ? "location"
            : undefined
      }
    >
      {content}
    </Link>
  );
};

type DropdownPanelProps = {
  id: string;
  item: NavItem;
  audience: Audience;
  pathname: string;
  open: boolean;
  onEnter: () => void;
  onNavigate: () => void;
  onClose: () => void;
};

const DropdownPanel = ({
  id,
  item,
  audience,
  pathname,
  open,
  onEnter,
  onNavigate,
  onClose,
}: DropdownPanelProps) => {
  const enterprise = audience === "enterprise";
  const [selection, setSelection] = useState({ open, to: "" });
  const [hasOpened, setHasOpened] = useState(open);
  if (selection.open !== open) setSelection({ open, to: "" });
  if (open && !hasOpened) setHasOpened(true);
  const preview = item.children?.find((child) => child.to === selection.to) ?? item;
  const previews = [
    { key: "", item },
    ...(item.children ?? []).map((child) => ({ key: child.to, item: child })),
  ];
  const image =
    navigationImages[preview.to] ??
    (enterprise ? editorialPhotos.enterpriseResources : editorialPhotos.resources);
  const label =
    preview === item
      ? enterprise
        ? "Plan your workflow."
        : "Understand requests and sharing."
      : preview.name;

  return (
    <div
      id={id}
      data-dropdown-panel
      data-nav-dropdown={open ? "" : undefined}
      data-open={open}
      data-lenis-prevent
      aria-hidden={!open}
      inert={!open}
      onMouseEnter={onEnter}
      className="nav-popup-panel absolute left-0 top-full max-h-[calc(100dvh-var(--site-header-height))] w-full overflow-y-auto border-b border-[#002d0e]/10 bg-surface shadow-[0_20px_30px_rgba(0,45,14,.035)]"
    >
      <div className="nav-dropdown-layout">
        <div className="nav-dropdown-content">
          <div className="nav-dropdown-summary flex flex-col items-start justify-between">
            <div className="nav-dropdown-summary-stack">
              {previews.map(({ key, item: summary }) => (
                <div
                  key={key}
                  className="nav-dropdown-summary-layer"
                  data-visible={selection.to === key}
                  aria-hidden={selection.to !== key}
                >
                  <p
                    className="text-card-title font-medium"
                    data-nav-preview-title={selection.to === key ? "" : undefined}
                  >
                    {summary.name}
                  </p>
                  <p
                    className="mt-4 text-body text-[#526058]"
                    data-nav-preview-description={selection.to === key ? "" : undefined}
                  >
                    {platformDescriptions[summary.to] ?? summary.description}
                  </p>
                </div>
              ))}
            </div>
            <Link
              to={item.to}
              onClick={onNavigate}
              className="mt-6 inline-flex items-center gap-2 text-sm font-medium"
            >
              Explore {item.name.toLowerCase()}
              <ActionIcon size={16} aria-hidden="true" />
            </Link>
          </div>
          <div
            className={`grid content-start gap-x-6 ${(item.children?.length ?? 0) > 4 ? "grid-cols-2" : "grid-cols-1"}`}
          >
            {item.children?.map((child) => (
              <DropdownLink
                key={child.to}
                item={child}
                pathname={pathname}
                onNavigate={onNavigate}
                onPreview={() => setSelection({ open, to: child.to })}
              />
            ))}
          </div>
        </div>
        {hasOpened ? (
          <DropdownPhoto preview={{ item: preview, image, label }} onNavigate={onNavigate} />
        ) : (
          <div className="nav-dropdown-photo" />
        )}
      </div>
      <button
        type="button"
        className="navigation-control nav-dropdown-close inline-flex"
        onClick={onClose}
        aria-label={`Close ${item.name.toLowerCase()} menu`}
      >
        <span>Close</span> <NavigationIcon variant="close" size={20} />
      </button>
    </div>
  );
};

export default DropdownPanel;
